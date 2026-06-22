"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { weddingConfig } from "@/lib/wedding-config";
import { Send, Check, AlertCircle, User, Users, MessageSquare, ChevronDown, Loader2 } from "lucide-react";
import { useWedding } from "@/components/providers/WeddingContext";

const THEME = "#3D5A5B";
const BG = "rgba(255,255,255,0.55)";
const BORDER = "rgba(61,90,91,0.18)";

interface FormState {
  guest_name: string;
  attending: boolean | null;
  num_guests: number;
  meal_preference: string;
  message: string;
}

const INITIAL: FormState = {
  guest_name: "",
  attending: null,
  num_guests: 1,
  meal_preference: "",
  message: "",
};

const inputBase: React.CSSProperties = {
  width: "100%",
  borderRadius: 16,
  padding: "14px 18px",
  fontSize: "0.95rem",
  color: THEME,
  border: `1px solid ${BORDER}`,
  background: "rgba(255,255,255,0.7)",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "'Montserrat', sans-serif",
  transition: "border-color 0.2s",
};

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[9px] md:text-[10px] uppercase tracking-[0.5em] font-bold mb-3"
      style={{ fontFamily: "'Montserrat', sans-serif", color: THEME, opacity: 0.65 }}
    >
      {children}
    </p>
  );
}

export default function RSVPForm() {
  const { language } = useWedding();
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const txt = {
    heading: language === "IT" ? "Verrai con noi?" : "Will you join us?",
    title: "RSVP",
    deadline: language === "IT" ? "Si prega di rispondere entro il " : "Kindly respond by ",
    deadlineDate: language === "IT" ? "1 Agosto 2026" : "August 1, 2026",
    fullName: language === "IT" ? "Nome completo" : "Full Name",
    namePh: language === "IT" ? "Il tuo nome" : "Your name",
    attend: language === "IT" ? "Parteciperai?" : "Will you attend?",
    yes: language === "IT" ? "Accetto con gioia" : "Joyfully Accepts",
    no: language === "IT" ? "Purtroppo declino" : "Regretfully Declines",
    guests: language === "IT" ? "Numero di ospiti" : "Number of Guests",
    meal: language === "IT" ? "Preferenza pasto" : "Meal Preference",
    selectMeal: language === "IT" ? "Seleziona un'opzione" : "Select a meal option",
    message: language === "IT" ? "Messaggio" : "Message",
    messageOpt: language === "IT" ? "(facoltativo)" : "(optional)",
    messagePh: language === "IT" ? "Condividi i tuoi auguri..." : "Share your wishes for the couple...",
    sending: language === "IT" ? "Invio..." : "Sending...",
    send: language === "IT" ? "Invia RSVP" : "Send RSVP",
    successTitle: language === "IT" ? "Grazie!" : "Thank You!",
    successBody:
      language === "IT"
        ? "La tua risposta è stata ricevuta. Non vediamo l'ora di festeggiare con te! 🥂"
        : "Your RSVP has been received. We can't wait to celebrate with you! 🥂",
    errName: language === "IT" ? "Per favore inserisci il tuo nome completo." : "Please enter your full name.",
    errAttend: language === "IT" ? "Per favore indica se parteciperai." : "Please let us know if you'll be attending.",
    errGeneric: language === "IT" ? "Invio fallito. Riprova." : "Failed to submit. Please try again.",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.guest_name.trim()) {
      setErrorMsg(txt.errName);
      return;
    }
    if (form.attending === null) {
      setErrorMsg(txt.errAttend);
      return;
    }
    setErrorMsg("");
    setStatus("loading");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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
      className="relative bg-[#f0f0e4] flex flex-col items-center"
      style={{ paddingTop: "6rem", paddingBottom: "8rem" }}
    >
      <div className="w-full max-w-xl mx-auto px-6 flex flex-col items-center">
        <AnimatedSection direction="fade" className="text-center mb-16 flex flex-col items-center gap-4">
          <p
            className="text-[9px] md:text-[10px] uppercase tracking-[0.7em] font-bold"
            style={{ fontFamily: "'Montserrat', sans-serif", color: THEME, opacity: 0.5 }}
          >
            {txt.heading}
          </p>
          <h2
            style={{ fontFamily: "'Great Vibes', cursive", color: THEME, fontSize: "clamp(3.5rem, 8vw, 5.5rem)" }}
          >
            {txt.title}
          </h2>
          <p
            className="text-[10px] uppercase tracking-[0.4em] font-medium"
            style={{ fontFamily: "'Montserrat', sans-serif", color: THEME, opacity: 0.65 }}
          >
            {txt.deadline}
            <span className="font-bold" style={{ opacity: 0.85 }}>
              {txt.deadlineDate}
            </span>
          </p>
        </AnimatedSection>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full flex flex-col items-center text-center"
              style={{
                background: BG,
                backdropFilter: "blur(16px)",
                borderRadius: 48,
                padding: "64px 40px",
                border: `1px solid ${BORDER}`,
              }}
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
                  fontSize: "2.8rem",
                  marginBottom: "1rem",
                }}
              >
                {txt.successTitle}
              </h3>
              <p
                className="text-sm leading-relaxed max-w-xs"
                style={{ fontFamily: "'Montserrat', sans-serif", color: THEME, opacity: 0.7 }}
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
              className="w-full"
            >
              <div
                style={{
                  background: BG,
                  backdropFilter: "blur(16px)",
                  borderRadius: 48,
                  padding: "52px 40px",
                  border: `1px solid ${BORDER}`,
                  display: "flex",
                  flexDirection: "column",
                  gap: "28px",
                }}
              >
                <div>
                  <Label>
                    <User size={10} style={{ display: "inline", marginRight: 6 }} />
                    {txt.fullName}
                  </Label>
                  <input
                    type="text"
                    placeholder={txt.namePh}
                    value={form.guest_name}
                    onChange={(e) => setForm({ ...form, guest_name: e.target.value })}
                    style={inputBase}
                  />
                </div>

                <div>
                  <Label>{txt.attend}</Label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {[
                      { val: true, label: txt.yes },
                      { val: false, label: txt.no },
                    ].map(({ val, label }) => (
                      <button
                        key={String(val)}
                        type="button"
                        onClick={() => setForm({ ...form, attending: val })}
                        style={{
                          padding: "14px 10px",
                          borderRadius: 16,
                          fontSize: "0.8rem",
                          fontWeight: 700,
                          cursor: "pointer",
                          transition: "all 0.2s",
                          fontFamily: "'Montserrat', sans-serif",
                          letterSpacing: "0.04em",
                          border: `1.5px solid ${form.attending === val ? THEME : BORDER}`,
                          background: form.attending === val ? THEME : "rgba(255,255,255,0.55)",
                          color: form.attending === val ? "white" : THEME,
                          minHeight: 48,
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <AnimatePresence>
                  {form.attending === true && (
                    <motion.div
                      key="extras"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      style={{ overflow: "hidden", display: "flex", flexDirection: "column", gap: 28 }}
                    >
                      <div>
                        <Label>
                          <Users size={10} style={{ display: "inline", marginRight: 6 }} />
                          {txt.guests}
                        </Label>
                        <div style={{ display: "flex", gap: 10 }}>
                          {[1, 2, 3, 4].map((n) => (
                            <button
                              key={n}
                              type="button"
                              onClick={() => setForm({ ...form, num_guests: n })}
                              style={{
                                width: 48,
                                height: 48,
                                borderRadius: "50%",
                                fontSize: "0.95rem",
                                fontWeight: 700,
                                cursor: "pointer",
                                transition: "all 0.2s",
                                border: `1.5px solid ${form.num_guests === n ? THEME : BORDER}`,
                                background:
                                  form.num_guests === n ? THEME : "rgba(255,255,255,0.55)",
                                color: form.num_guests === n ? "white" : THEME,
                              }}
                            >
                              {n}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label>{txt.meal}</Label>
                        <div style={{ position: "relative" }}>
                          <select
                            value={form.meal_preference}
                            onChange={(e) =>
                              setForm({ ...form, meal_preference: e.target.value })
                            }
                            style={{ ...inputBase, appearance: "none", paddingRight: 40 }}
                          >
                            <option value="">{txt.selectMeal}</option>
                            {weddingConfig.mealOptions.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                          <ChevronDown
                            size={13}
                            style={{
                              position: "absolute",
                              right: 14,
                              top: "50%",
                              transform: "translateY(-50%)",
                              color: THEME,
                              opacity: 0.5,
                              pointerEvents: "none",
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <Label>
                    <MessageSquare size={10} style={{ display: "inline", marginRight: 6 }} />
                    {txt.message}{" "}
                    <span
                      style={{
                        textTransform: "none",
                        letterSpacing: "normal",
                        fontWeight: 400,
                        opacity: 0.55,
                      }}
                    >
                      {txt.messageOpt}
                    </span>
                  </Label>
                  <textarea
                    rows={4}
                    placeholder={txt.messagePh}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{ ...inputBase, resize: "none" }}
                  />
                </div>

                {errorMsg && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "12px 16px",
                      borderRadius: 12,
                      background: "#fef2f2",
                      border: "1px solid #fecaca",
                      color: "#b91c1c",
                      fontSize: "0.85rem",
                    }}
                  >
                    <AlertCircle size={14} /> {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  style={{
                    width: "100%",
                    padding: "18px 24px",
                    borderRadius: 16,
                    fontFamily: "'Montserrat', sans-serif",
                    background: status === "loading" ? "rgba(61,90,91,0.55)" : THEME,
                    color: "white",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    border: "none",
                    cursor: status === "loading" ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    transition: "all 0.3s",
                    minHeight: 52,
                  }}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={15} className="animate-spin" /> {txt.sending}
                    </>
                  ) : (
                    <>
                      <Send size={14} /> {txt.send}
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}