import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { travelServices } from "@/data/travelServices";
import { Badge } from "@/components/ui/badge";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const TravelServicesGrid = () => {
  return (
    <motion.div
      className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2 sm:gap-4 justify-items-center"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {travelServices.map((service) => (
        <motion.div key={service.id} variants={itemVariants}>
          <Link
            to={service.comingSoon ? "#" : service.path}
            className={`flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all ${
              service.comingSoon
                ? 'opacity-60 cursor-not-allowed' 
                : 'hover:bg-muted hover:shadow-md hover:-translate-y-1'
            }`}
            onClick={(e) => service.comingSoon && e.preventDefault()}
          >
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl ${service.bgColor} flex items-center justify-center`}>
              <service.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${service.color}`} />
            </div>
            <span className="text-[10px] sm:text-xs text-center font-medium leading-tight">
              {service.name}
            </span>
            {service.comingSoon && (
              <Badge variant="secondary" className="text-[9px] px-1 py-0">
                Soon
              </Badge>
            )}
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TravelServicesGrid;
