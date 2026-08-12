"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useWedding } from "@/components/providers/WeddingContext";

// ─── Theme tokens (untouched from the approved design) ───────────────────
const THEME_COLOR = "#2C3E35";

// Localization is preserved for the section title in case other sections
// share the locale context, but the new editorial copy is English-only and
// approved as supplied — it is not auto-translated into Italian.
const TEXTS = {
  EN: { title: "Dress Code" },
  IT: { title: "Codice di Abbigliamento" },
} as const;

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
        <AnimatedSection direction="fade" className="sr-only">
          <h2>{t.title}</h2>
        </AnimatedSection>

        {/* ─── CARD 1 — DRESS CODE ─────────────────────────────────────── */}
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
            <div className="flex flex-col items-center justify-center text-center gap-4 sm:gap-6">

              {/* Card 1 label — DRESS CODE */}
              <p
                className="uppercase tracking-[0.4em] sm:tracking-[0.5em] font-bold"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  color: THEME_COLOR,
                  opacity: 0.6,
                  fontSize: "clamp(9px, 0.95vw, 12px)",
                }}
              >
                Dress Code
              </p>

              {/* Main title — TIMELESS ROYAL ELEGANCE */}
              <h3
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  color: THEME_COLOR,
                  fontSize: "clamp(2.2rem, 6vw, 4rem)",
                  lineHeight: 1.1,
                }}
              >
                Timeless Royal Elegance
              </h3>

              {/* Descriptor — Formal • Sophisticated • Regal */}
              <p
                className="uppercase tracking-[0.3em] sm:tracking-[0.35em] font-semibold"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  color: THEME_COLOR,
                  opacity: 0.7,
                  fontSize: "clamp(9px, 0.95vw, 12px)",
                }}
              >
                Formal &nbsp;&middot;&nbsp; Sophisticated &nbsp;&middot;&nbsp; Regal
              </p>

              {/* Introductory italic statement */}
              <p
                className="font-serif italic max-w-md leading-relaxed mt-1 sm:mt-2"
                style={{
                  color: THEME_COLOR,
                  opacity: 0.75,
                  fontSize: "clamp(0.95rem, 1.25vw, 1.15rem)",
                }}
              >
                Come dressed for a celebration worthy
                <br />
                of a love story that belongs among the ages.
              </p>

              {/* Scripture */}
              <blockquote
                className="font-serif italic leading-relaxed mt-2 sm:mt-4"
                style={{
                  color: THEME_COLOR,
                  opacity: 0.85,
                  fontSize: "clamp(1.05rem, 1.55vw, 1.4rem)",
                  maxWidth: "32ch",
                  margin: 0,
                }}
              >
                <span aria-hidden>&ldquo;</span>What God has joined together,
                <br />
                let no one separate.<span aria-hidden>&rdquo;</span>
                <footer
                  className="not-italic mt-3 sm:mt-4 font-serif"
                  style={{
                    fontSize: "clamp(0.8rem, 1.05vw, 0.95rem)",
                    opacity: 0.7,
                    letterSpacing: "0.02em",
                  }}
                >
                  &mdash; Mark 10:9
                </footer>
              </blockquote>

              {/* Couple signature — RICHARD & ANITA */}
              <h4
                className="mt-2 sm:mt-4"
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  color: THEME_COLOR,
                  fontSize: "clamp(1.9rem, 5vw, 3.4rem)",
                  lineHeight: 1.1,
                }}
              >
                Richard <span style={{ fontStyle: "italic" }}>&amp;</span> Anita
              </h4>

              {/* Closing italic statement */}
              <p
                className="font-serif italic max-w-md leading-relaxed"
                style={{
                  color: THEME_COLOR,
                  opacity: 0.75,
                  fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
                }}
              >
                One love. One promise. One beautiful forever.
              </p>

            </div>
          </motion.div>
        </div>

        {/* ─── CARD 2 — THE WEDDING CELEBRATION ──────────────────────── */}
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
            <div className="flex flex-col items-center justify-center text-center gap-4 sm:gap-6">

              {/* Heading — THE WEDDING CELEBRATION */}
              <h3
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  color: THEME_COLOR,
                  fontSize: "clamp(2.2rem, 6vw, 4rem)",
                  lineHeight: 1.1,
                }}
              >
                The Wedding Celebration
              </h3>

              {/* Date — Sunday, 11 October 2026 */}
              <p
                className="font-serif"
                style={{
                  color: THEME_COLOR,
                  opacity: 0.85,
                  fontSize: "clamp(1rem, 1.4vw, 1.25rem)",
                  letterSpacing: "0.01em",
                }}
              >
                Sunday, 11 October 2026
              </p>

              {/* Venue — Palazzo Gallio / Lake Como, Italy */}
              <div
                className="flex flex-col items-center"
                style={{ gap: "clamp(0.15rem, 0.4vw, 0.3rem)" }}
              >
                <p
                  className="font-serif italic"
                  style={{
                    color: THEME_COLOR,
                    fontSize: "clamp(1.15rem, 1.7vw, 1.5rem)",
                    fontWeight: 500,
                  }}
                >
                  Palazzo Gallio
                </p>
                <p
                  className="uppercase tracking-[0.25em] sm:tracking-[0.3em] font-medium"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    color: THEME_COLOR,
                    opacity: 0.7,
                    fontSize: "clamp(9px, 0.95vw, 12px)",
                  }}
                >
                  Lake Como, Italy
                </p>
              </div>

              {/* Closing italic description */}
              <p
                className="font-serif italic max-w-md leading-relaxed mt-2 sm:mt-4"
                style={{
                  color: THEME_COLOR,
                  opacity: 0.75,
                  fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
                }}
              >
                An evening of timeless romance, regal elegance,
                <br />
                and a love that will last for generations.
              </p>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}