import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Target, 
  Zap, 
  TrendingUp,
  Users,
  Phone,
  MessageCircle,
  CheckCircle2,
  Clock,
  Star,
  Gift,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ConversionEvent {
  type: "view" | "click" | "scroll" | "hover" | "time";
  value: number;
  timestamp: number;
}

interface OptimizationStrategy {
  id: string;
  title: string;
  description: string;
  effectiveness: number;
  urgency: "critical" | "high" | "medium" | "low";
  action: string;
  icon: any;
  color: string;
}

export function ConversionMaximizer() {
  const [events, setEvents] = useState<ConversionEvent[]>([]);
  const [conversionScore, setConversionScore] = useState(0);
  const [activeStrategies, setActiveStrategies] = useState<OptimizationStrategy[]>([]);
  const [showMaximizer, setShowMaximizer] = useState(false);

  // Advanced user behavior tracking
  useEffect(() => {
    const trackEvent = (type: ConversionEvent["type"], value: number) => {
      setEvents(prev => [...prev, { type, value, timestamp: Date.now() }]);
    };

    // Track scroll behavior
    const handleScroll = () => {
      const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
      trackEvent("scroll", scrollPercent);
    };

    // Track time engagement
    const timeTracker = setInterval(() => {
      trackEvent("time", 1);
    }, 5000);

    // Track button hovers
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => trackEvent("hover", 1));
    });

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(timeTracker);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // AI-powered strategy generation
  useEffect(() => {
    const generateStrategies = () => {
      const timeEvents = events.filter(e => e.type === "time").length;
      const scrollEvents = events.filter(e => e.type === "scroll");
      const hoverEvents = events.filter(e => e.type === "hover").length;
      
      const maxScroll = scrollEvents.length > 0 ? Math.max(...scrollEvents.map(e => e.value)) : 0;
      
      const strategies: OptimizationStrategy[] = [];

      // High engagement, needs push
      if (timeEvents > 6 && maxScroll > 50 && hoverEvents > 3) {
        strategies.push({
          id: "ready_buyer",
          title: "Ready to Buy Signal Detected",
          description: "User shows strong purchase intent. Apply closing pressure.",
          effectiveness: 94,
          urgency: "critical",
          action: "CALL_NOW",
          icon: Phone,
          color: "bg-red-500"
        });
      }

      // Medium engagement, needs value reinforcement
      if (timeEvents > 3 && maxScroll > 30) {
        strategies.push({
          id: "value_reinforce",
          title: "Value Reinforcement Needed",
          description: "Show additional benefits and social proof.",
          effectiveness: 78,
          urgency: "high",
          action: "SHOW_TESTIMONIALS",
          icon: Users,
          color: "bg-orange-500"
        });
      }

      // Low engagement, needs attention
      if (timeEvents < 3 || maxScroll < 20) {
        strategies.push({
          id: "attention_grab",
          title: "Attention Capture Required",
          description: "Use urgency and scarcity to re-engage.",
          effectiveness: 65,
          urgency: "high",
          action: "SHOW_URGENCY",
          icon: Clock,
          color: "bg-yellow-500"
        });
      }

      // Returning visitor
      if (timeEvents > 10) {
        strategies.push({
          id: "loyalty_bonus",
          title: "Loyalty Bonus Trigger",
          description: "Reward returning visitor with exclusive offer.",
          effectiveness: 88,
          urgency: "medium",
          action: "SHOW_BONUS",
          icon: Gift,
          color: "bg-purple-500"
        });
      }

      setActiveStrategies(strategies.sort((a, b) => b.effectiveness - a.effectiveness));
    };

    if (events.length > 0) {
      generateStrategies();
    }
  }, [events]);

  // Calculate conversion score
  useEffect(() => {
    const timeScore = Math.min(events.filter(e => e.type === "time").length * 8, 40);
    const scrollScore = Math.min(Math.max(...events.filter(e => e.type === "scroll").map(e => e.value || 0)) || 0, 30);
    const interactionScore = Math.min(events.filter(e => e.type === "hover").length * 10, 30);
    
    const totalScore = timeScore + scrollScore + interactionScore;
    setConversionScore(Math.min(totalScore, 100));
    
    // Show maximizer when score indicates readiness
    if (totalScore > 50) {
      setShowMaximizer(true);
    }
  }, [events]);

  const executeStrategy = (strategy: OptimizationStrategy) => {
    switch (strategy.action) {
      case "CALL_NOW":
        window.open("tel:+447425705531", "_self");
        break;
      case "SHOW_TESTIMONIALS":
        document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth" });
        break;
      case "SHOW_URGENCY":
        window.location.href = "/contact";
        break;
      case "SHOW_BONUS":
        window.location.href = "/contact?offer=loyalty";
        break;
      default:
        window.location.href = "/contact";
    }
  };

  const topStrategy = activeStrategies[0];

  if (!showMaximizer || !topStrategy) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm animate-in slide-in-from-left duration-500">
      <div className="tesla-glass rounded-xl p-6 border-l-4 border-green-500 shadow-2xl">
        {/* AI Badge */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <Brain className="h-4 w-4 text-white" />
          </div>
          <div>
            <Badge className="bg-green-100 text-green-800 text-xs font-semibold">
              AI OPTIMIZED
            </Badge>
            <div className="text-xs text-muted-foreground mt-1">
              Conversion Score: {conversionScore}%
            </div>
          </div>
        </div>

        {/* Strategy Display */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", topStrategy.color)}>
              <topStrategy.icon className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm">{topStrategy.title}</h4>
              <p className="text-xs text-muted-foreground">{topStrategy.description}</p>
            </div>
          </div>

          {/* Effectiveness Meter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Success Rate</span>
              <span className="font-semibold">{topStrategy.effectiveness}%</span>
            </div>
            <Progress value={topStrategy.effectiveness} className="h-2" />
          </div>

          {/* Action Button */}
          <Button 
            onClick={() => executeStrategy(topStrategy)}
            className={cn(
              "w-full font-semibold text-sm py-3 relative overflow-hidden group",
              topStrategy.urgency === "critical" ? "bg-red-500 hover:bg-red-600 animate-pulse" :
              topStrategy.urgency === "high" ? "bg-orange-500 hover:bg-orange-600" :
              "tesla-button"
            )}
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <span className="relative flex items-center justify-center gap-2">
              {topStrategy.action === "CALL_NOW" && <Phone className="h-4 w-4" />}
              {topStrategy.action === "SHOW_TESTIMONIALS" && <Star className="h-4 w-4" />}
              {topStrategy.action === "SHOW_URGENCY" && <Clock className="h-4 w-4" />}
              {topStrategy.action === "SHOW_BONUS" && <Gift className="h-4 w-4" />}
              
              {topStrategy.action === "CALL_NOW" ? "Call Now" :
               topStrategy.action === "SHOW_TESTIMONIALS" ? "See Reviews" :
               topStrategy.action === "SHOW_URGENCY" ? "Act Now" :
               topStrategy.action === "SHOW_BONUS" ? "Claim Bonus" : "Take Action"}
            </span>
          </Button>

          {/* Urgency Indicator */}
          {topStrategy.urgency === "critical" && (
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
              <div className="flex items-center gap-2 text-red-600">
                <Target className="h-4 w-4" />
                <span className="text-xs font-semibold">OPTIMAL CONVERSION MOMENT</span>
              </div>
              <p className="text-xs text-red-600 mt-1">
                Act now for maximum savings opportunity
              </p>
            </div>
          )}

          {/* Trust Signals */}
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              <span>MCS Certified</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              <span>25yr Warranty</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span>£2000+ Savings</span>
            </div>
          </div>
        </div>

        {/* Secondary Actions */}
        <div className="flex gap-2 mt-4">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => window.location.href = "/solar-solutions"}
            className="flex-1 text-xs"
          >
            Calculate Savings
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => setShowMaximizer(false)}
            className="px-3"
          >
            ×
          </Button>
        </div>
      </div>
    </div>
  );
}