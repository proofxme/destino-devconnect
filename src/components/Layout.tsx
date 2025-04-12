
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
    <div className="min-h-screen">
      {connected && isHomePage && !isMobile && (
        <div className="fixed top-0 left-0 w-80 h-screen border-r border-gray-200 bg-white z-10">
          <TripSidebar />
        </div>
      )}
      <div className={`${connected && isHomePage && !isMobile ? 'ml-80' : ''} transition-all duration-300 ease-in-out`}>
        <div className="container mx-auto px-0">
          {connected && isHomePage && isMobile && <TripSidebar isMobile />}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
