import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, DollarSign, Zap } from "lucide-react";

interface PricingData {
  solarPrice: number;
  gridPrice: number;
  savings: number;
  trend: "up" | "down";
}

export function LivePricing() {
  const [pricing, setPricing] = useState<PricingData>({
    solarPrice: 0.12,
    gridPrice: 0.28,
    savings: 57,
    trend: "up"
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPricing(prev => ({
        solarPrice: +(prev.solarPrice + (Math.random() - 0.5) * 0.002).toFixed(3),
        gridPrice: +(prev.gridPrice + (Math.random() - 0.5) * 0.01).toFixed(3),
        savings: Math.max(45, Math.min(65, prev.savings + (Math.random() - 0.5) * 2)),
        trend: Math.random() > 0.5 ? "up" : "down"
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tesla-glass rounded-xl p-6 max-w-md">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        <h3 className="font-semibold text-sm">Live UK Energy Prices</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span className="text-sm text-muted-foreground">Grid Price</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-mono font-bold">£{pricing.gridPrice}</span>
            <span className="text-xs text-muted-foreground">/kWh</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-500" />
            <span className="text-sm text-muted-foreground">Solar Cost</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-mono font-bold text-green-600">£{pricing.solarPrice}</span>
            <span className="text-xs text-muted-foreground">/kWh</span>
          </div>
        </div>
        
        <div className="border-t pt-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Your Savings</span>
            <div className="flex items-center gap-1">
              {pricing.trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span className={cn(
                "font-bold text-lg",
                pricing.trend === "up" ? "text-green-600" : "text-orange-600"
              )}>
                {pricing.savings.toFixed(0)}%
              </span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Updated every 30 seconds
          </p>
        </div>
      </div>
    </div>
  );
}