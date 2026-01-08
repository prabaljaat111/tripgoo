import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  Package, 
  MapPin,
  Clock,
  Star,
  Plane,
  Hotel,
  UtensilsCrossed,
  Camera
} from "lucide-react";

const packages = [
  {
    id: "p1",
    name: "Goa Beach Paradise",
    destination: "Goa",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
    duration: "4 Days / 3 Nights",
    price: 18999,
    rating: 4.7,
    includes: ["Flights", "Hotels", "Breakfast", "Sightseeing"],
    highlights: ["Beach Hopping", "Cruise Dinner", "Water Sports"]
  },
  {
    id: "p2",
    name: "Rajasthan Royal Tour",
    destination: "Jaipur - Udaipur - Jodhpur",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800",
    duration: "6 Days / 5 Nights",
    price: 32999,
    rating: 4.8,
    includes: ["Flights", "Hotels", "All Meals", "Guide"],
    highlights: ["Fort Visits", "Desert Safari", "Palace Tours"]
  },
  {
    id: "p3",
    name: "Kerala Backwaters Bliss",
    destination: "Kerala",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800",
    duration: "5 Days / 4 Nights",
    price: 28999,
    rating: 4.9,
    includes: ["Flights", "Houseboat", "All Meals", "Ayurveda Spa"],
    highlights: ["Houseboat Stay", "Munnar Hills", "Kathakali Show"]
  },
  {
    id: "p4",
    name: "Manali Adventure Trip",
    destination: "Manali - Solang",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800",
    duration: "5 Days / 4 Nights",
    price: 22999,
    rating: 4.6,
    includes: ["Volvo Bus", "Hotels", "Breakfast", "Activities"],
    highlights: ["Paragliding", "River Rafting", "Rohtang Pass"]
  },
  {
    id: "p5",
    name: "Ladakh Expedition",
    destination: "Leh - Ladakh",
    image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800",
    duration: "7 Days / 6 Nights",
    price: 45999,
    rating: 4.9,
    includes: ["Flights", "Hotels", "All Meals", "Permits"],
    highlights: ["Pangong Lake", "Nubra Valley", "Monastery Visits"]
  },
  {
    id: "p6",
    name: "Andaman Beach Escape",
    destination: "Port Blair - Havelock",
    image: "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800",
    duration: "5 Days / 4 Nights",
    price: 35999,
    rating: 4.7,
    includes: ["Flights", "Resort", "Ferry", "Snorkeling"],
    highlights: ["Radhanagar Beach", "Scuba Diving", "Coral Reefs"]
  },
];

const PackagesPage = () => {
  const [filter, setFilter] = useState("all");
  const filteredPackages = filter === "all" ? packages : 
    packages.filter(p => p.duration.includes(filter));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-12 bg-gradient-to-br from-pink-500 to-rose-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Badge className="mb-4 bg-white/20 text-white border-0">
              <Package className="w-3 h-3 mr-1" />
              Holiday Packages
            </Badge>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
              Complete Holiday Packages
            </h1>
            <p className="text-white/80 mb-6">Hassle-free travel with everything included</p>
            
            <div className="flex justify-center gap-2 flex-wrap">
              {["all", "4 Days", "5 Days", "6 Days", "7 Days"].map((d) => (
                <Button 
                  key={d}
                  variant={filter === d ? "default" : "outline"}
                  className={filter === d ? "bg-white text-pink-600" : "border-white text-white hover:bg-white/20"}
                  onClick={() => setFilter(d)}
                >
                  {d === "all" ? "All Packages" : d}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                  <div className="relative h-48">
                    <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                    <Badge className="absolute top-3 right-3 bg-pink-600 text-white">{pkg.duration}</Badge>
                  </div>
                  <CardContent className="p-4 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                      <MapPin className="w-4 h-4" />
                      {pkg.destination}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{pkg.name}</h3>
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{pkg.rating}</span>
                    </div>
                    
                    <div className="flex gap-2 mb-3 flex-wrap">
                      {pkg.includes.map((item) => (
                        <Badge key={item} variant="secondary" className="text-xs">{item}</Badge>
                      ))}
                    </div>
                    
                    <div className="text-sm text-muted-foreground mb-4">
                      <strong>Highlights:</strong> {pkg.highlights.join(" • ")}
                    </div>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <div>
                        <span className="font-bold text-xl">₹{pkg.price.toLocaleString()}</span>
                        <span className="text-muted-foreground text-sm">/person</span>
                      </div>
                      <Button className="bg-pink-600 hover:bg-pink-700">View Details</Button>
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

export default PackagesPage;
