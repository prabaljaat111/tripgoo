import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const TopBar = () => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md"
    >
      <div className="liquid-glass rounded-2xl px-4 py-2.5 flex items-center justify-center">
        <Link to="/" className="flex items-center">
          <span className="font-display font-bold text-xl text-foreground">
            Trip<span className="text-primary">Go</span>
          </span>
        </Link>
      </div>
    </motion.header>
  );
};

export default TopBar;
