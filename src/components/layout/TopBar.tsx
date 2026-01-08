import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const TopBar = () => {
  const location = useLocation();
  
  // Only show on home page
  if (location.pathname !== "/") return null;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-3 sm:top-4 left-0 right-0 z-50 flex justify-center px-3 sm:px-4"
    >
      <div className="liquid-glass rounded-xl sm:rounded-2xl px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-center">
        <Link to="/" className="flex items-center">
          <span className="font-display font-bold text-lg sm:text-xl text-foreground">
            Trip<span className="text-primary">Go</span>
          </span>
        </Link>
      </div>
    </motion.header>
  );
};

export default TopBar;
