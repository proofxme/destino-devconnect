
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavbarLogoProps {
  isScrolled: boolean;
}

export const NavbarLogo = ({ isScrolled }: NavbarLogoProps) => {
  return (
    <Link to="/" className="flex flex-col items-start">
      <span className="text-2xl font-bold bg-gradient-to-r from-devconnect-primary to-argentina-blue bg-clip-text text-transparent">
        Destino
      </span>
      <span className={cn(
        "text-xl font-bold leading-tight transition-colors",
        isScrolled ? "text-devconnect-dark" : "text-white"
      )}>
        Devconnect
      </span>
    </Link>
  );
};
