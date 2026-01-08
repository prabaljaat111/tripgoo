import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import Footer from "@/components/layout/Footer";
import { 
  Ship, 
  MapPin,
  Clock,
  Star,
  Users,
  UtensilsCrossed,
  Waves,
  Calendar
} from "lucide-react";

const cruises = [
  {
    id: "cr1",
    name: "Cordelia Cruise - Mumbai to Goa",
    ship: "Empress",
    image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800",
    duration: "3 Nights / 4 Days",
    route: "Mumbai → Goa → Mumbai",
    priceFrom: 25999,
    rating: 4.6,
    amenities: ["All Meals", "Entertainment", "Pool", "Casino", "Spa"],
    departure: "Every Friday"
  },
  {
    id: "cr2",
    name: "Jalesh Cruise - High Seas",
    ship: "Karnika",
    image: "https://images.unsplash.com/photo-1599640842225-85d111c60e6b?w=800",
    duration: "2 Nights / 3 Days",
    route: "Mumbai → High Seas → Mumbai",
    priceFrom: 18999,
    rating: 4.4,
    amenities: ["All Meals", "Shows", "Pool", "Kids Club"],
    departure: "Weekends"
  },
  {
    id: "cr3",
    name: "Angriya Cruise",
    ship: "Angriya",
    image: "https://images.unsplash.com/photo-1578255321055-d5351e9e10e0?w=800",
    duration: "1 Night",
    route: "Mumbai → Goa",
    priceFrom: 9999,
    rating: 4.2,
    amenities: ["Meals", "Live Music", "Deck Party"],
    departure: "Daily"
  },
  {
    id: "cr4",
    name: "Costa Cruise - SE Asia",
    ship: "Costa Serena",
    image: "https://images.unsplash.com/photo-1586009985013-bd16d15c67fe?w=800",
    duration: "7 Nights / 8 Days",
    route: "Singapore → Penang → Phuket → Singapore",
    priceFrom: 75999,
    rating: 4.8,
    amenities: ["All Inclusive", "Multiple Restaurants", "Casino", "Spa", "Shore Excursions"],
    departure: "Selected Dates"
  },
];

const CruisePage = () => {
  const [filter, setFilter] = useState("all");

  const filteredCruises = filter === "all" ? cruises :
    cruises.filter(c => c.duration.includes(filter));

  return (
    <div className="min-h-screen bg-background pb-24">
      <section className="py-12 bg-gradient-to-br from-cyan-500 to-blue-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Badge className="mb-4 bg-white/20 text-white border-0">
              <Ship className="w-3 h-3 mr-1" />
              Cruise Packages
            </Badge>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
              Luxury Cruise Experiences
            </h1>
            <p className="text-white/80 mb-6">Set sail on unforgettable voyages</p>
            
            <div className="flex justify-center gap-2 flex-wrap">
              {["all", "1 Night", "2 Nights", "3 Nights", "7 Nights"].map((d) => (
                <Button 
                  key={d}
                  variant={filter === d ? "default" : "outline"}
                  className={filter === d ? "bg-white text-cyan-600" : "border-white text-white hover:bg-white/20"}
                  onClick={() => setFilter(d)}
                >
                  {d === "all" ? "All Cruises" : d}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCruises.map((cruise) => (
              <motion.div
                key={cruise.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-2/5 h-48 md:h-auto">
                      <img src={cruise.image} alt={cruise.name} className="w-full h-full object-cover" />
                    </div>
                    <CardContent className="md:w-3/5 p-4 flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-cyan-600 text-white">{cruise.duration}</Badge>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{cruise.rating}</span>
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-lg mb-1">{cruise.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">Ship: {cruise.ship}</p>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Waves className="w-4 h-4" />
                        {cruise.route}
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Calendar className="w-4 h-4" />
                        Departure: {cruise.departure}
                      </div>
                      
                      <div className="flex gap-2 mb-4 flex-wrap">
                        {cruise.amenities.slice(0, 4).map((a) => (
                          <Badge key={a} variant="secondary" className="text-xs">{a}</Badge>
                        ))}
                      </div>
                      
                      <div className="mt-auto flex items-center justify-between">
                        <div>
                          <span className="text-sm text-muted-foreground">Starting from</span>
                          <p className="font-bold text-xl">₹{cruise.priceFrom.toLocaleString()}</p>
                        </div>
                        <Button className="bg-cyan-600 hover:bg-cyan-700">View Details</Button>
                      </div>
                    </CardContent>
                  </div>
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

export default CruisePage;
