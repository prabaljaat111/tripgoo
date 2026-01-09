import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin, Navigation, Clock, Car, Bike, ArrowRight, Locate } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Fixed token - corrected typo
mapboxgl.accessToken = 'pk.eyJ1Ijoia3VtYXJpLXN1bWFuIiwiYSI6ImNrdGNqcXNucDBkYTcydXRkdjl2ZmQ2MzcifQ.DIKZixks9A2vbGBf4azzHA';

interface Location {
  lng: number;
  lat: number;
  name: string;
}

interface RideOption {
  id: string;
  name: string;
  icon: typeof Car;
  basePrice: number;
  pricePerKm: number;
  eta: string;
  description: string;
}

const rideOptions: RideOption[] = [
  { id: "bike", name: "Bike", icon: Bike, basePrice: 15, pricePerKm: 5, eta: "2 min", description: "Quick & affordable" },
  { id: "auto", name: "Auto", icon: Car, basePrice: 25, pricePerKm: 8, eta: "3 min", description: "Comfortable ride" },
  { id: "mini", name: "Mini", icon: Car, basePrice: 40, pricePerKm: 10, eta: "4 min", description: "Compact car" },
  { id: "sedan", name: "Sedan", icon: Car, basePrice: 60, pricePerKm: 14, eta: "5 min", description: "Premium comfort" },
  { id: "suv", name: "SUV", icon: Car, basePrice: 80, pricePerKm: 18, eta: "6 min", description: "Extra space" },
];

const RidesPage = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const pickupMarker = useRef<mapboxgl.Marker | null>(null);
  const dropMarker = useRef<mapboxgl.Marker | null>(null);
  
  const [pickup, setPickup] = useState<Location | null>(null);
  const [drop, setDrop] = useState<Location | null>(null);
  const [pickupSearch, setPickupSearch] = useState("");
  const [dropSearch, setDropSearch] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState<any[]>([]);
  const [dropSuggestions, setDropSuggestions] = useState<any[]>([]);
  const [distance, setDistance] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [selectedRide, setSelectedRide] = useState<string>("mini");
  const [showBooking, setShowBooking] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [activeInput, setActiveInput] = useState<"pickup" | "drop" | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [77.5946, 12.9716],
      zoom: 12,
      attributionControl: false,
    });

    map.current.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "bottom-right");

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Geocoding search
  const searchLocation = useCallback(async (query: string, type: "pickup" | "drop") => {
    if (!query || query.length < 3) {
      type === "pickup" ? setPickupSuggestions([]) : setDropSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxgl.accessToken}&country=in&limit=5`
      );
      const data = await response.json();
      if (type === "pickup") {
        setPickupSuggestions(data.features || []);
      } else {
        setDropSuggestions(data.features || []);
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  }, []);

  // Get current location
  const getCurrentLocation = useCallback(() => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { longitude, latitude } = position.coords;
          
          try {
            const response = await fetch(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`
            );
            const data = await response.json();
            const placeName = data.features?.[0]?.place_name || "Current Location";
            
            setPickup({ lng: longitude, lat: latitude, name: placeName });
            setPickupSearch(placeName);
            
            if (map.current) {
              map.current.flyTo({ center: [longitude, latitude], zoom: 15 });
            }
          } catch (error) {
            console.error("Reverse geocode error:", error);
            setPickup({ lng: longitude, lat: latitude, name: "Current Location" });
            setPickupSearch("Current Location");
          }
          setIsLocating(false);
        },
        (error) => {
          console.error("Location error:", error);
          setIsLocating(false);
        }
      );
    }
  }, []);

  // Select location from suggestions
  const selectLocation = useCallback((feature: any, type: "pickup" | "drop") => {
    const [lng, lat] = feature.center;
    const name = feature.place_name;

    if (type === "pickup") {
      setPickup({ lng, lat, name });
      setPickupSearch(name);
      setPickupSuggestions([]);
    } else {
      setDrop({ lng, lat, name });
      setDropSearch(name);
      setDropSuggestions([]);
    }
    setActiveInput(null);
  }, []);

  // Update markers and route
  useEffect(() => {
    if (!map.current) return;

    if (pickup) {
      if (pickupMarker.current) {
        pickupMarker.current.setLngLat([pickup.lng, pickup.lat]);
      } else {
        const el = document.createElement("div");
        el.className = "w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center";
        el.innerHTML = '<div class="w-2 h-2 bg-white rounded-full"></div>';
        pickupMarker.current = new mapboxgl.Marker(el)
          .setLngLat([pickup.lng, pickup.lat])
          .addTo(map.current);
      }
    }

    if (drop) {
      if (dropMarker.current) {
        dropMarker.current.setLngLat([drop.lng, drop.lat]);
      } else {
        const el = document.createElement("div");
        el.className = "w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center";
        el.innerHTML = '<div class="w-2 h-2 bg-white rounded-full"></div>';
        dropMarker.current = new mapboxgl.Marker(el)
          .setLngLat([drop.lng, drop.lat])
          .addTo(map.current);
      }
    }

    if (pickup && drop) {
      drawRoute();
    }
  }, [pickup, drop]);

  const drawRoute = async () => {
    if (!pickup || !drop || !map.current) return;

    try {
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${pickup.lng},${pickup.lat};${drop.lng},${drop.lat}?geometries=geojson&access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const distanceKm = route.distance / 1000;
        const durationMin = route.duration / 60;
        
        setDistance(distanceKm);
        setDuration(durationMin);
        setShowBooking(true);

        if (map.current.getSource("route")) {
          map.current.removeLayer("route");
          map.current.removeSource("route");
        }

        map.current.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: route.geometry,
          },
        });

        map.current.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#22c55e",
            "line-width": 4,
            "line-opacity": 0.9,
          },
        });

        const coordinates = route.geometry.coordinates;
        const bounds = coordinates.reduce((bounds: mapboxgl.LngLatBounds, coord: number[]) => {
          return bounds.extend(coord as [number, number]);
        }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

        map.current.fitBounds(bounds, { padding: { top: 100, bottom: 100, left: 320, right: 50 } });
      }
    } catch (error) {
      console.error("Route error:", error);
    }
  };

  const calculatePrice = (ride: RideOption) => {
    return Math.round(ride.basePrice + ride.pricePerKm * distance);
  };

  const handleBookRide = () => {
    const selectedRideOption = rideOptions.find(r => r.id === selectedRide);
    alert(`Booking ${selectedRideOption?.name} from ${pickup?.name} to ${drop?.name} for ₹${calculatePrice(selectedRideOption!)}`);
  };

  return (
    <div className="fixed inset-0 bg-background">
      {/* Hide Mapbox watermark */}
      <style>{`
        .mapboxgl-ctrl-logo,
        .mapboxgl-ctrl-attrib {
          display: none !important;
        }
      `}</style>

      {/* Full Screen Map */}
      <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
      
      {/* Left Side Panel - Glass Effect */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="absolute top-3 left-3 bottom-20 sm:bottom-24 w-[calc(100%-1.5rem)] sm:w-80 z-10 flex flex-col gap-3"
      >
        {/* Search Panel */}
        <div className="liquid-glass rounded-2xl p-3 sm:p-4">
          {/* Header */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Car className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-sm sm:text-base">TripGo Rides</h1>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Ola, Uber, Rapido & more</p>
            </div>
          </div>

          {/* Pickup Input */}
          <div className="relative mb-1">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0" />
              <div className="flex-1 relative">
                <Input
                  placeholder="Pickup location"
                  value={pickupSearch}
                  onChange={(e) => {
                    setPickupSearch(e.target.value);
                    searchLocation(e.target.value, "pickup");
                  }}
                  onFocus={() => setActiveInput("pickup")}
                  className="h-9 text-xs sm:text-sm pr-8 bg-white/50 border-white/20"
                />
                <button
                  onClick={getCurrentLocation}
                  disabled={isLocating}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded transition-colors"
                >
                  <Locate className={`w-3.5 h-3.5 ${isLocating ? "animate-pulse text-primary" : "text-muted-foreground"}`} />
                </button>
              </div>
            </div>
            
            {/* Pickup Suggestions */}
            <AnimatePresence>
              {activeInput === "pickup" && pickupSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute left-4 right-0 top-full mt-1 bg-white/95 backdrop-blur rounded-xl shadow-lg border border-white/20 z-20 max-h-40 overflow-y-auto"
                >
                  {pickupSuggestions.map((feature) => (
                    <button
                      key={feature.id}
                      onClick={() => selectLocation(feature, "pickup")}
                      className="w-full text-left p-2.5 hover:bg-muted/50 flex items-start gap-2 border-b border-black/5 last:border-0"
                    >
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span className="text-xs line-clamp-2">{feature.place_name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Connection line */}
          <div className="ml-[4px] w-0.5 h-3 bg-muted-foreground/30" />

          {/* Drop Input */}
          <div className="relative">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 flex-shrink-0" />
              <Input
                placeholder="Drop location"
                value={dropSearch}
                onChange={(e) => {
                  setDropSearch(e.target.value);
                  searchLocation(e.target.value, "drop");
                }}
                onFocus={() => setActiveInput("drop")}
                className="h-9 text-xs sm:text-sm bg-white/50 border-white/20"
              />
            </div>
            
            {/* Drop Suggestions */}
            <AnimatePresence>
              {activeInput === "drop" && dropSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute left-4 right-0 top-full mt-1 bg-white/95 backdrop-blur rounded-xl shadow-lg border border-white/20 z-20 max-h-40 overflow-y-auto"
                >
                  {dropSuggestions.map((feature) => (
                    <button
                      key={feature.id}
                      onClick={() => selectLocation(feature, "drop")}
                      className="w-full text-left p-2.5 hover:bg-muted/50 flex items-start gap-2 border-b border-black/5 last:border-0"
                    >
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span className="text-xs line-clamp-2">{feature.place_name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Ride Options Panel */}
        <AnimatePresence>
          {showBooking ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="liquid-glass rounded-2xl p-3 sm:p-4 flex-1 overflow-hidden flex flex-col"
            >
              {/* Trip Info */}
              <div className="flex items-center gap-3 mb-3 p-2.5 bg-white/30 rounded-xl">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-primary" />
                  <div>
                    <p className="font-bold text-sm">{distance.toFixed(1)} km</p>
                    <p className="text-[10px] text-muted-foreground">Distance</p>
                  </div>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-secondary" />
                  <div>
                    <p className="font-bold text-sm">{Math.round(duration)} min</p>
                    <p className="text-[10px] text-muted-foreground">Est. time</p>
                  </div>
                </div>
              </div>

              {/* Ride Options */}
              <p className="font-display font-semibold text-xs mb-2">Choose ride</p>
              <div className="flex-1 overflow-y-auto space-y-1.5 mb-3">
                {rideOptions.map((ride) => (
                  <motion.button
                    key={ride.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedRide(ride.id)}
                    className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl border transition-all ${
                      selectedRide === ride.id
                        ? "border-primary bg-primary/10"
                        : "border-transparent bg-white/20 hover:bg-white/30"
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      selectedRide === ride.id ? "bg-primary text-white" : "bg-white/50"
                    }`}>
                      <ride.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-1.5">
                        <p className="font-semibold text-xs">{ride.name}</p>
                        <span className="text-[10px] text-muted-foreground">• {ride.eta}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">{ride.description}</p>
                    </div>
                    <p className="font-bold text-sm">₹{calculatePrice(ride)}</p>
                  </motion.button>
                ))}
              </div>

              {/* Book Button */}
              <Button
                onClick={handleBookRide}
                className="w-full h-10 text-sm font-semibold rounded-xl bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              >
                Book {rideOptions.find(r => r.id === selectedRide)?.name}
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default RidesPage;
