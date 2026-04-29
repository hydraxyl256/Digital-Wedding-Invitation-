"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { weddingConfig } from "@/lib/wedding-config";
import {
  Send, Check, AlertCircle, User, Users,
  MessageSquare, ChevronDown, Loader2,
} from "lucide-react";

interface FormState {
  guest_name: string;
  attending: boolean | null;
  num_guests: number;
  meal_preference: string;
  message: string;
}

const INITIAL: FormState = {
  guest_name: "", attending: null, num_guests: 1, meal_preference: "", message: "",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: 12,
  padding: "14px 20px",
  fontSize: "0.875rem",
  color: "#78350f",
  border: "1.5px solid rgba(201,168,76,0.3)",
  background: "rgba(253,246,236,0.95)",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
  transition: "border-color 0.2s",
};

export default function RSVPForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.guest_name.trim()) { setErrorMsg("Please enter your full name."); return; }
    if (form.attending === null) { setErrorMsg("Please let us know if you'll be attending."); return; }
    setErrorMsg("");
    setStatus("loading");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to submit. Please try again.");
    }
  };

  return (
    <section
      data-section
      style={{ background: "linear-gradient(180deg, #F7E7CE 0%, #FDF6EC 100%)" }}
      className="relative overflow-hidden"
    >
      <div style={{ maxWidth: 720, margin: "0 auto", width: "100%", padding: "112px 24px" }}>

        {/* ── Heading ── */}
        <AnimatedSection direction="fade" className="w-full">
          <div style={{ textAlign: "center", marginBottom: 64, width: "100%" }}>
            <p
              className="text-amber-600"
              style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.5em", marginBottom: 20 }}
            >
              Will you join us?
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
              RSVP
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center", marginBottom: 20 }}>
              <div style={{ height: 1, width: 64, background: "linear-gradient(90deg, transparent, #C9A84C)" }} />
              <span style={{ color: "#C9A84C" }}>✦</span>
              <div style={{ height: 1, width: 64, background: "linear-gradient(270deg, transparent, #C9A84C)" }} />
            </div>
            <p style={{ color: "rgba(120,53,15,0.55)", fontSize: "0.875rem" }}>
              Kindly respond by{" "}
              <span style={{ color: "#78350f", fontWeight: 600 }}>August 1, 2026</span>
            </p>
          </div>
        </AnimatedSection>

        {/* ── Form / Success ── */}
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 240, damping: 22 }}
              style={{
                textAlign: "center",
                padding: "80px 40px",
                borderRadius: 24,
                background: "rgba(253,246,236,0.9)",
                backdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.6)",
                boxShadow: "0 24px 64px rgba(201,168,76,0.12)",
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 300 }}
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 32px",
                  background: "linear-gradient(135deg, #C9A84C, #e8c97a)",
                }}
              >
                <Check size={40} color="white" strokeWidth={2.5} />
              </motion.div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.75rem",
                  color: "#78350f",
                  marginBottom: 16,
                }}
              >
                Thank You!
              </h3>
              <p style={{ color: "rgba(120,53,15,0.65)", fontSize: "0.9rem", lineHeight: 1.7, maxWidth: 300, margin: "0 auto" }}>
                Your RSVP has been received. We can't wait to celebrate with you on our special day! 🥂
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AnimatedSection direction="up" delay={0.1} className="w-full">
                <div
                  style={{
                    borderRadius: 24,
                    background: "rgba(253,246,236,0.78)",
                    backdropFilter: "blur(24px)",
                    border: "1px solid rgba(255,255,255,0.6)",
                    boxShadow: "0 16px 48px rgba(201,168,76,0.1)",
                    padding: "48px 40px",
                  }}
                >
                  {/* Name */}
                  <div style={{ marginBottom: 28 }}>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 10,
                        textTransform: "uppercase",
                        letterSpacing: "0.2em",
                        color: "#d97706",
                        fontWeight: 700,
                        marginBottom: 10,
                      }}
                    >
                      <User size={12} />
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={form.guest_name}
                      onChange={(e) => setForm({ ...form, guest_name: e.target.value })}
                      style={inputStyle}
                    />
                  </div>

                  {/* Attendance */}
                  <div style={{ marginBottom: 28 }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: 10,
                        textTransform: "uppercase",
                        letterSpacing: "0.2em",
                        color: "#d97706",
                        fontWeight: 700,
                        marginBottom: 12,
                      }}
                    >
                      Will you attend?
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      {[
                        { val: true,  label: "Joyfully Accepts" },
                        { val: false, label: "Regretfully Declines" },
                      ].map(({ val, label }) => (
                        <button
                          key={String(val)}
                          type="button"
                          onClick={() => setForm({ ...form, attending: val })}
                          style={{
                            padding: "14px 12px",
                            borderRadius: 12,
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            border: `2px solid ${form.attending === val ? "#C9A84C" : "rgba(201,168,76,0.3)"}`,
                            background: form.attending === val
                              ? "linear-gradient(135deg, rgba(201,168,76,0.12), rgba(247,231,206,0.8))"
                              : "rgba(253,246,236,0.8)",
                            color: "#78350f",
                            cursor: "pointer",
                            transform: form.attending === val ? "scale(1.02)" : "scale(1)",
                            transition: "all 0.2s",
                          }}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Guest count */}
                  <AnimatePresence>
                    {form.attending === true && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ overflow: "hidden", marginBottom: 28 }}
                      >
                        <label
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            fontSize: 10,
                            textTransform: "uppercase",
                            letterSpacing: "0.2em",
                            color: "#d97706",
                            fontWeight: 700,
                            marginBottom: 12,
                          }}
                        >
                          <Users size={12} />
                          Number of Guests
                        </label>
                        <div style={{ display: "flex", gap: 12 }}>
                          {[1, 2, 3, 4].map((n) => (
                            <button
                              key={n}
                              type="button"
                              onClick={() => setForm({ ...form, num_guests: n })}
                              style={{
                                width: 48,
                                height: 48,
                                borderRadius: "50%",
                                fontSize: "0.9rem",
                                fontWeight: 700,
                                border: `2px solid ${form.num_guests === n ? "#C9A84C" : "rgba(201,168,76,0.3)"}`,
                                background: form.num_guests === n
                                  ? "linear-gradient(135deg, #C9A84C, #e8c97a)"
                                  : "rgba(253,246,236,0.9)",
                                color: form.num_guests === n ? "#1A1208" : "#78350f",
                                cursor: "pointer",
                                transform: form.num_guests === n ? "scale(1.1)" : "scale(1)",
                                transition: "all 0.2s",
                              }}
                            >
                              {n}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Meal preference */}
                  <AnimatePresence>
                    {form.attending === true && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ overflow: "hidden", marginBottom: 28 }}
                      >
                        <label
                          style={{
                            display: "block",
                            fontSize: 10,
                            textTransform: "uppercase",
                            letterSpacing: "0.2em",
                            color: "#d97706",
                            fontWeight: 700,
                            marginBottom: 10,
                          }}
                        >
                          Meal Preference
                        </label>
                        <div style={{ position: "relative" }}>
                          <select
                            value={form.meal_preference}
                            onChange={(e) => setForm({ ...form, meal_preference: e.target.value })}
                            style={{ ...inputStyle, appearance: "none", paddingRight: 40 }}
                          >
                            <option value="">Select a meal option</option>
                            {weddingConfig.mealOptions.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                          <ChevronDown
                            size={15}
                            style={{
                              position: "absolute",
                              right: 14,
                              top: "50%",
                              transform: "translateY(-50%)",
                              color: "#d97706",
                              pointerEvents: "none",
                            }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Message */}
                  <div style={{ marginBottom: 28 }}>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 10,
                        textTransform: "uppercase",
                        letterSpacing: "0.2em",
                        color: "#d97706",
                        fontWeight: 700,
                        marginBottom: 10,
                      }}
                    >
                      <MessageSquare size={12} />
                      Leave a Message
                      <span style={{ fontSize: 10, color: "rgba(217,119,6,0.5)", textTransform: "none", letterSpacing: "normal", fontWeight: 400 }}>
                        (optional)
                      </span>
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Share your wishes for the couple..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      style={{ ...inputStyle, resize: "none" }}
                    />
                  </div>

                  {/* Error */}
                  {errorMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "14px 18px",
                        borderRadius: 12,
                        background: "#fef2f2",
                        border: "1px solid #fecaca",
                        color: "#b91c1c",
                        fontSize: "0.875rem",
                        marginBottom: 24,
                      }}
                    >
                      <AlertCircle size={16} style={{ flexShrink: 0 }} />
                      {errorMsg}
                    </motion.div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    style={{
                      width: "100%",
                      padding: "18px 24px",
                      borderRadius: 12,
                      background: "linear-gradient(135deg, #C9A84C, #e8c97a)",
                      color: "#78350f",
                      fontWeight: 700,
                      fontSize: "0.875rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      border: "none",
                      cursor: status === "loading" ? "not-allowed" : "pointer",
                      opacity: status === "loading" ? 0.6 : 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                      transition: "all 0.3s",
                    }}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Send RSVP
                      </>
                    )}
                  </button>
                </div>
              </AnimatedSection>
            </motion.form>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
