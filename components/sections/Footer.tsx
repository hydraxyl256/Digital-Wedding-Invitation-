"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import ShareButton from "@/components/ui/ShareButton";
import { weddingConfig } from "@/lib/wedding-config";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useWedding } from "@/components/providers/WeddingContext";

const THEME = "#3D5A5B";

const TEXTS = {
  EN: {
    quote: '"Two souls, one heart, one forever."',
    date: "Sunday, August 16, 2026",
    thankYou:
      "We are so grateful to have you with us on this journey. Your presence means the world to us — please share this invitation with family and friends.",
    madeWith: "Made with ♡",
  },
  IT: {
    quote: '"Due anime, un cuore, un\'eternità."',
    date: "Domenica, 16 Agosto 2026",
    thankYou:
      "Siamo così grati di avervi con noi in questo viaggio. La vostra presenza significa il mondo per noi — condividete questo invito con familiari e amici.",
    madeWith: "Fatto con ♡",
  },
};

export default function Footer() {
  const { language } = useWedding();
  const t = TEXTS[language as keyof typeof TEXTS] ?? TEXTS.EN;

  return (
    <footer
      className="relative bg-[#f0f0e4] flex flex-col items-center"
      style={{
        paddingTop: "clamp(4rem, 6vw, 6rem)",
        paddingBottom: "clamp(3rem, 5vw, 5rem)",
      }}
    >
      <div className="w-full max-w-lg mx-auto px-4 sm:px-6">
        <AnimatedSection direction="fade" className="w-full">
          <div className="flex flex-col items-center text-center gap-6 sm:gap-7 md:gap-8">
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-full flex items-center justify-center"
              style={{
                background: "rgba(61,90,91,0.08)",
                boxShadow: "0 8px 32px rgba(61,90,91,0.1)",
                width: "clamp(4.5rem, 8vw, 5rem)",
                height: "clamp(4.5rem, 8vw, 5rem)",
              }}
            >
              <Heart
                size={30}
                strokeWidth={1.5}
                style={{ color: THEME, fill: "rgba(61,90,91,0.2)" }}
              />
            </motion.div>

            <h2
              style={{
                fontFamily: "'Great Vibes', cursive",
                color: THEME,
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                lineHeight: 1.1,
              }}
            >
              {weddingConfig.coupleNames}
            </h2>

            <div className="flex items-center gap-2 sm:gap-3 w-full max-w-[200px]">
              <div
                className="h-[1px] flex-1"
                style={{ background: "linear-gradient(90deg, transparent, rgba(61,90,91,0.5))" }}
              />
              <span style={{ color: "rgba(61,90,91,0.7)", fontSize: "0.7rem" }}>✦</span>
              <div
                className="h-[1px] flex-1"
                style={{ background: "linear-gradient(270deg, transparent, rgba(61,90,91,0.5))" }}
              />
            </div>

            <p
              className="font-serif italic leading-relaxed max-w-xs"
              style={{
                color: THEME,
                opacity: 0.8,
                fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
              }}
            >
              {t.quote}
            </p>

            <p
              className="uppercase tracking-[0.4em] sm:tracking-[0.5em] font-bold"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                color: THEME,
                opacity: 0.6,
                fontSize: "clamp(8px, 0.85vw, 10px)",
              }}
            >
              {t.date}
            </p>

            <p
              className="leading-relaxed max-w-sm"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                color: THEME,
                lineHeight: 1.85,
                opacity: 0.7,
                fontSize: "clamp(0.85rem, 1.1vw, 0.95rem)",
              }}
            >
              {t.thankYou}
            </p>

            <ShareButton />

            <div
              className="h-[1px] w-40"
              style={{ background: "linear-gradient(90deg, transparent, rgba(61,90,91,0.4), transparent)" }}
            />

            <p
              className="uppercase tracking-[0.3em] sm:tracking-[0.4em]"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                color: THEME,
                opacity: 0.45,
                fontSize: "clamp(8px, 0.8vw, 10px)",
              }}
            >
              {weddingConfig.hashtag} · {t.madeWith}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </footer>
  );
}