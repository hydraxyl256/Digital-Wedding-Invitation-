"use client";

import { motion } from "framer-motion";
import { weddingConfig } from "@/lib/wedding-config";
import { useEffect, useState } from "react";

// Premium floating particle — elegant SVG shapes
function FloatingParticle({ index }: { index: number }) {
  const left = `${(index * 13.7 + 5) % 100}%`;
  const delay = (index * 0.9) % 10;
  const duration = 14 + (index % 5) * 3;
  const size = 6 + (index % 3) * 5;
  const type = index % 4;

  const shapes = [
    <svg key="d" width={size} height={size} viewBox="0 0 12 12" fill="none">
      <path d="M6 1L11 6L6 11L1 6Z" fill="rgba(201,168,76,0.55)" />
    </svg>,
    <svg key="r" width={size + 2} height={size + 2} viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="5" stroke="rgba(201,168,76,0.45)" strokeWidth="1.5" />
    </svg>,
    <svg key="dot" width={size - 2} height={size - 2} viewBox="0 0 8 8" fill="none">
      <circle cx="4" cy="4" r="3" fill="rgba(201,168,76,0.4)" />
    </svg>,
    <svg key="s" width={size} height={size} viewBox="0 0 12 12" fill="none">
      <path d="M6 0.5L6.8 5.2L11.5 6L6.8 6.8L6 11.5L5.2 6.8L0.5 6L5.2 5.2Z" fill="rgba(201,168,76,0.5)" />
    </svg>,
  ];

  return (
    <motion.div
      className="absolute top-0 pointer-events-none select-none"
      style={{ left }}
      initial={{ y: -20, opacity: 0, rotate: 0 }}
      animate={{ y: "110vh", opacity: [0, 0.9, 0.9, 0], rotate: 180 }}
      transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
    >
      {shapes[type]}
    </motion.div>
  );
}

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section
      data-section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #FDF6EC 0%, #F7E7CE 40%, #F2D4D7 75%, #EED5E9 100%)",
      }}
    >
      {/* Floating particles */}
      {mounted && Array.from({ length: 14 }).map((_, i) => <FloatingParticle key={i} index={i} />)}

      {/* Decorative rings */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute rounded-full border border-amber-200/40 pointer-events-none"
        style={{ width: "min(480px, 80vw)", height: "min(480px, 80vw)" }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute rounded-full border border-amber-100/25 pointer-events-none"
        style={{ width: "min(660px, 95vw)", height: "min(660px, 95vw)" }}
      />

      {/* ── Large floral ornaments — Left side ── */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 bottom-0 pointer-events-none select-none hidden lg:block"
        style={{ transformOrigin: "bottom left" }}
      >
        <motion.img
          src="/flower-path-two-flip.png"
          alt=""
          draggable={false}
          style={{ width: "clamp(180px, 18vw, 280px)", height: "auto", opacity: 0.85 }}
          animate={{ rotate: [-3, 2, -3], y: [-4, 4, -4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Top-left small accent */}
      <motion.div
        initial={{ opacity: 0, x: -40, y: -20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1.4, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-2 top-8 pointer-events-none select-none hidden lg:block"
        style={{ transformOrigin: "top left" }}
      >
        <motion.img
          src="/flower-path-one-flip.png"
          alt=""
          draggable={false}
          style={{ width: "clamp(100px, 10vw, 150px)", height: "auto", opacity: 0.65 }}
          animate={{ rotate: [-5, 1, -5], y: [-3, 3, -3] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* ── Large floral ornaments — Right side ── */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-0 bottom-0 pointer-events-none select-none hidden lg:block"
        style={{ transformOrigin: "bottom right" }}
      >
        <motion.img
          src="/flower-path-two.png"
          alt=""
          draggable={false}
          style={{ width: "clamp(180px, 18vw, 280px)", height: "auto", opacity: 0.85 }}
          animate={{ rotate: [3, -2, 3], y: [4, -4, 4] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Top-right small accent */}
      <motion.div
        initial={{ opacity: 0, x: 40, y: -20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1.4, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-2 top-8 pointer-events-none select-none hidden lg:block"
        style={{ transformOrigin: "top right" }}
      >
        <motion.img
          src="/flower-path-one.png"
          alt=""
          draggable={false}
          style={{ width: "clamp(100px, 10vw, 150px)", height: "auto", opacity: 0.65 }}
          animate={{ rotate: [5, -1, 5], y: [3, -3, 3] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* ── Hero Content ── */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Pre-title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xs md:text-sm uppercase tracking-[0.4em] text-amber-700 mb-10 font-medium"
        >
          Together with their families
        </motion.p>

        {/* Bride name */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-amber-900 leading-none mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {weddingConfig.bride}
        </motion.h1>

        {/* Premium ornamental divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex items-center gap-3 justify-center my-5"
        >
          <div className="h-px flex-1 max-w-[60px]" style={{ background: "linear-gradient(90deg, transparent, #C9A84C)" }} />
          {/* Premium SVG ornament — interlocking rings */}
          <svg width="48" height="24" viewBox="0 0 48 24" fill="none" className="flex-shrink-0">
            <circle cx="16" cy="12" r="9" stroke="#C9A84C" strokeWidth="1.25" fill="none" opacity="0.9" />
            <circle cx="32" cy="12" r="9" stroke="#C9A84C" strokeWidth="1.25" fill="none" opacity="0.9" />
            <circle cx="16" cy="12" r="3" fill="#C9A84C" opacity="0.6" />
            <circle cx="32" cy="12" r="3" fill="#C9A84C" opacity="0.6" />
          </svg>
          <div className="h-px flex-1 max-w-[60px]" style={{ background: "linear-gradient(270deg, transparent, #C9A84C)" }} />
        </motion.div>

        {/* Groom name */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-amber-900 leading-none mb-10"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {weddingConfig.groom}
        </motion.h1>

        {/* Date */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-sm md:text-base uppercase tracking-[0.35em] text-amber-700"
        >
          {weddingConfig.weddingDateFormatted}
        </motion.p>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-amber-600/70">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8"
          style={{ background: "linear-gradient(180deg, #C9A84C, transparent)" }}
        />
      </motion.div>
    </section>
  );
}
