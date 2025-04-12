
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ExternalLink, Gift, Award, Users } from "lucide-react";

// Mock data for sponsors
const SPONSORS = [
  {
    id: 1,
    name: "Ethereum Foundation",
    description: "Supporting the Ethereum ecosystem through research, development, and education.",
    logo: "https://ethereum.org/static/a110735dade3f354a46fc2446cd52476/69f77/eth-home-icon.png",
    tier: "Platinum",
    benefits: ["Custom booth", "Main stage keynote", "VIP dinner access", "Logo on all materials"],
    website: "https://ethereum.org"
  },
  {
    id: 2,
    name: "Polygon Labs",
    description: "Building and connecting Ethereum-compatible blockchain networks.",
    logo: "https://cryptologos.cc/logos/polygon-matic-logo.png",
    tier: "Gold",
    benefits: ["Premium booth", "Workshop hosting", "VIP event access", "Logo on digital assets"],
    website: "https://polygon.technology"
  },
  {
    id: 3,
    name: "Chainlink",
    description: "Providing secure and reliable oracles for smart contracts across blockchains.",
    logo: "https://cryptologos.cc/logos/chainlink-link-logo.png",
    tier: "Gold",
    benefits: ["Premium booth", "Workshop hosting", "VIP event access", "Logo on digital assets"],
    website: "https://chain.link"
  },
  {
    id: 4,
    name: "Arbitrum",
    description: "Layer 2 scaling solution for Ethereum that enables high-throughput, low cost smart contracts.",
    logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.png",
    tier: "Silver",
    benefits: ["Standard booth", "Lightning talk", "Event tickets", "Digital promotion"],
    website: "https://arbitrum.io"
  },
  {
    id: 5,
    name: "Optimism",
    description: "Layer 2 scaling solution focused on reducing transaction costs and latency.",
    logo: "https://cryptologos.cc/logos/optimism-op-logo.png",
    tier: "Silver",
    benefits: ["Standard booth", "Lightning talk", "Event tickets", "Digital promotion"],
    website: "https://optimism.io"
  },
  {
    id: 6,
    name: "Uniswap",
    description: "The leading decentralized exchange protocol for trading cryptocurrencies.",
    logo: "https://cryptologos.cc/logos/uniswap-uni-logo.png",
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
    <div className="container mx-auto py-16 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Ecosystem Partners</h1>
        <p className="text-gray-600 max-w-3xl">
          Devconnect is made possible by our incredible sponsors and ecosystem partners. 
          Explore the companies and projects supporting Devconnect Argentina 2025 and learn about 
          the benefits they provide to attendees.
        </p>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Partners</TabsTrigger>
          <TabsTrigger value="platinum">Platinum</TabsTrigger>
          <TabsTrigger value="gold">Gold</TabsTrigger>
          <TabsTrigger value="silver">Silver</TabsTrigger>
          <TabsTrigger value="bronze">Bronze</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SPONSORS.map(sponsor => (
              <SponsorCard key={sponsor.id} sponsor={sponsor} />
            ))}
          </div>
        </TabsContent>
        
        {Object.entries(sponsorsByTier).map(([tier, sponsors]) => (
          <TabsContent key={tier} value={tier.toLowerCase()} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sponsors.map(sponsor => (
                <SponsorCard key={sponsor.id} sponsor={sponsor} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Gift className="mr-2 text-argentina-blue" /> Attendee Benefits
        </h2>
        <p className="text-gray-600 mb-6">
          Our sponsors provide various benefits and perks for Devconnect attendees. 
          Here's what you can expect:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 text-argentina-blue" />
                Exclusive Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Access exclusive workshops, keynotes, and technical demos from leading projects in the ecosystem.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 text-argentina-blue" />
                Networking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Connect with founders, developers, and researchers from top projects at dedicated networking events.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gift className="mr-2 text-argentina-blue" />
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
      </div>
    </div>
  );
};

interface SponsorCardProps {
  sponsor: typeof SPONSORS[0];
}

const SponsorCard = ({ sponsor }: SponsorCardProps) => {
  const tierColors = {
    "Platinum": "bg-slate-200 hover:bg-slate-300 text-slate-900",
    "Gold": "bg-amber-100 hover:bg-amber-200 text-amber-900",
    "Silver": "bg-gray-100 hover:bg-gray-200 text-gray-800",
    "Bronze": "bg-orange-100 hover:bg-orange-200 text-orange-900",
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className={tierColors[sponsor.tier as keyof typeof tierColors]}>
            {sponsor.tier}
          </Badge>
        </div>
        <CardTitle>{sponsor.name}</CardTitle>
        <CardDescription>{sponsor.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <h4 className="text-sm font-medium mb-2">Benefits:</h4>
        <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
          {sponsor.benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" asChild>
          <a href={sponsor.website} target="_blank" rel="noopener noreferrer">
            Visit Website <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Sponsors;
