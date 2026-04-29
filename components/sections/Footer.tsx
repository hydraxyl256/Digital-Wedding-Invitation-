"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import ShareButton from "@/components/ui/ShareButton";
import { weddingConfig } from "@/lib/wedding-config";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer
      style={{ background: "linear-gradient(180deg, #F2D4D7 0%, #FDF6EC 100%)" }}
      className="relative overflow-hidden"
    >
      <div style={{ maxWidth: 640, margin: "0 auto", width: "100%", padding: "112px 24px" }}>
        <AnimatedSection direction="fade" className="w-full">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", width: "100%" }}>

            {/* Pulsing heart */}
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #F2D4D7, #EED5E9)",
                boxShadow: "0 8px 32px rgba(244,114,182,0.15)",
                marginBottom: 40,
              }}
            >
              <Heart size={32} strokeWidth={1.5} style={{ color: "#fb7185", fill: "#fda4af" }} />
            </motion.div>

            {/* Couple names */}
            <h2
              className="text-amber-900"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 700,
                marginBottom: 28,
              }}
            >
              {weddingConfig.coupleNames}
            </h2>

            {/* Gold divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32, width: "100%", maxWidth: 240 }}>
              <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg, transparent, #C9A84C)" }} />
              <span style={{ color: "#C9A84C", fontSize: "0.85rem" }}>✦</span>
              <div style={{ height: 1, flex: 1, background: "linear-gradient(270deg, transparent, #C9A84C)" }} />
            </div>

            {/* Quote */}
            <p
              className="text-amber-800"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "1.05rem",
                lineHeight: 1.7,
                opacity: 0.65,
                marginBottom: 12,
              }}
            >
              "Two souls, one heart, one forever."
            </p>

            {/* Date */}
            <p
              className="text-amber-600"
              style={{
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                opacity: 0.6,
                marginBottom: 56,
              }}
            >
              {weddingConfig.weddingDateFormatted}
            </p>

            {/* Thank you */}
            <p
              style={{
                color: "rgba(120,53,15,0.55)",
                fontSize: "0.9rem",
                lineHeight: 1.8,
                maxWidth: 380,
                marginBottom: 48,
              }}
            >
              We are so grateful to have you with us on this journey.
              Your presence means the world to us — please share this
              invitation with family and friends.
            </p>

            {/* Share button */}
            <div style={{ marginBottom: 56 }}>
              <ShareButton />
            </div>

            {/* Bottom rule */}
            <div
              style={{
                height: 1,
                width: 200,
                background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
                marginBottom: 24,
              }}
            />

            {/* Hashtag */}
            <p style={{ color: "rgba(201,168,76,0.4)", fontSize: "0.75rem", letterSpacing: "0.1em" }}>
              {weddingConfig.hashtag} · Made with ♡
            </p>

          </div>
        </AnimatedSection>
      </div>
    </footer>
  );
}
