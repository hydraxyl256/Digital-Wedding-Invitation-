"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertCircle, Download, Loader2 } from "lucide-react";
import { pdf } from "@react-pdf/renderer";

import { WeddingProgramDocument } from "@/lib/pdf/weddingProgramPdf";

type ButtonState = "idle" | "loading" | "error";

const FILENAME = "palazzo-gallio-wedding-program.pdf";
const IDLE_LABEL = "Download Full Program";
const LOADING_LABEL = "Preparing Program…";
const ERROR_LABEL = "Couldn't generate — please retry";

export default function ScheduleDownload() {
  const [state, setState] = useState<ButtonState>("idle");
  const inFlight = useRef(false);
  const reduceMotion = useReducedMotion();

  // If something genuinely fails, surface a transient error and revert.
  useEffect(() => {
    if (state !== "error") return;
    const t = window.setTimeout(() => setState("idle"), 3500);
    return () => window.clearTimeout(t);
  }, [state]);

  const handleClick = async () => {
    if (inFlight.current) return;
    inFlight.current = true;
    setState("loading");
    try {
      const blob = await pdf(<WeddingProgramDocument />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = FILENAME;
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      a.remove();
      // Give iOS Safari enough time to finish the save sheet before revoking.
      window.setTimeout(() => URL.revokeObjectURL(url), 4000);
      setState("idle");
    } catch (err) {
      // Keep the technical detail in the console for the developer; never
      // expose implementation noise to the guest on screen.
      // eslint-disable-next-line no-console
      console.error("[ScheduleDownload] PDF generation failed:", err);
      setState("error");
    } finally {
      inFlight.current = false;
    }
  };

  const label =
    state === "loading" ? LOADING_LABEL : state === "error" ? ERROR_LABEL : IDLE_LABEL;

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      disabled={state === "loading"}
      aria-label="Download the full wedding program PDF"
      aria-busy={state === "loading"}
      aria-live="polite"
      className="tap-target"
      whileHover={reduceMotion ? undefined : { scale: 1.04 }}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      style={{
        marginTop: "clamp(1.5rem, 3vw, 2.5rem)",
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 24px",
        minHeight: 48,
        borderRadius: 999,
        border: "1px solid rgba(201,162,74,0.55)",
        background: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(14px) saturate(140%)",
        WebkitBackdropFilter: "blur(14px) saturate(140%)",
        fontFamily: "'Montserrat', sans-serif",
        textTransform: "uppercase",
        letterSpacing: "0.35em",
        fontSize: 11,
        fontWeight: 600,
        color: "#2C3E35",
        cursor: state === "loading" ? "wait" : "pointer",
        boxShadow: "0 10px 26px rgba(44,62,53,0.10), inset 0 1px 0 rgba(255,255,255,0.6)",
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={state}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          aria-hidden
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {state === "loading" ? (
            <Loader2 size={16} className="animate-spin" strokeWidth={1.6} />
          ) : state === "error" ? (
            <AlertCircle size={16} strokeWidth={1.6} />
          ) : (
            <Download size={16} strokeWidth={1.6} />
          )}
        </motion.span>
      </AnimatePresence>
      <span>{label}</span>
    </motion.button>
  );
}
