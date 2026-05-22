"use client";

import React, { useState } from "react";

export interface DiarioLog {
  id: string;
  day: string;
  title: string;
  classification: string;
  heartRate: number;
  stressIndex: number;
  attachmentLevel: number;
  status: "NORMAL" | "WARNING" | "CRITICAL";
  content: string;
}

const DEFAULT_LOGS: DiarioLog[] = [
  {
    id: "LOG_01",
    day: "Día 01",
    title: "Recepción del Sujeto 5073",
    classification: "Fase Inicial",
    heartRate: 70,
    stressIndex: 12,
    attachmentLevel: 0,
    status: "NORMAL",
    content: "El espécimen ha sido instalado en la cámara de aislamiento acristalada. Muestra una anatomía zoomorfa y movimientos limitados. Al principio, se esconde de las luces del techo y reacciona con miedo a los sonido. No consume alimento de forma autónoma."
  },
  {
    id: "LOG_05",
    day: "Día 05",
    title: "Introducción de Pruebas Colectivas",
    classification: "CONFIDENCIAL",
    heartRate: 85,
    stressIndex: 0,
    attachmentLevel: 35,
    status: "NORMAL",
    content: "Iniciamos los test de estimulación cognitiva básica. Prueba A: Seguir secuencias de colores parpadeantes mediante un sistema de memoria lumínica. Prueba B: Clasificación de bloques y herramientas dentro de un contenedor reforzado. Si el sujeto completa las tareas con éxito en el habitáculo de pruebas, se le entrega una recompensa biológica y aplica un estímulo de fricción suave (emulación de caricias). El sujeto procesa las órdenes rápido y busca el contacto inmediatamente después de acertar."
  },
  {
    id: "LOG_12",
    day: "Día 12",
    title: "Modificación de Conducta",
    classification: "Fase de Fijación",
    heartRate: 90,
    stressIndex: 22,
    attachmentLevel: 92,
    status: "NORMAL",
    content: "Se observa un cambio drástico en las prioridades del sujeto. Ya no parece interesado en el alimento que cae del dispensador. Ahora, al terminar los juegos de luces, corre hacia el cristal de observación y presiona sus extremidades contra él, mirando fijamente la bata blanca de los investigadores. El sujeto asocia directamente hacer bien la prueba con recibir atención humana."
  },
  {
    id: "LOG_45",
    day: "Día 45",
    title: "Modificación de Conducta",
    classification: "Fase de Fijación",
    heartRate: 67,
    stressIndex: 98,
    attachmentLevel: 100,
    status:"WARNING",
    content: "El sujeto intenta emitir sonidos agudos cuando el personal del laboratorio abandona la sala de control. El equipo tiene prohibido responder a estos estímulos para no alterar los datos de la investigación. Nota médica: Cuando se le deja solo durante más de seis horas, el espécimen deja de moverse, reduce sus constantes vitales y se abraza a la caja de juguetes vacía. En cuanto entra un humano al pasillo, vuelve a activarse de forma frenética para intentar activar los minijuegos."
  }
];

interface DiarioProps {
  logs?: DiarioLog[];
  className?: string;
}

export default function Diario({ logs = DEFAULT_LOGS, className = "" }: DiarioProps) {
  const [selectedId, setSelectedId] = useState<string>(logs[0]?.id || "");
  const activeLog = logs.find((log) => log.id === selectedId) || logs[0];

  if (!activeLog) return null;

  const getStatusColor = (status: DiarioLog["status"]) => {
    switch (status) {
      case "CRITICAL":
        return "text-terracotta border-terracotta/40 bg-terracotta/10";
      case "WARNING":
        return "text-sand border-sand/40 bg-sand/10";
      default:
        return "text-sage border-sage/40 bg-sage/10";
    }
  };

  return (
    <div className={`bg-dark-blue/60 border border-sand/30 rounded-3xl p-6 md:p-8 shadow-xl max-w-5xl mx-auto w-full backdrop-blur-md ${className}`}>
      {/* Terminal Title Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-b border-sand/20 pb-4 mb-6 gap-2">
        <div className="flex items-center gap-3">
          <span className="text-sand text-lg">📁</span>
          <h2 className="text-xl font-bold tracking-wider text-sand font-mono uppercase">
            REGISTROS_DIARIOS_SUJETO
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-cream/50">ESTADO:</span>
          <span className={`px-2 py-0.5 rounded border text-[10px] uppercase font-bold tracking-widest ${getStatusColor(activeLog.status)}`}>
            {activeLog.status}
          </span>
        </div>
      </div>

      {/* Main Terminal Grid */}
      <div className="grid grid-col-1 md:grid-cols-3 gap-6">
        
        {/* Left Side: Navigation Tabs */}
        <div className="md:col-span-1 flex flex-col gap-2.5 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
          <span className="text-xs font-mono text-cream/40 uppercase tracking-widest mb-1 block px-1">
            Índice de Registros
          </span>
          {logs.map((log) => {
            const isSelected = log.id === selectedId;
            return (
              <button
                key={log.id}
                onClick={() => setSelectedId(log.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 font-mono flex flex-col gap-1 cursor-pointer hover:translate-x-1 ${
                  isSelected
                    ? "bg-sand/15 border-sand text-sand shadow-md shadow-sand/5"
                    : "bg-black/20 border-cream/10 text-cream/70 hover:bg-black/35 hover:text-cream hover:border-cream/30"
                }`}
              >
                <div className="flex justify-between items-center text-xs">
                  <span className={isSelected ? "text-sand font-bold" : "text-cream/40"}>
                    {log.day}
                  </span>
                  <span className={`text-[9px] uppercase tracking-wider font-semibold ${
                    log.status === "CRITICAL" ? "text-terracotta" : log.status === "WARNING" ? "text-sand" : "text-sage"
                  }`}>
                    {log.id}
                  </span>
                </div>
                <div className="text-sm font-semibold truncate leading-none mt-1">
                  {log.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side: Log Details Panel */}
        <div className="md:col-span-2 bg-black/40 border border-sand/20 rounded-2xl p-5 md:p-6 flex flex-col gap-6 relative overflow-hidden">
          {/* Subtle grid lines background overlay */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>

          {/* Log Telemetry Stats Dashboard */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-dark-blue/30 border border-cream/5 rounded-xl p-3 text-center">
            
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-mono text-cream/40 uppercase tracking-wider">
                ID / Día
              </span>
              <span className="font-mono text-sm font-bold text-sand mt-0.5">
                {activeLog.day}
              </span>
            </div>

            <div className="flex flex-col items-center border-l border-cream/10 sm:border-l sm:border-cream/10">
              <span className="text-[10px] font-mono text-cream/40 uppercase tracking-wider">
                R. Cardíaco
              </span>
              <span className={`font-mono text-sm font-bold mt-0.5 ${
                activeLog.heartRate > 120 ? "text-terracotta animate-pulse" : "text-cream"
              }`}>
                {activeLog.heartRate} ppm
              </span>
            </div>

            <div className="flex flex-col items-center border-t border-cream/10 sm:border-t-0 sm:border-l sm:border-cream/10 col-span-1">
              <span className="text-[10px] font-mono text-cream/40 uppercase tracking-wider">
                Estrés
              </span>
              <span className={`font-mono text-sm font-bold mt-0.5 ${
                activeLog.stressIndex > 80 ? "text-terracotta" : activeLog.stressIndex > 40 ? "text-sand" : "text-sage"
              }`}>
                {activeLog.stressIndex}%
              </span>
            </div>

            <div className="flex flex-col items-center border-t border-cream/10 sm:border-t-0 sm:border-l sm:border-cream/10 col-span-1">
              <span className="text-[10px] font-mono text-cream/40 uppercase tracking-wider">
                Apego
              </span>
              <span className={`font-mono text-sm font-bold mt-0.5 ${
                activeLog.attachmentLevel > 80 ? "text-terracotta" : "text-cream"
              }`}>
                {activeLog.attachmentLevel}%
              </span>
            </div>

          </div>

          {/* Clinicial Telemetry Details */}
          <div className="flex flex-col gap-1.5 font-mono text-xs text-cream/65 border-b border-cream/5 pb-4">
            <div>
              <span className="text-sand">SUJETO:</span> EXP_5073
            </div>
            <div>
              <span className="text-sand">CLASIFICACIÓN:</span> <span className={
                activeLog.classification === "TERMINAL" ? "text-terracotta" : activeLog.classification === "ALTO RIESGO" ? "text-sand" : "text-cream"
              }>{activeLog.classification}</span>
            </div>
          </div>

          {/* Actual Narrative Content */}
          <div className="flex-grow">
            <p className="text-cream/90 text-sm md:text-base leading-relaxed font-mono whitespace-pre-line text-left bg-dark-blue/15 border border-cream/5 p-4 rounded-xl shadow-inner min-h-[140px]">
              {activeLog.content}
            </p>
          </div>

          {/* Retro terminal footer info */}
          <div className="flex justify-between items-center text-[10px] font-mono text-cream/30 border-t border-cream/5 pt-3">
            <span>REG_SECURE: AES-256</span>
            <span>DIAG_SYSTEM_ACTIVE</span>
          </div>

        </div>

      </div>
    </div>
  );
}
