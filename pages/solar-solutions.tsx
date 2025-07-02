import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuantumCard } from "@/components/ui/quantum-card";
import { SolarCalculator } from "@/components/features/solar-calculator";
import { 
  CloudSun, 
  Home, 
  Building, 
  Battery, 
  Zap, 
  PoundSterling, 
  Shield, 
  Leaf,
  Calculator,
  Calendar,
  TrendingUp,
  Award,
  Clock,
  MapPin
} from "lucide-react";

const solarServices = [
  {
    title: "Residential Solar",
    description: "Complete home solar solutions with battery storage options",
    icon: Home,
    features: ["Free design consultation", "MCS certified installation", "25-year warranty", "Smart monitoring app"],
    startingPrice: "£4,999",
    gradient: "from-[hsl(var(--quantum-500))] to-green-500"
  },
  {
    title: "Commercial Solar", 
    description: "Large-scale solar installations for businesses and organizations",
    icon: Building,
    features: ["Custom design & engineering", "Project management", "Grid connection support", "Performance guarantees"],
    startingPrice: "£15,000",
    gradient: "from-[hsl(var(--cyber-500))] to-blue-500"
  },
  {
    title: "Battery Storage",
    description: "Energy storage solutions for maximum energy independence",
    icon: Battery,
    features: ["Tesla Powerwall certified", "Emergency backup power", "Time-of-use optimization", "Smart energy management"],
    startingPrice: "£8,500",
    gradient: "from-[hsl(var(--neural-500))] to-purple-500"
  }
];

const processSteps = [
  {
    step: "1",
    title: "Free Consultation",
    description: "Expert assessment of your property and energy needs",
    icon: Calendar
  },
  {
    step: "2", 
    title: "Custom Design",
    description: "Tailored solar system design with 3D modeling",
    icon: CloudSun
  },
  {
    step: "3",
    title: "Professional Installation", 
    description: "MCS certified installation by experienced engineers",
    icon: Award
  },
  {
    step: "4",
    title: "System Activation",
    description: "Grid connection and smart monitoring setup",
    icon: Zap
  }
];

const achievements = [
  { value: "5,000+", label: "Solar Installations", icon: CloudSun },
  { value: "25MW", label: "Clean Energy Generated", icon: Leaf },
  { value: "£12M+", label: "Customer Savings", icon: PoundSterling },
  { value: "15 Years", label: "Industry Experience", icon: Clock }
];

export default function SolarSolutions() {
  const [activeTab, setActiveTab] = useState("residential");

  return (
    <div className="pt-32 pb-20">
      {/* Hero Section */}
      <section className="mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <div className="flex items-center mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" 
                  alt="Modern solar panel installation on residential rooftop"
                  className="w-16 h-16 rounded-2xl mr-4 object-cover"
                />
                <div>
                  <h1 className="text-4xl md:text-5xl font-black gradient-text">
                    Eco Solar Energy Solutions
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400 mt-2">Leading the transition to sustainable energy</p>
                </div>
              </div>

              <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                Transform your property with cutting-edge solar technology and comprehensive energy storage solutions. 
                Our AI-powered platform delivers personalized energy strategies that maximize savings while minimizing environmental impact.
              </p>

              {/* Achievement Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {achievements.map((achievement, index) => (
                  <div key={index} className="text-center p-4 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700">
                    <div className="text-2xl font-bold text-[hsl(var(--quantum-500))] mb-1">{achievement.value}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 flex items-center justify-center gap-1">
                      <achievement.icon size={14} />
                      {achievement.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" className="bg-gradient-to-r from-[hsl(var(--quantum-500))] to-green-500 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <Calculator className="mr-2 h-5 w-5" />
                  Get Free Quote
                </Button>
                <Button variant="outline" size="lg" className="glass-morphic px-8 py-4 rounded-2xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Consultation
                </Button>
              </div>
            </div>

            {/* Visual */}
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Futuristic smart grid technology with glowing connections"
                className="rounded-3xl shadow-2xl animate-float w-full h-[500px] object-cover"
              />
              
              {/* Floating Info Cards */}
              <div className="absolute -top-4 -left-4 glass-morphic rounded-2xl p-4 animate-neural-pulse">
                <div className="text-center">
                  <div className="text-lg font-bold text-[hsl(var(--quantum-500))]">£1,200+</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Annual Savings</div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 glass-morphic rounded-2xl p-4 animate-neural-pulse">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-500">25 Years</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Warranty</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solar Calculator Section */}
      <section className="mb-20 bg-slate-100/50 dark:bg-slate-800/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 gradient-text">
              AI-Powered Solar Calculator
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Get an instant, personalized solar assessment using advanced AI algorithms and real-time data analysis.
            </p>
          </div>
          
          <SolarCalculator />
        </div>
      </section>

      {/* Services Section */}
      <section className="mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 gradient-text">
              Complete Solar Solutions
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              From residential installations to large commercial projects, we deliver cutting-edge solar technology tailored to your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {solarServices.map((service, index) => (
              <QuantumCard key={index} className="p-8 text-center quantum-hover group">
                <div className={`w-20 h-20 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 animate-neural-pulse`}>
                  <service.icon className="text-white text-2xl" size={32} />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">{service.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">{service.description}</p>
                
                <div className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                      <div className="w-2 h-2 bg-[hsl(var(--quantum-500))] rounded-full mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                  <div className="text-2xl font-bold text-[hsl(var(--quantum-500))] mb-2">
                    Starting from {service.startingPrice}
                  </div>
                  <Button className={`w-full bg-gradient-to-r ${service.gradient} text-white hover:shadow-lg transition-all duration-300 group-hover:scale-105`}>
                    Get Quote
                  </Button>
                </div>
              </QuantumCard>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-slate-100/50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 gradient-text">
              Our Installation Process
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              From initial consultation to system activation, we guide you through every step of your solar journey with expert care and precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <QuantumCard key={index} className="p-8 text-center quantum-hover relative">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-[hsl(var(--quantum-500))] to-[hsl(var(--cyber-500))] rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {step.step}
                </div>
                
                <div className="w-16 h-16 bg-gradient-to-r from-[hsl(var(--quantum-500))] to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 mt-4 animate-neural-pulse">
                  <step.icon className="text-white" size={24} />
                </div>
                
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">{step.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{step.description}</p>
              </QuantumCard>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 gradient-text">
              Cutting-Edge Technology
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              We partner with industry-leading manufacturers to deliver the most advanced solar technology available in the UK market.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12">
              <TabsTrigger value="residential" className="text-lg py-3">Residential Systems</TabsTrigger>
              <TabsTrigger value="commercial" className="text-lg py-3">Commercial Solutions</TabsTrigger>
              <TabsTrigger value="storage" className="text-lg py-3">Energy Storage</TabsTrigger>
            </TabsList>
            
            <TabsContent value="residential" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6">
                    Premium Home Solar Systems
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Shield className="h-6 w-6 text-[hsl(var(--quantum-500))] mt-1" />
                      <div>
                        <div className="font-semibold text-slate-800 dark:text-slate-100">25-Year Performance Warranty</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Industry-leading warranty coverage for complete peace of mind</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <TrendingUp className="h-6 w-6 text-green-500 mt-1" />
                      <div>
                        <div className="font-semibold text-slate-800 dark:text-slate-100">High-Efficiency Panels</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Up to 22% efficiency with monocrystalline technology</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-6 w-6 text-[hsl(var(--cyber-500))] mt-1" />
                      <div>
                        <div className="font-semibold text-slate-800 dark:text-slate-100">MCS Certified Installation</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Qualified for government incentives and feed-in tariffs</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <QuantumCard className="p-8">
                  <img 
                    src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                    alt="Modern residential solar installation"
                    className="w-full h-64 object-cover rounded-xl mb-6"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 rounded-lg bg-gradient-to-r from-[hsl(var(--quantum-500))]/10 to-green-500/10">
                      <div className="text-lg font-bold text-[hsl(var(--quantum-500))]">4-8kW</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">System Size</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10">
                      <div className="text-lg font-bold text-green-500">£800-1,500</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">Annual Savings</div>
                    </div>
                  </div>
                </QuantumCard>
              </div>
            </TabsContent>
            
            <TabsContent value="commercial" className="space-y-8">
              {/* Commercial content */}
              <div className="text-center py-12">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Commercial Solar Solutions</h3>
                <p className="text-slate-600 dark:text-slate-400">Large-scale installations for businesses and organizations</p>
              </div>
            </TabsContent>
            
            <TabsContent value="storage" className="space-y-8">
              {/* Storage content */}
              <div className="text-center py-12">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Energy Storage Systems</h3>
                <p className="text-slate-600 dark:text-slate-400">Advanced battery solutions for energy independence</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <QuantumCard className="p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Ready to Go Solar?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
              Join thousands of UK homeowners and businesses who have already made the switch to clean, renewable solar energy. 
              Get your personalized quote today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button size="lg" className="bg-gradient-to-r from-[hsl(var(--quantum-500))] to-green-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300">
                <Calculator className="mr-2 h-5 w-5" />
                Calculate Savings
              </Button>
              <Button variant="outline" size="lg" className="glass-morphic px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300">
                <Calendar className="mr-2 h-5 w-5" />
                Book Free Consultation
              </Button>
            </div>
          </QuantumCard>
        </div>
      </section>
    </div>
  );
}
