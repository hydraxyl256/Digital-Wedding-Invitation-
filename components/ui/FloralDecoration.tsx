"use client";

import { motion, Variants } from "framer-motion";
import { useWedding } from "@/components/providers/WeddingContext";
import { useState, useEffect } from "react";

// Romantic gentle sway — slightly different timing per flower so they feel alive
const swayLeft: Variants = {
  animate: {
    rotate: [-4, 2, -4],
    y: [-4, 4, -4],
    x: [-2, 2, -2],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
      times: [0, 0.5, 1],
    },
  },
};

const swayRight: Variants = {
  animate: {
    rotate: [4, -2, 4],
    y: [4, -4, 4],
    x: [2, -2, 2],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
      times: [0, 0.5, 1],
    },
  },
};

const swayTopLeft: Variants = {
  animate: {
    rotate: [-6, 1, -6],
    y: [-3, 3, -3],
    transition: {
      duration: 7,
      repeat: Infinity,
      ease: "easeInOut",
      times: [0, 0.5, 1],
    },
  },
};

const swayTopRight: Variants = {
  animate: {
    rotate: [6, -1, 6],
    y: [3, -3, 3],
    transition: {
      duration: 5.5,
      repeat: Infinity,
      ease: "easeInOut",
      times: [0, 0.5, 1],
    },
  },
};

export default function FloralDecoration() {
  const { invitationOpen, activeSection } = useWedding();
  // One-way latch — once flowers appear (Our Story = section 1) they stay visible
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (invitationOpen && activeSection >= 1 && !shown) {
      setShown(true);
    }
  }, [invitationOpen, activeSection, shown]);

  if (!shown) return null;

  return (
    <>
      {/* ── LEFT SIDE ── */}
      {/* Bottom-left large bouquet */}
      <motion.div
        className="fixed pointer-events-none select-none hidden md:block"
        style={{
          left: -30,
          bottom: "8%",
          zIndex: 5,
          opacity: 0.82,
          transformOrigin: "bottom center",
        }}
        variants={swayLeft}
        animate="animate"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/flower-path-two-flip.png"
          alt=""
          style={{ width: 200, height: "auto" }}
          draggable={false}
        />
      </motion.div>

      {/* Top-left small flowers */}
      <motion.div
        className="fixed pointer-events-none select-none hidden md:block"
        style={{
          left: -10,
          top: "12%",
          zIndex: 5,
          opacity: 0.65,
          transformOrigin: "top center",
        }}
        variants={swayTopLeft}
        animate="animate"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/flower-path-one-flip.png"
          alt=""
          style={{ width: 130, height: "auto" }}
          draggable={false}
        />
      </motion.div>

      {/* ── RIGHT SIDE ── */}
      {/* Bottom-right large bouquet */}
      <motion.div
        className="fixed pointer-events-none select-none hidden md:block"
        style={{
          right: -30,
          bottom: "8%",
          zIndex: 5,
          opacity: 0.82,
          transformOrigin: "bottom center",
        }}
        variants={swayRight}
        animate="animate"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/flower-path-two.png"
          alt=""
          style={{ width: 200, height: "auto" }}
          draggable={false}
        />
      </motion.div>

      {/* Top-right small flowers */}
      <motion.div
        className="fixed pointer-events-none select-none hidden md:block"
        style={{
          right: -10,
          top: "12%",
          zIndex: 5,
          opacity: 0.65,
          transformOrigin: "top center",
        }}
        variants={swayTopRight}
        animate="animate"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/flower-path-one.png"
          alt=""
          style={{ width: 130, height: "auto" }}
          draggable={false}
        />
      </motion.div>

      {/* ── MOBILE — smaller flowers, just left + right mid ── */}
      <motion.div
        className="fixed pointer-events-none select-none md:hidden"
        style={{
          left: -20,
          top: "35%",
          zIndex: 5,
          opacity: 0.55,
          transformOrigin: "center left",
        }}
        variants={swayLeft}
        animate="animate"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/flower-path-one-flip.png" alt="" style={{ width: 90, height: "auto" }} draggable={false} />
      </motion.div>

      <motion.div
        className="fixed pointer-events-none select-none md:hidden"
        style={{
          right: -20,
          top: "35%",
          zIndex: 5,
          opacity: 0.55,
          transformOrigin: "center right",
        }}
        variants={swayRight}
        animate="animate"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/flower-path-one.png" alt="" style={{ width: 90, height: "auto" }} draggable={false} />
      </motion.div>
    </>
  );
}
