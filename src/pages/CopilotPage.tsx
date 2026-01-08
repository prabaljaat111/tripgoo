import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

import TrustScoreBadge from "@/components/TrustScoreBadge";
import { supabase } from "@/integrations/supabase/client";
import { 
  Send, 
  Sparkles, 
  User, 
  Plane, 
  Hotel, 
  MapPin,
  Calendar,
  IndianRupee,
  ArrowRight,
  Check,
  Star,
  Loader2
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  itineraries?: ItineraryOption[];
  clarificationQuestions?: string[];
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
    pricePerNight: number;
    trustScore: number;
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
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      // Build conversation history for AI
      const conversationHistory = [...messages, userMessage]
        .filter(m => m.id !== "1") // Exclude initial greeting
        .map(m => ({ role: m.role, content: m.content }));

      const { data, error } = await supabase.functions.invoke('travel-copilot', {
        body: { messages: conversationHistory }
      });

      if (error) {
        console.error("Edge function error:", error);
        throw new Error(error.message || "Failed to get AI response");
      }

      const aiResponse = data;
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse.message || "Here are some travel options for you! 👇",
        itineraries: aiResponse.itineraries?.length > 0 ? aiResponse.itineraries : undefined,
        clarificationQuestions: aiResponse.clarification_required ? aiResponse.clarification_questions : undefined,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error calling AI:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
      
      // Add fallback message
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm having trouble connecting right now. Please try again in a moment!",
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">

      <div className="flex-1 pb-24">
        <div className="container mx-auto px-4 py-6 h-[calc(100vh-4rem)] flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 gradient-hero rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl">AI Travel Copilot</h1>
              <p className="text-muted-foreground text-sm">Powered by real AI • Your personal trip planner</p>
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

                      {/* Clarification Questions */}
                      {message.clarificationQuestions && (
                        <Card variant="glass" className="p-4">
                          <p className="font-medium mb-2">I need a bit more info:</p>
                          <ul className="space-y-1">
                            {message.clarificationQuestions.map((q, i) => (
                              <li key={i} className="text-sm text-muted-foreground">• {q}</li>
                            ))}
                          </ul>
                        </Card>
                      )}

                      {/* Itinerary Cards */}
                      {message.itineraries && message.itineraries.length > 0 && (
                        <div className="grid gap-4">
                          {message.itineraries.map((itinerary) => (
                            <Card key={itinerary.id} variant="featured" className="overflow-hidden">
                              <CardContent className="p-4">
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
                                {itinerary.highlights && itinerary.highlights.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mb-3">
                                    {itinerary.highlights.map((highlight) => (
                                      <Badge key={highlight} variant="secondary" className="text-xs">
                                        <Check className="w-3 h-3 mr-1" />
                                        {highlight}
                                      </Badge>
                                    ))}
                                  </div>
                                )}

                                {/* Hotel Info */}
                                <div className="flex items-center justify-between pt-3 border-t border-border">
                                  <div className="flex items-center gap-2">
                                    <Hotel className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm font-medium">{itinerary.hotel.name}</span>
                                    <TrustScoreBadge score={itinerary.hotel.trustScore} size="sm" showLabel={false} />
                                  </div>
                                  <Button variant="hero" size="sm">
                                    Book Now
                                    <ArrowRight className="w-4 h-4" />
                                  </Button>
                                </div>
                              </CardContent>
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
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">Planning your perfect trip...</span>
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
                disabled={isTyping}
              />
              <Button 
                variant="hero" 
                size="lg"
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
              >
                {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
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
                  disabled={isTyping}
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
