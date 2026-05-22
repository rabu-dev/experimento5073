import Image from "next/image";
import Header from "./components/header";
import PartePrincipal from "./components/Parteprincipal";
import Carusel from "./components/carusel";
import Spoiler from "./components/Spoiler";
import Footer from "./components/footer";
import Diario from "./components/diario";

export default function Home() {
  const slides = [
    { src: "/bicho.png", alt: "foto del bicho", caption: "<strong>Sujeto 5073</strong> — La entidad biológica en observación." },
    { src: "/", alt: "Foto del laboratorio", caption: "<strong>Hábitat de Aislamiento</strong> — Tu celda y zona de contención." },
    { src: "/prueba.jpg", alt: "Foto de la prueba", caption: "<strong>Evaluación Cognitiva</strong> — Ejercicio de calibración diaria." },
  ];

  return (
    <>
      <Header />

      <main className="flex-grow flex flex-col gap-12 pb-16">
        {/* Main Section */}
        <PartePrincipal
          leftContent={
            <>
              <h2 className="text-3xl font-black text-sand tracking-wide mb-6 uppercase border-b border-sand/20 pb-2">
                Experimento 5073
              </h2>
              <p className="text-cream/90 text-base md:text-lg leading-relaxed font-medium">
                Eres una entidad biológica sintética creada en un laboratorio hermético con el propósito de estudiar los límites de la soledad humana. 
              </p>
              <p className="text-cream/80 text-sm mt-4 italic">
                Nota del Supervisor: El sujeto fue abandonado tras empezar a manifestar un apego emocional anómalo hacia los científicos observadores.
              </p>
            </>
          }
          imageUrl="/fotoprincipal.png"
          alt="Experimento 5073 Menú de Inicio"
        />

        {/* Diagnostic Logs & Gallery Section */}
        <section className="max-w-6xl mx-auto w-full px-6 flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-sand/20 pb-3">
            <span className="text-terracotta text-lg">■</span>
            <h3 className="text-xl font-bold uppercase tracking-widest text-sand">
              Visualizadores de Diagnóstico
            </h3>
          </div>
          
          <Carusel
            slides={slides}
            autoPlay={true}
            interval={8000}
            size={45} // La foto ocupa el 45% del ancho del contenedor en desktop
            className="w-full my-4"
          />
        </section>

        {/* Subject Observation Diary Section */}
        <section className="max-w-6xl mx-auto w-full px-6 flex flex-col gap-6 mt-6">
          <div className="flex items-center gap-3 border-b border-sand/20 pb-3">
            <span className="text-terracotta text-lg">■</span>
            <h3 className="text-xl font-bold uppercase tracking-widest text-sand">
              Diario de Observación del Sujeto
            </h3>
          </div>
          
          <Diario className="mt-4" />
        </section>

        {/* Encrypted File Section */}
        <section className="max-w-6xl mx-auto w-full px-6 flex flex-col items-center gap-6 mt-6">
          <div className="flex items-center gap-3 border-b border-sand/20 pb-3 w-full justify-center">
            <span className="text-terracotta text-lg">■</span>
            <h3 className="text-xl font-bold uppercase tracking-widest text-sand">
              Archivos Restringidos
            </h3>
            <span className="text-terracotta text-lg">■</span>
          </div>

          <div className="flex flex-row gap-6 mt-4">
            <Spoiler 
              imageSrc="/bicho.png" 
              alt="Sujeto 5073" 
              caption="¿Estarías dispuesto a cooperar en todos los experimentos o intentarías escapar a toda costa?" 
            />
            
          </div>
        </section>
      </main>

      <Footer participants={["Meme", "Ivan", "Marc", "Rabu"]} />
    </>
  );
}
