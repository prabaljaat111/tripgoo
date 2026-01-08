import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane, Clock, ArrowRight } from "lucide-react";
import type { Flight } from "@/data/travelData";

interface FlightCardProps {
  flight: Flight;
  onClick?: () => void;
}

const FlightCard = ({ flight, onClick }: FlightCardProps) => {
  const classColors = {
    economy: "bg-muted text-muted-foreground",
    business: "bg-secondary/20 text-secondary",
    first: "bg-amber-100 text-amber-700",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        variant="interactive" 
        className="overflow-hidden"
        onClick={onClick}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <Plane className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="font-semibold">{flight.airline}</p>
                <p className="text-xs text-muted-foreground">{flight.id}</p>
              </div>
            </div>
            <Badge className={classColors[flight.class]} variant="outline">
              {flight.class.charAt(0).toUpperCase() + flight.class.slice(1)}
            </Badge>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="text-center">
              <p className="font-display font-bold text-2xl">{flight.departureTime}</p>
              <p className="text-sm text-muted-foreground">{flight.from}</p>
            </div>

            <div className="flex-1 px-4">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <div className="h-px flex-1 bg-border" />
                <div className="flex items-center gap-1 text-xs">
                  <Clock className="w-3 h-3" />
                  <span>{flight.duration}</span>
                </div>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="flex justify-center mt-1">
                <Badge variant="outline" className="text-xs">
                  {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                </Badge>
              </div>
            </div>

            <div className="text-center">
              <p className="font-display font-bold text-2xl">{flight.arrivalTime}</p>
              <p className="text-sm text-muted-foreground">{flight.to}</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border">
            <span className="text-muted-foreground text-sm">Price per person</span>
            <p className="font-display font-bold text-xl text-primary">
              ₹{flight.price.toLocaleString('en-IN')}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FlightCard;
