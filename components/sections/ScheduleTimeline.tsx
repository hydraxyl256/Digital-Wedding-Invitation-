"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { weddingConfig } from "@/lib/wedding-config";
import { Heart, Wine, Sparkles, UtensilsCrossed, Music, Cake } from "lucide-react";

const ICONS: Record<string, React.ReactNode> = {
  heart:    <Heart size={18} strokeWidth={1.5} className="text-amber-700" />,
  wine:     <Wine size={18} strokeWidth={1.5} className="text-amber-700" />,
  sparkles: <Sparkles size={18} strokeWidth={1.5} className="text-amber-700" />,
  utensils: <UtensilsCrossed size={18} strokeWidth={1.5} className="text-amber-700" />,
  music:    <Music size={18} strokeWidth={1.5} className="text-amber-700" />,
  cake:     <Cake size={18} strokeWidth={1.5} className="text-amber-700" />,
};

const cardStyle: React.CSSProperties = {
  background: "rgba(253,246,236,0.85)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(255,255,255,0.7)",
  borderRadius: 16,
  padding: "24px 28px",
  width: "100%",
  maxWidth: 280,
  boxSizing: "border-box",
};

export default function ScheduleTimeline() {
  const lineRef = useRef(null);
  const lineInView = useInView(lineRef, { once: true });

  return (
    <section
      data-section
      style={{ background: "linear-gradient(180deg, #FDF6EC 0%, #F2D4D7 100%)" }}
      className="relative overflow-hidden"
    >
      <div style={{ maxWidth: 800, margin: "0 auto", width: "100%", padding: "112px 24px" }}>

        {/* ── Heading ── */}
        <AnimatedSection direction="fade" className="w-full">
          <div style={{ textAlign: "center", marginBottom: 80, width: "100%" }}>
            <p className="text-xs uppercase text-amber-600 mb-5" style={{ letterSpacing: "0.5em" }}>
              Plan your day
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
              Day Schedule
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center" }}>
              <div style={{ height: 1, width: 64, background: "linear-gradient(90deg, transparent, #C9A84C)" }} />
              <Sparkles size={14} className="text-amber-400" />
              <div style={{ height: 1, width: 64, background: "linear-gradient(270deg, transparent, #C9A84C)" }} />
            </div>
          </div>
        </AnimatedSection>

        {/* ── Timeline ── */}
        <div ref={lineRef} style={{ position: "relative", width: "100%" }}>

          {/* Vertical gold line — desktop */}
          <div
            className="hidden md:block"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              top: 0,
              bottom: 0,
              width: 1,
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(180deg, #C9A84C, #e8c97a, #C9A84C)",
                transformOrigin: "top",
              }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: lineInView ? 1 : 0 }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          {/* Mobile left line */}
          <div
            className="md:hidden"
            style={{
              position: "absolute",
              left: 20,
              top: 0,
              bottom: 0,
              width: 1,
              background: "linear-gradient(180deg, #C9A84C, #e8c97a, #C9A84C)",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {weddingConfig.schedule.map((item, i) => {
              const isLeft = i % 2 === 0;

              return (
                <AnimatedSection
                  key={item.event}
                  direction={isLeft ? "left" : "right"}
                  delay={i * 0.1}
                  className="w-full"
                >
                  {/* Mobile */}
                  <div className="flex items-start gap-5 md:hidden" style={{ paddingLeft: 8 }}>
                    <div
                      style={{
                        flexShrink: 0,
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "linear-gradient(135deg, #FDF6EC, #F7E7CE)",
                        border: "2px solid #C9A84C",
                        boxShadow: "0 0 14px rgba(201,168,76,0.25)",
                        zIndex: 10,
                        position: "relative",
                      }}
                    >
                      {ICONS[item.icon] ?? <Sparkles size={14} className="text-amber-600" />}
                    </div>
                    <div style={{ ...cardStyle, maxWidth: "none", flex: 1 }}>
                      <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", color: "#d97706", fontWeight: 600 }}>
                        {item.time}
                      </span>
                      <h3
                        style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "#78350f", margin: "6px 0 6px" }}
                      >
                        {item.event}
                      </h3>
                      <p style={{ fontSize: "0.875rem", color: "rgba(120,53,15,0.7)", lineHeight: 1.6 }}>{item.description}</p>
                    </div>
                  </div>

                  {/* Desktop — 3-col grid */}
                  <div
                    className="hidden md:grid"
                    style={{
                      gridTemplateColumns: "1fr 80px 1fr",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    {/* Left slot */}
                    <div style={{ minWidth: 0, display: "flex", justifyContent: "flex-end", paddingRight: 24 }}>
                      {isLeft && (
                        <div style={cardStyle}>
                          <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", color: "#d97706", fontWeight: 600 }}>
                            {item.time}
                          </span>
                          <h3
                            style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "#78350f", margin: "6px 0 8px" }}
                          >
                            {item.event}
                          </h3>
                          <p style={{ fontSize: "0.875rem", color: "rgba(120,53,15,0.7)", lineHeight: 1.6 }}>{item.description}</p>
                        </div>
                      )}
                    </div>

                    {/* Center icon node */}
                    <div style={{ minWidth: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          background: "linear-gradient(135deg, #FDF6EC, #F7E7CE)",
                          border: "2px solid #C9A84C",
                          boxShadow: "0 0 20px rgba(201,168,76,0.3)",
                          zIndex: 10,
                          position: "relative",
                        }}
                      >
                        {ICONS[item.icon] ?? <Sparkles size={18} className="text-amber-600" />}
                      </div>
                    </div>

                    {/* Right slot */}
                    <div style={{ minWidth: 0, display: "flex", justifyContent: "flex-start", paddingLeft: 24 }}>
                      {!isLeft && (
                        <div style={cardStyle}>
                          <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", color: "#d97706", fontWeight: 600 }}>
                            {item.time}
                          </span>
                          <h3
                            style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "#78350f", margin: "6px 0 8px" }}
                          >
                            {item.event}
                          </h3>
                          <p style={{ fontSize: "0.875rem", color: "rgba(120,53,15,0.7)", lineHeight: 1.6 }}>{item.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
