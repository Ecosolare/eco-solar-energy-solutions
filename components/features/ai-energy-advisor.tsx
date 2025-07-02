import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Sparkles, TrendingUp, Battery, Sun, Zap, Home, Car } from "lucide-react";

interface EnergyInsight {
  type: "savings" | "efficiency" | "recommendation" | "alert";
  message: string;
  value?: string;
  action?: string;
  icon: any;
}

export function AIEnergyAdvisor() {
  const [insights, setInsights] = useState<EnergyInsight[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    homeSize: 0,
    monthlyBill: 0,
    hasEV: false,
    roofType: "",
    location: ""
  });

  useEffect(() => {
    // Show after 5 minutes of engagement
    const timer = setTimeout(() => {
      // Get user location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          // Simulate getting user's area
          setUserProfile(prev => ({ ...prev, location: "UK" }));
          analyzeEnergyPotential();
        });
      }

      // Analyze based on time of day
      const hour = new Date().getHours();
      if (hour >= 9 && hour <= 17) {
        generateInsight({
          type: "efficiency",
          message: "Peak solar generation hours",
          value: "Now is the optimal time for solar energy production",
          icon: Sun
        });
      }
    }, 300000); // 5 minutes

    return () => clearTimeout(timer);
  }, []);

  const analyzeEnergyPotential = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const newInsights: EnergyInsight[] = [
        {
          type: "savings",
          message: "Potential Annual Savings",
          value: "£1,347",
          action: "Calculate exact savings",
          icon: TrendingUp
        },
        {
          type: "recommendation",
          message: "Recommended System",
          value: "10kW Solar + 13.5kWh Battery",
          action: "View details",
          icon: Battery
        },
        {
          type: "alert",
          message: "Government Grant Available",
          value: "£5,000 ECO4 Scheme",
          action: "Check eligibility",
          icon: Sparkles
        },
        {
          type: "efficiency",
          message: "Your area receives",
          value: "1,493 hours of sunlight/year",
          action: "See solar map",
          icon: Sun
        }
      ];
      
      setInsights(newInsights);
      setIsAnalyzing(false);
    }, 2000);
  };

  const generateInsight = (insight: EnergyInsight) => {
    setInsights(prev => [insight, ...prev].slice(0, 4));
  };

  return (
    <div className="fixed bottom-24 left-6 z-30 max-w-sm">
      <AnimatePresence>
        {insights.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-3"
          >
            {/* AI Badge */}
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
                <Brain className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">AI Energy Advisor</span>
              {isAnalyzing && (
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              )}
            </div>

            {/* Insights */}
            {insights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    insight.type === 'savings' ? 'bg-green-100' :
                    insight.type === 'efficiency' ? 'bg-blue-100' :
                    insight.type === 'recommendation' ? 'bg-purple-100' :
                    'bg-yellow-100'
                  }`}>
                    <insight.icon className={`h-4 w-4 ${
                      insight.type === 'savings' ? 'text-green-600' :
                      insight.type === 'efficiency' ? 'text-blue-600' :
                      insight.type === 'recommendation' ? 'text-purple-600' :
                      'text-yellow-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 mb-1">{insight.message}</p>
                    {insight.value && (
                      <p className="text-sm font-semibold text-gray-900">{insight.value}</p>
                    )}
                    {insight.action && (
                      <button className="text-xs text-blue-600 hover:text-blue-700 mt-1 font-medium">
                        {insight.action} →
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}