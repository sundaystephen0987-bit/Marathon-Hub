export const SITE = {
  name: "Marathon Hub",
  tagline: "A welcoming writing community for every kind of writer.",
  welcome:
    "Join a guided writing marathon where you write consistently, get feedback, and grow alongside fellow writers.",
  colors: {
    primary: "#5b3df5",
    accent: "#f2b84b",
    background: "#faf8f4",
    text: "#1f1b2e",
  },
  // Registration opens in Phase 3. Until then the button goes to the notice section.
  registerUrl: "#registration",
  registrationOpen: false,
  who: [
    "Beginner writers starting out",
    "Authors and ghostwriters",
    "Editors and writing professionals",
    "Anyone curious about writing",
  ],
  announcements: [
    { title: "Next marathon", date: "Dates coming soon", text: "Details will be posted here." },
  ],
  benefits: [
    "Regular writing assignments that build a habit",
    "Feedback from an assigned reviewer",
    "A private dashboard to track your progress",
    "Writing guides and resources",
  ],
  resources: [
    { title: "Beginner guides", text: "Simple starting points for new writers." },
    { title: "Writing prompts", text: "Ideas to beat a blank page." },
    { title: "Templates", text: "Plotting and character tools." },
  ],
  // Put image file paths here later, e.g. "images/hero.jpg". Empty = placeholder shown.
  images: { hero: "", gallery: ["", "", ""] },
  contact: { email: "authoressrasp@gmail.com", whatsapp: "" },
  // Future shop (Phase 12). Keep false for now; nothing is sold yet.
  shopEnabled: false,
};
