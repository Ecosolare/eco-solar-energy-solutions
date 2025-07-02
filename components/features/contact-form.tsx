import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2, CheckCircle } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().max(0, "Bot detected"), // Anti-spam field
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const serviceOptions = [
  { value: "residential-solar", label: "Residential Solar Installation" },
  { value: "commercial-solar", label: "Commercial Solar Solutions" },
  { value: "ev-charging", label: "EV Charging Installation" },
  { value: "energy-storage", label: "Energy Storage Systems" },
  { value: "maintenance", label: "Maintenance & Support" },
  { value: "consultation", label: "Free Consultation" },
  { value: "general", label: "General Inquiry" }
];

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
      honeypot: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate form submission delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real application, this would submit to your backend
      console.log("Form submission data:", data);
      
      // Show success message
      setIsSubmitted(true);
      form.reset();
      
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for your inquiry. We'll contact you within 24 hours.",
      });
      
      // Reset success state after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
      
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-neural-pulse">
          <CheckCircle className="text-white" size={32} />
        </div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">
          Thank You!
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Your message has been sent successfully. Our team will contact you within 24 hours 
          to discuss your renewable energy needs.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-slate-600 dark:text-slate-400">Message Received</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-[hsl(var(--quantum-500))] rounded-full"></div>
            <span className="text-slate-600 dark:text-slate-400">Expert Review</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-[hsl(var(--cyber-500))] rounded-full"></div>
            <span className="text-slate-600 dark:text-slate-400">24hr Response</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* Name Field */}
      <div>
        <Label htmlFor="name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Full Name *
        </Label>
        <Input
          id="name"
          {...form.register("name")}
          placeholder="Enter your full name"
          className="w-full focus:ring-[hsl(var(--quantum-500))] focus:border-[hsl(var(--quantum-500))]"
        />
        {form.formState.errors.name && (
          <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <Label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Email Address *
        </Label>
        <Input
          id="email"
          type="email"
          {...form.register("email")}
          placeholder="Enter your email address"
          className="w-full focus:ring-[hsl(var(--quantum-500))] focus:border-[hsl(var(--quantum-500))]"
        />
        {form.formState.errors.email && (
          <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <Label htmlFor="phone" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Phone Number (Optional)
        </Label>
        <Input
          id="phone"
          type="tel"
          {...form.register("phone")}
          placeholder="Enter your phone number"
          className="w-full focus:ring-[hsl(var(--quantum-500))] focus:border-[hsl(var(--quantum-500))]"
        />
      </div>

      {/* Service Interest */}
      <div>
        <Label htmlFor="service" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Service Interest *
        </Label>
        <Select value={form.watch("service")} onValueChange={(value) => form.setValue("service", value)}>
          <SelectTrigger className="w-full focus:ring-[hsl(var(--quantum-500))] focus:border-[hsl(var(--quantum-500))]">
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            {serviceOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {form.formState.errors.service && (
          <p className="text-red-500 text-sm mt-1">{form.formState.errors.service.message}</p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <Label htmlFor="message" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Message *
        </Label>
        <Textarea
          id="message"
          {...form.register("message")}
          rows={4}
          placeholder="Tell us about your project or ask any questions..."
          className="w-full resize-none focus:ring-[hsl(var(--quantum-500))] focus:border-[hsl(var(--quantum-500))]"
        />
        {form.formState.errors.message && (
          <p className="text-red-500 text-sm mt-1">{form.formState.errors.message.message}</p>
        )}
      </div>

      {/* Honeypot - Anti-spam */}
      <div className="hidden">
        <Input
          {...form.register("honeypot")}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-[hsl(var(--quantum-500))] to-[hsl(var(--cyber-500))] text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300 animate-glow"
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Sending Message...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <Send className="h-5 w-5" />
            <span>Send Message</span>
          </div>
        )}
      </Button>

      {/* Form Info */}
      <div className="text-center">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          By submitting this form, you agree to our privacy policy. We respect your privacy and will never share your information.
        </p>
      </div>
    </form>
  );
}
