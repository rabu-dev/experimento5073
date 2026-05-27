"use client";

import React, { useState } from "react";


interface SpoilerTextProps {
  /** The text that will be revealed on hover */
  text: string;
  /** Additional CSS classes for the outer container */
  className?: string;
}

export default function SpoilerText({
  text,

  className = "",
}: SpoilerTextProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div
      className={`max-w-sm w-full bg-dark-blue border border-sand/30 hover:border-terracotta rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-terracotta/15 group ${className}`}
      onMouseEnter={() => setIsRevealed(true)}
      onMouseLeave={() => setIsRevealed(false)}
    >
      <div className="relative p-4 min-h-[8rem] bg-black/40 flex items-center justify-center">
        {/* Text content – blurred when not revealed */}
        <p
          className={`text-cream text-center leading-relaxed transition-all duration-700 ease-out ${
            isRevealed ? "blur-0" : "blur-xl"
          }`}
        >
          {text}
        </p>

        {/* Overlay shown only while hidden – mimics the image version */}
        {!isRevealed && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/25 text-center p-4">
            <span className="text-terracotta text-2xl animate-pulse mb-2">
              👁
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-sand bg-black/60 px-3 py-1 rounded border border-sand/30 backdrop-blur-sm">
              CLASSIFIED DATA
            </span>
            <span className="text-[10px] font-mono text-cream/70 mt-2">
              Hover cursor to decrypt
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
