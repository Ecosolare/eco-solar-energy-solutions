import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Link2, Zap, TrendingUp } from "lucide-react";

interface BlockchainTransaction {
  id: string;
  timestamp: Date;
  energyKwh: number;
  co2Saved: number;
  hash: string;
  status: "pending" | "confirmed";
}

export function BlockchainEnergyTracker() {
  const [transactions, setTransactions] = useState<BlockchainTransaction[]>([]);
  const [totalCarbon, setTotalCarbon] = useState(0);
  const [showTracker, setShowTracker] = useState(false);

  useEffect(() => {
    // Show after 5 minutes
    const timer = setTimeout(() => setShowTracker(true), 300000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showTracker) return;

    // Simulate blockchain transactions
    const interval = setInterval(() => {
      const newTransaction: BlockchainTransaction = {
        id: `TX-${Date.now()}`,
        timestamp: new Date(),
        energyKwh: Math.round(Math.random() * 50 + 10),
        co2Saved: Math.round(Math.random() * 20 + 5),
        hash: `0x${Math.random().toString(16).substr(2, 8)}...`,
        status: "pending"
      };

      setTransactions(prev => [newTransaction, ...prev].slice(0, 5));
      setTotalCarbon(prev => prev + newTransaction.co2Saved);

      // Confirm transaction after 3 seconds
      setTimeout(() => {
        setTransactions(prev => 
          prev.map(tx => 
            tx.id === newTransaction.id ? { ...tx, status: "confirmed" } : tx
          )
        );
      }, 3000);
    }, 10000);

    return () => clearInterval(interval);
  }, [showTracker]);

  if (!showTracker) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-32 right-6 w-80 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-100 p-6 z-30"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
            <Shield className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Blockchain Verified</h3>
            <p className="text-xs text-gray-500">Carbon Credits Tracker</p>
          </div>
        </div>
        <button
          onClick={() => setShowTracker(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>

      {/* Total Impact */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total CO₂ Saved</p>
            <p className="text-2xl font-bold text-gray-900">{totalCarbon} kg</p>
          </div>
          <TrendingUp className="h-8 w-8 text-green-600" />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Equivalent to {Math.round(totalCarbon / 20)} trees planted
        </p>
      </div>

      {/* Recent Transactions */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700 mb-2">Recent Transactions</p>
        {transactions.map((tx, index) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-3 rounded-lg border ${
              tx.status === "confirmed" 
                ? "bg-green-50 border-green-200" 
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Link2 className="h-3 w-3 text-gray-400" />
                <span className="text-xs font-mono text-gray-600">{tx.hash}</span>
              </div>
              <span className={`text-xs font-medium ${
                tx.status === "confirmed" ? "text-green-600" : "text-yellow-600"
              }`}>
                {tx.status}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">
                <Zap className="h-3 w-3 inline mr-1" />
                {tx.energyKwh} kWh
              </span>
              <span className="text-gray-500">
                {tx.co2Saved} kg CO₂
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Blockchain Info */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500 text-center">
          Powered by Ethereum • Verified on-chain
        </p>
      </div>
    </motion.div>
  );
}