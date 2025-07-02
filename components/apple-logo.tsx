import React from 'react';

interface AppleLogoProps {
  className?: string;
}

export function AppleLogo({ className = "h-8 w-8" }: AppleLogoProps) {
  return (
    <div className={`${className} flex items-center space-x-2`}>
      <svg 
        viewBox="0 0 40 40" 
        className="h-8 w-8" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Apple-style circular background */}
        <circle 
          cx="20" 
          cy="20" 
          r="18" 
          fill="url(#gradient)" 
          stroke="rgba(0,0,0,0.1)" 
          strokeWidth="0.5"
        />
        
        {/* Stylized solar panel icon */}
        <g transform="translate(8, 8)">
          {/* Solar panel grid */}
          <rect x="2" y="4" width="20" height="12" rx="2" fill="white" opacity="0.9"/>
          <line x1="7" y1="4" x2="7" y2="16" stroke="rgba(0,122,255,0.6)" strokeWidth="0.5"/>
          <line x1="12" y1="4" x2="12" y2="16" stroke="rgba(0,122,255,0.6)" strokeWidth="0.5"/>
          <line x1="17" y1="4" x2="17" y2="16" stroke="rgba(0,122,255,0.6)" strokeWidth="0.5"/>
          <line x1="2" y1="8" x2="22" y2="8" stroke="rgba(0,122,255,0.6)" strokeWidth="0.5"/>
          <line x1="2" y1="12" x2="22" y2="12" stroke="rgba(0,122,255,0.6)" strokeWidth="0.5"/>
          
          {/* Sun rays */}
          <circle cx="12" cy="2" r="1" fill="rgb(255,149,0)"/>
          <line x1="12" y1="0.5" x2="12" y2="1" stroke="rgb(255,149,0)" strokeWidth="0.5"/>
          <line x1="14" y1="1" x2="13.5" y2="1.5" stroke="rgb(255,149,0)" strokeWidth="0.5"/>
          <line x1="10" y1="1" x2="10.5" y2="1.5" stroke="rgb(255,149,0)" strokeWidth="0.5"/>
          
          {/* Energy wave */}
          <path 
            d="M4 18 Q8 17 12 18 T20 18" 
            stroke="rgb(52,199,89)" 
            strokeWidth="1" 
            fill="none"
          />
        </g>
        
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(0,122,255)" stopOpacity="0.1"/>
            <stop offset="100%" stopColor="rgb(52,199,89)" stopOpacity="0.1"/>
          </linearGradient>
        </defs>
      </svg>
      
      <span className="text-xl font-semibold text-black tracking-tight">
        Eco Solar
      </span>
    </div>
  );
}