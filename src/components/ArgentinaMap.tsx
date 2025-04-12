
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import the CSS in your component or in your main CSS file
import 'leaflet/dist/leaflet.css';

// Define types for our points of interest
type PointOfInterest = {
  id: number;
  name: string;
  category: 'event' | 'accommodation' | 'restaurant' | 'activity' | 'hackerhome';
  position: LatLngExpression;
  address: string;
  description: string;
  imageUrl?: string;
};

// Sample points of interest data
const pointsOfInterest: PointOfInterest[] = [
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

const ArgentinaMap = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [filteredPOIs, setFilteredPOIs] = useState<PointOfInterest[]>(pointsOfInterest);
  const [selectedPOI, setSelectedPOI] = useState<PointOfInterest | null>(null);
  
  // Custom icons for different categories
  const getIcon = (category: string) => {
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

  // Filter points of interest based on active tab
  useEffect(() => {
    if (activeTab === "all") {
      setFilteredPOIs(pointsOfInterest);
    } else {
      setFilteredPOIs(pointsOfInterest.filter(poi => poi.category === activeTab));
    }
  }, [activeTab]);

  return (
    <div className="h-[600px] w-full rounded-lg overflow-hidden shadow-lg bg-white">
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-4 py-2 bg-gray-50 border-b">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="event">Events</TabsTrigger>
            <TabsTrigger value="accommodation">Accommodations</TabsTrigger>
            <TabsTrigger value="hackerhome">Hacker Houses</TabsTrigger>
            <TabsTrigger value="restaurant">Restaurants</TabsTrigger>
            <TabsTrigger value="activity">Activities</TabsTrigger>
          </TabsList>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="md:col-span-2 h-[500px] md:h-[540px]">
            <MapContainer 
              center={[-34.6037, -58.3816]} 
              zoom={13} 
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {filteredPOIs.map((poi) => (
                <Marker 
                  key={poi.id}
                  position={poi.position}
                  icon={getIcon(poi.category)}
                  eventHandlers={{
                    click: () => {
                      setSelectedPOI(poi);
                    },
                  }}
                >
                  <Popup>
                    <div>
                      <h3 className="font-bold">{poi.name}</h3>
                      <p className="text-sm text-gray-600">{poi.address}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
          
          <div className="p-4 h-[500px] md:h-[540px] overflow-y-auto">
            <h3 className="font-bold text-lg mb-4">Points of Interest</h3>
            {selectedPOI ? (
              <Card className="mb-4">
                <CardContent className="p-4">
                  <div className="mb-3">
                    {selectedPOI.imageUrl && (
                      <img 
                        src={selectedPOI.imageUrl} 
                        alt={selectedPOI.name} 
                        className="w-full h-32 object-cover rounded-md mb-3" 
                      />
                    )}
                    <h4 className="font-bold">{selectedPOI.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{selectedPOI.address}</p>
                    <p className="text-sm">{selectedPOI.description}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedPOI(null)} 
                    className="text-sm text-blue-500 hover:text-blue-700"
                  >
                    Back to list
                  </button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-2">
                {filteredPOIs.map((poi) => (
                  <Card 
                    key={poi.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedPOI(poi)}
                  >
                    <CardContent className="p-3">
                      <h4 className="font-medium">{poi.name}</h4>
                      <p className="text-xs text-gray-600">{poi.address}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default ArgentinaMap;
