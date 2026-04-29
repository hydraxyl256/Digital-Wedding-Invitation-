"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { X, ZoomIn } from "lucide-react";

const GALLERY_ITEMS = [
  { emoji: "💑", label: "The Couple",      bg: "linear-gradient(135deg, #F2D4D7, #EED5E9)", tall: false },
  { emoji: "💍", label: "The Ring",         bg: "linear-gradient(135deg, #F7E7CE, #F2D4D7)", tall: true  },
  { emoji: "🌸", label: "Florals",          bg: "linear-gradient(135deg, #EED5E9, #F2D4D7)", tall: false },
  { emoji: "🌅", label: "Sunrise Session",  bg: "linear-gradient(135deg, #F7E7CE, #FDF6EC)", tall: true  },
  { emoji: "🥂", label: "Engagement Party", bg: "linear-gradient(135deg, #F2D4D7, #F7E7CE)", tall: false },
  { emoji: "💃", label: "First Dance",      bg: "linear-gradient(135deg, #EED5E9, #F7E7CE)", tall: false },
];

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section
      data-section
      style={{ background: "linear-gradient(180deg, #FDF6EC 0%, #F2D4D7 100%)" }}
      className="relative overflow-hidden"
    >
      <div style={{ maxWidth: 1024, margin: "0 auto", width: "100%", padding: "112px 24px" }}>

        {/* ── Heading ── */}
        <AnimatedSection direction="fade" className="w-full">
          <div style={{ textAlign: "center", marginBottom: 64, width: "100%" }}>
            <p
              className="text-amber-600"
              style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.5em", marginBottom: 20 }}
            >
              Memories together
            </p>
            <h2
              className="text-amber-900"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 700,
                marginBottom: 24,
              }}
            >
              Our Gallery
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center" }}>
              <div style={{ height: 1, width: 64, background: "linear-gradient(90deg, transparent, #C9A84C)" }} />
              <span style={{ color: "#C9A84C" }}>✦</span>
              <div style={{ height: 1, width: 64, background: "linear-gradient(270deg, transparent, #C9A84C)" }} />
            </div>
          </div>
        </AnimatedSection>

        {/* ── Masonry Grid ── */}
        <div style={{ columns: "2", columnGap: 16 }} className="md:columns-3">
          {GALLERY_ITEMS.map((item, i) => (
            <AnimatedSection key={item.label} direction="up" delay={i * 0.08} className="w-full">
              <div
                onClick={() => setSelected(i)}
                className="group"
                style={{
                  position: "relative",
                  borderRadius: 16,
                  overflow: "hidden",
                  cursor: "pointer",
                  marginBottom: 16,
                  breakInside: "avoid",
                  aspectRatio: item.tall ? "3/4" : "4/3",
                  background: item.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: 56, transition: "transform 0.5s" }} className="group-hover:scale-110">
                  {item.emoji}
                </span>
                {/* Hover overlay */}
                <div
                  className="group-hover:opacity-100"
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    opacity: 0,
                    background: "rgba(26,18,8,0.55)",
                    backdropFilter: "blur(4px)",
                    transition: "opacity 0.3s",
                  }}
                >
                  <ZoomIn size={24} color="white" strokeWidth={1.5} />
                  <span style={{ color: "white", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 600 }}>
                    {item.label}
                  </span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
              background: "rgba(26,18,8,0.92)",
              backdropFilter: "blur(16px)",
            }}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                borderRadius: 24,
                overflow: "hidden",
                maxWidth: 480,
                width: "100%",
                aspectRatio: GALLERY_ITEMS[selected].tall ? "3/4" : "4/3",
                background: GALLERY_ITEMS[selected].bg,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
              }}
            >
              <span style={{ fontSize: 100 }}>{GALLERY_ITEMS[selected].emoji}</span>
              <p style={{ color: "rgba(120,53,15,0.5)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em" }}>
                {GALLERY_ITEMS[selected].label}
              </p>
              <button
                onClick={() => setSelected(null)}
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(26,18,8,0.55)",
                  border: "none",
                  cursor: "pointer",
                  color: "white",
                }}
              >
                <X size={16} strokeWidth={2} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
