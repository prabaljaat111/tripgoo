import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/layout/Navbar";
import TrustScoreBadge from "@/components/TrustScoreBadge";
import { 
  Send, 
  Sparkles, 
  User, 
  Plane, 
  Hotel, 
  MapPin,
  Calendar,
  IndianRupee,
  Users as UsersIcon,
  ArrowRight,
  Check,
  Clock,
  Star
} from "lucide-react";
import { destinations, hotels, activities, flights } from "@/data/travelData";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  itineraries?: ItineraryOption[];
  clarification?: string[];
}

interface ItineraryOption {
  id: string;
  title: string;
  destination: string;
  duration: number;
  budget: {
    total: number;
    flights: number;
    hotels: number;
    activities: number;
    misc: number;
  };
  hotel: {
    name: string;
    rating: number;
    trustScore: number;
    image: string;
    pricePerNight: number;
  };
  highlights: string[];
  activities: string[];
}

const CopilotPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "👋 Namaste! I'm your TripGo AI Copilot. Tell me about your dream vacation — where you want to go, your budget, duration, and who's traveling. I'll create personalized itineraries just for you!\n\nTry something like: \"3 days family trip from Delhi to Goa under ₹30,000\"",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateItineraries = (query: string): ItineraryOption[] => {
    // Simple AI logic to parse query and generate relevant itineraries
    const lowerQuery = query.toLowerCase();
    
    let targetDestination = destinations[0]; // Default to Goa
    let budget = 30000;
    let duration = 3;
    let isFamily = lowerQuery.includes("family") || lowerQuery.includes("kid");

    // Parse destination
    destinations.forEach(dest => {
      if (lowerQuery.includes(dest.name.toLowerCase())) {
        targetDestination = dest;
      }
    });

    // Parse budget
    const budgetMatch = lowerQuery.match(/(\d+)k|(\d+),?000|₹\s*(\d+)/);
    if (budgetMatch) {
      const num = budgetMatch[1] || budgetMatch[2] || budgetMatch[3];
      budget = parseInt(num) * (budgetMatch[1] ? 1000 : 1);
    }

    // Parse duration
    const durationMatch = lowerQuery.match(/(\d+)\s*(day|night)/);
    if (durationMatch) {
      duration = parseInt(durationMatch[1]);
    }

    // Get relevant hotels
    const destHotels = hotels.filter(h => h.destinationId === targetDestination.id);
    const destActivities = activities.filter(a => a.destinationId === targetDestination.id);

    // Generate 2-3 options based on budget tiers
    const options: ItineraryOption[] = [];

    // Budget option
    const budgetHotel = destHotels.find(h => h.category === 'budget') || destHotels[0];
    if (budgetHotel) {
      const hotelCost = budgetHotel.pricePerNight * duration;
      const flightCost = 4500 * 2; // Round trip
      const activityCost = destActivities.slice(0, 2).reduce((sum, a) => sum + a.price, 0);
      
      options.push({
        id: "budget-" + targetDestination.id,
        title: `Budget Explorer - ${targetDestination.name}`,
        destination: targetDestination.name,
        duration,
        budget: {
          total: hotelCost + flightCost + activityCost + 2000,
          flights: flightCost,
          hotels: hotelCost,
          activities: activityCost,
          misc: 2000,
        },
        hotel: {
          name: budgetHotel.name,
          rating: budgetHotel.rating,
          trustScore: budgetHotel.trustScore,
          image: budgetHotel.image,
          pricePerNight: budgetHotel.pricePerNight,
        },
        highlights: [
          `${duration} nights stay`,
          "Economy flights included",
          `${destActivities.length} activities`,
          isFamily ? "Kid-friendly options" : "Solo traveler friendly",
        ],
        activities: destActivities.filter(a => !isFamily || a.kidFriendly).slice(0, 3).map(a => a.name),
      });
    }

    // Premium option
    const premiumHotel = destHotels.find(h => h.category === 'premium' || h.category === 'luxury') || destHotels[0];
    if (premiumHotel) {
      const hotelCost = premiumHotel.pricePerNight * duration;
      const flightCost = 5500 * 2;
      const activityCost = destActivities.reduce((sum, a) => sum + a.price, 0);
      
      options.push({
        id: "premium-" + targetDestination.id,
        title: `Premium Experience - ${targetDestination.name}`,
        destination: targetDestination.name,
        duration,
        budget: {
          total: hotelCost + flightCost + activityCost + 5000,
          flights: flightCost,
          hotels: hotelCost,
          activities: activityCost,
          misc: 5000,
        },
        hotel: {
          name: premiumHotel.name,
          rating: premiumHotel.rating,
          trustScore: premiumHotel.trustScore,
          image: premiumHotel.image,
          pricePerNight: premiumHotel.pricePerNight,
        },
        highlights: [
          `${duration} nights luxury stay`,
          "Preferred flights",
          "All activities included",
          "Spa & wellness access",
        ],
        activities: destActivities.map(a => a.name),
      });
    }

    return options;
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 1500));

    const itineraries = generateItineraries(inputValue);
    
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: itineraries.length > 0 
        ? `Great choice! Based on your preferences, I've created ${itineraries.length} personalized itinerary options. Each includes AI Trust Scores for hotels to help you choose wisely. Take a look! 👇`
        : "I'd love to help you plan the perfect trip! Could you tell me more about your destination preference, budget, and travel dates?",
      itineraries: itineraries.length > 0 ? itineraries : undefined,
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-6 h-[calc(100vh-4rem)] flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 gradient-hero rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl">AI Travel Copilot</h1>
              <p className="text-muted-foreground text-sm">Your personal trip planner</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 pb-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-3 max-w-[85%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === "user" 
                        ? "bg-primary text-primary-foreground" 
                        : "gradient-secondary text-white"
                    }`}>
                      {message.role === "user" ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                    </div>
                    
                    <div className="space-y-3">
                      <Card variant={message.role === "user" ? "default" : "glass"} className="p-4">
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      </Card>

                      {/* Itinerary Cards */}
                      {message.itineraries && (
                        <div className="grid gap-4">
                          {message.itineraries.map((itinerary) => (
                            <Card key={itinerary.id} variant="featured" className="overflow-hidden">
                              <div className="flex flex-col md:flex-row">
                                <div className="w-full md:w-48 h-32 md:h-auto relative">
                                  <img 
                                    src={itinerary.hotel.image} 
                                    alt={itinerary.hotel.name}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute top-2 left-2">
                                    <TrustScoreBadge score={itinerary.hotel.trustScore} size="sm" showLabel={false} />
                                  </div>
                                </div>
                                
                                <CardContent className="flex-1 p-4">
                                  <div className="flex items-start justify-between mb-3">
                                    <div>
                                      <h3 className="font-display font-bold text-lg">{itinerary.title}</h3>
                                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <MapPin className="w-4 h-4" />
                                        {itinerary.destination}
                                        <Calendar className="w-4 h-4 ml-2" />
                                        {itinerary.duration} days
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-display font-bold text-xl text-primary">
                                        ₹{itinerary.budget.total.toLocaleString('en-IN')}
                                      </p>
                                      <p className="text-xs text-muted-foreground">total package</p>
                                    </div>
                                  </div>

                                  {/* Budget Breakdown */}
                                  <div className="grid grid-cols-4 gap-2 mb-3 text-xs">
                                    {[
                                      { label: "Flights", value: itinerary.budget.flights, icon: Plane },
                                      { label: "Hotels", value: itinerary.budget.hotels, icon: Hotel },
                                      { label: "Activities", value: itinerary.budget.activities, icon: Star },
                                      { label: "Misc", value: itinerary.budget.misc, icon: IndianRupee },
                                    ].map((item) => (
                                      <div key={item.label} className="bg-muted rounded-lg p-2 text-center">
                                        <item.icon className="w-3 h-3 mx-auto mb-1 text-muted-foreground" />
                                        <p className="font-semibold">₹{(item.value / 1000).toFixed(1)}k</p>
                                        <p className="text-muted-foreground">{item.label}</p>
                                      </div>
                                    ))}
                                  </div>

                                  {/* Highlights */}
                                  <div className="flex flex-wrap gap-1 mb-3">
                                    {itinerary.highlights.map((highlight) => (
                                      <Badge key={highlight} variant="secondary" className="text-xs">
                                        <Check className="w-3 h-3 mr-1" />
                                        {highlight}
                                      </Badge>
                                    ))}
                                  </div>

                                  {/* Hotel Info */}
                                  <div className="flex items-center justify-between pt-3 border-t border-border">
                                    <div className="flex items-center gap-2">
                                      <Hotel className="w-4 h-4 text-muted-foreground" />
                                      <span className="text-sm font-medium">{itinerary.hotel.name}</span>
                                      <div className="flex items-center gap-1">
                                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                        <span className="text-xs">{itinerary.hotel.rating}</span>
                                      </div>
                                    </div>
                                    <Button variant="hero" size="sm">
                                      Book Now
                                      <ArrowRight className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </CardContent>
                              </div>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-full gradient-secondary flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <Card variant="glass" className="p-4">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </Card>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-border pt-4">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe your dream trip..."
                variant="glass"
                inputSize="lg"
                className="flex-1"
              />
              <Button 
                variant="hero" 
                size="lg"
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {[
                "3 days trip to Goa under ₹25k",
                "Family vacation to Jaipur",
                "Adventure trip to Manali",
                "Romantic getaway Kerala",
              ].map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setInputValue(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopilotPage;
