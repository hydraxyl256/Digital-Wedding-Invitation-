"use client";

import { Check, Copy, Share2 } from "lucide-react";
import { useState } from "react";
import { weddingConfig } from "@/lib/wedding-config";

const THEME = "#3D5A5B";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(weddingConfig.siteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(weddingConfig.whatsappMessage + weddingConfig.siteUrl);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div className="flex items-center gap-3 justify-center flex-wrap">
      {/* Share on WhatsApp — solid teal */}
      <button
        onClick={handleWhatsApp}
        className="flex items-center gap-2 transition-all duration-300 hover:opacity-75 active:scale-95"
        style={{
          background: THEME,
          color: "white",
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          padding: "13px 24px",
          borderRadius: 40,
          border: "none",
          cursor: "pointer",
        }}
      >
        <Share2 size={13} />
        Share on WhatsApp
      </button>

      {/* Copy Link — outlined teal */}
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 transition-all duration-300 hover:opacity-75 active:scale-95"
        style={{
          background: "transparent",
          color: THEME,
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          padding: "12px 24px",
          borderRadius: 40,
          border: `1.5px solid rgba(61,90,91,0.25)`,
          cursor: "pointer",
        }}
      >
        {copied ? <Check size={13} /> : <Copy size={13} />}
        {copied ? "Copied!" : "Copy Invite Link"}
      </button>
    </div>
  );
}
