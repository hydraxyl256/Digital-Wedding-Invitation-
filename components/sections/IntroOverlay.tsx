"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useWedding } from "@/components/providers/WeddingContext";
import { useState, useRef, useEffect } from "react";

export default function IntroOverlay() {
  const { invitationOpen, setInvitationOpen, language } = useWedding();
  const [closing, setClosing] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setPrefersReducedMotion(motionMq.matches);
    updateMotion();
    motionMq.addEventListener("change", updateMotion);

    const widthMq = window.matchMedia("(max-width: 767px)");
    const updateWidth = () => setIsMobile(widthMq.matches);
    updateWidth();
    widthMq.addEventListener("change", updateWidth);

    return () => {
      motionMq.removeEventListener("change", updateMotion);
      widthMq.removeEventListener("change", updateWidth);
    };
  }, []);

  const handleOpen = () => {
    setClosing(true);

    if (typeof window !== "undefined" && window.innerWidth < 768 && videoRef.current) {
      setPlayingVideo(true);
      videoRef.current.play().catch(() => {
        setPlayingVideo(false);
        setTimeout(() => setInvitationOpen(true), 800);
      });
    } else {
      setTimeout(() => setInvitationOpen(true), 800);
    }
  };

  if (invitationOpen) return null;

  const tapText = language === "IT" ? "Tocca per aprire" : "Tap to open";

  return (
    <AnimatePresence>
      <motion.div
        key="envelope"
        initial={{ opacity: 0 }}
        animate={{ opacity: closing && !playingVideo ? 0 : 1 }}
        transition={{ duration: 0.8 }}
        onClick={!closing ? handleOpen : undefined}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 100,
          cursor: closing ? "default" : "pointer",
          background: "#1a1510",
          userSelect: "none",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: closing && !playingVideo ? 1.08 : 1 }}
          transition={{ duration: closing && !playingVideo ? 0.8 : 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "absolute", inset: 0 }}
        >
          <picture style={{ width: "100%", height: "100%", display: "block" }}>
            <source srcSet="/intro-photo-desktop.png" media="(min-width: 768px)" />
            <img
              src="/intro-photo.png"
              alt="Wedding envelope — Anita & Richard"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
              }}
              draggable={false}
            />
          </picture>
        </motion.div>

        <video
          ref={videoRef}
          src="/intro-video.mp4"
          playsInline
          muted
          onEnded={() => {
            setPlayingVideo(false);
            setTimeout(() => setInvitationOpen(true), 800);
          }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 20,
            opacity: playingVideo ? 1 : 0,
            pointerEvents: "none",
          }}
        />

        {!closing && (
          <motion.button
            type="button"
            onClick={handleOpen}
            initial={{ opacity: 0, y: 14 }}
            animate={
              prefersReducedMotion
                ? { opacity: 1, y: 0 }
                : {
                    opacity: [0, 1, 1],
                    y: 0,
                    scale: [1, 1.04, 1],
                  }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0.8, delay: 0.6 }
                : {
                    opacity: { duration: 1.2, delay: 0.6 },
                    y: { duration: 1.2, delay: 0.6 },
                    scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  }
            }
            aria-label={tapText}
            style={{
              position: "absolute",
              bottom: 38,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "10px 18px",
              minHeight: 44,
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.22)",
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              boxShadow:
                "0 6px 24px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.12)",
              cursor: "pointer",
              pointerEvents: "auto",
              zIndex: 10,
            }}
          >
            <motion.span
              aria-hidden
              animate={
                prefersReducedMotion
                  ? { y: 0, scale: 1, rotate: 0 }
                  : isMobile
                  ? { scale: [1, 1.18, 1] }
                  : { y: [0, -3, 0], rotate: [0, -8, 0, 8, 0] }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : {
                      duration: 2.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Sparkles
                size={16}
                strokeWidth={1.75}
                style={{
                  color: "rgba(201,168,76,0.95)",
                  filter:
                    "drop-shadow(0 0 6px rgba(201,168,76,0.45)) drop-shadow(0 1px 3px rgba(0,0,0,0.45))",
                }}
              />
            </motion.span>
            <span
              style={{
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.4em",
                color: "rgba(255,255,255,0.92)",
                fontWeight: 500,
                textShadow: "0 1px 8px rgba(0,0,0,0.45)",
              }}
            >
              {tapText}
            </span>
          </motion.button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}