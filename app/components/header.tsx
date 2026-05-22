import React from "react";

// Header component for the Experimento 5073 app
// Renders a top navigation bar with the project title.

export default function Header() {
  return (
    <header className="bg-dark-blue text-cream border border-sand/50 py-4 px-8 shadow-lg flex flex-col sm:flex-row items-center justify-between m-6 md:m-10 rounded-full transition-all duration-300 hover:shadow-sand/15">
      {/* Left side: Telemetry badge */}
      <div className="flex items-center gap-2 mb-2 sm:mb-0">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-sage"></span>
        </span>
        <span className="text-xs font-mono uppercase tracking-widest text-sage">System: Online</span>
      </div>

      {/* Center: Title */}
      <h1 className="text-xl sm:text-2xl font-black tracking-wider text-sand hover:text-terracotta transition-colors duration-300">
        EXPERIMENTO 5073
      </h1>

      {/* Right side: Lab Terminal metadata */}
      <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-cream/70">
        <span>LOC: SECTOR_4</span>
        <span className="text-terracotta">|</span>
        <span>VER: 1.0.4</span>
      </div>
    </header>
  );
}

