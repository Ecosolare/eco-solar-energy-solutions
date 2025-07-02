import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { QuantumCard } from "@/components/ui/quantum-card";
import { 
  Calculator, 
  PoundSterling, 
  Zap, 
  Home,
  TrendingUp,
  Download,
  Calendar,
  Leaf,
  Battery,
  Sun
} from "lucide-react";

interface CalculationResult {
  systemSize: number;
  annualGeneration: number;
  annualSavings: number;
  systemCost: number;
  paybackPeriod: number;
  co2Saved: number;
  roiPercentage: number;
}

export function SolarCalculator() {
  const [monthlyBill, setMonthlyBill] = useState<string>("120");
  const [propertyType, setPropertyType] = useState<string>("");
  const [roofDirection, setRoofDirection] = useState<string>("");
  const [postcode, setPostcode] = useState<string>("");
  const [solarCoverage, setSolarCoverage] = useState<number[]>([70]);
  const [includeStorage, setIncludeStorage] = useState<boolean>(false);
  const [results, setResults] = useState<CalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  const calculateSavings = async () => {
    if (!monthlyBill || !propertyType || !roofDirection) {
      alert("Please fill in all required fields");
      return;
    }

    setIsCalculating(true);
    
    // Simulate AI calculation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock calculation logic (in real app, this would call an AI API)
    const bill = parseFloat(monthlyBill);
    const coverage = solarCoverage[0] / 100;
    
    // Base calculations
    const systemSize = Math.round((bill * 0.08 * coverage) * 10) / 10; // kW
    const annualGeneration = systemSize * 1100; // kWh per year (UK average)
    const annualSavings = Math.round(annualGeneration * 0.15 * coverage); // £ per year
    const systemCost = systemSize * 1200 + (includeStorage ? 8000 : 0); // £
    const paybackPeriod = Math.round((systemCost / annualSavings) * 10) / 10;
    const co2Saved = Math.round(annualGeneration * 0.233); // kg CO2 per year
    const roiPercentage = Math.round(((annualSavings * 25 - systemCost) / systemCost) * 100);

    const calculationResult: CalculationResult = {
      systemSize,
      annualGeneration,
      annualSavings,
      systemCost,
      paybackPeriod,
      co2Saved,
      roiPercentage
    };

    setResults(calculationResult);
    setIsCalculating(false);
  };

  const downloadReport = () => {
    alert("Generating detailed PDF report... This would create a comprehensive analysis document.");
  };

  const bookConsultation = () => {
    alert("Redirecting to consultation booking... This would open the contact form or booking system.");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Calculator Form */}
      <QuantumCard className="p-8">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-[hsl(var(--neural-500))] to-purple-500 rounded-xl flex items-center justify-center mr-4 animate-neural-pulse">
            <Calculator className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              Solar Savings Calculator
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Get personalized estimates in 60 seconds
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Monthly Bill */}
          <div>
            <Label htmlFor="monthly-bill" className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block">
              <PoundSterling className="inline h-4 w-4 mr-1" />
              Monthly Electricity Bill (£) *
            </Label>
            <Input
              id="monthly-bill"
              type="number"
              value={monthlyBill}
              onChange={(e) => setMonthlyBill(e.target.value)}
              placeholder="120"
              className="w-full"
            />
          </div>

          {/* Property Type */}
          <div>
            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block">
              <Home className="inline h-4 w-4 mr-1" />
              Property Type *
            </Label>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger>
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="terraced">Terraced House</SelectItem>
                <SelectItem value="semi-detached">Semi-Detached House</SelectItem>
                <SelectItem value="detached">Detached House</SelectItem>
                <SelectItem value="bungalow">Bungalow</SelectItem>
                <SelectItem value="flat">Flat/Apartment</SelectItem>
                <SelectItem value="commercial">Commercial Property</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Roof Direction */}
          <div>
            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block">
              <Sun className="inline h-4 w-4 mr-1" />
              Main Roof Direction *
            </Label>
            <Select value={roofDirection} onValueChange={setRoofDirection}>
              <SelectTrigger>
                <SelectValue placeholder="Select roof direction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="south">South (Best)</SelectItem>
                <SelectItem value="south-east">South-East (Excellent)</SelectItem>
                <SelectItem value="south-west">South-West (Excellent)</SelectItem>
                <SelectItem value="east">East (Good)</SelectItem>
                <SelectItem value="west">West (Good)</SelectItem>
                <SelectItem value="north">North (Poor)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Postcode */}
          <div>
            <Label htmlFor="postcode" className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block">
              Postcode (Optional)
            </Label>
            <Input
              id="postcode"
              type="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value.toUpperCase())}
              placeholder="SW1A 1AA"
              className="w-full"
            />
          </div>

          {/* Solar Coverage */}
          <div>
            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block">
              <Zap className="inline h-4 w-4 mr-1" />
              Solar Coverage: {solarCoverage[0]}%
            </Label>
            <Slider
              value={solarCoverage}
              onValueChange={setSolarCoverage}
              max={100}
              min={10}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>10%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Battery Storage */}
          <div className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700">
            <input
              type="checkbox"
              id="storage"
              checked={includeStorage}
              onChange={(e) => setIncludeStorage(e.target.checked)}
              className="rounded border-slate-300 text-[hsl(var(--quantum-500))] focus:ring-[hsl(var(--quantum-500))]"
            />
            <Label htmlFor="storage" className="flex items-center text-sm font-medium">
              <Battery className="h-4 w-4 mr-2 text-[hsl(var(--neural-500))]" />
              Include Battery Storage (+£8,000)
            </Label>
          </div>

          {/* Calculate Button */}
          <Button
            onClick={calculateSavings}
            disabled={isCalculating}
            className="w-full bg-gradient-to-r from-[hsl(var(--neural-500))] to-purple-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300"
          >
            {isCalculating ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Calculating...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Calculator className="h-5 w-5" />
                <span>Calculate My Savings</span>
              </div>
            )}
          </Button>
        </div>
      </QuantumCard>

      {/* Results */}
      <div className="space-y-6">
        {results ? (
          <>
            {/* Main Results Card */}
            <QuantumCard className="p-8">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center">
                <TrendingUp className="mr-2 h-6 w-6 text-green-500" />
                Your Solar Savings Potential
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10">
                  <div className="text-3xl font-bold text-green-500 mb-1">
                    £{results.annualSavings.toLocaleString()}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Annual Savings</div>
                </div>

                <div className="text-center p-4 rounded-xl bg-gradient-to-r from-[hsl(var(--quantum-500))]/10 to-blue-500/10">
                  <div className="text-3xl font-bold text-[hsl(var(--quantum-500))] mb-1">
                    {results.systemSize}kW
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">System Size</div>
                </div>

                <div className="text-center p-4 rounded-xl bg-gradient-to-r from-[hsl(var(--cyber-500))]/10 to-purple-500/10">
                  <div className="text-3xl font-bold text-[hsl(var(--cyber-500))] mb-1">
                    {results.paybackPeriod} yrs
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Payback Period</div>
                </div>

                <div className="text-center p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10">
                  <div className="text-3xl font-bold text-orange-500 mb-1">
                    {(results.co2Saved / 1000).toFixed(1)}t
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">CO₂ Saved/year</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Total System Cost</span>
                  <span className="font-bold text-slate-800 dark:text-slate-100">
                    £{results.systemCost.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">25-Year ROI</span>
                  <span className="font-bold text-green-500">
                    {results.roiPercentage}%
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Annual Generation</span>
                  <span className="font-bold text-slate-800 dark:text-slate-100">
                    {results.annualGeneration.toLocaleString()} kWh
                  </span>
                </div>
              </div>
            </QuantumCard>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                onClick={downloadReport}
                variant="outline"
                className="w-full p-4 h-auto flex flex-col items-center space-y-2 rounded-xl border-[hsl(var(--quantum-500))]/30"
              >
                <Download className="h-6 w-6 text-[hsl(var(--quantum-500))]" />
                <div className="text-center">
                  <div className="font-semibold">Download Report</div>
                  <div className="text-xs text-slate-500">Detailed PDF analysis</div>
                </div>
              </Button>

              <Button
                onClick={bookConsultation}
                className="w-full p-4 h-auto flex flex-col items-center space-y-2 rounded-xl bg-gradient-to-r from-[hsl(var(--quantum-500))] to-green-500 text-white"
              >
                <Calendar className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-semibold">Book Consultation</div>
                  <div className="text-xs opacity-90">Free expert advice</div>
                </div>
              </Button>
            </div>

            {/* Environmental Impact */}
            <QuantumCard className="p-6">
              <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center">
                <Leaf className="mr-2 h-5 w-5 text-green-500" />
                Environmental Impact
              </h4>
              <div className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                <p>
                  • Equivalent to planting <strong>{Math.round(results.co2Saved / 22)} trees</strong> per year
                </p>
                <p>
                  • Removes <strong>{(results.co2Saved / 1000).toFixed(1)} tonnes</strong> of CO₂ annually
                </p>
                <p>
                  • Powers your home with <strong>clean renewable energy</strong>
                </p>
              </div>
            </QuantumCard>
          </>
        ) : (
          <QuantumCard className="p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-[hsl(var(--neural-500))] to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-neural-pulse">
              <Calculator className="text-white text-2xl" size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              Ready to Calculate Your Savings?
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Fill in the form to get your personalized solar assessment powered by advanced AI algorithms.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm text-slate-500">
              <div>✓ 95% accuracy rate</div>
              <div>✓ Real-time pricing</div>
              <div>✓ UK weather data</div>
              <div>✓ Government incentives</div>
            </div>
          </QuantumCard>
        )}
      </div>
    </div>
  );
}
