"use client";

import { weddingConfig } from "@/lib/wedding-config";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useWedding } from "@/components/providers/WeddingContext";

const TEXTS = {
  EN: {
    line1: "We request the pleasure of your company",
    line2: "To celebrate our wedding on",
    month: "August",
    weekday: "Sunday",
    held: "To be held at",
  },
  IT: {
    line1: "Con il piacere della vostra compagnia",
    line2: "Celebriamo il nostro matrimonio il",
    month: "Agosto",
    weekday: "Domenica",
    held: "Presso",
  },
};

export default function FormalInvitation() {
  const { language } = useWedding();
  const t = TEXTS[language as keyof typeof TEXTS] ?? TEXTS.EN;

  return (
    <section
      data-section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white py-20"
    >
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/invitation-card.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.22,
        }}
      />

      <AnimatedSection direction="fade" className="z-10 w-full max-w-4xl mx-auto px-6">
        <div className="text-center flex flex-col items-center gap-6 md:gap-10">
          <div className="flex flex-col gap-2">
            <p
              className="text-base md:text-xl lg:text-2xl uppercase tracking-[0.3em] font-semibold"
              style={{ fontFamily: "'Montserrat', sans-serif", color: "#2C3E35" }}
            >
              {t.line1}
            </p>
            <p
              className="text-base md:text-xl lg:text-2xl uppercase tracking-[0.3em] font-semibold"
              style={{ fontFamily: "'Montserrat', sans-serif", color: "#2C3E35" }}
            >
              {t.line2}
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 md:gap-8 my-4">
            <div className="flex flex-col items-center">
              <div className="h-[1.5px] w-16 md:w-24 mb-2" style={{ background: "rgba(44,62,53,0.7)" }} />
              <span
                className="text-2xl md:text-4xl uppercase tracking-[0.2em] font-serif"
                style={{ color: "#2C3E35" }}
              >
                {t.month}
              </span>
              <div className="h-[1.5px] w-16 md:w-24 mt-2" style={{ background: "rgba(44,62,53,0.7)" }} />
            </div>

            <span
              className="text-7xl md:text-9xl lg:text-[11rem] font-serif leading-none"
              style={{ color: "#2C3E35" }}
            >
              16
            </span>

            <div className="flex flex-col items-center">
              <div className="h-[1.5px] w-16 md:w-24 mb-2" style={{ background: "rgba(44,62,53,0.7)" }} />
              <span
                className="text-2xl md:text-4xl uppercase tracking-[0.2em] font-serif"
                style={{ color: "#2C3E35" }}
              >
                2026
              </span>
              <div className="h-[1.5px] w-16 md:w-24 mt-2" style={{ background: "rgba(44,62,53,0.7)" }} />
            </div>
          </div>

          <p
            className="text-2xl md:text-4xl uppercase tracking-[0.4em] font-serif mb-6"
            style={{ color: "#2C3E35" }}
          >
            {t.weekday}
          </p>

          <div className="flex flex-col gap-4">
            <p
              className="text-base md:text-xl lg:text-2xl uppercase tracking-[0.3em] font-semibold"
              style={{ fontFamily: "'Montserrat', sans-serif", color: "#2C3E35" }}
            >
              {t.held}
            </p>
            <p
              className="text-2xl md:text-3xl font-serif italic"
              style={{ fontFamily: "'Great Vibes', cursive", color: "#7A8B80" }}
            >
              {weddingConfig.ceremony.name}
            </p>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}