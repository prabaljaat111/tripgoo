import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  FileCheck, 
  Search,
  Clock,
  CheckCircle,
  Globe,
  FileText,
  Calendar
} from "lucide-react";

const visaCountries = [
  {
    id: "v1",
    country: "United States",
    flag: "🇺🇸",
    type: "Tourist Visa",
    processingTime: "3-5 weeks",
    validity: "10 years",
    price: 14500,
    documents: ["Passport", "Photo", "Bank Statement", "Employment Letter"]
  },
  {
    id: "v2",
    country: "United Kingdom",
    flag: "🇬🇧",
    type: "Visitor Visa",
    processingTime: "15 working days",
    validity: "6 months",
    price: 11500,
    documents: ["Passport", "Photo", "ITR", "Bank Statement"]
  },
  {
    id: "v3",
    country: "Schengen (Europe)",
    flag: "🇪🇺",
    type: "Tourist Visa",
    processingTime: "15-20 days",
    validity: "90 days",
    price: 7500,
    documents: ["Passport", "Photo", "Travel Insurance", "Hotel Booking"]
  },
  {
    id: "v4",
    country: "Australia",
    flag: "🇦🇺",
    type: "Tourist Visa",
    processingTime: "20-25 days",
    validity: "1 year",
    price: 9500,
    documents: ["Passport", "Photo", "Bank Statement", "Cover Letter"]
  },
  {
    id: "v5",
    country: "Singapore",
    flag: "🇸🇬",
    type: "Tourist Visa",
    processingTime: "3-5 days",
    validity: "30 days",
    price: 2500,
    documents: ["Passport", "Photo", "Flight Booking", "Hotel Booking"]
  },
  {
    id: "v6",
    country: "Thailand",
    flag: "🇹🇭",
    type: "Tourist Visa",
    processingTime: "2-3 days",
    validity: "60 days",
    price: 3500,
    documents: ["Passport", "Photo", "Flight Booking"]
  },
  {
    id: "v7",
    country: "UAE (Dubai)",
    flag: "🇦🇪",
    type: "Tourist Visa",
    processingTime: "3-4 days",
    validity: "30 days",
    price: 5500,
    documents: ["Passport", "Photo", "Flight Booking"]
  },
  {
    id: "v8",
    country: "Canada",
    flag: "🇨🇦",
    type: "Tourist Visa",
    processingTime: "3-4 weeks",
    validity: "10 years",
    price: 12500,
    documents: ["Passport", "Photo", "Bank Statement", "ITR"]
  },
];

const VisaPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredCountries = visaCountries.filter(v => 
    v.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-12 bg-gradient-to-br from-indigo-500 to-purple-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <Badge className="mb-4 bg-white/20 text-white border-0">
              <FileCheck className="w-3 h-3 mr-1" />
              Visa Services
            </Badge>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
              Hassle-Free Visa Assistance
            </h1>
            <p className="text-white/80">Expert guidance for visa applications worldwide</p>
          </motion.div>

          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Search country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg bg-white/95"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCountries.map((visa) => (
              <motion.div
                key={visa.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
                  <CardContent className="p-4 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-4xl">{visa.flag}</span>
                      <div>
                        <h3 className="font-semibold">{visa.country}</h3>
                        <p className="text-sm text-muted-foreground">{visa.type}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4 flex-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-indigo-600" />
                        <span>Processing: {visa.processingTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-indigo-600" />
                        <span>Validity: {visa.validity}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="w-4 h-4 text-indigo-600" />
                        <span>{visa.documents.length} Documents Required</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <div>
                        <span className="font-bold text-lg">₹{visa.price.toLocaleString()}</span>
                        <span className="text-muted-foreground text-sm">/person</span>
                      </div>
                      <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">Apply Now</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-2xl text-center mb-8">Why Choose Our Visa Service?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: CheckCircle, title: "High Success Rate", desc: "98% visa approval rate" },
              { icon: Clock, title: "Fast Processing", desc: "Quick turnaround time" },
              { icon: FileText, title: "Document Assistance", desc: "Complete guidance" },
              { icon: Globe, title: "Global Coverage", desc: "150+ countries" },
            ].map((item) => (
              <Card key={item.title} className="text-center p-6">
                <item.icon className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VisaPage;
