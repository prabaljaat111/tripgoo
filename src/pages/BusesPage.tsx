import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import Footer from "@/components/layout/Footer";
import { 
  Search, 
  Bus, 
  ArrowLeftRight,
  Calendar,
  Clock,
  Star,
  Wifi,
  Plug,
  Wind
} from "lucide-react";

const buses = [
  {
    id: "b1",
    operator: "VRL Travels",
    type: "Volvo Multi-Axle A/C Sleeper",
    from: "Bangalore",
    to: "Mumbai",
    departure: "20:00",
    arrival: "08:30",
    duration: "12h 30m",
    price: 1450,
    rating: 4.5,
    amenities: ["AC", "Charging", "Blanket", "Water"]
  },
  {
    id: "b2",
    operator: "Orange Travels",
    type: "Volvo A/C Semi-Sleeper",
    from: "Hyderabad",
    to: "Chennai",
    departure: "21:30",
    arrival: "06:00",
    duration: "8h 30m",
    price: 850,
    rating: 4.2,
    amenities: ["AC", "WiFi", "Charging"]
  },
  {
    id: "b3",
    operator: "SRS Travels",
    type: "Mercedes Multi-Axle A/C Sleeper",
    from: "Delhi",
    to: "Jaipur",
    departure: "23:00",
    arrival: "05:30",
    duration: "6h 30m",
    price: 750,
    rating: 4.7,
    amenities: ["AC", "Charging", "Blanket", "Snacks"]
  },
  {
    id: "b4",
    operator: "Neeta Travels",
    type: "Volvo A/C Seater",
    from: "Mumbai",
    to: "Pune",
    departure: "06:00",
    arrival: "10:00",
    duration: "4h 00m",
    price: 450,
    rating: 4.3,
    amenities: ["AC", "Charging"]
  },
];

const cities = [
  "Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad", 
  "Pune", "Jaipur", "Ahmedabad", "Kolkata", "Lucknow"
];

const BusesPage = () => {
  const [from, setFrom] = useState("Delhi");
  const [to, setTo] = useState("Jaipur");
  const [date, setDate] = useState("");
  const [searchResults, setSearchResults] = useState(buses);

  const handleSearch = () => {
    const results = buses.filter(b => 
      b.from.toLowerCase().includes(from.toLowerCase()) && 
      b.to.toLowerCase().includes(to.toLowerCase())
    );
    setSearchResults(results.length > 0 ? results : buses);
  };

  const swapCities = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <section className="py-12 bg-gradient-to-br from-red-500 to-rose-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <Badge className="mb-4 bg-white/20 text-white border-0">
              <Bus className="w-3 h-3 mr-1" />
              Bus Booking
            </Badge>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
              Book Bus Tickets Online
            </h1>
            <p className="text-white/80">AC & Sleeper buses at lowest prices</p>
          </motion.div>

          <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                <div className="md:col-span-2">
                  <label className="text-sm font-medium mb-2 block">From</label>
                  <select 
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="w-full h-12 rounded-lg border border-input bg-background px-4"
                  >
                    {cities.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-center">
                  <Button variant="outline" size="icon" onClick={swapCities} className="rounded-full">
                    <ArrowLeftRight className="w-4 h-4" />
                  </Button>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium mb-2 block">To</label>
                  <select 
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="w-full h-12 rounded-lg border border-input bg-background px-4"
                  >
                    {cities.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Date</label>
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
                <div className="flex items-end">
                  <Button className="w-full h-12 bg-red-600 hover:bg-red-700" onClick={handleSearch}>
                    <Search className="w-5 h-5 mr-2" />
                    Search Buses
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-xl mb-6">
            {searchResults.length} Buses Found
          </h2>
          <div className="space-y-4">
            {searchResults.map((bus) => (
              <motion.div
                key={bus.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">{bus.operator}</span>
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{bus.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{bus.type}</p>
                        <div className="flex items-center gap-6 text-sm">
                          <div>
                            <p className="font-semibold text-lg">{bus.departure}</p>
                            <p className="text-muted-foreground">{bus.from}</p>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <div className="w-12 h-px bg-border"></div>
                            <Clock className="w-4 h-4" />
                            <span>{bus.duration}</span>
                            <div className="w-12 h-px bg-border"></div>
                          </div>
                          <div>
                            <p className="font-semibold text-lg">{bus.arrival}</p>
                            <p className="text-muted-foreground">{bus.to}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          {bus.amenities.map((a) => (
                            <Badge key={a} variant="secondary" className="text-xs">{a}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-xl">₹{bus.price}</p>
                        <p className="text-sm text-muted-foreground mb-2">per seat</p>
                        <Button className="bg-red-600 hover:bg-red-700">Select Seats</Button>
                      </div>
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

export default BusesPage;
