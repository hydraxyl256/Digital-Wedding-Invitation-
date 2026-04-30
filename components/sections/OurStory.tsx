"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import { weddingConfig } from "@/lib/wedding-config";
import { Sparkles } from "lucide-react";

function TextBlock({ title, text }: { title: string; text: string }) {
  return (
    <div style={{ width: "100%", maxWidth: 300, flexShrink: 0 }}>
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", color: "#78350f", marginBottom: 14, lineHeight: 1.3 }}>
        {title}
      </h3>
      <p style={{ color: "rgba(120,53,15,0.7)", lineHeight: 1.8, fontSize: "0.9rem" }}>{text}</p>
    </div>
  );
}

function ImageBlock() {
  return (
    <div style={{ width: "100%", maxWidth: 300, aspectRatio: "4/3", borderRadius: 20, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #F2D4D7, #F7E7CE)", boxShadow: "0 16px 48px rgba(0,0,0,0.09)", flexShrink: 0 }}>
      <span style={{ fontSize: 64 }}>💑</span>
    </div>
  );
}

export default function OurStory() {
  return (
    <section data-section style={{ background: "linear-gradient(180deg, #FDF6EC 0%, #F7E7CE 100%)" }} className="relative overflow-hidden">
      <div style={{ maxWidth: 1024, margin: "0 auto", width: "100%", padding: "80px 20px" }}>

        {/* Heading */}
        <AnimatedSection direction="fade" className="w-full">
          <div style={{ textAlign: "center", marginBottom: 64, width: "100%" }}>
            <p className="text-amber-600" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.5em", marginBottom: 16 }}>A journey of love</p>
            <h2 className="text-amber-900" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 6vw, 4.5rem)", fontWeight: 700, marginBottom: 20 }}>Our Story</h2>
            <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center" }}>
              <div style={{ height: 1, width: 64, background: "linear-gradient(90deg, transparent, #C9A84C)" }} />
              <Sparkles size={14} className="text-amber-400" />
              <div style={{ height: 1, width: 64, background: "linear-gradient(270deg, transparent, #C9A84C)" }} />
            </div>
          </div>
        </AnimatedSection>

        {/* Story items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 60 }}>
          {weddingConfig.story.map((item, i) => {
            const isImageLeft = i % 2 === 0;
            return (
              <AnimatedSection key={item.year} direction={isImageLeft ? "left" : "right"} delay={0.08 * i} className="w-full">

                {/* Mobile: stacked */}
                <div className="md:hidden" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
                  <div style={{ width: 52, height: 52, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #C9A84C, #e8c97a)", border: "2px solid rgba(201,168,76,0.4)", flexShrink: 0 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#78350f" }}>{item.year}</span>
                  </div>
                  <div style={{ width: "100%", maxWidth: 340, aspectRatio: "4/3", borderRadius: 16, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #F2D4D7, #F7E7CE)" }}>
                    <span style={{ fontSize: 56 }}>💑</span>
                  </div>
                  <div style={{ textAlign: "center", maxWidth: 340, padding: "0 4px" }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.35rem", color: "#78350f", marginBottom: 10 }}>{item.title}</h3>
                    <p style={{ color: "rgba(120,53,15,0.7)", lineHeight: 1.8, fontSize: "0.875rem" }}>{item.text}</p>
                  </div>
                </div>

                {/* Desktop: 3-col grid */}
                <div className="hidden md:grid" style={{ gridTemplateColumns: "1fr 80px 1fr", alignItems: "center", width: "100%" }}>
                  <div style={{ minWidth: 0, display: "flex", justifyContent: "flex-end", paddingRight: 32 }}>
                    {isImageLeft ? <ImageBlock /> : <TextBlock title={item.title} text={item.text} />}
                  </div>
                  <div style={{ minWidth: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", minHeight: 220 }}>
                    {i > 0 && <div style={{ position: "absolute", top: 0, bottom: "50%", width: 1, background: "linear-gradient(180deg, rgba(201,168,76,0.4), #C9A84C)" }} />}
                    {i < weddingConfig.story.length - 1 && <div style={{ position: "absolute", top: "50%", bottom: 0, width: 1, background: "linear-gradient(180deg, #C9A84C, rgba(201,168,76,0.4))" }} />}
                    <div style={{ position: "relative", zIndex: 10, width: 52, height: 52, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #C9A84C, #e8c97a)", border: "2px solid rgba(253,246,236,0.8)", boxShadow: "0 0 20px rgba(201,168,76,0.35)", flexShrink: 0 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#78350f", textAlign: "center" }}>{item.year}</span>
                    </div>
                  </div>
                  <div style={{ minWidth: 0, display: "flex", justifyContent: "flex-start", paddingLeft: 32 }}>
                    {isImageLeft ? <TextBlock title={item.title} text={item.text} /> : <ImageBlock />}
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
