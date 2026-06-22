"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { weddingConfig } from "@/lib/wedding-config";
import { useWedding } from "@/components/providers/WeddingContext";
import { Landmark, Waves, Sparkles, Camera, MapPin, Navigation, Apple } from "lucide-react";

const THEME = "#3D5A5B";
const GOLD = "#C9A84C";

const ICONS: Record<string, React.ComponentType<{ size?: number; color?: string; strokeWidth?: number; className?: string }>> = {
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
        paddingTop: "clamp(5rem, 10vw, 10rem)",
        paddingBottom: "clamp(5rem, 10vw, 10rem)",
      }}
    >
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        <AnimatedSection
          direction="fade"
          className="text-center mb-10 sm:mb-12 md:mb-16 flex flex-col items-center gap-2 sm:gap-3"
        >
          <p
            className="uppercase tracking-[0.5em] sm:tracking-[0.6em] font-bold"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              color: THEME,
              opacity: 0.55,
              fontSize: "clamp(9px, 1vw, 12px)",
            }}
          >
            {t.eyebrow}
          </p>
          <h2
            style={{
              fontFamily: "'Great Vibes', cursive",
              color: THEME,
              fontSize: "clamp(2.8rem, 8vw, 6rem)",
              lineHeight: 1.1,
            }}
          >
            {t.title}
          </h2>
          <div className="flex items-center gap-2 sm:gap-3 w-full max-w-[220px] mt-1 sm:mt-2">
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
            className="font-serif italic max-w-2xl mt-1 sm:mt-2"
            style={{
              color: THEME,
              opacity: 0.85,
              fontSize: "clamp(0.95rem, 1.6vw, 1.2rem)",
            }}
          >
            {t.subtitle}
          </p>
        </AnimatedSection>

        {/* Body */}
        <AnimatedSection direction="up" delay={0.1} className="w-full max-w-3xl">
          <p
            className="text-center font-light leading-relaxed md:leading-loose"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              color: THEME,
              opacity: 0.85,
              fontSize: "clamp(0.85rem, 1.2vw, 1.05rem)",
            }}
          >
            {t.body}
          </p>
        </AnimatedSection>

        {/* Highlights */}
        <AnimatedSection
          direction="fade"
          delay={0.2}
          className="w-full mt-12 sm:mt-16 md:mt-20"
        >
          <h3
            className="text-center mb-6 sm:mb-8 md:mb-12"
            style={{
              fontFamily: "'Great Vibes', cursive",
              color: THEME,
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            }}
          >
            {t.highlights}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            {weddingConfig.venueHighlights.map((h, i) => {
              const Icon = ICONS[h.icon] ?? Sparkles;
              return (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.08 }}
                  className="bg-white/55 backdrop-blur-sm border border-white/70 rounded-[clamp(1.25rem,2.5vw,1.875rem)] flex items-start gap-3 sm:gap-4"
                  style={{
                    boxShadow: "0 8px 32px rgba(61,90,91,0.06)",
                    padding: "clamp(1.25rem, 2.5vw, 2rem)",
                  }}
                >
                  <div
                    className="rounded-2xl flex items-center justify-center shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #C9A84C, #e8c97a)",
                      boxShadow: "0 8px 20px rgba(201,168,76,0.3)",
                      width: "clamp(2.75rem, 4vw, 3.5rem)",
                      height: "clamp(2.75rem, 4vw, 3.5rem)",
                    }}
                  >
                    <Icon
                      size={22}
                      color="white"
                      strokeWidth={1.5}
                      className="sm:hidden"
                    />
                    <Icon
                      size={22}
                      color="white"
                      strokeWidth={1.5}
                      className="hidden sm:block"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-semibold mb-1 sm:mb-1.5"
                      style={{
                        color: THEME,
                        fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)",
                      }}
                    >
                      {h.title}
                    </p>
                    <p
                      className="leading-relaxed"
                      style={{
                        color: THEME,
                        opacity: 0.75,
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "clamp(0.8rem, 1.1vw, 0.95rem)",
                      }}
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
        <AnimatedSection
          direction="up"
          delay={0.1}
          className="w-full mt-12 sm:mt-16 md:mt-24"
        >
          <div
            className="relative w-full rounded-[clamp(1.25rem,2.5vw,1.875rem)] overflow-hidden"
            style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.12)" }}
          >
            <div
              className="w-full"
              style={{ height: "clamp(15rem, 35vw, 24rem)" }}
            >
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
                bottom: "clamp(0.75rem, 1.5vw, 1rem)",
                left: "50%",
                transform: "translateX(-50%)",
                width: "92%",
                maxWidth: 440,
                borderRadius: "clamp(0.875rem,1.5vw,1.25rem)",
                padding: "clamp(0.875rem, 1.6vw, 1.25rem) clamp(1rem, 1.8vw, 1.25rem)",
                background: "rgba(253,246,236,0.96)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.7)",
                boxShadow: "0 8px 32px rgba(201,168,76,0.25)",
              }}
            >
              <div className="flex items-start gap-2.5 sm:gap-3 mb-2.5 sm:mb-3">
                <div
                  className="rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #C9A84C, #e8c97a)",
                    width: "clamp(2rem, 3vw, 2.25rem)",
                    height: "clamp(2rem, 3vw, 2.25rem)",
                  }}
                >
                  <MapPin
                    size={14}
                    color="white"
                    className="sm:hidden"
                  />
                  <MapPin
                    size={16}
                    color="white"
                    className="hidden sm:block"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className="font-semibold mb-0.5"
                    style={{
                      color: "#78350f",
                      fontSize: "clamp(0.8rem, 1.1vw, 0.95rem)",
                    }}
                  >
                    {weddingConfig.ceremony.name}
                  </p>
                  <p
                    style={{
                      color: "rgba(120,53,15,0.78)",
                      fontSize: "clamp(0.7rem, 0.9vw, 0.8rem)",
                      lineHeight: 1.4,
                    }}
                  >
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
                    padding: "clamp(8px, 1vw, 10px) clamp(12px, 1.5vw, 16px)",
                    borderRadius: 50,
                    background: "linear-gradient(135deg, #C9A84C, #e8c97a)",
                    color: "#1A1208",
                    fontWeight: 700,
                    textDecoration: "none",
                    letterSpacing: "0.03em",
                    minHeight: 40,
                    fontSize: "clamp(0.7rem, 0.9vw, 0.8rem)",
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
                    padding: "clamp(8px, 1vw, 10px) clamp(12px, 1.5vw, 16px)",
                    borderRadius: 50,
                    background: "rgba(253,246,236,0.95)",
                    border: `1.5px solid ${GOLD}`,
                    color: "#78350f",
                    fontWeight: 700,
                    textDecoration: "none",
                    letterSpacing: "0.03em",
                    minHeight: 40,
                    fontSize: "clamp(0.7rem, 0.9vw, 0.8rem)",
                  }}
                >
                  <Apple size={12} /> {t.appleMaps}
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Travel note */}
        <AnimatedSection
          direction="fade"
          delay={0.1}
          className="w-full max-w-2xl mt-10 sm:mt-12 md:mt-16"
        >
          <div
            className="text-center rounded-[clamp(1.25rem,2.5vw,1.875rem)]"
            style={{
              background: "rgba(255,255,255,0.45)",
              border: "1px solid rgba(255,255,255,0.7)",
              backdropFilter: "blur(12px)",
              padding: "clamp(2rem, 4vw, 2.5rem) clamp(1.25rem, 4vw, 2.5rem)",
            }}
          >
            <h3
              className="mb-2 sm:mb-3"
              style={{
                fontFamily: "'Great Vibes', cursive",
                color: THEME,
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              }}
            >
              {t.travel}
            </h3>
            <p
              className="font-light leading-relaxed"
              style={{
                color: THEME,
                opacity: 0.85,
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "clamp(0.85rem, 1.1vw, 0.95rem)",
              }}
            >
              {t.travelBody}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}