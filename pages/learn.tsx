import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ARVRShowcase } from "@/components/features/ar-vr-showcase";
import { 
  BookOpen, 
  Zap, 
  Battery, 
  Clock,
  ExternalLink,
  TrendingUp,
  Lightbulb,
  Shield
} from "lucide-react";

const educationalContent = {
  solar: {
    title: "Solar in the UK: 5 Things to Know",
    icon: Lightbulb,
    content: [
      {
        title: "Solar Works Even in Cloudy Weather",
        description: "UK solar panels generate electricity even on overcast days. Modern panels are designed for our climate and can produce 70-80% of their rated capacity in diffused light.",
        fact: "The UK receives enough sunlight annually to power solar installations effectively."
      },
      {
        title: "Government Incentives Available",
        description: "The Smart Export Guarantee (SEG) pays you for excess electricity you export to the grid. Plus VAT is reduced to 0% on solar installations.",
        fact: "Typical SEG rates range from 3-7p per kWh exported."
      },
      {
        title: "Payback Period is 6-10 Years",
        description: "With current energy prices and incentives, most UK homeowners see full return on investment within a decade.",
        fact: "Average system pays for itself in 8 years, then provides free electricity for 15+ years."
      },
      {
        title: "Increases Property Value",
        description: "Homes with solar panels typically see a 4-14% increase in property value according to UK property studies.",
        fact: "Solar homes sell 20% faster than comparable properties without solar."
      },
      {
        title: "25-Year Performance Warranty",
        description: "Quality solar panels come with 25-year warranties and typically last 30+ years with minimal maintenance required.",
        fact: "Solar panels lose only 0.5% efficiency per year on average."
      }
    ]
  },
  ev: {
    title: "EV Charging in 2 Minutes",
    icon: Zap,
    content: [
      {
        title: "Three Types of Charging",
        description: "Slow (3-7kW) for overnight home charging, Fast (7-22kW) for top-ups, and Rapid (50kW+) for long journeys.",
        fact: "Home charging costs 3-4p per mile vs 10-15p per mile for petrol."
      },
      {
        title: "40,000+ Public Chargers in UK",
        description: "The UK has one of Europe's most comprehensive charging networks, with new installations added daily.",
        fact: "95% of UK population lives within 25 miles of a rapid charger."
      },
      {
        title: "Smart Charging Saves Money",
        description: "Charge during off-peak hours (typically 00:30-07:30) to access cheaper electricity rates.",
        fact: "Off-peak charging can cost as little as 5p per kWh vs 30p+ peak rates."
      },
      {
        title: "Planning is Key",
        description: "Apps like Zap-Map show real-time availability and help plan longer journeys with charging stops.",
        fact: "Average EV driver charges at home 80% of the time."
      }
    ]
  },
  battery: {
    title: "Battery vs Grid Feed-In",
    icon: Battery,
    content: [
      {
        title: "Battery Storage Basics",
        description: "Store excess solar energy for use when the sun isn't shining. Typical home batteries store 5-15kWh of electricity.",
        fact: "Battery storage can increase solar self-consumption from 30% to 70%."
      },
      {
        title: "Grid Feed-In Benefits",
        description: "Export unused solar electricity to the national grid and receive payment through the Smart Export Guarantee.",
        fact: "Grid feed-in provides instant income with no additional equipment costs."
      },
      {
        title: "When to Choose Battery",
        description: "Best for homes with high evening electricity use or those wanting energy independence during power cuts.",
        fact: "Battery systems typically add 3-5 years to solar payback period."
      },
      {
        title: "Hybrid Approach",
        description: "Many homes benefit from small battery storage plus grid export, maximizing both self-use and income.",
        fact: "Optimal battery size is usually 50-70% of daily electricity consumption."
      }
    ]
  }
};

const newsUpdates = [
  {
    title: "UK Energy Bills to Fall by £190 in 2025",
    source: "Ofgem",
    time: "2 hours ago",
    category: "Policy",
    url: "#"
  },
  {
    title: "Government Launches New Solar Panel Grant Scheme",
    source: "Gov.uk",
    time: "1 day ago",
    category: "Incentives",
    url: "#"
  },
  {
    title: "EV Charging Network Reaches 50,000 Points",
    source: "BBC Green",
    time: "2 days ago",
    category: "Infrastructure",
    url: "#"
  },
  {
    title: "Solar Panel Efficiency Reaches Record 26.8%",
    source: "Energy Live News",
    time: "3 days ago",
    category: "Technology",
    url: "#"
  }
];

export default function Learn() {
  const [activeTab, setActiveTab] = useState("solar");

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            UK Energy Knowledge Hub
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about solar energy, EV charging, and clean technology in the UK. 
            Stay informed with the latest news and expert insights.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Educational Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="solar" className="flex items-center gap-2">
                  <Lightbulb size={16} />
                  Solar Basics
                </TabsTrigger>
                <TabsTrigger value="ev" className="flex items-center gap-2">
                  <Zap size={16} />
                  EV Charging
                </TabsTrigger>
                <TabsTrigger value="battery" className="flex items-center gap-2">
                  <Battery size={16} />
                  Energy Storage
                </TabsTrigger>
                <TabsTrigger value="arvr" className="flex items-center gap-2">
                  <Shield size={16} />
                  AR/VR
                </TabsTrigger>
              </TabsList>

              {Object.entries(educationalContent).map(([key, section]) => (
                <TabsContent key={key} value={key}>
                  <Card className="tesla-card">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-foreground rounded-lg flex items-center justify-center">
                          <section.icon className="text-background" size={24} />
                        </div>
                        <h2 className="text-2xl font-bold">{section.title}</h2>
                      </div>

                      <div className="space-y-6">
                        {section.content.map((item, index) => (
                          <div key={index} className="border-l-4 border-green-500 pl-6">
                            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                            <p className="text-muted-foreground mb-3">{item.description}</p>
                            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                              <p className="text-sm font-medium text-green-700 dark:text-green-300">
                                💡 {item.fact}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 pt-6 border-t">
                        <Button className="tesla-button">
                          <BookOpen className="mr-2 h-4 w-4" />
                          Get Personalized Advice
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
              
              {/* AR/VR Tab Content */}
              <TabsContent value="arvr">
                <ARVRShowcase />
              </TabsContent>
            </Tabs>
          </div>

          {/* News Sidebar */}
          <div className="space-y-6">
            <Card className="tesla-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="text-green-500" size={20} />
                  <h3 className="text-lg font-semibold">Latest Energy News</h3>
                </div>

                <div className="space-y-4">
                  {newsUpdates.map((news, index) => (
                    <div key={index} className="border-b border-border/50 pb-4 last:border-b-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-medium text-sm leading-tight">{news.title}</h4>
                        <Badge variant="outline" className="text-xs shrink-0">
                          {news.category}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{news.source}</span>
                        <span>{news.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-4" size="sm">
                  <ExternalLink className="mr-2 h-3 w-3" />
                  View All News
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="tesla-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">UK Energy Facts</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Solar installations 2024:</span>
                    <span className="font-semibold">1.4M homes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">EV market share:</span>
                    <span className="font-semibold">16.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Renewable electricity:</span>
                    <span className="font-semibold">42%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Avg. solar savings:</span>
                    <span className="font-semibold">£1,200/year</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="tesla-card bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
              <CardContent className="p-6 text-center">
                <Shield className="mx-auto mb-3 text-green-500" size={32} />
                <h3 className="font-semibold mb-2">Ready to Go Solar?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get expert advice tailored to your home and energy needs.
                </p>
                <Button className="tesla-button w-full">
                  Book Free Consultation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}