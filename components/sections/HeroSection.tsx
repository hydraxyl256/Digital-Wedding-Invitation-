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

  useEffect(() => {
    setMounted(true);

    const sequence = async () => {
      if (sequenceStarted.current) return;
      sequenceStarted.current = true;

      // 1. Initial wait
      await new Promise((resolve) => setTimeout(resolve, 10000));

      // 2. Fade out Hero names & Open Doors
      controlsContent.start({ opacity: 0, scale: 1.1, transition: { duration: 2.5 } });
      setShowInvitation(true);
      await Promise.all([
        controlsLeft.start({ x: "-100%", transition: { duration: 5, ease: [0.45, 0, 0.55, 1] } }),
        controlsRight.start({ x: "100%", transition: { duration: 5, ease: [0.45, 0, 0.55, 1] } }),
      ]);

      // 3. Keep open for 10s
      await new Promise((resolve) => setTimeout(resolve, 10000));

      // 4. Close Doors
      await Promise.all([
        controlsLeft.start({ x: "0%", transition: { duration: 5, ease: [0.45, 0, 0.55, 1] } }),
        controlsRight.start({ x: "0%", transition: { duration: 5, ease: [0.45, 0, 0.55, 1] } }),
      ]);

      // 5. Fade Hero names back in and show Arrow
      setShowInvitation(false);
      await controlsContent.start({ opacity: 1, scale: 1, transition: { duration: 2 } });
      controlsArrow.start({ opacity: 1, y: 0, transition: { duration: 1 } });
    };

    if (window.innerWidth < 768) {
      if (invitationOpen) {
        sequence();
      }
    } else {
      sequence();
    }
  }, [controlsLeft, controlsRight, controlsContent, controlsArrow, invitationOpen]);

  if (!mounted) return null;

  return (
    <section
      data-section
      className="relative h-screen w-full overflow-hidden bg-white"
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
              backgroundImage: "url('/hero-background.png')",
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
              backgroundImage: "url('/hero-background.png')",
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
        className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
      >
        {/* Language Switcher */}
        <div className="absolute top-6 right-6 flex items-center gap-1 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/60 shadow-md scale-90 md:scale-100 pointer-events-auto">
          <button
            onClick={() => setLanguage("EN")}
            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full transition-colors ${language === "EN" ? "bg-[#3D5A5B] text-white" : "text-[#3D5A5B] hover:bg-black/5"}`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage("IT")}
            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full transition-colors ${language === "IT" ? "bg-[#3D5A5B] text-white" : "text-[#3D5A5B] hover:bg-black/5"}`}
          >
            IT
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center gap-2 md:gap-4 drop-shadow-2xl">
          <motion.p
            className="text-white text-[10px] md:text-xs uppercase tracking-[0.6em] font-light mb-8"
            style={{ fontFamily: "'Montserrat', sans-serif", textShadow: "0 2px 12px rgba(0,0,0,0.35)" }}
          >
            {t.preHeading}
          </motion.p>

          <h1
            className="text-white text-7xl md:text-9xl lg:text-[11rem] leading-none"
            style={{ fontFamily: "'Great Vibes', cursive", textShadow: "0 4px 20px rgba(0,0,0,0.4)" }}
          >
            {weddingConfig.bride}
          </h1>

          <span className="text-white text-xl md:text-2xl font-serif italic my-2" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.35)" }}>
            &
          </span>

          <h1
            className="text-white text-7xl md:text-9xl lg:text-[11rem] leading-none"
            style={{ fontFamily: "'Great Vibes', cursive", textShadow: "0 4px 20px rgba(0,0,0,0.4)" }}
          >
            {weddingConfig.groom}
          </h1>
        </div>
      </motion.div>

      {/* ── SCROLL ARROW (Appears after sequence) — bolder & larger ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={controlsArrow}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2"
      >
        <span
          className="text-white text-[10px] md:text-[11px] uppercase tracking-[0.5em] font-semibold"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.55)" }}
        >
          {t.scroll}
        </span>
        <motion.div
          animate={{ y: [0, 14, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="rounded-full bg-white/15 backdrop-blur-sm p-2 border border-white/40"
          style={{ boxShadow: "0 6px 24px rgba(0,0,0,0.25)" }}
        >
          <ChevronDown size={44} className="text-white" strokeWidth={3} />
        </motion.div>
      </motion.div>
    </section>
  );
}