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
  return <div className="min-h-screen flex">
      {connected && isHomePage && !isMobile && <div className="sidebar-container w-80 border-r border-gray-200 bg-white">
          <TripSidebar />
        </div>}
      <div className="flex-1 overflow-hidden">
        <div className="container mx-auto px-0">
          {connected && isHomePage && isMobile && <TripSidebar isMobile />}
          {children}
        </div>
      </div>
    </div>;
};
export default Layout;