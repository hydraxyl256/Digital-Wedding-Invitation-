"use client";
import IntroOverlay from "@/components/sections/IntroOverlay";
import HeroSection from "@/components/sections/HeroSection";
import Celebrations from "@/components/sections/Celebrations";
import ScheduleTimeline from "@/components/sections/ScheduleTimeline";
import DressCode from "@/components/sections/DressCode";
import WeddingGift from "@/components/sections/WeddingGift";
import RSVPForm from "@/components/sections/RSVPForm";
import CountdownTimer from "@/components/sections/CountdownTimer";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="flex flex-col">
      <IntroOverlay />
      <HeroSection />
      <CountdownTimer />
      <Celebrations />
      <ScheduleTimeline />
      <DressCode />
      <WeddingGift />
      <RSVPForm />
      <Footer />
    </main>
  );
}
