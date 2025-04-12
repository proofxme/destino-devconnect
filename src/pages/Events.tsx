import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { filterByCity } from "@/utils/filterHelpers";

const Events = () => {
  const [searchParams] = useSearchParams();
  const cityParam = searchParams.get("city");
  
  const events = [
    {
      id: 1,
      title: "Devconnect Buenos Aires",
      date: "November 15-19, 2025",
      location: "La Rural, Buenos Aires",
      category: "conference",
      description: "The main Devconnect event gathering blockchain developers from across the globe.",
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87"
    },
    {
      id: 2,
      title: "ETHLatam",
      date: "November 12-14, 2025",
      location: "Centro Cultural Konex, Buenos Aires",
      category: "conference",
      description: "Latin America's largest Ethereum community event with talks, workshops and networking.",
      imageUrl: "https://images.unsplash.com/photo-1591116681b-8f15b8c8ba11"
    },
    {
      id: 3,
      title: "Web3 Hackers Meetup",
      date: "November 10, 2025",
      location: "Area 3, Palermo, Buenos Aires",
      category: "social",
      description: "An informal gathering for web3 developers to connect and share ideas.",
      imageUrl: "https://images.unsplash.com/photo-1540304453527-62f979142a17"
    },
    {
      id: 4,
      title: "DeFi Workshop",
      date: "November 14, 2025",
      location: "Universidad de Buenos Aires",
      category: "workshop",
      description: "Hands-on workshop exploring the latest in decentralized finance protocols.",
      imageUrl: "https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a"
    },
    {
      id: 5,
      title: "ZK Hackathon",
      date: "November 18-20, 2025",
      location: "Casa Ethereum, Palermo",
      category: "hackathon",
      description: "48-hour hackathon focused on zero-knowledge proof applications and privacy solutions.",
      imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952"
    },
    {
      id: 6,
      title: "Blockchain & Asado",
      date: "November 16, 2025",
      location: "Puerto Madero, Buenos Aires",
      category: "social",
      description: "Traditional Argentine barbecue with blockchain enthusiasts by the waterfront.",
      imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1"
    }
  ];

  // Filter events by city
  const filteredEvents = filterByCity(events, cityParam);

  // Get badge color based on event category
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "conference":
        return "bg-blue-500";
      case "workshop":
        return "bg-green-500";
      case "social":
        return "bg-purple-500";
      case "hackathon":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-gradient-to-r from-argentina-blue to-devconnect-primary">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Events</h1>
          <p className="text-white/90 max-w-2xl">
            Discover all the events happening during Devconnect Argentina. From workshops to conferences, hackathons to social gatherings - find the perfect events for your interests.
          </p>
        </div>
      </div>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-600">No events found for the selected city</h3>
              <p className="mt-2 text-gray-500">Try selecting a different city or viewing all events</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={event.imageUrl} 
                      alt={event.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <Badge className={getCategoryColor(event.category)}>
                        {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar size={16} className="mr-1" />
                        {event.date}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{event.location}</p>
                    <p className="text-gray-700">{event.description}</p>
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

export default Events;
