"use client";

import { motion } from "framer-motion";
import { useWedding } from "@/components/providers/WeddingContext";

const SECTION_LABELS = [
  "Home", "Story", "Details", "Schedule",
  "Location", "RSVP", "Gallery", "Countdown",
];

export default function NavigationDots() {
  const { activeSection, setActiveSection, invitationOpen } = useWedding();

  if (!invitationOpen) return null;

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {SECTION_LABELS.map((label, i) => (
        <button
          key={label}
          onClick={() => {
            const sections = document.querySelectorAll("[data-section]");
            sections[i]?.scrollIntoView({ behavior: "smooth" });
            setActiveSection(i);
          }}
          className="group relative flex items-center justify-end gap-2"
          aria-label={`Go to ${label}`}
        >
          <span className="absolute right-5 text-[10px] font-medium tracking-widest uppercase text-amber-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            {label}
          </span>
          <motion.div
            animate={{
              width: activeSection === i ? 24 : 8,
              height: activeSection === i ? 8 : 8,
              backgroundColor: activeSection === i ? "#C9A84C" : "rgba(201,168,76,0.35)",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="rounded-full"
          />
        </button>
      ))}
    </div>
  );
}
