import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import PageSwitcher from "@/components/PageSwitcher";
import Index from "./pages/Index.tsx";
import Landing from "./pages/Landing.tsx";
import About from "./pages/About.tsx";
import HowItWorks from "./pages/HowItWorks.tsx";
import GetApp from "./pages/GetApp.tsx";
import DesktopApp from "./pages/DesktopApp.tsx";
import Privacy from "./pages/Privacy.tsx";
import Terms from "./pages/Terms.tsx";
import DataOwnership from "./pages/DataOwnership.tsx";
import Contact from "./pages/Contact.tsx";
import ProviderSignup from "./pages/ProviderSignup.tsx";
import PortalLogin from "./pages/portal/PortalLogin.tsx";
import Portal from "./pages/portal/Portal.tsx";
import DesignSystem from "./pages/DesignSystem.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <PageSwitcher />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/get-app" element={<GetApp />} />
          <Route path="/desktop-app" element={<DesktopApp />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/data-ownership" element={<DataOwnership />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/provider-signup" element={<ProviderSignup />} />
          <Route path="/portal/login" element={<PortalLogin />} />
          <Route path="/portal/*" element={<Portal />} />
          <Route path="/design-system" element={<DesignSystem />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
