import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star } from "lucide-react";
import { filterByCity } from "@/utils/filterHelpers";

const Accommodations = () => {
  const [searchParams] = useSearchParams();
  const cityParam = searchParams.get("city");
  
  const accommodations = [
    {
      id: 1,
      title: "Alvear Palace Hotel",
      description: "Luxury hotel in the heart of Recoleta with elegant rooms and top-notch amenities.",
      category: "Luxury",
      imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      location: "Recoleta, Buenos Aires",
      rating: 4.8,
      priceRange: "$$$"
    },
    {
      id: 2,
      title: "Palermo Soho Loft",
      description: "Modern loft apartment in trendy Palermo Soho, walking distance to restaurants and bars.",
      category: "Apartment",
      imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      location: "Palermo, Buenos Aires",
      rating: 4.5,
      priceRange: "$$"
    },
    {
      id: 3,
      title: "Ethereum Hacker House",
      description: "Collaborative living space for Web3 developers with high-speed internet and workspaces.",
      category: "Hacker House",
      imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      location: "Villa Crespo, Buenos Aires",
      rating: 4.7,
      priceRange: "$$"
    },
    {
      id: 4,
      title: "Devconnect Developer Hostel",
      description: "Budget-friendly hostel exclusively for Devconnect attendees with communal spaces.",
      category: "Hostel",
      imageUrl: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5",
      location: "San Telmo, Buenos Aires",
      rating: 4.3,
      priceRange: "$"
    },
    {
      id: 5,
      title: "Web3 Collaborative Housing",
      description: "Shared apartments for blockchain professionals with workspace and networking opportunities.",
      category: "Shared Housing",
      imageUrl: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      location: "Belgrano, Buenos Aires",
      rating: 4.4,
      priceRange: "$$"
    },
    {
      id: 6,
      title: "Puerto Madero Luxury Apartment",
      description: "Upscale apartment in Buenos Aires' modern waterfront district with stunning views.",
      category: "Luxury Apartment",
      imageUrl: "https://images.unsplash.com/photo-1566665797739-1674de7a421a",
      location: "Puerto Madero, Buenos Aires",
      rating: 4.9,
      priceRange: "$$$"
    }
  ];

  // Filter accommodations by city
  const filteredAccommodations = filterByCity(accommodations, cityParam);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-gradient-to-r from-devconnect-primary to-argentina-blue">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Places to Stay</h1>
          <p className="text-white/90 max-w-2xl">
            Find the perfect accommodation for your Devconnect Argentina trip, from luxury hotels and apartments to budget-friendly hostels and hacker houses.
          </p>
        </div>
      </div>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {filteredAccommodations.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-600">No accommodations found for the selected city</h3>
              <p className="mt-2 text-gray-500">Try selecting a different city or viewing all accommodations</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAccommodations.map((accommodation) => (
                <Card key={accommodation.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={accommodation.imageUrl} 
                      alt={accommodation.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <Badge className="bg-argentina-blue">
                        {accommodation.category}
                      </Badge>
                      <div className="flex items-center text-sm bg-devconnect-primary text-white px-2 py-1 rounded-full">
                        <Star size={12} className="mr-1 fill-current" />
                        {accommodation.rating}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{accommodation.title}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <MapPin size={16} className="mr-1" />
                      {accommodation.location}
                    </div>
                    <p className="text-gray-700 mb-3">{accommodation.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        Price Range: <span className="font-medium">{accommodation.priceRange}</span>
                      </span>
                      <button className="text-devconnect-primary hover:underline">
                        View Details
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Accommodations;
