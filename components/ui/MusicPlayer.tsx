"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useWedding } from "@/components/providers/WeddingContext";

export default function MusicPlayer() {
  const { musicPlaying, toggleMusic, invitationOpen } = useWedding();

  if (!invitationOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <button
          onClick={toggleMusic}
          className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-xl border border-white/50 cursor-pointer hover:scale-110 transition-all duration-300 active:scale-95 group"
          aria-label={musicPlaying ? "Mute music" : "Unmute music"}
        >
          {musicPlaying ? (
            <div className="relative">
              <Volume2 size={20} className="text-[#3D5A5B]" strokeWidth={1.5} />
              <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-[#3D5A5B]/20 rounded-full"
              />
            </div>
          ) : (
            <VolumeX size={20} className="text-[#3D5A5B]" strokeWidth={1.5} />
          )}
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
