import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Smartphone, 
  Glasses, 
  RotateCw, 
  Play, 
  Pause, 
  Maximize2, 
  X, 
  Camera,
  Home,
  Car,
  Zap,
  Sun,
  Battery,
  Eye,
  Hand,
  Maximize
} from "lucide-react";

interface ARVRExperience {
  id: string;
  title: string;
  description: string;
  type: "ar" | "vr" | "3d";
  category: "solar" | "ev" | "home";
  duration: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  features: string[];
  thumbnail: string;
  demoVideo?: string;
  interactiveElements: string[];
  mobileOptimized: boolean;
}

export function ARVRShowcase() {
  const [selectedExperience, setSelectedExperience] = useState<ARVRExperience | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isARSupported, setIsARSupported] = useState(false);
  const [deviceOrientation, setDeviceOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 });
  const [is3DViewActive, setIs3DViewActive] = useState(false);
  const [currentRotation, setCurrentRotation] = useState({ x: 0, y: 0, z: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const experiences: ARVRExperience[] = [
    {
      id: "ar-solar-roof",
      title: "AR Solar Roof Visualizer",
      description: "See how solar panels would look on your actual roof using augmented reality",
      type: "ar",
      category: "solar",
      duration: "3-5 min",
      difficulty: "beginner",
      features: ["Real-time visualization", "Cost calculator", "Shadow analysis", "Panel optimization"],
      thumbnail: "🏠",
      interactiveElements: ["Tap to place panels", "Pinch to resize", "Drag to reposition", "Voice commands"],
      mobileOptimized: true
    },
    {
      id: "vr-solar-farm",
      title: "VR Solar Farm Tour",
      description: "Take a virtual tour of massive solar installations and learn how they work",
      type: "vr",
      category: "solar",
      duration: "10-15 min",
      difficulty: "intermediate",
      features: ["360° immersion", "Interactive components", "Technical details", "Efficiency metrics"],
      thumbnail: "☀️",
      interactiveElements: ["Look around", "Click to learn", "Hand gestures", "Voice narration"],
      mobileOptimized: true
    },
    {
      id: "3d-ev-charger",
      title: "3D EV Charger Designer",
      description: "Design and configure your perfect EV charging setup in 3D",
      type: "3d",
      category: "ev",
      duration: "5-8 min",
      difficulty: "intermediate",
      features: ["Custom configuration", "Real-time pricing", "Installation preview", "Compatibility check"],
      thumbnail: "🚗",
      interactiveElements: ["Rotate to view", "Tap to customize", "Swipe to change options", "Gesture controls"],
      mobileOptimized: true
    },
    {
      id: "ar-home-energy",
      title: "AR Home Energy Flow",
      description: "Visualize energy flow in your home with real-time AR overlays",
      type: "ar",
      category: "home",
      duration: "4-6 min",
      difficulty: "beginner",
      features: ["Energy visualization", "Real-time data", "Usage tracking", "Optimization tips"],
      thumbnail: "⚡",
      interactiveElements: ["Point camera at rooms", "Tap for details", "Voice questions", "Interactive meters"],
      mobileOptimized: true
    },
    {
      id: "vr-battery-storage",
      title: "VR Battery Storage Lab",
      description: "Explore advanced battery technology in a virtual laboratory environment",
      type: "vr",
      category: "home",
      duration: "8-12 min",
      difficulty: "advanced",
      features: ["Technical deep-dive", "Interactive experiments", "3D animations", "Expert commentary"],
      thumbnail: "🔋",
      interactiveElements: ["Hand tracking", "Object manipulation", "Voice commands", "Eye tracking"],
      mobileOptimized: true
    },
    {
      id: "3d-smart-grid",
      title: "3D Smart Grid Simulator",
      description: "Understand how smart grids work with interactive 3D visualization",
      type: "3d",
      category: "home",
      duration: "6-10 min",
      difficulty: "advanced",
      features: ["Grid simulation", "Real-time data", "Interactive controls", "Scenario testing"],
      thumbnail: "🌐",
      interactiveElements: ["Multi-touch controls", "Gesture navigation", "Voice commands", "Real-time updates"],
      mobileOptimized: true
    }
  ];

  useEffect(() => {
    // Detect mobile device
    setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    
    // Check AR support
    if ('xr' in navigator) {
      (navigator as any).xr.isSessionSupported('immersive-ar').then((supported: boolean) => {
        setIsARSupported(supported);
      });
    }

    // Device orientation for mobile 3D experiences
    if (isMobile) {
      const handleOrientation = (event: DeviceOrientationEvent) => {
        setDeviceOrientation({
          alpha: event.alpha || 0,
          beta: event.beta || 0,
          gamma: event.gamma || 0
        });
      };

      window.addEventListener('deviceorientation', handleOrientation);
      return () => window.removeEventListener('deviceorientation', handleOrientation);
    }
  }, [isMobile]);

  const startARExperience = (experience: ARVRExperience) => {
    setIsLoading(true);
    setSelectedExperience(experience);
    
    if (experience.type === 'ar' && isARSupported) {
      // Start WebXR AR session
      if ('xr' in navigator) {
        (navigator as any).xr.requestSession('immersive-ar', {
          requiredFeatures: ['hit-test'],
          optionalFeatures: ['dom-overlay']
        }).then((session: any) => {
          // AR session logic here
          console.log('AR session started');
          setIsLoading(false);
        }).catch(() => {
          // Fallback to camera-based AR
          startCameraAR(experience);
        });
      }
    } else {
      // Fallback experience
      start3DExperience(experience);
    }
  };

  const startCameraAR = (experience: ARVRExperience) => {
    // Request camera permission and start camera-based AR
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then((stream) => {
        // Camera AR implementation
        console.log('Camera AR started');
        setIsLoading(false);
      })
      .catch(() => {
        // Fallback to 3D experience
        start3DExperience(experience);
      });
  };

  const start3DExperience = (experience: ARVRExperience) => {
    setIs3DViewActive(true);
    setIsLoading(false);
    
    // Initialize 3D canvas if needed
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Simple 3D rendering for demo
        const animate = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          // Draw 3D-like solar panel or EV charger
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          
          // Apply device orientation for mobile
          const rotX = isMobile ? deviceOrientation.beta * 0.01 : currentRotation.x;
          const rotY = isMobile ? deviceOrientation.gamma * 0.01 : currentRotation.y;
          
          // Simple 3D cube representing the experience
          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.rotate(rotY);
          
          // Draw 3D object based on experience type
          if (experience.category === 'solar') {
            // Solar panel
            ctx.fillStyle = '#1e40af';
            ctx.fillRect(-60, -40, 120, 80);
            ctx.fillStyle = '#3b82f6';
            ctx.fillRect(-50, -30, 100, 60);
          } else if (experience.category === 'ev') {
            // EV charger
            ctx.fillStyle = '#059669';
            ctx.fillRect(-30, -60, 60, 120);
            ctx.fillStyle = '#10b981';
            ctx.fillRect(-25, -50, 50, 100);
          }
          
          ctx.restore();
          
          if (is3DViewActive) {
            requestAnimationFrame(animate);
          }
        };
        
        animate();
      }
    }
  };

  const ExperienceCard = ({ experience }: { experience: ARVRExperience }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-apple group hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={() => startARExperience(experience)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-4xl">{experience.thumbnail}</div>
        <div className="flex items-center gap-2">
          {experience.type === 'ar' && <Smartphone className="h-4 w-4 text-blue-600" />}
          {experience.type === 'vr' && <Glasses className="h-4 w-4 text-purple-600" />}
          {experience.type === '3d' && <RotateCw className="h-4 w-4 text-green-600" />}
          <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
            experience.mobileOptimized ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
          }`}>
            {experience.mobileOptimized ? 'Mobile Ready' : 'Desktop Only'}
          </span>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-black mb-2 group-hover:text-blue-600 transition-colors">
        {experience.title}
      </h3>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {experience.description}
      </p>
      
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-gray-500">{experience.duration}</span>
        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
          experience.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
          experience.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
          'bg-red-100 text-red-700'
        }`}>
          {experience.difficulty}
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        <h4 className="text-xs font-medium text-gray-900">Interactive Features:</h4>
        <div className="flex flex-wrap gap-1">
          {experience.interactiveElements.slice(0, 2).map((element, index) => (
            <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
              {element}
            </span>
          ))}
          {experience.interactiveElements.length > 2 && (
            <span className="text-xs text-gray-500">+{experience.interactiveElements.length - 2} more</span>
          )}
        </div>
      </div>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full btn-apple-blue text-sm py-2 flex items-center justify-center gap-2"
      >
        <Play className="h-4 w-4" />
        <span>Start Experience</span>
      </motion.button>
    </motion.div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-display text-3xl md:text-4xl font-bold text-black mb-4"
        >
          Interactive AR/VR Experiences
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-body text-lg text-gray-600 max-w-2xl mx-auto mb-8"
        >
          Explore renewable energy solutions through cutting-edge augmented and virtual reality. 
          Optimized for both desktop and mobile devices.
        </motion.p>
        
        {/* Capability Indicators */}
        <div className="flex justify-center gap-4 mb-8">
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
            isARSupported ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
          }`}>
            <Camera className="h-4 w-4" />
            <span className="text-sm font-medium">AR {isARSupported ? 'Supported' : 'Limited'}</span>
          </div>
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
            isMobile ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
          }`}>
            {isMobile ? <Smartphone className="h-4 w-4" /> : <Glasses className="h-4 w-4" />}
            <span className="text-sm font-medium">{isMobile ? 'Mobile Device' : 'Desktop Device'}</span>
          </div>
        </div>
      </div>

      {/* Experience Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {experiences.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>

      {/* Active Experience Modal */}
      <AnimatePresence>
        {selectedExperience && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setSelectedExperience(null);
              setIs3DViewActive(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-black">{selectedExperience.title}</h3>
                <button
                  onClick={() => {
                    setSelectedExperience(null);
                    setIs3DViewActive(false);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* 3D Canvas */}
              <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 mb-6">
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={400}
                  className="w-full max-w-lg mx-auto rounded-lg bg-white shadow-lg"
                  style={{ aspectRatio: '3/2' }}
                />
                
                {/* Touch Controls for Mobile */}
                {isMobile && (
                  <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
                      Tilt device to rotate
                    </div>
                  </div>
                )}

                {/* Desktop Controls */}
                {!isMobile && (
                  <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2">
                    <button
                      className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
                      onMouseDown={() => setCurrentRotation(prev => ({ ...prev, y: prev.y - 0.1 }))}
                    >
                      <RotateCw className="h-4 w-4" />
                    </button>
                    <button
                      className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
                      onClick={() => setCurrentRotation({ x: 0, y: 0, z: 0 })}
                    >
                      <Maximize className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Experience Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-black mb-3">Interactive Elements</h4>
                  <div className="space-y-2">
                    {selectedExperience.interactiveElements.map((element, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <Hand className="h-3 w-3 text-blue-600" />
                        <span>{element}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-black mb-3">Features</h4>
                  <div className="space-y-2">
                    {selectedExperience.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <Eye className="h-3 w-3 text-green-600" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {isLoading && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-sm text-gray-600">Loading {selectedExperience.type.toUpperCase()} experience...</p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Instructions */}
      {isMobile && (
        <div className="bg-blue-50 rounded-xl p-6 text-center">
          <Smartphone className="h-8 w-8 text-blue-600 mx-auto mb-4" />
          <h3 className="font-semibold text-black mb-2">Mobile Optimized Experiences</h3>
          <p className="text-sm text-gray-600 mb-4">
            All experiences are optimized for mobile devices with touch controls, device orientation, and AR camera support.
          </p>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="bg-white rounded-lg p-3">
              <strong>Touch Controls</strong><br />
              Tap, pinch, swipe to interact
            </div>
            <div className="bg-white rounded-lg p-3">
              <strong>Device Tilt</strong><br />
              Rotate device for 3D view
            </div>
          </div>
        </div>
      )}
    </div>
  );
}