
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, CalendarRange } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { SearchSpotlight } from "./SearchSpotlight";
import { NavbarLogo } from "./navigation/NavbarLogo";
import { AdminButton } from "./navigation/AdminButton";
import { useWallet } from "@/context/WalletContext";
import UserProfileDropdown from "./navigation/UserProfileDropdown";
import WalletButton from "./WalletButton";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const navigationLinks = [
  { name: "Home", path: "/" },
  { name: "Events", path: "/events" },
  { name: "Accommodations", path: "/accommodations" },
  { name: "Restaurants", path: "/restaurants" },
  { name: "Activities", path: "/activities" },
];

const attendantLinks = [
  { name: "All Attendants", path: "/attendants" },
];

const sponsorsLinks = [
  { name: "Ecosystem Partners", path: "/sponsors" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tripSidebarOpen, setTripSidebarOpen] = useState(false);
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

  const openTripSidebar = () => {
    setTripSidebarOpen(true);
    // Dispatch a custom event to notify the Layout component to open the trip sidebar
    window.dispatchEvent(new CustomEvent('open-trip-sidebar'));
  };

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      isScrolled 
        ? "bg-gray-800/95 shadow-md py-3" 
        : "bg-gray-800 py-3"
    )}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <NavbarLogo isScrolled={false} />
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList className="space-x-2">
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className={cn(
                    "h-10 px-4 text-base font-medium bg-white/10 hover:bg-white/20 text-white"
                  )}
                >
                  Explore
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-2 p-3 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {navigationLinks.map((item) => (
                      <li key={item.path}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={item.path}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{item.name}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className={cn(
                    "h-10 px-4 text-base font-medium bg-white/10 hover:bg-white/20 text-white"
                  )}
                >
                  Attendants
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-2 p-3">
                    {attendantLinks.map((item) => (
                      <li key={item.path}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={item.path}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{item.name}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className={cn(
                    "h-10 px-4 text-base font-medium bg-white/10 hover:bg-white/20 text-white"
                  )}
                >
                  Sponsors
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-2 p-3">
                    {sponsorsLinks.map((item) => (
                      <li key={item.path}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={item.path}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{item.name}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <SearchSpotlight />
          
          {isConnected && <AdminButton size="default" />}
          {isConnected ? <UserProfileDropdown /> : <WalletButton />}
        </div>
        
        {/* Mobile Navigation Bar */}
        <div className="lg:hidden flex items-center gap-3">
          {/* Search Button */}
          <SearchSpotlight />
          
          {/* Trip Agenda Button */}
          {isConnected && (
            <Button 
              variant="ghost"
              size="sm"
              className="text-white"
              onClick={openTripSidebar}
              aria-label="Trip Agenda"
            >
              <CalendarRange size={20} />
            </Button>
          )}
          
          {/* Menu Button */}
          <Button 
            variant="ghost"
            size="sm"
            className="text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gray-800 w-full shadow-lg">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-1">
            {/* Wallet Button in Mobile Menu */}
            <div className="py-3 mb-3 border-b border-white/20 flex justify-center">
              {isConnected ? <UserProfileDropdown /> : <WalletButton />}
            </div>
            
            <div className="py-2 border-b border-white/20">
              <h3 className="text-white text-xs font-bold mb-1">Explore</h3>
              {navigationLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-white text-sm font-medium hover:text-blue-300 transition-colors py-1 px-2 block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            <div className="py-2 border-b border-white/20">
              <h3 className="text-white text-xs font-bold mb-1">Attendants</h3>
              {attendantLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-white text-sm font-medium hover:text-blue-300 transition-colors py-1 px-2 block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            <div className="py-2">
              <h3 className="text-white text-xs font-bold mb-1">Sponsors</h3>
              {sponsorsLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-white text-sm font-medium hover:text-blue-300 transition-colors py-1 px-2 block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            {isConnected && (
              <Button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.location.href="/admin";
                }}
                variant="outline"
                size="sm"
                className="mt-1 border-blue-300 text-blue-300 hover:bg-blue-300 hover:text-white"
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
