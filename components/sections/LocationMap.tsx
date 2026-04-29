"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import { weddingConfig } from "@/lib/wedding-config";
import { MapPin, Navigation, Apple } from "lucide-react";

export default function LocationMap() {
  return (
    <section
      data-section
      style={{ background: "linear-gradient(180deg, #F2D4D7 0%, #F7E7CE 100%)" }}
      className="relative overflow-hidden"
    >
      <div style={{ maxWidth: 1024, margin: "0 auto", width: "100%", padding: "112px 24px" }}>

        {/* ── Heading ── */}
        <AnimatedSection direction="fade" className="w-full">
          <div style={{ textAlign: "center", marginBottom: 64, width: "100%" }}>
            <p
              className="text-amber-600"
              style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.5em", marginBottom: 20 }}
            >
              Find your way
            </p>
            <h2
              className="text-amber-900"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 700,
                marginBottom: 24,
              }}
            >
              Location
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center" }}>
              <div style={{ height: 1, width: 64, background: "linear-gradient(90deg, transparent, #C9A84C)" }} />
              <span style={{ color: "#C9A84C" }}>✦</span>
              <div style={{ height: 1, width: 64, background: "linear-gradient(270deg, transparent, #C9A84C)" }} />
            </div>
          </div>
        </AnimatedSection>

        {/* ── Map + overlay ── */}
        <AnimatedSection direction="up" delay={0.1} className="w-full">
          <div
            style={{
              position: "relative",
              borderRadius: 24,
              overflow: "hidden",
              boxShadow: "0 24px 64px rgba(0,0,0,0.12)",
              width: "100%",
            }}
          >
            {/* Iframe */}
            <div style={{ width: "100%", height: 460 }}>
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

            {/* Glassmorphism overlay card */}
            <div
              style={{
                position: "absolute",
                bottom: 24,
                left: "50%",
                transform: "translateX(-50%)",
                width: "90%",
                maxWidth: 420,
                borderRadius: 20,
                padding: "20px 24px",
                background: "rgba(253,246,236,0.92)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.6)",
                boxShadow: "0 8px 32px rgba(201,168,76,0.2)",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 16 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    background: "linear-gradient(135deg, #C9A84C, #e8c97a)",
                  }}
                >
                  <MapPin size={16} color="white" />
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: "#78350f", fontSize: "0.9rem", marginBottom: 2 }}>
                    {weddingConfig.ceremony.name}
                  </p>
                  <p style={{ color: "rgba(120,53,15,0.65)", fontSize: "0.8rem" }}>
                    {weddingConfig.ceremony.address}
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <a
                  href={weddingConfig.ceremony.openMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 16px",
                    borderRadius: 50,
                    background: "linear-gradient(135deg, #C9A84C, #e8c97a)",
                    color: "#1A1208",
                    fontWeight: 600,
                    fontSize: "0.78rem",
                    textDecoration: "none",
                    letterSpacing: "0.03em",
                  }}
                >
                  <Navigation size={12} />
                  Open in Google Maps
                </a>
                <a
                  href={weddingConfig.ceremony.openAppleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 16px",
                    borderRadius: 50,
                    background: "rgba(253,246,236,0.9)",
                    border: "1.5px solid #C9A84C",
                    color: "#78350f",
                    fontWeight: 600,
                    fontSize: "0.78rem",
                    textDecoration: "none",
                    letterSpacing: "0.03em",
                  }}
                >
                  <Apple size={12} />
                  Apple Maps
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}
