import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Wifi, Car, UtensilsCrossed, Waves, Dumbbell } from "lucide-react";
import TrustScoreBadge from "./TrustScoreBadge";
import type { Hotel } from "@/data/travelData";

interface HotelCardProps {
  hotel: Hotel;
  onClick?: () => void;
}

const amenityIcons: Record<string, any> = {
  'WiFi': Wifi,
  'Parking': Car,
  'Restaurant': UtensilsCrossed,
  'Pool': Waves,
  'Gym': Dumbbell,
};

const HotelCard = ({ hotel, onClick }: HotelCardProps) => {
  const categoryColors = {
    budget: "bg-green-100 text-green-700",
    standard: "bg-blue-100 text-blue-700",
    premium: "bg-purple-100 text-purple-700",
    luxury: "bg-amber-100 text-amber-700",
  };

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
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-64 h-48 md:h-auto overflow-hidden">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <Badge 
              className={`absolute top-3 left-3 capitalize ${categoryColors[hotel.category]}`}
            >
              {hotel.category}
            </Badge>
          </div>

          <CardContent className="flex-1 p-4">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h3 className="font-display font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                  {hotel.name}
                </h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-sm">{hotel.rating}</span>
                  </div>
                  <span className="text-muted-foreground text-xs">
                    ({hotel.reviewCount.toLocaleString()} reviews)
                  </span>
                </div>
              </div>
              <TrustScoreBadge score={hotel.trustScore} size="sm" />
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {hotel.amenities.slice(0, 4).map((amenity) => {
                const Icon = amenityIcons[amenity];
                return (
                  <div 
                    key={amenity} 
                    className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded"
                  >
                    {Icon && <Icon className="w-3 h-3" />}
                    <span>{amenity}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-end justify-between">
              <div className="text-xs text-muted-foreground">
                <p>Complaint ratio: <span className={hotel.complaintRatio < 0.05 ? "text-green-600" : "text-amber-600"}>{(hotel.complaintRatio * 100).toFixed(1)}%</span></p>
              </div>
              <div className="text-right">
                <span className="text-muted-foreground text-xs">per night</span>
                <p className="font-display font-bold text-xl text-primary">
                  ₹{hotel.pricePerNight.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
};

export default HotelCard;
