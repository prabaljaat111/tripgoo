import { 
  Plane, Hotel, Home, Package, Train, Bus, Car, 
  Ticket, FileCheck, Ship, CreditCard, Shield,
  type LucideIcon
} from "lucide-react";

export interface TravelService {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  path: string;
  color: string;
  bgColor: string;
  comingSoon?: boolean;
}

export const travelServices: TravelService[] = [
  {
    id: "flights",
    name: "Flights",
    description: "Domestic & international flights",
    icon: Plane,
    path: "/flights",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    id: "hotels",
    name: "Hotels",
    description: "Best hotels & resorts",
    icon: Hotel,
    path: "/hotels",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    id: "villas",
    name: "Villas & Homestays",
    description: "Private villas & homestays",
    icon: Home,
    path: "/villas",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    id: "packages",
    name: "Holiday Packages",
    description: "Complete travel packages",
    icon: Package,
    path: "/packages",
    color: "text-pink-600",
    bgColor: "bg-pink-100",
  },
  {
    id: "trains",
    name: "Trains",
    description: "IRCTC train bookings",
    icon: Train,
    path: "/trains",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    id: "buses",
    name: "Buses",
    description: "AC & sleeper buses",
    icon: Bus,
    path: "/buses",
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  {
    id: "cabs",
    name: "Cabs",
    description: "Airport & outstation cabs",
    icon: Car,
    path: "/cabs",
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  {
    id: "tours",
    name: "Tours & Attractions",
    description: "Experiences & activities",
    icon: Ticket,
    path: "/tours",
    color: "text-teal-600",
    bgColor: "bg-teal-100",
  },
  {
    id: "visa",
    name: "Visa",
    description: "Visa assistance services",
    icon: FileCheck,
    path: "/visa",
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
  {
    id: "cruise",
    name: "Cruise",
    description: "Luxury cruise packages",
    icon: Ship,
    path: "/cruise",
    color: "text-cyan-600",
    bgColor: "bg-cyan-100",
  },
  {
    id: "forex",
    name: "Forex Card & Currency",
    description: "Foreign exchange services",
    icon: CreditCard,
    path: "/forex",
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
  {
    id: "insurance",
    name: "Travel Insurance",
    description: "Trip protection plans",
    icon: Shield,
    path: "/insurance",
    color: "text-rose-600",
    bgColor: "bg-rose-100",
  },
];

export const activeServices = travelServices;
