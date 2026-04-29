"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { weddingConfig } from "@/lib/wedding-config";
import { getCountdown } from "@/lib/utils";

function Digit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0");
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <div
        style={{
          position: "relative",
          width: 88,
          height: 88,
          borderRadius: 18,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, rgba(253,246,236,0.9), rgba(247,231,206,0.9))",
          boxShadow: "0 8px 32px rgba(201,168,76,0.2), inset 0 1px 0 rgba(255,255,255,0.8)",
          border: "1px solid rgba(201,168,76,0.3)",
        }}
      >
        <span
          suppressHydrationWarning
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.75rem, 4vw, 3rem)",
            fontWeight: 700,
            color: "#78350f",
          }}
        >
          {display}
        </span>
      </div>
      <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.3em", color: "#d97706", fontWeight: 600 }}>
        {label}
      </span>
    </div>
  );
}

const Separator = () => (
  <span
    style={{
      fontFamily: "'Playfair Display', serif",
      fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
      color: "rgba(201,168,76,0.5)",
      marginTop: 16,
      lineHeight: 1,
    }}
  >
    :
  </span>
);

export default function CountdownTimer() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(getCountdown(weddingConfig.weddingDate));

  useEffect(() => {
    setMounted(true);
    setTime(getCountdown(weddingConfig.weddingDate));
    const id = setInterval(() => setTime(getCountdown(weddingConfig.weddingDate)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      data-section
      style={{ background: "linear-gradient(160deg, #1A1208 0%, #2C1F08 50%, #1A1208 100%)" }}
      className="relative overflow-hidden"
    >
      {/* Decorative rings */}
      {[400, 560, 720].map((size, i) => (
        <motion.div
          key={size}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: size,
            height: size,
            marginLeft: -size / 2,
            marginTop: -size / 2,
            borderRadius: "50%",
            border: "1px solid rgba(201,168,76,0.08)",
            pointerEvents: "none",
          }}
          animate={{ scale: [1, 1.04, 1], opacity: [0.4, 0.15, 0.4] }}
          transition={{ duration: 5 + i, repeat: Infinity }}
        />
      ))}

      <div style={{ maxWidth: 800, margin: "0 auto", width: "100%", padding: "112px 24px", position: "relative", zIndex: 10 }}>

        {/* ── Heading ── */}
        <AnimatedSection direction="fade" className="w-full">
          <div style={{ textAlign: "center", marginBottom: 72, width: "100%" }}>
            <p
              style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.5em", color: "#d97706", marginBottom: 20 }}
            >
              The big day is coming
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 700,
                color: "#fef3c7",
                marginBottom: 16,
              }}
            >
              Counting Down
            </h2>
            <p style={{ color: "rgba(201,168,76,0.55)", fontSize: "0.875rem", letterSpacing: "0.1em" }}>
              {weddingConfig.weddingDateFormatted}
            </p>
          </div>
        </AnimatedSection>

        {/* ── Countdown digits ── */}
        {mounted ? (
          <>
            {time.isOver ? (
              <AnimatedSection direction="fade" className="w-full">
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 64, marginBottom: 24 }}>🎊</div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "2.25rem",
                      color: "#fef3c7",
                      marginBottom: 12,
                    }}
                  >
                    Today is the Day!
                  </h3>
                  <p style={{ color: "rgba(201,168,76,0.7)", fontSize: "0.9rem" }}>
                    Wishing {weddingConfig.coupleNames} a lifetime of love.
                  </p>
                </div>
              </AnimatedSection>
            ) : (
              <AnimatedSection direction="up" delay={0.2} className="w-full">
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
                  <Digit value={time.days}    label="Days" />
                  <Separator />
                  <Digit value={time.hours}   label="Hours" />
                  <Separator />
                  <Digit value={time.minutes} label="Minutes" />
                  <Separator />
                  <Digit value={time.seconds} label="Seconds" />
                </div>
              </AnimatedSection>
            )}
          </>
        ) : (
          /* SSR placeholder — replaced instantly on mount */
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 16, flexWrap: "wrap", opacity: 0.3 }}>
            {["Days", "Hours", "Min", "Sec"].map((label) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 88,
                    height: 88,
                    borderRadius: 18,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(253,246,236,0.1)",
                    border: "1px solid rgba(201,168,76,0.2)",
                  }}
                >
                  <span style={{ fontSize: "2rem", fontWeight: 700, color: "#fef3c7" }}>--</span>
                </div>
                <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.3em", color: "#d97706" }}>{label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
