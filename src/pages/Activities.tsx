import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Activity } from "lucide-react";
import { filterByCity } from "@/utils/filterHelpers";

const Activities = () => {
  const [searchParams] = useSearchParams();
  const cityParam = searchParams.get("city");
  
  const activities = [
    {
      id: 1,
      title: "La Bomba de Tiempo",
      description: "Famous drum performance that happens every Monday with improvised percussion rhythms.",
      category: "Cultural",
      imageUrl: "https://images.unsplash.com/photo-1526142684086-7ebd69df27a5",
      location: "Ciudad Cultural Konex, Buenos Aires",
      duration: "2 hours",
      bestTime: "Monday evenings"
    },
    {
      id: 2,
      title: "San Telmo Sunday Market",
      description: "Historic market with antiques, crafts, and street performances every Sunday.",
      category: "Shopping",
      imageUrl: "https://images.unsplash.com/photo-1534274867514-d5b47ef89ed7",
      location: "San Telmo, Buenos Aires",
      duration: "Half day",
      bestTime: "Sunday mornings"
    },
    {
      id: 3,
      title: "Tango Show & Lesson",
      description: "Experience Argentina's iconic dance with a professional show and beginner's lesson.",
      category: "Dance",
      imageUrl: "https://images.unsplash.com/photo-1545959570-a94084071b5d",
      location: "Various venues in San Telmo and Recoleta",
      duration: "3 hours",
      bestTime: "Evening"
    },
    {
      id: 4,
      title: "Tigre Delta Boat Tour",
      description: "Scenic boat tour through the waterways of the Tigre Delta just outside Buenos Aires.",
      category: "Nature",
      imageUrl: "https://images.unsplash.com/photo-1566438480900-0609be27a4be",
      location: "Tigre, Buenos Aires Province",
      duration: "Full day",
      bestTime: "Weekdays (less crowded)"
    },
    {
      id: 5,
      title: "MALBA Museum Visit",
      description: "Contemporary Latin American art museum featuring works by Frida Kahlo and Diego Rivera.",
      category: "Museum",
      imageUrl: "https://images.unsplash.com/photo-1544711044-bc19d80f5d4a",
      location: "Palermo, Buenos Aires",
      duration: "2-3 hours",
      bestTime: "Weekday mornings"
    },
    {
      id: 6,
      title: "Crypto Art Gallery Tour",
      description: "Tour of galleries showcasing NFT art and blockchain-based creative projects.",
      category: "Tech",
      imageUrl: "https://images.unsplash.com/photo-1561370933-93c1ef4b0840",
      location: "Various venues in Palermo and Villa Crespo",
      duration: "3-4 hours",
      bestTime: "Afternoons"
    }
  ];

  // Filter activities by city
  const filteredActivities = filterByCity(activities, cityParam);

  // Get badge color based on activity category
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Cultural":
        return "bg-purple-500";
      case "Shopping":
        return "bg-pink-500";
      case "Dance":
        return "bg-red-500";
      case "Nature":
        return "bg-green-500";
      case "Museum":
        return "bg-blue-500";
      case "Tech":
        return "bg-argentina-blue";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-gradient-to-r from-devconnect-primary to-argentina-blue-dark">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Things to Do</h1>
          <p className="text-white/90 max-w-2xl">
            Discover the best activities and experiences Buenos Aires has to offer during your Devconnect visit. From cultural events to outdoor adventures and tech tours.
          </p>
        </div>
      </div>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {filteredActivities.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-600">No activities found for the selected city</h3>
              <p className="mt-2 text-gray-500">Try selecting a different city or viewing all activities</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActivities.map((activity) => (
                <Card key={activity.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={activity.imageUrl} 
                      alt={activity.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <Badge className={getCategoryColor(activity.category)}>
                        <Activity size={12} className="mr-1" />
                        {activity.category}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin size={16} className="mr-1" />
                      {activity.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <Clock size={16} className="mr-1" />
                      {activity.duration} • Best time: {activity.bestTime}
                    </div>
                    <p className="text-gray-700 mb-3">{activity.description}</p>
                    <button className="text-devconnect-primary hover:underline">
                      Learn More
                    </button>
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

export default Activities;
