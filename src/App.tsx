
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import ClientDashboard from "./pages/ClientDashboard";
import NewIntegration from "./pages/NewIntegration";
import EditIntegration from "./pages/EditIntegration";
import AdminDashboard from "./pages/AdminDashboard";
import IntegrationDetails from "./pages/IntegrationDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// GitHub Pages basename configuration
const basename = import.meta.env.MODE === 'production'
  ? '/iis-portal-prototype-12173/'
  : '/';

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/client" element={<ClientDashboard />} />
          <Route path="/client/new-integration" element={<NewIntegration />} />
          <Route path="/client/integrations/:id" element={<IntegrationDetails />} />
          <Route path="/client/integrations/:id/edit" element={<EditIntegration />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
