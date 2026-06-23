"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useWedding } from "@/components/providers/WeddingContext";

const THEME_COLOR = "#2C3E35";

const TEXTS = {
  EN: {
    title: "The Venue",
    // welcomeCruise: "Welcome Cruise",
    theWedding: "The Wedding",
    viewMap: "View on Map",
    welcomeDesc: "",
    weddingDesc: "Ceremony & reception in the Sala d'Onore",
    tabDetails: "Details",
    tabHistory: "History",
    historyTitle: "A Brief History",
    historyDesc: "Palazzo Gallio is a majestic 16th-century palace built by Cardinal Tolomeo Gallio. Overlooking the serene waters of Lake Como, it has stood for centuries as a testament to Renaissance architecture and timeless elegance, making it the perfect setting for our celebration.",
  },
  IT: {
    title: "I Festeggiamenti",
    // welcomeCruise: "Crociera di Benvenuto",
    theWedding: "Il Matrimonio",
    viewMap: "Visualizza sulla mappa",
    welcomeDesc: "",
    weddingDesc: "Cerimonia e ricevimento nella Sala d'Onore",
    tabDetails: "Dettagli",
    tabHistory: "Storia",
    historyTitle: "Una Breve Storia",
    historyDesc: "Palazzo Gallio è un maestoso palazzo del XVI secolo costruito dal cardinale Tolomeo Gallio. Affacciato sulle serene acque del Lago di Como, si erge da secoli come testimonianza dell'architettura rinascimentale e dell'eleganza senza tempo, rendendolo la cornice perfetta per la nostra celebrazione.",
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
  mapUrl,
  note,
}: {
  subtitle: string;
  location: string;
  address: string;
  date: string;
  time: string;
  image?: string;
  floatStyle?: "yacht" | "hotel" | "venue";
  viewMapLabel: string;
  mapUrl: string;
  note: string;
}) {
  const isHotel = floatStyle === "hotel";
  const isVenue = floatStyle === "venue";
  const [activeTab, setActiveTab] = useState<"details" | "history">("details");
  const { language } = useWedding();
  const t = TEXTS[language as keyof typeof TEXTS] ?? TEXTS.EN;

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
      {image && (
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          animate={isHotel || isVenue
            ? { y: [0, -8, 0], rotate: [-0.3, 0.3, -0.3] }
            : { y: [0, -12, 0], rotate: [-1.5, 1.5, -1.5], x: [-3, 3, -3] }
          }
          transition={{
            y: { duration: isHotel || isVenue ? 5 : 4.5, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: isHotel || isVenue ? 6 : 5.5, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 0.8 }
          }}
          className="relative z-20 pointer-events-none"
          style={{ marginBottom: isVenue ? "20px" : (isHotel ? "-32px" : "-28px") }}
        >
          <img
            src={image}
            alt=""
            className={`h-auto drop-shadow-xl ${isVenue ? "rounded-3xl border-4 border-white/80" : ""}`}
            style={{
              width: isVenue ? "clamp(12rem, 30vw, 24rem)" : (isHotel ? "clamp(8rem, 22vw, 18rem)" : "clamp(7rem, 18vw, 16rem)"),
            }}
          />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="w-full bg-[#F1EFE9] border border-[#E3DFD5] rounded-[clamp(1.5rem,4vw,3.25rem)] overflow-hidden"
        style={{
          padding: "clamp(1.75rem, 4vw, 4rem) clamp(1.25rem, 4vw, 3rem)",
        }}
      >
        <div className="flex flex-col items-center text-center w-full min-h-[300px]">

          {/* TAB HEADERS */}
          <div className="flex items-center gap-6 border-b border-[#E3DFD5] w-full max-w-[240px] justify-center mb-6 sm:mb-8">
            <button
              onClick={() => setActiveTab("details")}
              className={`uppercase tracking-[0.2em] text-[10px] pb-2 px-2 transition-all ${activeTab === "details" ? "border-b-2 font-bold" : "opacity-50"}`}
              style={{ borderColor: THEME_COLOR, color: THEME_COLOR }}
            >
              {t.tabDetails}
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`uppercase tracking-[0.2em] text-[10px] pb-2 px-2 transition-all ${activeTab === "history" ? "border-b-2 font-bold" : "opacity-50"}`}
              style={{ borderColor: THEME_COLOR, color: THEME_COLOR }}
            >
              {t.tabHistory}
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "details" ? (
              <motion.div
                key="details"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center gap-3 sm:gap-4 md:gap-6 w-full"
              >
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
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="uppercase tracking-[0.4em] sm:tracking-[0.5em] font-bold border-b pb-1 hover:opacity-60 transition-all active:scale-95 mt-1 sm:mt-2 min-h-[44px] flex items-center"
                  style={{
                    color: THEME_COLOR,
                    borderColor: "rgba(44,62,53,0.4)",
                    fontSize: "clamp(8px, 0.9vw, 11px)",
                  }}
                >
                  {viewMapLabel}
                </a>
              </motion.div>
            ) : (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center gap-6 w-full max-w-md"
              >
                <h3
                  className="leading-tight"
                  style={{
                    fontFamily: "'Great Vibes', cursive",
                    color: THEME_COLOR,
                    fontSize: "clamp(2rem, 5.5vw, 3.5rem)",
                  }}
                >
                  {t.historyTitle}
                </h3>
                <p
                  className="font-serif leading-relaxed"
                  style={{
                    color: THEME_COLOR,
                    opacity: 0.8,
                    fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
                  }}
                >
                  {t.historyDesc}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
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
            image="/venue.webp"
            floatStyle="venue"
            subtitle=""
            location="Palazzo Gallio"
            address="Via Regina Levante 2, 22015 Gravedona CO, Italy"
            date={language === "IT" ? "Domenica, 16 Agosto 2026" : "Sunday, August 16, 2026"}
            time=""
            viewMapLabel={t.viewMap}
            mapUrl="https://www.google.com/maps/place/Palazzo+Gallio/@46.1478268,9.3092972,17z/data=!3m1!5s0x4784401d1d315d85:0x263fae6377bb4855!4m6!3m5!1s0x4784401d8687f5b5:0xdb54215c26fea7e4!8m2!3d46.1480535!4d9.3094568!16s%2Fg%2F1226g6cz?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D"
            note={t.welcomeDesc}
          />
        </div>
      </div>
    </section>
  );
}