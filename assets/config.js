/* ============================================================================
   HAIR THERAPY NASHVILLE — CENTRAL BUSINESS CONFIGURATION
   ----------------------------------------------------------------------------
   This is the only file the salon owner needs to edit for day-to-day updates.
   Change anything between the quotes and save. Keep commas correct.

   Verified data (public listings) is marked V. Unconfirmed items are marked
   [CONFIRM WITH OWNER] and are safe placeholders until the salon approves.
   ============================================================================ */

window.HT_CONFIG = {

  /* ---- Business identity ------------------------------------------------- */

  business: {
    // V — from Google/Birdeye public listing
    name: "Hair Therapy Nashville",
    legalName: "Hair Therapy Nashville Salon and Beauty Spa",
    motto: "Let your hair down.",
    tagline: "The Art of Healthy Hair",
    city: "Old Hickory, Tennessee",

    // V — public listing
    addressLine1: "118 Bridgeway Ave",
    addressLine2: "Old Hickory, TN 37138",
    mapsUrl: "https://maps.app.goo.gl/bRNfamcZnhgJqWh78",
    directionsUrl: "https://maps.app.goo.gl/bRNfamcZnhgJqWh78",

    // V — public listing
    phoneDisplay: "+1 615-933-9641",
    phoneHref: "+16159339641",
    email: "enhancedoptionbeauty@gmail.com",
    facebook: "https://www.facebook.com/enhancedoptionbeautysalon/",

    // V — the salon's existing Acuity booking system (preserve as-is)
    bookingUrl: "https://hairtherapynashville.as.me/schedule/109b419c",

    reviewsUrl: "https://reviews.birdeye.com/hair-therapy-nashville-salon-and-beauty-spa-168144023667246",
    rating: "4.8",
    reviewCount: 49
  },

  /* ---- Opening hours ------------------------------------------------------
     V — hours currently listed on Google (via Birdeye, Nov 2026).
     The booking calendar always shows authoritative live availability.
     If the salon confirms different hours, just edit the label strings.     */

  hours: [
    { day: "Monday",    time: "Closed" },
    { day: "Tuesday",   time: "9:00 am – 5:00 pm" },
    { day: "Wednesday", time: "9:00 am – 5:00 pm" },
    { day: "Thursday",  time: "9:00 am – 5:00 pm" },
    { day: "Friday",    time: "9:00 am – 5:00 pm" },
    { day: "Saturday",  time: "6:00 am – 12:00 pm" },
    { day: "Sunday",    time: "6:00 am – 1:00 pm" }
  ],

  /* ---- Stylist ------------------------------------------------------------
     Reviews publicly mention long-term client relationships, and salon
     research notes the stylist name "Elaina". Other Google reviews also
     mention stylist "Nataleigh". [CONFIRM WITH OWNER who should be featured
     and exact roles/titles before launch.]                                 */

  stylist: {
    name: "Elaina",              // [CONFIRM WITH OWNER]
    role: "Lead stylist",        // [CONFIRM WITH OWNER]
    bookingText: "Book with Elaina"
  },

  /* ---- Services -----------------------------------------------------------
     Categories reflect the salon's verified core work. Prices/durations are
     intentionally omitted — the salon's own booking menu is authoritative.
     To show a price on the card, add   price: "From $XX+"                  */

  services: [
    {
      number: "01",
      name: "Natural hair care",
      image: "assets/img/svc-natural.jpg",
      alt: "Smiling client with full natural hair in a salon chair beneath a ring light",
      blurb: "Trims, treatments and styling for every texture — care plans guided by patience, healthy practice and detail.",
      price: null,
      bookingUrl: "https://hairtherapynashville.as.me/schedule/109b419c"
    },
    {
      number: "02",
      name: "Braiding & protective styles",
      image: "assets/img/svc-braids.jpg",
      alt: "Long knotless braids styled in a soft portrait pose",
      blurb: "Classic and knotless braiding with intention — protective styling that lets growth happen underneath, beautifully.",
      price: null,
      bookingUrl: "https://hairtherapynashville.as.me/schedule/109b419c"
    },
    {
      number: "03",
      name: "Loc care & styling",
      image: "assets/img/svc-locs.jpg",
      alt: "Styled longer locs with a golden highlight palette",
      blurb: "Maintenance and styling for locs at every stage — treated as the ongoing journey they deserve to be.",
      price: null,
      bookingUrl: "https://hairtherapynashville.as.me/schedule/109b419c"
    },
    {
      number: "04",
      name: "Extensions & styling",
      image: "assets/img/svc-extensions.jpg",
      alt: "Long, glossy styled waves falling over a white off-shoulder neckline",
      blurb: "Extensions and finishing styles blended with care — for length, volume or a fresh new expression.",
      price: null,
      bookingUrl: "https://hairtherapynashville.as.me/schedule/109b419c"
    }
  ],

  /* ---- Gallery ------------------------------------------------------------
     Real client photography captured in-salon, pulled from the salon's own
     public page. Categories support the filter chips below.               */

  galleryFilters: [
    { key: "all",     label: "All work" },
    { key: "braids",  label: "Braids" },
    { key: "press",   label: "Silk press" },
    { key: "waves",   label: "Ponytails & waves" },
    { key: "occasion", label: "Special occasions" }
  ],

  gallery: [
    { file: "assets/img/g1.jpg",  w: 634, h: 792, cat: "braids", caption: "Knotless box braids", alt: "Client smiling after a fresh long knotless braid service at the salon" },
    { file: "assets/img/g8.jpg",  w: 598, h: 768, cat: "braids", caption: "Boho braids — honey blend", alt: "Rear view of blonde honey-toned boho braids with curled ends" },
    { file: "assets/img/g2.jpg",  w: 778, h: 790, cat: "press", caption: "Silk press — smooth finish", alt: "Smooth copper-brown silk press bob photographed from behind" },
    { file: "assets/img/g3.jpg",  w: 666, h: 782, cat: "waves", caption: "Sleek ponytail", alt: "Side profile of a sleek long ponytail with a polished hairline" },
    { file: "assets/img/g5.jpg",  w: 780, h: 750, cat: "braids", caption: "Boho knotless — copper", alt: "Front view of copper-toned boho knotless braids on a smiling client" },
    { file: "assets/img/g6.jpg",  w: 716, h: 692, cat: "waves", caption: "Deep wave, wet finish", alt: "Long deep-wave style worn in a wet look with glossy texture" },
    { file: "assets/img/g4.jpg",  w: 736, h: 778, cat: "braids", caption: "Knotless braids — full length", alt: "Rear view of long black knotless braids reaching the waist" },
    { file: "assets/img/g7.jpg",  w: 764, h: 758, cat: "braids", caption: "Kids' braids with color", alt: "Child wearing braids with a blue accent color" },
    { file: "assets/img/g9.jpg",  w: 768, h: 756, cat: "braids", caption: "Goddess braids — blonde", alt: "Rear view of long blonde goddess braids styled to seat level" },
    { file: "assets/img/g10.jpg", w: 510, h: 724, cat: "braids", caption: "Knotless braids — classic", alt: "Front profile of classic black knotless braids freshly parted and styled" },
    { file: "assets/img/g11.jpg", w: 772, h: 768, cat: "press", caption: "Silk press — in progress", alt: "Stylist silking natural hair to a smooth finish in the salon chair" },
    { file: "assets/img/g12.jpg", w: 694, h: 872, cat: "occasion", caption: "Pearl bridal updo", alt: "Editorial bridal look with a pearl headpiece and a shimmering veil" }
  ],

  /* ---- Reviews ------------------------------------------------------------
     V — authentic excerpts from the salon's public Google reviews. Kept
     verbatim (light typographic cleanup only). Link back to source.       */

  reviews: [
    {
      quote: "Ms. Mays is the truth and looks good while making you do the same!!!",
      name: "Daly Bread",
      source: "Google",
      when: "3 months ago"
    },
    {
      quote: "Had an excellent appointment — quiet, calm atmosphere, wifi and good conversation when prompted. Truly a professional & I can't recommend services here enough.",
      name: "Gabrielle Augustin",
      source: "Google",
      when: "a year ago"
    },
    {
      quote: "She has been taking care of my locs for a year now. She cut my locs from waist to above the shoulder length last year, and I loved the cut. I am very pleased with her service and receive many compliments.",
      name: "Jeneal Woodard",
      source: "Google",
      when: "2 years ago"
    }
  ],

  /* ---- Feature flags ------------------------------------------------------ */

  flags: {
    showServicePrices: false,   // flip true after the salon confirms a price list
    whatsappEnabled: false      // enable only if the salon confirms WhatsApp
  }
};
