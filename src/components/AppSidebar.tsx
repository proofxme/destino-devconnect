
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { 
  Compass, 
  Users, 
  Handshake,
  Calendar, 
  Home, 
  Coffee, 
  Bike, 
  HelpCircle,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";
import { useWallet } from "@/context/WalletContext";
import { NavbarLogo } from "./navigation/NavbarLogo";

const AppSidebar = () => {
  const location = useLocation();
  const { connected } = useWallet();

  // Core navigation links
  const exploreLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Events", path: "/events", icon: Calendar },
    { name: "Accommodations", path: "/accommodations", icon: Home },
    { name: "Restaurants", path: "/restaurants", icon: Coffee },
    { name: "Activities", path: "/activities", icon: Bike },
  ];

  // New sidebar sections
  const attendantsLinks = [
    { name: "All Attendants", path: "/attendants", icon: Users },
  ];

  const sponsorsLinks = [
    { name: "Ecosystem Partners", path: "/sponsors", icon: Handshake },
  ];

  // Determine if a link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="w-64 min-h-screen border-r border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800 flex flex-col">
      <div className="py-4 px-3 border-b border-gray-200 dark:border-gray-800">
        <NavbarLogo isScrolled={true} />
      </div>
      
      <ScrollArea className="h-[calc(100vh-80px)] flex-1">
        <div className="px-3 py-4">
          {/* Explore Section */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-2 mb-2 flex items-center">
              <Compass className="h-4 w-4 mr-2" />
              Explore
            </h3>
            <nav className="space-y-1">
              {exploreLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "flex items-center px-2 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive(link.path)
                      ? "bg-argentina-blue text-white"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  <link.icon className="h-5 w-5 mr-3" />
                  <span>{link.name}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Attendants Section */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-2 mb-2 flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Attendants
            </h3>
            <nav className="space-y-1">
              {attendantsLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "flex items-center px-2 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive(link.path)
                      ? "bg-argentina-blue text-white"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  <link.icon className="h-5 w-5 mr-3" />
                  <span>{link.name}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Sponsors Section */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-2 mb-2 flex items-center">
              <Handshake className="h-4 w-4 mr-2" />
              Sponsors
            </h3>
            <nav className="space-y-1">
              {sponsorsLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "flex items-center px-2 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive(link.path)
                      ? "bg-argentina-blue text-white"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  <link.icon className="h-5 w-5 mr-3" />
                  <span>{link.name}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Help Section */}
          <div>
            <nav className="space-y-1">
              <a 
                href="#" 
                className="flex items-center px-2 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <HelpCircle className="h-5 w-5 mr-3" />
                <span>Help & FAQ</span>
              </a>

              {connected && (
                <Link
                  to="/admin"
                  className={cn(
                    "flex items-center px-2 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive("/admin")
                      ? "bg-argentina-blue text-white"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  <Settings className="h-5 w-5 mr-3" />
                  <span>Admin Dashboard</span>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AppSidebar;
