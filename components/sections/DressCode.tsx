"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";

const THEME_COLOR = "#3D5A5B";

export default function DressCode() {
  return (
    <section
      data-section
      className="relative bg-[#f0f0e4] overflow-hidden flex flex-col items-center"
      style={{ paddingTop: "12rem", paddingBottom: "16rem" }}
    >
      <div className="w-full max-w-3xl mx-auto px-6 md:px-16 flex flex-col items-center gap-12 md:gap-20">

        {/* Title */}
        <AnimatedSection direction="fade">
          <h2 className="text-5xl md:text-6xl lg:text-7xl text-center opacity-85"
            style={{ fontFamily: "'Great Vibes', cursive", color: THEME_COLOR }}>
            Dress Code
          </h2>
        </AnimatedSection>

        {/* CARD 1: WELCOME CRUISE */}
        <div className="relative w-full">
          {/* Roses — hidden on mobile, shown on md+ */}
          <motion.img src="/roses.png" alt=""
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute pointer-events-none z-20 hidden md:block"
            style={{ width: 160, top: -56, left: -40 }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }}
            className="w-full bg-white/35 backdrop-blur-sm border border-white/70 rounded-[28px] md:rounded-[44px] shadow-[0_8px_32px_rgba(61,90,91,0.04)] px-6 py-20 md:px-16 md:py-36"
          >
            <div className="flex flex-col items-center justify-center text-center gap-6">
              <h3 className="text-4xl md:text-6xl" style={{ fontFamily: "'Great Vibes', cursive", color: THEME_COLOR }}>
                Welcome Cruise
              </h3>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.6em] font-bold opacity-35"
                style={{ fontFamily: "'Montserrat', sans-serif", color: THEME_COLOR }}>
                22nd July
              </p>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] font-semibold opacity-55 mt-2"
                style={{ fontFamily: "'Montserrat', sans-serif", color: THEME_COLOR }}>
                White Cocktail Attire
              </p>
            </div>
          </motion.div>
        </div>

        {/* CARD 2: WEDDING */}
        <div className="relative w-full mb-8 md:mb-16">
          {/* Cypress Trees — smaller on mobile, full size on desktop */}
          <motion.img src="/cypress.png" alt=""
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute pointer-events-none z-20"
            style={{ width: "clamp(80px, 12vw, 180px)", bottom: "-2rem", left: "clamp(-8px, -2vw, -60px)" }}
          />

          {/* Flower Stand — desktop only */}
          <motion.img src="/stand.png" alt=""
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute pointer-events-none z-20 hidden md:block"
            style={{ width: 160, top: -30, right: -50 }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }}
            className="w-full bg-white/35 backdrop-blur-sm border border-white/70 rounded-[28px] md:rounded-[44px] shadow-[0_8px_32px_rgba(61,90,91,0.04)] px-6 py-20 md:px-16 md:py-36"
          >
            <div className="flex flex-col items-center justify-center text-center gap-6">
              <h3 className="text-4xl md:text-6xl" style={{ fontFamily: "'Great Vibes', cursive", color: THEME_COLOR }}>
                Wedding
              </h3>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.6em] font-bold opacity-35"
                style={{ fontFamily: "'Montserrat', sans-serif", color: THEME_COLOR }}>
                23rd July
              </p>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] font-semibold opacity-55 mt-2"
                style={{ fontFamily: "'Montserrat', sans-serif", color: THEME_COLOR }}>
                Black Tie
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
