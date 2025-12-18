import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      aria-label="Aeon Logo"
    >
      <circle cx="50" cy="50" r="48" fill="white" className="opacity-0" />
      {/* Abstract Knot Symbol approximation */}
      <path 
        d="M50 10 C 30 10 15 25 15 45 C 15 65 30 80 50 80 C 70 80 85 65 85 45" 
        stroke="currentColor" 
        strokeWidth="12" 
        strokeLinecap="round"
        className="opacity-100"
      />
      <path 
        d="M50 90 C 70 90 85 75 85 55 C 85 35 70 20 50 20 C 30 20 15 35 15 55" 
        stroke="currentColor" 
        strokeWidth="12" 
        strokeLinecap="round"
        className="opacity-100"
      />
      <path 
        d="M35 35 L 65 65" 
        stroke="currentColor" 
        strokeWidth="12" 
        strokeLinecap="round"
      />
      {/* 
        Note: This SVG is a stylized geometric approximation of the uploaded logo.
        If you have the actual SVG file, paste its <path> content here.
      */}
    </svg>
  );
};

export default Logo;