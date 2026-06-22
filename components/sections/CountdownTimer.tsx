"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { weddingConfig } from "@/lib/wedding-config";
import { getCountdown } from "@/lib/utils";
import { useWedding } from "@/components/providers/WeddingContext";

const THEME_COLOR = "#3D5A5B";

const TEXTS = {
  EN: {
    until: "Until 16 August 2026",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    over: "The celebration has begun!",
  },
  IT: {
    until: "Fino al 16 Agosto 2026",
    days: "Giorni",
    hours: "Ore",
    minutes: "Minuti",
    over: "I festeggiamenti sono iniziati!",
  },
};

function Digit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center gap-3 md:gap-4">
      <span
        suppressHydrationWarning
        className="font-serif text-5xl md:text-7xl lg:text-8xl italic font-light"
        style={{ fontFamily: "'Playfair Display', serif", color: THEME_COLOR, opacity: 0.95 }}
      >
        {display}
      </span>
      <span
        className="text-[9px] md:text-[10px] uppercase tracking-[0.5em] font-semibold"
        style={{ fontFamily: "'Montserrat', sans-serif", color: THEME_COLOR, opacity: 0.55 }}
      >
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer() {
  const { language } = useWedding();
  const t = TEXTS[language as keyof typeof TEXTS] ?? TEXTS.EN;
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
      {/* LEFT FLORAL COLUMN */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: -80, opacity: 1 }}
        animate={{ y: [0, -15, 0] }}
        transition={{
          x: { duration: 2, ease: "easeOut" },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
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

      {/* RIGHT FLORAL COLUMN */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 80, opacity: 1 }}
        animate={{ y: [0, 15, 0] }}
        transition={{
          x: { duration: 2, ease: "easeOut" },
          y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
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

      {/* Mobile Floral Accents */}
      <div className="absolute top-0 -left-20 w-48 md:hidden" style={{ opacity: 0.12 }}>
        <img src="/column-left.png" alt="" className="w-full" />
      </div>
      <div className="absolute top-0 -right-20 w-48 md:hidden" style={{ opacity: 0.12 }}>
        <img src="/column-right.png" alt="" className="w-full" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-20 flex flex-col items-center">
        <AnimatedSection direction="fade" className="w-full text-center mb-16 md:mb-20">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl mb-6"
            style={{ fontFamily: "'Great Vibes', cursive", color: THEME_COLOR, opacity: 0.9 }}
          >
            Countdown
          </h2>
          <p
            className="text-[10px] md:text-xs uppercase tracking-[0.6em] font-semibold"
            style={{ fontFamily: "'Montserrat', sans-serif", color: THEME_COLOR, opacity: 0.6 }}
          >
            {t.until}
          </p>
        </AnimatedSection>

        {mounted && (
          <div className="w-full max-w-3xl">
            {time.isOver ? (
              <AnimatedSection direction="fade" className="text-center">
                <h3
                  className="text-3xl md:text-5xl font-serif mb-4"
                  style={{ color: THEME_COLOR, opacity: 0.95 }}
                >
                  {t.over}
                </h3>
              </AnimatedSection>
            ) : (
              <AnimatedSection direction="up" delay={0.2}>
                <div className="flex items-center justify-center gap-5 md:gap-14">
                  <Digit value={time.days} label={t.days} />
                  <div className="h-12 w-[1px] bg-[#3D5A5B]/15 self-center hidden sm:block" />
                  <Digit value={time.hours} label={t.hours} />
                  <div className="h-12 w-[1px] bg-[#3D5A5B]/15 self-center hidden sm:block" />
                  <Digit value={time.minutes} label={t.minutes} />
                </div>
              </AnimatedSection>
            )}
          </div>
        )}
      </div>
    </section>
  );
}