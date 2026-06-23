"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Send, Check, AlertCircle, Loader2, Users } from "lucide-react";

const THEME = "#2C3E35";
const BORDER = "#E3DFD5";

interface LocalFormState {
  fullName: string;
  email: string;
  attending: boolean | null;
  events: string[];
  guests: number;
  children: boolean | null;
  numChildren: number;
  childrenDetails: { name: string; diet: string }[];
  message: string;
}

const INITIAL: LocalFormState = {
  fullName: "",
  email: "",
  attending: null,
  events: [],
  guests: 1,
  children: null,
  numChildren: 0,
  childrenDetails: [],
  message: "",
};

const inputBase: React.CSSProperties = {
  width: "100%",
  borderRadius: 8,
  padding: "14px 18px",
  fontSize: "0.85rem",
  color: THEME,
  border: `1px solid ${BORDER}`,
  background: "transparent",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "'Playfair Display', serif",
  transition: "border-color 0.2s",
};

export default function RSVPForm() {
  const [form, setForm] = useState<LocalFormState>(INITIAL);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const txt = {
    title: "Rsvp",
    deadline: "THE FAVOUR OF A REPLY IS KINDLY REQUESTED BY THE FIFTEENTH OF JUNE, 2026",
    fullName: "Full name",
    email: "Email address",
    attendLabel: "Will you be joining us? *",
    attendYes: "Delighted to accept",
    attendNo: "Regretfully unable to attend",
    eventsLabel: "Which events will you be attending? *",
    event1: "Welcome Cruise - 15th August",
    event2: "Wedding Ceremony & Reception - 16th August",
    guestsLabel: "Number of guests in your party",
    principalLabel: "Principal guest",
    childrenLabel: "Will any children be accompanying you?",
    childrenYes: "Yes",
    childrenNo: "No",
    msgLabel: "A message for the couple",
    msgPh: "We should be delighted to hear from you.",
    sending: "SENDING...",
    send: "SUBMIT RESPONSE",
    successTitle: "Thank You!",
    successBody: "Your response has been received. We look forward to celebrating with you! 🥂",
    errName: "Please enter your full name.",
    errAttend: "Please let us know if you'll be attending.",
    errGeneric: "Failed to submit. Please try again.",
  };

  const handleEventToggle = (event: string) => {
    setForm((prev) => {
      const exists = prev.events.includes(event);
      if (exists) return { ...prev, events: prev.events.filter((e) => e !== event) };
      return { ...prev, events: [...prev.events, event] };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim()) {
      setErrorMsg(txt.errName);
      return;
    }
    if (form.attending === null) {
      setErrorMsg(txt.errAttend);
      return;
    }
    setErrorMsg("");
    setStatus("loading");

    const apiPayload = {
      guest_name: form.fullName,
      email: form.email,
      attending: form.attending,
      events: form.events,
      num_guests: form.guests,
      children: form.children,
      children_details: form.childrenDetails,
      meal_preference: "",
      message: form.message,
    };

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiPayload),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Something went wrong");
      }
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : txt.errGeneric);
    }
  };

  return (
    <section
      data-section
      className="relative flex flex-col items-center bg-transparent"
      style={{
        paddingTop: "clamp(6rem, 10vw, 8rem)",
        paddingBottom: "clamp(8rem, 12vw, 10rem)",
        overflow: "hidden",
      }}
    >
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 relative flex flex-col items-center">
        
        {/* Header */}
        <AnimatedSection direction="fade" className="text-center mb-12 sm:mb-16 flex flex-col items-center w-full">
          <h2
            style={{
              fontFamily: "'Great Vibes', cursive",
              color: THEME,
              fontSize: "clamp(4rem, 10vw, 6.5rem)",
              lineHeight: 1,
            }}
          >
            {txt.title}
          </h2>
          <p
            className="uppercase tracking-[0.25em] sm:tracking-[0.35em] mt-6 sm:mt-8 max-w-2xl mx-auto leading-relaxed px-4"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              color: THEME,
              opacity: 0.6,
              fontSize: "clamp(8px, 0.9vw, 11px)",
              fontWeight: 500,
            }}
          >
            {txt.deadline}
          </p>
        </AnimatedSection>

        {/* Form Container */}
        <div className="w-full max-w-2xl mx-auto relative z-10">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full flex flex-col items-center text-center py-20"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-8"
                  style={{ background: "rgba(61,90,91,0.1)" }}
                >
                  <Check size={32} color={THEME} strokeWidth={1.5} />
                </motion.div>
                <h3
                  style={{
                    fontFamily: "'Great Vibes', cursive",
                    color: THEME,
                    fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
                    marginBottom: "1rem",
                  }}
                >
                  {txt.successTitle}
                </h3>
                <p
                  className="leading-relaxed max-w-sm"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: THEME,
                    opacity: 0.8,
                    fontSize: "clamp(1rem, 1.2vw, 1.1rem)",
                  }}
                >
                  {txt.successBody}
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full flex flex-col gap-10 sm:gap-12 relative z-20"
              >
                {/* Attendance */}
                <div className="flex flex-col gap-5">
                  <h3 className="text-base sm:text-lg text-[#2C3E35] font-serif">{txt.attendLabel}</h3>
                  <label className="flex items-center gap-4 cursor-pointer group w-fit">
                    <input
                      type="radio"
                      checked={form.attending === true}
                      onChange={() => setForm({ ...form, attending: true })}
                      className="w-4 h-4 accent-[#3D5046] cursor-pointer bg-transparent"
                    />
                    <span className="text-[#2C3E35] font-serif text-xs sm:text-sm opacity-85 group-hover:opacity-100 transition-opacity">
                      {txt.attendYes}
                    </span>
                  </label>
                  <label className="flex items-center gap-4 cursor-pointer group w-fit">
                    <input
                      type="radio"
                      checked={form.attending === false}
                      onChange={() => setForm({ ...form, attending: false })}
                      className="w-4 h-4 accent-[#3D5046] cursor-pointer bg-transparent"
                    />
                    <span className="text-[#2C3E35] font-serif text-xs sm:text-sm opacity-85 group-hover:opacity-100 transition-opacity">
                      {txt.attendNo}
                    </span>
                  </label>
                </div>

                {/* Events */}
                <div className="flex flex-col gap-5">
                  <h3 className="text-base sm:text-lg text-[#2C3E35] font-serif">{txt.eventsLabel}</h3>
                  <label className="flex items-center gap-4 cursor-pointer group w-fit">
                    <input
                      type="checkbox"
                      checked={form.events.includes(txt.event1)}
                      onChange={() => handleEventToggle(txt.event1)}
                      className="w-4 h-4 accent-[#3D5046] cursor-pointer bg-transparent"
                    />
                    <span className="text-[#2C3E35] font-serif text-xs sm:text-sm opacity-85 group-hover:opacity-100 transition-opacity">
                      {txt.event1}
                    </span>
                  </label>
                  <label className="flex items-center gap-4 cursor-pointer group w-fit">
                    <input
                      type="checkbox"
                      checked={form.events.includes(txt.event2)}
                      onChange={() => handleEventToggle(txt.event2)}
                      className="w-4 h-4 accent-[#3D5046] cursor-pointer bg-transparent"
                    />
                    <span className="text-[#2C3E35] font-serif text-xs sm:text-sm opacity-85 group-hover:opacity-100 transition-opacity">
                      {txt.event2}
                    </span>
                  </label>
                </div>

                {/* Guests */}
                <div className="flex flex-col gap-5">
                  <h3 className="text-base sm:text-lg text-[#2C3E35] font-serif flex items-center gap-3">
                    <Users size={16} className="opacity-60" /> {txt.guestsLabel}
                  </h3>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, guests: Math.max(1, form.guests - 1) })}
                      className="w-12 h-12 border border-[#E3DFD5] rounded-xl flex items-center justify-center text-[#2C3E35] hover:bg-[#2C3E35] hover:text-[#F8F6F0] transition-colors"
                    >
                      -
                    </button>
                    <span className="font-serif text-[#2C3E35] text-lg w-8 text-center">{form.guests}</span>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, guests: form.guests + 1 })}
                      className="w-12 h-12 border border-[#E3DFD5] rounded-xl flex items-center justify-center text-[#2C3E35] hover:bg-[#2C3E35] hover:text-[#F8F6F0] transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Principal Guest */}
                <div className="flex flex-col gap-5">
                  <h3 className="text-base sm:text-lg text-[#2C3E35] font-serif">{txt.principalLabel}</h3>
                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      placeholder={txt.fullName}
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      style={inputBase}
                    />
                    <input
                      type="email"
                      placeholder={txt.email}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      style={inputBase}
                    />
                  </div>
                </div>

                {/* Children */}
                <div className="flex flex-col gap-5">
                  <h3 className="text-base sm:text-lg text-[#2C3E35] font-serif">{txt.childrenLabel}</h3>
                  <label className="flex items-center gap-4 cursor-pointer group w-fit">
                    <input
                      type="radio"
                      checked={form.children === true}
                      onChange={() => setForm((f) => ({ ...f, children: true, numChildren: Math.max(1, f.numChildren || 0), childrenDetails: (f.childrenDetails || []).length === 0 ? [{name: '', diet: ''}] : f.childrenDetails }))}
                      className="w-4 h-4 accent-[#3D5046] cursor-pointer bg-transparent"
                    />
                    <span className="text-[#2C3E35] font-serif text-xs sm:text-sm opacity-85 group-hover:opacity-100 transition-opacity">
                      {txt.childrenYes}
                    </span>
                  </label>
                  <label className="flex items-center gap-4 cursor-pointer group w-fit">
                    <input
                      type="radio"
                      checked={form.children === false}
                      onChange={() => setForm({ ...form, children: false })}
                      className="w-4 h-4 accent-[#3D5046] cursor-pointer bg-transparent"
                    />
                    <span className="text-[#2C3E35] font-serif text-xs sm:text-sm opacity-85 group-hover:opacity-100 transition-opacity">
                      {txt.childrenNo}
                    </span>
                  </label>
                </div>

                <AnimatePresence>
                  {form.children === true && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="flex flex-col gap-8 overflow-hidden"
                    >
                      <div className="flex flex-col gap-3">
                        <span className="text-sm text-[#2C3E35] font-serif opacity-70">Number of children</span>
                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            onClick={() => {
                              const num = Math.max(1, (form.numChildren || 0) - 1);
                              setForm((f) => ({ ...f, numChildren: num, childrenDetails: (f.childrenDetails || []).slice(0, num) }));
                            }}
                            className="w-10 h-10 border border-[#E3DFD5] rounded-xl flex items-center justify-center text-[#2C3E35] hover:bg-[#2C3E35] hover:text-[#F8F6F0] transition-colors"
                          >
                            -
                          </button>
                          <span className="font-serif text-[#2C3E35] text-lg w-8 text-center">{form.numChildren || 0}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const num = (form.numChildren || 0) + 1;
                              setForm((f) => ({ ...f, numChildren: num, childrenDetails: [...(f.childrenDetails || []), {name: '', diet: ''}] }));
                            }}
                            className="w-10 h-10 border border-[#E3DFD5] rounded-xl flex items-center justify-center text-[#2C3E35] hover:bg-[#2C3E35] hover:text-[#F8F6F0] transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col gap-6">
                        {(form.childrenDetails || []).map((child, idx) => (
                          <div key={idx} className="flex flex-col gap-3">
                            <h4 className="text-sm font-serif text-[#2C3E35] font-semibold">Child {idx + 1}</h4>
                            <input
                              type="text"
                              placeholder="Child's name"
                              value={child.name}
                              onChange={(e) => {
                                const newDetails = [...(form.childrenDetails || [])];
                                newDetails[idx].name = e.target.value;
                                setForm({ ...form, childrenDetails: newDetails });
                              }}
                              style={inputBase}
                            />
                            <input
                              type="text"
                              placeholder="Dietary requirements"
                              value={child.diet}
                              onChange={(e) => {
                                const newDetails = [...(form.childrenDetails || [])];
                                newDetails[idx].diet = e.target.value;
                                setForm({ ...form, childrenDetails: newDetails });
                              }}
                              style={inputBase}
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Message */}
                <div className="flex flex-col gap-5 relative z-30">
                  <h3 className="text-base sm:text-lg text-[#2C3E35] font-serif">{txt.msgLabel}</h3>
                  <textarea
                    placeholder={txt.msgPh}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{ ...inputBase, minHeight: 140, resize: "none" }}
                  />
                </div>

                {errorMsg && (
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#fef2f2] border border-[#fecaca] text-[#b91c1c] text-sm">
                    <AlertCircle size={16} /> {errorMsg}
                  </div>
                )}

                <div className="w-full flex justify-center mt-6 relative z-40">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    style={{
                      width: "100%",
                      maxWidth: "420px",
                      padding: "16px 24px",
                      borderRadius: 50,
                      fontFamily: "'Montserrat', sans-serif",
                      background: status === "loading" ? "rgba(61,90,91,0.55)" : "#3D5046",
                      color: "#F8F6F0",
                      fontWeight: 600,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      border: "none",
                      cursor: status === "loading" ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                      transition: "all 0.3s",
                      fontSize: "0.75rem",
                      boxShadow: "0 8px 32px rgba(61,90,91,0.2)",
                    }}
                    className="hover:scale-[1.01] active:scale-[0.99] mx-auto"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> {txt.sending}
                      </>
                    ) : (
                      <>
                        <Send size={15} /> {txt.send}
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* FLORAL COLUMNS - ALIGNED TO EXTREME EDGES */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            animate={{ rotate: [-1.5, 1.5, -1.5] }}
            transition={{ rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" } }}
            className="absolute z-20 pointer-events-none origin-bottom-left"
            style={{ 
              width: "clamp(100px, 12vw, 150px)",
              left: "clamp(-40px, -11vw, -130px)",
              bottom: "clamp(-80px, -15vw, -160px)"
            }}
          >
            <img src="/vase-left-DfaX_fU4.png" alt="" className="w-full h-auto drop-shadow-xl opacity-90" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            animate={{ rotate: [1.5, -1.5, 1.5] }}
            transition={{ rotate: { duration: 11, repeat: Infinity, ease: "easeInOut" } }}
            className="absolute z-20 pointer-events-none origin-bottom-right"
            style={{ 
              width: "clamp(100px, 12vw, 150px)",
              right: "clamp(-40px, -11vw, -130px)",
              bottom: "clamp(-80px, -15vw, -160px)"
            }}
          >
            <img src="/vase-right-BfgTPz8l.png" alt="" className="w-full h-auto drop-shadow-xl opacity-90" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}