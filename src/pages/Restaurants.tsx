import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Utensils } from "lucide-react";
import { filterByCity } from "@/utils/filterHelpers";

const Restaurants = () => {
  const [searchParams] = useSearchParams();
  const cityParam = searchParams.get("city");
  
  const restaurants = [
    {
      id: 1,
      title: "Don Julio",
      description: "Famous steakhouse offering premium cuts of Argentine beef in a rustic setting.",
      category: "Steakhouse",
      imageUrl: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17",
      location: "Palermo, Buenos Aires",
      rating: 4.9,
      priceRange: "$$$"
    },
    {
      id: 2,
      title: "El Preferido",
      description: "Historic local restaurant serving Argentine classics and Spanish-influenced dishes.",
      category: "Argentine",
      imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      location: "Palermo, Buenos Aires",
      rating: 4.5,
      priceRange: "$$"
    },
    {
      id: 3,
      title: "Gran Dabbang",
      description: "Fusion restaurant combining Southeast Asian flavors with local Argentine ingredients.",
      category: "Fusion",
      imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
      location: "Palermo, Buenos Aires",
      rating: 4.7,
      priceRange: "$$"
    },
    {
      id: 4,
      title: "Web3 Café",
      description: "Tech-themed café with NFT art displays and crypto-friendly payment options.",
      category: "Café",
      imageUrl: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8",
      location: "Recoleta, Buenos Aires",
      rating: 4.4,
      priceRange: "$"
    },
    {
      id: 5,
      title: "La Cabrera",
      description: "Popular steakhouse known for generous portions and complimentary appetizers.",
      category: "Steakhouse",
      imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947",
      location: "Palermo, Buenos Aires",
      rating: 4.6,
      priceRange: "$$$"
    },
    {
      id: 6,
      title: "Chori",
      description: "Gourmet choripán (Argentine sandwich) shop with craft beer and modern twists.",
      category: "Street Food",
      imageUrl: "https://images.unsplash.com/photo-1551782450-17144efb9c50",
      location: "San Telmo, Buenos Aires",
      rating: 4.5,
      priceRange: "$"
    }
  ];

  const filteredRestaurants = filterByCity(restaurants, cityParam);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-gradient-to-r from-argentina-blue-dark to-devconnect-primary">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Where to Eat</h1>
          <p className="text-white/90 max-w-2xl">
            Explore the best restaurants, cafés, and eateries in Buenos Aires. From traditional Argentine steakhouses to modern fusion cuisine and crypto-friendly cafés.
          </p>
        </div>
      </div>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {filteredRestaurants.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-600">No restaurants found for the selected city</h3>
              <p className="mt-2 text-gray-500">Try selecting a different city or viewing all restaurants</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map((restaurant) => (
                <Card key={restaurant.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={restaurant.imageUrl} 
                      alt={restaurant.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <Badge className="bg-argentina-sun text-black">
                        <Utensils size={12} className="mr-1" />
                        {restaurant.category}
                      </Badge>
                      <div className="flex items-center text-sm bg-devconnect-primary text-white px-2 py-1 rounded-full">
                        <Star size={12} className="mr-1 fill-current" />
                        {restaurant.rating}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{restaurant.title}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <MapPin size={16} className="mr-1" />
                      {restaurant.location}
                    </div>
                    <p className="text-gray-700 mb-3">{restaurant.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        Price Range: <span className="font-medium">{restaurant.priceRange}</span>
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

export default Restaurants;
