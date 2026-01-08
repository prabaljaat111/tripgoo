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
  Train, 
  ArrowLeftRight,
  Calendar,
  Clock,
  Users
} from "lucide-react";

const trains = [
  {
    id: "t1",
    name: "Rajdhani Express",
    number: "12301",
    from: "New Delhi",
    to: "Mumbai Central",
    departure: "16:55",
    arrival: "08:35",
    duration: "15h 40m",
    price: { sleeper: 850, ac3: 1850, ac2: 2650, ac1: 4450 },
    days: ["Mon", "Wed", "Fri", "Sun"]
  },
  {
    id: "t2",
    name: "Shatabdi Express",
    number: "12002",
    from: "New Delhi",
    to: "Bhopal",
    departure: "06:00",
    arrival: "14:00",
    duration: "8h 00m",
    price: { sleeper: 0, ac3: 0, ac2: 1250, ac1: 2350 },
    days: ["Daily"]
  },
  {
    id: "t3",
    name: "Duronto Express",
    number: "12213",
    from: "New Delhi",
    to: "Bengaluru",
    departure: "20:50",
    arrival: "06:10",
    duration: "33h 20m",
    price: { sleeper: 1050, ac3: 2450, ac2: 3550, ac1: 5950 },
    days: ["Tue", "Thu", "Sat"]
  },
  {
    id: "t4",
    name: "Garib Rath",
    number: "12215",
    from: "New Delhi",
    to: "Jaipur",
    departure: "23:15",
    arrival: "04:40",
    duration: "5h 25m",
    price: { sleeper: 350, ac3: 750, ac2: 0, ac1: 0 },
    days: ["Daily"]
  },
];

const stations = [
  "New Delhi", "Mumbai Central", "Chennai Central", "Kolkata", "Bengaluru", 
  "Hyderabad", "Jaipur", "Ahmedabad", "Pune", "Lucknow"
];

const TrainsPage = () => {
  const [from, setFrom] = useState("New Delhi");
  const [to, setTo] = useState("Mumbai Central");
  const [date, setDate] = useState("");
  const [searchResults, setSearchResults] = useState(trains);

  const handleSearch = () => {
    const results = trains.filter(t => 
      t.from.toLowerCase().includes(from.toLowerCase()) && 
      t.to.toLowerCase().includes(to.toLowerCase())
    );
    setSearchResults(results.length > 0 ? results : trains);
  };

  const swapStations = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-12 bg-gradient-to-br from-green-500 to-emerald-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <Badge className="mb-4 bg-white/20 text-white border-0">
              <Train className="w-3 h-3 mr-1" />
              Train Booking
            </Badge>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
              Book Train Tickets
            </h1>
            <p className="text-white/80">IRCTC authorized partner for seamless bookings</p>
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
                    {stations.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-center">
                  <Button variant="outline" size="icon" onClick={swapStations} className="rounded-full">
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
                    {stations.map((s) => (
                      <option key={s} value={s}>{s}</option>
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
                  <Button className="w-full h-12 bg-green-600 hover:bg-green-700" onClick={handleSearch}>
                    <Search className="w-5 h-5 mr-2" />
                    Search Trains
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
            {searchResults.length} Trains Found
          </h2>
          <div className="space-y-4">
            {searchResults.map((train) => (
              <motion.div
                key={train.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Train className="w-5 h-5 text-green-600" />
                          <span className="font-semibold">{train.name}</span>
                          <Badge variant="secondary">{train.number}</Badge>
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                          <div>
                            <p className="font-semibold text-lg">{train.departure}</p>
                            <p className="text-muted-foreground">{train.from}</p>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <div className="w-16 h-px bg-border"></div>
                            <Clock className="w-4 h-4" />
                            <span>{train.duration}</span>
                            <div className="w-16 h-px bg-border"></div>
                          </div>
                          <div>
                            <p className="font-semibold text-lg">{train.arrival}</p>
                            <p className="text-muted-foreground">{train.to}</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          Runs on: {train.days.join(", ")}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {train.price.sleeper > 0 && (
                          <Button variant="outline" size="sm" className="flex-col h-auto py-2">
                            <span className="text-xs text-muted-foreground">SL</span>
                            <span className="font-semibold">₹{train.price.sleeper}</span>
                          </Button>
                        )}
                        {train.price.ac3 > 0 && (
                          <Button variant="outline" size="sm" className="flex-col h-auto py-2">
                            <span className="text-xs text-muted-foreground">3A</span>
                            <span className="font-semibold">₹{train.price.ac3}</span>
                          </Button>
                        )}
                        {train.price.ac2 > 0 && (
                          <Button variant="outline" size="sm" className="flex-col h-auto py-2">
                            <span className="text-xs text-muted-foreground">2A</span>
                            <span className="font-semibold">₹{train.price.ac2}</span>
                          </Button>
                        )}
                        {train.price.ac1 > 0 && (
                          <Button variant="outline" size="sm" className="flex-col h-auto py-2">
                            <span className="text-xs text-muted-foreground">1A</span>
                            <span className="font-semibold">₹{train.price.ac1}</span>
                          </Button>
                        )}
                      </div>
                      <Button className="bg-green-600 hover:bg-green-700">Book Now</Button>
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

export default TrainsPage;
