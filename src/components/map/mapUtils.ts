
import { LatLngExpression } from 'leaflet';
import { Icon } from 'leaflet';

// Define types for points of interest
export type PointOfInterest = {
  id: number;
  name: string;
  category: 'event' | 'accommodation' | 'restaurant' | 'activity' | 'hackerhome';
  position: LatLngExpression;
  address: string;
  description: string;
  imageUrl?: string;
};

// Sample points of interest data
export const pointsOfInterest: PointOfInterest[] = [
  {
    id: 1,
    name: "Devconnect Buenos Aires",
    category: "event",
    position: [-34.6037, -58.3816],
    address: "La Rural, Buenos Aires",
    description: "The main Devconnect event in Buenos Aires",
    imageUrl: "https://images.unsplash.com/photo-1576437125697-e7a266bd0doq?ixlib=rb-4.0.3"
  },
  {
    id: 2,
    name: "ETHLatam",
    category: "event",
    position: [-34.6083, -58.3712],
    address: "Centro Cultural Konex, Buenos Aires",
    description: "Latin America's largest Ethereum community event",
    imageUrl: "https://images.unsplash.com/photo-1591116681b-8f15b8c8ba11?ixlib=rb-4.0.3"
  },
  {
    id: 3,
    name: "Casa Ethereum",
    category: "hackerhome",
    position: [-34.5890, -58.4245],
    address: "Palermo, Buenos Aires",
    description: "A community hacker house for Ethereum developers",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3"
  },
  {
    id: 4,
    name: "Alvear Palace Hotel",
    category: "accommodation",
    position: [-34.5871, -58.3820],
    address: "Av. Alvear 1891, Buenos Aires",
    description: "A luxury hotel in the heart of Recoleta",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3"
  },
  {
    id: 5,
    name: "Don Julio",
    category: "restaurant",
    position: [-34.5957, -58.4279],
    address: "Guatemala 4699, Buenos Aires",
    description: "Famous steakhouse with traditional Argentine cuisine",
    imageUrl: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-4.0.3"
  },
  {
    id: 6,
    name: "La Bomba de Tiempo",
    category: "activity",
    position: [-34.6060, -58.4110],
    address: "Ciudad Cultural Konex, Buenos Aires",
    description: "Popular drum performance that happens every Monday",
    imageUrl: "https://images.unsplash.com/photo-1526142684086-7ebd69df27a5?ixlib=rb-4.0.3"
  },
];

// Custom icons for different categories
export const getIcon = (category: string) => {
  const iconUrl = 
    category === 'event' ? "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png" :
    category === 'accommodation' ? "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png" :
    category === 'restaurant' ? "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png" :
    category === 'activity' ? "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png" :
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png";
  
  return new Icon({
    iconUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
};

export const DEFAULT_CENTER: LatLngExpression = [-34.6037, -58.3816];
export const DEFAULT_ZOOM = 13;
