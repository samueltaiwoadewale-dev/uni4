import React from "react";

interface LogoProps {
  size?: number;
  animate?: boolean;
  orbitSpeed?: number;
  bubbleScale?: number;
  customColor?: string;
  glow?: boolean;
}

export function UniVerseLogo({
  size = 120,
  animate = true,
  orbitSpeed = 1,
  bubbleScale = 1,
  glow = true
}: LogoProps) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Background glow aligned with official logo colors */}
      {glow && (
        <div className="absolute inset-0 bg-gradient-to-tr from-[#06B6D4]/20 via-[#EC4899]/10 to-[#FACC15]/20 blur-2xl rounded-full scale-110 pointer-events-none" />
      )}
      
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients mapping the rich organic logo style */}
          <linearGradient id="capGrad" x1="50" y1="20" x2="150" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E40AF" />
            <stop offset="60%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          
          <linearGradient id="uGrad" x1="40" y1="80" x2="160" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="35%" stopColor="#3B82F6" />
            <stop offset="70%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          
          <linearGradient id="orbitGrad" x1="20" y1="110" x2="180" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#EC4899" />
            <stop offset="50%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#FACC15" />
          </linearGradient>

          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Orbit Ring Back Section */}
        <path
          d="M 25 115 C 30 85, 170 85, 175 115"
          stroke="url(#orbitGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.8"
          strokeDasharray={animate ? "none" : "3,3"}
        />

        {/* 2. Floating Background Bubbles (Representing students/community) */}
        <g opacity="0.85">
          <circle cx="45" cy="70" r={8 * bubbleScale} fill="#3B82F6" />
          <circle cx="165" cy="65" r={5 * bubbleScale} fill="#10B981" />
          <circle cx="152" cy="140" r={7 * bubbleScale} fill="#F97316" />
          <circle cx="42" cy="148" r={6 * bubbleScale} fill="#EC4899" />
          <circle cx="85" cy="55" r={4 * bubbleScale} fill="#06B6D4" />
        </g>

        {/* 3. Styled Letter "U" Pipe with Rich Gradient */}
        <path
          d="M 68 85 
             C 68 85, 62 135, 65 145 
             C 70 165, 130 165, 135 145 
             C 138 135, 132 85, 132 85"
          fill="none"
          stroke="url(#uGrad)"
          strokeWidth="24"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 4. Orbit Ring Front Section (Overlapping the 'U' for 3D depth) */}
        <path
          d="M 25 115 C 20 145, 180 145, 175 115"
          stroke="url(#orbitGrad)"
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* 5. Orbiting Tracker Node (Highlighted yellow/golden moon) */}
        {animate ? (
          <circle cx="0" cy="0" r="10" fill="#FACC15" stroke="#FFFFFF" strokeWidth="2">
            <animateMotion
              path="M 25 115 C 30 85, 170 85, 175 115 C 180 145, 20 145, 25 115"
              dur={`${5 / orbitSpeed}s`}
              repeatCount="indefinite"
            />
          </circle>
        ) : (
          <circle cx="172" cy="115" r="9" fill="#FACC15" stroke="#FFFFFF" strokeWidth="2" />
        )}

        {/* 6. Graduation Cap (Royal/Deep Blue with isometric angle) */}
        <g transform="translate(0, -10)">
          {/* Cap Base Ring */}
          <path
            d="M 80 82 C 80 88, 120 88, 120 82 L 120 88 C 120 94, 80 94, 80 88 Z"
            fill="#1E3A8A"
          />
          {/* Diamond Cap Top */}
          <path
            d="M 100 55 L 160 70 L 100 85 L 40 70 Z"
            fill="url(#capGrad)"
            stroke="#1D4ED8"
            strokeWidth="1.5"
          />
          {/* Inner Cap Detail */}
          <path
            d="M 100 58 L 150 70 L 100 82 L 50 70 Z"
            fill="#1F2937"
            opacity="0.15"
          />
          {/* Cap Tassel Line & Button */}
          <circle cx="100" cy="70" r="3" fill="#FACC15" />
          <path
            d="M 100 70 L 138 72 L 140 85"
            stroke="#F59E0B"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Tassel Fringe */}
          <path d="M 137 85 L 143 85" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}
