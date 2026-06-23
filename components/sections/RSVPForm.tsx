"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { weddingConfig } from "@/lib/wedding-config";
import { Send, Check, AlertCircle, User, Users, MessageSquare, ChevronDown, Loader2 } from "lucide-react";
import { useWedding } from "@/components/providers/WeddingContext";

const THEME = "#2C3E35";
const BG = "rgba(241, 239, 233, 0.9)";
const BORDER = "#E3DFD5";

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
  padding: "clamp(12px, 1.4vw, 16px) clamp(14px, 1.6vw, 18px)",
  fontSize: "clamp(0.9rem, 1.1vw, 0.95rem)",
  color: THEME,
  border: `1px solid ${BORDER}`,
  background: "rgba(255,255,255,0.7)",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "'Montserrat', sans-serif",
  transition: "border-color 0.2s",
  minHeight: 48,
};

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="uppercase tracking-[0.4em] sm:tracking-[0.5em] font-bold mb-2 sm:mb-3"
      style={{
        fontFamily: "'Montserrat', sans-serif",
        color: THEME,
        opacity: 0.65,
        fontSize: "clamp(8px, 0.85vw, 10px)",
      }}
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
      className="relative bg-transparent flex flex-col items-center"
      style={{
        paddingTop: "clamp(4rem, 6vw, 6rem)",
        paddingBottom: "clamp(5rem, 8vw, 8rem)",
      }}
    >
      <div className="w-full max-w-xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        <AnimatedSection
          direction="fade"
          className="text-center mb-12 sm:mb-14 md:mb-16 flex flex-col items-center gap-3 sm:gap-4"
        >
          <p
            className="uppercase tracking-[0.5em] sm:tracking-[0.7em] font-bold"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              color: THEME,
              opacity: 0.5,
              fontSize: "clamp(8px, 0.85vw, 10px)",
            }}
          >
            {txt.heading}
          </p>
          <h2
            style={{
              fontFamily: "'Great Vibes', cursive",
              color: THEME,
              fontSize: "clamp(3rem, 9vw, 5.5rem)",
              lineHeight: 1.1,
            }}
          >
            {txt.title}
          </h2>
          <p
            className="uppercase tracking-[0.3em] sm:tracking-[0.4em] font-medium"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              color: THEME,
              opacity: 0.65,
              fontSize: "clamp(9px, 0.95vw, 11px)",
            }}
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
                borderRadius: "clamp(1.5rem, 4vw, 3rem)",
                padding: "clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 4vw, 2.5rem)",
                border: `1px solid ${BORDER}`,
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-6 sm:mb-8"
                style={{ background: "rgba(61,90,91,0.1)" }}
              >
                <Check size={28} color={THEME} strokeWidth={1.5} />
              </motion.div>
              <h3
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  color: THEME,
                  fontSize: "clamp(2.2rem, 6vw, 2.8rem)",
                  marginBottom: "1rem",
                }}
              >
                {txt.successTitle}
              </h3>
              <p
                className="leading-relaxed max-w-xs"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  color: THEME,
                  opacity: 0.7,
                  fontSize: "clamp(0.85rem, 1.1vw, 0.95rem)",
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
              className="w-full"
            >
              <div
                style={{
                  background: BG,
                  backdropFilter: "blur(16px)",
                  borderRadius: "clamp(1.5rem, 4vw, 3rem)",
                  padding: "clamp(1.75rem, 4vw, 3.25rem) clamp(1.25rem, 4vw, 2.5rem)",
                  border: `1px solid ${BORDER}`,
                  display: "flex",
                  flexDirection: "column",
                  gap: "clamp(1.25rem, 2.5vw, 1.75rem)",
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
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "clamp(0.5rem, 1.2vw, 0.75rem)",
                    }}
                  >
                    {[
                      { val: true, label: txt.yes },
                      { val: false, label: txt.no },
                    ].map(({ val, label }) => (
                      <button
                        key={String(val)}
                        type="button"
                        onClick={() => setForm({ ...form, attending: val })}
                        style={{
                          padding: "clamp(12px, 1.4vw, 14px) clamp(8px, 1.2vw, 10px)",
                          borderRadius: 16,
                          fontWeight: 700,
                          cursor: "pointer",
                          transition: "all 0.2s",
                          fontFamily: "'Montserrat', sans-serif",
                          letterSpacing: "0.04em",
                          border: `1.5px solid ${form.attending === val ? THEME : BORDER}`,
                          background: form.attending === val ? THEME : "rgba(255,255,255,0.55)",
                          color: form.attending === val ? "white" : THEME,
                          minHeight: 48,
                          fontSize: "clamp(0.75rem, 1vw, 0.8rem)",
                          whiteSpace: "nowrap",
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
                      style={{
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        gap: "clamp(1.25rem, 2.5vw, 1.75rem)",
                      }}
                    >
                      <div>
                        <Label>
                          <Users size={10} style={{ display: "inline", marginRight: 6 }} />
                          {txt.guests}
                        </Label>
                        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                          {[1, 2, 3, 4].map((n) => (
                            <button
                              key={n}
                              type="button"
                              onClick={() => setForm({ ...form, num_guests: n })}
                              style={{
                                width: 48,
                                height: 48,
                                borderRadius: "50%",
                                fontWeight: 700,
                                cursor: "pointer",
                                transition: "all 0.2s",
                                border: `1.5px solid ${form.num_guests === n ? THEME : BORDER}`,
                                background:
                                  form.num_guests === n ? THEME : "rgba(255,255,255,0.55)",
                                color: form.num_guests === n ? "white" : THEME,
                                fontSize: "clamp(0.85rem, 1.1vw, 0.95rem)",
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
                    style={{ ...inputBase, resize: "none", minHeight: 100 }}
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
                      fontSize: "clamp(0.8rem, 1.05vw, 0.85rem)",
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
                    padding: "clamp(14px, 1.8vw, 18px) clamp(20px, 2.5vw, 24px)",
                    borderRadius: 16,
                    fontFamily: "'Montserrat', sans-serif",
                    background: status === "loading" ? "rgba(61,90,91,0.55)" : THEME,
                    color: "white",
                    fontWeight: 700,
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
                    fontSize: "clamp(0.75rem, 1vw, 0.8rem)",
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