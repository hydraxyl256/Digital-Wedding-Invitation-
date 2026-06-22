"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { weddingConfig } from "@/lib/wedding-config";
import { useWedding } from "@/components/providers/WeddingContext";
import { Landmark, Waves, Sparkles, Camera, MapPin, Navigation, Apple } from "lucide-react";

const THEME = "#3D5A5B";
const GOLD = "#C9A84C";

const ICONS: Record<string, React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>> = {
  landmark: Landmark,
  waves: Waves,
  sparkles: Sparkles,
  camera: Camera,
};

const TEXTS = {
  EN: {
    eyebrow: "The Setting",
    title: "Palazzo Gallio",
    subtitle: "A Renaissance Palace on Lake Como",
    body: "Set on the western shore of Lake Como, Palazzo Gallio is a 16th-century masterpiece commissioned by Cardinal Tolomeo Gallio. Frescoed salons, sunlit loggias, and Italianate courtyards open onto one of the most romantic lakeside views in Europe — the perfect setting for a wedding steeped in history and beauty.",
    highlights: "Venue Highlights",
    addressLabel: "Address",
    openInMaps: "Open in Google Maps",
    appleMaps: "Apple Maps",
    travel: "Getting There",
    travelBody:
      "Milan Malpensa is approximately 90 minutes by car. The private pier at Gravedona welcomes guests arriving by boat.",
  },
  IT: {
    eyebrow: "La Location",
    title: "Palazzo Gallio",
    subtitle: "Un Palazzo Rinascimentale sul Lago di Como",
    body: "Sulla sponda occidentale del Lago di Como, Palazzo Gallio è un capolavoro del XVI secolo commissionato dal Cardinale Tolomeo Gallio. Sale affrescate, logge solari e cortili all'italiana si aprono su una delle vedute lacustri più romantiche d'Europa — la cornice perfetta per un matrimonio intriso di storia e bellezza.",
    highlights: "Punti Salienti della Location",
    addressLabel: "Indirizzo",
    openInMaps: "Apri in Google Maps",
    appleMaps: "Apple Maps",
    travel: "Come Raggiungerci",
    travelBody:
      "Milano Malpensa dista circa 90 minuti in auto. Il molo privato di Gravedona accoglie gli ospiti che arrivano in barca.",
  },
};

export default function VenueSection() {
  const { language } = useWedding();
  const t = TEXTS[language as keyof typeof TEXTS] ?? TEXTS.EN;

  return (
    <section
      data-section
      className="relative overflow-hidden flex flex-col items-center"
      style={{
        background: "linear-gradient(180deg, #f0f0e4 0%, #F2D4D7 60%, #F7E7CE 100%)",
        paddingTop: "10rem",
        paddingBottom: "10rem",
      }}
    >
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center">
        <AnimatedSection direction="fade" className="text-center mb-12 md:mb-16 flex flex-col items-center gap-3">
          <p
            className="text-[10px] md:text-xs uppercase tracking-[0.6em] font-bold"
            style={{ fontFamily: "'Montserrat', sans-serif", color: THEME, opacity: 0.55 }}
          >
            {t.eyebrow}
          </p>
          <h2
            className="text-5xl md:text-6xl lg:text-7xl"
            style={{ fontFamily: "'Great Vibes', cursive", color: THEME }}
          >
            {t.title}
          </h2>
          <div className="flex items-center gap-3 w-full max-w-[220px] mt-2">
            <div
              className="h-[1px] flex-1"
              style={{ background: "linear-gradient(90deg, transparent, rgba(61,90,91,0.5))" }}
            />
            <span style={{ color: "rgba(201,168,76,0.9)", fontSize: "0.8rem" }}>✦</span>
            <div
              className="h-[1px] flex-1"
              style={{ background: "linear-gradient(270deg, transparent, rgba(61,90,91,0.5))" }}
            />
          </div>
          <p
            className="text-base md:text-lg font-serif italic max-w-2xl mt-2"
            style={{ color: THEME, opacity: 0.85 }}
          >
            {t.subtitle}
          </p>
        </AnimatedSection>

        {/* Body */}
        <AnimatedSection direction="up" delay={0.1} className="w-full max-w-3xl">
          <p
            className="text-center text-sm md:text-base font-light leading-relaxed md:leading-loose"
            style={{ fontFamily: "'Montserrat', sans-serif", color: THEME, opacity: 0.85 }}
          >
            {t.body}
          </p>
        </AnimatedSection>

        {/* Highlights */}
        <AnimatedSection direction="fade" delay={0.2} className="w-full mt-14 md:mt-20">
          <h3
            className="text-center text-2xl md:text-3xl mb-8 md:mb-12"
            style={{ fontFamily: "'Great Vibes', cursive", color: THEME }}
          >
            {t.highlights}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
            {weddingConfig.venueHighlights.map((h, i) => {
              const Icon = ICONS[h.icon] ?? Sparkles;
              return (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.08 }}
                  className="bg-white/55 backdrop-blur-sm border border-white/70 rounded-3xl px-6 py-7 md:px-8 md:py-8 flex items-start gap-4"
                  style={{ boxShadow: "0 8px 32px rgba(61,90,91,0.06)" }}
                >
                  <div
                    className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #C9A84C, #e8c97a)",
                      boxShadow: "0 8px 20px rgba(201,168,76,0.3)",
                    }}
                  >
                    <Icon size={22} color="white" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm md:text-base font-semibold mb-1.5"
                      style={{ color: THEME }}
                    >
                      {h.title}
                    </p>
                    <p
                      className="text-xs md:text-sm leading-relaxed"
                      style={{ color: THEME, opacity: 0.75, fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {h.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Map + Address */}
        <AnimatedSection direction="up" delay={0.1} className="w-full mt-16 md:mt-24">
          <div
            className="relative w-full rounded-3xl overflow-hidden"
            style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.12)" }}
          >
            <div className="w-full" style={{ height: 380 }}>
              <iframe
                src={weddingConfig.ceremony.mapsUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "sepia(0.15) saturate(0.9)", display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Wedding Venue Map"
              />
            </div>

            <div
              className="absolute"
              style={{
                bottom: 16,
                left: "50%",
                transform: "translateX(-50%)",
                width: "92%",
                maxWidth: 440,
                borderRadius: 20,
                padding: "18px 20px",
                background: "rgba(253,246,236,0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.7)",
                boxShadow: "0 8px 32px rgba(201,168,76,0.25)",
              }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #C9A84C, #e8c97a)",
                  }}
                >
                  <MapPin size={16} color="white" />
                </div>
                <div className="min-w-0">
                  <p
                    className="font-semibold text-sm mb-0.5"
                    style={{ color: "#78350f" }}
                  >
                    {weddingConfig.ceremony.name}
                  </p>
                  <p className="text-xs" style={{ color: "rgba(120,53,15,0.75)" }}>
                    {weddingConfig.ceremony.address}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                <a
                  href={weddingConfig.ceremony.openMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 transition-all duration-300 hover:opacity-80 active:scale-95"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "9px 16px",
                    borderRadius: 50,
                    background: "linear-gradient(135deg, #C9A84C, #e8c97a)",
                    color: "#1A1208",
                    fontWeight: 700,
                    fontSize: "0.78rem",
                    textDecoration: "none",
                    letterSpacing: "0.03em",
                    minHeight: 40,
                  }}
                >
                  <Navigation size={12} /> {t.openInMaps}
                </a>
                <a
                  href={weddingConfig.ceremony.openAppleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 transition-all duration-300 hover:opacity-80 active:scale-95"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "9px 16px",
                    borderRadius: 50,
                    background: "rgba(253,246,236,0.95)",
                    border: `1.5px solid ${GOLD}`,
                    color: "#78350f",
                    fontWeight: 700,
                    fontSize: "0.78rem",
                    textDecoration: "none",
                    letterSpacing: "0.03em",
                    minHeight: 40,
                  }}
                >
                  <Apple size={12} /> {t.appleMaps}
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Travel note */}
        <AnimatedSection direction="fade" delay={0.1} className="w-full max-w-2xl mt-12 md:mt-16">
          <div
            className="text-center px-6 py-8 md:px-10 md:py-10 rounded-3xl"
            style={{
              background: "rgba(255,255,255,0.4)",
              border: "1px solid rgba(255,255,255,0.7)",
              backdropFilter: "blur(12px)",
            }}
          >
            <h3
              className="text-2xl md:text-3xl mb-3"
              style={{ fontFamily: "'Great Vibes', cursive", color: THEME }}
            >
              {t.travel}
            </h3>
            <p
              className="text-sm md:text-[0.95rem] font-light leading-relaxed"
              style={{ color: THEME, opacity: 0.85, fontFamily: "'Montserrat', sans-serif" }}
            >
              {t.travelBody}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}