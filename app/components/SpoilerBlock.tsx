"use client";

import React, { useState, ReactNode } from "react";

/**
 * SpoilerBlock displays arbitrary JSX (typically text) inside the same card style
 * used by {@link PartePrincipal}, but blurs the content until the user hovers.
 * It provides the same visual feel as the image‑based {@link Spoiler} component
 * while omitting the image column.
 */
interface SpoilerBlockProps {
  /** The content to reveal on hover – can be plain text or any JSX. */
  children: ReactNode;
  /** Optional extra CSS classes for the outer container */
  className?: string;
}

export default function SpoilerBlock({
  children,
  className = "",
}: SpoilerBlockProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <section
      className={`flex flex-col items-center justify-center py-8 px-6 max-w-7xl mx-auto ${className}`}
      onMouseEnter={() => setIsRevealed(true)}
      onMouseLeave={() => setIsRevealed(false)}
    >
      <div
        className={`bg-dark-blue/80 backdrop-blur-md border-2 border-sand p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden transition-all duration-300 ${
          isRevealed ? "shadow-sand/15" : ""
        }`}
      >
        {/* Decorative sci‑fi corners (same as PartePrincipal) */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-terracotta"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-terracotta"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-terracotta"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-terracotta"></div>

        {/* Hover overlay when hidden */}
        {!isRevealed && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/25 text-center p-4">
            <span className="text-terracotta text-2xl animate-pulse mb-2">👁</span>
            <span className="font-mono text-xs uppercase tracking-widest text-sand bg-black/60 px-3 py-1 rounded border border-sand/30 backdrop-blur-sm">
              CLASSIFIED DATA
            </span>
            <span className="text-[10px] font-mono text-cream/70 mt-2">Hover cursor to decrypt</span>
          </div>
        )}

        {/* Content – blurred until revealed */}
        <div
          className={`text-cream leading-relaxed transition-all duration-700 ease-out ${
            isRevealed ? "blur-0" : "blur-xl"
          }`}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
