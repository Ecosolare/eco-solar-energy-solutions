import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Search, Volume2, Zap } from "lucide-react";

interface VoiceSearchProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export function VoiceSearch({ onSearch, placeholder = "Try saying 'Book a consultation' or 'Solar calculator'" }: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-GB'; // UK English
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
            setConfidence(result[0].confidence);
          } else {
            interimTranscript += result[0].transcript;
          }
        }

        setTranscript(finalTranscript || interimTranscript);

        if (finalTranscript) {
          handleVoiceCommand(finalTranscript.trim());
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Voice command routing
    if (lowerCommand.includes('book') && (lowerCommand.includes('consultation') || lowerCommand.includes('appointment'))) {
      window.location.href = '/contact';
    } else if (lowerCommand.includes('solar') && lowerCommand.includes('calculator')) {
      window.location.href = '/solar-solutions';
    } else if (lowerCommand.includes('ev') && (lowerCommand.includes('charging') || lowerCommand.includes('charger'))) {
      window.location.href = '/ev-charging';
    } else if (lowerCommand.includes('ar') || lowerCommand.includes('vr') || lowerCommand.includes('experience')) {
      window.location.href = '/ar-vr-experience';
    } else if (lowerCommand.includes('blog') || lowerCommand.includes('news')) {
      window.location.href = '/blog';
    } else if (lowerCommand.includes('project') || lowerCommand.includes('portfolio')) {
      window.location.href = '/projects';
    } else if (lowerCommand.includes('learn') || lowerCommand.includes('education')) {
      window.location.href = '/learn';
    } else if (onSearch) {
      onSearch(command);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && isSupported) {
      setTranscript("");
      setConfidence(0);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  if (!isSupported) {
    return null; // Don't show if not supported
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-lg">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Volume2 className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-900">Voice Search</span>
          </div>
          <p className="text-xs text-gray-600">
            {transcript || placeholder}
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={isListening ? stopListening : startListening}
          className={`p-3 rounded-xl transition-all duration-200 ${
            isListening 
              ? "bg-red-500 text-white shadow-lg animate-pulse" 
              : "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
          }`}
        >
          {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </motion.button>
      </div>

      {/* Confidence indicator */}
      <AnimatePresence>
        {transcript && confidence > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full mt-2 left-0 right-0 p-2 bg-green-50 border border-green-200 rounded-lg"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="text-green-700">Recognition confidence</span>
              <span className="font-medium text-green-800">
                {Math.round(confidence * 100)}%
              </span>
            </div>
            <div className="w-full bg-green-200 rounded-full h-1 mt-1">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${confidence * 100}%` }}
                className="bg-green-600 h-1 rounded-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Listening animation */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 -m-2 pointer-events-none"
          >
            <div className="absolute inset-0 bg-blue-500/20 rounded-3xl animate-pulse" />
            <div className="absolute inset-2 bg-blue-500/10 rounded-2xl animate-pulse animation-delay-150" />
            <div className="absolute inset-4 bg-blue-500/5 rounded-xl animate-pulse animation-delay-300" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}