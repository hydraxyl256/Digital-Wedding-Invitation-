"use client";

import { motion, useReducedMotion } from "framer-motion";
import { weddingConfig } from "@/lib/wedding-config";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useWedding } from "@/components/providers/WeddingContext";

// ─── Local tokens ────────────────────────────────────────────────────────
// Kept private to this component so the rest of the design system is not
// perturbed by a one-off invitation treatment.
const COLOR = {
  ivory:    "#F6F1E6", // warm parchment ground
  ink:      "#2C2A26", // editorial charcoal (slightly warmer than theme)
  inkSoft:  "#5A554C", // secondary text
  gold:     "#B49A57", // antique champagne — used only for hairline rules
  goldSoft: "rgba(180,154,87,0.35)",
  paper:    "rgba(120,100,60,0.06)", // micro-texture tint
} as const;

const TEXTS = {
  EN: {
    line1: "We request the pleasure of your company",
    line2: "To celebrate our wedding on",
    month: "October",
    weekday: "Sunday",
    held: "To be held at",
  },
  IT: {
    line1: "Con il piacere della vostra compagnia",
    line2: "Celebriamo il nostro matrimonio il",
    month: "ottobre",
    weekday: "Domenica",
    held: "Presso",
  },
};

export default function FormalInvitation() {
  const { language } = useWedding();
  const t = TEXTS[language as keyof typeof TEXTS] ?? TEXTS.EN;
  const reduceMotion = useReducedMotion();

  return (
    <section
      data-section
      aria-label={language === "IT" ? "Invito formale" : "Formal invitation"}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundColor: COLOR.ivory,
        // Two soft radial gradients produce an almost-imperceptible warm
        // tonal variation; reads as paper rather than as decoration.
        backgroundImage: [
          "radial-gradient(120% 80% at 50% 18%, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0) 60%)",
          "radial-gradient(80% 60% at 50% 100%, rgba(180,154,87,0.06) 0%, rgba(180,154,87,0) 70%)",
        ].join(", "),
        paddingBlock: "clamp(4rem, 9vw, 8rem)",
      }}
    >
      {/* Existing invitation-card image, kept but quieted for restraint. */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/invitation-card.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.10,
          mixBlendMode: "multiply",
        }}
      />

      {/* Hairline double-rule editorial frame, drawn as a single absolute
          layer behind the content. Uses :where-friendly inset via border-
          inside-box approach so spacing adapts fluidly. */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center"
      >
        <div
          className="relative h-full w-full"
          style={{
            marginInline: "clamp(1rem, 5vw, 5rem)",
            marginBlock: "clamp(2rem, 6vw, 5rem)",
            border: `1px solid ${COLOR.goldSoft}`,
            borderRadius: "2px",
          }}
        >
          {/* Inner double-rule */}
          <div
            className="absolute"
            style={{
              inset: "6px",
              border: `1px solid ${COLOR.goldSoft}`,
              borderRadius: "2px",
            }}
          />
        </div>
      </div>

      <AnimatedSection
        direction="fade"
        className="relative z-10 w-full max-w-3xl mx-auto"
      >
        {/* The card itself sits inside the frame's safe area. */}
        <div
          className="text-center flex flex-col items-center"
          style={{
            gap: "clamp(1.75rem, 4vw, 3rem)",
            paddingInline: "clamp(1.5rem, 5vw, 4rem)",
          }}
        >
          {/* Invitation wording — small, tracked, restrained. */}
          <div
            className="flex flex-col items-center w-full"
            style={{ gap: "clamp(0.5rem, 1.2vw, 0.85rem)" }}
          >
            <p
              className="uppercase font-semibold"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                color: COLOR.ink,
                letterSpacing: "0.42em",
                fontSize: "clamp(0.65rem, 0.8vw, 0.85rem)",
                opacity: 0.78,
              }}
            >
              {t.line1}
            </p>
            <p
              className="uppercase font-medium"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                color: COLOR.inkSoft,
                letterSpacing: "0.32em",
                fontSize: "clamp(0.6rem, 0.7vw, 0.75rem)",
              }}
            >
              {t.line2}
            </p>
          </div>

          {/* Date — month / day / year in a quiet editorial row. */}
          <div
            className="flex items-center justify-center w-full"
            style={{
              gap: "clamp(1rem, 4vw, 3.5rem)",
              marginBlock: "clamp(0.5rem, 1.5vw, 1rem)",
            }}
          >
            {/* Month */}
            <div className="flex flex-col items-center" style={{ gap: 8 }}>
              <span
                aria-hidden
                style={{
                  display: "block",
                  width: "clamp(2.5rem, 6vw, 4.5rem)",
                  height: "1px",
                  background: COLOR.gold,
                  opacity: 0.7,
                }}
              />
              <span
                className="uppercase"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: COLOR.ink,
                  letterSpacing: "0.34em",
                  fontSize: "clamp(0.95rem, 1.5vw, 1.25rem)",
                  fontWeight: 500,
                }}
              >
                {t.month}
              </span>
              <span
                aria-hidden
                style={{
                  display: "block",
                  width: "clamp(2.5rem, 6vw, 4.5rem)",
                  height: "1px",
                  background: COLOR.gold,
                  opacity: 0.7,
                }}
              />
            </div>

            {/* Day — the engraved focal number. */}
            <motion.span
              aria-label={`Day ${11}`}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="leading-none"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: COLOR.ink,
                fontWeight: 400,
                fontSize: "clamp(4.5rem, 12vw, 8.5rem)",
                letterSpacing: "-0.02em",
              }}
            >
              11
            </motion.span>

            {/* Year */}
            <div className="flex flex-col items-center" style={{ gap: 8 }}>
              <span
                aria-hidden
                style={{
                  display: "block",
                  width: "clamp(2.5rem, 6vw, 4.5rem)",
                  height: "1px",
                  background: COLOR.gold,
                  opacity: 0.7,
                }}
              />
              <span
                className="uppercase"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: COLOR.ink,
                  letterSpacing: "0.34em",
                  fontSize: "clamp(0.95rem, 1.5vw, 1.25rem)",
                  fontWeight: 500,
                }}
              >
                2026
              </span>
              <span
                aria-hidden
                style={{
                  display: "block",
                  width: "clamp(2.5rem, 6vw, 4.5rem)",
                  height: "1px",
                  background: COLOR.gold,
                  opacity: 0.7,
                }}
              />
            </div>
          </div>

          {/* Weekday — quieter than the date. */}
          <p
            className="uppercase"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              color: COLOR.inkSoft,
              letterSpacing: "0.5em",
              fontSize: "clamp(0.6rem, 0.75vw, 0.78rem)",
              marginTop: "-0.5rem",
            }}
          >
            {t.weekday}
          </p>

          {/* Divider — fine antique-gold hairline. */}
          <div
            aria-hidden
            className="flex items-center justify-center w-full"
            style={{ gap: 12 }}
          >
            <span
              style={{
                display: "block",
                flex: 1,
                maxWidth: 120,
                height: "1px",
                background: COLOR.gold,
                opacity: 0.6,
              }}
            />
            <span
              aria-hidden
              style={{
                width: 5,
                height: 5,
                background: COLOR.gold,
                borderRadius: "50%",
                opacity: 0.7,
              }}
            />
            <span
              style={{
                display: "block",
                flex: 1,
                maxWidth: 120,
                height: "1px",
                background: COLOR.gold,
                opacity: 0.6,
              }}
            />
          </div>

          {/* Venue */}
          <div
            className="flex flex-col items-center"
            style={{ gap: "clamp(0.6rem, 1.4vw, 1rem)" }}
          >
            <p
              className="uppercase font-semibold"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                color: COLOR.ink,
                letterSpacing: "0.42em",
                fontSize: "clamp(0.65rem, 0.8vw, 0.85rem)",
                opacity: 0.78,
              }}
            >
              {t.held}
            </p>
            <p
              style={{
                fontFamily: "'Great Vibes', cursive",
                color: COLOR.ink,
                fontSize: "clamp(2rem, 4.5vw, 3rem)",
                lineHeight: 1.1,
              }}
            >
              {weddingConfig.ceremony.name}
            </p>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}