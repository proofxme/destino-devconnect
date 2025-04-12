
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "./context/WalletContext";
import { SidebarProvider } from "./components/ui/sidebar";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Events from "./pages/Events";
import Accommodations from "./pages/Accommodations";
import Restaurants from "./pages/Restaurants";
import Activities from "./pages/Activities";
import Attendants from "./pages/Attendants";
import Sponsors from "./pages/Sponsors";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WalletProvider>
          <SidebarProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Layout>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/accommodations" element={<Accommodations />} />
                  <Route path="/restaurants" element={<Restaurants />} />
                  <Route path="/activities" element={<Activities />} />
                  <Route path="/attendants" element={<Attendants />} />
                  <Route path="/sponsors" element={<Sponsors />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            </BrowserRouter>
          </SidebarProvider>
        </WalletProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
