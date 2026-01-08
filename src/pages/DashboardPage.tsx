import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import TrustScoreBadge from "@/components/TrustScoreBadge";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Hotel, Calendar, Bell, Sparkles, Plus, Loader2
} from "lucide-react";

const DashboardPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

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
    <div className="min-h-screen bg-muted/30 pb-24">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold">
              Welcome back, {user.user_metadata?.full_name || user.email?.split('@')[0]}!
            </h1>
            <p className="text-muted-foreground">Manage your trips and bookings</p>
          </div>
          <Link to="/copilot">
            <Button variant="hero">
              <Sparkles className="w-4 h-4 mr-2" />
              Plan New Trip
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card variant="glass">
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-primary">1</p>
                  <p className="text-sm text-muted-foreground">Upcoming Trips</p>
                </CardContent>
              </Card>
              <Card variant="glass">
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-secondary">0</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </CardContent>
              </Card>
              <Card variant="glass">
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-green-600">₹2K</p>
                  <p className="text-sm text-muted-foreground">Saved</p>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Trips */}
            <Card variant="elevated">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Upcoming Trips</CardTitle>
                <Link to="/copilot">
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Trip
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <motion.div 
                      key={booking.id} 
                      className="flex gap-4 p-4 bg-muted/50 rounded-xl"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <img 
                        src={booking.image} 
                        alt={booking.destination} 
                        className="w-24 h-24 rounded-lg object-cover" 
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-display font-bold text-lg">{booking.destination}</h3>
                          <Badge variant="success">Confirmed</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Hotel className="w-4 h-4" />{booking.hotel}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-4 h-4" />{booking.dates}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <TrustScoreBadge score={booking.trustScore} size="sm" />
                          <span className="font-bold text-primary">₹{booking.total.toLocaleString()}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">No upcoming trips yet</p>
                    <Link to="/copilot">
                      <Button variant="hero-secondary">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Plan Your First Trip
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card variant="glass">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">
                    {(user.user_metadata?.full_name || user.email)?.[0]?.toUpperCase()}
                  </span>
                </div>
                <h3 className="font-display font-bold">
                  {user.user_metadata?.full_name || "Traveler"}
                </h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <Badge variant="secondary" className="mt-2">Free Plan</Badge>
              </CardContent>
            </Card>

            {/* AI Guardian Alerts */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-secondary" />
                  AI Guardian Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex gap-3 p-3 bg-secondary/10 rounded-lg">
                    <Bell className="w-5 h-5 text-secondary flex-shrink-0" />
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
