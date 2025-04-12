
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Building, MapPin, Calendar, Bed, Utensils, Activity } from "lucide-react";
import Navbar from "@/components/Navbar";
import VenueProposalForm from "@/components/admin/VenueProposalForm";
import { toast } from "sonner";

const AdminDashboard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formType, setFormType] = useState<string>("");
  const navigate = useNavigate();

  // Check if wallet is connected
  const checkWalletConnection = () => {
    const isConnected = localStorage.getItem("wallet-connected") === "true";
    if (!isConnected) {
      toast.error("Please connect your wallet to access the admin dashboard");
      navigate("/");
      return false;
    }
    return true;
  };

  // Ensure wallet connection on component mount
  useState(() => {
    checkWalletConnection();
  });

  const handleOpenForm = (type: string) => {
    if (checkWalletConnection()) {
      setFormType(type);
      setIsFormOpen(true);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "venue": return <Building className="h-6 w-6" />;
      case "event": return <Calendar className="h-6 w-6" />;
      case "accommodation": return <Bed className="h-6 w-6" />;
      case "restaurant": return <Utensils className="h-6 w-6" />;
      case "activity": return <Activity className="h-6 w-6" />;
      default: return <MapPin className="h-6 w-6" />;
    }
  };

  const categories = [
    { id: "venue", name: "Venue", description: "Propose a new general venue or place" },
    { id: "event", name: "Event", description: "Submit a new event for Devconnect" },
    { id: "accommodation", name: "Accommodation", description: "Suggest new accommodation options" },
    { id: "restaurant", name: "Restaurant", description: "Recommend restaurants for visitors" },
    { id: "activity", name: "Activity", description: "Add fun activities around the city" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto pt-24 px-4 flex-grow">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600">Propose new venues and manage content</p>
        </div>

        {isFormOpen ? (
          <VenueProposalForm type={formType} onClose={handleCloseForm} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Card key={category.id} className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-bold">{category.name}</CardTitle>
                  {getTypeIcon(category.id)}
                </CardHeader>
                <CardContent>
                  <CardDescription className="mt-2">{category.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleOpenForm(category.id)} 
                    className="w-full"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Propose New {category.name}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
