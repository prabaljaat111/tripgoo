import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const FloatingAIButton = () => {
  return (
    <Link to="/copilot" className="fixed bottom-24 sm:bottom-28 right-4 sm:right-6 z-50">
      <motion.div
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        className="relative"
      >
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/40">
          <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        </div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent" />
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/20"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
        />
        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] sm:text-[10px] font-semibold text-primary whitespace-nowrap bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm">
          AI Copilot
        </span>
      </motion.div>
    </Link>
  );
};

export default FloatingAIButton;
