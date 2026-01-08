import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { activities, destinations } from "@/data/travelData";
import { 
  Ticket, 
  MapPin,
  Clock,
  Star,
  Users,
  Search
} from "lucide-react";

const categories = ["All", "Adventure", "Culture", "Wildlife", "Heritage", "Wellness", "Relaxation"];

const ToursPage = () => {
  const [category, setCategory] = useState("All");
  const [destination, setDestination] = useState("all");

  const filteredActivities = activities.filter(a => {
    const categoryMatch = category === "All" || a.category === category;
    const destMatch = destination === "all" || a.destinationId === destination;
    return categoryMatch && destMatch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-12 bg-gradient-to-br from-teal-500 to-cyan-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Badge className="mb-4 bg-white/20 text-white border-0">
              <Ticket className="w-3 h-3 mr-1" />
              Tours & Attractions
            </Badge>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
              Discover Amazing Experiences
            </h1>
            <p className="text-white/80 mb-6">Activities, tours & attractions for every traveler</p>
            
            <div className="flex justify-center gap-2 flex-wrap mb-6">
              {categories.map((cat) => (
                <Button 
                  key={cat}
                  variant={category === cat ? "default" : "outline"}
                  className={category === cat ? "bg-white text-teal-600" : "border-white text-white hover:bg-white/20"}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>

            <div className="max-w-md mx-auto">
              <select 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full h-12 rounded-lg border-0 bg-white/95 px-4 text-foreground"
              >
                <option value="all">All Destinations</option>
                {destinations.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-xl mb-6">
            {filteredActivities.length} Experiences Found
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.map((activity) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                  <div className="relative h-48">
                    <img src={activity.image} alt={activity.name} className="w-full h-full object-cover" />
                    <Badge className="absolute top-3 left-3 bg-teal-600 text-white">{activity.category}</Badge>
                    {activity.kidFriendly && (
                      <Badge className="absolute top-3 right-3 bg-green-600 text-white">Kid Friendly</Badge>
                    )}
                  </div>
                  <CardContent className="p-4 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                      <MapPin className="w-4 h-4" />
                      {destinations.find(d => d.id === activity.destinationId)?.name}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{activity.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3 flex-1">{activity.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {activity.duration}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-lg">₹{activity.price.toLocaleString()}</span>
                        <span className="text-muted-foreground text-sm">/person</span>
                      </div>
                      <Button className="bg-teal-600 hover:bg-teal-700">Book Now</Button>
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

export default ToursPage;
