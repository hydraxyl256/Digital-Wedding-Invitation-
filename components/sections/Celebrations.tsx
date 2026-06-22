"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useWedding } from "@/components/providers/WeddingContext";

const THEME_COLOR = "#3D5A5B";

const TEXTS = {
  EN: {
    title: "The Celebrations",
    welcomeCruise: "Welcome Cruise",
    theWedding: "The Wedding",
    viewMap: "View on Map",
    welcomeDesc: "Boarding at the private Gravedona pier",
    weddingDesc: "Ceremony & reception in the Sala d'Onore",
  },
  IT: {
    title: "I Festeggiamenti",
    welcomeCruise: "Crociera di Benvenuto",
    theWedding: "Il Matrimonio",
    viewMap: "Visualizza sulla mappa",
    welcomeDesc: "Imbarco dal molo privato di Gravedona",
    weddingDesc: "Cerimonia e ricevimento nella Sala d'Onore",
  },
};

function CelebrationCard({
  subtitle,
  location,
  address,
  date,
  time,
  image,
  floatStyle = "yacht",
  viewMapLabel,
  note,
}: {
  subtitle: string;
  location: string;
  address: string;
  date: string;
  time: string;
  image?: string;
  floatStyle?: "yacht" | "hotel";
  viewMapLabel: string;
  note: string;
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
        className="w-full bg-white/55 backdrop-blur-sm rounded-[40px] md:rounded-[52px] border border-white/80 shadow-[0_12px_40px_rgba(61,90,91,0.06)] px-6 py-10 md:px-12 md:py-16"
      >
        <div className="flex flex-col items-center text-center gap-5 md:gap-6">
          <p
            className="text-[9px] md:text-[10px] uppercase tracking-[0.8em] font-bold"
            style={{ fontFamily: "'Montserrat', sans-serif", color: THEME_COLOR, opacity: 0.55 }}
          >
            {subtitle}
          </p>
          <div className="flex flex-col items-center gap-2">
            <h3
              className="text-3xl md:text-5xl leading-tight"
              style={{ fontFamily: "'Great Vibes', cursive", color: THEME_COLOR }}
            >
              {location}
            </h3>
            <p
              className="text-[10px] md:text-[11px] uppercase tracking-[0.3em]"
              style={{ fontFamily: "'Montserrat', sans-serif", color: THEME_COLOR, opacity: 0.7 }}
            >
              {address}
            </p>
          </div>
          <p
            className="text-[10px] md:text-xs font-serif italic max-w-xs"
            style={{ color: THEME_COLOR, opacity: 0.65 }}
          >
            {note}
          </p>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#3D5A5B", opacity: 0.18 }} />
          <div className="flex flex-col items-center gap-3">
            <p
              className="text-[9px] md:text-[10px] uppercase tracking-[0.6em] font-bold"
              style={{ fontFamily: "'Montserrat', sans-serif", color: THEME_COLOR, opacity: 0.55 }}
            >
              {date}
            </p>
            <p
              className="text-3xl md:text-5xl italic"
              style={{ fontFamily: "'Great Vibes', cursive", color: THEME_COLOR, opacity: 0.95 }}
            >
              {time}
            </p>
          </div>
          <button
            className="text-[9px] md:text-[10px] uppercase tracking-[0.5em] font-bold border-b pb-1.5 hover:opacity-60 transition-all active:scale-95 mt-2"
            style={{ color: THEME_COLOR, borderColor: "rgba(61,90,91,0.35)" }}
          >
            {viewMapLabel}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function Celebrations() {
  const { language } = useWedding();
  const t = TEXTS[language as keyof typeof TEXTS] ?? TEXTS.EN;

  return (
    <section
      data-section
      className="relative bg-[#f0f0e4] overflow-hidden flex flex-col items-center"
      style={{ paddingTop: "6rem", paddingBottom: "12rem" }}
    >
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center">
        <AnimatedSection direction="fade" className="text-center mb-14 md:mb-24">
          <h2
            className="text-5xl md:text-6xl lg:text-7xl"
            style={{ fontFamily: "'Great Vibes', cursive", color: THEME_COLOR, opacity: 0.9 }}
          >
            {t.title}
          </h2>
        </AnimatedSection>

        <div className="flex flex-col items-center w-full gap-16 md:gap-36">
          <CelebrationCard
            image="/yacht.png"
            floatStyle="yacht"
            subtitle={t.welcomeCruise}
            location="Palazzo Gallio"
            address="Via Regina Levante 2, 22015 Gravedona CO, Italy"
            date={language === "IT" ? "Domenica, 16 Agosto 2026" : "Sunday, August 16, 2026"}
            time="3:00 PM"
            viewMapLabel={t.viewMap}
            note={t.welcomeDesc}
          />
          <CelebrationCard
            image="/hotel.png"
            floatStyle="hotel"
            subtitle={t.theWedding}
            location="Palazzo Gallio"
            address="Via Regina Levante 2, 22015 Gravedona CO, Italy"
            date={language === "IT" ? "Domenica, 16 Agosto 2026" : "Sunday, August 16, 2026"}
            time="6:30 PM"
            viewMapLabel={t.viewMap}
            note={t.weddingDesc}
          />
        </div>
      </div>
    </section>
  );
}