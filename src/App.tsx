
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Pages
import Home from "./pages/Home";
import Index from "./pages/Index";
import CookedItems from "./pages/CookedItems";
import DietaryPreferences from "./pages/DietaryPreferences";
import RecipeChat from "./pages/RecipeChat";
import PlanMeals from "./pages/PlanMeals";
import FutureInventory from "./pages/FutureInventory";
import NotFound from "./pages/NotFound";

// Layout
import Header from "./components/layout/Header";
import AnimatedLayout from "./components/layout/AnimatedLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Header />
        <AnimatePresence mode="wait">
          <AnimatedLayout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/home" element={<Home />} />
              <Route path="/cooked-items" element={<CookedItems />} />
              <Route path="/preferences" element={<DietaryPreferences />} />
              <Route path="/recipe-chat" element={<RecipeChat />} />
              <Route path="/plan-meals" element={<PlanMeals />} />
              <Route path="/future-inventory" element={<FutureInventory />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatedLayout>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
