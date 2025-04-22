
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CountdownTimer from "@/components/CountdownTimer";
import ArgentinaMap from "@/components/ArgentinaMap";
import CategorySection from "@/components/CategorySection";
import EnhancedCalendar from "@/components/calendar/EnhancedCalendar";
import GlobeAnimation from "@/components/GlobeAnimation";

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
      <div
        className="bg-no-repeat bg-cover bg-center relative overflow-hidden"
        style={{
          backgroundImage: `url("https://devconnect.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhero-bg.eb2d9793.png&w=3840&q=75")`,
        }}
      >
        {/* Devconnect purple/blue highlight overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E097F]/90 via-[#4E3AFF]/80 to-[#00B5F5]/80 pointer-events-none z-0" />
        <Navbar />
        <div className="container mx-auto pt-32 pb-20 px-[16px] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="fade-in text-[2.85rem] md:text-5xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-tight drop-shadow-lg">
                Welcome to <span className="bg-gradient-to-r from-[#F3D364] to-[#FCBF49] bg-clip-text text-transparent">Argentina</span> <span className="text-[#FCBF49]">Devconnect</span>
              </h1>
              <p className="fade-in text-lg text-white/90 mb-10 max-w-2xl">
                Your decentralized guide to Argentina's Devconnect 2025.<br className="hidden md:block" />
                Discover events, accommodations, restaurants, and activities for an unforgettable blockchain experience.
              </p>
              <CountdownTimer />
              <div className="mt-10">
                {/* Button styled like devconnect destino */}
                <a
                  href="https://t.me/ethereumargentina"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group inline-flex items-center px-7 py-4 rounded-full font-bold text-lg bg-gradient-to-br from-[#FCBF49] to-[#FFD977] text-[#1A247A] shadow-lg transition-all duration-300 hover:from-[#f0e600] hover:to-[#f7c825] hover:scale-105 hover:shadow-2xl focus:ring-2 focus:ring-[#FCBF49] focus:outline-none"
                  style={{ minWidth: 240 }}
                >
                  <img
                    src="/lovable-uploads/2963f319-054b-4f05-977f-1e7daa07ac8c.png"
                    alt="Ethereum Argentina"
                    className="w-8 h-8 mr-2 -ml-1 drop-shadow"
                    style={{ filter: "drop-shadow(0 1px 4px #FFE18A)" }}
                  />
                  Join the Community
                  {/* animated chevron */}
                  <span className="ml-3 transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    <svg width="22" height="22" fill="none" viewBox="0 0 22 22">
                      <path d="M6 11h10m0 0l-4-4m4 4l-4 4" stroke="#1A247A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {/* Animated expanding background for hover */}
                  <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-10 group-hover:bg-white transition-all duration-300 pointer-events-none" />
                </a>
              </div>
            </div>
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative w-full max-w-md aspect-square animate-fade-in">
                <div className="absolute inset-0 bg-white rounded-full opacity-10"></div>
                <div className="absolute inset-4 bg-white rounded-full opacity-10 animate-pulse"></div>
                <GlobeAnimation />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent pointer-events-none z-10"></div>
      </div>

      <section className="py-16 bg-white relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1A247A]">Explore Argentina Devconnect</h2>
          <ArgentinaMap />
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1A247A]">Upcoming Events</h2>
            <p className="text-gray-700">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the Argentine Crypto Community</h2>
            <p className="text-lg mb-8">
              Connect with local blockchain enthusiasts, attend community events, and make the most of your Devconnect experience
            </p>
            <a
              href="https://t.me/ethereumargentina"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gradient-to-br from-[#FCBF49] to-[#FFD977] text-[#1A247A] font-bold py-3 px-8 rounded-full shadow-lg text-lg transition-transform duration-300 hover:scale-105"
            >
              <img
                src="/lovable-uploads/2963f319-054b-4f05-977f-1e7daa07ac8c.png"
                alt="Ethereum Argentina"
                className="w-8 h-8 mr-2 -ml-1 drop-shadow"
                style={{ filter: "drop-shadow(0 1px 4px #FFE18A)" }}
              />
              Join Community
            </a>
          </div>
        </div>
      </section>

      <Footer />
      {/* Inline animation utilities */}
      <style>{`
        .fade-in {
          opacity: 0;
          animation: fadeIn 0.9s cubic-bezier(0.19,1,0.22,1) forwards;
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Index;
