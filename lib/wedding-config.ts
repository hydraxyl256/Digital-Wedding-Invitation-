// WEDDING CONFIGURATION

export const weddingConfig = {
  // Maintenance
  maintenanceMode: false,

  // Couple
  bride: "Anita",
  groom: "Richard",
  coupleNames: "Anita & Richard",
  hashtag: "#AnitaAndRichard2026",

  // Date & Time
  weddingDate: new Date("2026-08-16T15:00:00"),
  weddingDateFormatted: "Sunday, August 16, 2026",
  weddingDateShort: "16 August 2026",
  weddingTime: "3:00 PM",

  // Ceremony & Reception Venue (combined at Palazzo Gallio)
  ceremony: {
    name: "Palazzo Gallio",
    address: "Via Regina Levante 2, 22015 Gravedona CO, Italy",
    time: "3:00 PM",
    mapsUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2787.443!2d9.1438!3d46.1441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47841a0f5e3b3b3b%3A0x40671111111!2sPalazzo%20Gallio!5e0!3m2!1sen!2sit!4v1700000000000",
    openMapsUrl:
      "https://maps.google.com/?q=Palazzo+Gallio+Via+Regina+Levante+2+Gravedona+CO+Italy",
    openAppleMapsUrl:
      "https://maps.apple.com/?q=Palazzo+Gallio+Via+Regina+Levante+2+Gravedona+CO+Italy",
  },

  // Reception (held at the same venue)
  reception: {
    name: "Palazzo Gallio",
    address: "Via Regina Levante 2, 22015 Gravedona CO, Italy",
    time: "6:30 PM",
    dressCode: "Black Tie Optional",
  },

  // Schedule for the day
  schedule: [
    { time: "3:00 PM", event: "Ceremony", icon: "heart", description: "Exchange of vows in the historic halls of Palazzo Gallio" },
    { time: "4:00 PM", event: "Aperitivo", icon: "wine", description: "Cocktails and canapés on the lakeside terrace" },
    { time: "6:30 PM", event: "Reception", icon: "sparkles", description: "Welcome dinner in the Sala d'Onore" },
    { time: "8:00 PM", event: "Dinner Service", icon: "utensils", description: "A multi-course Italian gourmet experience" },
    { time: "10:00 PM", event: "First Dance", icon: "music", description: "The dance floor opens — join us in celebration" },
    { time: "11:30 PM", event: "Cake Cutting", icon: "cake", description: "A sweet end to a perfect evening" },
  ],

  // Our Story
  story: [
    {
      year: "2018",
      title: "First Meeting",
      text: "We met by chance at an art gallery in Milan. One conversation turned into hours of laughter and shared dreams of faraway places.",
      image: "/images/story-1.jpg",
    },
    {
      year: "2020",
      title: "Our First Trip Together",
      text: "A spontaneous road trip along Lake Como — watching the sunset over the water. That's when we knew this was forever.",
      image: "/images/story-2.jpg",
    },
    {
      year: "2022",
      title: "Building a Home",
      text: "We found a little apartment overlooking the lake. Mornings on the balcony became our favourite ritual.",
      image: "/images/story-3.jpg",
    },
    {
      year: "2025",
      title: "The Proposal",
      text: "Under a canopy of stars on the shores of Lake Como, Richard got down on one knee. Anita said yes before he could finish the question.",
      image: "/images/story-4.jpg",
    },
  ],

  // Gallery
  gallery: [
    "/images/gallery-1.jpg",
    "/images/gallery-2.jpg",
    "/images/gallery-3.jpg",
    "/images/gallery-4.jpg",
    "/images/gallery-5.jpg",
    "/images/gallery-6.jpg",
  ],

  // Music
  music: {
    title: "Can't Help Falling in Love",
    artist: "Elvis Presley",
    src: "/audio/wedding-music.mp3",
  },

  // Meal options
  mealOptions: [
    "Beef Tenderloin",
    "Pan-Seared Lake Fish",
    "Wild Mushroom Risotto (Vegetarian)",
    "No Preference",
  ],

  // Venue highlights for the Venue section
  venueHighlights: [
    {
      icon: "landmark",
      title: "Renaissance Heritage",
      description:
        "A 16th-century palace built by Cardinal Tolomeo Gallio, rich in frescoed halls and centuries of history.",
    },
    {
      icon: "waves",
      title: "Lake Como Setting",
      description:
        "Set directly on the western shore of Lake Como, with sweeping views over the alpine waters.",
    },
    {
      icon: "sparkles",
      title: "Elegant Event Spaces",
      description:
        "Sala d'Onore and lakeside terraces offering an atmosphere of refined Italian grandeur.",
    },
    {
      icon: "camera",
      title: "Photography Paradise",
      description:
        "Italianate courtyards, frescoed salons, and lakeside vistas — every angle tells your story.",
    },
  ],

  // Social sharing
  whatsappMessage:
    "Join us for the wedding of Anita & Richard! 💍 16 August 2026 — Palazzo Gallio, Lake Como, Italy. Open your invitation here: ",
  siteUrl: "https://anita-and-richard.vercel.app",
};

export type WeddingConfig = typeof weddingConfig;