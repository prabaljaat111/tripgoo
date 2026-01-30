import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import BottomNav from "@/components/layout/BottomNav";
import TopBar from "@/components/layout/TopBar";
import FloatingAIButton from "@/components/layout/FloatingAIButton";
import Index from "./pages/Index";
import CopilotPage from "./pages/CopilotPage";
import FlightsPage from "./pages/FlightsPage";
import HotelsPage from "./pages/HotelsPage";
import VillasPage from "./pages/VillasPage";
import PackagesPage from "./pages/PackagesPage";
import TrainsPage from "./pages/TrainsPage";
import BusesPage from "./pages/BusesPage";
import CabsPage from "./pages/CabsPage";
import ToursPage from "./pages/ToursPage";
import VisaPage from "./pages/VisaPage";
import CruisePage from "./pages/CruisePage";
import ForexPage from "./pages/ForexPage";
import InsurancePage from "./pages/InsurancePage";
import DashboardPage from "./pages/DashboardPage";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import RefundPolicyPage from "./pages/RefundPolicyPage";
import TermsPage from "./pages/TermsPage";
import RidesPage from "./pages/RidesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/copilot" element={<CopilotPage />} />
            <Route path="/flights" element={<FlightsPage />} />
            <Route path="/hotels" element={<HotelsPage />} />
            <Route path="/villas" element={<VillasPage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/trains" element={<TrainsPage />} />
            <Route path="/buses" element={<BusesPage />} />
            <Route path="/cabs" element={<CabsPage />} />
            <Route path="/rides" element={<RidesPage />} />
            <Route path="/tours" element={<ToursPage />} />
            <Route path="/visa" element={<VisaPage />} />
            <Route path="/cruise" element={<CruisePage />} />
            <Route path="/forex" element={<ForexPage />} />
            <Route path="/insurance" element={<InsurancePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/refund-policy" element={<RefundPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <TopBar />
          <FloatingAIButton />
          <BottomNav />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
