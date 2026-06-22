"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { weddingConfig } from "@/lib/wedding-config";

interface WeddingContextType {
  guestName: string;
  invitationOpen: boolean;
  setInvitationOpen: (v: boolean) => void;
  musicPlaying: boolean;
  toggleMusic: () => void;
  activeSection: number;
  setActiveSection: (i: number) => void;
  language: string;
  setLanguage: (v: string) => void;
}

const WeddingContext = createContext<WeddingContextType | null>(null);

export function WeddingProvider({ children }: { children: React.ReactNode }) {
  const [guestName, setGuestName] = useState("Friend");
  const [invitationOpen, setInvitationOpen] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [language, setLanguage] = useState("EN");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Parse guest name from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const guest = params.get("guest");
    if (guest) setGuestName(decodeURIComponent(guest));
  }, []);

  // Manage audio
  useEffect(() => {
    if (typeof window === "undefined") return;
    audioRef.current = new Audio(weddingConfig.music.src);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.35;
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (musicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setMusicPlaying((p) => !p);
  };

  // Auto-play when invitation opens
  useEffect(() => {
    if (invitationOpen && audioRef.current && !musicPlaying) {
      audioRef.current.play().catch(() => {});
      setMusicPlaying(true);
    }
  }, [invitationOpen]);

  return (
    <WeddingContext.Provider
      value={{ guestName, invitationOpen, setInvitationOpen, musicPlaying, toggleMusic, activeSection, setActiveSection, language, setLanguage }}
    >
      {children}
    </WeddingContext.Provider>
  );
}

export function useWedding() {
  const ctx = useContext(WeddingContext);
  if (!ctx) throw new Error("useWedding must be used inside WeddingProvider");
  return ctx;
}