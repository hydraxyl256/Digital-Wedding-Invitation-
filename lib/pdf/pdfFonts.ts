// Font registration for the downloadable Wedding Program PDF.
//
// `Font.register` from `@react-pdf/renderer` resolves the `src` at render time
// via fetch. We point it at vendored .ttf files under /public/fonts/ so the
// PDF works offline, has zero CORS / CDN flakiness, and behaves identically
// on iOS Safari, Android Chrome, and desktop browsers.
//
// If a font file is missing, we fall back to built-in PDF fonts (Helvetica,
// Times-Roman / Times-Italic) so the PDF still renders — never throw at
// module load or during render.

import { Font } from "@react-pdf/renderer";

type FontConfig = {
  family: string;
  src: string;
  fontStyle?: "normal" | "italic";
  fontWeight?: "normal" | "bold";
};

// Vendored in `public/fonts/`. Next serves /public as the static root, so
// /fonts/Foo.ttf resolves at https://<host>/fonts/Foo.ttf.
const FONT_CONFIG: FontConfig[] = [
  { family: "WPDF-Playfair",   src: "/fonts/PlayfairDisplay-Regular.ttf",     fontStyle: "normal", fontWeight: "normal" },
  { family: "WPDF-Playfair",   src: "/fonts/PlayfairDisplay-Italic.ttf",      fontStyle: "italic", fontWeight: "normal" },
  { family: "WPDF-GreatVibes", src: "/fonts/GreatVibes-Regular.ttf",         fontStyle: "normal", fontWeight: "normal" },
  { family: "WPDF-Montserrat", src: "/fonts/Montserrat-Regular.ttf",         fontStyle: "normal", fontWeight: "normal" },
  { family: "WPDF-Montserrat", src: "/fonts/Montserrat-SemiBold.ttf",        fontStyle: "normal", fontWeight: "bold"   },
  { family: "WPDF-Cormorant",  src: "/fonts/CormorantGaramond-Regular.ttf",  fontStyle: "normal", fontWeight: "normal" },
];

/** Tracks which custom families ended up registered successfully. */
const available: Record<string, { style: "normal" | "italic"; weight: "normal" | "bold" }> = {};
let registered = false;

/**
 * Register all PDF fonts. Idempotent — safe to call multiple times.
 * Must be called before the PDF document renders; the document component
 * calls this at the top of its render function.
 */
export function registerWeddingProgramFonts(): void {
  if (registered) return;
  for (const cfg of FONT_CONFIG) {
    try {
      Font.register(cfg);
      available[cfg.family] = {
        style: cfg.fontStyle ?? "normal",
        weight: cfg.fontWeight ?? "normal",
      };
    } catch {
      // Vendored font unreachable — leave the fallback in place.
    }
  }
  registered = true;
}

/** Resolve a font role to a concrete family name based on what's available. */
function pick(preferred: string, fallback: string, style: "normal" | "italic" = "normal", weight: "normal" | "bold" = "normal"): string {
  if (available[preferred]?.style === style && available[preferred]?.weight === weight) return preferred;
  if (available[preferred] && (style === "normal" || available[preferred].style === style)) return preferred;
  return fallback;
}

export function getProgramFonts() {
  // Re-register on first call; safe and idempotent.
  registerWeddingProgramFonts();
  return {
    coverTitle:    pick("WPDF-GreatVibes", "Times-Italic",  "italic"),
    coverSubtitle: pick("WPDF-Playfair",   "Times-Italic",  "italic"),
    eyebrow:       pick("WPDF-Montserrat", "Helvetica",     "normal", "bold"),
    programTime:   pick("WPDF-Montserrat", "Helvetica",     "normal", "bold"),
    programTitle:  pick("WPDF-Playfair",   "Times-Roman",   "normal"),
    programBody:   pick("WPDF-Cormorant",  "Times-Roman",   "normal"),
    footer:        pick("WPDF-Montserrat", "Helvetica",     "normal"),
  } as const;
}
