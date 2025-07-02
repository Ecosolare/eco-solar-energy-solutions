import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Cpu, Wifi, Globe } from "lucide-react";

export function QuantumEnergyVisualizer() {
  const [particles, setParticles] = useState<Array<{id: number; x: number; y: number; speed: number}>>([]);
  const [energyFlow, setEnergyFlow] = useState(0);
  const [showVisualizer, setShowVisualizer] = useState(false);

  useEffect(() => {
    // Show after 5 minutes
    const timer = setTimeout(() => setShowVisualizer(true), 300000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showVisualizer) return;

    // Generate energy particles
    const particleInterval = setInterval(() => {
      setParticles(prev => {
        const newParticles = [...prev];
        if (newParticles.length < 20) {
          newParticles.push({
            id: Date.now(),
            x: Math.random() * 100,
            y: 100,
            speed: 1 + Math.random() * 2
          });
        }
        
        // Update positions
        return newParticles
          .map(p => ({ ...p, y: p.y - p.speed }))
          .filter(p => p.y > -10);
      });
      
      setEnergyFlow(prev => (prev + 1) % 100);
    }, 50);

    return () => clearInterval(particleInterval);
  }, [showVisualizer]);

  if (!showVisualizer) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-6 right-6 w-64 h-64 bg-black/90 backdrop-blur-xl rounded-2xl p-4 z-40"
    >
      <div className="relative h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-blue-400" />
            <span className="text-xs text-white font-medium">Quantum Energy Flow</span>
          </div>
          <button
            onClick={() => setShowVisualizer(false)}
            className="text-gray-400 hover:text-white text-xs"
          >
            ×
          </button>
        </div>

        {/* Energy Visualization */}
        <div className="relative h-40 bg-gradient-to-t from-blue-900/20 to-transparent rounded-lg overflow-hidden">
          {/* Grid Lines */}
          <div className="absolute inset-0">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full border-t border-blue-900/20"
                style={{ top: `${i * 10}%` }}
              />
            ))}
          </div>

          {/* Energy Particles */}
          {particles.map(particle => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-blue-400 rounded-full shadow-glow"
              style={{
                left: `${particle.x}%`,
                bottom: `${particle.y}%`
              }}
              animate={{
                opacity: [1, 0.5, 1],
                scale: [1, 1.5, 1]
              }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          ))}

          {/* Energy Wave */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
            animate={{
              x: ["-100%", "100%"]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* Real-time Stats */}
        <div className="mt-3 space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Energy Efficiency</span>
            <span className="text-green-400 font-mono">98.7%</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Quantum Optimization</span>
            <span className="text-blue-400 font-mono">{energyFlow}%</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Network Latency</span>
            <span className="text-yellow-400 font-mono">12ms</span>
          </div>
        </div>

        {/* Live Indicator */}
        <div className="absolute top-4 right-4 flex items-center gap-1">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-[10px] text-green-400">LIVE</span>
        </div>
      </div>
    </motion.div>
  );
}