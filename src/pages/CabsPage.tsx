import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  Search, 
  Car, 
  MapPin,
  Calendar,
  Clock,
  Users,
  Briefcase,
  Star
} from "lucide-react";

const cabTypes = [
  {
    id: "c1",
    name: "Sedan",
    category: "Economy",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400",
    capacity: 4,
    luggage: 2,
    pricePerKm: 12,
    baseFare: 300,
    examples: ["Swift Dzire", "Honda Amaze", "Hyundai Aura"]
  },
  {
    id: "c2",
    name: "SUV",
    category: "Premium",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400",
    capacity: 6,
    luggage: 4,
    pricePerKm: 18,
    baseFare: 500,
    examples: ["Innova Crysta", "Ertiga", "Marazzo"]
  },
  {
    id: "c3",
    name: "Luxury Sedan",
    category: "Luxury",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400",
    capacity: 4,
    luggage: 3,
    pricePerKm: 25,
    baseFare: 800,
    examples: ["Honda City", "Hyundai Verna", "Ciaz"]
  },
  {
    id: "c4",
    name: "Tempo Traveller",
    category: "Group",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400",
    capacity: 12,
    luggage: 8,
    pricePerKm: 22,
    baseFare: 1200,
    examples: ["Force Traveller", "Tempo Traveller"]
  },
];

const tripTypes = ["One Way", "Round Trip", "Hourly Rental"];
const cities = ["Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad", "Jaipur", "Goa", "Agra"];

const CabsPage = () => {
  const [tripType, setTripType] = useState("One Way");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-12 bg-gradient-to-br from-yellow-500 to-amber-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <Badge className="mb-4 bg-white/20 text-white border-0">
              <Car className="w-3 h-3 mr-1" />
              Cab Booking
            </Badge>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
              Book Outstation & Airport Cabs
            </h1>
            <p className="text-white/80">Reliable cabs for every journey</p>
          </motion.div>

          <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex gap-2 mb-6">
                {tripTypes.map((t) => (
                  <Button 
                    key={t}
                    variant={tripType === t ? "default" : "outline"}
                    onClick={() => setTripType(t)}
                    className={tripType === t ? "bg-yellow-600 hover:bg-yellow-700" : ""}
                  >
                    {t}
                  </Button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Pickup Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <select 
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      className="w-full h-12 rounded-lg border border-input bg-background pl-10 pr-4"
                    >
                      <option value="">Select city</option>
                      {cities.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Drop Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <select 
                      value={drop}
                      onChange={(e) => setDrop(e.target.value)}
                      className="w-full h-12 rounded-lg border border-input bg-background pl-10 pr-4"
                    >
                      <option value="">Select city</option>
                      {cities.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Pickup Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Pickup Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                </div>
              </div>

              <Button className="w-full mt-4 h-12 bg-yellow-600 hover:bg-yellow-700">
                <Search className="w-5 h-5 mr-2" />
                Search Cabs
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-xl mb-6">Choose Your Cab</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cabTypes.map((cab) => (
              <motion.div
                key={cab.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <div className="h-40 overflow-hidden">
                    <img src={cab.image} alt={cab.name} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <Badge className="mb-2" variant="secondary">{cab.category}</Badge>
                    <h3 className="font-semibold text-lg mb-2">{cab.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {cab.capacity}
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {cab.luggage}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      {cab.examples.join(", ")}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold">₹{cab.pricePerKm}</span>
                        <span className="text-muted-foreground text-sm">/km</span>
                      </div>
                      <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">Select</Button>
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

export default CabsPage;
