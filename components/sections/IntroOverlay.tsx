"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useWedding } from "@/components/providers/WeddingContext";
import { weddingConfig } from "@/lib/wedding-config";
import { Gem, Sparkles } from "lucide-react";

export default function IntroOverlay() {
  const { invitationOpen, setInvitationOpen, guestName } = useWedding();

  return (
    <AnimatePresence>
      {!invitationOpen && (
        <motion.div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(160deg, #1A1208 0%, #2C1F08 55%, #1A1208 100%)",
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Decorative pulse rings */}
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                borderRadius: "50%",
                border: "1px solid rgba(201,168,76,0.08)",
                width: i * 280,
                height: i * 280,
                top: "50%",
                left: "50%",
                marginTop: -(i * 140),
                marginLeft: -(i * 140),
                pointerEvents: "none",
              }}
              animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.1, 0.3] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}

          {/* Top shimmer */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 1,
              background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
              transformOrigin: "left",
            }}
          />
          {/* Bottom shimmer */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 1,
              background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
              transformOrigin: "right",
            }}
          />

          {/* ── Content ── */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              padding: "0 32px",
              maxWidth: 520,
              width: "100%",
            }}
          >
            {/* Pre-title */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.55em",
                color: "#d97706",
                marginBottom: 48,
              }}
            >
              You are cordially invited
            </motion.p>

            {/* Diamond icon badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ marginBottom: 48, position: "relative" }}
            >
              <div
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, rgba(201,168,76,0.15), rgba(232,201,122,0.08))",
                  border: "1.5px solid rgba(201,168,76,0.45)",
                  boxShadow: "0 0 48px rgba(201,168,76,0.18)",
                }}
              >
                <Gem size={36} strokeWidth={1.25} style={{ color: "#C9A84C" }} />
              </div>
              {/* Outer pulse ring */}
              <motion.div
                style={{
                  position: "absolute",
                  inset: -6,
                  borderRadius: "50%",
                  border: "1px solid rgba(201,168,76,0.25)",
                }}
                animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.8, repeat: Infinity }}
              />
            </motion.div>

            {/* Greeting */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1 }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 5vw, 2.75rem)",
                fontWeight: 600,
                color: "#fef3c7",
                marginBottom: 40,
                lineHeight: 1.2,
              }}
            >
              Dear {guestName},
            </motion.h2>

            {/* Gold divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 40,
                width: "100%",
                maxWidth: 240,
              }}
            >
              <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.5))" }} />
              <Sparkles size={12} style={{ color: "#C9A84C", opacity: 0.8 }} />
              <div style={{ height: 1, flex: 1, background: "linear-gradient(270deg, transparent, rgba(201,168,76,0.5))" }} />
            </motion.div>

            {/* Body text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              style={{
                color: "rgba(253,246,236,0.6)",
                fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
                lineHeight: 1.85,
                marginBottom: 56,
                maxWidth: 380,
              }}
            >
              We joyfully invite you to witness and celebrate the union of{" "}
              <span style={{ color: "#e8c97a", fontWeight: 600 }}>{weddingConfig.coupleNames}</span>{" "}
              on{" "}
              <span style={{ color: "rgba(232,201,122,0.85)" }}>{weddingConfig.weddingDateFormatted}</span>.
            </motion.p>

            {/* ── Premium CTA Button ── */}
            <motion.button
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.45 }}
              onClick={() => setInvitationOpen(true)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                position: "relative",
                padding: "20px 64px",
                borderRadius: 60,
                background: "linear-gradient(135deg, #C9A84C 0%, #e8c97a 50%, #C9A84C 100%)",
                backgroundSize: "200% 100%",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Playfair Display', serif",
                fontSize: "1rem",
                fontWeight: 600,
                letterSpacing: "0.18em",
                color: "#1A1208",
                textTransform: "uppercase",
                boxShadow: "0 8px 40px rgba(201,168,76,0.45), inset 0 1px 0 rgba(255,255,255,0.3)",
                transition: "box-shadow 0.3s",
              }}
            >
              Open My Invitation

              {/* Inner glow pulse */}
              <motion.span
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 60,
                  background: "linear-gradient(135deg, #C9A84C, #e8c97a)",
                  opacity: 0,
                }}
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Outer halo */}
              <motion.span
                style={{
                  position: "absolute",
                  inset: -4,
                  borderRadius: 64,
                  border: "1px solid rgba(201,168,76,0.4)",
                }}
                animate={{ opacity: [0.4, 0, 0.4], scale: [1, 1.04, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            </motion.button>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
