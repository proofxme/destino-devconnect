import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Wallet, ChevronRight, ChevronDown } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { SearchSpotlight } from "./SearchSpotlight";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [navDropdownOpen, setNavDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const connected = localStorage.getItem("wallet-connected") === "true";
    const address = localStorage.getItem("wallet-address");
    if (connected && address) {
      setIsConnected(true);
      setWalletAddress(address);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
        setIsConnected(true);
        
        localStorage.setItem("wallet-connected", "true");
        localStorage.setItem("wallet-address", accounts[0]);
        
        toast.success("Wallet connected successfully!");
        console.log("Wallet connected:", accounts[0]);
      } else {
        toast.error("Please install MetaMask to use this feature!");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Failed to connect wallet");
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress("");
    localStorage.removeItem("wallet-connected");
    localStorage.removeItem("wallet-address");
    toast.info("Wallet disconnected");
  };

  const goToAdminDashboard = () => {
    navigate("/admin");
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Accommodations", path: "/accommodations" },
    { name: "Restaurants", path: "/restaurants" },
    { name: "Activities", path: "/activities" },
  ];

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      isScrolled 
        ? "bg-white shadow-md py-2" 
        : "bg-transparent py-4"
    )}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-devconnect-primary to-argentina-blue bg-clip-text text-transparent">
            Destino
          </span>
          <span className={cn(
            "text-2xl font-bold transition-colors",
            isScrolled ? "text-devconnect-dark" : "text-white"
          )}>
            Devconnect
          </span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Collapsible 
            open={navDropdownOpen} 
            onOpenChange={setNavDropdownOpen}
            className="relative"
          >
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                className={cn(
                  "flex items-center gap-1 font-medium",
                  isScrolled ? "text-devconnect-dark" : "text-white"
                )}
              >
                Navigation
                <ChevronDown size={16} className={cn("transition-transform", navDropdownOpen && "rotate-180")} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="absolute top-full left-0 z-50 mt-2 w-48 bg-white rounded-md shadow-lg border">
              {navItems.map((item) => (
                <Link 
                  key={item.name}
                  to={item.path}
                  className="block px-4 py-2 text-sm text-devconnect-dark hover:bg-gray-100"
                  onClick={() => setNavDropdownOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>
          
          <SearchSpotlight />
          
          {isConnected ? (
            <div className="flex items-center space-x-2">
              <Button
                onClick={goToAdminDashboard}
                variant="outline"
                className="border-argentina-blue text-argentina-blue hover:bg-argentina-blue hover:text-white"
              >
                Admin Dashboard
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
              <Button
                onClick={disconnectWallet}
                variant="outline"
                className="ml-1"
              >
                <Wallet className="mr-2 h-4 w-4" />
                {`${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`}
              </Button>
            </div>
          ) : (
            <Button
              onClick={connectWallet}
              variant="default"
              className="ml-4 bg-argentina-blue hover:bg-argentina-blue-dark"
            >
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
          )}
        </div>
        
        <div className="md:hidden flex items-center">
          <SearchSpotlight />
          
          {isConnected && (
            <Button
              onClick={goToAdminDashboard}
              variant="outline"
              size="sm"
              className="mr-2 border-argentina-blue text-argentina-blue"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
          
          <Button
            onClick={isConnected ? disconnectWallet : connectWallet}
            variant={isConnected ? "outline" : "default"}
            size="sm"
            className="mr-2"
          >
            <Wallet className="h-4 w-4" />
          </Button>
          
          <button 
            className="ml-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className={isScrolled ? "text-devconnect-dark" : "text-white"} />
            ) : (
              <Menu className={isScrolled ? "text-devconnect-dark" : "text-white"} />
            )}
          </button>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden bg-white w-full">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                to={item.path}
                className="text-devconnect-dark font-medium hover:text-argentina-blue transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {isConnected && (
              <div className="text-xs text-gray-500 pt-2">
                Connected: {`${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
