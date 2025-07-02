import { useQuery } from "@tanstack/react-query";

interface EnergyData {
  gridPower: number;
  renewable: number;
  evChargers: string;
  co2Intensity: number;
  lastUpdated: string;
}

// Mock function to simulate real energy API
async function fetchEnergyData(): Promise<EnergyData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, this would fetch from National Grid ESO API or similar
  // For now, we'll return mock data with some variation
  const baseRenewable = 41.7;
  const variation = (Math.random() - 0.5) * 10; // ±5% variation
  
  return {
    gridPower: Math.round(40955 + (Math.random() - 0.5) * 5000),
    renewable: Math.round((baseRenewable + variation) * 10) / 10,
    evChargers: "40,646",
    co2Intensity: Math.round(156 + (Math.random() - 0.5) * 50),
    lastUpdated: new Date().toISOString()
  };
}

export function useEnergyData() {
  return useQuery({
    queryKey: ["/api/energy-data"],
    queryFn: fetchEnergyData,
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 25000, // Consider data stale after 25 seconds
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
