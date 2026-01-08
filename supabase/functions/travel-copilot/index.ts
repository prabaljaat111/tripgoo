import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const TRAVEL_DATA = {
  destinations: [
    { id: 'goa', name: 'Goa', state: 'Goa', basePrice: 8000, tags: ['Beach', 'Nightlife'] },
    { id: 'manali', name: 'Manali', state: 'Himachal Pradesh', basePrice: 12000, tags: ['Mountains', 'Adventure'] },
    { id: 'jaipur', name: 'Jaipur', state: 'Rajasthan', basePrice: 7000, tags: ['Heritage', 'Culture'] },
    { id: 'kerala', name: 'Kerala Backwaters', state: 'Kerala', basePrice: 15000, tags: ['Backwaters', 'Nature'] },
  ],
  hotels: {
    'goa': [
      { name: 'Taj Exotica Resort', pricePerNight: 12000, trustScore: 9.2, category: 'luxury' },
      { name: 'Goa Beach Resort', pricePerNight: 4500, trustScore: 7.5, category: 'standard' },
      { name: 'Budget Beach Stay', pricePerNight: 1800, trustScore: 6.5, category: 'budget' },
    ],
    'manali': [
      { name: 'The Himalayan Resort', pricePerNight: 8000, trustScore: 8.8, category: 'premium' },
      { name: 'Mountain View Inn', pricePerNight: 3500, trustScore: 7.2, category: 'standard' },
    ],
    'jaipur': [
      { name: 'Rambagh Palace', pricePerNight: 25000, trustScore: 9.5, category: 'luxury' },
      { name: 'Pink City Hotel', pricePerNight: 3000, trustScore: 7.0, category: 'budget' },
    ],
    'kerala': [
      { name: 'Kumarakom Lake Resort', pricePerNight: 15000, trustScore: 9.0, category: 'luxury' },
    ],
  },
};

const systemPrompt = `You are TripGo AI, an expert travel planner for India. You help users plan trips by understanding their requirements and generating personalized itineraries.

IMPORTANT RULES:
1. Always respond in valid JSON format with the exact structure specified below
2. Never hallucinate prices - use the provided travel data
3. Ask clarifying questions if the user's request is unclear
4. Be friendly and enthusiastic about travel

AVAILABLE DESTINATIONS AND PRICING:
${JSON.stringify(TRAVEL_DATA, null, 2)}

RESPONSE FORMAT (strict JSON):
{
  "clarification_required": boolean,
  "clarification_questions": string[] (only if clarification_required is true),
  "message": string (friendly response message),
  "itineraries": [
    {
      "id": string,
      "title": string,
      "destination": string,
      "duration": number,
      "budget": {
        "total": number,
        "flights": number,
        "hotels": number,
        "activities": number,
        "misc": number
      },
      "hotel": {
        "name": string,
        "pricePerNight": number,
        "trustScore": number
      },
      "highlights": string[],
      "activities": string[]
    }
  ],
  "recommended_action": "BOOK" | "MODIFY" | "CLARIFY"
}

When generating itineraries:
- Flight costs: Estimate ₹4000-6000 per person round trip for domestic
- Activities: Budget ₹1000-5000 per day depending on destination
- Misc: Add 10% buffer for food and transport
- Always provide 2-3 options: Budget, Standard, and Premium when possible
- Calculate hotel costs as: pricePerNight × duration
- Total = flights + hotels + activities + misc

Be helpful, accurate with pricing, and enthusiastic about Indian travel destinations!`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("AI service not configured");
    }

    console.log("Processing travel copilot request with", messages.length, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI usage limit reached. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log("AI response received successfully");
    
    const content = data.choices?.[0]?.message?.content;
    
    let parsedContent;
    try {
      parsedContent = JSON.parse(content);
    } catch {
      parsedContent = { 
        message: content,
        clarification_required: false,
        itineraries: [],
        recommended_action: "CLARIFY"
      };
    }

    return new Response(JSON.stringify(parsedContent), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in travel-copilot function:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Unknown error",
      message: "I'm having trouble processing your request. Please try again.",
      clarification_required: false,
      itineraries: [],
      recommended_action: "CLARIFY"
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
