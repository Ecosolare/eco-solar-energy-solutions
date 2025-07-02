import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { AppleLogo } from "@/components/apple-logo";
import { DynamicPricing } from "@/components/features/dynamic-pricing";
import { 
  Zap, 
  Calculator, 
  Calendar, 
  BatteryCharging, 
  CloudSun,
  Shield,
  Award,
  Users,
  MapPin,
  ArrowRight,
  PoundSterling,
  TrendingUp,
  Play
} from "lucide-react";

const heroStats = [
  { value: "50,247", label: "Satisfied Customers", icon: Users },
  { value: "£1,200+", label: "Average Savings", icon: PoundSterling },
  { value: "40,646", label: "EV Chargers", icon: BatteryCharging },
  { value: "95%", label: "UK Coverage", icon: MapPin }
];

const services = [
  {
    title: "Solar Panel Installation",
    description: "Premium solar solutions engineered for UK homes. Generate clean energy and reduce bills by up to 70%.",
    icon: CloudSun,
    href: "/solar-solutions",
    cta: "Calculate Savings"
  },
  {
    title: "EV Charging Stations", 
    description: "Access 40,646+ charging points across the UK. Find, navigate, and charge with confidence.",
    icon: BatteryCharging,
    href: "/ev-charging",
    cta: "Find Chargers"
  },
  {
    title: "Energy Storage",
    description: "Store solar energy for use anytime. Battery systems that power your home independently.",
    icon: Zap,
    href: "/services",
    cta: "Learn More"
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "Manchester",
    quote: "Eco Solar transformed our energy bills. We've saved £2,100 in the first year alone.",
    savings: "£2,100"
  },
  {
    name: "David Chen",
    location: "Bristol", 
    quote: "Professional installation and excellent customer service. Highly recommended.",
    savings: "£1,850"
  },
  {
    name: "Emma Williams",
    location: "Leeds",
    quote: "The solar calculator was spot-on. Our system performs exactly as predicted.",
    savings: "£1,950"
  }
];

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Ultra Premium Apple/Tesla Style */}
      <section className="hero-apple section-apple pt-24 relative overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 opacity-50" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* AI-Powered Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-8"
            >
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
              <span>AI-Powered Energy Solutions</span>
            </motion.div>
            
            {/* Hero Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-display text-5xl sm:text-6xl lg:text-7xl text-black mb-6"
            >
              The Future of Energy
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-green-600 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                Is Already Here
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-body text-xl text-gray-600 max-w-3xl mx-auto mb-12"
            >
              Revolutionary AI-driven solar and EV solutions. Real-time energy optimization. 
              <span className="font-semibold text-black"> Save £1,347+ annually</span> with predictive technology.
            </motion.p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link href="/solar-solutions" className="btn-apple-blue">
                Calculate Your Savings
                <Calculator className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/contact" className="btn-apple-secondary">
                Book Free Consultation
                <Calendar className="ml-2 h-4 w-4" />
              </Link>
            </div>

            {/* Hero Stats - Apple Style */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {heroStats.map((stat, index) => (
                <div key={index} className="stat-apple apple-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="mb-3">
                    <stat.icon className="h-8 w-8 text-blue-600 mx-auto" />
                  </div>
                  <div className="number">{stat.value}</div>
                  <div className="label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-apple bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display text-4xl lg:text-5xl text-black mb-4">
              Renewable Energy Solutions
            </h2>
            <p className="text-body text-xl text-gray-600 max-w-2xl mx-auto">
              Complete energy systems designed for modern UK homes. From solar panels to EV charging.
            </p>
          </div>

          <div className="feature-grid">
            {services.map((service, index) => (
              <div key={index} className="feature-card apple-scale-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="mb-6">
                  <service.icon className="h-12 w-12 text-blue-600" />
                </div>
                <h3 className="text-headline text-xl text-black mb-3">
                  {service.title}
                </h3>
                <p className="text-body text-gray-600 mb-6">
                  {service.description}
                </p>
                <Link href={service.href} className="btn-apple w-full">
                  {service.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-apple">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display text-4xl lg:text-5xl text-black mb-4">
              Trusted by UK Homeowners
            </h2>
            <p className="text-body text-xl text-gray-600">
              Real savings from real customers across the United Kingdom.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="card-apple text-center p-12">
              <div className="apple-fade-in-up">
                <p className="text-body text-2xl text-gray-900 mb-8 italic">
                  "{testimonials[currentTestimonial].quote}"
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <div>
                    <div className="text-headline font-semibold text-black">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-body text-gray-600">
                      {testimonials[currentTestimonial].location}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    {testimonials[currentTestimonial].savings} saved
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial indicators */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Pricing Section - Cutting-edge technology showcase */}
      <section className="py-20 bg-gray-50">
        <DynamicPricing />
      </section>

      {/* CTA Section */}
      <section className="section-apple bg-black text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-display text-4xl lg:text-5xl mb-6">
              Ready to Start Saving?
            </h2>
            <p className="text-body text-xl text-gray-300 max-w-2xl mx-auto mb-12">
              Get your free solar assessment and join thousands of UK homeowners 
              already saving with renewable energy.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/solar-solutions" className="btn-apple-blue">
                Calculate Your Savings
                <Calculator className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/contact" className="btn-apple-secondary">
                Book Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}