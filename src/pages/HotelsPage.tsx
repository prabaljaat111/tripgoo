import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

import Footer from "@/components/layout/Footer";
import { hotels as mockHotels, destinations } from "@/data/travelData";
import { 
  Search, 
  Hotel, 
  Calendar,
  Users,
  MapPin,
  SlidersHorizontal,
  Star,
  Loader2,
  ExternalLink,
  Wifi,
  Car,
  Coffee,
  Waves,
  Dumbbell,
  Utensils,
  X,
  Bookmark,
  Share2
} from "lucide-react";

// City ID mapping for Makcorps API
const CITY_IDS: Record<string, string> = {
  "goa": "60763",
  "delhi": "20089683",
  "mumbai": "20030929",
  "jaipur": "20104371",
  "kerala": "20105050",
  "manali": "20105282",
  "udaipur": "20107115",
  "varanasi": "20107382",
};

interface MakcorpsHotel {
  name: string;
  "Hotel Code"?: string;
  vendor1?: string;
  price1?: string;
  vendor2?: string;
  price2?: string;
  vendor3?: string;
  price3?: string;
  vendor4?: string;
  price4?: string;
  reviews?: string;
  "review score"?: string;
  "review word"?: string;
  "review count"?: string;
  "Location link"?: string;
  img?: string;
}

interface BookingTrack {
  id: string;
  hotelName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  bookedAt: Date;
  vendor: string;
  price: string;
}

const HotelsPage = () => {
  const { toast } = useToast();
  const [destination, setDestination] = useState("goa");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [priceFilter, setPriceFilter] = useState<string>("all");
  const [searchResults, setSearchResults] = useState<MakcorpsHotel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<MakcorpsHotel | null>(null);
  const [bookings, setBookings] = useState<BookingTrack[]>([]);
  const [showBookings, setShowBookings] = useState(false);

  const handleSearch = async () => {
    if (!checkIn || !checkOut) {
      toast({
        title: "Missing dates",
        description: "Please select check-in and check-out dates",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      const cityId = CITY_IDS[destination];
      
      if (!cityId) {
        throw new Error("City not supported yet");
      }

      const { data, error } = await supabase.functions.invoke('hotel-search', {
        body: {
          cityId,
          checkIn,
          checkOut,
          adults: guests,
          rooms,
          currency: "INR"
        }
      });

      if (error) throw error;

      if (data?.error) {
        throw new Error(data.error);
      }

      // Parse the response - Makcorps returns array of hotels
      let hotels: MakcorpsHotel[] = [];
      
      if (Array.isArray(data)) {
        hotels = data.filter((h: MakcorpsHotel) => h.name && h.price1);
      }

      // Apply price filter
      if (priceFilter !== "all") {
        hotels = hotels.filter((h: MakcorpsHotel) => {
          const price = parseFloat(h.price1?.replace(/[^0-9.]/g, '') || '0');
          if (priceFilter === "budget") return price <= 3000;
          if (priceFilter === "mid") return price > 3000 && price <= 8000;
          if (priceFilter === "luxury") return price > 8000;
          return true;
        });
      }

      setSearchResults(hotels);
      
      if (hotels.length === 0) {
        toast({
          title: "No hotels found",
          description: "Try adjusting your search criteria",
        });
      } else {
        toast({
          title: `Found ${hotels.length} hotels`,
          description: "Real-time prices from multiple booking platforms",
        });
      }
    } catch (error: unknown) {
      console.error("Hotel search error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      toast({
        title: "Search failed",
        description: errorMessage,
        variant: "destructive"
      });
      // Fallback to mock data
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookHotel = (hotel: MakcorpsHotel, vendor: string, price: string) => {
    const newBooking: BookingTrack = {
      id: crypto.randomUUID(),
      hotelName: hotel.name,
      checkIn,
      checkOut,
      guests,
      status: 'pending',
      bookedAt: new Date(),
      vendor,
      price
    };

    setBookings(prev => [newBooking, ...prev]);
    setSelectedHotel(null);

    toast({
      title: "Booking initiated!",
      description: `Your booking at ${hotel.name} is being processed`,
    });

    // Simulate booking confirmation
    setTimeout(() => {
      setBookings(prev => prev.map(b => 
        b.id === newBooking.id ? { ...b, status: 'confirmed' as const } : b
      ));
      toast({
        title: "Booking confirmed!",
        description: `Your stay at ${hotel.name} has been confirmed`,
      });
    }, 2000);
  };

  const getVendorIcon = (vendor: string) => {
    const v = vendor?.toLowerCase() || '';
    if (v.includes('booking')) return '🔵';
    if (v.includes('expedia')) return '🟡';
    if (v.includes('hotels.com')) return '🔴';
    if (v.includes('agoda')) return '🟢';
    return '🏨';
  };

  const parsePrice = (price: string | undefined): number => {
    if (!price) return 0;
    return parseFloat(price.replace(/[^0-9.]/g, ''));
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Section */}
      <section className="py-12 gradient-primary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <Badge variant="featured" className="mb-4">
              <Hotel className="w-3 h-3 mr-1" />
              Powered by Makcorps API
            </Badge>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
              Find Your Perfect Stay
            </h1>
            <p className="text-white/80">Real-time prices from 200+ booking platforms</p>
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
                      min={new Date().toISOString().split('T')[0]}
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
                      min={checkIn || new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Guests</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      type="number"
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                      min={1}
                      max={10}
                      inputSize="lg"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Rooms</label>
                  <div className="relative">
                    <Hotel className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      type="number"
                      value={rooms}
                      onChange={(e) => setRooms(parseInt(e.target.value) || 1)}
                      min={1}
                      max={5}
                      inputSize="lg"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="col-span-2 flex items-end gap-2">
                  <Button 
                    variant="hero" 
                    size="lg" 
                    className="flex-1" 
                    onClick={handleSearch}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Search className="w-5 h-5" />
                    )}
                    {isLoading ? "Searching..." : "Search Hotels"}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => setShowBookings(!showBookings)}
                    className="relative"
                  >
                    <Bookmark className="w-5 h-5" />
                    {bookings.length > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                        {bookings.length}
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Bookings Tracker */}
      <AnimatePresence>
        {showBookings && bookings.length > 0 && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-muted/50 border-b"
          >
            <div className="container mx-auto px-4 py-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-lg">Your Bookings</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowBookings(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bookings.map((booking) => (
                  <Card key={booking.id} variant="elevated" className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-sm line-clamp-1">{booking.hotelName}</h4>
                        <Badge 
                          variant={
                            booking.status === 'confirmed' ? 'default' :
                            booking.status === 'cancelled' ? 'destructive' : 'secondary'
                          }
                          className="text-xs"
                        >
                          {booking.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p>📅 {booking.checkIn} → {booking.checkOut}</p>
                        <p>👥 {booking.guests} guests</p>
                        <p>🏨 via {booking.vendor}</p>
                        <p className="font-semibold text-foreground">₹{booking.price}/night</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

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

                    <Button variant="outline" className="w-full" onClick={handleSearch} disabled={isLoading}>
                      Apply Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div className="flex-1">
              {hasSearched && (
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-display font-bold text-xl">
                      {isLoading ? "Searching..." : `${searchResults.length} Hotels Found`}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      in {destinations.find(d => d.id === destination)?.name} • Real-time prices
                    </p>
                  </div>
                  <select className="h-10 rounded-lg border border-input bg-background px-3 text-sm">
                    <option>Sort by: Recommended</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Rating: High to Low</option>
                  </select>
                </div>
              )}

              {isLoading && (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                  <p className="text-muted-foreground">Fetching real-time prices from 200+ platforms...</p>
                </div>
              )}

              {!isLoading && hasSearched && (
                <div className="space-y-4">
                  {searchResults.map((hotel, index) => (
                    <motion.div
                      key={hotel["Hotel Code"] || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card 
                        variant="interactive" 
                        className="overflow-hidden cursor-pointer hover:shadow-lg transition-all"
                        onClick={() => setSelectedHotel(hotel)}
                      >
                        <div className="flex flex-col md:flex-row">
                          {/* Hotel Image */}
                          <div className="w-full md:w-64 h-48 md:h-auto relative bg-muted">
                            {hotel.img ? (
                              <img 
                                src={hotel.img} 
                                alt={hotel.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Hotel className="w-12 h-12 text-muted-foreground" />
                              </div>
                            )}
                          </div>

                          {/* Hotel Details */}
                          <CardContent className="flex-1 p-4">
                            <div className="flex flex-col h-full">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="font-display font-bold text-lg line-clamp-1">{hotel.name}</h3>
                                  {hotel["review score"] && (
                                    <div className="flex items-center gap-2 mt-1">
                                      <Badge variant="secondary" className="gap-1">
                                        <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                                        {hotel["review score"]}
                                      </Badge>
                                      <span className="text-xs text-muted-foreground">
                                        {hotel["review word"]} • {hotel["review count"]} reviews
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <div className="flex gap-1">
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Bookmark className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Share2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>

                              {/* Price Comparison */}
                              <div className="mt-auto">
                                <p className="text-xs text-muted-foreground mb-2">Prices from multiple platforms:</p>
                                <div className="flex flex-wrap gap-2">
                                  {hotel.vendor1 && hotel.price1 && (
                                    <Badge variant="outline" className="gap-1">
                                      {getVendorIcon(hotel.vendor1)} {hotel.vendor1}: ₹{hotel.price1}
                                    </Badge>
                                  )}
                                  {hotel.vendor2 && hotel.price2 && (
                                    <Badge variant="outline" className="gap-1">
                                      {getVendorIcon(hotel.vendor2)} {hotel.vendor2}: ₹{hotel.price2}
                                    </Badge>
                                  )}
                                  {hotel.vendor3 && hotel.price3 && parsePrice(hotel.price3) > 0 && (
                                    <Badge variant="outline" className="gap-1 hidden md:flex">
                                      {getVendorIcon(hotel.vendor3)} {hotel.vendor3}: ₹{hotel.price3}
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center justify-between mt-3">
                                  <div>
                                    <span className="text-2xl font-bold text-primary">₹{hotel.price1}</span>
                                    <span className="text-sm text-muted-foreground">/night</span>
                                  </div>
                                  <Button variant="hero" size="sm">
                                    View Deal
                                    <ExternalLink className="w-3 h-3 ml-1" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}

              {!isLoading && hasSearched && searchResults.length === 0 && (
                <Card variant="glass" className="text-center py-12">
                  <Hotel className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-display font-bold text-lg mb-2">No hotels found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or destination</p>
                </Card>
              )}

              {!hasSearched && (
                <Card variant="glass" className="text-center py-12">
                  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-display font-bold text-lg mb-2">Search for Hotels</h3>
                  <p className="text-muted-foreground">Enter your destination and dates to find the best deals</p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Hotel Detail Modal */}
      <AnimatePresence>
        {selectedHotel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedHotel(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative h-48 bg-muted">
                {selectedHotel.img ? (
                  <img 
                    src={selectedHotel.img} 
                    alt={selectedHotel.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Hotel className="w-16 h-16 text-muted-foreground" />
                  </div>
                )}
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="absolute top-4 right-4 bg-background/80 backdrop-blur"
                  onClick={() => setSelectedHotel(null)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <h2 className="font-display font-bold text-2xl mb-2">{selectedHotel.name}</h2>
                
                {selectedHotel["review score"] && (
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className="gap-1">
                      <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                      {selectedHotel["review score"]}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {selectedHotel["review word"]} • {selectedHotel["review count"]} reviews
                    </span>
                  </div>
                )}

                {/* Amenities */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Wifi className="w-4 h-4" /> Free WiFi
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Car className="w-4 h-4" /> Parking
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Coffee className="w-4 h-4" /> Breakfast
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Waves className="w-4 h-4" /> Pool
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Dumbbell className="w-4 h-4" /> Gym
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Utensils className="w-4 h-4" /> Restaurant
                  </div>
                </div>

                {/* Booking Options */}
                <h3 className="font-semibold mb-3">Book Now - Compare Prices</h3>
                <div className="space-y-2">
                  {[
                    { vendor: selectedHotel.vendor1, price: selectedHotel.price1 },
                    { vendor: selectedHotel.vendor2, price: selectedHotel.price2 },
                    { vendor: selectedHotel.vendor3, price: selectedHotel.price3 },
                    { vendor: selectedHotel.vendor4, price: selectedHotel.price4 },
                  ].filter(v => v.vendor && v.price && parsePrice(v.price) > 0).map((option, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{getVendorIcon(option.vendor!)}</span>
                        <span className="font-medium">{option.vendor}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-lg">₹{option.price}</span>
                        <Button 
                          size="sm"
                          onClick={() => handleBookHotel(selectedHotel, option.vendor!, option.price!)}
                        >
                          Book
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedHotel["Location link"] && (
                  <a 
                    href={selectedHotel["Location link"]} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 mt-4 text-primary hover:underline"
                  >
                    <MapPin className="w-4 h-4" />
                    View on Map
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default HotelsPage;
