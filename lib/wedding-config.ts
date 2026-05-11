
// WEDDING CONFIGURATION 


export const weddingConfig = {
  // Maintenance
  maintenanceMode: true,

  // Couple
  bride: "Anita",
  groom: "Richard",
  coupleNames: "Anita & Richard",
  hashtag: "#AnitaAndRichard2026",

  // Date & Time
  weddingDate: new Date("2026-09-20T15:00:00"),
  weddingDateFormatted: "Saturday, September 20, 2026",
  weddingTime: "3:00 PM",

  // Ceremony
  ceremony: {
    name: "The Grand Chapel",
    address: "Uhuru Gardens, Nairobi, Kenya",
    time: "3:00 PM",
    mapsUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8183913647!2d36.81585!3d-1.30082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTgnMDIuOSJTIDM2wrA0OCc1Ny4xIkU!5e0!3m2!1sen!2ske!4v1!5m2!1sen!2ske",
    openMapsUrl: "https://maps.google.com/?q=Uhuru+Gardens+Nairobi",
    openAppleMapsUrl: "https://maps.apple.com/?q=Uhuru+Gardens+Nairobi",
  },

  // Reception
  reception: {
    name: "The Ritz Ballroom",
    address: "Westlands, Nairobi, Kenya",
    time: "6:30 PM",
    dressCode: "Black Tie Optional",
  },

  // Schedule
  schedule: [
    { time: "3:00 PM", event: "Ceremony Begins", icon: "heart", description: "Join us as we say our vows at The Grand Chapel" },
    { time: "4:00 PM", event: "Cocktail Hour", icon: "wine", description: "Garden cocktails, canapés & live acoustic music" },
    { time: "6:30 PM", event: "Reception Doors Open", icon: "sparkles", description: "Welcome to The Ritz Ballroom" },
    { time: "7:00 PM", event: "Dinner Service", icon: "utensils", description: "Three-course gourmet dinner experience" },
    { time: "9:00 PM", event: "First Dance", icon: "music", description: "The dance floor opens — join us in celebrating" },
    { time: "10:30 PM", event: "Cake Cutting", icon: "cake", description: "A sweet end to a perfect evening" },
  ],

  // Our Story
  story: [
    {
      year: "2018",
      title: "First Meeting",
      text: "We met by chance at a rooftop gallery opening in Nairobi. One conversation turned into hours of laughter and shared dreams.",
      image: "/images/story-1.jpg",
    },
    {
      year: "2020",
      title: "Our First Trip Together",
      text: "A spontaneous road trip to Amboseli — watching the sunrise with Kilimanjaro in the distance. That's when we knew.",
      image: "/images/story-2.jpg",
    },
    {
      year: "2022",
      title: "Moving In Together",
      text: "We found a little apartment overlooking the city. Mornings on the balcony became our favorite ritual.",
      image: "/images/story-3.jpg",
    },
    {
      year: "2025",
      title: "The Proposal",
      text: "Under a canopy of stars at Lake Nakuru, Richard got down on one knee. Anita said yes before he could finish the question.",
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
    // Place your MP3 at public/audio/wedding-music.mp3
    src: "/audio/wedding-music.mp3",
  },

  // Meal options
  mealOptions: ["Beef Tenderloin", "Pan-Seared Salmon", "Wild Mushroom Risotto (Vegetarian)", "No Preference"],

  // Social sharing
  whatsappMessage: "Join us for the wedding of Anita & Richard! 💍 September 20, 2026 — Nairobi. Open your invitation here: ",
  siteUrl: "https://anita-and-richard.vercel.app",
};

export type WeddingConfig = typeof weddingConfig;
