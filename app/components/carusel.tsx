"use client";
import React, { useState, useEffect } from "react";

/**
 * Simple image carousel.
 * For each slide we show the image and, underneath it, a descriptive caption.
 *
 * Props:
 *  - slides: array of objects `{ src: string; alt?: string; caption?: string }`
 *  - width / height optional styling via className.
 */
interface Slide {
  src: string;
  alt?: string;
  caption?: string;
}

interface CaruselProps {
  /**
   * Width of the image as a percentage of its container (e.g., 45 for 45%).
   * Si no se especifica, la imagen ocupa el 100% del ancho disponible.
   */
  size?: number;
  slides: Slide[];
  /** Optional CSS class for the outer container */
  className?: string;
}

export default function Carusel({
  slides,
  className = "",
  autoPlay = false,
  interval = 5000,
  size,
}: CaruselProps & { autoPlay?: boolean; interval?: number }) {
  const [index, setIndex] = useState(0);

  // Auto‑play logic
  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, interval);
    return () => clearInterval(id);
  }, [autoPlay, interval, slides.length]);

  if (!slides || slides.length === 0) {
    return null;
  }

  const next = () => setIndex((prev) => (prev + 1) % slides.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  const { src, alt = "", caption = "" } = slides[index];

  return (
    <div className={`relative max-w-full  mx-auto ${className}`}>
      {/* Image */}
      <div className="flex justify-center w-full">
        <img
          src={src}
          alt={alt}
          style={{ width: size ? `${size}%` : "100%" }}
          className="max-w-full h-auto object-cover rounded-md shadow"
        />
      </div>

      {/* Caption below the image */}
      {caption && (
        <div className="flex justify-center mt-4">
          <p
            className="text-center font-mono text-sm tracking-wide text-cream/90 bg-dark-blue/70 border border-sand/20 py-2 px-6 rounded-full shadow-md backdrop-blur-sm"
            dangerouslySetInnerHTML={{ __html: caption }}
          />
        </div>
      )}

      {/* Navigation controls */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-dark-blue/85 border border-sand/30 hover:border-terracotta hover:bg-terracotta/90 text-sand hover:text-cream rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer active:scale-95"
        aria-label="Previous"
      >
        ◀
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-dark-blue/85 border border-sand/30 hover:border-terracotta hover:bg-terracotta/90 text-sand hover:text-cream rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer active:scale-95"
        aria-label="Next"
      >
        ▶
      </button>
    </div>
  );
}
