export const COMPANY_INFO = {
  name: "Eco Solar Energy Solutions",
  tagline: "Powering the UK with Clean Solar & EV Energy",
  email: "info@ecosolarenergys.com", 
  phone: "+44 7425 705531",
  website: "https://ecosolarenergysolutions.uk",
  address: "United Kingdom Wide",
  businessHours: "Mon-Fri: 8:00 AM - 6:00 PM / but 24/7 Help via chat",
} as const;

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/ecosolare.solutions",
  tiktok: "https://tiktok.com/@ecosolare.solutions", 
  facebook: "https://facebook.com/ecosolare.solutions",
} as const;

export const STATS = {
  customersServed: "50,247",
  averageSavings: "£1,200+",
  evChargers: "40,646",
  ukCoverage: "95%",
  projectsCompleted: "156",
  totalCapacity: "47MW",
  annualSavings: "£2.8M",
  co2Saved: "18,500",
} as const;

export const SERVICES = {
  residential: {
    name: "Residential Solar",
    description: "Complete home solar solutions with battery storage options",
    startingPrice: "£4,999",
    features: [
      "Free design consultation",
      "MCS certified installation", 
      "25-year warranty",
      "Smart monitoring app"
    ]
  },
  commercial: {
    name: "Commercial Solar",
    description: "Large-scale solar installations for businesses",
    startingPrice: "£15,000", 
    features: [
      "Custom design & engineering",
      "Project management",
      "Grid connection support",
      "Performance guarantees"
    ]
  },
  storage: {
    name: "Battery Storage",
    description: "Energy storage solutions for maximum independence", 
    startingPrice: "£8,500",
    features: [
      "Tesla Powerwall certified",
      "Emergency backup power",
      "Time-of-use optimization", 
      "Smart energy management"
    ]
  },
  evCharging: {
    name: "EV Charging",
    description: "Electric vehicle charging station installations",
    startingPrice: "£750",
    features: [
      "Home & commercial options",
      "Smart charging features",
      "Government grant eligible",
      "Professional installation"
    ]
  }
} as const;

export const API_ENDPOINTS = {
  contact: "/api/contact",
  energyData: "/api/energy-data",
  evStations: "/api/ev-stations",
  solarCalculator: "/api/solar-calculator",
  projects: "/api/projects",
} as const;

export const FORM_VALIDATION = {
  name: {
    minLength: 2,
    maxLength: 100,
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  phone: {
    pattern: /^(\+44|0)[0-9\s-()]{9,}$/,
  },
  postcode: {
    pattern: /^[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}$/i,
  },
  message: {
    minLength: 10,
    maxLength: 1000,
  },
} as const;

export const THEME_CONFIG = {
  default: "light",
  storageKey: "eco-solar-theme",
} as const;

export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
  extraSlow: 1000,
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768, 
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;
