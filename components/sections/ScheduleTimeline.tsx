"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useWedding } from "@/components/providers/WeddingContext";
import { weddingTimelineDisplayItems } from "@/lib/data/weddingSchedule";
import ScheduleDownload from "@/components/sections/ScheduleDownload";

const THEME_COLOR = "#2C3E35";

const TEXTS = {
  EN: {
    title: "",
    itinerary: "",
    dates: "",
    welcomeCruise: "",
    cruiseDate: "",
    cruiseIntro: "",
    wedding: "Wedding",
    weddingSub: "",
    cruiseItems: [
      // { time: "", event: "Boarding from the Private Pier" },
      // { time: "", event: "Sunset Cocktails & Hors d'Œuvres" },
      // { time: "", event: "Return to the Private Pier" },
    ],
    // Timeline rows are sourced from the shared schedule data so the site
    // timeline and the downloadable program PDF can never drift apart.
    weddingItems: weddingTimelineDisplayItems,
  },
  IT: {
    title: "",
    itinerary: "",
    dates: "",
    welcomeCruise: "",
    cruiseDate: "",
    cruiseIntro: "",
    wedding: "Matrimonio",
    weddingSub: "",
    cruiseItems: [

    ],
    weddingItems: [
      { time: "2:30 PM", event: "Arrivo degli ospiti" },
      { time: "3:30 PM", event: "Cerimonia" },
      { time: "4:15 PM", event: "Aperitivo nei giardini" },
      { time: "5:30 PM", event: "Ritratti al tramonto" },
      { time: "6:30 PM", event: "Cena di ricevimento" },
      { time: "8:30 PM", event: "Discorsi e brindisi" },
      { time: "9:00 PM", event: "Taglio della torta" },
      { time: "9:30 PM", event: "Primo ballo" },
      { time: "10:00 PM", event: "Balli sotto le stelle" },
      { time: "11:30 PM", event: "Saluto con le stelline luminose" },
    ],
  },
};



function TimelineBlock({ items }: { items: { time: string; event: string }[] }) {
  return (
    <div className="w-full max-w-sm relative flex flex-col gap-6 sm:gap-8 pt-4 sm:pt-6 md:pt-8 mx-auto">
      {items.map((item, index) => (
        <AnimatedSection key={index} direction="up" delay={index * 0.08} className="w-full">
          <div className="flex flex-col items-center text-center gap-1.5 w-full">
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
                fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
              }}
            >
              {item.event}
            </p>
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
      className="relative bg-transparent overflow-hidden flex flex-col items-center"
      style={{
        paddingTop: "clamp(5rem, 10vw, 10rem)",
        paddingBottom: "clamp(5rem, 8vw, 8rem)",
      }}
    >
      {/* Curtains */}
      <motion.div
        initial={{ x: "40vw" }}
        whileInView={{ x: 0 }}
        animate={{ skewX: [-2, 2, -2] }}
        transition={{
          x: { duration: 2, ease: [0.22, 1, 0.36, 1] },
          skewX: { duration: 12, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute left-0 top-0 z-30 w-[20%] sm:w-[15%] md:w-[13%] origin-top pointer-events-none"
      >
        <img src="/curtain-left.png" alt="" className="w-full h-auto" />
      </motion.div>

      <motion.div
        initial={{ x: "-40vw" }}
        whileInView={{ x: 0 }}
        animate={{ skewX: [2, -2, 2] }}
        transition={{
          x: { duration: 2, ease: [0.22, 1, 0.36, 1] },
          skewX: { duration: 13, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute right-0 top-0 z-30 w-[20%] sm:w-[15%] md:w-[13%] origin-top pointer-events-none"
      >
        <img src="/curtain-right.png" alt="" className="w-full h-auto" />
      </motion.div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-0 w-full md:w-[80%] lg:w-[70%] pointer-events-none">
        <motion.div
          animate={{ rotate: [-1.5, 1.5, -1.5], skewX: [-1, 1, -1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="w-full origin-top"
        >
          <img
            src="/curtain-center.png"
            alt=""
            className="w-full h-auto"
            style={{ opacity: 0.32 }}
          />
        </motion.div>
      </div>



      {/* PART 2: THE WEDDING */}
      <div
        className="relative z-20 w-full max-w-2xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center"
        style={{
          paddingTop: "clamp(1.5rem, 3vw, 3rem)",
          paddingBottom: "clamp(3.5rem, 6vw, 6rem)",
        }}
      >
        <motion.img
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

        <ScheduleDownload />
      </div>
    </section>
  );
}