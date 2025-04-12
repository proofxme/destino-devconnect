
import { useEffect, useState } from "react";
import { Menu, Wallet } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { NavbarLogo } from "./navigation/NavbarLogo";
import { useWallet } from "@/context/WalletContext";
import UserProfileDropdown from "./navigation/UserProfileDropdown";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { connected: isConnected } = useWallet();
  const isMobile = useIsMobile();

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

  // Simple wallet button for the navbar
  const WalletButton = () => {
    const { connecting, connect } = useWallet();
    
    return (
      <Button 
        variant="ghost" 
        size="icon"
        className={cn(
          "rounded-full",
          isConnected ? "text-argentina-sun" : "text-white/70"
        )}
        onClick={isConnected ? undefined : connect} 
        disabled={connecting}
      >
        <Wallet className="h-5 w-5" />
      </Button>
    );
  };

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      isScrolled 
        ? "bg-gray-800/95 shadow-md py-2" 
        : "bg-gray-800 py-3"
    )}>
      <div className="container mx-auto px-4 flex justify-between items-center h-14">
        {/* Logo */}
        <NavbarLogo isScrolled={false} />
        
        {/* Right side controls */}
        <div className="flex items-center gap-2">
          {isConnected ? <UserProfileDropdown /> : <WalletButton />}
          
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0">
                <div className="py-4 px-3 border-b border-sidebar-border">
                  <NavbarLogo isScrolled={true} />
                </div>
                <div className="h-[calc(100%-80px)]">
                  {/* AppSidebar will be rendered inside the sheet content */}
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
