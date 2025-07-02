import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Search } from "lucide-react";
import { AppleLogo } from "@/components/apple-logo";


export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [location] = useLocation();

  const navigation = [
    { 
      name: "Solar", 
      href: "/solar-solutions",
      dropdown: [
        { name: "Solar Panels", href: "/solar-solutions#panels" },
        { name: "Battery Storage", href: "/solar-solutions#battery" },
        { name: "Smart Inverters", href: "/solar-solutions#inverters" },
        { name: "Solar Calculator", href: "/solar-solutions#calculator" }
      ]
    },
    { 
      name: "Services", 
      href: "/services",
      dropdown: [
        { name: "Installation", href: "/services#installation" },
        { name: "Consultation", href: "/services#consultation" },
        { name: "Maintenance", href: "/services#maintenance" },
        { name: "Financing", href: "/services#financing" }
      ]
    },
    { 
      name: "EV Charging", 
      href: "/ev-charging",
      dropdown: [
        { name: "Home Chargers", href: "/ev-charging#home" },
        { name: "Commercial Solutions", href: "/ev-charging#commercial" },
        { name: "Charging Map", href: "/ev-charging#map" },
        { name: "Installation", href: "/ev-charging#installation" }
      ]
    },
    { 
      name: "Support", 
      href: "/learn",
      dropdown: [
        { name: "Contact Us", href: "/contact" },
        { name: "Learn Hub", href: "/learn" },
        { name: "FAQ", href: "/learn#faq" },
        { name: "Blog", href: "/blog" }
      ]
    },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100/50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <AppleLogo className="h-6 w-6" />
              </Link>
            </div>

            {/* Desktop Navigation - Apple Style */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <div key={item.name} className="relative">
                  <button
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className={`text-sm font-normal transition-all duration-200 ${
                      location === item.href
                        ? "text-black"
                        : "text-gray-700 hover:text-black"
                    }`}
                  >
                    <Link href={item.href}>{item.name}</Link>
                  </button>
                  
                  {/* Apple-style Dropdown */}
                  {activeDropdown === item.name && (
                    <div
                      className="absolute top-full left-1/2 transform -translate-x-1/2 pt-3"
                      onMouseEnter={() => setActiveDropdown(item.name)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 min-w-[200px]">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-3">
              {/* Search Button */}
              <button
                onClick={() => setShowSearch(true)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                aria-label="Search"
              >
                <Search className="h-4 w-4 text-gray-700" />
              </button>

              {/* Get Started CTA - Desktop */}
              <Link 
                href="/contact" 
                className="hidden sm:inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors duration-200"
              >
                Get Started
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                aria-label="Menu"
              >
                {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg">
            <div className="px-4 py-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-base font-normal text-gray-700 hover:text-black transition-colors duration-150"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="block py-2 text-base font-medium text-blue-600 hover:text-blue-700 transition-colors duration-150"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>


    </>
  );
}