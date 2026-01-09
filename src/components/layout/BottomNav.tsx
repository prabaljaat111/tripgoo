import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Hotel, Home, Sparkles, User, Grid3X3, LogOut, LayoutDashboard, LogIn, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { travelServices } from "@/data/travelServices";
const BottomNav = () => {
  const [showServices, setShowServices] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    user,
    signOut
  } = useAuth();
  const navItems = [{
    path: "/",
    label: "Home",
    icon: Home
  }, {
    path: "/flights",
    label: "Flights",
    icon: Plane
  }, {
    path: "/copilot",
    label: "AI",
    icon: Sparkles,
    featured: true
  }, {
    path: "/hotels",
    label: "Hotels",
    icon: Hotel
  }];
  const isActive = (path: string) => location.pathname === path;
  const handleSignOut = async () => {
    await signOut();
    setShowProfile(false);
    navigate("/");
  };
  const handleProfileClick = () => {
    if (user) {
      setShowProfile(!showProfile);
      setShowServices(false);
    } else {
      navigate("/auth");
    }
  };
  const handleServicesClick = () => {
    setShowServices(!showServices);
    setShowProfile(false);
  };
  return <>
      {/* Services Overlay */}
      <AnimatePresence>
        {showServices && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={() => setShowServices(false)}>
            <motion.div initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} exit={{
          opacity: 0,
          scale: 0.9
        }} transition={{
          type: "spring",
          stiffness: 300,
          damping: 30
        }} onClick={e => e.stopPropagation()} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] liquid-glass rounded-3xl p-5 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="font-display font-bold text-lg">All Services</h3>
                <button onClick={() => setShowServices(false)} className="w-8 h-8 rounded-full bg-black/10 items-center justify-center flex flex-row text-center">
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-4 gap-4 px-2">
                {travelServices.map(service => <Link key={service.id} to={service.path} onClick={() => setShowServices(false)} className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-white/40 active:scale-95 transition-all">
                    <div className={`w-14 h-14 rounded-2xl ${service.bgColor} flex items-center justify-center shadow-sm`}>
                      <service.icon className={`w-6 h-6 ${service.color}`} />
                    </div>
                    <span className="text-[11px] font-medium text-center text-foreground/80 leading-tight line-clamp-2">
                      {service.name}
                    </span>
                  </Link>)}
              </div>
            </motion.div>
          </motion.div>}
      </AnimatePresence>

      {/* Profile Menu Overlay */}
      <AnimatePresence>
        {showProfile && user && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={() => setShowProfile(false)}>
            <motion.div initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} exit={{
          opacity: 0,
          scale: 0.9
        }} transition={{
          type: "spring",
          stiffness: 300,
          damping: 30
        }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] liquid-glass rounded-3xl p-5 overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-black/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">
                    {user.user_metadata?.full_name || user.email?.split('@')[0]}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
              </div>

              <div className="space-y-1">
                <Link to="/dashboard" onClick={() => setShowProfile(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/40 active:scale-[0.98] transition-all">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <LayoutDashboard className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium">Dashboard</p>
                    <p className="text-xs text-muted-foreground">View your bookings & trips</p>
                  </div>
                </Link>

                <button onClick={handleSignOut} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 active:scale-[0.98] transition-all text-left">
                  <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                    <LogOut className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <p className="font-medium text-red-600">Sign Out</p>
                    <p className="text-xs text-muted-foreground">See you next time!</p>
                  </div>
                </button>
              </div>
            </motion.div>
          </motion.div>}
      </AnimatePresence>

      {/* Floating Bottom Nav */}
      <motion.nav initial={{
      y: 100,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} transition={{
      type: "spring",
      stiffness: 300,
      damping: 30,
      delay: 0.1
    }} className="fixed bottom-3 sm:bottom-4 left-0 right-0 z-50 flex justify-center px-3 sm:px-4">
        <div className="liquid-glass rounded-2xl sm:rounded-[28px] px-2 sm:px-3 py-1.5 sm:py-2 shadow-2xl w-full max-w-[95vw] sm:max-w-md">
          <div className="flex items-center justify-around">
            {navItems.map(item => {
            const active = isActive(item.path);
            if (item.featured) {
              return <Link key={item.path} to={item.path} className="relative">
                    <motion.div whileTap={{
                  scale: 0.9
                }} whileHover={{
                  scale: 1.05
                }} className="relative -mt-5 sm:-mt-7">
                      <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/40">
                        <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent" />
                      <motion.div className="absolute inset-0 rounded-full bg-primary/20" animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5]
                  }} transition={{
                    repeat: Infinity,
                    duration: 2
                  }} />
                    </motion.div>
                    <span className="absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 text-[8px] sm:text-[9px] font-semibold text-primary whitespace-nowrap">
                      AI Copilot
                    </span>
                  </Link>;
            }
            return <Link key={item.path} to={item.path}>
                  <motion.div whileTap={{
                scale: 0.9
              }} className={`flex flex-col items-center gap-0.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl transition-all ${active ? "bg-white/50" : ""}`}>
                    <item.icon className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${active ? "text-primary" : "text-foreground/60"}`} />
                    <span className={`text-[9px] sm:text-[10px] font-medium transition-colors ${active ? "text-primary" : "text-foreground/60"}`}>
                      {item.label}
                    </span>
                  </motion.div>
                </Link>;
          })}

            {/* Profile/Auth Button */}
            <motion.button whileTap={{
            scale: 0.9
          }} onClick={handleProfileClick} className={`flex flex-col items-center gap-0.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl transition-all ${showProfile || isActive("/dashboard") || isActive("/auth") ? "bg-white/50" : ""}`}>
              {user ? <>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <User className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                  </div>
                  <span className={`text-[9px] sm:text-[10px] font-medium transition-colors ${showProfile || isActive("/dashboard") ? "text-primary" : "text-foreground/60"}`}>
                    Profile
                  </span>
                </> : <>
                  <LogIn className="w-4 h-4 sm:w-5 sm:h-5 text-foreground/60" />
                  <span className="text-[9px] sm:text-[10px] font-medium text-foreground/60">
                    Sign In
                  </span>
                </>}
            </motion.button>

            {/* More Services Button */}
            <motion.button whileTap={{
            scale: 0.9
          }} onClick={handleServicesClick} className={`flex flex-col items-center gap-0.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl transition-all ${showServices ? "bg-white/50" : ""}`}>
              <Grid3X3 className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${showServices ? "text-primary" : "text-foreground/60"}`} />
              <span className={`text-[9px] sm:text-[10px] font-medium transition-colors ${showServices ? "text-primary" : "text-foreground/60"}`}>
                More
              </span>
            </motion.button>
          </div>
        </div>
      </motion.nav>
    </>;
};
export default BottomNav;