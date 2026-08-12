"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useWedding } from "@/components/providers/WeddingContext";

const THEME_COLOR = "#2C3E35";

const TEXTS = {
  EN: {
    title: "The Venue",
    // welcomeCruise: "Welcome Cruise",
    theWedding: "The Wedding",
    viewMap: "View on Map",
    welcomeDesc: "",
    weddingDesc: "Ceremony & reception in the Sala d'Onore",
    historyTitle: "Palazzo Gallio",
    // History is displayed as four separate <p> elements. Wording is verbatim
    // from the approved program brief; do not paraphrase or merge.
    history: [
      "Perched gracefully on the tranquil shores of Lake Como, Palazzo Gallio is more than a Renaissance masterpiece—it is a love story carved in stone. Built in the late 16th century by Cardinal Tolomeo Gallio as a peaceful retreat from the grandeur of Rome, the palace was created as a place where the soul could rest and the heart could dream.",
      "For centuries, its elegant halls have echoed with whispered vows, joyful laughter, and the quiet footsteps of lovers drawn together by the magic of the lake. Beneath its ancient arches and in its timeless gardens, countless moments of love have unfolded, each becoming part of the palace's enduring spirit.",
      "As the sun melts into the waters of Lake Como and the mountains embrace the horizon, Palazzo Gallio seems to whisper a simple truth: while time carries away generations, love remains. It lingers in every breeze that dances across the gardens, every reflection upon the lake, and every promise made beneath its watchful walls.",
      "Today, Palazzo Gallio stands as a timeless sanctuary where history and romance intertwine, reminding every visitor that the greatest love stories are not only written in words—they are lived in places where beauty, memory, and the heart become one.",
    ],
  },
  IT: {
    title: "I Festeggiamenti",
    // welcomeCruise: "Crociera di Benvenuto",
    theWedding: "Il Matrimonio",
    viewMap: "Visualizza sulla mappa",
    welcomeDesc: "",
    weddingDesc: "Cerimonia e ricevimento nella Sala d'Onore",
    historyTitle: "Una Breve Storia",
    history: [
      "Adagiato con eleganza sulle tranquille rive del Lago di Como, Palazzo Gallio è molto più di un capolavoro rinascimentale: è una storia d'amore scolpita nella pietra. Edificato alla fine del XVI secolo dal cardinale Tolomeo Gallio come rifugio di pace lontano dai fasti di Roma, il palazzo fu concepito come un luogo dove l'anima potesse riposare e il cuore sognare.",
      "Per secoli, le sue sale eleganti hanno risuonato di promesse sussurrate, risate gioiose e passi lievi di innamorati attratti dalla magia del lago. Sotto le sue antiche arcate e tra i suoi giardini senza tempo, si sono susseguiti innumerevoli momenti d'amore, ognuno dei quali è entrato a far parte dello spirito immortale del palazzo.",
      "Mentre il sole si fonde nelle acque del Lago di Como e le montagne abbracciano l'orizzonte, Palazzo Gallio sembra sussurrare una verità semplice: sebbene il tempo porti via le generazioni, l'amore resta. Esso perdura in ogni brezza che danza tra i giardini, in ogni riflesso sul lago e in ogni promessa pronunciata tra le sue mura custodi di storia.",
      "Oggi, Palazzo Gallio si erge come un santuario senza tempo dove storia e romanticismo si intrecciano, ricordando a ogni visitatore che le più grandi storie d'amore non sono scritte solo a parole: sono vissute in luoghi dove bellezza, memoria e cuore diventano una cosa sola.",
    ],
  },
};

function CelebrationCard({
  image,
  floatStyle = "yacht",
  viewMapLabel,
  mapUrl,
  location,
  address,
  date,
}: {
  image?: string;
  floatStyle?: "yacht" | "hotel" | "venue";
  viewMapLabel: string;
  mapUrl: string;
  location: string;
  address: string;
  date: string;
}) {
  const isHotel = floatStyle === "hotel";
  const isVenue = floatStyle === "venue";
  const { language } = useWedding();
  const t = TEXTS[language as keyof typeof TEXTS] ?? TEXTS.EN;

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
      {image && (
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          animate={isHotel || isVenue
            ? { y: [0, -8, 0], rotate: [-0.3, 0.3, -0.3] }
            : { y: [0, -12, 0], rotate: [-1.5, 1.5, -1.5], x: [-3, 3, -3] }
          }
          transition={{
            y: { duration: isHotel || isVenue ? 5 : 4.5, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: isHotel || isVenue ? 6 : 5.5, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 0.8 }
          }}
          className="relative z-20"
          style={{ marginBottom: isVenue ? "20px" : (isHotel ? "-32px" : "-28px") }}
        >
          <img
            src={image}
            alt={`${location} — wedding venue`}
            className={`h-auto drop-shadow-xl block ${isVenue ? "rounded-3xl border-4 border-white/80" : ""}`}
            style={{
              width: isVenue ? "clamp(12rem, 30vw, 24rem)" : (isHotel ? "clamp(8rem, 22vw, 18rem)" : "clamp(7rem, 18vw, 16rem)"),
            }}
          />

          {/* Venue info rendered directly on the photograph — no panel/border,
              just clean editorial text on a soft bottom gradient for legibility. */}
          {isVenue && (
            <div
              className="absolute inset-x-0 bottom-0 z-30 pointer-events-none"
              style={{
                paddingInline: "clamp(0.5rem, 2vw, 1.25rem)",
                paddingBottom: "clamp(1rem, 3vw, 1.75rem)",
                paddingTop: "clamp(1.5rem, 4vw, 2.5rem)",
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(15,12,8,0.55) 75%, rgba(15,12,8,0.78) 100%)",
                borderBottomLeftRadius: "clamp(1.25rem, 3vw, 1.875rem)",
                borderBottomRightRadius: "clamp(1.25rem, 3vw, 1.875rem)",
              }}
            >
              <div
                className="flex flex-col items-center text-center pointer-events-auto"
                style={{ gap: "clamp(0.35rem, 1vw, 0.6rem)", color: "#F8F6F0" }}
              >
                <h3
                  className="leading-tight"
                  style={{
                    fontFamily: "'Great Vibes', cursive",
                    color: "#F8F6F0",
                    fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                  }}
                >
                  {location}
                </h3>
                <p
                  className="uppercase"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    color: "rgba(248,246,240,0.85)",
                    letterSpacing: "0.18em",
                    fontSize: "clamp(8px, 0.8vw, 10px)",
                  }}
                >
                  {address}
                </p>
                <p
                  className="uppercase font-medium"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    color: "rgba(248,246,240,0.95)",
                    letterSpacing: "0.22em",
                    fontSize: "clamp(9px, 0.9vw, 11px)",
                  }}
                >
                  {date}
                </p>
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${viewMapLabel} — opens in a new tab`}
                  className="uppercase font-bold border-b transition-all hover:opacity-80 active:scale-95 tap-target"
                  style={{
                    color: "#F8F6F0",
                    borderColor: "rgba(248,246,240,0.55)",
                    letterSpacing: "0.35em",
                    fontSize: "clamp(8px, 0.8vw, 10px)",
                    paddingBottom: 4,
                    marginTop: 2,
                  }}
                >
                  {viewMapLabel}
                </a>
              </div>
            </div>
          )}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="w-full bg-[#F1EFE9] border border-[#E3DFD5] rounded-[clamp(1.5rem,4vw,3.25rem)] overflow-hidden"
        style={{
          padding: "clamp(1.75rem, 4vw, 4rem) clamp(1.25rem, 4vw, 3rem)",
        }}
      >
        <div className="flex flex-col items-center text-center w-full">

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center w-full max-w-md"
          >
            <h3
              className="leading-tight mb-4 sm:mb-6"
              style={{
                fontFamily: "'Great Vibes', cursive",
                color: THEME_COLOR,
                fontSize: "clamp(2rem, 5.5vw, 3.5rem)",
              }}
            >
              {t.historyTitle}
            </h3>

            <div
              className="flex flex-col w-full"
              style={{ gap: "clamp(0.85rem, 1.6vw, 1.15rem)" }}
            >
              {t.history.map((paragraph, i) => (
                <p
                  key={i}
                  className="font-serif leading-relaxed text-left"
                  style={{
                    color: THEME_COLOR,
                    opacity: 0.8,
                    fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Celebrations() {
  const { language } = useWedding();
  const t = TEXTS[language as keyof typeof TEXTS] ?? TEXTS.EN;

  return (
    <section
      data-section
      className="relative bg-transparent overflow-hidden flex flex-col items-center"
      style={{
        paddingTop: "clamp(4rem, 8vw, 6rem)",
        paddingBottom: "clamp(6rem, 10vw, 12rem)",
      }}
    >
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        <AnimatedSection direction="fade" className="text-center mb-10 sm:mb-16 md:mb-24">
          <h2
            style={{
              fontFamily: "'Great Vibes', cursive",
              color: THEME_COLOR,
              opacity: 0.9,
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              lineHeight: 1.1,
            }}
          >
            {t.title}
          </h2>
        </AnimatedSection>

        <div className="flex flex-col items-center w-full gap-12 sm:gap-20 md:gap-36">
          <CelebrationCard
            image="/venue.webp"
            floatStyle="venue"
            location="Palazzo Gallio"
            address="Via Regina Levante 2, 22015 Gravedona CO, Italy"
            date={language === "IT" ? "Domenica, 11 Ottobre 2026" : "Sunday, October 11, 2026"}
            viewMapLabel={t.viewMap}
            mapUrl="https://www.google.com/maps/place/Palazzo+Gallio/@46.1478268,9.3092972,17z/data=!3m1!5s0x4784401d1d315d85:0x263fae6377bb4855!4m6!3m5!1s0x4784401d8687f5b5:0xdb54215c26fea7e4!8m2!3d46.1480535!4d9.3094568!16s%2Fg%2F1226g6cz?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D"
          />
        </div>
      </div>
    </section>
  );
}