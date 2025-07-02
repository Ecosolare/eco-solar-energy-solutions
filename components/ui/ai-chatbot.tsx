import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { QuantumCard } from "@/components/ui/quantum-card";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User,
  Loader2,
  Sparkles
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hello! I'm your AI energy assistant. I can help you with questions about solar installations, EV charging, costs, and more. How can I assist you today?",
    sender: "bot",
    timestamp: new Date()
  }
];

const quickQuestions = [
  "How does solar work?",
  "EV charging in London?", 
  "Solar grants in 2025?",
  "Calculate my savings",
  "Installation timeframe?"
];

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const simulateTyping = async (response: string) => {
    setIsTyping(true);
    
    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newMessage: Message = {
      id: Date.now().toString(),
      content: response,
      sender: "bot",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setIsTyping(false);
  };

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes("solar") && input.includes("work")) {
      return "Solar panels convert sunlight into electricity using photovoltaic cells. When sunlight hits the panels, it creates an electric current that's converted from DC to AC power for your home. Any excess energy can be stored in batteries or fed back to the grid. Would you like to know about installation costs or savings?";
    }
    
    if (input.includes("ev") || input.includes("charging") || input.includes("london")) {
      return "London has over 5,000 public EV charging points! Our platform shows real-time availability across the city. We cover slow (7kW), fast (22kW), rapid (50kW) and ultra-rapid (150kW+) chargers. I can help you find the nearest station or plan a route. What's your location?";
    }
    
    if (input.includes("grant") || input.includes("2025") || input.includes("incentive")) {
      return "Great news! Several grants are available in 2025: the ECO4 scheme for qualifying households, 0% VAT on solar installations, and the Smart Export Guarantee for selling excess energy back. Local councils may offer additional support. Would you like me to check what you might qualify for?";
    }
    
    if (input.includes("cost") || input.includes("price") || input.includes("saving")) {
      return "Solar installation costs vary based on your property size and energy needs. Typical residential systems range from £4,000-£12,000. Most customers save £800-£1,500 annually on energy bills. Our AI calculator can give you a personalized quote in 60 seconds. Shall I help you calculate your potential savings?";
    }
    
    if (input.includes("time") || input.includes("install") || input.includes("long")) {
      return "Most residential solar installations take 1-2 days to complete. The full process from consultation to activation typically takes 4-8 weeks, including design, permits, and grid connection. EV charger installations usually take 2-4 hours. Would you like to book a free consultation?";
    }
    
    if (input.includes("battery") || input.includes("storage")) {
      return "Battery storage is excellent for maximizing your solar investment! It stores excess energy for use at night or during cloudy days. Popular options include Tesla Powerwall (13.5kWh) and LG Chem batteries. Costs range from £6,000-£15,000. Storage can increase your energy independence by 70-90%. Interested in a quote?";
    }
    
    // Default responses for unclear queries
    const defaultResponses = [
      "I'd be happy to help! Could you tell me more about what you're looking for? I can assist with solar installations, EV charging, costs, grants, or technical questions.",
      "That's a great question! I specialize in renewable energy solutions across the UK. Are you interested in solar panels, EV charging infrastructure, or energy storage systems?",
      "I'm here to help with all your clean energy questions! Whether it's about solar savings, charging station locations, or installation processes, just let me know what you'd like to explore."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    
    const response = getAIResponse(inputValue);
    await simulateTyping(response);
  };

  const handleQuickQuestion = async (question: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: question,
      sender: "user", 
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    const response = getAIResponse(question);
    await simulateTyping(response);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-[hsl(var(--quantum-500))] to-[hsl(var(--cyber-500))] text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 animate-glow z-50 ${
          isOpen ? "hidden" : "flex"
        } items-center justify-center`}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] z-50 animate-in slide-in-from-bottom-4 duration-300">
          <QuantumCard className="h-full flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-[hsl(var(--quantum-500))] to-[hsl(var(--cyber-500))] rounded-full flex items-center justify-center animate-neural-pulse">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-100">AI Energy Assistant</h3>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-slate-500">Online</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-[hsl(var(--quantum-500))] to-[hsl(var(--cyber-500))] text-white"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.sender === "bot" && (
                          <Sparkles className="h-4 w-4 mt-0.5 text-[hsl(var(--quantum-500))]" />
                        )}
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin text-[hsl(var(--quantum-500))]" />
                        <span className="text-sm text-slate-600 dark:text-slate-400">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Quick Questions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-slate-500 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.slice(0, 3).map((question) => (
                    <Button
                      key={question}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickQuestion(question)}
                      className="text-xs rounded-full h-7 px-3 border-[hsl(var(--quantum-500))]/30 text-[hsl(var(--quantum-600))] dark:text-[hsl(var(--quantum-400))] hover:bg-[hsl(var(--quantum-500))]/10 dark:hover:bg-[hsl(var(--quantum-500))]/20 hover:text-[hsl(var(--quantum-700))] dark:hover:text-[hsl(var(--quantum-300))]"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-700">
              <div className="flex space-x-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about solar, EV charging, costs..."
                  className="flex-1 rounded-full border-slate-300 dark:border-slate-600 focus:border-[hsl(var(--quantum-500))] focus:ring-[hsl(var(--quantum-500))]"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-gradient-to-r from-[hsl(var(--quantum-500))] to-[hsl(var(--cyber-500))] text-white dark:text-white rounded-full px-4 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4 text-white" />
                </Button>
              </div>
            </div>
          </QuantumCard>
        </div>
      )}
    </>
  );
}
