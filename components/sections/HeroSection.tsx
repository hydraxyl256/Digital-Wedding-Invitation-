"use client";

import { motion, useAnimation } from "framer-motion";
import { weddingConfig } from "@/lib/wedding-config";
import { useEffect, useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import FormalInvitation from "./FormalInvitation";
import { useWedding } from "@/components/providers/WeddingContext";

const TEXTS = {
  EN: {
    preHeading: "We are getting married",
    scroll: "Scroll Down",
  },
  IT: {
    preHeading: "Ci sposiamo",
    scroll: "Scorri verso il basso",
  },
};

export default function HeroSection() {
  const { language, setLanguage, invitationOpen } = useWedding();
  const [mounted, setMounted] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);
  const sequenceStarted = useRef(false);
  const controlsLeft = useAnimation();
  const controlsRight = useAnimation();
  const controlsContent = useAnimation();
  const controlsArrow = useAnimation();

  const t = TEXTS[language as keyof typeof TEXTS] ?? TEXTS.EN;

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);

    const sequence = async () => {
      if (sequenceStarted.current) return;
      sequenceStarted.current = true;

      await new Promise((resolve) => setTimeout(resolve, 10000));

      controlsContent.start({ opacity: 0, scale: 1.1, transition: { duration: 2.5 } });
      setShowInvitation(true);
      await Promise.all([
        controlsLeft.start({ x: "-100%", transition: { duration: 5, ease: [0.45, 0, 0.55, 1] } }),
        controlsRight.start({ x: "100%", transition: { duration: 5, ease: [0.45, 0, 0.55, 1] } }),
      ]);

      await new Promise((resolve) => setTimeout(resolve, 10000));

      await Promise.all([
        controlsLeft.start({ x: "0%", transition: { duration: 5, ease: [0.45, 0, 0.55, 1] } }),
        controlsRight.start({ x: "0%", transition: { duration: 5, ease: [0.45, 0, 0.55, 1] } }),
      ]);

      setShowInvitation(false);
      await controlsContent.start({ opacity: 1, scale: 1, transition: { duration: 2 } });
      controlsArrow.start({ opacity: 1, y: 0, transition: { duration: 1 } });
    };

    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) {
        if (invitationOpen) {
          sequence();
        }
      } else {
        sequence();
      }
    }
  }, [controlsLeft, controlsRight, controlsContent, controlsArrow, invitationOpen]);

  // Respect users who enable reduced motion (spec §8 Accessibility).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const handleScrollDown = () => {
    if (typeof document === "undefined") return;
    const sections = document.querySelectorAll("[data-section]");
    sections[1]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!mounted) return null;

  return (
    <section
      data-section
      className="relative h-[100svh] w-full overflow-hidden bg-white"
    >
      {/* ── BACKGROUND CONTENT (Formal Invitation Revealed) ── */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        {showInvitation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <FormalInvitation />
          </motion.div>
        )}
      </div>

      {/* ── THE OPENING DOORS (Hero Background) ── */}
      <div className="absolute inset-0 z-20 flex pointer-events-none">
        <motion.div
          animate={controlsLeft}
          className="relative w-1/2 h-full overflow-hidden border-r border-white/10"
        >
          <div
            className="absolute inset-0 w-[200%] h-full"
            style={{
              backgroundImage: "url('/hero-background.JPG')",
              backgroundSize: "cover",
              backgroundPosition: "left center",
            }}
          />
          <div className="absolute inset-0 bg-black/5" />
        </motion.div>

        <motion.div
          animate={controlsRight}
          className="relative w-1/2 h-full overflow-hidden border-l border-white/10"
        >
          <div
            className="absolute inset-0 w-[200%] h-full -left-full"
            style={{
              backgroundImage: "url('/hero-background.JPG')",
              backgroundSize: "cover",
              backgroundPosition: "right center",
            }}
          />
          <div className="absolute inset-0 bg-black/5" />
        </motion.div>
      </div>

      {/* ── HERO TEXT (Sitting on top of doors) ── */}
      <motion.div
        animate={controlsContent}
        className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4 sm:px-6 pointer-events-none"
      >
        {/* Language Switcher */}
        <div
          className="absolute top-5 right-4 sm:top-6 sm:right-6 flex items-center gap-1 bg-white/90 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-white/60 shadow-md pointer-events-auto"
          style={{ transform: "scale(0.85)", transformOrigin: "top right" }}
        >
          <button
            onClick={() => setLanguage("EN")}
            className="text-[10px] font-bold px-2.5 py-1 rounded-full transition-colors min-h-[28px]"
            style={{
              background: language === "EN" ? "#3D5A5B" : "transparent",
              color: language === "EN" ? "white" : "#3D5A5B",
            }}
            aria-label="Switch to English"
            aria-pressed={language === "EN"}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage("IT")}
            className="text-[10px] font-bold px-2.5 py-1 rounded-full transition-colors min-h-[28px]"
            style={{
              background: language === "IT" ? "#3D5A5B" : "transparent",
              color: language === "IT" ? "white" : "#3D5A5B",
            }}
            aria-label="Passa all'italiano"
            aria-pressed={language === "IT"}
          >
            IT
          </button>
        </div>

        {/* Content — fluid sizing */}
        <div className="flex flex-col items-center gap-2 md:gap-4 drop-shadow-2xl max-w-full">
          <motion.p
            className="text-white text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.5em] sm:tracking-[0.6em] font-light mb-4 sm:mb-6 md:mb-8 px-2"
            style={{ fontFamily: "'Montserrat', sans-serif", textShadow: "0 2px 12px rgba(0,0,0,0.35)" }}
          >
            {t.preHeading}
          </motion.p>

          <h1
            className="text-white leading-none"
            style={{
              fontFamily: "'Great Vibes', cursive",
              textShadow: "0 4px 20px rgba(0,0,0,0.4)",
              fontSize: "clamp(3rem, 14vw, 11rem)",
            }}
          >
            {weddingConfig.bride}
          </h1>

          <span
            className="text-white font-serif italic my-1 sm:my-2"
            style={{
              fontSize: "clamp(1.1rem, 3vw, 1.6rem)",
              textShadow: "0 2px 12px rgba(0,0,0,0.35)",
            }}
          >
            &
          </span>

          <h1
            className="text-white leading-none"
            style={{
              fontFamily: "'Great Vibes', cursive",
              textShadow: "0 4px 20px rgba(0,0,0,0.4)",
              fontSize: "clamp(3rem, 14vw, 11rem)",
            }}
          >
            {weddingConfig.groom}
          </h1>
        </div>
      </motion.div>

      {/* ── SCROLL INDICATOR (Appears after sequence) — compact glass disc ── */}
      <motion.button
        type="button"
        onClick={handleScrollDown}
        initial={{ opacity: 0, y: -12 }}
        animate={controlsArrow}
        whileHover={prefersReducedMotion ? undefined : { scale: 1.10 }}
        whileTap={{ scale: 0.94 }}
        aria-label={t.scroll}
        className="group absolute bottom-7 sm:bottom-9 left-1/2 -translate-x-1/2 z-40 flex items-center justify-center rounded-full cursor-pointer border border-white/35 bg-white/15 backdrop-blur-md transition-[box-shadow,background-color,border-color] duration-300 hover:bg-white/25 hover:border-white/55"
        style={{
          // 44px target — just enough for a touch tap on mobile, scaled slightly on desktop
          width: 44,
          height: 44,
          padding: 0,
          boxShadow:
            "0 6px 22px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.18)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            "0 6px 22px rgba(0,0,0,0.28), 0 0 18px rgba(255,255,255,0.35), inset 0 1px 0 rgba(255,255,255,0.22)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            "0 6px 22px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.18)";
        }}
      >
        <motion.div
          animate={prefersReducedMotion ? { y: 0 } : { y: [0, 4, 0] }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { repeat: Infinity, duration: 1.8, ease: "easeInOut" }
          }
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <ChevronDown
            className="text-white transition-[filter,transform] duration-300 group-hover:brightness-110"
            size={20}
            strokeWidth={2.25}
            style={{
              filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.45))",
            }}
          />
        </motion.div>
      </motion.button>

      {/* Invisible readout for screen readers — same label, zero visual weight */}
      <span className="sr-only">{t.scroll}</span>
    </section>
  );
}