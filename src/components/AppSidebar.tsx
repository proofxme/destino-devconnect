
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
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { NavbarLogo } from "./navigation/NavbarLogo";
import { useWallet } from "@/context/WalletContext";
import { ScrollArea } from "./ui/scroll-area";

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
    <Sidebar variant="sidebar">
      <div className="py-4 px-3 border-b border-sidebar-border bg-sidebar">
        <NavbarLogo isScrolled={true} />
      </div>
      
      <SidebarContent className="bg-sidebar">
        <ScrollArea className="h-[calc(100vh-80px)]">
          {/* Explore Section */}
          <SidebarGroup>
            <SidebarGroupLabel>
              <Compass className="mr-2" />
              Explore
            </SidebarGroupLabel>
            <SidebarMenu>
              {exploreLinks.map((link) => (
                <SidebarMenuItem key={link.path}>
                  <SidebarMenuButton 
                    asChild
                    isActive={isActive(link.path)}
                    tooltip={link.name}
                  >
                    <Link to={link.path} className={cn(
                      "flex items-center",
                      isActive(link.path) && "font-medium"
                    )}>
                      <link.icon className="mr-2" />
                      <span>{link.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>

          {/* Attendants Section */}
          <SidebarGroup>
            <SidebarGroupLabel>
              <Users className="mr-2" />
              Attendants
            </SidebarGroupLabel>
            <SidebarMenu>
              {attendantsLinks.map((link) => (
                <SidebarMenuItem key={link.path}>
                  <SidebarMenuButton 
                    asChild
                    isActive={isActive(link.path)}
                    tooltip={link.name}
                  >
                    <Link to={link.path} className={cn(
                      "flex items-center",
                      isActive(link.path) && "font-medium"
                    )}>
                      <link.icon className="mr-2" />
                      <span>{link.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>

          {/* Sponsors Section */}
          <SidebarGroup>
            <SidebarGroupLabel>
              <Handshake className="mr-2" />
              Sponsors
            </SidebarGroupLabel>
            <SidebarMenu>
              {sponsorsLinks.map((link) => (
                <SidebarMenuItem key={link.path}>
                  <SidebarMenuButton 
                    asChild
                    isActive={isActive(link.path)}
                    tooltip={link.name}
                  >
                    <Link to={link.path} className={cn(
                      "flex items-center",
                      isActive(link.path) && "font-medium"
                    )}>
                      <link.icon className="mr-2" />
                      <span>{link.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>

          {/* Help Section */}
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  tooltip="Help & FAQ"
                >
                  <a href="#" className="flex items-center">
                    <HelpCircle className="mr-2" />
                    <span>Help & FAQ</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {connected && (
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild
                    isActive={isActive("/admin")}
                    tooltip="Admin"
                  >
                    <Link to="/admin" className="flex items-center">
                      <Settings className="mr-2" />
                      <span>Admin Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroup>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
