
import { toast } from "sonner";

// Define the search item type
export type SearchItem = {
  id: number;
  title: string;
  description: string;
  category: string;
  type: 'event' | 'accommodation' | 'restaurant' | 'activity';
  link: string;
  imageUrl: string;
  location?: string;
};

// Mock data for search results
const mockEvents: SearchItem[] = [
  { 
    id: 1, 
    title: "Devconnect Buenos Aires",
    description: "The main Devconnect event",
    category: "conference", 
    type: "event",
    link: "/events",
    location: "La Rural, Buenos Aires",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87" 
  },
  { 
    id: 2, 
    title: "ETHLatam",
    description: "Latin America's largest Ethereum community event",
    category: "conference", 
    type: "event",
    link: "/events",
    location: "Centro Cultural Konex, Buenos Aires",
    imageUrl: "https://images.unsplash.com/photo-1591116681b-8f15b8c8ba11" 
  },
  { 
    id: 3, 
    title: "Web3 Hackers Meetup",
    description: "An informal gathering for web3 developers",
    category: "social", 
    type: "event",
    link: "/events",
    location: "Area 3, Palermo, Buenos Aires",
    imageUrl: "https://images.unsplash.com/photo-1540304453527-62f979142a17" 
  },
];

const mockAccommodations: SearchItem[] = [
  { 
    id: 1, 
    title: "Alvear Palace Hotel",
    description: "Luxury hotel in Recoleta",
    category: "Luxury", 
    type: "accommodation",
    link: "/accommodations",
    location: "Recoleta, Buenos Aires",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945" 
  },
  { 
    id: 2, 
    title: "Palermo Soho Loft",
    description: "Modern loft apartment",
    category: "Apartment", 
    type: "accommodation",
    link: "/accommodations",
    location: "Palermo, Buenos Aires",
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267" 
  },
  { 
    id: 3, 
    title: "Ethereum Hacker House",
    description: "Collaborative living space for Web3 developers",
    category: "Hacker House", 
    type: "accommodation",
    link: "/accommodations",
    location: "Villa Crespo, Buenos Aires",
    imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d" 
  },
];

const mockRestaurants: SearchItem[] = [
  { 
    id: 1, 
    title: "Don Julio",
    description: "Famous steakhouse",
    category: "Steakhouse", 
    type: "restaurant",
    link: "/restaurants",
    location: "Palermo, Buenos Aires",
    imageUrl: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17" 
  },
  { 
    id: 2, 
    title: "El Preferido",
    description: "Historic local restaurant",
    category: "Argentine", 
    type: "restaurant",
    link: "/restaurants",
    location: "Palermo, Buenos Aires",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4" 
  },
  { 
    id: 3, 
    title: "Gran Dabbang",
    description: "Fusion restaurant with Southeast Asian flavors",
    category: "Fusion", 
    type: "restaurant",
    link: "/restaurants",
    location: "Palermo, Buenos Aires",
    imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0" 
  },
];

const mockActivities: SearchItem[] = [
  { 
    id: 1, 
    title: "La Bomba de Tiempo",
    description: "Famous drum performance",
    category: "Cultural", 
    type: "activity",
    link: "/activities",
    location: "Ciudad Cultural Konex, Buenos Aires",
    imageUrl: "https://images.unsplash.com/photo-1526142684086-7ebd69df27a5" 
  },
  { 
    id: 2, 
    title: "San Telmo Sunday Market",
    description: "Historic market",
    category: "Shopping", 
    type: "activity",
    link: "/activities",
    location: "San Telmo, Buenos Aires",
    imageUrl: "https://images.unsplash.com/photo-1534274867514-d5b47ef89ed7" 
  },
  { 
    id: 3, 
    title: "Tango Show",
    description: "Traditional Argentine tango performance",
    category: "Entertainment", 
    type: "activity",
    link: "/activities",
    location: "Puerto Madero, Buenos Aires",
    imageUrl: "https://images.unsplash.com/photo-1516307365426-bea591f05011" 
  },
];

// All mock items combined
const allItems = [
  ...mockEvents,
  ...mockAccommodations,
  ...mockRestaurants,
  ...mockActivities
];

/**
 * Search through all items based on a query string
 * @param query Search query string
 * @returns Promise with matching search results
 */
export const searchItems = async (
  query: string,
  options: { 
    delay?: number;
    simulateError?: boolean;
  } = {}
): Promise<SearchItem[]> => {
  const { delay = 300, simulateError = false } = options;
  
  console.log(`[Search API] Searching for: "${query}"`);
  
  // Return empty array for empty queries
  if (!query || query.trim().length < 2) {
    return [];
  }
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, delay));
  
  // Simulate error (for testing error handling)
  if (simulateError) {
    throw new Error("Search API error");
  }
  
  // Search logic
  const normalizedQuery = query.toLowerCase().trim();
  const results = allItems.filter(item => 
    item.title.toLowerCase().includes(normalizedQuery) || 
    item.description.toLowerCase().includes(normalizedQuery) ||
    item.category.toLowerCase().includes(normalizedQuery) ||
    item.type.toLowerCase().includes(normalizedQuery) ||
    (item.location && item.location.toLowerCase().includes(normalizedQuery))
  );
  
  console.log(`[Search API] Found ${results.length} results for "${query}"`);
  
  return results;
};

/**
 * Add item to a list
 * @param itemId ID of the item to add to list
 */
export const addToList = async (itemId: number): Promise<void> => {
  console.log(`[Search API] Adding item ${itemId} to list`);
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const item = allItems.find(item => item.id === itemId);
  if (item) {
    toast.success(`Added ${item.title} to list`);
    return Promise.resolve();
  } else {
    toast.error("Item not found");
    return Promise.reject("Item not found");
  }
};

/**
 * Add item to favorites
 * @param itemId ID of the item to favorite
 */
export const addToFavorites = async (itemId: number): Promise<void> => {
  console.log(`[Search API] Adding item ${itemId} to favorites`);
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const item = allItems.find(item => item.id === itemId);
  if (item) {
    toast.success(`Added ${item.title} to favorites`);
    return Promise.resolve();
  } else {
    toast.error("Item not found");
    return Promise.reject("Item not found");
  }
};

/**
 * Subscribe to item updates
 * @param itemId ID of the item to subscribe to
 */
export const subscribeToItem = async (itemId: number): Promise<void> => {
  console.log(`[Search API] Subscribing to item ${itemId}`);
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const item = allItems.find(item => item.id === itemId);
  if (item) {
    toast.success(`Subscribed to updates for ${item.title}`);
    return Promise.resolve();
  } else {
    toast.error("Item not found");
    return Promise.reject("Item not found");
  }
};
