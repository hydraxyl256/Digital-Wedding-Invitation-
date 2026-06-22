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
      style={{ paddingTop: "14rem", paddingBottom: "10rem" }}
    >
      <div className="w-full max-w-3xl mx-auto px-6 md:px-8 flex flex-col items-center">
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
              style={{ width: 200, top: -64, left: -48 }}
            />

            <motion.img
              src="/roses.png"
              alt=""
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, delay: 0.2 }}
              className="absolute pointer-events-none z-20 hidden md:block"
              style={{ width: 180, bottom: -56, right: -40, transform: "rotate(180deg)", opacity: 0.85 }}
            />

            {/* Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="w-full bg-white/45 backdrop-blur-sm border border-white/70 rounded-[28px] md:rounded-[48px] flex flex-col items-center text-center px-8 py-10 md:px-20 md:py-20"
            >
              <h2
                className="mb-5 md:mb-8"
                style={{ fontFamily: "'Great Vibes', cursive", color: THEME, fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
              >
                {t.title}
              </h2>
              <div
                className="w-1.5 h-1.5 rounded-full mb-5 md:mb-8"
                style={{ background: "rgba(61,90,91,0.25)" }}
              />
              <p
                className="font-serif italic mb-5 md:mb-8 text-base md:text-lg"
                style={{ color: THEME, lineHeight: 1.7, opacity: 0.85 }}
              >
                {t.subtitle}
              </p>
              <p
                className="leading-relaxed max-w-sm text-sm md:text-[0.95rem]"
                style={{ fontFamily: "'Montserrat', sans-serif", color: THEME, lineHeight: 1.9, opacity: 0.7 }}
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