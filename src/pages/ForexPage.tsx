import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  CreditCard, 
  ArrowLeftRight,
  TrendingUp,
  Shield,
  Globe,
  Wallet,
  RefreshCw
} from "lucide-react";

const currencies = [
  { code: "USD", name: "US Dollar", flag: "🇺🇸", buyRate: 83.25, sellRate: 84.50 },
  { code: "EUR", name: "Euro", flag: "🇪🇺", buyRate: 90.15, sellRate: 91.80 },
  { code: "GBP", name: "British Pound", flag: "🇬🇧", buyRate: 105.40, sellRate: 107.20 },
  { code: "AED", name: "UAE Dirham", flag: "🇦🇪", buyRate: 22.65, sellRate: 23.10 },
  { code: "SGD", name: "Singapore Dollar", flag: "🇸🇬", buyRate: 61.80, sellRate: 63.20 },
  { code: "THB", name: "Thai Baht", flag: "🇹🇭", buyRate: 2.35, sellRate: 2.48 },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺", buyRate: 54.20, sellRate: 55.60 },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦", buyRate: 61.45, sellRate: 62.90 },
];

const forexCards = [
  {
    id: "fc1",
    name: "Multi-Currency Forex Card",
    description: "Load up to 15 currencies on a single card",
    features: ["Zero markup fees", "ATM withdrawals", "Chip & PIN protected", "24/7 support"],
    fee: 499
  },
  {
    id: "fc2",
    name: "Student Forex Card",
    description: "Special card for students studying abroad",
    features: ["Lower rates", "Higher limits", "Parent dashboard", "Emergency cash"],
    fee: 299
  },
];

const ForexPage = () => {
  const [amount, setAmount] = useState(1000);
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [mode, setMode] = useState<"buy" | "sell">("buy");

  const selectedCurrency = currencies.find(c => c.code === toCurrency);
  const rate = mode === "buy" ? selectedCurrency?.buyRate || 83.25 : selectedCurrency?.sellRate || 84.50;
  const convertedAmount = (amount / rate).toFixed(2);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-12 bg-gradient-to-br from-emerald-500 to-teal-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <Badge className="mb-4 bg-white/20 text-white border-0">
              <CreditCard className="w-3 h-3 mr-1" />
              Forex Services
            </Badge>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
              Forex Card & Currency Exchange
            </h1>
            <p className="text-white/80">Best rates for your international travel</p>
          </motion.div>

          <Card className="max-w-2xl mx-auto bg-white/95 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex gap-2 mb-6">
                <Button 
                  variant={mode === "buy" ? "default" : "outline"}
                  onClick={() => setMode("buy")}
                  className={mode === "buy" ? "bg-emerald-600 hover:bg-emerald-700 flex-1" : "flex-1"}
                >
                  Buy Forex
                </Button>
                <Button 
                  variant={mode === "sell" ? "default" : "outline"}
                  onClick={() => setMode("sell")}
                  className={mode === "sell" ? "bg-emerald-600 hover:bg-emerald-700 flex-1" : "flex-1"}
                >
                  Sell Forex
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="text-sm font-medium mb-2 block">Amount (INR)</label>
                  <Input 
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                    className="h-12"
                  />
                </div>
                <div className="flex justify-center">
                  <div className="p-3 rounded-full bg-muted">
                    <ArrowLeftRight className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Currency</label>
                  <select 
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    className="w-full h-12 rounded-lg border border-input bg-background px-4"
                  >
                    {currencies.map((c) => (
                      <option key={c.code} value={c.code}>{c.flag} {c.code} - {c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">You {mode === "buy" ? "receive" : "get"}</p>
                    <p className="text-2xl font-bold">{toCurrency} {convertedAmount}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Rate</p>
                    <p className="font-semibold">₹{rate} / {toCurrency}</p>
                  </div>
                </div>
              </div>

              <Button className="w-full mt-4 h-12 bg-emerald-600 hover:bg-emerald-700">
                Get Best Rates
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-2xl mb-6 text-center">Live Exchange Rates</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {currencies.map((currency) => (
              <Card key={currency.code} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{currency.flag}</span>
                    <span className="font-semibold">{currency.code}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{currency.name}</p>
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="text-muted-foreground">Buy</p>
                      <p className="font-semibold text-green-600">₹{currency.buyRate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Sell</p>
                      <p className="font-semibold text-red-600">₹{currency.sellRate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-2xl mb-6 text-center">Forex Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {forexCards.map((card) => (
              <Card key={card.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-full bg-emerald-100">
                      <CreditCard className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{card.name}</h3>
                      <p className="text-sm text-muted-foreground">{card.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {card.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Shield className="w-4 h-4 text-emerald-600" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-muted-foreground text-sm">Card Fee</span>
                      <p className="font-bold">₹{card.fee}</p>
                    </div>
                    <Button className="bg-emerald-600 hover:bg-emerald-700">Apply Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ForexPage;
