const $ = (s, all) => all ? document.querySelectorAll(s) : document.querySelector(s);
const navbar = $(".navbar"), hero = $(".hero"), bar = $(".progress"), toTop = $(".to-top");
const nav = $(".nav-links"), burger = $(".hamburger");

/* scroll: navbar, progress bar, back-to-top, hero parallax */
function onScroll() {
  const y = window.scrollY, max = document.documentElement.scrollHeight - innerHeight;
  navbar.classList.toggle("scrolled", y > 40);
  bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  toTop.classList.toggle("show", y > 600);
  if (y < innerHeight) hero.style.backgroundPosition = `center, center calc(20% + ${y * 0.06}px)`;
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();
toTop.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

/* mobile menu */
burger.addEventListener("click", () => nav.classList.toggle("open"));
$(".nav-links a", true).forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

/* typewriter */
const titles = ["AI & Data Science Student", "Future AI Engineer", "Developer", "Problem Solver", "Tech Explorer"];
const el = $("#typing-text");
let t = 0, c = 0, del = false;
(function type() {
  const word = titles[t];
  el.textContent = word.slice(0, del ? --c : ++c);
  let delay = del ? 35 : 75;
  if (!del && c === word.length) { del = true; delay = 1600; }
  else if (del && c === 0) { del = false; t = (t + 1) % titles.length; delay = 350; }
  setTimeout(type, delay);
})();

/* active nav link */
const links = $(".nav-links a", true);
const spy = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
}), { rootMargin: "-45% 0px -50% 0px" });
$("section[id]", true).forEach(s => spy.observe(s));

/* reveal on scroll */
const rev = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("show"); rev.unobserve(e.target); }
}), { threshold: 0.12 });
$(".reveal", true).forEach(x => rev.observe(x));

/* card spotlight + button ripple */
$(".spot", true).forEach(card => card.addEventListener("mousemove", e => {
  const r = card.getBoundingClientRect();
  card.style.setProperty("--x", e.clientX - r.left + "px");
  card.style.setProperty("--y", e.clientY - r.top + "px");
}));
$(".btn", true).forEach(b => b.addEventListener("mousemove", e => {
  const r = b.getBoundingClientRect();
  b.style.setProperty("--mx", e.clientX - r.left + "px");
  b.style.setProperty("--my", e.clientY - r.top + "px");
}));

/* cursor glow (mouse devices only) */
const glow = $(".cursor-glow");
if (matchMedia("(pointer:fine)").matches) {
  addEventListener("mousemove", e => { glow.style.left = e.clientX + "px"; glow.style.top = e.clientY + "px"; });
} else glow.remove();

/* copy email */
const copy = $("#copy-email");
copy.addEventListener("click", async () => {
  try { await navigator.clipboard.writeText("riteshyadav91724@gmail.com"); } catch (_) {}
  const s = copy.querySelector("span");
  s.textContent = "Copied ✓";
  setTimeout(() => (s.textContent = "Copy email"), 1800);
});

console.log("%cRitesh Yadav | Portfolio", "color:#9b9dfb;font-size:18px;font-weight:bold;");