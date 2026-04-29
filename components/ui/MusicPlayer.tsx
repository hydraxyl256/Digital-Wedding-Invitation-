"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Music, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useWedding } from "@/components/providers/WeddingContext";
import { weddingConfig } from "@/lib/wedding-config";

export default function MusicPlayer() {
  const { musicPlaying, toggleMusic, invitationOpen } = useWedding();

  if (!invitationOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-6 left-6 z-50"
      >
        <button
          onClick={toggleMusic}
          className="group flex items-center gap-3 px-4 py-3 rounded-full backdrop-blur-md border border-white/30 shadow-[0_8px_32px_rgba(201,168,76,0.25)] transition-all duration-300 hover:shadow-[0_8px_40px_rgba(201,168,76,0.4)] hover:scale-105"
          style={{ background: "rgba(253,246,236,0.85)" }}
          aria-label={musicPlaying ? "Pause music" : "Play music"}
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gold text-white flex-shrink-0" style={{ background: "linear-gradient(135deg,#C9A84C,#e8c97a)" }}>
            {musicPlaying ? (
              <Pause size={14} fill="white" />
            ) : (
              <Play size={14} fill="white" className="translate-x-0.5" />
            )}
            {musicPlaying && (
              <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ background: "#C9A84C" }} />
            )}
          </div>
          <div className="flex flex-col text-left overflow-hidden max-w-[120px]">
            <span className="text-[10px] uppercase tracking-widest text-amber-700 font-semibold">Now Playing</span>
            <span className="text-xs font-medium text-amber-900 truncate">{weddingConfig.music.title}</span>
          </div>
          {musicPlaying ? (
            <Volume2 size={14} className="text-amber-700 flex-shrink-0" />
          ) : (
            <VolumeX size={14} className="text-amber-700 flex-shrink-0" />
          )}
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
