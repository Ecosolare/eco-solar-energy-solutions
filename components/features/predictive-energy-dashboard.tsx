import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, TrendingUp, Sun, Battery, Zap, Home } from "lucide-react";

interface EnergyData {
  time: string;
  generation: number;
  consumption: number;
  savings: number;
}

export function PredictiveEnergyDashboard() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [currentEnergy, setCurrentEnergy] = useState({
    solarGeneration: 4.2,
    homeConsumption: 2.8,
    gridExport: 1.4,
    batterySaved: 0,
    dailySavings: 12.47
  });
  
  const [prediction, setPrediction] = useState({
    nextHour: 5.1,
    todayTotal: 28.4,
    tomorrowExpected: 31.2
  });

  useEffect(() => {
    // Show after 5 minutes
    const timer = setTimeout(() => {
      setShowDashboard(true);
    }, 300000); // 5 minutes

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showDashboard) return;
    
    // Simulate real-time energy updates
    const interval = setInterval(() => {
      setCurrentEnergy(prev => ({
        solarGeneration: Math.max(0, prev.solarGeneration + (Math.random() - 0.5) * 0.5),
        homeConsumption: Math.max(0.5, prev.homeConsumption + (Math.random() - 0.5) * 0.3),
        gridExport: Math.max(0, prev.solarGeneration - prev.homeConsumption),
        batterySaved: Math.random() * 2,
        dailySavings: prev.dailySavings + Math.random() * 0.1
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [showDashboard]);

  if (!showDashboard) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-20 right-6 z-30 w-80 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-100 p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full">
            <Activity className="h-4 w-4 text-white" />
          </div>
          <h3 className="font-semibold text-gray-900">Live Energy Flow</h3>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-gray-500">Real-time</span>
        </div>
      </div>

      {/* Current Generation */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sun className="h-5 w-5 text-orange-600" />
            <span className="text-sm font-medium text-gray-700">Solar Generation</span>
          </div>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </div>
        <div className="text-2xl font-bold text-gray-900">
          {currentEnergy.solarGeneration.toFixed(1)} kW
        </div>
        <div className="mt-2 h-1 bg-orange-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
            animate={{ width: `${(currentEnergy.solarGeneration / 10) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Energy Flow Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-blue-50 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <Home className="h-4 w-4 text-blue-600" />
            <span className="text-xs text-gray-600">Home Using</span>
          </div>
          <p className="text-lg font-bold text-gray-900">{currentEnergy.homeConsumption.toFixed(1)} kW</p>
        </div>
        
        <div className="bg-green-50 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="h-4 w-4 text-green-600" />
            <span className="text-xs text-gray-600">Grid Export</span>
          </div>
          <p className="text-lg font-bold text-gray-900">{currentEnergy.gridExport.toFixed(1)} kW</p>
        </div>
      </div>

      {/* AI Predictions */}
      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">AI Predictions</h4>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Next Hour</span>
            <span className="text-sm font-semibold text-gray-900">{prediction.nextHour} kW</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Today Total</span>
            <span className="text-sm font-semibold text-gray-900">{prediction.todayTotal} kWh</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Tomorrow</span>
            <span className="text-sm font-semibold text-green-600">+{((prediction.tomorrowExpected - prediction.todayTotal) / prediction.todayTotal * 100).toFixed(0)}%</span>
          </div>
        </div>
      </div>

      {/* Daily Savings */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm">Today's Savings</p>
            <p className="text-2xl font-bold">£{currentEnergy.dailySavings.toFixed(2)}</p>
          </div>
          <Battery className="h-8 w-8 text-green-200" />
        </div>
        <p className="text-xs text-green-200 mt-2">
          Equivalent to {(currentEnergy.dailySavings * 30 / 100).toFixed(0)} trees planted
        </p>
      </div>
    </motion.div>
  );
}