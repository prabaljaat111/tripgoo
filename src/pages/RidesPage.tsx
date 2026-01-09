import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin, Navigation, Clock, IndianRupee, Car, Bike, ArrowRight, X, Locate, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Footer from "@/components/layout/Footer";

mapboxgl.accessToken = 'pk.eyJ1Ijoia3VtYXJpLXN1bWFuIiwiYSI6ImNrdGNqcXNucDBkYTcydXJkdjl2ZmQ2MzcifQ.DIKZixks9A2vbGBf4azzHA';

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
      style: "mapbox://styles/mapbox/streets-v12",
      center: [77.5946, 12.9716], // Default to Bangalore
      zoom: 12,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

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
          
          // Reverse geocode to get address
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

    // Update pickup marker
    if (pickup) {
      if (pickupMarker.current) {
        pickupMarker.current.setLngLat([pickup.lng, pickup.lat]);
      } else {
        const el = document.createElement("div");
        el.className = "w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center";
        el.innerHTML = '<div class="w-3 h-3 bg-white rounded-full"></div>';
        pickupMarker.current = new mapboxgl.Marker(el)
          .setLngLat([pickup.lng, pickup.lat])
          .addTo(map.current);
      }
    }

    // Update drop marker
    if (drop) {
      if (dropMarker.current) {
        dropMarker.current.setLngLat([drop.lng, drop.lat]);
      } else {
        const el = document.createElement("div");
        el.className = "w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center";
        el.innerHTML = '<div class="w-3 h-3 bg-white rounded-full"></div>';
        dropMarker.current = new mapboxgl.Marker(el)
          .setLngLat([drop.lng, drop.lat])
          .addTo(map.current);
      }
    }

    // Draw route if both points exist
    if (pickup && drop) {
      drawRoute();
    }
  }, [pickup, drop]);

  // Draw route between pickup and drop
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

        // Remove existing route layer
        if (map.current.getSource("route")) {
          map.current.removeLayer("route");
          map.current.removeSource("route");
        }

        // Add new route
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
            "line-color": "#6366f1",
            "line-width": 5,
            "line-opacity": 0.8,
          },
        });

        // Fit map to show entire route
        const coordinates = route.geometry.coordinates;
        const bounds = coordinates.reduce((bounds: mapboxgl.LngLatBounds, coord: number[]) => {
          return bounds.extend(coord as [number, number]);
        }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

        map.current.fitBounds(bounds, { padding: 80 });
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
    <div className="min-h-screen bg-background">
      {/* Map Container */}
      <div className="relative h-[50vh] sm:h-[60vh]">
        <div ref={mapContainer} className="absolute inset-0" />
        
        {/* Search Overlay */}
        <div className="absolute top-4 left-4 right-4 z-10">
          <div className="bg-white rounded-2xl shadow-xl p-4 space-y-3">
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-display font-bold text-lg">TripGo Rides</h1>
                <p className="text-xs text-muted-foreground">Book Ola, Uber, Rapido & more</p>
              </div>
            </div>

            {/* Pickup Input */}
            <div className="relative">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <div className="flex-1 relative">
                  <Input
                    placeholder="Enter pickup location"
                    value={pickupSearch}
                    onChange={(e) => {
                      setPickupSearch(e.target.value);
                      searchLocation(e.target.value, "pickup");
                    }}
                    onFocus={() => setActiveInput("pickup")}
                    className="pr-10"
                  />
                  <button
                    onClick={getCurrentLocation}
                    disabled={isLocating}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-muted rounded-lg transition-colors"
                  >
                    <Locate className={`w-4 h-4 ${isLocating ? "animate-pulse text-primary" : "text-muted-foreground"}`} />
                  </button>
                </div>
              </div>
              
              {/* Pickup Suggestions */}
              <AnimatePresence>
                {activeInput === "pickup" && pickupSuggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-5 right-0 top-full mt-1 bg-white rounded-xl shadow-lg border z-20 max-h-48 overflow-y-auto"
                  >
                    {pickupSuggestions.map((feature) => (
                      <button
                        key={feature.id}
                        onClick={() => selectLocation(feature, "pickup")}
                        className="w-full text-left p-3 hover:bg-muted flex items-start gap-2 border-b last:border-0"
                      >
                        <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <span className="text-sm line-clamp-2">{feature.place_name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Connection line */}
            <div className="ml-[5px] w-0.5 h-4 bg-gray-300" />

            {/* Drop Input */}
            <div className="relative">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <Input
                  placeholder="Enter drop location"
                  value={dropSearch}
                  onChange={(e) => {
                    setDropSearch(e.target.value);
                    searchLocation(e.target.value, "drop");
                  }}
                  onFocus={() => setActiveInput("drop")}
                  className="flex-1"
                />
              </div>
              
              {/* Drop Suggestions */}
              <AnimatePresence>
                {activeInput === "drop" && dropSuggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-5 right-0 top-full mt-1 bg-white rounded-xl shadow-lg border z-20 max-h-48 overflow-y-auto"
                  >
                    {dropSuggestions.map((feature) => (
                      <button
                        key={feature.id}
                        onClick={() => selectLocation(feature, "drop")}
                        className="w-full text-left p-3 hover:bg-muted flex items-start gap-2 border-b last:border-0"
                      >
                        <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <span className="text-sm line-clamp-2">{feature.place_name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Ride Options */}
      <AnimatePresence>
        {showBooking && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="bg-white rounded-t-3xl -mt-6 relative z-10 shadow-2xl"
          >
            <div className="p-4 sm:p-6">
              {/* Trip Info */}
              <div className="flex items-center justify-between mb-6 p-4 bg-muted/50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Navigation className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{distance.toFixed(1)} km</p>
                    <p className="text-xs text-muted-foreground">Distance</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-border" />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold">{Math.round(duration)} min</p>
                    <p className="text-xs text-muted-foreground">Est. time</p>
                  </div>
                </div>
              </div>

              {/* Ride Options */}
              <h3 className="font-display font-bold mb-4">Choose your ride</h3>
              <div className="space-y-3 mb-6">
                {rideOptions.map((ride) => (
                  <motion.button
                    key={ride.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedRide(ride.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                      selectedRide === ride.id
                        ? "border-primary bg-primary/5"
                        : "border-transparent bg-muted/30 hover:bg-muted/50"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      selectedRide === ride.id ? "bg-primary text-white" : "bg-muted"
                    }`}>
                      <ride.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{ride.name}</p>
                        <span className="text-xs text-muted-foreground">• {ride.eta}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{ride.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">₹{calculatePrice(ride)}</p>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Book Button */}
              <Button
                onClick={handleBookRide}
                className="w-full h-14 text-lg font-semibold rounded-2xl bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              >
                Book {rideOptions.find(r => r.id === selectedRide)?.name}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Placeholder when no booking */}
      {!showBooking && (
        <div className="p-6 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <Car className="w-10 h-10 text-primary" />
          </div>
          <h2 className="font-display font-bold text-xl mb-2">Where to?</h2>
          <p className="text-muted-foreground">
            Enter pickup and drop locations to see ride options
          </p>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default RidesPage;
