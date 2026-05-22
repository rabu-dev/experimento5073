"use client";

import React, { useState } from "react";

/**
 * Spoiler – a simple card that shows an image (blurred by default) with a caption
 * underneath. When the user hovers or focuses the image the blur is removed,
 * revealing the picture.
 *
 * Props:
 *  - imageSrc: string – URL or import of the image.
 *  - alt?: string – Alt text for accessibility.
 *  - caption?: string – Text displayed below the image.
 */
interface SpoilerProps {
  imageSrc: string;
  alt?: string;
  caption?: string;
  /** Optional extra CSS classes for the outer container */
  className?: string;
}

export default function Spoiler({
  imageSrc,
  alt = "",
  caption = "",
  className = "",
}: SpoilerProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div 
      className={`max-w-sm w-full bg-dark-blue border border-sand/30 hover:border-terracotta rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-terracotta/15 group ${className}`}
      onMouseEnter={() => setIsRevealed(true)}
      onMouseLeave={() => setIsRevealed(false)}
    >
      <div className="relative h-48 overflow-hidden bg-black/40">
        <img
          src={imageSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            isRevealed ? "blur-0 scale-[1.03]" : "blur-xl scale-100"
          }`}
        />
        
        {/* Encrypted overlay message */}
        {!isRevealed && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/25 text-center p-4">
            <span className="text-terracotta text-2xl animate-pulse mb-2">👁</span>
            <span className="font-mono text-xs uppercase tracking-widest text-sand bg-black/60 px-3 py-1 rounded border border-sand/30 backdrop-blur-sm">
              CLASSIFIED DATA
            </span>
            <span className="text-[10px] font-mono text-cream/70 mt-2">
              Hover cursor to decrypt
            </span>
          </div>
        )}
      </div>
      
      {caption && (
        <div className="px-6 py-5 bg-dark-blue/90 border-t border-sand/20 text-center">
          <p className="text-cream font-semibold text-sm sm:text-base leading-relaxed">
            {caption}
          </p>
        </div>
      )}
    </div>
  );
}

