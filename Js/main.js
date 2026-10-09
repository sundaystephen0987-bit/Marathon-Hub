import { SITE } from "./site-config.js";

const $ = (id) => document.getElementById(id);

// Safe helper: uses textContent, never raw HTML.
function make(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

// Colors
const root = document.documentElement.style;
root.setProperty("--primary", SITE.colors.primary);
root.setProperty("--accent", SITE.colors.accent);
root.setProperty("--bg", SITE.colors.background);
root.setProperty("--text", SITE.colors.text);

// Name and text
document.title = SITE.name;
$("siteName").textContent = SITE.name;
$("logoMark").textContent = SITE.name.charAt(0);
$("heroTitle").textContent = SITE.tagline;
$("welcome").textContent = SITE.welcome;
$("footerName").textContent = "© " + new Date().getFullYear() + " " + SITE.name;

// Register buttons
["registerBtn", "registerBtnTop"].forEach((id) => ($(id).href = SITE.registerUrl));
$("registrationText").textContent = SITE.registrationOpen
  ? "Registration is open. Tap the button above to apply."
  : "Registration is not open yet. Please join our waiting group and check back soon.";

// Lists
SITE.who.forEach((t) => $("who").append(make("li", "card", t)));
SITE.benefits.forEach((t) => $("benefits").append(make("li", "", t)));
SITE.resources.forEach((r) => {
  const li = make("li", "card");
  li.append(make("strong", "", r.title), make("span", "", r.text));
  $("resources").append(li);
});
SITE.announcements.forEach((a) => {
  const box = make("article", "card");
  box.append(make("strong", "", a.title), make("small", "", a.date), make("span", "", a.text));
  $("announcements").append(box);
});

// Images: show your picture if a path is set, otherwise a placeholder
function fillSlot(slot, src, label) {
  if (src) {
    const img = document.createElement("img");
    img.src = src;
    img.alt = label;
    img.loading = "lazy";
    slot.append(img);
  } else {
    slot.classList.add("placeholder");
    slot.append(make("span", "", "Your picture here"));
  }
}
fillSlot($("heroImage"), SITE.images.hero, "Marathon hero picture");
SITE.images.gallery.forEach((src, i) => {
  const slot = make("div", "img-slot");
  fillSlot(slot, src, "Community picture " + (i + 1));
  $("gallery").append(slot);
});

// Contact (only shown if you filled it in)
const parts = [];
if (SITE.contact.email) parts.push("Email: " + SITE.contact.email);
if (SITE.contact.whatsapp) parts.push("WhatsApp: " + SITE.contact.whatsapp);
$("contact").textContent = parts.length ? parts.join(" · ") : "Contact details coming soon.";

// Gentle fade-in on scroll
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("show"); io.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("show"));
    }
