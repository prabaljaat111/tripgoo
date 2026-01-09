import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface HotelSearchParams {
  cityId: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  rooms: number;
  currency?: string;
  pagination?: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("MAKCORPS_API_KEY");
    
    if (!apiKey) {
      throw new Error("MAKCORPS_API_KEY not configured");
    }

    const { cityId, checkIn, checkOut, adults, rooms, currency = "INR", pagination = 0 }: HotelSearchParams = await req.json();

    if (!cityId || !checkIn || !checkOut) {
      throw new Error("Missing required parameters: cityId, checkIn, checkOut");
    }

    const url = new URL("https://api.makcorps.com/city");
    url.searchParams.set("api_key", apiKey);
    url.searchParams.set("cityid", cityId);
    url.searchParams.set("checkin", checkIn);
    url.searchParams.set("checkout", checkOut);
    url.searchParams.set("adults", String(adults || 2));
    url.searchParams.set("rooms", String(rooms || 1));
    url.searchParams.set("cur", currency);
    url.searchParams.set("pagination", String(pagination));
    url.searchParams.set("tax", "true");

    console.log("Fetching hotels from Makcorps API:", url.toString().replace(apiKey, "***"));

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Makcorps API error:", errorText);
      throw new Error(`Makcorps API error: ${response.status}`);
    }

    const data = await response.json();
    
    console.log("Makcorps API response received, hotels count:", Array.isArray(data) ? data.length : "unknown");

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in hotel-search function:", error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
