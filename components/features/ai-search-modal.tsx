import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, ArrowRight, Zap, Car, Home, Calendar, Phone } from "lucide-react";
import { useLocation } from "wouter";

interface SearchResult {
  title: string;
  description: string;
  href: string;
  icon: any;
  category: string;
}

interface AISearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AISearchModal({ isOpen, onClose }: AISearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);

  const allContent: SearchResult[] = [
    {
      title: "Solar Panel Installation",
      description: "Get a free quote for residential solar panels. Save up to 70% on energy bills.",
      href: "/solar-solutions",
      icon: Zap,
      category: "Solar"
    },
    {
      title: "EV Charging Points",
      description: "Find 40,646+ charging stations across the UK. Install home chargers.",
      href: "/ev-charging",
      icon: Car,
      category: "EV"
    },
    {
      title: "Free Consultation",
      description: "Book a free consultation with our energy experts. Get personalized recommendations.",
      href: "/contact",
      icon: Calendar,
      category: "Contact"
    },
    {
      title: "Battery Storage",
      description: "Store solar energy for use anytime. Complete energy independence.",
      href: "/services",
      icon: Home,
      category: "Services"
    },
    {
      title: "Call Us Now",
      description: "Speak directly with our team: +44 7425 705531",
      href: "tel:+447425705531",
      icon: Phone,
      category: "Contact"
    },
    {
      title: "AR/VR Experience",
      description: "Visualize solar panels on your roof with AR technology.",
      href: "/ar-vr-experience",
      icon: Home,
      category: "Experience"
    }
  ];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.length > 0) {
      setIsLoading(true);
      // AI-powered search simulation
      setTimeout(() => {
        const filtered = allContent.filter(
          item =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase())
        );
        
        // Add AI suggestions based on query intent
        if (query.toLowerCase().includes("save") || query.toLowerCase().includes("cost")) {
          filtered.unshift({
            title: "Calculate Your Savings",
            description: "Use our AI-powered calculator to see how much you can save with solar panels.",
            href: "/solar-solutions#calculator",
            icon: Zap,
            category: "Calculator"
          });
        }
        
        setResults(filtered);
        setIsLoading(false);
      }, 300);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleResultClick = (href: string) => {
    if (href.startsWith("tel:")) {
      window.location.href = href;
    } else {
      setLocation(href);
    }
    onClose();
    setQuery("");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-6">
              {/* Search Input */}
              <div className="flex items-center gap-4 mb-6">
                <Search className="h-5 w-5 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for solar panels, EV charging, or ask a question..."
                  className="flex-1 text-lg bg-transparent outline-none placeholder-gray-400"
                />
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Quick Actions */}
              {query.length === 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 mb-4">Quick Actions</p>
                  {allContent.slice(0, 4).map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleResultClick(item.href)}
                      className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 rounded-xl transition-all duration-200 text-left group"
                    >
                      <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                        <item.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </button>
                  ))}
                </div>
              )}

              {/* Search Results */}
              {query.length > 0 && (
                <div className="space-y-2">
                  {isLoading ? (
                    <div className="text-center py-8">
                      <div className="inline-block w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      <p className="text-sm text-gray-500 mt-2">Searching...</p>
                    </div>
                  ) : results.length > 0 ? (
                    <>
                      <p className="text-sm text-gray-500 mb-4">
                        {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                      </p>
                      {results.map((result, index) => (
                        <button
                          key={index}
                          onClick={() => handleResultClick(result.href)}
                          className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 rounded-xl transition-all duration-200 text-left group"
                        >
                          <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                            <result.icon className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{result.title}</h3>
                            <p className="text-sm text-gray-500 line-clamp-1">{result.description}</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                        </button>
                      ))}
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No results found for "{query}"</p>
                      <p className="text-sm text-gray-400 mt-2">Try searching for "solar panels" or "EV charging"</p>
                    </div>
                  )}
                </div>
              )}

              {/* AI Tip */}
              <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                <p className="text-xs text-blue-700">
                  <strong>Tip:</strong> Ask questions like "How much can I save with solar?" or "Find EV chargers near me"
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}