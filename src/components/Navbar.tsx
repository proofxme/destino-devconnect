
import { useEffect, useState } from "react";
import { Menu, X } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { SearchSpotlight } from "./SearchSpotlight";
import { NavbarLogo } from "./navigation/NavbarLogo";
import { NavMenu } from "./navigation/NavMenu";
import { AdminButton } from "./navigation/AdminButton";
import WalletButton from "./WalletButton";
import { useWallet } from "@/context/WalletContext";

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
        <NavbarLogo isScrolled={isScrolled} />
        
        <div className="hidden md:flex items-center space-x-6">
          <NavMenu isScrolled={isScrolled} />
          
          <SearchSpotlight />
          
          {isConnected && <AdminButton />}
          <WalletButton />
        </div>
        
        <div className="md:hidden flex items-center">
          <SearchSpotlight />
          
          {isConnected && <AdminButton size="sm" className="mr-2" />}
          <WalletButton />
          
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
            <NavMenu isScrolled={true} isMobile={true} onItemClick={() => setMobileMenuOpen(false)} />
            {isConnected && (
              <div className="text-xs text-gray-500 pt-2">
                Connected wallet
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
