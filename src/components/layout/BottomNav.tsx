import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Plane, 
  Hotel, 
  Home,
  Sparkles,
  User,
  Grid3X3
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { travelServices } from "@/data/travelServices";

const BottomNav = () => {
  const [showServices, setShowServices] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/flights", label: "Flights", icon: Plane },
    { path: "/copilot", label: "AI", icon: Sparkles, featured: true },
    { path: "/hotels", label: "Hotels", icon: Hotel },
    { path: user ? "/dashboard" : "/auth", label: user ? "Profile" : "Sign In", icon: User },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Services Overlay */}
      {showServices && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setShowServices(false)}
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 w-full max-w-md liquid-glass rounded-3xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-4 gap-3">
              {travelServices.map((service) => (
                <Link
                  key={service.id}
                  to={service.path}
                  onClick={() => setShowServices(false)}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-2xl hover:bg-white/30 transition-all"
                >
                  <div className={`w-11 h-11 rounded-2xl ${service.bgColor} flex items-center justify-center shadow-sm`}>
                    <service.icon className={`w-5 h-5 ${service.color}`} />
                  </div>
                  <span className="text-[10px] font-medium text-center text-foreground/80 leading-tight">
                    {service.name}
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Floating Bottom Nav */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md"
      >
        <div className="liquid-glass rounded-[28px] px-2 py-2 shadow-2xl">
          <div className="flex items-center justify-around">
            {navItems.map((item) => {
              const active = isActive(item.path);
              
              if (item.featured) {
                return (
                  <Link key={item.path} to={item.path} className="relative">
                    <motion.div
                      whileTap={{ scale: 0.9 }}
                      className="relative -mt-6"
                    >
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30">
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent" />
                    </motion.div>
                  </Link>
                );
              }

              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-2xl transition-all ${
                      active ? "bg-white/40" : ""
                    }`}
                  >
                    <item.icon 
                      className={`w-5 h-5 transition-colors ${
                        active ? "text-primary" : "text-foreground/60"
                      }`} 
                    />
                    <span 
                      className={`text-[10px] font-medium transition-colors ${
                        active ? "text-primary" : "text-foreground/60"
                      }`}
                    >
                      {item.label}
                    </span>
                  </motion.div>
                </Link>
              );
            })}

            {/* More Services Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowServices(!showServices)}
              className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-2xl transition-all ${
                showServices ? "bg-white/40" : ""
              }`}
            >
              <Grid3X3 
                className={`w-5 h-5 transition-colors ${
                  showServices ? "text-primary" : "text-foreground/60"
                }`} 
              />
              <span 
                className={`text-[10px] font-medium transition-colors ${
                  showServices ? "text-primary" : "text-foreground/60"
                }`}
              >
                More
              </span>
            </motion.button>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default BottomNav;
