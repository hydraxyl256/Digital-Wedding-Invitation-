"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import { weddingConfig } from "@/lib/wedding-config";
import { Sparkles } from "lucide-react";

function TextBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="w-full max-w-[340px] flex-shrink-0">
      <h3 className="text-[#2C3E35] mb-4" style={{ fontFamily: "'Great Vibes', cursive", fontSize: "clamp(2rem, 4vw, 3rem)" }}>
        {title}
      </h3>
      <p className="text-[#2C3E35]/60 leading-relaxed text-sm md:text-base font-light" style={{ fontFamily: "'Montserrat', sans-serif" }}>
        {text}
      </p>
    </div>
  );
}

function ImageBlock({ year }: { year: string }) {
  return (
    <div className="w-full max-w-[340px] aspect-[4/3] rounded-3xl overflow-hidden relative group">
      {/* Decorative floral background for the image placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F2D4D7]/40 to-[#F7E7CE]/40 backdrop-blur-[2px]" />
      <div className="absolute inset-0 flex items-center justify-center border border-[#2C3E35]/10 rounded-3xl m-3">
         <span className="text-[#2C3E35]/20 text-8xl md:text-9xl font-serif">{year.slice(-2)}</span>
      </div>
      {/* Abstract floral accent */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-transparent/40 blur-2xl rounded-full" />
    </div>
  );
}

export default function OurStory() {
  return (
    <section data-section className="relative overflow-hidden bg-transparent">
      {/* Subtle texture background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/linen.png')" }} />
      
      <div className="max-w-6xl mx-auto w-full px-6 py-24 md:py-32">

        {/* Heading */}
        <AnimatedSection direction="fade" className="w-full">
          <div className="text-center mb-20 md:mb-32">
            <p className="text-[#7A8B80]/60 text-xs md:text-sm uppercase tracking-[0.6em] mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Our Journey Together
            </p>
            <h2 className="text-[#2C3E35] text-6xl md:text-8xl lg:text-9xl mb-8" style={{ fontFamily: "'Great Vibes', cursive" }}>
              Our Story
            </h2>
            <div className="flex items-center gap-4 justify-center">
              <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-[#2C3E35]/30" />
              <Sparkles size={18} className="text-[#2C3E35]/80" />
              <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-[#2C3E35]/30" />
            </div>
          </div>
        </AnimatedSection>

        {/* Story items - Modern Layout */}
        <div className="flex flex-col gap-24 md:gap-40">
          {weddingConfig.story.map((item, i) => {
            const isImageLeft = i % 2 === 0;
            return (
              <AnimatedSection key={item.year} direction={isImageLeft ? "left" : "right"} delay={0.1 * i} className="w-full">

                {/* Mobile View */}
                <div className="md:hidden flex flex-col items-center gap-10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#2C3E35]/5 blur-xl rounded-full" />
                    <span className="relative z-10 text-[#2C3E35]/80 text-4xl font-serif tracking-widest">{item.year}</span>
                  </div>
                  <ImageBlock year={item.year} />
                  <TextBlock title={item.title} text={item.text} />
                </div>

                {/* Desktop View - 3-column timeline */}
                <div className="hidden md:grid grid-cols-[1fr_120px_1fr] items-center w-full">
                  
                  {/* Left Content */}
                  <div className={`flex ${isImageLeft ? 'justify-end pr-16' : 'justify-end pr-16'}`}>
                    {isImageLeft ? <ImageBlock year={item.year} /> : <TextBlock title={item.title} text={item.text} />}
                  </div>

                  {/* Center Year / Line */}
                  <div className="relative flex flex-col items-center justify-center min-h-[300px]">
                    <div className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#2C3E35]/20 to-transparent" />
                    <div className="relative z-10 w-16 h-16 rounded-full bg-transparent flex items-center justify-center border border-[#2C3E35]/10 shadow-sm">
                       <span className="text-[#2C3E35]/80 text-xs font-bold tracking-tighter uppercase">{item.year}</span>
                    </div>
                  </div>

                  {/* Right Content */}
                  <div className={`flex ${isImageLeft ? 'justify-start pl-16' : 'justify-start pl-16'}`}>
                    {isImageLeft ? <TextBlock title={item.title} text={item.text} /> : <ImageBlock year={item.year} />}
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
