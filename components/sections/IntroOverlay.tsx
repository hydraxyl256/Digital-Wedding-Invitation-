"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MousePointer2 } from "lucide-react";
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
          // Static centering wrapper — framer-motion's `animate={{ transform }}` would
          // otherwise overwrite `translateX(-50%)` and push the button off-screen.
          <div
            style={{
              position: "absolute",
              bottom: 36,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              zIndex: 10,
              pointerEvents: "none",
            }}
          >
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
                      scale: [1, 1.05, 1],
                    }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0.8, delay: 0.6 }
                  : {
                      opacity: { duration: 1.2, delay: 0.6 },
                      y: { duration: 1.2, delay: 0.6 },
                      scale: { duration: 2.6, repeat: Infinity, ease: "easeInOut" },
                    }
              }
              whileHover={prefersReducedMotion ? undefined : { scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              aria-label={tapText}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "11px 22px 11px 18px",
                minHeight: 48,
                borderRadius: 999,
                border: "1px solid rgba(201,168,76,0.45)",
                background: "rgba(20, 16, 10, 0.55)",
                backdropFilter: "blur(16px) saturate(140%)",
                WebkitBackdropFilter: "blur(16px) saturate(140%)",
                boxShadow:
                  "0 8px 28px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.10), 0 0 0 1px rgba(0,0,0,0.05)",
                cursor: "pointer",
                pointerEvents: "auto",
                willChange: "transform, opacity",
              }}
            >
              <motion.span
                aria-hidden
                animate={
                  prefersReducedMotion
                    ? { y: 0, scale: 1, rotate: 0 }
                    : isMobile
                    ? { scale: [1, 1.12, 1] }
                    : { y: [0, 4, 0, 4, 0] }
                }
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : {
                        duration: 1.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        times: [0, 0.25, 0.5, 0.75, 1],
                      }
                }
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transformOrigin: "top left",
                }}
              >
                <MousePointer2
                  size={20}
                  strokeWidth={1.5}
                  fill="rgba(228, 192, 110, 0.95)"
                  stroke="rgba(228, 192, 110, 1)"
                  style={{
                    color: "rgba(228, 192, 110, 1)",
                    filter:
                      "drop-shadow(0 0 6px rgba(228, 192, 110, 0.55)) drop-shadow(0 1px 2px rgba(0,0,0,0.6))",
                  }}
                />
              </motion.span>
              <span
                style={{
                  fontSize: 10.5,
                  textTransform: "uppercase",
                  letterSpacing: "0.4em",
                  color: "rgba(255,255,255,0.95)",
                  fontWeight: 600,
                  textShadow: "0 1px 6px rgba(0,0,0,0.55)",
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                {tapText}
              </span>
            </motion.button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}