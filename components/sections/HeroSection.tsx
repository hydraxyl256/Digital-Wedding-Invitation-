"use client";

import { motion, useAnimation } from "framer-motion";
import { weddingConfig } from "@/lib/wedding-config";
import { useEffect, useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import FormalInvitation from "./FormalInvitation";
import { useWedding } from "@/components/providers/WeddingContext";

export default function HeroSection() {
  const { language, setLanguage, invitationOpen } = useWedding();
  const [mounted, setMounted] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);
  const [sequenceComplete, setSequenceComplete] = useState(false);
  const sequenceStarted = useRef(false);
  const controlsLeft = useAnimation();
  const controlsRight = useAnimation();
  const controlsContent = useAnimation();
  const controlsArrow = useAnimation();

  useEffect(() => {
    setMounted(true);

    const sequence = async () => {
      if (sequenceStarted.current) return;
      sequenceStarted.current = true;

      // 1. Initial wait (10s)
      await new Promise(resolve => setTimeout(resolve, 10000));

      // 2. Fade out Hero names & Open Doors (5s)
      controlsContent.start({ opacity: 0, scale: 1.1, transition: { duration: 2.5 } });
      setShowInvitation(true);
      await Promise.all([
        controlsLeft.start({ x: "-100%", transition: { duration: 5, ease: [0.45, 0, 0.55, 1] } }),
        controlsRight.start({ x: "100%", transition: { duration: 5, ease: [0.45, 0, 0.55, 1] } })
      ]);

      // 3. Keep open for 10s
      await new Promise(resolve => setTimeout(resolve, 10000));

      // 4. Close Doors (5s)
      await Promise.all([
        controlsLeft.start({ x: "0%", transition: { duration: 5, ease: [0.45, 0, 0.55, 1] } }),
        controlsRight.start({ x: "0%", transition: { duration: 5, ease: [0.45, 0, 0.55, 1] } })
      ]);

      // 5. Fade Hero names back in and show Arrow
      setShowInvitation(false);
      await controlsContent.start({ opacity: 1, scale: 1, transition: { duration: 2 } });
      setSequenceComplete(true);
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

        {/* Left Door */}
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

        {/* Right Door */}
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
        <div className="absolute top-6 right-6 flex items-center gap-1 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/50 shadow-sm scale-90 md:scale-100 pointer-events-auto">
          <button
            onClick={() => setLanguage("EN")}
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${language === "EN" ? "bg-[#3D5A5B] text-white" : "text-[#3D5A5B] hover:bg-black/5"}`}>EN</button>
          <button
            onClick={() => setLanguage("DE")}
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${language === "DE" ? "bg-[#3D5A5B] text-white" : "text-[#3D5A5B] hover:bg-black/5"}`}>DE</button>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center gap-2 md:gap-4 drop-shadow-2xl">
          <motion.p
            className="text-white text-[10px] md:text-xs uppercase tracking-[0.6em] font-light mb-8"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {language === "EN" ? "We are getting married" : "Wir heiraten"}
          </motion.p>

          <h1
            className="text-white text-7xl md:text-9xl lg:text-[11rem] leading-none"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            {weddingConfig.bride}
          </h1>

          <span className="text-white text-xl md:text-2xl font-serif italic my-2">
            &
          </span>

          <h1
            className="text-white text-7xl md:text-9xl lg:text-[11rem] leading-none"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            {weddingConfig.groom}
          </h1>
        </div>

        {/* Audio Toggle Toggle visual */}
        {/* <div className="absolute bottom-8 right-8">
          <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3D5A5B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
          </div>
        </div> */}
      </motion.div>

      {/* ── SCROLL ARROW (Appears after sequence) ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={controlsArrow}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2"
      >
        <span className="text-white/70 text-[9px] uppercase tracking-[0.4em]">
          {language === "EN" ? "Scroll Down" : "Nach unten scrollen"}
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={24} className="text-white" strokeWidth={1} />
        </motion.div>
      </motion.div>
    </section>
  );
}
