import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from "lucide-react";
import TrustScoreBadge from "./TrustScoreBadge";
import type { Destination } from "@/data/travelData";

interface DestinationCardProps {
  destination: Destination;
  onClick?: () => void;
}

const DestinationCard = ({ destination, onClick }: DestinationCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        variant="interactive" 
        className="overflow-hidden group"
        onClick={onClick}
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {destination.featured && (
            <Badge variant="featured" className="absolute top-3 left-3">
              Featured
            </Badge>
          )}
          
          <div className="absolute top-3 right-3">
            <TrustScoreBadge score={destination.trustScore} size="sm" showLabel={false} />
          </div>

          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="font-display font-bold text-xl text-white mb-1">
              {destination.name}
            </h3>
            <div className="flex items-center gap-1 text-white/80 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{destination.state}</span>
            </div>
          </div>
        </div>

        <CardContent className="p-4">
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {destination.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{destination.rating}</span>
            </div>
            <div className="text-right">
              <span className="text-muted-foreground text-xs">Starting from</span>
              <p className="font-display font-bold text-primary">
                ₹{destination.basePrice.toLocaleString('en-IN')}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mt-3">
            {destination.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DestinationCard;
