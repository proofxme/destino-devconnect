import React, { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { CalendarRange, Utensils, Users, X } from "lucide-react";
import { getTripPlan, TripPlan } from "@/api/tripApi";
import { useWallet } from "@/context/WalletContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import TripEventsList from "./TripEventsList";
import TripRestaurantsList from "./TripRestaurantsList";
import TripFriendsList from "./TripFriendsList";
import WalletConnect from "./WalletConnect";
import { useToast } from "@/components/ui/use-toast";

interface TripSidebarProps {
  isMobile?: boolean;
}

const TripSidebar: React.FC<TripSidebarProps> = ({ isMobile = false }) => {
  const [open, setOpen] = useState(false);
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const { connected } = useWallet();
  const { toast } = useToast();

  useEffect(() => {
    if (connected && open) {
      fetchTripPlan();
    }
  }, [connected, open]);

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
    <div className="w-full h-screen overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
      <div className="bg-gradient-to-r from-argentina-blue to-devconnect-primary text-white p-4 sticky top-0 z-10">
        <h2 className="text-xl font-bold">My Devconnect Trip</h2>
        {tripPlan && (
          <div className="flex items-center mt-2 text-sm">
            <CalendarRange size={16} className="mr-2" />
            <span>{formatDate(tripPlan.startDate)} - {formatDate(tripPlan.endDate)}</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <DesktopTripContent tripPlan={tripPlan} loading={loading} />
      </div>
    </div>
  );
};

interface TripContentProps {
  tripPlan: TripPlan | null;
  loading: boolean;
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

const DesktopTripContent: React.FC<TripContentProps> = ({ tripPlan, loading }) => {
  return (
    <div className="space-y-6 overflow-auto">
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold flex items-center">
            <CalendarRange size={18} className="mr-2 text-argentina-blue" />
            My Events
          </h3>
          <Button variant="outline" size="sm">Add Event</Button>
        </div>
        <TripEventsList events={tripPlan?.events || []} loading={loading} />
      </section>
      
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold flex items-center">
            <Utensils size={18} className="mr-2 text-argentina-blue" />
            Dining Plans
          </h3>
          <Button variant="outline" size="sm">Add Restaurant</Button>
        </div>
        <TripRestaurantsList restaurants={tripPlan?.restaurants || []} loading={loading} />
      </section>
      
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold flex items-center">
            <Users size={18} className="mr-2 text-argentina-blue" />
            Friends Attending
          </h3>
        </div>
        <TripFriendsList friends={tripPlan?.friends || []} loading={loading} />
      </section>
    </div>
  );
};

export default TripSidebar;
