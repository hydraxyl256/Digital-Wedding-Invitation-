"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useWedding } from "@/components/providers/WeddingContext";

const THEME_COLOR = "#3D5A5B";

const TEXTS = {
  EN: {
    title: "Dress Code",
    card1Title: "Welcome Cruise",
    card1Date: "16 August",
    card1Attire: "Garden Cocktail Attire",
    card1Hint: "Light, breezy, and elegant — think flowing fabrics, neutral tones, and comfortable shoes for the pier.",
    card2Title: "Wedding",
    card2Date: "16 August",
    card2Attire: "Black Tie",
    card2Hint: "Floor-length gowns and tuxedos. Rich jewel tones welcome. Please avoid white, ivory, and cream.",
    paletteLabel: "Suggested palette",
    palette: ["#3D5A5B", "#C9A84C", "#F2D4D7", "#7B6B3A", "#1A1208"],
  },
  IT: {
    title: "Codice di Abbigliamento",
    card1Title: "Crociera di Benvenuto",
    card1Date: "16 Agosto",
    card1Attire: "Cocktail da Giardino",
    card1Hint: "Leggero, arioso ed elegante — tessuti fluidi, tonalità neutre e scarpe comode per il molo.",
    card2Title: "Matrimonio",
    card2Date: "16 Agosto",
    card2Attire: "Black Tie",
    card2Hint: "Abiti lunghi e smoking. Toni gioiello benvenuti. Si prega di evitare bianco, avorio e crema.",
    paletteLabel: "Palette suggerita",
    palette: ["#3D5A5B", "#C9A84C", "#F2D4D7", "#7B6B3A", "#1A1208"],
  },
};

function Swatch({ color }: { color: string }) {
  return (
    <div
      className="w-9 h-9 md:w-11 md:h-11 rounded-full border border-white/70 shadow-sm"
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
      className="relative bg-[#f0f0e4] overflow-hidden flex flex-col items-center"
      style={{ paddingTop: "10rem", paddingBottom: "12rem" }}
    >
      <div className="w-full max-w-3xl mx-auto px-6 md:px-16 flex flex-col items-center gap-12 md:gap-20">
        <AnimatedSection direction="fade">
          <h2
            className="text-5xl md:text-6xl lg:text-7xl text-center"
            style={{ fontFamily: "'Great Vibes', cursive", color: THEME_COLOR, opacity: 0.92 }}
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
            className="absolute pointer-events-none z-20 hidden md:block"
            style={{ width: 160, top: -56, left: -40 }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }}
            className="w-full bg-white/45 backdrop-blur-sm border border-white/70 rounded-[28px] md:rounded-[44px] shadow-[0_8px_32px_rgba(61,90,91,0.06)] px-6 py-12 md:px-16 md:py-20"
          >
            <div className="flex flex-col items-center justify-center text-center gap-5">
              <h3
                className="text-4xl md:text-6xl"
                style={{ fontFamily: "'Great Vibes', cursive", color: THEME_COLOR }}
              >
                {t.card1Title}
              </h3>
              <p
                className="text-[10px] md:text-xs uppercase tracking-[0.6em] font-bold"
                style={{ fontFamily: "'Montserrat', sans-serif", color: THEME_COLOR, opacity: 0.6 }}
              >
                {t.card1Date}
              </p>
              <p
                className="text-[10px] md:text-xs uppercase tracking-[0.35em] font-semibold mt-2"
                style={{ fontFamily: "'Montserrat', sans-serif", color: THEME_COLOR, opacity: 0.85 }}
              >
                {t.card1Attire}
              </p>
              <p
                className="font-serif italic text-sm md:text-base max-w-md leading-relaxed mt-2"
                style={{ color: THEME_COLOR, opacity: 0.75 }}
              >
                {t.card1Hint}
              </p>
            </div>
          </motion.div>
        </div>

        {/* CARD 2 */}
        <div className="relative w-full mb-8 md:mb-16">
          <motion.img
            src="/cypress.png"
            alt=""
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute pointer-events-none z-20"
            style={{ width: "clamp(80px, 12vw, 180px)", bottom: "-2rem", left: "clamp(-8px, -2vw, -60px)" }}
          />

          <motion.img
            src="/stand.png"
            alt=""
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
            className="w-full bg-white/45 backdrop-blur-sm border border-white/70 rounded-[28px] md:rounded-[44px] shadow-[0_8px_32px_rgba(61,90,91,0.06)] px-6 py-12 md:px-16 md:py-20"
          >
            <div className="flex flex-col items-center justify-center text-center gap-5">
              <h3
                className="text-4xl md:text-6xl"
                style={{ fontFamily: "'Great Vibes', cursive", color: THEME_COLOR }}
              >
                {t.card2Title}
              </h3>
              <p
                className="text-[10px] md:text-xs uppercase tracking-[0.6em] font-bold"
                style={{ fontFamily: "'Montserrat', sans-serif", color: THEME_COLOR, opacity: 0.6 }}
              >
                {t.card2Date}
              </p>
              <p
                className="text-[10px] md:text-xs uppercase tracking-[0.35em] font-semibold mt-2"
                style={{ fontFamily: "'Montserrat', sans-serif", color: THEME_COLOR, opacity: 0.9 }}
              >
                {t.card2Attire}
              </p>
              <p
                className="font-serif italic text-sm md:text-base max-w-md leading-relaxed mt-2"
                style={{ color: THEME_COLOR, opacity: 0.75 }}
              >
                {t.card2Hint}
              </p>

              {/* Color palette */}
              <div className="mt-6 flex flex-col items-center gap-3">
                <p
                  className="text-[9px] md:text-[10px] uppercase tracking-[0.5em] font-bold"
                  style={{ fontFamily: "'Montserrat', sans-serif", color: THEME_COLOR, opacity: 0.55 }}
                >
                  {t.paletteLabel}
                </p>
                <div className="flex items-center gap-2.5">
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