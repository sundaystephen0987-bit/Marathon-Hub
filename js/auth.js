import { supabase } from "./supabase-client.js";
import { SITE } from "./site-config.js";

const $ = (id) => document.getElementById(id);

document.title = "Account | " + SITE.name;
$("siteName").textContent = SITE.name;
$("logoMark").textContent = SITE.name.charAt(0);

// Already logged in? Go straight to the dashboard.
const { data: { session } } = await supabase.auth.getSession();
if (session) window.location.href = "dashboard.html";

function show(text, isError) {
  const box = $("message");
  box.textContent = text;
  box.className = "message " + (isError ? "error" : "ok");
}

function setTab(tab) {
  const login = tab === "login";
  $("loginForm").hidden = !login;
  $("signupForm").hidden = login;
  $("tabLogin").classList.toggle("active", login);
  $("tabSignup").classList.toggle("active", !login);
  show("", false);
}
$("tabLogin").onclick = () => setTab("login");
$("tabSignup").onclick = () => setTab("signup");

// Stops double-taps while a request is running
async function busy(form, work) {
  const button = form.querySelector("button[type=submit]");
  button.disabled = true;
  try { await work(); } finally { button.disabled = false; }
}

$("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  busy(e.target, async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: $("loginEmail").value.trim(),
      password: $("loginPassword").value,
    });
    if (error) return show("Email or password is incorrect.", true);
    window.location.href = "dashboard.html";
  });
});

$("signupForm").addEventListener("submit", (e) => {
  e.preventDefault();
  busy(e.target, async () => {
    const { data, error } = await supabase.auth.signUp({
      email: $("signupEmail").value.trim(),
      password: $("signupPassword").value,
      options: { data: { display_name: $("signupName").value.trim() } },
    });
    if (error) return show("Could not create account: " + error.message, true);
    if (data.session) window.location.href = "dashboard.html";
    else show("Account created. Please check your email to confirm it.", false);
  });
});
