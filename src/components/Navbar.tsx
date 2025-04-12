
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Wallet } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

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
      // Check if MetaMask is available
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
        setIsConnected(true);
        console.log("Wallet connected:", accounts[0]);
      } else {
        alert("Please install MetaMask to use this feature!");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress("");
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
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link 
              key={item.name}
              to={item.path}
              className={cn(
                "font-medium hover:text-argentina-blue transition-colors",
                isScrolled ? "text-devconnect-dark" : "text-white"
              )}
            >
              {item.name}
            </Link>
          ))}
          
          <Button
            onClick={isConnected ? disconnectWallet : connectWallet}
            variant={isConnected ? "outline" : "default"}
            className={cn(
              "ml-4",
              !isConnected && "bg-argentina-blue hover:bg-argentina-blue-dark"
            )}
          >
            <Wallet className="mr-2 h-4 w-4" />
            {isConnected 
              ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}` 
              : "Connect Wallet"}
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
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
      
      {/* Mobile Menu */}
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
