
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Award, Gift, Users } from "lucide-react";

// Updated SPONSORS array with Lorem Picsum image URLs
const SPONSORS = [
  {
    id: 1,
    name: "Ethereum Foundation",
    description: "Supporting the Ethereum ecosystem through research, development, and education.",
    logo: "https://picsum.photos/id/1001/300/300",
    tier: "Platinum",
    benefits: ["Custom booth", "Main stage keynote", "VIP dinner access", "Logo on all materials"],
    website: "https://ethereum.org"
  },
  {
    id: 2,
    name: "Polygon Labs",
    description: "Building and connecting Ethereum-compatible blockchain networks.",
    logo: "https://picsum.photos/id/1002/300/300",
    tier: "Gold",
    benefits: ["Premium booth", "Workshop hosting", "VIP event access", "Logo on digital assets"],
    website: "https://polygon.technology"
  },
  {
    id: 3,
    name: "Chainlink",
    description: "Providing secure and reliable oracles for smart contracts across blockchains.",
    logo: "https://picsum.photos/id/1003/300/300",
    tier: "Gold",
    benefits: ["Premium booth", "Workshop hosting", "VIP event access", "Logo on digital assets"],
    website: "https://chain.link"
  },
  {
    id: 4,
    name: "Arbitrum",
    description: "Layer 2 scaling solution for Ethereum that enables high-throughput, low cost smart contracts.",
    logo: "https://picsum.photos/id/1004/300/300",
    tier: "Silver",
    benefits: ["Standard booth", "Lightning talk", "Event tickets", "Digital promotion"],
    website: "https://arbitrum.io"
  },
  {
    id: 5,
    name: "Optimism",
    description: "Layer 2 scaling solution focused on reducing transaction costs and latency.",
    logo: "https://picsum.photos/id/1005/300/300",
    tier: "Silver",
    benefits: ["Standard booth", "Lightning talk", "Event tickets", "Digital promotion"],
    website: "https://optimism.io"
  },
  {
    id: 6,
    name: "Uniswap",
    description: "The leading decentralized exchange protocol for trading cryptocurrencies.",
    logo: "https://picsum.photos/id/1006/300/300",
    tier: "Bronze",
    benefits: ["Table space", "Swag distribution", "Tickets", "Website listing"],
    website: "https://uniswap.org"
  },
];

// Group sponsors by tier
const sponsorsByTier = SPONSORS.reduce((acc, sponsor) => {
  if (!acc[sponsor.tier]) {
    acc[sponsor.tier] = [];
  }
  acc[sponsor.tier].push(sponsor);
  return acc;
}, {} as Record<string, typeof SPONSORS>);

const Sponsors = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header with visual background and overlay */}
      <header 
        className="relative min-h-[340px] flex items-end"
        style={{
          backgroundImage:
            'url("https://devconnect.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhero-bg.eb2d9793.png&w=3840&q=75")',
          backgroundPosition: "center 20%",
          backgroundSize: "cover",
        }}
      >
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E097F]/90 via-[#4E3AFF]/80 to-[#00B5F5]/70 pointer-events-none z-0" />
        <div className="container mx-auto px-4 pb-12 pt-20 relative z-10 flex flex-col">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-lg mb-2 animate-fade-in">
            Ecosystem Partners
          </h1>
          <p className="text-white/80 max-w-2xl text-lg animate-fade-in" style={{animationDelay: '200ms', animationFillMode:'both'}}>
            Devconnect is made possible by our incredible sponsors and ecosystem partners.{" "}
            <br className="hidden md:block"/>
            Meet the supporters empowering Devconnect Argentina 2025 and explore attendee benefits!
          </p>
        </div>
      </header>

      <section className="-mt-14 z-10 relative pb-8 animate-fade-in">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="mb-6 bg-[#F6F6F784] border shadow-lg rounded-xl overflow-x-auto">
              <TabsTrigger value="all" className="font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#F3D364] data-[state=active]:to-[#FCBF49] data-[state=active]:text-[#1A247A] data-[state=active]:shadow-sm transition-colors">
                All Partners
              </TabsTrigger>
              <TabsTrigger value="platinum" className="font-bold">Platinum</TabsTrigger>
              <TabsTrigger value="gold" className="font-bold">Gold</TabsTrigger>
              <TabsTrigger value="silver" className="font-bold">Silver</TabsTrigger>
              <TabsTrigger value="bronze" className="font-bold">Bronze</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {SPONSORS.map(sponsor => (
                  <SponsorCard key={sponsor.id} sponsor={sponsor} />
                ))}
              </div>
            </TabsContent>
            
            {Object.entries(sponsorsByTier).map(([tier, sponsors]) => (
              <TabsContent key={tier} value={tier.toLowerCase()} className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {sponsors.map(sponsor => (
                    <SponsorCard key={sponsor.id} sponsor={sponsor} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section className="bg-[#F6F6F7] p-6 rounded-3xl border border-gray-200 mt-12 container mx-auto px-4 shadow animate-fade-in">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-[#1E097F]">
          <Gift className="text-[#43C3F7]" /> Attendee Benefits
        </h2>
        <p className="text-gray-700 mb-6">
          Our sponsors provide various benefits and perks for Devconnect attendees. 
          Here’s what you can expect:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Exclusive Content */}
          <Card className="rounded-xl shadow-lg border-0 bg-white hover:scale-105 hover:shadow-2xl transition-transform duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#1A247A]">
                <Award className="text-argentina-blue" />
                Exclusive Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Access exclusive workshops, keynotes, and technical demos from leading projects in the ecosystem.
              </p>
            </CardContent>
          </Card>
          {/* Networking */}
          <Card className="rounded-xl shadow-lg border-0 bg-white hover:scale-105 hover:shadow-2xl transition-transform duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#1A247A]">
                <Users className="text-argentina-blue" />
                Networking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Connect with founders, developers, and researchers from top projects at dedicated networking events.
              </p>
            </CardContent>
          </Card>
          {/* Swag & Resources */}
          <Card className="rounded-xl shadow-lg border-0 bg-white hover:scale-105 hover:shadow-2xl transition-transform duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#1A247A]">
                <Gift className="text-argentina-blue" />
                Swag & Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Collect exclusive swag, educational materials, and promotional offers from our sponsors.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      {/* Animations - fade-in */}
      <style>{`
        .animate-fade-in {
          opacity: 0;
          animation: fade-in 0.9s cubic-bezier(0.19,1,0.22,1) forwards;
        }
        @keyframes fade-in {
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

interface SponsorCardProps {
  sponsor: typeof SPONSORS[0];
}

const tierColors = {
  Platinum: "bg-[#c4cffe] text-[#1A247A] border-2 border-[#F3D364]",
  Gold: "bg-[#fff6d2] text-[#917E2B] border-2 border-[#FCBF49]",
  Silver: "bg-[#F6F6F7] text-[#555] border-2 border-[#D9D9D9]",
  Bronze: "bg-[#FFE1C1] text-[#8D5524] border-2 border-[#FFD6A5]",
};

const SponsorCard = ({ sponsor }: SponsorCardProps) => (
  <div className="relative group rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-200 hover:scale-105 overflow-hidden flex flex-col items-stretch min-h-[340px]">
    <div className="flex flex-col items-center p-6 pb-2">
      <div className="w-20 h-20 rounded-full bg-white border-2 shadow-md flex items-center justify-center mb-3 overflow-hidden">
        <img 
          src={sponsor.logo}
          alt={`${sponsor.name} logo`}
          className="object-contain w-16 h-16"
          loading="lazy"
        />
      </div>
      <Badge className={`${tierColors[sponsor.tier as keyof typeof tierColors]} mt-1 mb-2 text-xs font-bold py-1 px-3 rounded-full shadow`}>
        {sponsor.tier}
      </Badge>
      <span className="block text-center font-extrabold text-lg text-[#1A247A] mb-1 leading-tight">{sponsor.name}</span>
      <p className="text-gray-700 text-sm text-center mb-3 line-clamp-2">{sponsor.description}</p>
    </div>
    <div className="px-6 pb-2">
      <h4 className="text-xs uppercase mb-1 text-gray-500 tracking-wide font-semibold">Benefits:</h4>
      <ul className="text-sm text-gray-700 list-disc list-inside space-y-1 mb-2">
        {sponsor.benefits.map((benefit, idx) => (
          <li key={idx}>{benefit}</li>
        ))}
      </ul>
    </div>
    <div className="mt-auto px-6 pb-6">
      <Button
        variant="default"
        size="sm"
        className="w-full rounded-full font-bold bg-gradient-to-r from-[#F3D364] to-[#FCBF49] text-[#1A247A] hover:from-[#f0e600] hover:to-[#f7c825] active:scale-95 transition-transform"
        asChild
      >
        <a href={sponsor.website} target="_blank" rel="noopener noreferrer">
          Visit Website
        </a>
      </Button>
    </div>
  </div>
);

export default Sponsors;

