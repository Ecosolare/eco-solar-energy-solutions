import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  Sun, 
  BatteryCharging, 
  Battery, 
  Thermometer,
  Brain,
  Atom,
  Users,
  ArrowRight,
  Zap,
  Calculator
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: any;
  status: "available" | "beta" | "coming-soon";
  savings: string;
  href: string;
  category: "core" | "advanced" | "future";
  features: string[];
}

const services: Service[] = [
  {
    id: "solar-panels",
    title: "Solar Panel Systems",
    description: "Convert sunlight into electricity, reducing energy bills by up to 70%",
    icon: Sun,
    status: "available",
    savings: "£1,200+ annually",
    href: "/solar-solutions",
    category: "core",
    features: ["25-year warranty", "MCS certified", "Government grants available"]
  },
  {
    id: "ev-charging",
    title: "EV Charging Points",
    description: "Home and business installations with smart charging technology",
    icon: BatteryCharging,
    status: "available",
    savings: "£800+ annually",
    href: "/ev-charging",
    category: "core",
    features: ["Fast charging", "App control", "Universal compatibility"]
  },
  {
    id: "battery-storage",
    title: "Battery Storage Systems",
    description: "Store excess solar energy for use during peak hours and outages",
    icon: Battery,
    status: "available",
    savings: "£600+ annually",
    href: "/contact",
    category: "core",
    features: ["10kWh capacity", "Smart management", "Grid independence"]
  },
  {
    id: "underfloor-heating",
    title: "Underfloor Heating",
    description: "Efficient heating systems compatible with heat pumps",
    icon: Thermometer,
    status: "available",
    savings: "£400+ annually",
    href: "/contact",
    category: "core",
    features: ["Even heat distribution", "Energy efficient", "Smart controls"]
  },
  {
    id: "smart-grid",
    title: "Smart Grid Integration",
    description: "AI-driven energy management for optimal consumption",
    icon: Brain,
    status: "beta",
    savings: "£300+ annually",
    href: "/contact",
    category: "advanced",
    features: ["AI optimization", "Real-time monitoring", "Predictive analytics"]
  },
  {
    id: "green-hydrogen",
    title: "Green Hydrogen Solutions",
    description: "Sustainable hydrogen production and storage systems",
    icon: Atom,
    status: "coming-soon",
    savings: "£500+ annually",
    href: "/contact",
    category: "future",
    features: ["Zero emissions", "Industrial scale", "Future energy"]
  },
  {
    id: "community-energy",
    title: "Community Energy Projects",
    description: "Shared renewable energy resources for local communities",
    icon: Users,
    status: "beta",
    savings: "£200+ annually",
    href: "/contact",
    category: "advanced",
    features: ["Shared benefits", "Community ownership", "Local impact"]
  }
];

const statusConfig = {
  available: { label: "Available Now", color: "bg-green-500" },
  beta: { label: "Beta Access", color: "bg-blue-500" },
  "coming-soon": { label: "Coming Soon", color: "bg-orange-500" }
};

const categoryConfig = {
  core: { label: "Core Services", order: 1 },
  advanced: { label: "Advanced Solutions", order: 2 },
  future: { label: "Future Technology", order: 3 }
};

export function ServiceGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const filteredServices = selectedCategory === "all" 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const categories = Object.entries(categoryConfig).sort((a, b) => a[1].order - b[1].order);

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          onClick={() => setSelectedCategory("all")}
          className="tesla-button"
        >
          All Services
        </Button>
        {categories.map(([key, config]) => (
          <Button
            key={key}
            variant={selectedCategory === key ? "default" : "outline"}
            onClick={() => setSelectedCategory(key)}
            className="tesla-button"
          >
            {config.label}
          </Button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service) => (
          <div key={service.id} className="group">
            <div className="tesla-card p-6 h-full relative overflow-hidden">
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <Badge className={cn("text-white text-xs", statusConfig[service.status].color)}>
                  {statusConfig[service.status].label}
                </Badge>
              </div>

              {/* Icon */}
              <div className="w-12 h-12 bg-foreground rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                <service.icon className="text-background" size={20} />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {service.description}
              </p>

              {/* Savings */}
              <div className="text-green-600 dark:text-green-400 font-semibold text-sm mb-4">
                💰 Save {service.savings}
              </div>

              {/* Features */}
              <div className="space-y-2 mb-6">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-xs text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                    {feature}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Button asChild className="tesla-button w-full group-hover:scale-105 transition-transform duration-200">
                <Link href={service.href}>
                  {service.status === "available" ? "Get Quote" : service.status === "beta" ? "Join Beta" : "Get Notified"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Calculator CTA */}
      <div className="tesla-glass rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Calculate Your Savings</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Get an instant estimate of how much you could save with our renewable energy solutions
        </p>
        <Button asChild size="lg" className="tesla-button px-8 py-4">
          <Link href="/solar-solutions">
            <Calculator className="mr-2 h-5 w-5" />
            Start Calculator
          </Link>
        </Button>
      </div>
    </div>
  );
}