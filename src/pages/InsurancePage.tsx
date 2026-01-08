import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  Shield, 
  CheckCircle,
  Plane,
  Heart,
  Briefcase,
  AlertTriangle,
  Users,
  Calendar
} from "lucide-react";

const insurancePlans = [
  {
    id: "ins1",
    name: "Basic Travel Cover",
    coverage: "₹5 Lakhs",
    price: 499,
    duration: "Up to 15 days",
    features: [
      "Medical Expenses",
      "Trip Cancellation",
      "Baggage Loss",
      "24/7 Assistance"
    ],
    recommended: false
  },
  {
    id: "ins2",
    name: "Comprehensive Cover",
    coverage: "₹15 Lakhs",
    price: 999,
    duration: "Up to 30 days",
    features: [
      "Medical Expenses",
      "Trip Cancellation",
      "Baggage Loss",
      "Flight Delay",
      "Adventure Sports",
      "Emergency Evacuation"
    ],
    recommended: true
  },
  {
    id: "ins3",
    name: "Premium Cover",
    coverage: "₹50 Lakhs",
    price: 1999,
    duration: "Up to 45 days",
    features: [
      "All Comprehensive Benefits",
      "Pre-existing Conditions",
      "Home Burglary",
      "Personal Liability",
      "Legal Expenses",
      "Cashless Hospitalization"
    ],
    recommended: false
  },
  {
    id: "ins4",
    name: "Annual Multi-Trip",
    coverage: "₹25 Lakhs",
    price: 4999,
    duration: "1 Year (Multiple Trips)",
    features: [
      "Unlimited International Trips",
      "Medical Expenses",
      "Trip Cancellation",
      "Baggage Protection",
      "Business Equipment"
    ],
    recommended: false
  },
];

const coverageTypes = [
  { icon: Heart, title: "Medical Coverage", desc: "Hospital & treatment expenses" },
  { icon: Plane, title: "Trip Protection", desc: "Cancellation & interruption" },
  { icon: Briefcase, title: "Baggage Cover", desc: "Loss, theft & delay" },
  { icon: AlertTriangle, title: "Emergency Help", desc: "24/7 global assistance" },
];

const InsurancePage = () => {
  const [travelers, setTravelers] = useState(1);
  const [destination, setDestination] = useState("international");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-12 bg-gradient-to-br from-rose-500 to-pink-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <Badge className="mb-4 bg-white/20 text-white border-0">
              <Shield className="w-3 h-3 mr-1" />
              Travel Insurance
            </Badge>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
              Travel with Complete Peace of Mind
            </h1>
            <p className="text-white/80">Comprehensive coverage for your journeys</p>
          </motion.div>

          <Card className="max-w-2xl mx-auto bg-white/95 backdrop-blur">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Destination</label>
                  <select 
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full h-12 rounded-lg border border-input bg-background px-4"
                  >
                    <option value="international">International</option>
                    <option value="domestic">Domestic</option>
                    <option value="schengen">Schengen Countries</option>
                    <option value="usa">USA / Canada</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Travelers</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      type="number"
                      value={travelers}
                      onChange={(e) => setTravelers(parseInt(e.target.value) || 1)}
                      min={1}
                      className="pl-10 h-12"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Travel Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      type="date"
                      className="pl-10 h-12"
                    />
                  </div>
                </div>
              </div>
              <Button className="w-full mt-4 h-12 bg-rose-600 hover:bg-rose-700">
                View Plans
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {coverageTypes.map((type) => (
              <Card key={type.title} className="text-center p-4">
                <type.icon className="w-10 h-10 text-rose-600 mx-auto mb-3" />
                <h3 className="font-semibold text-sm mb-1">{type.title}</h3>
                <p className="text-xs text-muted-foreground">{type.desc}</p>
              </Card>
            ))}
          </div>

          <h2 className="font-display font-bold text-2xl mb-6 text-center">Choose Your Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {insurancePlans.map((plan) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className={`h-full flex flex-col ${plan.recommended ? 'ring-2 ring-rose-500' : ''}`}>
                  {plan.recommended && (
                    <div className="bg-rose-500 text-white text-center py-1 text-sm font-medium">
                      Recommended
                    </div>
                  )}
                  <CardContent className="p-4 flex-1 flex flex-col">
                    <h3 className="font-semibold text-lg mb-1">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{plan.duration}</p>
                    
                    <div className="mb-4">
                      <span className="text-3xl font-bold">₹{plan.price}</span>
                      <span className="text-muted-foreground">/person</span>
                    </div>
                    
                    <div className="mb-4 p-3 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Coverage up to</p>
                      <p className="font-bold text-lg">{plan.coverage}</p>
                    </div>
                    
                    <ul className="space-y-2 mb-4 flex-1">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full ${plan.recommended ? 'bg-rose-600 hover:bg-rose-700' : ''}`}
                      variant={plan.recommended ? "default" : "outline"}
                    >
                      Select Plan
                    </Button>
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

export default InsurancePage;
