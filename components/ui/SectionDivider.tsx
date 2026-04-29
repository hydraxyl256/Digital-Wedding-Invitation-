"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function SectionDivider() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className="relative flex items-center justify-center py-6 px-6 overflow-hidden"
      style={{ background: "inherit" }}
      aria-hidden="true"
    >
      {/* Left line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: inView ? 1 : 0, opacity: inView ? 1 : 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 h-px origin-right"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.35))",
        }}
      />

      {/* Center ornament */}
      <motion.div
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.4 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="mx-5 flex items-center gap-2 flex-shrink-0"
      >
        <span
          className="block w-1 h-1 rounded-full"
          style={{ background: "rgba(201,168,76,0.5)" }}
        />
        <span
          className="text-amber-400/60 text-sm select-none"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          ✦
        </span>
        <span
          className="block w-1 h-1 rounded-full"
          style={{ background: "rgba(201,168,76,0.5)" }}
        />
      </motion.div>

      {/* Right line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: inView ? 1 : 0, opacity: inView ? 1 : 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 h-px origin-left"
        style={{
          background: "linear-gradient(270deg, transparent, rgba(201,168,76,0.35))",
        }}
      />
    </div>
  );
}
