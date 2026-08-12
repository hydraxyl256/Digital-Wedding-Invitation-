"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type CSSProperties } from "react";

// ─── Local tokens ────────────────────────────────────────────────────────
// Quiet luxury lives in restraint: warm ivory paper, deep charcoal type,
// a hushed sage for italic emphasis, antique champagne for one hairline.
const COLOR = {
  ivory:     "#F4EFE3",
  ivoryWarm: "#FAF6EB",
  ink:       "#26241F",
  inkSoft:   "#5C574B",
  sage:      "#6F7B6A",
  gold:      "#B49A57",
} as const;

// Approved invitation copy — verbatim from the brief. Wording must not be
// rewritten, paraphrased, summarized, or "improved." Bold markers from the
// brief indicate which words receive a subtle italic-serif emphasis.
const INVITATION = {
  eyebrow:   "A Royal Celebration of Love",
  firstName: "Richard",
  ampersand: "&",
  lastName:  "Anita",
  opening:   "With grateful hearts and the blessing of God,",
  body: [
    "we invite you to join us as we celebrate",
    "the beginning of a beautiful new chapter",
    "in our love story.",
  ],
  closing: {
    emphasis: "Two hearts, two journeys,",
    rest:     "now becoming one.",
  },
} as const;

export default function FormalInvitation() {
  const reduceMotion = useReducedMotion();

  // Slow, gentle, staggered fade-up of the five invitation blocks.
  // Total sequence ~2.4s — under the user's patience threshold.
  const sequence = reduceMotion
    ? { initial: false, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
      };
  const timings = [
    { duration: 0.9, delay: 0.10, ease: [0.22, 1, 0.36, 1] as const },
    { duration: 1.1, delay: 0.30, ease: [0.22, 1, 0.36, 1] as const },
    { duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] as const },
    { duration: 0.8, delay: 0.85, ease: [0.22, 1, 0.36, 1] as const },
    { duration: 1.0, delay: 1.10, ease: [0.22, 1, 0.36, 1] as const },
  ];

  // ─── Type styles (private, restrained palette) ──────────────────────────
  const eyebrowStyle: CSSProperties = {
    fontFamily: "'Montserrat', sans-serif",
    color: COLOR.inkSoft,
    letterSpacing: "0.42em",
    fontSize: "clamp(0.62rem, 0.78vw, 0.82rem)",
    fontWeight: 500,
    textTransform: "uppercase",
  };

  const namesContainerStyle: CSSProperties = {
    fontFamily: "'Cormorant Garamond', serif",
    color: COLOR.ink,
    fontWeight: 500,
    fontSize: "clamp(2.6rem, 6.2vw, 4.6rem)",
    letterSpacing: "0.07em",
    lineHeight: 1.05,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    justifyContent: "center",
    gap: "clamp(0.45rem, 1.4vw, 1rem)",
  };

  const ampersandStyle: CSSProperties = {
    fontFamily: "'Great Vibes', cursive",
    fontWeight: 400,
    fontSize: "0.88em",
    color: COLOR.sage,
    letterSpacing: "0.02em",
    transform: "translateY(-0.12em)",
  };

  const openingStyle: CSSProperties = {
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: "italic",
    color: COLOR.sage,
    fontWeight: 500,
    fontSize: "clamp(1.1rem, 1.55vw, 1.45rem)",
    lineHeight: 1.45,
    letterSpacing: "0.01em",
  };

  const bodyStyle: CSSProperties = {
    fontFamily: "'Cormorant Garamond', serif",
    color: COLOR.ink,
    fontWeight: 400,
    fontSize: "clamp(1.05rem, 1.4vw, 1.35rem)",
    lineHeight: 1.65,
    letterSpacing: "0.005em",
  };

  const closingStyle: CSSProperties = {
    fontFamily: "'Cormorant Garamond', serif",
    color: COLOR.ink,
    fontWeight: 500,
    fontStyle: "italic",
    fontSize: "clamp(1.25rem, 1.95vw, 1.85rem)",
    lineHeight: 1.4,
    letterSpacing: "0.01em",
  };

  return (
    <section
      data-section
      aria-label="Formal wedding invitation"
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: COLOR.ivory,
        // Material: warm ivory ground + a whisper of paper warmth at the
        // top edge. Avoids the "flat default" feel without becoming a
        // gradient. Intentionally non-rendered as an obvious gradient.
        backgroundImage:
          "radial-gradient(120% 60% at 50% 0%, rgba(255,250,236,0.85) 0%, rgba(255,250,236,0) 65%)",
        paddingBlock: "clamp(3.5rem, 6vw, 6rem)",
        minHeight: "100vh",
      }}
    >
      {/* Existing invitation-card image — atmospheric only. Multiply-blended
          and dimmed so it reads as paper grain rather than content. */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/invitation-card.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.07,
          mixBlendMode: "multiply",
        }}
      />

      {/* Engraved-stationery boundary: a single fine double-rule frame,
          inset from the section edges. Square corners (no rounding) so it
          reads as paper, not as a UI card. */}
      <div
        aria-hidden
        className="absolute z-0 pointer-events-none"
        style={{
          inset: "clamp(1.25rem, 4vw, 3.75rem)",
          border: `1px solid ${COLOR.gold}33`,
        }}
      >
        <div
          className="absolute"
          style={{
            inset: "clamp(0.5rem, 1.4vw, 0.9rem)",
            border: `1px solid ${COLOR.gold}26`,
          }}
        />
      </div>

      <div
        className="relative z-10 mx-auto flex flex-col items-center"
        style={{
          // §32: content width ~600–760px. We use a fluid max-width so the
          // composition stays within editorial proportions on every screen.
          width: "min(88vw, 720px)",
          // Tight, deliberate vertical rhythm so the whole invitation fits
          // 1366×768 without scrolling on desktop (§19).
          gap: "clamp(1.5rem, 3.4vw, 2.6rem)",
        }}
      >
        {/* 1 · Eyebrow — A ROYAL CELEBRATION OF LOVE */}
        <motion.p
          {...sequence}
          transition={timings[0]}
          style={eyebrowStyle}
        >
          {INVITATION.eyebrow}
        </motion.p>

        {/* Tiny ornamental glyph (a single 4px diamond) — one detail only. */}
        <motion.span
          {...sequence}
          transition={timings[0]}
          aria-hidden
          style={{
            display: "block",
            width: 4,
            height: 4,
            background: COLOR.gold,
            transform: "rotate(45deg)",
            marginTop: "-0.4rem",
          }}
        />

        {/* 2 · Names — RICHARD & ANITA (the visual heart) */}
        <motion.h2
          {...sequence}
          transition={timings[1]}
          style={namesContainerStyle}
        >
          <span>{INVITATION.firstName}</span>
          <span aria-label="and" style={ampersandStyle}>
            {INVITATION.ampersand}
          </span>
          <span>{INVITATION.lastName}</span>
        </motion.h2>

        {/* 3 · Opening sentence (italic emphasis) + body */}
        <motion.div
          {...sequence}
          transition={timings[2]}
          className="flex flex-col items-center text-center"
          style={{ gap: "clamp(0.6rem, 1.3vw, 1.05rem)", maxWidth: "44ch" }}
        >
          <p style={openingStyle}>{INVITATION.opening}</p>
          <p style={bodyStyle}>
            {INVITATION.body.map((line, i) => (
              <span key={i} style={{ display: "block" }}>
                {line}
              </span>
            ))}
          </p>
        </motion.div>

        {/* 4 · Delicate divider — exactly one, hairline-thick, antique champagne */}
        <motion.div
          {...sequence}
          transition={timings[3]}
          aria-hidden
          className="flex items-center justify-center"
          style={{ gap: 14, marginBlock: "clamp(0.4rem, 1vw, 0.85rem)" }}
        >
          <span
            style={{
              display: "block",
              width: "clamp(2.5rem, 7vw, 4.5rem)",
              height: 1,
              background: COLOR.gold,
              opacity: 0.55,
            }}
          />
          <span
            style={{
              width: 4,
              height: 4,
              background: COLOR.gold,
              borderRadius: "50%",
              opacity: 0.75,
            }}
          />
          <span
            style={{
              display: "block",
              width: "clamp(2.5rem, 7vw, 4.5rem)",
              height: 1,
              background: COLOR.gold,
              opacity: 0.55,
            }}
          />
        </motion.div>

        {/* 5 · Closing — Two hearts, two journeys, now becoming one. */}
        <motion.div
          {...sequence}
          transition={timings[4]}
          className="flex flex-col items-center text-center"
          style={{ maxWidth: "32ch" }}
        >
          <p style={closingStyle}>
            <span style={{ fontWeight: 600 }}>{INVITATION.closing.emphasis}</span>
            <br />
            {INVITATION.closing.rest}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
