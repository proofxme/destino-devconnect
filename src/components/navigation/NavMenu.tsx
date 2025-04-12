
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface NavMenuProps {
  isScrolled: boolean;
  isMobile?: boolean;
  onItemClick?: () => void;
}

const navItems = [
  { name: "Home", path: "/" },
  { name: "Events", path: "/events" },
  { name: "Accommodations", path: "/accommodations" },
  { name: "Restaurants", path: "/restaurants" },
  { name: "Activities", path: "/activities" },
];

export const NavMenu = ({ isScrolled, isMobile = false, onItemClick }: NavMenuProps) => {
  const [navDropdownOpen, setNavDropdownOpen] = useState(false);

  if (isMobile) {
    return (
      <>
        {navItems.map((item) => (
          <Link 
            key={item.name}
            to={item.path}
            className="text-devconnect-dark font-medium hover:text-argentina-blue transition-colors"
            onClick={onItemClick}
          >
            {item.name}
          </Link>
        ))}
      </>
    );
  }

  return (
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
  );
};
