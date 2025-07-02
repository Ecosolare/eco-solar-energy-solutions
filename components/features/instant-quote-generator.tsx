import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Download, Mail, CheckCircle, Clock } from "lucide-react";

export function InstantQuoteGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [quote, setQuote] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Show after 5 minutes
    const timer = setTimeout(() => {
      setShowBanner(true);
    }, 300000); // 5 minutes

    return () => clearTimeout(timer);
  }, []);

  const generateQuote = () => {
    setIsGenerating(true);
    
    // Simulate AI quote generation
    setTimeout(() => {
      const generatedQuote = {
        id: `QUO-${Date.now()}`,
        systemSize: "10kW",
        panelCount: 25,
        annualSavings: 1347,
        totalCost: 8999,
        paybackPeriod: 6.7,
        co2Reduction: 2.4,
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()
      };
      
      setQuote(generatedQuote);
      setIsGenerating(false);
    }, 3000);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Sticky Bottom Banner */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-30 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-2xl"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-full">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Get Your Instant Solar Quote</h3>
                <p className="text-sm text-blue-100">AI-powered pricing in 10 seconds • No commitment required</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                <span>Limited time: Extra £500 off</span>
              </div>
              <button
                onClick={generateQuote}
                disabled={isGenerating}
                className="px-6 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-all duration-200 disabled:opacity-50"
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    Generating...
                  </span>
                ) : (
                  "Get Instant Quote"
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quote Modal */}
      {quote && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setQuote(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Instant Quote is Ready!</h2>
              <p className="text-gray-600">Quote ID: {quote.id}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-1">System Size</p>
                <p className="text-xl font-bold text-gray-900">{quote.systemSize}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-1">Solar Panels</p>
                <p className="text-xl font-bold text-gray-900">{quote.panelCount} panels</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-1">Annual Savings</p>
                <p className="text-xl font-bold text-green-600">£{quote.annualSavings}</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-1">Payback Period</p>
                <p className="text-xl font-bold text-blue-600">{quote.paybackPeriod} years</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Investment</p>
                  <p className="text-3xl font-bold">£{quote.totalCost.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-blue-100 text-sm">CO₂ Reduction</p>
                  <p className="text-xl font-bold">{quote.co2Reduction} tons/year</p>
                </div>
              </div>
              <p className="text-xs text-blue-200 mt-3">Valid until: {quote.validUntil}</p>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <Download className="h-4 w-4" />
                Download PDF
              </button>
              <button className="flex-1 px-6 py-3 bg-gray-100 text-gray-900 rounded-full font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                <Mail className="h-4 w-4" />
                Email Quote
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}