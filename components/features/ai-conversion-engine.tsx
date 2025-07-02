import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Target, TrendingUp, Users, Clock, MapPin } from "lucide-react";

interface ConversionTrigger {
  id: string;
  type: "urgency" | "social_proof" | "personalization" | "scarcity" | "value_prop";
  message: string;
  action: string;
  priority: number;
  effectiveness: number;
}

interface UserBehavior {
  pageViews: number;
  timeOnSite: number;
  scrollDepth: number;
  buttonHovers: number;
  calculatorUsed: boolean;
  locationDetected: string;
  deviceType: "mobile" | "desktop";
  timeOfDay: "morning" | "afternoon" | "evening";
  visitNumber: number;
}

export function AIConversionEngine() {
  const [userBehavior, setUserBehavior] = useState<UserBehavior>({
    pageViews: 1,
    timeOnSite: 0,
    scrollDepth: 0,
    buttonHovers: 0,
    calculatorUsed: false,
    locationDetected: "UK",
    deviceType: window.innerWidth < 768 ? "mobile" : "desktop",
    timeOfDay: new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening",
    visitNumber: parseInt(localStorage.getItem("visitNumber") || "1")
  });

  const [activeTriggers, setActiveTriggers] = useState<ConversionTrigger[]>([]);
  const [showMinimalPopup, setShowMinimalPopup] = useState(false);

  // AI-powered trigger generation based on user behavior
  const generateTriggers = (behavior: UserBehavior): ConversionTrigger[] => {
    const triggers: ConversionTrigger[] = [];

    // Only show minimal popups after significant engagement (5+ minutes)
    if (behavior.timeOnSite > 300) {
      if (behavior.scrollDepth > 70 && !behavior.calculatorUsed) {
        triggers.push({
          id: "calculator-prompt",
          type: "value_prop",
          message: "See your potential savings in 30 seconds",
          action: "Try Solar Calculator",
          priority: 8,
          effectiveness: 85
        });
      }

      if (behavior.buttonHovers > 3 && behavior.timeOfDay === "evening") {
        triggers.push({
          id: "evening-urgency",
          type: "urgency",
          message: "Limited evening consultation slots available",
          action: "Book Tonight",
          priority: 9,
          effectiveness: 92
        });
      }
    }

    // High-engagement triggers only
    if (behavior.pageViews > 3) {
      triggers.push({
        id: "multi-page-interest",
        type: "personalization",
        message: `Perfect solar solutions for ${behavior.locationDetected} homes`,
        action: "Get Custom Quote",
        priority: 7,
        effectiveness: 88
      });
    }

    return triggers.sort((a, b) => b.effectiveness - a.effectiveness).slice(0, 1); // Only show the most effective trigger
  };

  // Track user behavior
  useEffect(() => {
    const trackBehavior = () => {
      const startTime = Date.now();
      let scrollDepth = 0;
      let buttonHovers = 0;

      // Time tracking
      const timeTracker = setInterval(() => {
        setUserBehavior(prev => ({ ...prev, timeOnSite: prev.timeOnSite + 1 }));
      }, 1000);

      // Scroll depth tracking
      const scrollTracker = () => {
        const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        scrollDepth = Math.max(scrollDepth, scrolled);
        setUserBehavior(prev => ({ ...prev, scrollDepth }));
      };

      // Button hover tracking
      const hoverTracker = (e: Event) => {
        const target = e.target as HTMLElement;
        if (target && (target.tagName === 'BUTTON' || (target.className && typeof target.className === 'string' && target.className.includes('btn-apple')))) {
          buttonHovers++;
          setUserBehavior(prev => ({ ...prev, buttonHovers }));
        }
      };

      window.addEventListener('scroll', scrollTracker);
      document.addEventListener('mouseover', hoverTracker);

      return () => {
        clearInterval(timeTracker);
        window.removeEventListener('scroll', scrollTracker);
        document.removeEventListener('mouseover', hoverTracker);
      };
    };

    const cleanup = trackBehavior();
    return cleanup;
  }, []);

  // Generate triggers based on behavior
  useEffect(() => {
    const triggers = generateTriggers(userBehavior);
    setActiveTriggers(triggers);
    
    // Only show popup after 5+ minutes of engagement and high scroll depth
    if (userBehavior.timeOnSite > 300 && userBehavior.scrollDepth > 80 && triggers.length > 0) {
      setShowMinimalPopup(true);
    }
  }, [userBehavior]);

  // Minimal Apple-style popup (only for highly engaged users)
  const MinimalEngagementPopup = () => {
    if (!showMinimalPopup || activeTriggers.length === 0) return null;

    const trigger = activeTriggers[0];

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm"
        >
          <div className="bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-50 rounded-xl">
                <Zap className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 mb-2">
                  {trigger.message}
                </p>
                <div className="flex gap-2">
                  <button 
                    className="btn-apple-blue text-xs px-3 py-1.5"
                    onClick={() => setShowMinimalPopup(false)}
                  >
                    {trigger.action}
                  </button>
                  <button 
                    className="text-xs text-gray-500 px-3 py-1.5"
                    onClick={() => setShowMinimalPopup(false)}
                  >
                    Later
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  };

  // Real-time analytics dashboard (minimal)
  const AnalyticsDashboard = () => (
    <div className="fixed top-4 right-4 z-40 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl p-3 text-xs text-gray-600 max-w-xs">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>{Math.floor(userBehavior.timeOnSite / 60)}m {userBehavior.timeOnSite % 60}s</span>
        </div>
        <div className="flex items-center gap-1">
          <TrendingUp className="h-3 w-3" />
          <span>{userBehavior.scrollDepth.toFixed(0)}%</span>
        </div>
        <div className="flex items-center gap-1">
          <Target className="h-3 w-3" />
          <span>{userBehavior.pageViews} pages</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          <span>{userBehavior.locationDetected}</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Minimal popup for highly engaged users only */}
      <MinimalEngagementPopup />
      
      {/* Analytics dashboard (development mode) */}
      {process.env.NODE_ENV === 'development' && <AnalyticsDashboard />}
    </>
  );
}