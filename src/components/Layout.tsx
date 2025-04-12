
import React from "react";
import { useLocation } from "react-router-dom";
import { useWallet } from "@/context/WalletContext";
import { useIsMobile } from "@/hooks/use-mobile";
import TripSidebar from "./trip/TripSidebar";

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

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1 overflow-auto">
        {connected && isHomePage && !isMobile && (
          <div className="sidebar-container w-80 border-r border-gray-200 bg-white overflow-y-auto max-h-screen sticky top-0">
            <TripSidebar />
          </div>
        )}
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-0">
            {connected && isHomePage && isMobile && <TripSidebar isMobile />}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
