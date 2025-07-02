import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle,
  MapPin,
  Home,
  Zap,
  Calculator,
  ChevronRight
} from "lucide-react";

interface AssistantStep {
  id: number;
  question: string;
  type: 'text' | 'select' | 'number';
  options?: string[];
  placeholder?: string;
  required: boolean;
}

const assistantSteps: AssistantStep[] = [
  {
    id: 1,
    question: "What's your postcode? This helps us provide accurate local information.",
    type: 'text',
    placeholder: 'e.g. SW1A 1AA',
    required: true
  },
  {
    id: 2,
    question: "Do you have a south-facing roof? This affects solar panel efficiency.",
    type: 'select',
    options: ['Yes, fully south-facing', 'Partly south-facing', 'East/West facing', 'North-facing', 'Not sure'],
    required: true
  },
  {
    id: 3,
    question: "What's your approximate monthly electricity bill?",
    type: 'select',
    options: ['Under £50', '£50-£100', '£100-£150', '£150-£200', '£200-£300', 'Over £300'],
    required: true
  },
  {
    id: 4,
    question: "What type of property do you live in?",
    type: 'select',
    options: ['Detached house', 'Semi-detached house', 'Terraced house', 'Bungalow', 'Flat/Apartment', 'Other'],
    required: true
  },
  {
    id: 5,
    question: "Are you interested in battery storage alongside solar panels?",
    type: 'select',
    options: ['Yes, very interested', 'Maybe, tell me more', 'No, just solar panels', 'Not sure yet'],
    required: true
  }
];

export function SmartContactAssistant() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [estimatedSavings, setEstimatedSavings] = useState<number | null>(null);

  const handleAnswer = (stepId: number, answer: string) => {
    setAnswers(prev => ({ ...prev, [stepId]: answer }));
  };

  const nextStep = () => {
    if (currentStep < assistantSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Calculate estimated savings based on answers
      const billRange = answers[3];
      let savings = 0;
      
      if (billRange?.includes('Under £50')) savings = 600;
      else if (billRange?.includes('£50-£100')) savings = 900;
      else if (billRange?.includes('£100-£150')) savings = 1200;
      else if (billRange?.includes('£150-£200')) savings = 1500;
      else if (billRange?.includes('£200-£300')) savings = 1800;
      else if (billRange?.includes('Over £300')) savings = 2200;
      
      // Adjust based on roof orientation
      const roofOrientation = answers[2];
      if (roofOrientation?.includes('fully south-facing')) savings *= 1.0;
      else if (roofOrientation?.includes('Partly south-facing')) savings *= 0.85;
      else if (roofOrientation?.includes('East/West')) savings *= 0.75;
      else if (roofOrientation?.includes('North-facing')) savings *= 0.6;
      
      setEstimatedSavings(Math.round(savings));
      setIsComplete(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsComplete(false);
    setEstimatedSavings(null);
  };

  const submitResults = () => {
    // In a real app, this would send to info.ecosolare@gmail.com
    const emailData = {
      postcode: answers[1],
      roofOrientation: answers[2],
      monthlyBill: answers[3],
      propertyType: answers[4],
      batteryInterest: answers[5],
      estimatedSavings
    };
    
    console.log('Submitting consultation request:', emailData);
    
    // Show success message
    alert('Thank you! Your consultation request has been sent. We\'ll contact you within 24 hours.');
  };

  if (isComplete) {
    return (
      <Card className="tesla-card max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="text-green-500" size={24} />
            Your Personalized Solar Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 text-center">
            <h3 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-2">
              Estimated Annual Savings
            </h3>
            <div className="text-4xl font-bold text-green-600 dark:text-green-400">
              £{estimatedSavings?.toLocaleString()}
            </div>
            <p className="text-sm text-green-600 dark:text-green-300 mt-2">
              Based on your current energy usage and roof suitability
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Your Details:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Postcode:</span>
                <span className="font-medium">{answers[1]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Roof:</span>
                <span className="font-medium">{answers[2]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monthly Bill:</span>
                <span className="font-medium">{answers[3]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Property:</span>
                <span className="font-medium">{answers[4]}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={submitResults} className="tesla-button flex-1">
              <MessageSquare className="mr-2 h-4 w-4" />
              Book Free Consultation
            </Button>
            <Button onClick={reset} variant="outline" className="flex-1">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Start Again
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Our certified engineers will contact you within 24 hours to arrange your free home assessment.
          </div>
        </CardContent>
      </Card>
    );
  }

  const step = assistantSteps[currentStep];
  const currentAnswer = answers[step.id];
  const progress = ((currentStep + 1) / assistantSteps.length) * 100;

  return (
    <Card className="tesla-card max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="text-blue-500" size={24} />
            Smart Solar Assessment
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            Step {currentStep + 1} of {assistantSteps.length}
          </Badge>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium leading-relaxed">
            {step.question}
          </h3>

          {step.type === 'text' && (
            <Input
              value={currentAnswer || ''}
              onChange={(e) => handleAnswer(step.id, e.target.value)}
              placeholder={step.placeholder}
              className="text-lg p-3"
            />
          )}

          {step.type === 'select' && (
            <div className="space-y-2">
              {step.options?.map((option, index) => (
                <Button
                  key={index}
                  variant={currentAnswer === option ? "default" : "outline"}
                  className={`w-full justify-start text-left h-auto py-3 px-4 ${
                    currentAnswer === option ? "tesla-button" : ""
                  }`}
                  onClick={() => handleAnswer(step.id, option)}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{option}</span>
                    {currentAnswer === option && <CheckCircle size={16} />}
                  </div>
                </Button>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <Button
            onClick={prevStep}
            variant="outline"
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Previous
          </Button>

          <Button
            onClick={nextStep}
            disabled={!currentAnswer && step.required}
            className="tesla-button flex items-center gap-2"
          >
            {currentStep === assistantSteps.length - 1 ? (
              <>
                <Calculator size={16} />
                Calculate Savings
              </>
            ) : (
              <>
                Next
                <ArrowRight size={16} />
              </>
            )}
          </Button>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          💡 This assessment takes under 2 minutes and provides personalized solar savings estimates
        </div>
      </CardContent>
    </Card>
  );
}