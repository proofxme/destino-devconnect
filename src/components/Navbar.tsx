
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { SearchSpotlight } from "./SearchSpotlight";
import { NavbarLogo } from "./navigation/NavbarLogo";
import { AdminButton } from "./navigation/AdminButton";
import WalletButton from "./WalletButton";
import { useWallet } from "@/context/WalletContext";
import UserProfileDropdown from "./navigation/UserProfileDropdown";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Events", path: "/events" },
  { name: "Accommodations", path: "/accommodations" },
  { name: "Restaurants", path: "/restaurants" },
  { name: "Activities", path: "/activities" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { connected: isConnected } = useWallet();

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

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      isScrolled 
        ? "bg-white shadow-md py-2" 
        : "bg-transparent py-4"
    )}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <NavbarLogo isScrolled={isScrolled} />
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex space-x-1">
            {navItems.map((item) => (
              <Button 
                key={item.name}
                variant="ghost" 
                asChild
                className={cn(
                  "font-medium",
                  isScrolled ? "text-devconnect-dark" : "text-white"
                )}
              >
                <Link to={item.path}>{item.name}</Link>
              </Button>
            ))}
          </div>
          
          <SearchSpotlight />
          
          {isConnected && <AdminButton />}
          {isConnected ? <UserProfileDropdown /> : <WalletButton />}
        </div>
        
        <div className="md:hidden flex items-center space-x-2">
          <SearchSpotlight />
          
          {isConnected ? 
            <UserProfileDropdown /> : 
            <WalletButton />
          }
          
          <Button 
            variant="ghost"
            size="icon"
            className={isScrolled ? "text-devconnect-dark" : "text-white"}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden bg-white w-full shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-devconnect-dark font-medium hover:text-argentina-blue transition-colors py-2 px-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {isConnected && (
              <Button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.location.href="/admin";
                }}
                variant="outline"
                size="sm"
                className="mt-2 border-argentina-blue text-argentina-blue hover:bg-argentina-blue hover:text-white"
              >
                Admin Dashboard
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
