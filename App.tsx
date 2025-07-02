import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AIConversionEngine } from "@/components/features/ai-conversion-engine";
import { ConversionHelper } from "@/components/features/conversion-helper";
import { AIEnergyAdvisor } from "@/components/features/ai-energy-advisor";
import { InstantQuoteGenerator } from "@/components/features/instant-quote-generator";
import { PredictiveEnergyDashboard } from "@/components/features/predictive-energy-dashboard";
import { QuantumEnergyVisualizer } from "@/components/features/quantum-energy-visualizer";
import { BlockchainEnergyTracker } from "@/components/features/blockchain-energy-tracker";
import { PerformanceMonitor } from "@/components/features/performance-monitor";

// Lazy load all pages for better performance
const Home = lazy(() => import("@/pages/home"));
const EVCharging = lazy(() => import("@/pages/ev-charging"));
const SolarSolutions = lazy(() => import("@/pages/solar-solutions"));
const Services = lazy(() => import("@/pages/services"));
const Projects = lazy(() => import("@/pages/projects"));
const Contact = lazy(() => import("@/pages/contact"));
const Learn = lazy(() => import("@/pages/learn"));
const Blog = lazy(() => import("@/pages/blog"));
const ARVRExperience = lazy(() => import("@/pages/ar-vr-experience"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Loading component
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/ev-charging" component={EVCharging} />
        <Route path="/solar-solutions" component={SolarSolutions} />
        <Route path="/services" component={Services} />
        <Route path="/projects" component={Projects} />
        <Route path="/contact" component={Contact} />
        <Route path="/learn" component={Learn} />
        <Route path="/blog" component={Blog} />
        <Route path="/ar-vr-experience" component={ARVRExperience} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-white text-gray-900">
          <Navbar />
          <main className="relative z-10">
            <Router />
          </main>
          <Footer />
          
          {/* AI Conversion Engine - Minimal, only for highly engaged users */}
          <AIConversionEngine />
          
          {/* Conversion Helper - Minimalist floating widget */}
          <ConversionHelper />
          
          {/* AI Energy Advisor - Intelligent insights */}
          <AIEnergyAdvisor />
          
          {/* Instant Quote Generator - Conversion focused */}
          <InstantQuoteGenerator />
          
          {/* Predictive Energy Dashboard - Show on desktop only */}
          {window.innerWidth > 1024 && <PredictiveEnergyDashboard />}
          
          {/* Quantum Energy Visualizer - Cutting edge visualization */}
          <QuantumEnergyVisualizer />
          
          {/* Blockchain Energy Tracker - Web3 integration */}
          <BlockchainEnergyTracker />
          
          {/* Performance Monitor - Show site speed */}
          <PerformanceMonitor />
          
          {/* Mobile Floating CTA - Apple style */}
          <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
            <div className="flex gap-2">
              <a 
                href="/contact" 
                className="btn-apple-blue flex-1 py-3 px-4 text-center font-medium text-sm"
              >
                📅 Free Consultation
              </a>
              <a 
                href="tel:+447425705531" 
                className="btn-apple flex items-center justify-center min-w-[60px]"
              >
                📞
              </a>
            </div>
          </div>
          
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
