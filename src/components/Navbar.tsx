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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
      <div className="container mx-auto px-2 sm:px-4 flex justify-between items-center">
        <div className="flex items-center">
          <NavbarLogo isScrolled={isScrolled} />
        </div>
        
        <div className="hidden lg:flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className={cn(
                  "font-medium flex items-center gap-1",
                  isScrolled ? "text-devconnect-dark" : "text-white"
                )}
                size="sm"
              >
                Navigation
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              {navItems.map((item) => (
                <DropdownMenuItem key={item.name} asChild>
                  <Link to={item.path} className="w-full">
                    {item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <SearchSpotlight />
          
          {isConnected && <AdminButton />}
          {isConnected ? <UserProfileDropdown /> : <WalletButton />}
        </div>
        
        <div className="lg:hidden flex items-center gap-1">
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
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white w-full shadow-lg">
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
