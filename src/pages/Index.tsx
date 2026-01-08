import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import Footer from "@/components/layout/Footer";
import DestinationCard from "@/components/DestinationCard";
import TravelServicesGrid from "@/components/TravelServicesGrid";
import { destinations } from "@/data/travelData";
import heroBg from "@/assets/hero-bg.jpg";
import { 
  Sparkles, 
  Shield, 
  ArrowRight,
  MessageCircle,
  Clock,
  IndianRupee,
  Star,
  Users,
  MapPin,
  Send
} from "lucide-react";

const Index = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const featuredDestinations = destinations.filter(d => d.featured);

  return (
    <div className="min-h-screen bg-background pb-20 sm:pb-24">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroBg} 
            alt="Travel destinations" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-transparent" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10 pt-16 sm:pt-20">
          <div className="max-w-3xl mx-auto md:mx-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="featured" className="mb-4 sm:mb-6">
                <Sparkles className="w-3 h-3 mr-1" />
                AI-Powered Travel Planning
              </Badge>
              
              <h1 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight text-center md:text-left">
                Your Dream Trip,{" "}
                <span className="text-gradient-hero bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Planned by AI
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 max-w-xl mx-auto md:mx-0 text-center md:text-left">
                Flights, Hotels, Trains, Buses, Cabs & more. Our AI Copilot creates
                personalized itineraries and handles everything for your perfect trip.
              </p>

              <div className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-1.5 sm:p-2 flex gap-2 max-w-xl mx-auto md:mx-0">
                <Input
                  variant="hero"
                  inputSize="xl"
                  placeholder="e.g., 3 days family trip under ₹30k..."
                  className="flex-1 border-0 text-sm sm:text-base"
                />
                <Link to="/copilot">
                  <Button variant="hero" size="xl" className="px-3 sm:px-4">
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Travel Services Grid */}
      <section className="py-8 sm:py-12 bg-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-6 sm:mb-8"
          >
            <h2 className="font-display text-xl sm:text-2xl font-bold mb-2">All Travel Services</h2>
            <p className="text-muted-foreground text-sm sm:text-base">Everything you need for your journey in one place</p>
          </motion.div>
          <TravelServicesGrid />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div 
            className="text-center mb-8 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="trust" className="mb-3 sm:mb-4">Why TripGo?</Badge>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Travel Smarter with AI
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
              Our AI doesn't just search — it understands. Get personalized recommendations, 
              real-time adjustments, and a guardian that watches over your trip.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Sparkles,
                title: "AI Copilot",
                description: "Chat naturally. Get complete itineraries with budget breakdowns instantly.",
                color: "text-secondary",
                bg: "bg-secondary/10",
              },
              {
                icon: Shield,
                title: "AI Trust Score",
                description: "Every hotel rated by AI based on real complaints, refunds, and reviews.",
                color: "text-green-500",
                bg: "bg-green-500/10",
              },
              {
                icon: Clock,
                title: "Trip Guardian",
                description: "Real-time alerts for delays, cancellations with instant rebooking options.",
                color: "text-primary",
                bg: "bg-primary/10",
              },
              {
                icon: IndianRupee,
                title: "Dynamic Pricing",
                description: "AI adjusts packages based on your budget without compromising quality.",
                color: "text-amber-500",
                bg: "bg-amber-500/10",
              },
            ].map((feature) => (
              <motion.div key={feature.title} variants={itemVariants}>
                <Card variant="glass" className="h-full">
                  <CardContent className="p-4 sm:p-6">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl ${feature.bg} flex items-center justify-center mb-3 sm:mb-4`}>
                      <feature.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${feature.color}`} />
                    </div>
                    <h3 className="font-display font-bold text-base sm:text-lg mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-12 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <Badge variant="trust" className="mb-3 sm:mb-4">Popular Destinations</Badge>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold">
                Trending Places to Visit
              </h2>
            </div>
            <Link to="/copilot">
              <Button variant="outline" className="group">
                View All
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featuredDestinations.map((destination) => (
              <motion.div key={destination.id} variants={itemVariants}>
                <DestinationCard destination={destination} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* AI Copilot CTA */}
      <section className="py-12 sm:py-24 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-50" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <MessageCircle className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
              </div>
              
              <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
                Ready to Plan Your Perfect Trip?
              </h2>
              
              <p className="text-white/80 text-sm sm:text-lg mb-6 sm:mb-8 max-w-xl mx-auto">
                Just describe your dream vacation in plain language.
                Our AI will handle the rest — from destination to doorstep.
              </p>

              <Link to="/copilot">
                <Button variant="glass" size="xl" className="group">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                  Start Planning with AI
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 sm:py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
            {[
              { value: "50K+", label: "Happy Travelers", icon: Users },
              { value: "100+", label: "Destinations", icon: MapPin },
              { value: "4.8", label: "Average Rating", icon: Star },
              { value: "₹2Cr+", label: "Saved by AI", icon: IndianRupee },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                </div>
                <p className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-foreground">
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-xs sm:text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
