"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useWedding } from "@/components/providers/WeddingContext";

const THEME_COLOR = "#2C3E35";

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
          style={{ marginBottom: isHotel ? "-32px" : "-28px" }}
        >
          <img
            src={image}
            alt=""
            className="h-auto drop-shadow-sm"
            style={{
              width: isHotel ? "clamp(8rem, 22vw, 18rem)" : "clamp(7rem, 18vw, 16rem)",
            }}
          />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="w-full bg-[#F1EFE9] border border-[#E3DFD5] rounded-[clamp(1.5rem,4vw,3.25rem)]"
        style={{
          padding: "clamp(1.75rem, 4vw, 4rem) clamp(1.25rem, 4vw, 3rem)",
        }}
      >
        <div className="flex flex-col items-center text-center gap-3 sm:gap-4 md:gap-6">
          <p
            className="uppercase tracking-[0.5em] sm:tracking-[0.8em] font-bold"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              color: THEME_COLOR,
              opacity: 0.55,
              fontSize: "clamp(8px, 0.9vw, 11px)",
            }}
          >
            {subtitle}
          </p>
          <div className="flex flex-col items-center gap-1.5 sm:gap-2">
            <h3
              className="leading-tight"
              style={{
                fontFamily: "'Great Vibes', cursive",
                color: THEME_COLOR,
                fontSize: "clamp(2.2rem, 6vw, 3.75rem)",
              }}
            >
              {location}
            </h3>
            <p
              className="uppercase tracking-[0.25em] sm:tracking-[0.3em]"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                color: THEME_COLOR,
                opacity: 0.7,
                fontSize: "clamp(9px, 0.95vw, 11px)",
              }}
            >
              {address}
            </p>
          </div>
          <p
            className="font-serif italic max-w-xs"
            style={{
              color: THEME_COLOR,
              opacity: 0.65,
              fontSize: "clamp(0.8rem, 1.1vw, 0.95rem)",
            }}
          >
            {note}
          </p>
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#2C3E35", opacity: 0.2 }}
          />
          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <p
              className="uppercase tracking-[0.4em] sm:tracking-[0.6em] font-bold"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                color: THEME_COLOR,
                opacity: 0.55,
                fontSize: "clamp(8px, 0.9vw, 11px)",
              }}
            >
              {date}
            </p>
            <p
              className="italic"
              style={{
                fontFamily: "'Great Vibes', cursive",
                color: THEME_COLOR,
                opacity: 0.95,
                fontSize: "clamp(2rem, 5.5vw, 3.5rem)",
              }}
            >
              {time}
            </p>
          </div>
          <button
            className="uppercase tracking-[0.4em] sm:tracking-[0.5em] font-bold border-b pb-1 hover:opacity-60 transition-all active:scale-95 mt-1 sm:mt-2 min-h-[44px] flex items-center"
            style={{
              color: THEME_COLOR,
              borderColor: "rgba(44,62,53,0.4)",
              fontSize: "clamp(8px, 0.9vw, 11px)",
            }}
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
      className="relative bg-transparent overflow-hidden flex flex-col items-center"
      style={{
        paddingTop: "clamp(4rem, 8vw, 6rem)",
        paddingBottom: "clamp(6rem, 10vw, 12rem)",
      }}
    >
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        <AnimatedSection direction="fade" className="text-center mb-10 sm:mb-16 md:mb-24">
          <h2
            style={{
              fontFamily: "'Great Vibes', cursive",
              color: THEME_COLOR,
              opacity: 0.9,
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              lineHeight: 1.1,
            }}
          >
            {t.title}
          </h2>
        </AnimatedSection>

        <div className="flex flex-col items-center w-full gap-12 sm:gap-20 md:gap-36">
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
        </div>
      </div>
    </section>
  );
}