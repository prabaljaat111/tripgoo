import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { travelServices } from "@/data/travelServices";

const Footer = () => {
  return (
    <footer className="bg-foreground text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <span className="font-display font-bold text-2xl">
                Trip<span className="text-primary">Go</span>
              </span>
            </Link>
            <p className="text-white/70 text-sm mb-6">
              India's AI-first travel platform. Plan smarter, travel better with our complete suite of travel services.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Travel Services */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Travel Services</h4>
            <ul className="space-y-3">
              {travelServices.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link 
                    to={service.comingSoon ? "#" : service.path} 
                    className={`text-white/70 hover:text-white transition-colors ${service.comingSoon ? 'cursor-not-allowed opacity-50' : ''}`}
                  >
                    {service.name} {service.comingSoon && "(Soon)"}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Services */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">More Services</h4>
            <ul className="space-y-3">
              {travelServices.slice(6).map((service) => (
                <li key={service.id}>
                  <Link 
                    to={service.comingSoon ? "#" : service.path} 
                    className={`text-white/70 hover:text-white transition-colors ${service.comingSoon ? 'cursor-not-allowed opacity-50' : ''}`}
                  >
                    {service.name} {service.comingSoon && "(Soon)"}
                  </Link>
                </li>
              ))}
              <li><Link to="/copilot" className="text-white/70 hover:text-white transition-colors">AI Copilot</Link></li>
              <li><Link to="/dashboard" className="text-white/70 hover:text-white transition-colors">My Trips</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/privacy-policy" className="text-white/70 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-white/70 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/refund-policy" className="text-white/70 hover:text-white transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} TripGo. A product of Roxone PVT LTD. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/50">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
