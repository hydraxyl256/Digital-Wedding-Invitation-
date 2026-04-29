"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import { weddingConfig } from "@/lib/wedding-config";
import { Calendar, Clock, MapPin, Shirt, Download, Gem, Wine } from "lucide-react";
import { generateICS, downloadICS } from "@/lib/utils";

// Premium icon badge — replaces emoji
function IconBadge({ icon, color }: { icon: React.ReactNode; color: string }) {
  return (
    <div
      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 flex-shrink-0"
      style={{
        background: color,
        boxShadow: "0 8px 24px rgba(201,168,76,0.25)",
      }}
    >
      {icon}
    </div>
  );
}

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-amber-500 flex-shrink-0">{icon}</span>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-amber-500 mb-0.5 font-semibold">{label}</p>
        <p className="text-amber-900 font-medium text-sm leading-snug">{value}</p>
      </div>
    </div>
  );
}

export default function EventDetails() {
  const handleAddToCalendar = () => {
    const start = weddingConfig.weddingDate;
    const end = new Date(start.getTime() + 4 * 60 * 60 * 1000);
    const ics = generateICS({
      title: `Wedding of ${weddingConfig.coupleNames}`,
      startDate: start,
      endDate: end,
      location: weddingConfig.ceremony.address,
      description: `Join us for the wedding celebration of ${weddingConfig.coupleNames}`,
    });
    downloadICS(ics, "wedding.ics");
  };

  return (
    <section
      data-section
      style={{ background: "linear-gradient(180deg, #F7E7CE 0%, #FDF6EC 100%)" }}
      className="relative overflow-hidden"
    >
      <div style={{ maxWidth: 1024, margin: "0 auto", width: "100%", padding: "112px 24px" }}>

        {/* ── Heading ── */}
        <AnimatedSection direction="fade" className="w-full">
          <div style={{ textAlign: "center", marginBottom: 80, width: "100%" }}>
            <p className="text-xs uppercase text-amber-600 mb-5" style={{ letterSpacing: "0.5em" }}>
              Save the date
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
              Event Details
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center" }}>
              <div style={{ height: 1, width: 64, background: "linear-gradient(90deg, transparent, #C9A84C)" }} />
              <span style={{ color: "#C9A84C" }}>✦</span>
              <div style={{ height: 1, width: 64, background: "linear-gradient(270deg, transparent, #C9A84C)" }} />
            </div>
          </div>
        </AnimatedSection>

        {/* ── Cards ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
            marginBottom: 48,
          }}
        >
          {/* Ceremony */}
          <AnimatedSection direction="up" delay={0} className="w-full">
            <div
              style={{
                width: "100%",
                borderRadius: 24,
                padding: "40px 36px",
                background: "rgba(253,246,236,0.85)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.6)",
                boxShadow: "0 8px 32px rgba(201,168,76,0.1)",
              }}
            >
              <IconBadge
                color="linear-gradient(135deg, #C9A84C, #e8c97a)"
                icon={<Gem size={24} className="text-white" strokeWidth={1.5} />}
              />
              <h3
                className="text-amber-900 mb-7"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 600 }}
              >
                Ceremony
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <DetailRow icon={<Calendar size={14} />} label="Date"    value={weddingConfig.weddingDateFormatted} />
                <DetailRow icon={<Clock size={14} />}    label="Time"    value={weddingConfig.ceremony.time} />
                <DetailRow icon={<MapPin size={14} />}   label="Venue"   value={weddingConfig.ceremony.name} />
                <DetailRow icon={<MapPin size={14} />}   label="Address" value={weddingConfig.ceremony.address} />
              </div>
            </div>
          </AnimatedSection>

          {/* Reception */}
          <AnimatedSection direction="up" delay={0.12} className="w-full">
            <div
              style={{
                width: "100%",
                borderRadius: 24,
                padding: "40px 36px",
                background: "rgba(253,246,236,0.85)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.6)",
                boxShadow: "0 8px 32px rgba(201,168,76,0.1)",
              }}
            >
              <IconBadge
                color="linear-gradient(135deg, #b8903d, #C9A84C)"
                icon={<Wine size={24} className="text-white" strokeWidth={1.5} />}
              />
              <h3
                className="text-amber-900 mb-7"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 600 }}
              >
                Reception
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <DetailRow icon={<Calendar size={14} />} label="Date"       value={weddingConfig.weddingDateFormatted} />
                <DetailRow icon={<Clock size={14} />}    label="Time"       value={weddingConfig.reception.time} />
                <DetailRow icon={<MapPin size={14} />}   label="Venue"      value={weddingConfig.reception.name} />
                <DetailRow icon={<Shirt size={14} />}    label="Dress Code" value={weddingConfig.reception.dressCode} />
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* ── Add to Calendar ── */}
        <AnimatedSection direction="up" delay={0.25} className="w-full">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              onClick={handleAddToCalendar}
              className="flex items-center gap-2.5 hover:scale-105 transition-all duration-300"
              style={{
                padding: "14px 32px",
                borderRadius: 50,
                background: "rgba(253,246,236,0.9)",
                border: "2px solid #C9A84C",
                color: "#78350f",
                fontWeight: 600,
                fontSize: "0.875rem",
                letterSpacing: "0.05em",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Download size={15} />
              Add to Calendar
            </button>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}
