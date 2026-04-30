"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import ShareButton from "@/components/ui/ShareButton";
import { weddingConfig } from "@/lib/wedding-config";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const THEME = "#3D5A5B";

export default function Footer() {
  return (
    <footer className="relative bg-[#f0f0e4] flex flex-col items-center" style={{ paddingTop: "6rem", paddingBottom: "5rem" }}>
      <div className="w-full max-w-lg mx-auto px-6">
        <AnimatedSection direction="fade" className="w-full">
          <div className="flex flex-col items-center text-center gap-8">

            {/* Pulsing heart */}
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: "rgba(61,90,91,0.06)", boxShadow: "0 8px 32px rgba(61,90,91,0.08)" }}
            >
              <Heart size={30} strokeWidth={1.5} style={{ color: THEME, fill: "rgba(61,90,91,0.15)" }} />
            </motion.div>

            {/* Couple names in Great Vibes */}
            <h2 style={{ fontFamily: "'Great Vibes', cursive", color: THEME, fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>
              {weddingConfig.coupleNames}
            </h2>

            {/* Teal divider */}
            <div className="flex items-center gap-3 w-full max-w-[200px]">
              <div className="h-[1px] flex-1" style={{ background: `linear-gradient(90deg, transparent, ${THEME}40)` }} />
              <span style={{ color: `${THEME}60`, fontSize: "0.7rem" }}>✦</span>
              <div className="h-[1px] flex-1" style={{ background: `linear-gradient(270deg, transparent, ${THEME}40)` }} />
            </div>

            {/* Quote */}
            <p
              className="font-serif italic leading-relaxed opacity-55 max-w-xs"
              style={{ fontSize: "1rem", color: THEME }}
            >
              "Two souls, one heart, one forever."
            </p>

            {/* Date */}
            <p
              className="text-[9px] uppercase tracking-[0.5em] font-bold opacity-35"
              style={{ fontFamily: "'Montserrat', sans-serif", color: THEME }}
            >
              {weddingConfig.weddingDateFormatted}
            </p>

            {/* Thank-you note */}
            <p
              className="text-xs leading-relaxed opacity-45 max-w-sm"
              style={{ fontFamily: "'Montserrat', sans-serif", color: THEME }}
            >
              We are so grateful to have you with us on this journey. Your presence means the world to us — please share this invitation with family and friends.
            </p>

            {/* Share button */}
            <ShareButton />

            {/* Bottom rule */}
            <div className="h-[1px] w-40" style={{ background: `linear-gradient(90deg, transparent, ${THEME}30, transparent)` }} />

            {/* Hashtag */}
            <p
              className="text-[9px] uppercase tracking-[0.4em] opacity-25"
              style={{ fontFamily: "'Montserrat', sans-serif", color: THEME }}
            >
              {weddingConfig.hashtag} · Made with ♡
            </p>

          </div>
        </AnimatedSection>
      </div>
    </footer>
  );
}
