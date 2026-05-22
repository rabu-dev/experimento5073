import React, { ReactNode } from "react";

/**
 * PartePrincipal – layout component that places arbitrary text (or any JSX) on the
 * left side and an image on the right side.
 *
 * Example usage:
 * ```tsx
 * <PartePrincipal
 *   leftContent={
 *     <>
 *       <h2 className="text-3xl font-bold">¡Hola Mundo!</h2>
 *       <p>Este es un párrafo de ejemplo al lado de la imagen.</p>
 *     </>
 *   }
 *   imageUrl="/images/mi-foto.jpg"
 *   alt="Descripción de la foto"
 * />
 * ```
 */
interface PartePrincipalProps {
  /** Content that will appear on the left side (typically text). */
  leftContent: ReactNode;
  /** URL or import of the image to show on the right side. */
  imageUrl: string;
  /** Accessible alt text for the image. */
  alt?: string;
  /** Optional extra CSS classes for the container. */
  className?: string;
}

export default function PartePrincipal({
  leftContent,
  imageUrl,
  alt = "",
  className = "",
}: PartePrincipalProps) {
  return (
    <section
      className={`flex flex-col lg:flex-row items-center justify-between gap-10 py-8 px-6 max-w-7xl mx-auto ${className}`}
    >
      {/* Left side – text card */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        <div className="bg-dark-blue/80 backdrop-blur-md border-2 border-sand p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden group transition-all duration-300 hover:shadow-sand/15">
          {/* Decorative sci-fi elements */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-terracotta"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-terracotta"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-terracotta"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-terracotta"></div>
          
          <div className="absolute top-3 right-6 text-[10px] font-mono text-sand/40 tracking-widest uppercase">
            Subject Dossier
          </div>
          
          <div className="text-cream text-left leading-relaxed">
            {leftContent}
          </div>
        </div>
      </div>

      {/* Right side – image */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <div className="relative p-2 bg-dark-blue/40 border border-sand/30 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden group">
          <img
            src={imageUrl}
            alt={alt}
            className="w-full h-auto object-cover rounded-xl transition-all duration-500 group-hover:scale-[1.02]"
          />
          {/* Subtle overlay border lines */}
          <div className="absolute inset-0 border border-cream/5 rounded-2xl pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}

