// Single source of truth for the wedding day schedule.
//
// The website timeline reads `weddingTimelineDisplayItems` for the visible
// (abbreviated) rows, while the downloadable program PDF consumes
// `weddingSchedule` for the full editorial program (time + title + description).
//
// Wording on every description is verbatim from the approved program brief.

export type WeddingScheduleItem = {
  /** Display time, e.g. "2:30 PM". */
  time: string;
  /** Short title for the program item, e.g. "Guests Arrive". */
  title: string;
  /** Full editorial description used in the downloadable PDF. */
  description: string;
};

/**
 * The 10 canonical program items, in chronological order.
 * Consumed by `lib/pdf/weddingProgramPdf.tsx`.
 */
export const weddingSchedule: WeddingScheduleItem[] = [
  {
    time: "2:30 PM",
    title: "Guests Arrive",
    description:
      "Guests are welcomed through the palace gates with a glass of Italian Prosecco and the gentle melodies of a live string quartet. As they stroll through the Renaissance gardens overlooking Lake Como, they are invited to soak in the breathtaking autumn scenery, where golden leaves and the shimmering lake create an unforgettable first impression.",
  },
  {
    time: "3:30 PM",
    title: "The Ceremony",
    description:
      "Against the enchanting backdrop of Lake Como, the couple exchanges vows as the afternoon light bathes Palazzo Gallio in warm October hues. Surrounded by family, friends, and centuries of history, every promise feels timeless.",
  },
  {
    time: "4:15 PM",
    title: "Aperitivo in the Gardens",
    description:
      "As newlyweds, the couple shares their first moments together while guests enjoy an elegant Italian aperitivo featuring local wines, signature cocktails, artisanal cheeses, cured meats, and seasonal delicacies. Live music fills the air as the sun begins its gentle descent over the lake.",
  },
  {
    time: "5:30 PM",
    title: "Sunset Portraits",
    description:
      "While guests continue to mingle, the couple slips away for intimate portraits among the palace's historic arches, lakeside terraces, and gardens. October's soft golden light offers one of the most romantic settings on Lake Como.",
  },
  {
    time: "6:30 PM",
    title: "Reception Dinner",
    description:
      "Guests are invited into an exquisitely styled reception inspired by timeless Italian elegance. Candlelight, lush florals, and refined décor set the stage for a multi-course dinner celebrating the finest flavors of Lombardy, paired with exceptional Italian wines.",
  },
  {
    time: "8:30 PM",
    title: "Speeches & Toasts",
    description:
      "Heartfelt words, joyful laughter, and cherished memories are shared as glasses are raised to celebrate a love story that has brought everyone together in this extraordinary place.",
  },
  {
    time: "9:00 PM",
    title: "Cake Cutting",
    description:
      "Under the evening sky, the couple cuts their wedding cake as sparkling fountains illuminate the moment, with Lake Como providing a magical backdrop.",
  },
  {
    time: "9:30 PM",
    title: "First Dance",
    description:
      "The newlyweds open the dance floor beneath the stars with their first dance, followed by family and friends joining the celebration.",
  },
  {
    time: "10:00 PM",
    title: "Dancing Under the Stars",
    description:
      "A live band or DJ keeps the celebration alive as guests dance late into the evening. An Italian dessert station, espresso bar, and late-night bites ensure the festivities continue in true Italian style.",
  },
  {
    time: "11:30 PM",
    title: "Sparkler Farewell",
    description:
      "Family and friends gather with sparkling lights to create a glowing pathway as the couple shares one final kiss before departing by vintage car or classic wooden Lake Como boat—bringing a perfect October wedding day to a truly unforgettable close.",
  },
];

/**
 * Abbreviated rows consumed by the existing `ScheduleTimeline` section.
 *
 * IMPORTANT: This list intentionally contains a duplicated "5:30 PM — Sunset
 * Portraits" / "6:30 PM — Reception Dinner" pair. That duplication is a
 * pre-existing visual choice in the approved timeline and must be preserved.
 * Do not "fix" it here without updating the timeline design.
 */
export const weddingTimelineDisplayItems: { time: string; event: string }[] = [
  { time: "2:30 PM",  event: "Guests Arrive" },
  { time: "3:30 PM",  event: "The Ceremony" },
  { time: "4:15 PM",  event: "Aperitivo in the Gardens" },
  { time: "5:30 PM",  event: "Sunset Portraits" },
  { time: "6:30 PM",  event: "Reception Dinner" },
  { time: "8:30 PM",  event: "Speeches & Toasts" },
  { time: "9:00 PM",  event: "Cake Cutting" },
  { time: "9:30 PM",  event: "First Dance" },
  { time: "10:00 PM", event: "Dancing Under the Stars" },
  { time: "11:30 PM", event: "Sparkler Farewell" },
];
