
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CountdownTimer from "@/components/CountdownTimer";
import ArgentinaMap from "@/components/ArgentinaMap";
import CategorySection from "@/components/CategorySection";
import EnhancedCalendar from "@/components/calendar/EnhancedCalendar";

const Index = () => {
  // Sample accommodations data
  const accommodations = [
    {
      id: 1,
      title: "Alvear Palace Hotel",
      description: "Luxury hotel in the heart of Recoleta with elegant rooms and top-notch amenities.",
      category: "Luxury",
      imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      location: "Recoleta, Buenos Aires",
      rating: 4.8
    },
    {
      id: 2,
      title: "Palermo Soho Loft",
      description: "Modern loft apartment in trendy Palermo Soho, walking distance to restaurants and bars.",
      category: "Apartment",
      imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      location: "Palermo, Buenos Aires",
      rating: 4.5
    },
    {
      id: 3,
      title: "Ethereum Hacker House",
      description: "Collaborative living space for Web3 developers with high-speed internet and workspaces.",
      category: "Hacker House",
      imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      location: "Villa Crespo, Buenos Aires",
      rating: 4.7
    },
    {
      id: 4,
      title: "Devconnect Developer Hostel",
      description: "Budget-friendly hostel exclusively for Devconnect attendees with communal spaces.",
      category: "Hostel",
      imageUrl: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5",
      location: "San Telmo, Buenos Aires",
      rating: 4.3
    }
  ];

  // Sample restaurants data
  const restaurants = [
    {
      id: 1,
      title: "Don Julio",
      description: "Famous steakhouse offering premium cuts of Argentine beef in a rustic setting.",
      category: "Steakhouse",
      imageUrl: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17",
      location: "Palermo, Buenos Aires",
      rating: 4.9
    },
    {
      id: 2,
      title: "El Preferido",
      description: "Historic local restaurant serving Argentine classics and Spanish-influenced dishes.",
      category: "Argentine",
      imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      location: "Palermo, Buenos Aires",
      rating: 4.5
    },
    {
      id: 3,
      title: "Gran Dabbang",
      description: "Fusion restaurant combining Southeast Asian flavors with local Argentine ingredients.",
      category: "Fusion",
      imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
      location: "Palermo, Buenos Aires",
      rating: 4.7
    },
    {
      id: 4,
      title: "Web3 Café",
      description: "Tech-themed café with NFT art displays and crypto-friendly payment options.",
      category: "Café",
      imageUrl: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8",
      location: "Recoleta, Buenos Aires",
      rating: 4.4
    }
  ];

  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-argentina-blue to-devconnect-primary relative">
        <Navbar />
        <div className="container mx-auto pt-32 pb-20 px-[16px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Welcome to Argentina <span className="text-argentina-sun">Devconnect</span>
              </h1>
              <p className="text-lg text-white/90 mb-8">
                Your decentralized guide to Argentina's Devconnect 2025. Discover events, 
                accommodations, restaurants, and activities for an unforgettable blockchain experience.
              </p>
              <CountdownTimer />
            </div>
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative w-full max-w-md aspect-square">
                <div className="absolute inset-0 bg-white rounded-full opacity-10"></div>
                <div className="absolute inset-4 bg-white rounded-full opacity-10 animate-pulse"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-white text-xl font-bold mb-2">Buenos Aires</div>
                    <div className="text-white text-opacity-80 text-sm">November 2025</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <section className="py-16 bg-white relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Explore Argentina Devconnect</h2>
          <ArgentinaMap />
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Upcoming Events</h2>
            <p className="text-gray-600">
              Stay up-to-date with all the blockchain and crypto events happening during Devconnect Argentina
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <EnhancedCalendar />
          </div>
        </div>
      </section>

      <CategorySection 
        title="Places to Stay" 
        description="Find the perfect accommodation for your Devconnect trip, from luxury hotels to hacker houses" 
        items={accommodations} 
        viewAllLink="/accommodations" 
      />

      <CategorySection 
        title="Where to Eat" 
        description="Discover the best restaurants, cafés, and bars in Buenos Aires" 
        items={restaurants} 
        viewAllLink="/restaurants" 
      />

      <section className="py-16 bg-devconnect-dark text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Join the Argentine Crypto Community</h2>
            <p className="text-lg mb-8">
              Connect with local blockchain enthusiasts, attend community events, and make the most of your Devconnect experience
            </p>
            <button className="bg-argentina-blue hover:bg-argentina-blue-dark text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center mx-auto">
              <img 
                src="/lovable-uploads/2963f319-054b-4f05-977f-1e7daa07ac8c.png" 
                alt="Ethereum Argentina" 
                className="w-8 h-8 mr-2"
              />
              Join Community
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
