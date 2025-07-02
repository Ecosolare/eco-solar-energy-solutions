import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { QuantumCard } from "@/components/ui/quantum-card";
import { UKEVChargingMap } from "@/components/features/uk-ev-charging-map";
import { 
  Search, 
  MapPin, 
  Zap, 
  Clock, 
  Star, 
  Navigation,
  Filter,
  BatteryCharging,
  Bolt,
  PoundSterling
} from "lucide-react";

export default function EVCharging() {
  const [searchLocation, setSearchLocation] = useState("");
  const [chargingSpeed, setChargingSpeed] = useState("all");
  const [plugType, setPlugType] = useState("all");
  const [availability, setAvailability] = useState("all");

  return (
    <div className="pt-32 pb-20">
      {/* Hero Section */}
      <section className="mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black mb-6 gradient-text">
              Find EV Charging Stations
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Search <span className="font-bold text-[hsl(var(--cyber-600))]">live charging stations</span> across the UK with real-time data from Open Charge Map, intelligent route planning, and interactive mapping.
            </p>
          </div>

          {/* Search and Filter Interface */}
          <QuantumCard className="p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {/* Location Search */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  <MapPin className="inline h-4 w-4 mr-2" />
                  Location
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Enter postcode or city..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                </div>
              </div>

              {/* Charging Speed Filter */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  <Zap className="inline h-4 w-4 mr-2" />
                  Charging Speed
                </label>
                <Select value={chargingSpeed} onValueChange={setChargingSpeed}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Speeds" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Speeds</SelectItem>
                    <SelectItem value="slow">Slow (3-7 kW)</SelectItem>
                    <SelectItem value="fast">Fast (7-22 kW)</SelectItem>
                    <SelectItem value="rapid">Rapid (22-50 kW)</SelectItem>
                    <SelectItem value="ultra">Ultra Rapid (50+ kW)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Plug Type Filter */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  <BatteryCharging className="inline h-4 w-4 mr-2" />
                  Plug Type
                </label>
                <Select value={plugType} onValueChange={setPlugType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="type2">Type 2</SelectItem>
                    <SelectItem value="ccs">CCS</SelectItem>
                    <SelectItem value="chademo">CHAdeMO</SelectItem>
                    <SelectItem value="tesla">Tesla Supercharger</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Availability Filter */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  <Clock className="inline h-4 w-4 mr-2" />
                  Availability
                </label>
                <Select value={availability} onValueChange={setAvailability}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Stations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Stations</SelectItem>
                    <SelectItem value="available">Available Now</SelectItem>
                    <SelectItem value="24-7">24/7 Access</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Search Button and Quick Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
              <Button size="lg" className="bg-gradient-to-r from-[hsl(var(--cyber-500))] to-blue-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 mb-4 sm:mb-0">
                <Search className="mr-2 h-5 w-5" />
                Search Stations
              </Button>
              
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm" className="rounded-full">
                  <Navigation className="mr-2 h-4 w-4" />
                  Near Me
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  <Bolt className="mr-2 h-4 w-4" />
                  Tesla Only
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  <Zap className="mr-2 h-4 w-4" />
                  Fastest
                </Button>
              </div>
            </div>
          </QuantumCard>
        </div>
      </section>

      {/* UK EV Charging Map */}
      <section className="mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <UKEVChargingMap />
        </div>
      </section>

      {/* Station Network Information */}
      <section className="py-20 bg-slate-100/50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 gradient-text">
              UK's Largest Charging Network
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Access comprehensive coverage across the United Kingdom with real-time availability, competitive pricing, and intelligent route optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Coverage Stats */}
            <QuantumCard className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[hsl(var(--quantum-500))] to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-neural-pulse">
                <MapPin className="text-white text-2xl" size={32} />
              </div>
              <div className="text-4xl font-bold text-[hsl(var(--quantum-500))] mb-2">95%</div>
              <div className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">UK Coverage</div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Comprehensive network spanning England, Scotland, Wales, and Northern Ireland
              </p>
            </QuantumCard>

            <QuantumCard className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[hsl(var(--cyber-500))] to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-neural-pulse">
                <BatteryCharging className="text-white text-2xl" size={32} />
              </div>
              <div className="text-4xl font-bold text-[hsl(var(--cyber-500))] mb-2">40,646</div>
              <div className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Active Chargers</div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                From rapid DC chargers to ultra-fast 350kW stations
              </p>
            </QuantumCard>

            <QuantumCard className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[hsl(var(--neural-500))] to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-neural-pulse">
                <Clock className="text-white text-2xl" size={32} />
              </div>
              <div className="text-4xl font-bold text-[hsl(var(--neural-500))] mb-2">99.2%</div>
              <div className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Uptime</div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Reliable charging when you need it most
              </p>
            </QuantumCard>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <QuantumCard className="p-8">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">
                <Bolt className="inline mr-2 h-6 w-6 text-[hsl(var(--quantum-500))]" />
                Smart Charging Features
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[hsl(var(--quantum-500))] rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold text-slate-800 dark:text-slate-100">Real-Time Availability</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Live status updates from 40,646+ charging points</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[hsl(var(--cyber-500))] rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold text-slate-800 dark:text-slate-100">Intelligent Route Planning</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Optimized charging stops based on your journey</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[hsl(var(--neural-500))] rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold text-slate-800 dark:text-slate-100">Price Comparison</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Find the most cost-effective charging options</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-semibold text-slate-800 dark:text-slate-100">Renewable Energy Priority</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Prioritize charging from clean energy sources</div>
                  </div>
                </div>
              </div>
            </QuantumCard>

            <QuantumCard className="p-8">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">
                <PoundSterling className="inline mr-2 h-6 w-6 text-green-500" />
                Transparent Pricing
              </h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10">
                  <div>
                    <div className="font-semibold text-slate-800 dark:text-slate-100">Slow Charging</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">3-7 kW • AC charging</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-500">£0.18-0.25</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">per kWh</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
                  <div>
                    <div className="font-semibold text-slate-800 dark:text-slate-100">Fast Charging</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">7-22 kW • AC charging</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-500">£0.28-0.35</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">per kWh</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                  <div>
                    <div className="font-semibold text-slate-800 dark:text-slate-100">Rapid Charging</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">22-150 kW • DC charging</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-purple-500">£0.35-0.45</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">per kWh</div>
                  </div>
                </div>
              </div>
            </QuantumCard>
          </div>
        </div>
      </section>
    </div>
  );
}
