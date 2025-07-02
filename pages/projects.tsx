import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuantumCard } from "@/components/ui/quantum-card";
import { ProjectShowcase } from "@/components/features/project-showcase";
import { 
  Building, 
  Home, 
  BatteryCharging, 
  MapPin, 
  Calendar, 
  PoundSterling, 
  Zap,
  Award,
  TrendingUp,
  Leaf,
  Users,
  Target
} from "lucide-react";

const projectCategories = [
  { id: "all", label: "All Projects", count: 156 },
  { id: "residential", label: "Residential", count: 89 },
  { id: "commercial", label: "Commercial", count: 45 },
  { id: "ev-charging", label: "EV Charging", count: 22 }
];

const featuredProjects = [
  {
    id: 1,
    title: "Birmingham Commercial Solar Farm",
    category: "Commercial",
    capacity: "2.5 MW",
    location: "Birmingham, West Midlands", 
    date: "November 2024",
    savings: "£320,000/year",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    description: "3,200 solar panels installation serving Birmingham's industrial sector with MCS certification.",
    highlights: ["3,200 Solar Panels", "MCS Certified", "Grid Integration", "24/7 Monitoring"],
    categoryColor: "from-[hsl(var(--quantum-500))] to-green-500"
  },
  {
    id: 2,
    title: "Manchester Residential Estate",
    category: "Residential", 
    capacity: "680 kW",
    location: "Greater Manchester",
    date: "October 2024",
    savings: "£85,000/year",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    description: "85 homes community solar program with Smart Export Guarantee integration.",
    highlights: ["85 Homes", "Community Solar", "Smart Export", "Energy Sharing"],
    categoryColor: "from-[hsl(var(--cyber-500))] to-blue-500"
  },
  {
    id: 3,
    title: "Leeds Industrial Complex",
    category: "Commercial",
    capacity: "1.8 MW", 
    location: "Leeds, West Yorkshire",
    date: "September 2024",
    savings: "£245,000/year",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    description: "Rooftop solar with 2.4 MWh battery storage system for 24/7 clean energy supply.",
    highlights: ["Rooftop Installation", "Battery Storage", "24/7 Supply", "Grid Independence"],
    categoryColor: "from-[hsl(var(--neural-500))] to-purple-500"
  },
  {
    id: 4,
    title: "Liverpool Shopping Center",
    category: "EV Charging",
    capacity: "450 kW",
    location: "Liverpool, Merseyside",
    date: "August 2024", 
    savings: "Carbon neutral",
    image: "https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    description: "Solar canopy with 24 rapid EV charging bays for sustainable urban mobility.",
    highlights: ["Solar Canopy", "24 Charging Bays", "Rapid Charging", "Urban Mobility"],
    categoryColor: "from-yellow-500 to-orange-500"
  },
  {
    id: 5,
    title: "Sheffield University Campus",
    category: "Commercial", 
    capacity: "1.2 MW",
    location: "Sheffield, South Yorkshire",
    date: "December 2024",
    savings: "£165,000/year",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    description: "Educational solar demonstration project with student research integration.",
    highlights: ["Educational Project", "Research Integration", "Student Programs", "Demonstration Site"],
    categoryColor: "from-indigo-500 to-purple-500"
  },
  {
    id: 6,
    title: "Bristol Eco-Village",
    category: "Residential",
    capacity: "350 kW",
    location: "Bristol, South West England",
    date: "June 2024",
    savings: "£42,000/year", 
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    description: "Off-grid solar community project with energy sharing and battery storage.",
    highlights: ["Off-Grid System", "Energy Sharing", "Community Project", "Sustainable Living"],
    categoryColor: "from-green-500 to-emerald-500"
  }
];

const impactStats = [
  { value: "156", label: "Projects Completed", icon: Award, color: "text-[hsl(var(--quantum-500))]" },
  { value: "47MW", label: "Total Capacity Installed", icon: Zap, color: "text-[hsl(var(--cyber-500))]" },
  { value: "£2.8M", label: "Annual Customer Savings", icon: PoundSterling, color: "text-green-500" },
  { value: "18,500", label: "Tonnes CO₂ Saved", icon: Leaf, color: "text-emerald-500" }
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState(featuredProjects);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    if (category === "all") {
      setFilteredProjects(featuredProjects);
    } else {
      const filtered = featuredProjects.filter(project => 
        project.category.toLowerCase().replace(" ", "-") === category
      );
      setFilteredProjects(filtered);
    }
  };

  return (
    <div className="pt-32 pb-20">
      {/* Hero Section */}
      <section className="mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black mb-6 gradient-text">
              Featured Projects
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Discover our latest solar installations and EV charging infrastructure projects that are 
              <span className="font-bold text-[hsl(var(--quantum-600))]"> transforming communities</span> across the UK.
            </p>
          </div>

          {/* Impact Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {impactStats.map((stat, index) => (
              <QuantumCard key={index} className="p-6 text-center quantum-hover">
                <div className={`text-3xl font-bold mb-2 ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 flex items-center justify-center gap-1">
                  <stat.icon size={14} />
                  {stat.label}
                </div>
              </QuantumCard>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {projectCategories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className={`rounded-full px-6 py-3 font-semibold transition-all duration-300 ${
                  activeCategory === category.id 
                    ? "bg-gradient-to-r from-[hsl(var(--quantum-500))] to-[hsl(var(--cyber-500))] text-white shadow-lg scale-105" 
                    : "hover:scale-105"
                }`}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.label}
                <Badge variant="secondary" className="ml-2 bg-white/20 text-current">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Project Showcase */}
      <section className="mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProjectShowcase projects={filteredProjects} />
        </div>
      </section>

      {/* Case Study Highlights */}
      <section className="py-20 bg-slate-100/50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 gradient-text">
              Success Stories
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Real results from real customers across the UK, showcasing the transformative power of renewable energy solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Featured Case Study 1 */}
            <QuantumCard className="p-8 quantum-hover">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-[hsl(var(--quantum-500))] to-green-500 rounded-xl flex items-center justify-center mr-4">
                  <Building className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Manufacturing Excellence</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Midlands Industrial Park</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 rounded-lg bg-gradient-to-r from-[hsl(var(--quantum-500))]/10 to-green-500/10">
                  <div className="text-2xl font-bold text-[hsl(var(--quantum-500))]">3.2MW</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Solar Capacity</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10">
                  <div className="text-2xl font-bold text-green-500">67%</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Energy Independence</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
                  <div className="text-2xl font-bold text-blue-500">£425K</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Annual Savings</div>
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-400 mb-6">
                "The solar installation has transformed our energy costs and carbon footprint. We're now generating 
                67% of our electricity needs and saving over £400,000 annually."
              </p>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-[hsl(var(--quantum-500))]" />
                  <span className="text-slate-600 dark:text-slate-400">450 Employees Benefited</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-green-500" />
                  <span className="text-slate-600 dark:text-slate-400">ROI: 6.2 Years</span>
                </div>
              </div>
            </QuantumCard>

            {/* Featured Case Study 2 */}
            <QuantumCard className="p-8 quantum-hover">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-[hsl(var(--cyber-500))] to-blue-500 rounded-xl flex items-center justify-center mr-4">
                  <Home className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Community Solar Revolution</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">New Town Development, Essex</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 rounded-lg bg-gradient-to-r from-[hsl(var(--cyber-500))]/10 to-blue-500/10">
                  <div className="text-2xl font-bold text-[hsl(var(--cyber-500))]">127</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Homes Connected</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10">
                  <div className="text-2xl font-bold text-green-500">£1,850</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Avg Annual Savings</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                  <div className="text-2xl font-bold text-purple-500">98%</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Satisfaction Rate</div>
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-400 mb-6">
                "Our community solar program has exceeded all expectations. Residents are saving significantly on 
                energy bills while contributing to a sustainable future for their children."
              </p>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Leaf className="h-4 w-4 text-green-500" />
                  <span className="text-slate-600 dark:text-slate-400">2,400t CO₂ Saved</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-[hsl(var(--cyber-500))]" />
                  <span className="text-slate-600 dark:text-slate-400">Property Values +8%</span>
                </div>
              </div>
            </QuantumCard>
          </div>
        </div>
      </section>

      {/* Technology Innovation Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 gradient-text">
              Innovation in Action
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Our projects showcase the latest in renewable energy technology, from AI-optimized installations to smart grid integration.
            </p>
          </div>

          <Tabs defaultValue="monitoring" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12">
              <TabsTrigger value="monitoring" className="text-lg py-3">Smart Monitoring</TabsTrigger>
              <TabsTrigger value="storage" className="text-lg py-3">Energy Storage</TabsTrigger>
              <TabsTrigger value="integration" className="text-lg py-3">Grid Integration</TabsTrigger>
            </TabsList>
            
            <TabsContent value="monitoring" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <QuantumCard className="p-8">
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">
                    Real-Time Performance Analytics
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-[hsl(var(--quantum-500))]/10 to-green-500/10">
                      <span className="font-semibold text-slate-800 dark:text-slate-100">System Efficiency</span>
                      <span className="text-[hsl(var(--quantum-500))] font-bold">98.7%</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
                      <span className="font-semibold text-slate-800 dark:text-slate-100">Uptime</span>
                      <span className="text-blue-500 font-bold">99.96%</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10">
                      <span className="font-semibold text-slate-800 dark:text-slate-100">AI Optimization</span>
                      <span className="text-green-500 font-bold">+12% Output</span>
                    </div>
                  </div>
                </QuantumCard>
                
                <div>
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                    alt="Smart monitoring dashboard"
                    className="w-full h-80 object-cover rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="storage" className="space-y-8">
              <div className="text-center py-12">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Advanced Energy Storage Solutions</h3>
                <p className="text-slate-600 dark:text-slate-400">Battery storage systems for maximum energy independence and grid stability</p>
              </div>
            </TabsContent>
            
            <TabsContent value="integration" className="space-y-8">
              <div className="text-center py-12">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Smart Grid Integration</h3>
                <p className="text-slate-600 dark:text-slate-400">Seamless connection to the UK's evolving smart energy infrastructure</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <QuantumCard className="p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
              Let us help you create your own renewable energy success story. From initial consultation to 
              project completion, we're with you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button size="lg" className="bg-gradient-to-r from-[hsl(var(--quantum-500))] to-green-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300">
                <Calendar className="mr-2 h-5 w-5" />
                Start Your Project
              </Button>
              <Button variant="outline" size="lg" className="glass-morphic px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300">
                <TrendingUp className="mr-2 h-5 w-5" />
                View All Projects
              </Button>
            </div>
          </QuantumCard>
        </div>
      </section>
    </div>
  );
}
