import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import Footer from "@/components/layout/Footer";
import FlightCard from "@/components/FlightCard";
import { flights, cities } from "@/data/travelData";
import { 
  Search, 
  Plane, 
  ArrowLeftRight,
  Calendar,
  Users,
  Filter
} from "lucide-react";

const FlightsPage = () => {
  const [from, setFrom] = useState("DEL");
  const [to, setTo] = useState("GOI");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [searchResults, setSearchResults] = useState(flights.filter(f => f.from === "DEL" && f.to === "GOI"));

  const handleSearch = () => {
    const results = flights.filter(f => f.from === from && f.to === to);
    setSearchResults(results.length > 0 ? results : flights.slice(0, 4));
  };

  const swapCities = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Section */}
      <section className="py-12 gradient-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <Badge variant="featured" className="mb-4">
              <Plane className="w-3 h-3 mr-1" />
              Flight Search
            </Badge>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
              Find the Best Flight Deals
            </h1>
            <p className="text-white/80">Search hundreds of airlines for the lowest fares</p>
          </motion.div>

          {/* Search Form */}
          <Card variant="glass" className="max-w-4xl mx-auto">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                <div className="md:col-span-2">
                  <label className="text-sm font-medium mb-2 block">From</label>
                  <select 
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="w-full h-12 rounded-lg border border-input bg-background px-4 text-base focus:ring-2 focus:ring-secondary"
                  >
                    {cities.map((city) => (
                      <option key={city.code} value={city.code}>
                        {city.name} ({city.code})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-center">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={swapCities}
                    className="rounded-full"
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                  </Button>
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-medium mb-2 block">To</label>
                  <select 
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="w-full h-12 rounded-lg border border-input bg-background px-4 text-base focus:ring-2 focus:ring-secondary"
                  >
                    {cities.map((city) => (
                      <option key={city.code} value={city.code}>
                        {city.name} ({city.code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Departure Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      inputSize="lg"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Passengers</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      type="number"
                      value={passengers}
                      onChange={(e) => setPassengers(parseInt(e.target.value))}
                      min={1}
                      max={9}
                      inputSize="lg"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 flex items-end">
                  <Button variant="hero" size="lg" className="w-full" onClick={handleSearch}>
                    <Search className="w-5 h-5" />
                    Search Flights
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display font-bold text-xl">
                {searchResults.length} Flights Found
              </h2>
              <p className="text-muted-foreground text-sm">
                {cities.find(c => c.code === from)?.name} → {cities.find(c => c.code === to)?.name}
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="space-y-4">
            {searchResults.map((flight) => (
              <motion.div
                key={flight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <FlightCard flight={flight} />
              </motion.div>
            ))}
          </div>

          {searchResults.length === 0 && (
            <Card variant="glass" className="text-center py-12">
              <Plane className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display font-bold text-lg mb-2">No flights found</h3>
              <p className="text-muted-foreground">Try different dates or destinations</p>
            </Card>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FlightsPage;
