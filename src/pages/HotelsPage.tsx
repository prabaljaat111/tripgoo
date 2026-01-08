import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HotelCard from "@/components/HotelCard";
import { hotels, destinations } from "@/data/travelData";
import { 
  Search, 
  Hotel, 
  Calendar,
  Users,
  Filter,
  MapPin,
  SlidersHorizontal
} from "lucide-react";

const HotelsPage = () => {
  const [destination, setDestination] = useState("goa");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [priceFilter, setPriceFilter] = useState<string>("all");
  const [searchResults, setSearchResults] = useState(hotels.filter(h => h.destinationId === "goa"));

  const handleSearch = () => {
    let results = hotels.filter(h => h.destinationId === destination);
    
    if (priceFilter === "budget") {
      results = results.filter(h => h.pricePerNight <= 3000);
    } else if (priceFilter === "mid") {
      results = results.filter(h => h.pricePerNight > 3000 && h.pricePerNight <= 8000);
    } else if (priceFilter === "luxury") {
      results = results.filter(h => h.pricePerNight > 8000);
    }
    
    setSearchResults(results);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 gradient-primary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <Badge variant="featured" className="mb-4">
              <Hotel className="w-3 h-3 mr-1" />
              Hotel Search
            </Badge>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
              Find Your Perfect Stay
            </h1>
            <p className="text-white/80">AI-verified hotels with Trust Scores you can rely on</p>
          </motion.div>

          {/* Search Form */}
          <Card variant="glass" className="max-w-4xl mx-auto">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <label className="text-sm font-medium mb-2 block">Destination</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <select 
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full h-12 rounded-lg border border-input bg-background pl-10 pr-4 text-base focus:ring-2 focus:ring-primary"
                    >
                      {destinations.map((dest) => (
                        <option key={dest.id} value={dest.id}>
                          {dest.name}, {dest.state}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Check-in</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      inputSize="lg"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Check-out</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      inputSize="lg"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Guests</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      type="number"
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      min={1}
                      max={10}
                      inputSize="lg"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="md:col-span-3 flex items-end">
                  <Button variant="hero" size="lg" className="w-full" onClick={handleSearch}>
                    <Search className="w-5 h-5" />
                    Search Hotels
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
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters Sidebar */}
            <div className="w-full md:w-64 flex-shrink-0">
              <Card variant="elevated" className="sticky top-20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <SlidersHorizontal className="w-4 h-4" />
                    <h3 className="font-semibold">Filters</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Price Range</label>
                      <div className="space-y-2">
                        {[
                          { value: "all", label: "All Prices" },
                          { value: "budget", label: "Under ₹3,000" },
                          { value: "mid", label: "₹3,000 - ₹8,000" },
                          { value: "luxury", label: "Above ₹8,000" },
                        ].map((option) => (
                          <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="price"
                              value={option.value}
                              checked={priceFilter === option.value}
                              onChange={(e) => setPriceFilter(e.target.value)}
                              className="text-primary focus:ring-primary"
                            />
                            <span className="text-sm">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Trust Score</label>
                      <div className="space-y-2">
                        {["8+", "7+", "6+", "Any"].map((score) => (
                          <label key={score} className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="text-primary focus:ring-primary" />
                            <span className="text-sm">{score === "Any" ? score : `${score} Rating`}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <Button variant="outline" className="w-full" onClick={handleSearch}>
                      Apply Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display font-bold text-xl">
                    {searchResults.length} Hotels Found
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    in {destinations.find(d => d.id === destination)?.name}
                  </p>
                </div>
                <select className="h-10 rounded-lg border border-input bg-background px-3 text-sm">
                  <option>Sort by: Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Trust Score: High to Low</option>
                  <option>Rating: High to Low</option>
                </select>
              </div>

              <div className="space-y-4">
                {searchResults.map((hotel) => (
                  <motion.div
                    key={hotel.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <HotelCard hotel={hotel} />
                  </motion.div>
                ))}
              </div>

              {searchResults.length === 0 && (
                <Card variant="glass" className="text-center py-12">
                  <Hotel className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-display font-bold text-lg mb-2">No hotels found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or destination</p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HotelsPage;
