import { Link } from "react-router-dom";
import { Plane, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 gradient-hero rounded-xl flex items-center justify-center">
                <Plane className="w-5 h-5 text-white transform -rotate-45" />
              </div>
              <span className="font-display font-bold text-xl">
                Trip<span className="text-primary">Go</span>
              </span>
            </Link>
            <p className="text-white/70 text-sm mb-6">
              India's AI-first travel platform. Plan smarter, travel better.
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

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/flights" className="text-white/70 hover:text-white transition-colors">Flights</Link></li>
              <li><Link to="/hotels" className="text-white/70 hover:text-white transition-colors">Hotels</Link></li>
              <li><Link to="/copilot" className="text-white/70 hover:text-white transition-colors">AI Copilot</Link></li>
              <li><Link to="/dashboard" className="text-white/70 hover:text-white transition-colors">My Trips</Link></li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Popular Destinations</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Goa</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Manali</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Jaipur</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Kerala</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Ladakh</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-white/70">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Mumbai, India</span>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Phone className="w-5 h-5 text-primary" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Mail className="w-5 h-5 text-primary" />
                <span>hello@tripgo.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            © 2024 TripGo. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/50">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
