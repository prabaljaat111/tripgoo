import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import Footer from "@/components/layout/Footer";
import { 
  Search, 
  Home, 
  Calendar,
  Users,
  MapPin,
  Star,
  Wifi,
  Car,
  UtensilsCrossed
} from "lucide-react";

const villas = [
  {
    id: "v1",
    name: "Sunset Beach Villa",
    location: "Goa",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
    pricePerNight: 15000,
    rating: 4.8,
    bedrooms: 4,
    amenities: ["Pool", "Beach Access", "WiFi", "Kitchen"],
    type: "Entire Villa"
  },
  {
    id: "v2",
    name: "Mountain View Cottage",
    location: "Manali",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800",
    pricePerNight: 8000,
    rating: 4.6,
    bedrooms: 3,
    amenities: ["Fireplace", "Garden", "Parking", "Kitchen"],
    type: "Cottage"
  },
  {
    id: "v3",
    name: "Heritage Haveli Stay",
    location: "Jaipur",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    pricePerNight: 12000,
    rating: 4.9,
    bedrooms: 5,
    amenities: ["Courtyard", "Traditional Decor", "AC", "Breakfast"],
    type: "Haveli"
  },
  {
    id: "v4",
    name: "Backwater Homestay",
    location: "Kerala",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    pricePerNight: 6000,
    rating: 4.7,
    bedrooms: 2,
    amenities: ["Lake View", "Home Cooked Meals", "Kayak", "WiFi"],
    type: "Homestay"
  },
];

const VillasPage = () => {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [guests, setGuests] = useState(2);
  const [searchResults, setSearchResults] = useState(villas);

  const handleSearch = () => {
    if (destination) {
      const results = villas.filter(v => 
        v.location.toLowerCase().includes(destination.toLowerCase())
      );
      setSearchResults(results.length > 0 ? results : villas);
    } else {
      setSearchResults(villas);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <section className="py-12 bg-gradient-to-br from-orange-500 to-amber-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <Badge className="mb-4 bg-white/20 text-white border-0">
              <Home className="w-3 h-3 mr-1" />
              Villas & Homestays
            </Badge>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
              Find Your Perfect Private Stay
            </h1>
            <p className="text-white/80">Unique homes, villas & homestays for every occasion</p>
          </motion.div>

          <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <label className="text-sm font-medium mb-2 block">Where to?</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search destination..."
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="pl-10 h-12"
                    />
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
                      className="pl-10 h-12"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Guests</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      type="number"
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      min={1}
                      className="pl-10 h-12"
                    />
                  </div>
                </div>
              </div>
              <Button className="w-full mt-4 h-12 bg-orange-600 hover:bg-orange-700" onClick={handleSearch}>
                <Search className="w-5 h-5 mr-2" />
                Search Properties
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-xl mb-6">
            {searchResults.length} Properties Found
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((villa) => (
              <motion.div
                key={villa.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <img src={villa.image} alt={villa.name} className="w-full h-full object-cover" />
                    <Badge className="absolute top-3 left-3 bg-white text-foreground">{villa.type}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{villa.rating}</span>
                      <span className="text-muted-foreground">• {villa.location}</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{villa.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{villa.bedrooms} Bedrooms</p>
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {villa.amenities.slice(0, 3).map((a) => (
                        <Badge key={a} variant="secondary" className="text-xs">{a}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-lg">₹{villa.pricePerNight.toLocaleString()}</span>
                        <span className="text-muted-foreground text-sm">/night</span>
                      </div>
                      <Button size="sm">Book Now</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VillasPage;
