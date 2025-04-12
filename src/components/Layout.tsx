
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useWallet } from "@/context/WalletContext";
import { useIsMobile } from "@/hooks/use-mobile";
import TripSidebar from "./trip/TripSidebar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  children
}) => {
  const {
    connected
  } = useWallet();
  const isMobile = useIsMobile();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

  return (
    <div className="min-h-screen">
      {connected && isHomePage && !isMobile && (
        <div className={`fixed top-0 left-0 h-screen border-r border-gray-200 bg-white z-10 transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'w-16' : 'w-80'}`}>
          <div className="absolute -right-4 top-4 z-20">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full border shadow-sm bg-white" 
              onClick={toggleSidebar}
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </Button>
          </div>
          <TripSidebar collapsed={sidebarCollapsed} />
        </div>
      )}
      <div className={`${connected && isHomePage && !isMobile ? (sidebarCollapsed ? 'ml-16' : 'ml-80') : ''} transition-all duration-300 ease-in-out`}>
        <div className="container mx-auto px-0">
          {connected && isHomePage && isMobile && <TripSidebar isMobile />}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
