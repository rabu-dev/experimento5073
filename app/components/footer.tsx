"use client";

import React from "react";

/**
 * Footer component with three columns:
 *   - Left: project name ("experimento 5063")
 *   - Center: list of participants (passed as props)
 *   - Right: "indiegames bootcamp"
 */
interface FooterProps {
  /** Names of the participants to show in the centre column */
  participants?: string[];
  /** Optional extra CSS classes for the outer container */
  className?: string;
}

export default function Footer({
  participants = [],
  className = "",
}: FooterProps) {
  // Aseguramos que el footer quede pegado al fondo cuando el contenedor padre es flex-col
  const containerClass = `${className} mt-auto`;
  return (
    <footer
      className={`bg-dark-blue text-cream border border-sand/30 py-6 px-8 flex flex-col md:flex-row items-center justify-between m-6 md:m-10 rounded-full shadow-lg transition-all duration-300 hover:shadow-sand/10 ${containerClass}`}
    >
      {/* Left side */}
      <div className="mb-3 md:mb-0 text-center md:text-left font-bold tracking-wider text-sand">
        EXPERIMENTO 5073
      </div>

      {/* Center – participants */}
      <div className="text-center mb-3 md:mb-0">
        {participants.length > 0 ? (
          <ul className="list-none flex flex-wrap gap-4 justify-center text-sm font-medium">
            {participants.map((p, i) => (
              <li 
                key={i} 
                className="hover:text-terracotta hover:scale-105 transition-all duration-200 cursor-pointer px-2 py-0.5 rounded bg-cream/5 border border-cream/10 hover:border-terracotta/40"
              >
                {p}
              </li>
            ))}
          </ul>
        ) : (
          <span className="italic text-muted-cream">Cargando personal...</span>
        )}
      </div>

      {/* Right side */}
      <div className="text-center md:text-right font-mono text-xs uppercase tracking-widest text-cream/70">
        inVidiogames bootcamp
      </div>
    </footer>
  );
}

