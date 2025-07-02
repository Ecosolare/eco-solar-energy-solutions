import { useEnergyData } from "@/hooks/use-energy-data";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Zap, 
  Leaf, 
  BatteryCharging, 
  TrendingUp,
  Activity
} from "lucide-react";

export function EnergyStats() {
  const { data: energyData, isLoading, error } = useEnergyData();

  if (isLoading) {
    return (
      <div className="flex items-center space-x-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="text-center">
            <Skeleton className="h-6 w-16 mb-1" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center space-x-4 text-red-500">
        <Activity className="h-4 w-4" />
        <span className="text-sm">Unable to load live energy data</span>
      </div>
    );
  }

  const stats = [
    {
      value: energyData?.gridPower ? `${energyData.gridPower}MW` : "40,955MW",
      label: "UK Grid Power",
      icon: Zap,
      color: "text-[hsl(var(--cyber-500))]"
    },
    {
      value: energyData?.renewable ? `${energyData.renewable}%` : "41.7%",
      label: "Renewable",
      icon: Leaf,
      color: "text-green-500"
    },
    {
      value: energyData?.evChargers || "40,646",
      label: "EV Chargers",
      icon: BatteryCharging,
      color: "text-[hsl(var(--quantum-500))]"
    },
    {
      value: energyData?.co2Intensity ? `${energyData.co2Intensity}g/kWh` : "156g/kWh",
      label: "CO₂ Intensity",
      icon: TrendingUp,
      color: "text-orange-500"
    }
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
            <div className={`text-lg sm:text-2xl font-mono font-bold ${stat.color}`}>
              {stat.value}
            </div>
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
