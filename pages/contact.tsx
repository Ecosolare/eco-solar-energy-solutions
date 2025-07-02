import { ContactForm } from "@/components/features/contact-form";
import { SmartContactAssistant } from "@/components/features/smart-contact-assistant";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare,
  Calendar,
  Star,
  TrendingUp,
  Instagram,
  Facebook
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "info@ecosolarenergys.com",
    href: "mailto:info@ecosolarenergys.com",
    color: "from-blue-500 to-green-500"
  },
  {
    icon: Phone, 
    title: "Phone",
    value: "+44 7425 705531",
    href: "tel:+447425705531",
    color: "from-blue-600 to-blue-500"
  },
  {
    icon: SiWhatsapp,
    title: "WhatsApp",
    value: "+44 7425 705531", 
    href: "https://wa.me/447425705531?text=Hi%2C%20I%27m%20interested%20in%20your%20renewable%20energy%20solutions",
    color: "from-green-500 to-green-600"
  },
  {
    icon: MapPin,
    title: "Service Area", 
    value: "United Kingdom Wide",
    href: null,
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: Clock,
    title: "Business Hours",
    value: "Mon-Fri: 8:00 AM - 6:00 PM / but 24/7 Help via chat",
    href: null,
    color: "from-yellow-500 to-orange-500"
  }
];

const whyChooseUs = [
  { label: "Response Time", value: "< 24 hours", color: "text-blue-600" },
  { label: "Customer Satisfaction", value: "98.5%", color: "text-green-500" },
  { label: "Years of Experience", value: "10+", color: "text-blue-600" },
  { label: "Warranty Coverage", value: "25 years", color: "text-purple-600" }
];

const socialLinks = [
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com/ecosolare.solutions",
    color: "hover:from-pink-500 hover:to-red-500"
  },
  {
    name: "TikTok", 
    icon: MessageSquare,
    href: "https://tiktok.com/@ecosolare.solutions",
    color: "hover:bg-slate-700"
  },
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://facebook.com/ecosolare.solutions", 
    color: "hover:bg-blue-600"
  }
];

export default function Contact() {
  return (
    <div className="pt-32 pb-20">
      {/* Hero Section */}
      <section className="mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-display text-4xl md:text-6xl mb-6 text-black">
              Get In Touch
            </h1>
            <p className="text-body text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Ready to transform your energy future? Contact our expert team for a 
              <span className="font-bold text-blue-600"> personalized consultation</span> and discover how much you can save with renewable energy.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contactInfo.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="card-apple group hover:shadow-lg transition-all duration-300">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${item.color} mb-4`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-black mb-2">{item.title}</h3>
                  {item.href ? (
                    <a 
                      href={item.href}
                      className="text-gray-600 hover:text-blue-600 transition-colors duration-200 break-words"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-gray-600 break-words">{item.value}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-apple">
            <h2 className="text-display text-2xl font-bold text-black mb-8 text-center">Why Choose Eco Solar Energy Solutions?</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {whyChooseUs.map((item, index) => (
                <div key={index} className="text-center">
                  <div className={`text-3xl font-bold ${item.color} mb-2`}>
                    {item.value}
                  </div>
                  <div className="text-sm text-gray-600">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Smart Assistant */}
            <div className="card-apple">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-black">Smart Assessment Assistant</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Get personalized recommendations through our intelligent questionnaire system.
              </p>
              <SmartContactAssistant />
            </div>

            {/* Traditional Contact Form */}
            <div className="card-apple">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Mail className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-black">Direct Contact Form</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Prefer a traditional approach? Fill out our contact form and we'll get back to you within 24 hours.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-apple bg-black text-white text-center">
            <h2 className="text-display text-2xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-gray-300 mb-8">
              Choose the option that works best for you
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="btn-apple-blue w-full">
                <Calendar className="mr-2 h-4 w-4" />
                Book Free Consultation
              </button>
              <a 
                href="tel:+447425705531" 
                className="btn-apple-secondary w-full inline-flex items-center justify-center"
              >
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </a>
              <a 
                href="https://wa.me/447425705531?text=Hi%2C%20I%27m%20interested%20in%20your%20renewable%20energy%20solutions"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 inline-flex items-center justify-center"
              >
                <SiWhatsapp className="mr-2 h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-apple text-center">
            <h2 className="text-display text-xl font-bold text-black mb-6">Follow Us on Social Media</h2>
            <div className="flex justify-center space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all duration-200 ${social.color}`}
                  >
                    <IconComponent className="h-5 w-5 text-gray-700" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}