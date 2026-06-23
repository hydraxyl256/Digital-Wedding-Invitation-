"use client";

import { Check, Copy, Share2 } from "lucide-react";
import { useState } from "react";
import { weddingConfig } from "@/lib/wedding-config";

const THEME = "#3D5A5B";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(weddingConfig.siteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = weddingConfig.siteUrl;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch { }
      document.body.removeChild(ta);
    }
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(weddingConfig.whatsappMessage + weddingConfig.siteUrl);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  // return (
  //   <div className="flex items-center gap-2.5 sm:gap-3 justify-center flex-wrap">
  //     {/* <button
  //       onClick={handleWhatsApp}
  //       className="flex items-center gap-2 transition-all duration-300 hover:opacity-80 active:scale-95"
  //       style={{
  //         background: THEME,
  //         color: "white",
  //         fontFamily: "'Montserrat', sans-serif",
  //         fontWeight: 700,
  //         letterSpacing: "0.12em",
  //         textTransform: "uppercase",
  //         padding: "clamp(10px, 1.2vw, 13px) clamp(18px, 2.4vw, 24px)",
  //         borderRadius: 40,
  //         border: "none",
  //         cursor: "pointer",
  //         fontSize: "clamp(0.65rem, 0.85vw, 0.75rem)",
  //         minHeight: 44,
  //       }}
  //     >
  //       {/* <Share2 size={13} /> */}
  //       Share on WhatsApp
  //     </button> */}

  //     {/* <button
  //       onClick={handleCopy}
  //       className="flex items-center gap-2 transition-all duration-300 hover:opacity-80 active:scale-95"
  //       style={{
  //         background: "transparent",
  //         color: THEME,
  //         fontFamily: "'Montserrat', sans-serif",
  //         fontWeight: 700,
  //         letterSpacing: "0.12em",
  //         textTransform: "uppercase",
  //         padding: "clamp(10px, 1.2vw, 13px) clamp(18px, 2.4vw, 24px)",
  //         borderRadius: 40,
  //         border: `1.5px solid rgba(61,90,91,0.3)`,
  //         cursor: "pointer",
  //         fontSize: "clamp(0.65rem, 0.85vw, 0.75rem)",
  //         minHeight: 44,
  //       }}
  //     >
  //       {copied ? <Check size={13} /> : <Copy size={13} />}
  //       {copied ? "Copied!" : "Copy Invite Link"}
  //     </button> */}
  //   </div>
  // );
}