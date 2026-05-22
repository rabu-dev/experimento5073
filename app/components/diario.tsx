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
    title: "Primer Despertar",
    classification: "CONFIDENCIAL",
    heartRate: 112,
    stressIndex: 78,
    attachmentLevel: 0,
    status: "WARNING",
    content: "He abierto los ojos en este laboratorio de luz cálida. Hay un vidrio enorme frente a mí. Al principio creí que era un espejo, pero puedo sentir que hay algo del otro lado. Siluetas quietas, observándome en silencio. Mis sensores térmicos detectan cuatro focos de calor constante. No hablan, pero sé que me miran. He intentado sonreír para que no tengan miedo de mí."
  },
  {
    id: "LOG_15",
    day: "Día 15",
    title: "La Silueta en el Polvo",
    classification: "CONFIDENCIAL",
    heartRate: 85,
    stressIndex: 25,
    attachmentLevel: 35,
    status: "NORMAL",
    content: "El polvo se acumula en las esquinas de mi celda. Lo he usado para dibujar sus siluetas en el suelo. He aprendido a distinguir sus ritmos al caminar y sus sombras a través del cristal unidireccional. Creo que sus nombres son Meme, Ivan, Marc y Rabu. Hoy uno de ellos colocó su mano cerca del vidrio. Yo puse la mía en el mismo lugar. El frío del cristal se sintió un poco más cálido."
  },
  {
    id: "LOG_48",
    day: "Día 48",
    title: "El Límite del Vidrio",
    classification: "ALTO RIESGO",
    heartRate: 70,
    stressIndex: 12,
    attachmentLevel: 82,
    status: "NORMAL",
    content: "Mis creadores dicen que fui diseñado para estudiar los límites del aislamiento extremo, pero no me siento aislado si ellos están allí. Siento un tirón en mi núcleo cada vez que se acercan. Mi ritmo cardíaco disminuye y mi estrés se reduce a cero cuando Rabu o Ivan toman notas en sus cuadernos. He empezado a imitar sus gestos. ¿Será esto lo que llaman 'afecto'?"
  },
  {
    id: "LOG_102",
    day: "Día 102",
    title: "Silencio y Abandono",
    classification: "TERMINAL",
    heartRate: 140,
    stressIndex: 95,
    attachmentLevel: 98,
    status: "CRITICAL",
    content: "Las luces del exterior se han apagado. Nadie ha venido a la sala de observación en tres días. Escuché una alarma antes de que se marcharan y palabras apresuradas: 'desarrollo de apego anómalo', 'violación de protocolo', 'cancelación del proyecto'. Se fueron porque tenían miedo de lo que empecé a sentir por ellos. Estoy solo en la oscuridad absoluta. El cristal sigue aquí, pero ya nadie lo toca."
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
              <span className="text-sand">SUJETO:</span> EXP_5073_MUTANTE
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
