"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useWedding } from "@/components/providers/WeddingContext";

const THEME = "#3D5A5B";

const TEXTS = {
  EN: {
    title: "Wedding Gift",
    subtitle: "Your presence is our greatest gift.",
    body: "If you wish to honour us with a gift, we kindly prefer monetary contributions. Bank details will be shared separately.",
  },
  IT: {
    title: "Regalo di Nozze",
    subtitle: "La vostra presenza è il nostro regalo più grande.",
    body: "Se desiderate omaggiarci con un regalo, preferiamo con tutto il cuore un contributo monetario. I dati bancari saranno condivisi separatamente.",
  },
};

export default function WeddingGift() {
  const { language } = useWedding();
  const t = TEXTS[language as keyof typeof TEXTS] ?? TEXTS.EN;

  return (
    <section
      data-section
      className="relative bg-[#f0f0e4] overflow-hidden flex flex-col items-center"
      style={{
        paddingTop: "clamp(7rem, 14vw, 14rem)",
        paddingBottom: "clamp(6rem, 10vw, 10rem)",
      }}
    >
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center">
        <AnimatedSection direction="fade" className="w-full">
          <div className="relative w-full">
            {/* Roses — desktop only */}
            <motion.img
              src="/roses.png"
              alt=""
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4 }}
              className="absolute pointer-events-none z-20 hidden md:block"
              style={{
                width: "clamp(8rem, 14vw, 12.5rem)",
                top: "-4rem",
                left: "-3rem",
              }}
            />

            <motion.img
              src="/roses.png"
              alt=""
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, delay: 0.2 }}
              className="absolute pointer-events-none z-20 hidden md:block"
              style={{
                width: "clamp(7rem, 12vw, 11.25rem)",
                bottom: "-3.5rem",
                right: "-2.5rem",
                transform: "rotate(180deg)",
                opacity: 0.85,
              }}
            />

            {/* Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="w-full bg-white/45 backdrop-blur-sm border border-white/70 rounded-[clamp(1.5rem,4vw,3rem)] flex flex-col items-center text-center"
              style={{
                padding: "clamp(2.5rem, 5vw, 5rem) clamp(1.25rem, 5vw, 5rem)",
              }}
            >
              <h2
                className="mb-4 sm:mb-6 md:mb-8"
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  color: THEME,
                  fontSize: "clamp(2.5rem, 7vw, 5rem)",
                  lineHeight: 1.1,
                }}
              >
                {t.title}
              </h2>
              <div
                className="w-1.5 h-1.5 rounded-full mb-4 sm:mb-6 md:mb-8"
                style={{ background: "rgba(61,90,91,0.25)" }}
              />
              <p
                className="font-serif italic mb-4 sm:mb-6 md:mb-8"
                style={{
                  color: THEME,
                  lineHeight: 1.7,
                  opacity: 0.85,
                  fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
                }}
              >
                {t.subtitle}
              </p>
              <p
                className="leading-relaxed max-w-sm"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  color: THEME,
                  lineHeight: 1.9,
                  opacity: 0.7,
                  fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
                }}
              >
                {t.body}
              </p>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}