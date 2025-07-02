import { Link } from "wouter";
import { AppleLogo } from "@/components/apple-logo";
import { Globe, ChevronDown } from "lucide-react";
import { useState } from "react";

export function Footer() {
  const [showRegionSelector, setShowRegionSelector] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  const footerLinks = {
    Services: [
      { name: "Solar Panel Installation", href: "/solar-solutions" },
      { name: "EV Charging Stations", href: "/ev-charging" },
      { name: "Battery Storage", href: "/services" },
      { name: "Energy Monitoring", href: "/services" },
    ],
    Company: [
      { name: "About Us", href: "/learn" },
      { name: "Projects", href: "/projects" },
      { name: "News", href: "/learn" },
      { name: "Careers", href: "/contact" },
    ],
    Support: [
      { name: "Contact Us", href: "/contact" },
      { name: "Help Center", href: "/learn" },
      { name: "Installation Guide", href: "/learn" },
      { name: "Warranty", href: "/learn" },
    ],
    Legal: [
      { name: "Privacy Policy", href: "/contact" },
      { name: "Terms of Service", href: "/contact" },
      { name: "Cookie Policy", href: "/contact" },
      { name: "Accessibility", href: "/contact" },
    ],
  };

  const regions = [
    { name: "United Kingdom", code: "GB", flag: "🇬🇧" },
    { name: "Ireland", code: "IE", flag: "🇮🇪" },
    { name: "Northern Ireland", code: "NI", flag: "🏴󠁧󠁢󠁮󠁩󠁲󠁿" },
  ];

  const languages = [
    { name: "English", code: "en", flag: "🇬🇧" },
    { name: "Gaeilge", code: "ga", flag: "🇮🇪" },
    { name: "Cymraeg", code: "cy", flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿" },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16">
          {/* Logo and description */}
          <div className="mb-12">
            <AppleLogo className="mb-4" />
            <p className="text-body max-w-md text-gray-600">
              Leading the UK's renewable energy revolution with premium solar solutions 
              and EV charging infrastructure. Powering a sustainable future, one home at a time.
            </p>
          </div>

          {/* Footer links grid */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-headline text-sm font-semibold text-gray-900 mb-4">
                  {category}
                </h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-body text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom section with region/language selectors */}
        <div className="border-t border-gray-200 py-6">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            {/* Copyright */}
            <div className="text-body text-sm text-gray-600">
              © {new Date().getFullYear()} Eco Solar Energy Solutions. All rights reserved.
            </div>

            {/* Region and Language Selectors */}
            <div className="region-selector">
              {/* Region Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowRegionSelector(!showRegionSelector)}
                  className="flex items-center space-x-1 rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-gray-100"
                >
                  <Globe className="h-4 w-4" />
                  <span>United Kingdom</span>
                  <ChevronDown className="h-3 w-3" />
                </button>
                
                {showRegionSelector && (
                  <div className="absolute bottom-full right-0 mb-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    {regions.map((region) => (
                      <button
                        key={region.code}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        onClick={() => setShowRegionSelector(false)}
                      >
                        <span className="text-lg">{region.flag}</span>
                        <span>{region.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                  className="flex items-center space-x-1 rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-gray-100"
                >
                  <span>🇬🇧</span>
                  <span>English</span>
                  <ChevronDown className="h-3 w-3" />
                </button>
                
                {showLanguageSelector && (
                  <div className="absolute bottom-full right-0 mb-2 w-36 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        onClick={() => setShowLanguageSelector(false)}
                      >
                        <span className="text-lg">{language.flag}</span>
                        <span>{language.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}