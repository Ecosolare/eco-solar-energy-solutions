import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, MessageCircle } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Expanded Menu */}
      {isExpanded && (
        <div className="flex flex-col gap-3 animate-in slide-in-from-bottom-2 duration-300">
          <Button asChild size="lg" className="tesla-button shadow-lg">
            <a href="tel:+447425705531">
              <Phone className="mr-2 h-4 w-4" />
              Call Now
            </a>
          </Button>
          
          <Button asChild size="lg" variant="outline" className="bg-green-500 text-white hover:bg-green-600 border-2 shadow-lg">
            <a href="https://wa.me/447425705531?text=Hi, I'm interested in solar panels and would like a free consultation" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp Chat
            </a>
          </Button>
          
          <Button asChild size="lg" variant="outline" className="bg-white/90 backdrop-blur-sm border-2 shadow-lg">
            <Link href="/contact">
              <Calendar className="mr-2 h-4 w-4" />
              Book Free Call
            </Link>
          </Button>
        </div>
      )}

      {/* Main CTA Button */}
      <Button
        size="lg"
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "tesla-button shadow-xl hover:shadow-2xl transition-all duration-300 relative",
          isExpanded ? "rotate-45" : "hover:scale-110"
        )}
      >
        <MessageCircle className="mr-2 h-5 w-5" />
        {isExpanded ? "Close" : "Get Quote"}
      </Button>
    </div>
  );
}