import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Plane, 
  Hotel, 
  User, 
  Menu,
  X,
  Sparkles,
  ChevronDown,
  LogOut,
  LayoutDashboard
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { travelServices } from "@/data/travelServices";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut, loading } = useAuth();

  const navItems = [
    { path: "/flights", label: "Flights", icon: Plane },
    { path: "/hotels", label: "Hotels", icon: Hotel },
    { path: "/copilot", label: "AI Copilot", icon: Sparkles, featured: true },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Text only */}
          <Link to="/" className="flex items-center">
            <span className="font-display font-bold text-2xl text-foreground">
              Trip<span className="text-primary">Go</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {/* Services Dropdown */}
            <DropdownMenu open={showServices} onOpenChange={setShowServices}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  All Services
                  <ChevronDown className={`w-4 h-4 transition-transform ${showServices ? 'rotate-180' : ''}`} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-80 p-2">
                <div className="grid grid-cols-2 gap-1">
                  {travelServices.map((service) => (
                    <DropdownMenuItem key={service.id} asChild disabled={service.comingSoon}>
                      <Link 
                        to={service.comingSoon ? "#" : service.path}
                        className={`flex items-center gap-3 p-2 rounded-lg ${service.comingSoon ? 'opacity-50' : 'hover:bg-muted'}`}
                        onClick={(e) => service.comingSoon && e.preventDefault()}
                      >
                        <div className={`w-8 h-8 rounded-lg ${service.bgColor} flex items-center justify-center`}>
                          <service.icon className={`w-4 h-4 ${service.color}`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium flex items-center gap-1">
                            {service.name}
                            {service.comingSoon && (
                              <Badge variant="secondary" className="text-[10px] px-1 py-0">Soon</Badge>
                            )}
                          </p>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={item.featured ? "hero-secondary" : isActive(item.path) ? "default" : "ghost"}
                  size="sm"
                  className={item.featured ? "gap-2" : ""}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            {loading ? (
              <div className="w-20 h-8 bg-muted animate-pulse rounded-lg" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <span className="max-w-24 truncate">{user.email?.split('@')[0]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center gap-2">
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button variant="hero" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {/* Services Grid */}
              <div className="grid grid-cols-3 gap-2 pb-4 border-b border-border">
                {travelServices.slice(0, 6).map((service) => (
                  <Link 
                    key={service.id}
                    to={service.comingSoon ? "#" : service.path}
                    onClick={() => !service.comingSoon && setIsOpen(false)}
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg ${service.comingSoon ? 'opacity-50' : 'hover:bg-muted'}`}
                  >
                    <div className={`w-10 h-10 rounded-lg ${service.bgColor} flex items-center justify-center`}>
                      <service.icon className={`w-5 h-5 ${service.color}`} />
                    </div>
                    <span className="text-xs text-center">{service.name}</span>
                  </Link>
                ))}
              </div>

              {navItems.map((item) => (
                <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}>
                  <Button
                    variant={item.featured ? "hero-secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                </Link>
              ))}
              
              <div className="border-t border-border pt-2 mt-2">
                {user ? (
                  <>
                    <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-destructive" 
                      onClick={() => { handleSignOut(); setIsOpen(false); }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    <Button variant="hero" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
