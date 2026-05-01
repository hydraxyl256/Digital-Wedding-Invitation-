"use client";

import { motion } from "framer-motion";
import { weddingConfig } from "@/lib/wedding-config";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useWedding } from "@/components/providers/WeddingContext";

export default function FormalInvitation() {
  const { language } = useWedding();
  return (
    <section 
      data-section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white py-20"
    >
      {/* Background with wood frame and flowers - matching the screenshot */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "url('/invitation-card.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <AnimatedSection direction="fade" className="z-10 w-full max-w-4xl mx-auto px-6">
        <div className="text-center flex flex-col items-center gap-6 md:gap-10">
          
          {/* Header Text */}
          <div className="flex flex-col gap-2">
            <p className="text-amber-900 text-base md:text-xl lg:text-2xl uppercase tracking-[0.3em] font-medium" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {language === "EN" ? "We request the pleasure of your company" : "Wir laden herzlich ein"}
            </p>
            <p className="text-amber-900 text-base md:text-xl lg:text-2xl uppercase tracking-[0.3em] font-medium" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {language === "EN" ? "To celebrate our wedding on" : "zu unserer Hochzeit am"}
            </p>
          </div>

          {/* Date Block - Formal Layout */}
          <div className="flex items-center justify-center gap-4 md:gap-8 my-4">
            {/* Month with lines */}
            <div className="flex flex-col items-center">
              <div className="h-[1.5px] w-16 md:w-24 bg-amber-900/60 mb-2" />
              <span className="text-amber-900 text-2xl md:text-4xl uppercase tracking-[0.2em] font-serif">
                {language === "EN" ? "July" : "Juli"}
              </span>
              <div className="h-[1.5px] w-16 md:w-24 bg-amber-900/60 mt-2" />
            </div>

            {/* Day Number - Large */}
            <span className="text-amber-900 text-7xl md:text-9xl lg:text-[11rem] font-serif leading-none">
              23
            </span>

            {/* Year with lines */}
            <div className="flex flex-col items-center">
              <div className="h-[1.5px] w-16 md:w-24 bg-amber-900/60 mb-2" />
              <span className="text-amber-900 text-2xl md:text-4xl uppercase tracking-[0.2em] font-serif">2026</span>
              <div className="h-[1.5px] w-16 md:w-24 bg-amber-900/60 mt-2" />
            </div>
          </div>

          {/* Day of Week */}
          <p className="text-amber-900 text-2xl md:text-4xl uppercase tracking-[0.4em] font-serif mb-6">
            {language === "EN" ? "Thursday" : "Donnerstag"}
          </p>

          {/* To be held at */}
          <div className="flex flex-col gap-4">
            <p className="text-amber-900 text-base md:text-xl lg:text-2xl uppercase tracking-[0.3em] font-medium" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {language === "EN" ? "To be held at" : "Ort der Feier"}
            </p>
            {/* Optional: Add venue names here if wanted, or keep it clean as per screenshot */}
            <p className="text-amber-800 text-2xl md:text-3xl font-serif italic" style={{ fontFamily: "'Great Vibes', cursive" }}>
              {weddingConfig.ceremony.name}
            </p>
          </div>

        </div>
      </AnimatedSection>
    </section>
  );
}
