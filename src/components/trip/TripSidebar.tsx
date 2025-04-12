
import React, { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { CalendarRange, Utensils, Users, X } from "lucide-react";
import { getTripPlan, TripPlan } from "@/api/tripApi";
import { useWallet } from "@/context/WalletContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import TripEventsList from "./TripEventsList";
import TripRestaurantsList from "./TripRestaurantsList";
import TripFriendsList from "./TripFriendsList";
import WalletConnect from "./WalletConnect";
import { useToast } from "@/components/ui/use-toast";

interface TripSidebarProps {
  isMobile?: boolean;
  collapsed?: boolean;
}

const TripSidebar: React.FC<TripSidebarProps> = ({ isMobile = false, collapsed = false }) => {
  const [open, setOpen] = useState(false);
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const { connected } = useWallet();
  const { toast } = useToast();

  useEffect(() => {
    if (connected) {
      fetchTripPlan();
    }
  }, [connected]);

  const fetchTripPlan = async () => {
    try {
      setLoading(true);
      const data = await getTripPlan();
      setTripPlan(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load trip plan.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!connected) {
    return <WalletConnect />;
  }

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "MMM d, yyyy");
    } catch (error) {
      return dateString;
    }
  };

  if (isMobile) {
    return (
      <div className="flex items-center justify-between bg-gray-100 p-2 rounded-lg mb-4">
        <Button 
          onClick={() => setOpen(true)}
          className="flex items-center space-x-2 bg-argentina-blue text-white hover:bg-argentina-blue-dark"
        >
          <CalendarRange size={16} />
          <span>My Trip Planner</span>
        </Button>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent className="p-0 max-h-[85vh]">
            <DrawerHeader className="bg-gradient-to-r from-argentina-blue to-devconnect-primary text-white">
              <div className="flex items-center justify-between">
                <DrawerTitle>My Devconnect Trip</DrawerTitle>
                <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="text-white">
                  <X size={18} />
                </Button>
              </div>
              {tripPlan && (
                <div className="flex items-center mt-2 text-sm">
                  <CalendarRange size={16} className="mr-2" />
                  <span>{formatDate(tripPlan.startDate)} - {formatDate(tripPlan.endDate)}</span>
                </div>
              )}
            </DrawerHeader>
            <div className="p-4">
              <MobileTripContent tripPlan={tripPlan} loading={loading} />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    );
  }

  return (
    <ScrollArea className="w-full h-screen">
      <div className="bg-gradient-to-r from-argentina-blue to-devconnect-primary text-white p-4 sticky top-0 z-10">
        {!collapsed ? (
          <>
            <h2 className="text-xl font-bold">My Devconnect Trip</h2>
            {tripPlan && (
              <div className="flex items-center mt-2 text-sm">
                <CalendarRange size={16} className="mr-2" />
                <span>{formatDate(tripPlan.startDate)} - {formatDate(tripPlan.endDate)}</span>
              </div>
            )}
          </>
        ) : (
          <div className="flex justify-center">
            <CalendarRange size={20} />
          </div>
        )}
      </div>
      <div className="p-4">
        <DesktopTripContent tripPlan={tripPlan} loading={loading} collapsed={collapsed} />
      </div>
    </ScrollArea>
  );
};

interface TripContentProps {
  tripPlan: TripPlan | null;
  loading: boolean;
  collapsed?: boolean;
}

const MobileTripContent: React.FC<TripContentProps> = ({ tripPlan, loading }) => {
  return (
    <Tabs defaultValue="events" className="w-full">
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="events" className="flex items-center gap-1">
          <CalendarRange size={14} />
          <span>Events</span>
        </TabsTrigger>
        <TabsTrigger value="restaurants" className="flex items-center gap-1">
          <Utensils size={14} />
          <span>Dining</span>
        </TabsTrigger>
        <TabsTrigger value="friends" className="flex items-center gap-1">
          <Users size={14} />
          <span>Friends</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="events">
        <TripEventsList events={tripPlan?.events || []} loading={loading} />
      </TabsContent>
      <TabsContent value="restaurants">
        <TripRestaurantsList restaurants={tripPlan?.restaurants || []} loading={loading} />
      </TabsContent>
      <TabsContent value="friends">
        <TripFriendsList friends={tripPlan?.friends || []} loading={loading} />
      </TabsContent>
    </Tabs>
  );
};

const DesktopTripContent: React.FC<TripContentProps> = ({ tripPlan, loading, collapsed = false }) => {
  const [expandedSections, setExpandedSections] = useState({
    events: true,
    restaurants: true,
    friends: true
  });

  const toggleSection = (section: 'events' | 'restaurants' | 'friends') => {
    if (!collapsed) {
      setExpandedSections(prev => ({
        ...prev,
        [section]: !prev[section]
      }));
    }
  };

  if (collapsed) {
    return (
      <div className="space-y-6 flex flex-col items-center">
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <CalendarRange size={20} />
        </Button>
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <Utensils size={20} />
        </Button>
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <Users size={20} />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Collapsible open={expandedSections.events} onOpenChange={() => toggleSection('events')}>
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <CollapsibleTrigger asChild>
            <h3 className="text-lg font-semibold flex items-center cursor-pointer">
              <CalendarRange size={18} className="mr-2 text-argentina-blue" />
              My Events
            </h3>
          </CollapsibleTrigger>
          <Button variant="outline" size="sm">Add Event</Button>
        </div>
        <CollapsibleContent className="animate-accordion-down">
          <TripEventsList events={tripPlan?.events || []} loading={loading} />
        </CollapsibleContent>
      </Collapsible>
      
      <Collapsible open={expandedSections.restaurants} onOpenChange={() => toggleSection('restaurants')}>
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <CollapsibleTrigger asChild>
            <h3 className="text-lg font-semibold flex items-center cursor-pointer">
              <Utensils size={18} className="mr-2 text-argentina-blue" />
              Dining Plans
            </h3>
          </CollapsibleTrigger>
          <Button variant="outline" size="sm">Add Restaurant</Button>
        </div>
        <CollapsibleContent className="animate-accordion-down">
          <TripRestaurantsList restaurants={tripPlan?.restaurants || []} loading={loading} />
        </CollapsibleContent>
      </Collapsible>
      
      <Collapsible open={expandedSections.friends} onOpenChange={() => toggleSection('friends')}>
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <CollapsibleTrigger asChild>
            <h3 className="text-lg font-semibold flex items-center cursor-pointer">
              <Users size={18} className="mr-2 text-argentina-blue" />
              Friends Attending
            </h3>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="animate-accordion-down">
          <TripFriendsList friends={tripPlan?.friends || []} loading={loading} />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default TripSidebar;
