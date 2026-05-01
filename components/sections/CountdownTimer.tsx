"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { weddingConfig } from "@/lib/wedding-config";
import { getCountdown } from "@/lib/utils";
import { useWedding } from "@/components/providers/WeddingContext";

const THEME_COLOR = "#3D5A5B"; // Dark muted teal/green from reference

function Digit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center gap-4">
      <span
        suppressHydrationWarning
        className="font-serif text-5xl md:text-7xl lg:text-8xl italic font-light opacity-90"
        style={{ fontFamily: "'Playfair Display', serif", color: THEME_COLOR }}
      >
        {display}
      </span>
      <span 
        className="text-[9px] md:text-[10px] uppercase tracking-[0.5em] font-semibold opacity-40"
        style={{ fontFamily: "'Montserrat', sans-serif", color: THEME_COLOR }}
      >
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer() {
  const { language } = useWedding();
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(getCountdown(weddingConfig.weddingDate));

  useEffect(() => {
    setMounted(true);
    setTime(getCountdown(weddingConfig.weddingDate));
    const id = setInterval(() => setTime(getCountdown(weddingConfig.weddingDate)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      data-section
      className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-[#f0f0e4]"
    >
      {/* ── LEFT FLORAL COLUMN ── */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: -80, opacity: 1 }}
        animate={{ y: [0, -15, 0] }}
        transition={{ 
          x: { duration: 2, ease: "easeOut" },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute left-0 top-0 bottom-0 z-0 hidden xl:block"
      >
        <img 
          src="/column-left.png" 
          alt="" 
          className="h-full w-auto object-contain object-left pointer-events-none select-none"
          style={{ maxWidth: "450px" }}
        />
      </motion.div>

      {/* ── RIGHT FLORAL COLUMN ── */}
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 80, opacity: 1 }}
        animate={{ y: [0, 15, 0] }}
        transition={{ 
          x: { duration: 2, ease: "easeOut" },
          y: { duration: 7, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute right-0 top-0 bottom-0 z-0 hidden xl:block"
      >
        <img 
          src="/column-right.png" 
          alt="" 
          className="h-full w-auto object-contain object-right pointer-events-none select-none"
          style={{ maxWidth: "450px" }}
        />
      </motion.div>

      {/* Mobile Floral Accents - More subtle */}
      <div className="absolute top-0 -left-20 w-48 md:hidden opacity-10">
        <img src="/column-left.png" alt="" className="w-full" />
      </div>
      <div className="absolute top-0 -right-20 w-48 md:hidden opacity-10">
        <img src="/column-right.png" alt="" className="w-full" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-20 flex flex-col items-center">
        
        {/* ── Heading ── */}
        <AnimatedSection direction="fade" className="w-full text-center mb-16 md:mb-20">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl mb-6 opacity-80"
            style={{ fontFamily: "'Great Vibes', cursive", color: THEME_COLOR }}
          >
            Countdown
          </h2>
          <p 
            className="text-[10px] md:text-xs uppercase tracking-[0.6em] font-medium opacity-50"
            style={{ fontFamily: "'Montserrat', sans-serif", color: THEME_COLOR }}
          >
            {language === "EN" ? "Until 20 September 2026" : "Bis zum 20. September 2026"}
          </p>
        </AnimatedSection>

        {/* ── Countdown Content ── */}
        {mounted && (
          <div className="w-full max-w-3xl">
            {time.isOver ? (
              <AnimatedSection direction="fade" className="text-center">
                <h3 className="text-3xl md:text-5xl font-serif mb-4" style={{ color: THEME_COLOR }}>
                  {language === "EN" ? "The celebration has begun!" : "Die Feier hat begonnen!"}
                </h3>
              </AnimatedSection>
            ) : (
              <AnimatedSection direction="up" delay={0.2}>
                <div className="flex items-center justify-center gap-5 md:gap-14">
                  <Digit value={time.days} label={language === "EN" ? "Days" : "Tage"} />
                  <div className="h-12 w-[1px] bg-[#3D5A5B]/10 self-center hidden sm:block" />
                  <Digit value={time.hours} label={language === "EN" ? "Hours" : "Stunden"} />
                  <div className="h-12 w-[1px] bg-[#3D5A5B]/10 self-center hidden sm:block" />
                  <Digit value={time.minutes} label={language === "EN" ? "Minutes" : "Minuten"} />
                </div>
              </AnimatedSection>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
