import { useState } from "react";
import { cn } from "@/lib/utils";

interface ModernLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "navbar" | "footer" | "hero" | "inline";
  showText?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "h-8",
  md: "h-10", 
  lg: "h-12",
  xl: "h-16"
};

const textSizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg", 
  xl: "text-xl"
};

export function ModernLogo({ 
  size = "md", 
  variant = "navbar", 
  showText = true, 
  className 
}: ModernLogoProps) {
  const [imageError, setImageError] = useState(false);
  
  const logoClasses = cn(
    sizeClasses[size],
    "w-auto object-contain transition-all duration-300",
    {
      "hover:scale-105": variant === "navbar" || variant === "inline",
      "hover:brightness-110": variant === "footer",
      "drop-shadow-lg": variant === "hero",
    },
    className
  );

  const containerClasses = cn(
    "flex items-center gap-3 group",
    {
      "cursor-pointer": variant === "navbar" || variant === "inline",
    }
  );

  const textClasses = cn(
    "font-bold transition-colors duration-300",
    textSizeClasses[size],
    {
      "text-foreground group-hover:text-primary": variant === "navbar",
      "text-white": variant === "footer",
      "text-foreground": variant === "hero" || variant === "inline",
    }
  );

  if (!showText) {
    return (
      <div className={cn("relative", className)}>
        {!imageError ? (
          <>
            <img 
              src="/logo-light.jpg" 
              alt="Eco Solar Energy Solutions"
              className={cn(logoClasses, "dark:hidden")}
              onError={() => setImageError(true)}
            />
            <img 
              src="/logo-dark.jpg" 
              alt="Eco Solar Energy Solutions"
              className={cn(logoClasses, "hidden dark:block")}
              onError={() => setImageError(true)}
            />
          </>
        ) : (
          <div className={cn(
            logoClasses.replace('object-contain', ''),
            "bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold"
          )}>
            ES
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <div className="relative">
        {!imageError ? (
          <>
            <img 
              src="/logo-light.jpg" 
              alt="Eco Solar Energy Solutions"
              className={cn(logoClasses, "dark:hidden")}
              onError={() => setImageError(true)}
            />
            <img 
              src="/logo-dark.jpg" 
              alt="Eco Solar Energy Solutions"
              className={cn(logoClasses, "hidden dark:block")}
              onError={() => setImageError(true)}
            />
          </>
        ) : (
          <div className={cn(
            logoClasses.replace('object-contain', ''),
            "bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold"
          )}>
            ES
          </div>
        )}
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className={textClasses}>
            {size === "sm" ? "Eco Solar" : "Eco Solar Energy Solutions"}
          </span>
          {(size === "md" || size === "lg" || size === "xl") && (
            <span className={cn(
              "text-xs transition-colors duration-300",
              {
                "text-muted-foreground group-hover:text-muted-foreground/80": variant === "navbar",
                "text-gray-300": variant === "footer",
                "text-muted-foreground": variant === "hero" || variant === "inline",
              }
            )}>
              Powering the UK with Clean Energy
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// Logo variants for different use cases
export function NavbarLogo() {
  return (
    <ModernLogo 
      variant="navbar" 
      size="md" 
      className="group-hover:scale-[1.02] transition-transform duration-200"
    />
  );
}

export function FooterLogo() {
  return (
    <ModernLogo 
      variant="footer" 
      size="lg" 
      className="brightness-100 hover:brightness-110 transition-all duration-300"
    />
  );
}

export function HeroLogo() {
  return (
    <ModernLogo 
      variant="hero" 
      size="xl" 
      className="drop-shadow-2xl"
    />
  );
}

export function InlineLogo({ size = "sm" }: { size?: "sm" | "md" | "lg" }) {
  return (
    <ModernLogo 
      variant="inline" 
      size={size}
      showText={false}
      className="inline-block"
    />
  );
}