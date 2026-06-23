"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import { weddingConfig } from "@/lib/wedding-config";
import { Calendar, Clock, MapPin, Shirt, Download, Gem, Wine } from "lucide-react";
import { generateICS, downloadICS } from "@/lib/utils";
import { motion } from "framer-motion";

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
      <span className="mt-0.5 text-[#7A8B80] flex-shrink-0">{icon}</span>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-[#7A8B80] mb-0.5 font-semibold">{label}</p>
        <p className="text-[#2C3E35] font-medium text-sm leading-snug">{value}</p>
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
      style={{ background: "linear-gradient(180deg, #F8F6F0 0%, #F8F6F0 100%)" }}
      className="relative overflow-hidden"
    >
      {/* FLORAL COLUMNS */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: -80, opacity: 1 }}
        animate={{ rotate: [-1.5, 1.5, -1.5] }}
        transition={{
          x: { duration: 2, ease: "easeOut" },
          rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute left-0 top-0 bottom-0 z-0 origin-top-left hidden sm:block"
        style={{ opacity: 0.5 }}
      >
        <img src="/column-left.png" alt="" className="h-full w-auto object-contain object-left pointer-events-none select-none" style={{ maxWidth: "350px" }} />
      </motion.div>

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 80, opacity: 1 }}
        animate={{ rotate: [1.5, -1.5, 1.5] }}
        transition={{
          x: { duration: 2, ease: "easeOut" },
          rotate: { duration: 11, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute right-0 top-0 bottom-0 z-0 origin-top-right hidden sm:block"
        style={{ opacity: 0.5 }}
      >
        <img src="/column-right.png" alt="" className="h-full w-auto object-contain object-right pointer-events-none select-none" style={{ maxWidth: "350px" }} />
      </motion.div>

      {/* Mobile Floral Accents */}
      <motion.div
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 -left-16 w-40 sm:hidden pointer-events-none origin-top-left z-0"
        style={{ opacity: 0.5 }}
      >
        <img src="/column-left.png" alt="" className="w-full h-auto" />
      </motion.div>
      <motion.div
        animate={{ rotate: [2, -2, 2] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 -right-16 w-40 sm:hidden pointer-events-none origin-top-right z-0"
        style={{ opacity: 0.5 }}
      >
        <img src="/column-right.png" alt="" className="w-full h-auto" />
      </motion.div>

      <div style={{ maxWidth: 1024, margin: "0 auto", width: "100%", padding: "112px 24px" }} className="relative z-10">

        {/* ── Heading ── */}
        <AnimatedSection direction="fade" className="w-full">
          <div style={{ textAlign: "center", marginBottom: 80, width: "100%" }}>
            <p className="text-xs uppercase text-[#7A8B80] mb-5" style={{ letterSpacing: "0.5em" }}>
              Save the date
            </p>
            <h2
              className="text-[#2C3E35]"
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
              <div style={{ height: 1, width: 64, background: "linear-gradient(90deg, transparent, #2C3E35)" }} />
              <span style={{ color: "#7A8B80" }}>✦</span>
              <div style={{ height: 1, width: 64, background: "linear-gradient(270deg, transparent, #2C3E35)" }} />
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
                background: "#F1EFE9",
                backdropFilter: "blur(20px)",
                border: "1px solid #E3DFD5",
                boxShadow: "0 8px 32px rgba(44,62,53,0.1)",
              }}
            >
              <IconBadge
                color="linear-gradient(135deg, #7A8B80, #A1AFA6)"
                icon={<Gem size={24} className="text-white" strokeWidth={1.5} />}
              />
              <h3
                className="text-[#2C3E35] mb-7"
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
                background: "#F1EFE9",
                backdropFilter: "blur(20px)",
                border: "1px solid #E3DFD5",
                boxShadow: "0 8px 32px rgba(44,62,53,0.1)",
              }}
            >
              <IconBadge
                color="linear-gradient(135deg, #2C3E35, #4A5D54)"
                icon={<Wine size={24} className="text-white" strokeWidth={1.5} />}
              />
              <h3
                className="text-[#2C3E35] mb-7"
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

        {/* ── Actions ── */}
        <AnimatedSection direction="up" delay={0.25} className="w-full">
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <a
              href={weddingConfig.ceremony.openMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 hover:scale-105 transition-all duration-300"
              style={{
                padding: "14px 32px",
                borderRadius: 50,
                background: "#2C3E35",
                color: "#F8F6F0",
                fontWeight: 600,
                fontSize: "0.875rem",
                letterSpacing: "0.05em",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <MapPin size={15} />
              View Map
            </a>
            <button
              onClick={handleAddToCalendar}
              className="flex items-center gap-2.5 hover:scale-105 transition-all duration-300"
              style={{
                padding: "14px 32px",
                borderRadius: 50,
                background: "#F1EFE9",
                border: "2px solid #2C3E35",
                color: "#2C3E35",
                fontWeight: 600,
                fontSize: "0.875rem",
                letterSpacing: "0.05em",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
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
