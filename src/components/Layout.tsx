
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useWallet } from "@/context/WalletContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import TripSidebar from "./trip/TripSidebar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "./Navbar";
import AppSidebar from "./AppSidebar";

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

  // Expose sidebar state to window for other components to access
  useEffect(() => {
    if (connected && isHomePage && !isMobile) {
      window.dispatchEvent(new CustomEvent('sidebar-state-change', { 
        detail: { collapsed: sidebarCollapsed } 
      }));
    }
  }, [sidebarCollapsed, connected, isHomePage, isMobile]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AppSidebar />
      
      <div className="pt-16 flex flex-1"> {/* Adjusted padding for navbar height */}
        {connected && isHomePage && !isMobile && (
          <div 
            className={`fixed top-16 right-0 h-[calc(100vh-64px)] border-l border-sidebar-border bg-sidebar z-10 transition-all duration-300 ease-in-out ${
              sidebarCollapsed ? 'w-16 trip-sidebar-collapsed' : 'w-80 trip-sidebar-expanded'
            }`}
            id="trip-sidebar"
          >
            <div className="absolute -left-4 top-4 z-20">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-full border shadow-sm bg-background" 
                onClick={toggleSidebar}
                aria-label={sidebarCollapsed ? "Expand trip sidebar" : "Collapse trip sidebar"}
              >
                {sidebarCollapsed ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
              </Button>
            </div>
            <TripSidebar collapsed={sidebarCollapsed} />
          </div>
        )}
        
        <main 
          className={cn(
            "flex-1 px-6 py-6",
            connected && isHomePage && !isMobile ? 
              (sidebarCollapsed ? 'mr-16' : 'mr-80') : ''
          )}
        >
          {connected && isHomePage && isMobile && <TripSidebar isMobile />}
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
