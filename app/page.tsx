"use client";

import { useEffect, useRef } from "react";
import { useWedding } from "@/components/providers/WeddingContext";
import IntroOverlay from "@/components/sections/IntroOverlay";
import HeroSection from "@/components/sections/HeroSection";
import OurStory from "@/components/sections/OurStory";
import EventDetails from "@/components/sections/EventDetails";
import ScheduleTimeline from "@/components/sections/ScheduleTimeline";
import LocationMap from "@/components/sections/LocationMap";
import RSVPForm from "@/components/sections/RSVPForm";

import CountdownTimer from "@/components/sections/CountdownTimer";
import Footer from "@/components/sections/Footer";
import FloralDecoration from "@/components/ui/FloralDecoration";

export default function Home() {
  const { setActiveSection } = useWedding();

  useEffect(() => {
    const sections = document.querySelectorAll("[data-section]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Array.from(sections).indexOf(entry.target as Element);
            if (idx !== -1) setActiveSection(idx);
          }
        });
      },
      { threshold: 0.35 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [setActiveSection]);

  return (
    <>
      <IntroOverlay />
      <FloralDecoration />
      <main>
        <HeroSection />
        <OurStory />
        <EventDetails />
        <ScheduleTimeline />
        <LocationMap />
        <RSVPForm />

        <CountdownTimer />
        <Footer />
      </main>
    </>
  );
}
