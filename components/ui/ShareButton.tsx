"use client";

import { Check, Copy, Share2 } from "lucide-react";
import { useState } from "react";
import { weddingConfig } from "@/lib/wedding-config";

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
      <button
        onClick={handleWhatsApp}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
        style={{ background: "#25D366" }}
      >
        <Share2 size={15} />
        Share on WhatsApp
      </button>
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 border"
        style={{ borderColor: "#C9A84C", color: "#C9A84C" }}
      >
        {copied ? <Check size={15} /> : <Copy size={15} />}
        {copied ? "Copied!" : "Copy Invite Link"}
      </button>
    </div>
  );
}
