import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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

    const { cityName } = await req.json();

    if (!cityName) {
      throw new Error("Missing required parameter: cityName");
    }

    const url = new URL("https://api.makcorps.com/mapping");
    url.searchParams.set("api_key", apiKey);
    url.searchParams.set("name", cityName);

    console.log("Fetching city mapping from Makcorps API for:", cityName);

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Makcorps Mapping API error:", errorText);
      throw new Error(`Makcorps Mapping API error: ${response.status}`);
    }

    const data = await response.json();
    
    console.log("City mapping response:", JSON.stringify(data).slice(0, 200));

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in city-mapping function:", error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
