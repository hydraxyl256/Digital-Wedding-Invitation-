"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";

const THEME_COLOR = "#3D5A5B";

function CelebrationCard({
  subtitle, location, address, date, time, image, floatStyle = "yacht"
}: {
  subtitle: string; location: string; address: string;
  date: string; time: string; image?: string; floatStyle?: "yacht" | "hotel";
}) {
  const isHotel = floatStyle === "hotel";
  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
      {image && (
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          animate={isHotel
            ? { y: [0, -8, 0], rotate: [-0.3, 0.3, -0.3] }
            : { y: [0, -12, 0], rotate: [-1.5, 1.5, -1.5], x: [-3, 3, -3] }
          }
          transition={{
            y: { duration: isHotel ? 5 : 4.5, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: isHotel ? 6 : 5.5, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 0.8 }
          }}
          className="relative z-20 pointer-events-none"
          style={{ marginBottom: isHotel ? "-44px" : "-36px" }}
        >
          {/* Mobile: smaller, Desktop: original sizes */}
          <img
            src={image} alt=""
            className={`h-auto drop-shadow-sm ${isHotel ? "w-48 md:w-80" : "w-40 md:w-72"}`}
          />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="w-full bg-white/50 backdrop-blur-sm rounded-[40px] md:rounded-[52px] border border-white/80 shadow-[0_12px_40px_rgba(61,90,91,0.03)] px-6 py-10 md:px-12 md:py-16"
      >
        <div className="flex flex-col items-center text-center gap-5 md:gap-6">
          <p className="text-[9px] uppercase tracking-[0.8em] font-bold opacity-35"
            style={{ fontFamily: "'Montserrat', sans-serif", color: THEME_COLOR }}>
            {subtitle}
          </p>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-3xl md:text-5xl leading-tight" style={{ fontFamily: "'Great Vibes', cursive", color: THEME_COLOR }}>
              {location}
            </h3>
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-50"
              style={{ fontFamily: "'Montserrat', sans-serif", color: THEME_COLOR }}>
              {address}
            </p>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#3D5A5B]/12" />
          <div className="flex flex-col items-center gap-3">
            <p className="text-[9px] uppercase tracking-[0.6em] opacity-35 font-bold"
              style={{ fontFamily: "'Montserrat', sans-serif", color: THEME_COLOR }}>
              {date}
            </p>
            <p className="text-3xl md:text-5xl italic opacity-85" style={{ fontFamily: "'Great Vibes', cursive", color: THEME_COLOR }}>
              {time}
            </p>
          </div>
          <button
            className="text-[9px] uppercase tracking-[0.5em] font-bold border-b border-[#3D5A5B]/20 pb-1.5 hover:opacity-50 transition-all active:scale-95 mt-2"
            style={{ color: THEME_COLOR }}>
            View on Map
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function Celebrations() {
  return (
    <section data-section className="relative bg-[#f0f0e4] overflow-hidden flex flex-col items-center" style={{ paddingTop: "6rem", paddingBottom: "12rem" }}>
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center">

        <AnimatedSection direction="fade" className="text-center mb-14 md:mb-24">
          <h2 className="text-5xl md:text-6xl lg:text-7xl opacity-80"
            style={{ fontFamily: "'Great Vibes', cursive", color: THEME_COLOR }}>
            The Celebrations
          </h2>
        </AnimatedSection>

        <div className="flex flex-col items-center w-full gap-16 md:gap-36">
          <CelebrationCard image="/yacht.png" floatStyle="yacht" subtitle="Welcome Cruise"
            location="The Peninsula" address="Private Quay"
            date="Saturday, September 20, 2026" time="3:00 PM" />
          <CelebrationCard image="/hotel.png" floatStyle="hotel" subtitle="The Wedding"
            location="The Peninsula" address="Hotel Istanbul"
            date="Saturday, September 20, 2026" time="6:00 PM" />
        </div>
      </div>
    </section>
  );
}
