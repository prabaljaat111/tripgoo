import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import TrustScoreBadge from "@/components/TrustScoreBadge";
import { 
  Plane, Hotel, Calendar, MapPin, Clock, AlertTriangle, 
  CheckCircle, ArrowRight, Bell, User
} from "lucide-react";

const DashboardPage = () => {
  const bookings = [
    {
      id: "1",
      destination: "Goa",
      hotel: "Taj Exotica Resort & Spa",
      trustScore: 9.2,
      dates: "Jan 15 - Jan 18, 2024",
      status: "confirmed",
      total: 45000,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
    },
  ];

  const alerts = [
    { id: "1", type: "info", message: "Weather update: Clear skies expected in Goa", time: "2h ago" },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold">My Dashboard</h1>
            <p className="text-muted-foreground">Manage your trips and bookings</p>
          </div>
          <Button variant="hero"><Bell className="w-4 h-4 mr-2" />Alerts</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card variant="elevated">
              <CardHeader><CardTitle>Upcoming Trips</CardTitle></CardHeader>
              <CardContent>
                {bookings.map((booking) => (
                  <div key={booking.id} className="flex gap-4 p-4 bg-muted/50 rounded-xl">
                    <img src={booking.image} alt={booking.destination} className="w-24 h-24 rounded-lg object-cover" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-display font-bold text-lg">{booking.destination}</h3>
                        <Badge variant="success"><CheckCircle className="w-3 h-3 mr-1" />Confirmed</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1"><Hotel className="w-4 h-4" />{booking.hotel}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1"><Calendar className="w-4 h-4" />{booking.dates}</p>
                      <div className="flex items-center justify-between mt-2">
                        <TrustScoreBadge score={booking.trustScore} size="sm" />
                        <span className="font-bold text-primary">₹{booking.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card variant="glass">
              <CardHeader><CardTitle className="text-lg">AI Guardian Alerts</CardTitle></CardHeader>
              <CardContent>
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex gap-3 p-3 bg-secondary/10 rounded-lg">
                    <Bell className="w-5 h-5 text-secondary" />
                    <div>
                      <p className="text-sm">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
