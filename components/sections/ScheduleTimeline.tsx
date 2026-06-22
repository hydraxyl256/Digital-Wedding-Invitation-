"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useWedding } from "@/components/providers/WeddingContext";

const THEME_COLOR = "#3D5A5B";

const TEXTS = {
  EN: {
    title: "Wedding Weekend",
    itinerary: "Itinerary",
    dates: "16 August 2026",
    welcomeCruise: "Welcome Cruise on Lake Como",
    cruiseDate: "16 August 2026",
    cruiseIntro: "Please join us for cocktails and hors d'oeuvres as we sail the lake at golden hour",
    wedding: "Wedding",
    weddingSub: "16 August 2026 · Palazzo Gallio",
    cruiseItems: [
      { time: "3:00 PM", event: "Boarding from the Private Pier" },
      { time: "3:30 – 5:00 PM", event: "Sunset Cocktails & Hors d'Œuvres" },
      { time: "5:30 PM", event: "Return to the Private Pier" },
    ],
    weddingItems: [
      { time: "3:00 PM", event: "Arrival & Welcome" },
      { time: "", event: "Ceremony" },
      { time: "", event: "Banquet" },
      { time: "", event: "Celebration" },
      { time: "", event: "After Party" },
    ],
  },
  IT: {
    title: "Weekend del Matrimonio",
    itinerary: "Programma",
    dates: "16 Agosto 2026",
    welcomeCruise: "Crociera di Benvenuto sul Lago di Como",
    cruiseDate: "16 Agosto 2026",
    cruiseIntro: "Unitevi a noi per cocktail e stuzzichini mentre navighiamo sul lago al tramonto",
    wedding: "Matrimonio",
    weddingSub: "16 Agosto 2026 · Palazzo Gallio",
    cruiseItems: [
      { time: "15:00", event: "Imbarco dal Molo Privato" },
      { time: "15:30 – 17:00", event: "Cocktail al Tramonto & Stuzzichini" },
      { time: "17:30", event: "Ritorno al Molo Privato" },
    ],
    weddingItems: [
      { time: "15:00", event: "Arrivo & Benvenuto" },
      { time: "", event: "Cerimonia" },
      { time: "", event: "Banchetto" },
      { time: "", event: "Festa" },
      { time: "", event: "After Party" },
    ],
  },
};

function Dot() {
  return (
    <div
      className="w-3 h-3 rounded-full border z-10 shrink-0 mt-1"
      style={{ background: "#f0f0e4", borderColor: "rgba(61,90,91,0.4)" }}
    />
  );
}

function TimelineBlock({ items }: { items: { time: string; event: string }[] }) {
  return (
    <div className="w-full max-w-sm relative flex flex-col gap-5 sm:gap-6 md:gap-8">
      <div
        className="absolute left-[5px] top-2 bottom-2 w-[1px]"
        style={{ background: "rgba(61,90,91,0.2)" }}
      />
      {items.map((item, index) => (
        <AnimatedSection key={index} direction="up" delay={index * 0.08}>
          <div className="flex items-start gap-4 sm:gap-5 md:gap-6">
            <Dot />
            <div className="flex flex-col gap-1 min-w-0 flex-1">
              {item.time && (
                <span
                  className="uppercase tracking-[0.35em] sm:tracking-[0.4em] font-bold"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    color: THEME_COLOR,
                    opacity: 0.6,
                    fontSize: "clamp(7px, 0.85vw, 10px)",
                  }}
                >
                  {item.time}
                </span>
              )}
              <p
                className="font-serif"
                style={{
                  color: THEME_COLOR,
                  opacity: 0.9,
                  fontSize: "clamp(0.85rem, 1.1vw, 0.95rem)",
                }}
              >
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
  const t = TEXTS[language as keyof typeof TEXTS] ?? TEXTS.EN;

  return (
    <section
      data-section
      className="relative bg-[#f0f0e4] overflow-hidden flex flex-col items-center"
      style={{
        paddingTop: "clamp(6rem, 12vw, 10rem)",
        paddingBottom: "clamp(5rem, 8vw, 8rem)",
      }}
    >
      {/* Curtains */}
      <motion.div
        animate={{ rotate: [-0.5, 0.5, -0.5] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-0 top-0 z-30 w-[20%] sm:w-[15%] md:w-[13%] origin-top-left pointer-events-none"
      >
        <img src="/curtain-left.png" alt="" className="w-full h-auto" />
      </motion.div>

      <motion.div
        animate={{ rotate: [0.5, -0.5, 0.5] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-0 top-0 z-30 w-[20%] sm:w-[15%] md:w-[13%] origin-top-right pointer-events-none"
      >
        <img src="/curtain-right.png" alt="" className="w-full h-auto" />
      </motion.div>

      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 z-0 w-full md:w-[80%] lg:w-[70%] pointer-events-none"
      >
        <img
          src="/curtain-center.png"
          alt=""
          className="w-full h-auto"
          style={{ opacity: 0.32 }}
        />
      </motion.div>

      {/* PART 1: WELCOME CRUISE */}
      <div
        className="relative z-20 w-full max-w-2xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center"
        style={{
          paddingTop: "clamp(8rem, 25vw, 22rem)",
          paddingBottom: "clamp(3rem, 5vw, 6rem)",
        }}
      >
        <AnimatedSection
          direction="fade"
          className="text-center mb-8 sm:mb-12 md:mb-16 flex flex-col items-center gap-2 sm:gap-3"
        >
          <h2
            style={{
              fontFamily: "'Great Vibes', cursive",
              color: THEME_COLOR,
              opacity: 0.9,
              fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
              lineHeight: 1.1,
            }}
          >
            {t.title}
          </h2>
          <p
            className="uppercase tracking-[0.5em] sm:tracking-[0.7em] font-bold"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              color: THEME_COLOR,
              opacity: 0.55,
              fontSize: "clamp(8px, 0.85vw, 10px)",
            }}
          >
            {t.itinerary}
          </p>
          <p
            className="uppercase tracking-[0.3em] sm:tracking-[0.35em] font-medium"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              color: THEME_COLOR,
              opacity: 0.65,
              fontSize: "clamp(9px, 0.95vw, 11px)",
            }}
          >
            {t.dates}
          </p>
        </AnimatedSection>

        <AnimatedSection
          direction="fade"
          className="text-center mb-8 sm:mb-10 md:mb-12 flex flex-col items-center gap-2 sm:gap-3"
        >
          <h3
            className="leading-tight"
            style={{
              fontFamily: "'Great Vibes', cursive",
              color: THEME_COLOR,
              fontSize: "clamp(1.8rem, 4.5vw, 3.5rem)",
            }}
          >
            {t.welcomeCruise}
          </h3>
          <p
            className="font-serif italic"
            style={{
              color: THEME_COLOR,
              opacity: 0.7,
              fontSize: "clamp(9px, 0.95vw, 11px)",
            }}
          >
            {t.cruiseDate}
          </p>
          <p
            className="max-w-xs text-center leading-relaxed mt-1"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              color: THEME_COLOR,
              opacity: 0.7,
              fontSize: "clamp(9px, 1vw, 12px)",
            }}
          >
            {t.cruiseIntro}
          </p>
        </AnimatedSection>

        <TimelineBlock items={t.cruiseItems} />
      </div>

      {/* PART 2: THE WEDDING */}
      <div
        className="relative z-20 w-full max-w-2xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center"
        style={{
          paddingTop: "clamp(2.5rem, 4vw, 5rem)",
          paddingBottom: "clamp(3.5rem, 6vw, 6rem)",
        }}
      >
        <motion.img
          src="/candles.png"
          alt=""
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
          className="h-auto mb-4 sm:mb-6 md:mb-8"
          style={{
            width: "clamp(5rem, 12vw, 12rem)",
            opacity: 0.92,
          }}
        />

        <AnimatedSection
          direction="fade"
          className="text-center mb-8 sm:mb-10 md:mb-14 flex flex-col items-center gap-2 sm:gap-3"
        >
          <h2
            style={{
              fontFamily: "'Great Vibes', cursive",
              color: THEME_COLOR,
              opacity: 0.9,
              fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
              lineHeight: 1.1,
            }}
          >
            {t.wedding}
          </h2>
          <p
            className="uppercase tracking-[0.4em] sm:tracking-[0.5em] font-medium"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              color: THEME_COLOR,
              opacity: 0.65,
              fontSize: "clamp(9px, 0.95vw, 11px)",
            }}
          >
            {t.weddingSub}
          </p>
        </AnimatedSection>

        <div className="relative w-full flex justify-center">
          <TimelineBlock items={t.weddingItems} />
          <motion.img
            src="/vase.png"
            alt=""
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="absolute right-0 bottom-0 h-auto hidden md:block pointer-events-none"
            style={{
              width: "clamp(7rem, 10vw, 10rem)",
              opacity: 0.85,
            }}
          />
        </div>
      </div>
    </section>
  );
}