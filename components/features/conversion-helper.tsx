import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Phone, Calculator, Zap } from "lucide-react";
import { Link } from "wouter";

export function ConversionHelper() {
  const [isOpen, setIsOpen] = useState(false);
  const [showWidget, setShowWidget] = useState(false);

  useEffect(() => {
    // Show widget after 10 seconds
    const timer = setTimeout(() => {
      setShowWidget(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  if (!showWidget) return null;

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
            aria-label="Get Help"
          >
            <MessageCircle className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Helper Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-40 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
              <h3 className="font-semibold">How can we help?</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-blue-700 rounded-full transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="p-4 space-y-3">
              <Link
                href="/solar-solutions#calculator"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group"
              >
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <Calculator className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Calculate Savings</h4>
                  <p className="text-xs text-gray-600">See how much you can save</p>
                </div>
              </Link>

              <a
                href="tel:+447425705531"
                className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group"
              >
                <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                  <Phone className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Call Us Now</h4>
                  <p className="text-xs text-gray-600">+44 7425 705531</p>
                </div>
              </a>

              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group"
              >
                <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                  <Zap className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Free Consultation</h4>
                  <p className="text-xs text-gray-600">Book your free assessment</p>
                </div>
              </Link>
            </div>

            {/* Live Support Notice */}
            <div className="bg-gray-50 p-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>We typically reply within 2 minutes</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}