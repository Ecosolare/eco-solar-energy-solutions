import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, TrendingDown, Users, MapPin, Zap, CheckCircle, AlertCircle } from "lucide-react";

interface PricingTier {
  id: string;
  title: string;
  originalPrice: number;
  currentPrice: number;
  savings: number;
  urgencyLevel: "high" | "medium" | "low";
  timeLeft: number;
  conversionsToday: number;
  isPopular: boolean;
  features: string[];
}

export function DynamicPricing() {
  const [userLocation, setUserLocation] = useState("UK");
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [timeOnSite, setTimeOnSite] = useState(0);
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([
    {
      id: "solar-basic",
      title: "Solar Starter System",
      originalPrice: 4500,
      currentPrice: 3600,
      savings: 900,
      urgencyLevel: "medium",
      timeLeft: 7200, // 2 hours
      conversionsToday: 12,
      isPopular: false,
      features: ["5kW System", "10 Year Warranty", "Free Installation", "Basic Monitoring"]
    },
    {
      id: "solar-premium",
      title: "Solar Plus Storage",
      originalPrice: 8500,
      currentPrice: 6800,
      savings: 1700,
      urgencyLevel: "high",
      timeLeft: 3600, // 1 hour
      conversionsToday: 8,
      isPopular: true,
      features: ["10kW System", "Battery Storage", "15 Year Warranty", "Smart Monitoring", "EV Ready"]
    },
    {
      id: "ev-charger",
      title: "EV Home Charger",
      originalPrice: 899,
      currentPrice: 699,
      savings: 200,
      urgencyLevel: "low",
      timeLeft: 14400, // 4 hours
      conversionsToday: 15,
      isPopular: false,
      features: ["7kW Fast Charging", "Smart Controls", "Weather Protection", "Installation Included"]
    }
  ]);

  // Dynamic pricing logic based on user behavior
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeOnSite(prev => prev + 1);
      
      // Update pricing based on user engagement
      setPricingTiers(prevTiers => 
        prevTiers.map(tier => {
          let newPrice = tier.currentPrice;
          let newUrgency = tier.urgencyLevel;
          let newTimeLeft = tier.timeLeft - 60;

          // Price decreases with engagement time (up to 10% additional discount)
          if (timeOnSite > 120) { // After 2 minutes
            const engagementDiscount = Math.min(timeOnSite / 600, 0.1); // Max 10% discount
            newPrice = Math.round(tier.originalPrice * (1 - (tier.savings / tier.originalPrice) - engagementDiscount));
          }

          // Increase urgency as time runs out
          if (newTimeLeft < 1800) { // Less than 30 minutes
            newUrgency = "high";
          } else if (newTimeLeft < 3600) { // Less than 1 hour
            newUrgency = "medium";
          }

          // Reset timer if it reaches zero
          if (newTimeLeft <= 0) {
            newTimeLeft = 7200; // Reset to 2 hours
            newUrgency = "low";
          }

          return {
            ...tier,
            currentPrice: newPrice,
            urgencyLevel: newUrgency,
            timeLeft: newTimeLeft,
            savings: tier.originalPrice - newPrice
          };
        })
      );
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [timeOnSite]);

  // Get user location for region-specific pricing
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Simulate region detection - in real app, use reverse geocoding
          setUserLocation("UK - Your Area");
        },
        () => {
          setUserLocation("UK");
        }
      );
    }
  }, []);

  const formatTimeLeft = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const PricingCard = ({ tier }: { tier: PricingTier }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative bg-white border-2 rounded-2xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl ${
        tier.isPopular ? "border-blue-500 ring-2 ring-blue-100" : "border-gray-200"
      }`}
    >
      {tier.isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}

      {/* Urgency indicator */}
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-medium border mb-4 ${getUrgencyColor(tier.urgencyLevel)}`}>
        <Clock className="h-3 w-3" />
        <span>Ends in {formatTimeLeft(tier.timeLeft)}</span>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.title}</h3>
        
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-3xl font-bold text-gray-900">£{tier.currentPrice.toLocaleString()}</span>
          <span className="text-lg text-gray-500 line-through">£{tier.originalPrice.toLocaleString()}</span>
          <span className="text-lg font-semibold text-green-600">-£{tier.savings}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <TrendingDown className="h-4 w-4 text-green-600" />
            <span>{Math.round((tier.savings / tier.originalPrice) * 100)}% off</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-blue-600" />
            <span>{tier.conversionsToday} booked today</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {tier.features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3">
            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
            <span className="text-sm text-gray-700">{feature}</span>
          </div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
          tier.isPopular
            ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
            : "bg-gray-900 text-white hover:bg-gray-800"
        }`}
      >
        Book Free Consultation
      </motion.button>

      {/* Live activity indicator */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span>Live pricing for {userLocation}</span>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-4"
        >
          <Zap className="h-4 w-4" />
          <span>Limited Time Pricing</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
        >
          Renewable Energy Solutions
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Smart pricing that adapts to your needs. Limited-time offers based on current demand and your location.
        </motion.p>
      </div>

      {/* Real-time pricing alert */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-4 mb-8 max-w-2xl mx-auto"
      >
        <div className="flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-orange-600" />
          <div className="flex-1">
            <p className="text-sm font-medium text-orange-900">
              Prices adjust every hour based on demand and your engagement
            </p>
            <p className="text-xs text-orange-700 mt-1">
              Current session time: {Math.floor(timeOnSite / 60)}m {timeOnSite % 60}s
            </p>
          </div>
        </div>
      </motion.div>

      {/* Pricing grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {pricingTiers.map((tier) => (
            <PricingCard key={tier.id} tier={tier} />
          ))}
        </AnimatePresence>
      </div>

      {/* Location and timing note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center"
      >
        <div className="inline-flex items-center gap-2 text-sm text-gray-500">
          <MapPin className="h-4 w-4" />
          <span>Pricing optimized for {userLocation} • Updates based on real-time demand</span>
        </div>
      </motion.div>
    </div>
  );
}