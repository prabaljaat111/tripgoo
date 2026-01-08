// Mock data for travel inventory
export interface Destination {
  id: string;
  name: string;
  state: string;
  image: string;
  description: string;
  rating: number;
  trustScore: number;
  basePrice: number;
  tags: string[];
  featured: boolean;
}

export interface Hotel {
  id: string;
  name: string;
  destinationId: string;
  image: string;
  rating: number;
  trustScore: number;
  pricePerNight: number;
  amenities: string[];
  reviewCount: number;
  complaintRatio: number;
  refundIssues: number;
  category: 'budget' | 'standard' | 'premium' | 'luxury';
}

export interface Flight {
  id: string;
  airline: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  class: 'economy' | 'business' | 'first';
  stops: number;
}

export interface Activity {
  id: string;
  name: string;
  destinationId: string;
  description: string;
  duration: string;
  price: number;
  category: string;
  kidFriendly: boolean;
  image: string;
}

export interface Itinerary {
  id: string;
  title: string;
  destination: Destination;
  duration: number;
  budget: {
    total: number;
    flights: number;
    hotels: number;
    activities: number;
    misc: number;
  };
  hotel: Hotel;
  flights: { outbound: Flight; return: Flight };
  activities: Activity[];
  highlights: string[];
}

export const destinations: Destination[] = [
  {
    id: 'goa',
    name: 'Goa',
    state: 'Goa',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800',
    description: 'Sun, sand, and serenity. Perfect beach getaway with vibrant nightlife.',
    rating: 4.6,
    trustScore: 8.5,
    basePrice: 8000,
    tags: ['Beach', 'Nightlife', 'Water Sports', 'Portuguese Heritage'],
    featured: true,
  },
  {
    id: 'manali',
    name: 'Manali',
    state: 'Himachal Pradesh',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800',
    description: 'Snow-capped mountains, adventure sports, and serene valleys.',
    rating: 4.7,
    trustScore: 8.8,
    basePrice: 12000,
    tags: ['Mountains', 'Adventure', 'Snow', 'Trekking'],
    featured: true,
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800',
    description: 'The Pink City with majestic forts, palaces, and rich culture.',
    rating: 4.5,
    trustScore: 8.2,
    basePrice: 7000,
    tags: ['Heritage', 'Culture', 'Forts', 'Shopping'],
    featured: true,
  },
  {
    id: 'kerala',
    name: 'Kerala Backwaters',
    state: 'Kerala',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
    description: 'Tranquil backwaters, houseboat stays, and Ayurvedic retreats.',
    rating: 4.8,
    trustScore: 9.1,
    basePrice: 15000,
    tags: ['Backwaters', 'Nature', 'Ayurveda', 'Houseboats'],
    featured: true,
  },
  {
    id: 'ladakh',
    name: 'Ladakh',
    state: 'Ladakh',
    image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800',
    description: 'Land of high passes, monasteries, and breathtaking landscapes.',
    rating: 4.9,
    trustScore: 9.3,
    basePrice: 25000,
    tags: ['Adventure', 'Mountains', 'Monasteries', 'Road Trip'],
    featured: false,
  },
  {
    id: 'udaipur',
    name: 'Udaipur',
    state: 'Rajasthan',
    image: 'https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?w=800',
    description: 'City of Lakes with romantic palaces and royal heritage.',
    rating: 4.7,
    trustScore: 8.6,
    basePrice: 9000,
    tags: ['Lakes', 'Romance', 'Heritage', 'Palaces'],
    featured: false,
  },
];

export const hotels: Hotel[] = [
  // Goa Hotels
  {
    id: 'goa-h1',
    name: 'Taj Exotica Resort & Spa',
    destinationId: 'goa',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    rating: 4.8,
    trustScore: 9.2,
    pricePerNight: 12000,
    amenities: ['Pool', 'Spa', 'Beach Access', 'Restaurant', 'Gym'],
    reviewCount: 2340,
    complaintRatio: 0.02,
    refundIssues: 1,
    category: 'luxury',
  },
  {
    id: 'goa-h2',
    name: 'Goa Beach Resort',
    destinationId: 'goa',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
    rating: 4.2,
    trustScore: 7.5,
    pricePerNight: 4500,
    amenities: ['Pool', 'Restaurant', 'Beach Access'],
    reviewCount: 890,
    complaintRatio: 0.08,
    refundIssues: 5,
    category: 'standard',
  },
  {
    id: 'goa-h3',
    name: 'Budget Beach Stay',
    destinationId: 'goa',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
    rating: 3.8,
    trustScore: 6.5,
    pricePerNight: 1800,
    amenities: ['WiFi', 'AC', 'Beach Nearby'],
    reviewCount: 456,
    complaintRatio: 0.12,
    refundIssues: 8,
    category: 'budget',
  },
  // Manali Hotels
  {
    id: 'manali-h1',
    name: 'The Himalayan Resort',
    destinationId: 'manali',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    rating: 4.6,
    trustScore: 8.8,
    pricePerNight: 8000,
    amenities: ['Mountain View', 'Spa', 'Restaurant', 'Bonfire'],
    reviewCount: 1230,
    complaintRatio: 0.03,
    refundIssues: 2,
    category: 'premium',
  },
  {
    id: 'manali-h2',
    name: 'Mountain View Inn',
    destinationId: 'manali',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    rating: 4.1,
    trustScore: 7.2,
    pricePerNight: 3500,
    amenities: ['Mountain View', 'Restaurant', 'Parking'],
    reviewCount: 678,
    complaintRatio: 0.09,
    refundIssues: 6,
    category: 'standard',
  },
  // Jaipur Hotels
  {
    id: 'jaipur-h1',
    name: 'Rambagh Palace',
    destinationId: 'jaipur',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    rating: 4.9,
    trustScore: 9.5,
    pricePerNight: 25000,
    amenities: ['Heritage Property', 'Pool', 'Spa', 'Fine Dining', 'Garden'],
    reviewCount: 3450,
    complaintRatio: 0.01,
    refundIssues: 0,
    category: 'luxury',
  },
  {
    id: 'jaipur-h2',
    name: 'Pink City Hotel',
    destinationId: 'jaipur',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
    rating: 4.0,
    trustScore: 7.0,
    pricePerNight: 3000,
    amenities: ['AC', 'Restaurant', 'WiFi', 'Parking'],
    reviewCount: 567,
    complaintRatio: 0.10,
    refundIssues: 7,
    category: 'budget',
  },
  // Kerala Hotels
  {
    id: 'kerala-h1',
    name: 'Kumarakom Lake Resort',
    destinationId: 'kerala',
    image: 'https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=800',
    rating: 4.7,
    trustScore: 9.0,
    pricePerNight: 15000,
    amenities: ['Lake View', 'Ayurveda Spa', 'Pool', 'Houseboat', 'Restaurant'],
    reviewCount: 1890,
    complaintRatio: 0.02,
    refundIssues: 1,
    category: 'luxury',
  },
];

export const flights: Flight[] = [
  // Delhi to Goa
  {
    id: 'fl-del-goa-1',
    airline: 'IndiGo',
    from: 'DEL',
    to: 'GOI',
    departureTime: '06:00',
    arrivalTime: '08:30',
    duration: '2h 30m',
    price: 4500,
    class: 'economy',
    stops: 0,
  },
  {
    id: 'fl-del-goa-2',
    airline: 'Air India',
    from: 'DEL',
    to: 'GOI',
    departureTime: '10:30',
    arrivalTime: '13:00',
    duration: '2h 30m',
    price: 5200,
    class: 'economy',
    stops: 0,
  },
  {
    id: 'fl-goa-del-1',
    airline: 'IndiGo',
    from: 'GOI',
    to: 'DEL',
    departureTime: '19:00',
    arrivalTime: '21:30',
    duration: '2h 30m',
    price: 4800,
    class: 'economy',
    stops: 0,
  },
  // Delhi to Jaipur
  {
    id: 'fl-del-jai-1',
    airline: 'SpiceJet',
    from: 'DEL',
    to: 'JAI',
    departureTime: '07:00',
    arrivalTime: '08:00',
    duration: '1h 00m',
    price: 3200,
    class: 'economy',
    stops: 0,
  },
  // Mumbai to Goa
  {
    id: 'fl-bom-goa-1',
    airline: 'IndiGo',
    from: 'BOM',
    to: 'GOI',
    departureTime: '08:00',
    arrivalTime: '09:15',
    duration: '1h 15m',
    price: 3800,
    class: 'economy',
    stops: 0,
  },
];

export const activities: Activity[] = [
  // Goa Activities
  {
    id: 'goa-a1',
    name: 'Scuba Diving Experience',
    destinationId: 'goa',
    description: 'Explore the underwater world with certified instructors.',
    duration: '3 hours',
    price: 4500,
    category: 'Adventure',
    kidFriendly: false,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
  },
  {
    id: 'goa-a2',
    name: 'Dolphin Watching Cruise',
    destinationId: 'goa',
    description: 'Spot playful dolphins in their natural habitat.',
    duration: '2 hours',
    price: 1200,
    category: 'Wildlife',
    kidFriendly: true,
    image: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?w=800',
  },
  {
    id: 'goa-a3',
    name: 'Old Goa Heritage Walk',
    destinationId: 'goa',
    description: 'Explore Portuguese churches and colonial architecture.',
    duration: '4 hours',
    price: 800,
    category: 'Culture',
    kidFriendly: true,
    image: 'https://images.unsplash.com/photo-1582972236019-ea4af5edd1e1?w=800',
  },
  // Jaipur Activities
  {
    id: 'jai-a1',
    name: 'Amber Fort Tour',
    destinationId: 'jaipur',
    description: 'Majestic fort tour with optional elephant ride.',
    duration: '4 hours',
    price: 1500,
    category: 'Heritage',
    kidFriendly: true,
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800',
  },
  {
    id: 'jai-a2',
    name: 'Hot Air Balloon Ride',
    destinationId: 'jaipur',
    description: 'Sunrise balloon ride over the Pink City.',
    duration: '1 hour',
    price: 12000,
    category: 'Adventure',
    kidFriendly: false,
    image: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=800',
  },
  // Manali Activities
  {
    id: 'man-a1',
    name: 'Solang Valley Adventure',
    destinationId: 'manali',
    description: 'Paragliding, zorbing, and snow activities.',
    duration: '5 hours',
    price: 3500,
    category: 'Adventure',
    kidFriendly: true,
    image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800',
  },
  {
    id: 'man-a2',
    name: 'River Rafting in Beas',
    destinationId: 'manali',
    description: 'Thrilling white water rafting experience.',
    duration: '3 hours',
    price: 2000,
    category: 'Adventure',
    kidFriendly: false,
    image: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=800',
  },
  // Kerala Activities
  {
    id: 'ker-a1',
    name: 'Houseboat Cruise',
    destinationId: 'kerala',
    description: 'Overnight stay on traditional Kerala houseboat.',
    duration: '24 hours',
    price: 8000,
    category: 'Relaxation',
    kidFriendly: true,
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800',
  },
  {
    id: 'ker-a2',
    name: 'Ayurvedic Spa Session',
    destinationId: 'kerala',
    description: 'Traditional Ayurvedic massage and treatments.',
    duration: '2 hours',
    price: 3500,
    category: 'Wellness',
    kidFriendly: false,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800',
  },
];

export const calculateTrustScore = (hotel: Hotel): number => {
  // Trust score formula based on multiple factors
  const ratingScore = hotel.rating * 1.5; // Max 7.5
  const complaintPenalty = hotel.complaintRatio * 20; // Max penalty ~2.4
  const refundPenalty = hotel.refundIssues * 0.1; // Max penalty ~0.8
  const reviewBonus = Math.min(hotel.reviewCount / 1000, 1); // Max 1
  
  const score = Math.min(10, Math.max(0, ratingScore - complaintPenalty - refundPenalty + reviewBonus));
  return Math.round(score * 10) / 10;
};

export const getTrustScoreLabel = (score: number): { label: string; color: string } => {
  if (score >= 8.5) return { label: 'Excellent', color: 'trust-excellent' };
  if (score >= 7) return { label: 'Good', color: 'trust-good' };
  if (score >= 5) return { label: 'Average', color: 'trust-average' };
  return { label: 'Below Average', color: 'trust-poor' };
};

export const cities = [
  { code: 'DEL', name: 'New Delhi', airport: 'Indira Gandhi International' },
  { code: 'BOM', name: 'Mumbai', airport: 'Chhatrapati Shivaji Maharaj' },
  { code: 'BLR', name: 'Bengaluru', airport: 'Kempegowda International' },
  { code: 'MAA', name: 'Chennai', airport: 'Chennai International' },
  { code: 'CCU', name: 'Kolkata', airport: 'Netaji Subhas Chandra Bose' },
  { code: 'HYD', name: 'Hyderabad', airport: 'Rajiv Gandhi International' },
  { code: 'GOI', name: 'Goa', airport: 'Dabolim Airport' },
  { code: 'JAI', name: 'Jaipur', airport: 'Jaipur International' },
  { code: 'COK', name: 'Kochi', airport: 'Cochin International' },
  { code: 'IXC', name: 'Chandigarh', airport: 'Chandigarh International' },
];
