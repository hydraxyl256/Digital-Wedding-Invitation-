"use client";

import { motion } from "framer-motion";
import { weddingConfig } from "@/lib/wedding-config";
import { Heart } from "lucide-react";

const THEME = "#3D5A5B";

export default function Maintenance() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#1a1510] flex items-center justify-center px-6">
      {/* Background Image */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-overlay"
        style={{
          backgroundImage: "url('/hero-background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-black/30" />

      {/* Floating particles or subtle elements */}
      <motion.div
        animate={{ y: [0, -10, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#C9A84C] rounded-full blur-[100px]"
      />
      <motion.div
        animate={{ y: [0, 10, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-[#3D5A5B] rounded-full blur-[100px]"
      />

      {/* Main Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 rounded-[40px] px-8 py-16 md:px-16 md:py-20 flex flex-col items-center text-center shadow-2xl"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 rounded-full flex items-center justify-center mb-8"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <Heart size={24} className="text-white/80" strokeWidth={1.5} />
        </motion.div>

        <h1
          className="text-5xl md:text-6xl lg:text-7xl mb-4 text-white drop-shadow-md"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          {weddingConfig.coupleNames}
        </h1>

        <div className="w-12 h-[1px] bg-white/30 mb-8" />

        <h2
          className="text-white/90 text-[8px] sm:text-[10px] md:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] font-medium mb-4"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Preparing something beautiful
        </h2>

        <p
          className="text-white/60 font-serif italic text-sm md:text-base leading-relaxed max-w-xs"
        >
          The Site is not yet Paid, Please Contact the developer on WhatsApp on +256744956553 For More Information.
        </p>

        {/* Loading dots */}
        <div className="flex gap-2 mt-10">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.2, 1, 0.2], y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              className="w-1.5 h-1.5 rounded-full bg-white/60"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
