"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useWedding } from "@/components/providers/WeddingContext";

const THEME_COLOR = "#3D5A5B";

const CRUISE_ITINERARY_EN = [
  { time: "6:30 PM", event: "Departure from The Peninsula Private Quay" },
  { time: "6:30 – 9:30 PM", event: "Sunset Cocktails & Hors d'Œuvres" },
  { time: "10:00 PM", event: "Arrival at The Peninsula Private Quay" }
];
const CRUISE_ITINERARY_DE = [
  { time: "18:30 Uhr", event: "Abfahrt vom Peninsula Private Quay" },
  { time: "18:30 – 21:30 Uhr", event: "Sonnenuntergangs-Cocktails & Hors d'Œuvres" },
  { time: "22:00 Uhr", event: "Ankunft am Peninsula Private Quay" }
];

const WEDDING_ITINERARY_EN = [
  { time: "6:00 PM", event: "Arrival & Welcome Drinks" },
  { time: "", event: "Ceremony" },
  { time: "", event: "Banquet" },
  { time: "", event: "Party" },
  { time: "", event: "After Party" }
];
const WEDDING_ITINERARY_DE = [
  { time: "18:00 Uhr", event: "Ankunft & Begrüßungsgetränke" },
  { time: "", event: "Zeremonie" },
  { time: "", event: "Bankett" },
  { time: "", event: "Party" },
  { time: "", event: "After-Party" }
];

function Dot() {
  return <div className="w-3 h-3 rounded-full bg-[#f0f0e4] border border-[#3D5A5B]/25 z-10 shrink-0 mt-1" />;
}

function TimelineBlock({ items }: { items: { time: string; event: string }[] }) {
  return (
    <div className="w-full max-w-sm relative flex flex-col gap-6 md:gap-8">
      <div className="absolute left-[5px] top-2 bottom-2 w-[1px] bg-[#3D5A5B]/12" />
      {items.map((item, index) => (
        <AnimatedSection key={index} direction="up" delay={index * 0.08}>
          <div className="flex items-start gap-5 md:gap-6">
            <Dot />
            <div className="flex flex-col gap-1">
              {item.time && (
                <span className="text-[8px] md:text-[9px] uppercase tracking-[0.4em] font-bold opacity-35"
                  style={{ fontFamily: "'Montserrat', sans-serif", color: THEME_COLOR }}>
                  {item.time}
                </span>
              )}
              <p className="text-sm opacity-75 font-serif" style={{ color: THEME_COLOR }}>
                {item.event}
              </p>
            </div>
          </div>
        </AnimatedSection>
      ))}
    </div>
  );
}

export default function ScheduleTimeline() {
  const { language } = useWedding();
  const cruiseItinerary = language === "EN" ? CRUISE_ITINERARY_EN : CRUISE_ITINERARY_DE;
  const weddingItinerary = language === "EN" ? WEDDING_ITINERARY_EN : WEDDING_ITINERARY_DE;

  return (
    <section data-section className="relative bg-[#f0f0e4] overflow-hidden flex flex-col items-center" style={{ paddingTop: "12rem", paddingBottom: "8rem" }}>

      {/* Curtains — same desktop sizes, just slightly narrower on tiny screens */}
      <motion.div animate={{ rotate: [-0.5, 0.5, -0.5] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-0 top-0 z-30 w-[18%] md:w-[13%] origin-top-left pointer-events-none">
        <img src="/curtain-left.png" alt="" className="w-full h-auto" />
      </motion.div>

      <motion.div animate={{ rotate: [0.5, -0.5, 0.5] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-0 top-0 z-30 w-[18%] md:w-[13%] origin-top-right pointer-events-none">
        <img src="/curtain-right.png" alt="" className="w-full h-auto" />
      </motion.div>

      <motion.div animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 z-0 w-full md:w-[80%] lg:w-[70%] pointer-events-none">
        <img src="/curtain-center.png" alt="" className="w-full h-auto opacity-30 md:opacity-35" />
      </motion.div>

      {/* ── PART 1: WELCOME CRUISE ── */}
      {/* Mobile: pt-48 (curtains are shorter), Desktop: pt-[26rem] */}
      <div className="relative z-20 w-full max-w-2xl mx-auto px-6 md:px-8 flex flex-col items-center pt-48 pb-12 md:pt-[26rem] md:pb-24">

        <AnimatedSection direction="fade" className="text-center mb-10 md:mb-16 flex flex-col items-center gap-3">
          <h2 className="text-4xl md:text-5xl lg:text-6xl" style={{ fontFamily: "'Great Vibes', cursive", color: THEME_COLOR }}>
            {language === "EN" ? "Wedding Weekend" : "Hochzeitswochenende"}
          </h2>
          <p className="text-[9px] uppercase tracking-[0.7em] font-bold opacity-30"
            style={{ fontFamily: "'Montserrat', sans-serif", color: THEME_COLOR }}>
            {language === "EN" ? "Itinerary" : "Ablauf"}
          </p>
          <p className="text-[10px] uppercase tracking-[0.35em] font-medium opacity-45"
            style={{ fontFamily: "'Montserrat', sans-serif", color: THEME_COLOR }}>
            {language === "EN" ? "22 – 23 July 2026" : "22. – 23. Juli 2026"}
          </p>
        </AnimatedSection>

        <AnimatedSection direction="fade" className="text-center mb-10 md:mb-12 flex flex-col items-center gap-3">
          <h3 className="text-2xl md:text-4xl lg:text-5xl leading-tight"
            style={{ fontFamily: "'Great Vibes', cursive", color: THEME_COLOR }}>
            {language === "EN" ? "Welcome Cruise on the Bosphorus" : "Willkommens-Kreuzfahrt auf dem Bosporus"}
          </h3>
          <p className="text-[10px] font-serif italic opacity-55" style={{ color: THEME_COLOR }}>
            {language === "EN" ? "22 July 2026" : "22. Juli 2026"}
          </p>
          <p className="text-[10px] md:text-xs max-w-xs text-center leading-relaxed opacity-45 mt-1"
            style={{ fontFamily: "'Montserrat', sans-serif", color: THEME_COLOR }}>
            {language === "EN" 
              ? "Please join us for cocktails and hors d'oeuvres as we sail the Bosphorus" 
              : "Bitte begleiten Sie uns zu Cocktails und Hors d'Œuvres auf einer Fahrt über den Bosporus"}
          </p>
        </AnimatedSection>

        <TimelineBlock items={cruiseItinerary} />
      </div>

      {/* ── PART 2: THE WEDDING ── */}
      <div className="relative z-20 w-full max-w-2xl mx-auto px-6 md:px-8 flex flex-col items-center pt-10 pb-14 md:pt-20 md:pb-24">

        <motion.img src="/candles.png" alt=""
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.4 }}
          className="w-24 md:w-48 h-auto opacity-90 mb-6 md:mb-8"
        />

        <AnimatedSection direction="fade" className="text-center mb-10 md:mb-14 flex flex-col items-center gap-3">
          <h2 className="text-4xl md:text-5xl lg:text-6xl"
            style={{ fontFamily: "'Great Vibes', cursive", color: THEME_COLOR }}>
            {language === "EN" ? "Wedding" : "Hochzeit"}
          </h2>
          <p className="text-[10px] uppercase tracking-[0.5em] font-medium opacity-45"
            style={{ fontFamily: "'Montserrat', sans-serif", color: THEME_COLOR }}>
            {language === "EN" ? "23 July 2026 · The Peninsula Hotel Istanbul" : "23. Juli 2026 · The Peninsula Hotel Istanbul"}
          </p>
        </AnimatedSection>

        <div className="relative w-full flex justify-center">
          <TimelineBlock items={weddingItinerary} />
          {/* Vase hidden on mobile to avoid overflow */}
          <motion.img src="/vase.png" alt=""
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="absolute right-0 bottom-0 w-40 h-auto opacity-80 hidden md:block"
          />
        </div>
      </div>
    </section>
  );
}
