"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useWedding } from "@/components/providers/WeddingContext";
import { useState, useRef } from "react";

export default function IntroOverlay() {
  const { invitationOpen, setInvitationOpen, language } = useWedding();
  const [closing, setClosing] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleOpen = () => {
    setClosing(true);
    
    if (window.innerWidth < 768 && videoRef.current) {
      setPlayingVideo(true);
      videoRef.current.play().catch((err) => {
        console.error("Video play failed", err);
        setPlayingVideo(false);
        setTimeout(() => setInvitationOpen(true), 800);
      });
    } else {
      // Brief fade-out, then reveal the main page
      setTimeout(() => setInvitationOpen(true), 800);
    }
  };

  if (invitationOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="envelope"
        initial={{ opacity: 0 }}
        animate={{ opacity: (closing && !playingVideo) ? 0 : 1 }}
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
        {/* Fullscreen envelope image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: (closing && !playingVideo) ? 1.08 : 1 }}
          transition={{ duration: (closing && !playingVideo) ? 0.8 : 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "absolute", inset: 0 }}
        >
          <picture style={{ width: "100%", height: "100%", display: "block" }}>
            <source srcSet="/intro-photo-desktop.png" media="(min-width: 768px)" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
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

        {/* Video for mobile */}
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
            pointerEvents: "none"
          }}
        />

        {/* Tap hint — bottom center */}
        {!closing && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0.5, 1, 0.5], y: 0 }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            style={{
              position: "absolute",
              bottom: 48,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              pointerEvents: "none",
              zIndex: 10,
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.35, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "rgba(201,168,76,0.95)",
                boxShadow: "0 0 20px rgba(201,168,76,0.7)",
              }}
            />
            <p style={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.4em",
              color: "rgba(201,168,76,0.9)",
              fontWeight: 600,
              textShadow: "0 1px 8px rgba(0,0,0,0.4)",
              margin: 0,
            }}>
              {language === "EN" ? "Tap to open" : "Zum Öffnen tippen"}
            </p>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
