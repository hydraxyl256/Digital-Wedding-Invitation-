"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useWedding } from "@/components/providers/WeddingContext";

const THEME_COLOR = "#2C3E35";

const TEXTS = {
  EN: {
    title: "Dress Code",
    card1Title: "",
    card1Date: "11 October",
    card1Attire: "Garden Cocktail Attire",
    card1Hint: "Light, breezy, and elegant — think flowing fabrics, neutral tones, and comfortable shoes for the pier.",
    card2Title: "Wedding",
    card2Date: "11 October",
    card2Attire: "Black Tie",
    card2Hint: "Floor-length gowns and tuxedos. Rich jewel tones welcome. Please avoid white, ivory, and cream.",
    paletteLabel: "Suggested palette",
    palette: ["#2C3E35", "#7A8B80", "#F8F6F0", "#E3DFD5", "#1A1510"],
  },
  IT: {
    title: "Codice di Abbigliamento",
    card1Title: "",
    card1Date: "11 ottobre",
    card1Attire: "Cocktail da Giardino",
    card1Hint: "Leggero, arioso ed elegante — tessuti fluidi, tonalità neutre e scarpe comode per il molo.",
    card2Title: "Matrimonio",
    card2Date: "11 ottobre",
    card2Attire: "Black Tie",
    card2Hint: "Abiti lunghi e smoking. Toni gioiello benvenuti. Si prega di evitare bianco, avorio e crema.",
    paletteLabel: "Palette suggerita",
    palette: ["#2C3E35", "#7A8B80", "#F8F6F0", "#E3DFD5", "#1A1510"],
  },
};

function Swatch({ color }: { color: string }) {
  return (
    <div
      className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full border border-[#E3DFD5]"
      style={{ background: color }}
      aria-hidden
    />
  );
}

export default function DressCode() {
  const { language } = useWedding();
  const t = TEXTS[language as keyof typeof TEXTS] ?? TEXTS.EN;

  return (
    <section
      data-section
      className="relative bg-transparent overflow-hidden flex flex-col items-center"
      style={{
        paddingTop: "clamp(5rem, 10vw, 10rem)",
        paddingBottom: "clamp(6rem, 12vw, 12rem)",
      }}
    >
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 md:px-16 flex flex-col items-center gap-10 sm:gap-14 md:gap-20">
        <AnimatedSection direction="fade">
          <h2
            className="text-center"
            style={{
              fontFamily: "'Great Vibes', cursive",
              color: THEME_COLOR,
              opacity: 0.92,
              fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
              lineHeight: 1.1,
            }}
          >
            {t.title}
          </h2>
        </AnimatedSection>

        {/* CARD 1 */}
        <div className="relative w-full">
          <motion.img
            src="/roses.png"
            alt=""
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute pointer-events-none z-20"
            style={{
              width: "clamp(7rem, 12vw, 10rem)",
              top: "-3.5rem",
              left: "-2.5rem",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }}
            className="w-full bg-[#F1EFE9] border border-[#E3DFD5] rounded-[clamp(1.5rem,4vw,2.75rem)]"
            style={{
              padding: "clamp(2.5rem, 5vw, 5rem) clamp(1.25rem, 4vw, 4rem)",
            }}
          >
            <div className="flex flex-col items-center justify-center text-center gap-3 sm:gap-4">
              <h3
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  color: THEME_COLOR,
                  fontSize: "clamp(2.2rem, 6vw, 4rem)",
                }}
              >
                {t.card1Title}
              </h3>
              <p
                className="uppercase tracking-[0.5em] sm:tracking-[0.6em] font-bold"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  color: THEME_COLOR,
                  opacity: 0.6,
                  fontSize: "clamp(9px, 0.95vw, 12px)",
                }}
              >
                {t.card1Date}
              </p>
              <p
                className="uppercase tracking-[0.3em] sm:tracking-[0.35em] font-semibold mt-1 sm:mt-2"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  color: THEME_COLOR,
                  opacity: 0.85,
                  fontSize: "clamp(9px, 0.95vw, 12px)",
                }}
              >
                {t.card1Attire}
              </p>
              <p
                className="font-serif italic max-w-md leading-relaxed mt-1 sm:mt-2"
                style={{
                  color: THEME_COLOR,
                  opacity: 0.75,
                  fontSize: "clamp(0.8rem, 1.1vw, 1rem)",
                }}
              >
                {t.card1Hint}
              </p>
            </div>
          </motion.div>
        </div>

        {/* CARD 2 */}
        <div className="relative w-full mb-6 sm:mb-8 md:mb-16">
          <motion.img
            src="/cypress.png"
            alt=""
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute pointer-events-none z-20"
            style={{
              width: "clamp(4.5rem, 12vw, 11rem)",
              bottom: "-1.5rem",
              left: "clamp(-0.5rem, -2vw, -3.75rem)",
            }}
          />

          <motion.img
            src="/stand.png"
            alt=""
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute pointer-events-none z-20"
            style={{
              width: "clamp(7rem, 10vw, 10rem)",
              top: "-1.9rem",
              right: "-3.1rem",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }}
            className="w-full bg-[#F1EFE9] border border-[#E3DFD5] rounded-[clamp(1.5rem,4vw,2.75rem)]"
            style={{
              padding: "clamp(2.5rem, 5vw, 5rem) clamp(1.25rem, 4vw, 4rem)",
            }}
          >
            <div className="flex flex-col items-center justify-center text-center gap-3 sm:gap-4">
              <h3
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  color: THEME_COLOR,
                  fontSize: "clamp(2.2rem, 6vw, 4rem)",
                }}
              >
                {t.card2Title}
              </h3>
              <p
                className="uppercase tracking-[0.5em] sm:tracking-[0.6em] font-bold"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  color: THEME_COLOR,
                  opacity: 0.6,
                  fontSize: "clamp(9px, 0.95vw, 12px)",
                }}
              >
                {t.card2Date}
              </p>
              <p
                className="uppercase tracking-[0.3em] sm:tracking-[0.35em] font-semibold mt-1 sm:mt-2"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  color: THEME_COLOR,
                  opacity: 0.9,
                  fontSize: "clamp(9px, 0.95vw, 12px)",
                }}
              >
                {t.card2Attire}
              </p>
              <p
                className="font-serif italic max-w-md leading-relaxed mt-1 sm:mt-2"
                style={{
                  color: THEME_COLOR,
                  opacity: 0.75,
                  fontSize: "clamp(0.8rem, 1.1vw, 1rem)",
                }}
              >
                {t.card2Hint}
              </p>

              {/* Color palette */}
              <div className="mt-4 sm:mt-6 flex flex-col items-center gap-2 sm:gap-3">
                <p
                  className="uppercase tracking-[0.4em] sm:tracking-[0.5em] font-bold"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    color: THEME_COLOR,
                    opacity: 0.55,
                    fontSize: "clamp(8px, 0.85vw, 10px)",
                  }}
                >
                  {t.paletteLabel}
                </p>
                <div className="flex items-center gap-2 sm:gap-2.5">
                  {t.palette.map((c) => (
                    <Swatch key={c} color={c} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}