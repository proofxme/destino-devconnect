
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Search, Users, Filter, Linkedin, Twitter, ExternalLink, ArrowUpDown, Briefcase, Code, PenTool, BarChart, Zap, CreditCard } from "lucide-react";
import { useWallet } from "@/context/WalletContext";
import { AnimatePresence, motion } from "framer-motion";

// Enhanced mock data for attendants with more details
const MOCK_ATTENDANTS = [
  { 
    id: 1, 
    name: "Alex Johnson", 
    role: "Developer", 
    company: "Ethereum Foundation", 
    interests: ["Smart Contracts", "Layer 2"], 
    bio: "Building tools for the decentralized web. Previously worked on zero-knowledge proofs at Starkware.",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format",
    socials: {
      twitter: "alexjeth",
      linkedin: "alexjohnson"
    },
    attending: ["Main Conference", "Hackathon"],
    type: "dev"
  },
  { 
    id: 2, 
    name: "Maria Garcia", 
    role: "Researcher", 
    company: "Chainlink Labs", 
    interests: ["Oracles", "ZK Proofs"], 
    bio: "PhD in Cryptography. Research focused on secure oracle mechanisms for blockchain networks.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format",
    socials: {
      twitter: "mariaresearch",
      linkedin: "mariagarcia"
    },
    attending: ["Research Symposium", "Main Conference"],
    type: "dev"
  },
  { 
    id: 3, 
    name: "James Wilson", 
    role: "Founder", 
    company: "ZK Solutions", 
    interests: ["Privacy", "Scaling"],
    bio: "Serial entrepreneur with 3 successful exits. Now focused on bringing privacy solutions to Web3.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format",
    socials: {
      twitter: "jameswzk",
      linkedin: "jameswilson"
    },
    attending: ["Founders Summit", "Investor Day"],
    type: "vc"
  },
  { 
    id: 4, 
    name: "Sarah Ahmed", 
    role: "Designer", 
    company: "Polygon", 
    interests: ["UX Design", "NFTs"],
    bio: "Creating intuitive interfaces for complex blockchain applications. Passionate about making Web3 accessible to everyone.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format",
    socials: {
      twitter: "sarahdesigns",
      linkedin: "sarahahmed"
    },
    attending: ["Design Workshop", "NFT Showcase"],
    type: "designer"
  },
  { 
    id: 5, 
    name: "Michael Patel", 
    role: "Engineer", 
    company: "Arbitrum", 
    interests: ["Optimistic Rollups", "DeFi"],
    bio: "Building the infrastructure for the next generation of financial applications. Focused on scaling solutions.",
    avatar: "https://images.unsplash.com/photo-1567515004624-219c11d31f2e?q=80&w=200&auto=format",
    socials: {
      twitter: "mikepatel",
      linkedin: "michaelpatel"
    },
    attending: ["Technical Workshops", "DeFi Summit"],
    type: "dev"
  },
  { 
    id: 6, 
    name: "Emma Rodriguez", 
    role: "Product Manager", 
    company: "Uniswap", 
    interests: ["DEX", "Tokenomics"], 
    bio: "Leading product strategy for decentralized exchanges. Previously PM at Coinbase and early employee at MakerDAO.",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format",
    socials: {
      twitter: "emmaprodm",
      linkedin: "emmarodriguez"
    },
    attending: ["Product Summit", "Tokenomics Panel"],
    type: "ct"
  },
  { 
    id: 7, 
    name: "David Kim", 
    role: "Community Lead", 
    company: "Optimism", 
    interests: ["DAOs", "Community Building"],
    bio: "Growing and nurturing the Optimism ecosystem. Focused on governance mechanisms and community incentives.",
    avatar: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?q=80&w=200&auto=format",
    socials: {
      twitter: "davidkimop",
      linkedin: "davidkim"
    },
    attending: ["Community Gathering", "DAO Workshop"],
    type: "ct"
  },
  { 
    id: 8, 
    name: "Nina Chen", 
    role: "Protocol Engineer", 
    company: "Scroll", 
    interests: ["ZK Rollups", "EVM"], 
    bio: "Working on ZK-EVM implementations. Contributor to multiple Ethereum improvement proposals.",
    avatar: "https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?q=80&w=200&auto=format",
    socials: {
      twitter: "ninazkdev",
      linkedin: "ninachen"
    },
    attending: ["ZK Summit", "Technical Workshops"],
    type: "dev"
  },
  { 
    id: 9,
    name: "Carlos Vega", 
    role: "Investor", 
    company: "Blockchain Capital", 
    interests: ["Investment", "DeFi"], 
    bio: "Venture capital investor with focus on Web3 infrastructure and DeFi protocols. Previously founded a successful fintech startup.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format",
    socials: {
      twitter: "carlosvega",
      linkedin: "carlosvegavc"
    },
    attending: ["Investor Summit", "Pitch Day"],
    type: "vc"
  },
  { 
    id: 10,
    name: "Aisha Johnson", 
    role: "UX Researcher", 
    company: "Consensys", 
    interests: ["User Research", "Accessibility"], 
    bio: "Making blockchain technology usable for everyone. Specializing in user research and accessibility in Web3.",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200&auto=format",
    socials: {
      twitter: "aishauxr",
      linkedin: "aishajohnson"
    },
    attending: ["UX Workshop", "Accessibility Panel"],
    type: "designer"
  }
];

// Helper to get the icon based on attendant type
const getTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'ct':
      return <Briefcase className="h-4 w-4" />;
    case 'vc':
      return <CreditCard className="h-4 w-4" />;
    case 'dev':
      return <Code className="h-4 w-4" />;
    case 'designer':
      return <PenTool className="h-4 w-4" />;
    default:
      return <BarChart className="h-4 w-4" />;
  }
};

const getTypeBadgeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'ct':
      return "bg-blue-100 text-blue-800 border-blue-200";
    case 'vc':
      return "bg-purple-100 text-purple-800 border-purple-200";
    case 'dev':
      return "bg-green-100 text-green-800 border-green-200";
    case 'designer':
      return "bg-amber-100 text-amber-800 border-amber-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const Attendants = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<"name" | "company">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const { connected } = useWallet();
  const [sidebarState, setSidebarState] = useState<"expanded" | "collapsed" | "none">("none");
  
  // Monitor sidebar state
  useEffect(() => {
    const checkSidebarState = () => {
      if (!connected || window.location.pathname !== "/") {
        setSidebarState("none");
        return;
      }
      
      const sidebar = document.getElementById("trip-sidebar");
      if (sidebar) {
        if (sidebar.classList.contains("trip-sidebar-collapsed")) {
          setSidebarState("collapsed");
        } else if (sidebar.classList.contains("trip-sidebar-expanded")) {
          setSidebarState("expanded");
        }
      }
    };

    checkSidebarState();
    
    const handleSidebarStateChange = () => {
      checkSidebarState();
    };
    
    window.addEventListener('sidebar-state-change', handleSidebarStateChange);
    window.addEventListener('resize', checkSidebarState);
    
    return () => {
      window.removeEventListener('sidebar-state-change', handleSidebarStateChange);
      window.removeEventListener('resize', checkSidebarState);
    };
  }, [connected]);

  // Toggle sort order
  const toggleSort = (field: "name" | "company") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };
  
  const filteredAttendants = MOCK_ATTENDANTS.filter(attendant => {
    const matchesSearch = 
      attendant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendant.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendant.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendant.interests.some(interest => interest.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesRole = roleFilter === "" || roleFilter === "all-roles" || attendant.role === roleFilter;
    const matchesType = typeFilter === "" || typeFilter === "all-types" || attendant.type === typeFilter;
    
    return matchesSearch && matchesRole && matchesType;
  }).sort((a, b) => {
    if (sortBy === "name") {
      return sortOrder === "asc" 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    } else {
      return sortOrder === "asc" 
        ? a.company.localeCompare(b.company) 
        : b.company.localeCompare(a.company);
    }
  });

  const uniqueRoles = Array.from(new Set(MOCK_ATTENDANTS.map(a => a.role)));
  const uniqueTypes = Array.from(new Set(MOCK_ATTENDANTS.map(a => a.type)));

  return (
    <div className={`container mx-auto py-16 px-4 ${
      sidebarState === "expanded" ? "max-w-[calc(100%-20rem)]" : ""
    }`}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3 text-devconnect-dark">Devconnect Attendants</h1>
        <p className="text-gray-600 mb-6 max-w-3xl">
          Connect with other attendees at Devconnect Argentina 2025. Explore the diverse community of developers, designers, 
          investors, and thought leaders shaping the future of blockchain technology.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-4 bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl shadow-sm">
        <div className="flex-1 min-w-[240px]">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search by name, company, bio, or interests" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 border-devconnect-primary/20 focus-visible:ring-devconnect-primary"
            />
          </div>
        </div>
        
        <div className="w-full sm:w-auto">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full sm:w-[180px] border-devconnect-primary/20">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-roles">All Roles</SelectItem>
              {uniqueRoles.map(role => (
                <SelectItem key={role} value={role}>{role}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full sm:w-auto">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-[180px] border-devconnect-primary/20">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-types">All Types</SelectItem>
              {uniqueTypes.map(type => (
                <SelectItem key={type} value={type}>
                  <div className="flex items-center gap-2">
                    {getTypeIcon(type)} 
                    <span className="capitalize">{type}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button variant="outline" className="flex items-center gap-2" onClick={() => {
          setSearchTerm("");
          setRoleFilter("");
          setTypeFilter("");
        }}>
          <Filter className="h-4 w-4" />
          Clear Filters
        </Button>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">
            Showing {filteredAttendants.length} of {MOCK_ATTENDANTS.length} attendants
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => toggleSort("name")} 
            className="flex items-center gap-1"
          >
            Name
            <ArrowUpDown className={`h-3 w-3 ${sortBy === "name" ? "text-devconnect-primary" : "text-gray-400"}`} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => toggleSort("company")} 
            className="flex items-center gap-1"
          >
            Company
            <ArrowUpDown className={`h-3 w-3 ${sortBy === "company" ? "text-devconnect-primary" : "text-gray-400"}`} />
          </Button>
        </div>
      </div>

      <AnimatePresence>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAttendants.length > 0 ? (
            filteredAttendants.map((attendant) => (
              <motion.div 
                key={attendant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-300 border-devconnect-primary/10">
                  <CardContent className="p-0 h-full">
                    <div className="bg-gradient-to-r from-devconnect-primary/5 to-devconnect-secondary/5 p-4">
                      <div className="flex justify-between items-start mb-4">
                        <Avatar className="h-16 w-16 border-2 border-white shadow-md">
                          <AvatarImage src={attendant.avatar} alt={attendant.name} />
                          <AvatarFallback className="bg-devconnect-primary text-white">
                            {attendant.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex gap-2">
                          <Badge className={`${getTypeBadgeColor(attendant.type)} flex items-center gap-1`}>
                            {getTypeIcon(attendant.type)}
                            <span className="capitalize">{attendant.type}</span>
                          </Badge>
                        </div>
                      </div>
                      
                      <h3 className="font-bold text-lg">{attendant.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{attendant.role} at {attendant.company}</p>
                    </div>
                    
                    <div className="p-4">
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{attendant.bio}</p>
                      
                      <div className="mb-4">
                        <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Interests</h4>
                        <div className="flex flex-wrap gap-2">
                          {attendant.interests.map((interest, i) => (
                            <Badge key={i} variant="secondary" className="bg-gray-100">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Attending</h4>
                        <div className="flex flex-wrap gap-2">
                          {attendant.attending.map((event, i) => (
                            <Badge key={i} className="bg-devconnect-primary/10 text-devconnect-primary border-none">
                              {event}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-2 border-t">
                        <div className="flex items-center gap-2">
                          {attendant.socials.twitter && (
                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <a href={`https://twitter.com/${attendant.socials.twitter}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400 transition-colors">
                                  <Twitter className="h-4 w-4" />
                                </a>
                              </HoverCardTrigger>
                              <HoverCardContent className="w-fit p-2">
                                @{attendant.socials.twitter}
                              </HoverCardContent>
                            </HoverCard>
                          )}
                          
                          {attendant.socials.linkedin && (
                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <a href={`https://linkedin.com/in/${attendant.socials.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-700 transition-colors">
                                  <Linkedin className="h-4 w-4" />
                                </a>
                              </HoverCardTrigger>
                              <HoverCardContent className="w-fit p-2">
                                linkedin.com/in/{attendant.socials.linkedin}
                              </HoverCardContent>
                            </HoverCard>
                          )}
                        </div>
                        
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button size="sm" variant="ghost" className="text-xs flex items-center gap-1 hover:bg-devconnect-primary hover:text-white">
                              <Zap className="h-3 w-3" /> Connect
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-80">
                            <div className="space-y-2">
                              <h4 className="font-medium">Connect with {attendant.name}</h4>
                              <p className="text-sm text-gray-500">Send a connection request to exchange contact information at Devconnect.</p>
                              <Button size="sm" className="w-full bg-devconnect-primary hover:bg-devconnect-primary/90">
                                Send Request
                              </Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-200"
            >
              <Users className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No attendants found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </motion.div>
          )}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default Attendants;
