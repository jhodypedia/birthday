/* CONFIG */
const config = {
  name: "Indah Septiana Ayu Lestari",
  shortName: "Septiana",
  sender: "Jhodi",          // <-- ganti dengan namamu
  yearsTogether: 5,
  daysCounter: 1825,            // angka dekoratif (5 x 365), boleh diubah
  music: "./asset/music/birthday.mp3"
};

// Tambah / ubah foto di sini. Foto belum ada = placeholder elegan otomatis.
const memories = [
  { image: "https://i.ibb.co.com/dzCf5tg/14d5fac6-1357-4dc4-a717-36c33e9d4911.jpg", title: "Awal Cerita", description: "Salah satu awal dari perjalanan kita." },
  { image: "https://i.ibb.co.com/prfG26mG/7761-BAFB-0-AC0-4-CD7-B39-A-3-BFFE1-F35579.jpg", title: "Hari yang Indah", description: "Sebuah momen sederhana yang selalu aku ingat." },
  { image: "https://i.ibb.co.com/jPxNzkqP/468-A82-A6-A6-A9-4386-B94-C-C01-C191789-F9.jpg", title: "Kita", description: "Tidak sempurna, tapi selalu berusaha." },
  { image: "https://i.ibb.co.com/vCY0gFnS/2657dbcd-5d34-4fba-a288-cf13a2dd25c8.jpg", title: "Bersama", description: "Satu lagi kenangan yang ingin aku simpan." },
  { image: "https://i.ibb.co.com/Q7tr1DSH/eea74a91-0b5e-47f4-9097-ac858b9311ce.jpg", title: "Tetap di Sini", description: "Masih bersama, sampai hari ini." }
];

// Ubah kalimat perjalanan sesuai ceritamu sendiri.
const timeline = [
  ["Awal", "Semuanya dimulai dari dua orang yang belum tahu akan sejauh apa cerita ini berjalan."],
  ["Belajar Saling Memahami", "Pelan-pelan, kita belajar mengenal cara masing-masing."],
  ["Melewati Banyak Hal", "Ada hari yang ringan, ada hari yang berat. Kita lewati keduanya."],
  ["Bertumbuh Bersama", "Bukan hanya bertambah usia, tapi juga bertambah mengerti."],
  ["Tetap Memilih Satu Sama Lain", "Di saat mudah maupun sulit, kita tetap memilih."],
  ["Hari Ini", "Lima tahun sudah, dan hari ini adalah harimu."],
  ["Masih Bersama", "Dan cerita ini belum selesai."]
];

const letter = [
  "Untuk {short},",
  "Selamat ulang tahun.",
  "Terima kasih karena sudah berjalan bersamaku selama lima tahun.",
  "Terima kasih untuk semua tawa, semua cerita, semua kesabaran, semua pengertian, dan bahkan semua perdebatan yang akhirnya membuat kita belajar.",
  "Aku tahu perjalanan kita tidak selalu mudah. Tapi kalau aku boleh memilih lagi dari awal... aku tetap ingin mengenalmu. Aku tetap ingin bertemu denganmu. Aku tetap ingin menjalani cerita ini bersamamu.",
  "Semoga di usia yang baru ini, kamu mendapatkan lebih banyak hal yang membuatmu bahagia. Semoga langkahmu selalu dipermudah. Semoga semua impianmu perlahan menjadi kenyataan.",
  "Dan semoga aku masih bisa menjadi seseorang yang menemani perjalananmu di tahun-tahun berikutnya.",
  "Selamat ulang tahun, {short}.",
  "Terima kasih sudah menjadi bagian paling berarti dari perjalanan lima tahun ini.",
  "❤️"
];

/* DOM */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const isMobile = () => window.innerWidth < 700;
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const wait = ms => new Promise(r => setTimeout(r, ms));

function fillNames() {
  $$("[data-name]").forEach(el => {
    const t = { short: config.shortName, full: config.name, sender: config.sender }[el.dataset.name];
    if (el.hasAttribute("data-upper")) el.innerHTML = t.toUpperCase() + ' <i class="bi bi-heart-fill"></i>'; else el.textContent = t;
  });
}

/* LOADING */
window.addEventListener("load", () => { window.scrollTo(0, 0); });

/* MUSIC */
const music = (() => {
  const box = $("#music"), btn = $("#musicBtn"), vol = $("#vol");
  let audio = null, ok = true;
  const setPlaying = p => box.classList.toggle("playing", p);
  function init() {
    if (audio) return;
    try {
      audio = new Audio(config.music);
      audio.loop = true; audio.volume = +vol.value;
      audio.addEventListener("error", () => { ok = false; box.classList.add("hidden"); });
    } catch (e) { ok = false; }
  }
  function play() {
    init(); if (!ok || !audio) return;
    box.classList.remove("hidden");
    const p = audio.play();
    if (p && p.then) p.then(() => setPlaying(true)).catch(() => setPlaying(false));
  }
  btn.addEventListener("click", () => {
    init(); if (!ok || !audio) return;
    if (audio.paused) play(); else { audio.pause(); setPlaying(false); }
  });
  vol.addEventListener("input", () => { if (audio) audio.volume = +vol.value; });
  return { play };
})();

/* PARTICLES */
function initParticles() {
  const c = $("#particles"), ctx = c.getContext("2d");
  let W, H, list = [], dpr = Math.min(devicePixelRatio || 1, 2), raf;
  const kinds = ["star", "dot", "dot", "spark", "heart"];
  const make = () => ({
    x: Math.random() * W, y: Math.random() * H, r: Math.random() * 2 + 1,
    vy: -(Math.random() * .25 + .05), vx: (Math.random() - .5) * .15,
    a: Math.random() * .6 + .2, t: Math.random() * 6, k: kinds[(Math.random() * kinds.length) | 0],
    col: Math.random() > .5 ? "232,164,184" : "217,179,130"
  });
  function resize() {
    W = innerWidth; H = innerHeight; c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = isMobile() ? 24 : 60; while (list.length < n) list.push(make()); list.length = n;
  }
  function heart(x, y, s) {
    ctx.beginPath(); ctx.moveTo(x, y + s * .3);
    ctx.bezierCurveTo(x, y - s * .3, x - s, y - s * .3, x - s, y + s * .3);
    ctx.bezierCurveTo(x - s, y + s * .8, x, y + s * 1.1, x, y + s * 1.4);
    ctx.bezierCurveTo(x, y + s * 1.1, x + s, y + s * .8, x + s, y + s * .3);
    ctx.bezierCurveTo(x + s, y - s * .3, x, y - s * .3, x, y + s * .3); ctx.fill();
  }
  function frame() {
    ctx.clearRect(0, 0, W, H);
    for (const p of list) {
      p.t += .02; p.x += p.vx; p.y += p.vy;
      if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
      const al = p.a * (.6 + .4 * Math.sin(p.t));
      ctx.fillStyle = `rgba(${p.col},${al})`; ctx.strokeStyle = ctx.fillStyle;
      if (p.k === "heart") heart(p.x, p.y, p.r * 1.6);
      else if (p.k === "star" || p.k === "spark") {
        const s = p.r * 2.5; ctx.beginPath(); ctx.moveTo(p.x - s, p.y); ctx.lineTo(p.x + s, p.y); ctx.moveTo(p.x, p.y - s); ctx.lineTo(p.x, p.y + s); ctx.stroke();
      } else { ctx.shadowBlur = 12; ctx.shadowColor = `rgb(${p.col})`; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill(); ctx.shadowBlur = 0; }
    }
    raf = requestAnimationFrame(frame);
  }
  resize(); addEventListener("resize", resize);
  document.addEventListener("visibilitychange", () => { cancelAnimationFrame(raf); if (!document.hidden) frame(); });
  frame();
}

/* HERO */
function initHero() {
  const lines = ["Lima tahun...", "Bukan waktu yang sebentar.", "Dan ternyata,<br>selama itu juga kamu tetap menjadi<br>seseorang yang ingin aku perjuangkan."];
  const box = $("#intro"), end = $("#heroEnd");
  $("#startBtn").addEventListener("click", () => {
    music.play();
    $("#cerita").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  });
  const showEnd = () => {
    document.body.classList.remove("locked"); end.classList.add("show");
    if (window.gsap) gsap.from("#heroEnd > *", { y: 30, opacity: 0, filter: "blur(12px)", duration: 1.6, stagger: .35, ease: "power3.out" });
  };
  if (!window.gsap) { showEnd(); return; }
  const tl = gsap.timeline({ delay: .4, onComplete: showEnd });
  tl.timeScale(reduceMotion ? 1.6 : 1);
  lines.forEach(l => {
    const s = document.createElement("span"); s.innerHTML = l; box.appendChild(s);
    tl.fromTo(s, { opacity: 0, filter: "blur(16px)", letterSpacing: "0.4em", scale: 1.06 },
      { opacity: 1, filter: "blur(0px)", letterSpacing: "0.04em", scale: 1, duration: 2.2, ease: "power3.out" })
      .to(s, { opacity: 0, filter: "blur(10px)", duration: 1, delay: l.length > 40 ? 2.6 : 1.2 });
  });
}

/* GALLERY */
function initGallery() {
  const g = $("#gallery");
  memories.forEach((m, i) => {
    const f = document.createElement("figure");
    f.setAttribute("data-aos", "zoom-in"); f.setAttribute("data-aos-delay", (i % 3) * 120); f.tabIndex = 0; f.dataset.cursor = "view";
    f.innerHTML = `<figcaption>${m.title}</figcaption>`;
    f.prepend(makeImg(m, i));
    f.addEventListener("click", () => openLightbox(i));
    f.addEventListener("keydown", e => { if (e.key === "Enter") openLightbox(i); });
    g.appendChild(f);
  });
}
function makeImg(m, i, eager) {
  const img = new Image();
  img.alt = m.title; img.decoding = "async"; if (!eager) img.loading = "lazy";
  img.style.setProperty("--r", ["4/5", "1/1", "3/4", "5/4"][i % 4]);
  img.onerror = () => { const p = document.createElement("div"); p.className = "ph"; p.style.setProperty("--r", ["4/5", "1/1", "3/4", "5/4"][i % 4]); p.textContent = m.title; img.replaceWith(p); };
  img.src = m.image; return img;
}

/* LIGHTBOX */
let lbIndex = 0, lastFocus = null;
function openLightbox(i) {
  lastFocus = document.activeElement; lbIndex = i; $("#lightbox").classList.add("open"); document.body.classList.add("locked"); showLb();
  $("#lbClose").focus();
}
function closeLightbox() { $("#lightbox").classList.remove("open"); document.body.classList.remove("locked"); if (lastFocus) lastFocus.focus(); }
function showLb() {
  const m = memories[lbIndex];
  const box = $("#lbImg"); box.innerHTML = ""; box.appendChild(makeImg(m, lbIndex, true));
  $("#lbTitle").textContent = m.title; $("#lbDesc").textContent = m.description; $("#lbCount").textContent = `${lbIndex + 1} / ${memories.length}`;
}
const lbStep = d => { lbIndex = (lbIndex + d + memories.length) % memories.length; showLb(); };
function initLightbox() {
  const lb = $("#lightbox");
  $("#lbClose").onclick = closeLightbox; $("#lbPrev").onclick = () => lbStep(-1); $("#lbNext").onclick = () => lbStep(1);
  lb.addEventListener("click", e => { if (e.target === lb) closeLightbox(); });
  document.addEventListener("keydown", e => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox(); if (e.key === "ArrowLeft") lbStep(-1); if (e.key === "ArrowRight") lbStep(1);
  });
  let sx = 0;
  lb.addEventListener("touchstart", e => { sx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", e => { const d = e.changedTouches[0].clientX - sx; if (Math.abs(d) > 50) lbStep(d < 0 ? 1 : -1); }, { passive: true });
}

/* TIMELINE */
function initTimeline() {
  const t = $("#timeline");
  timeline.forEach(([h, p]) => { const d = document.createElement("div"); d.className = "tl-item"; d.setAttribute("data-aos", "fade-right"); d.innerHTML = `<h3>${h}</h3><p>${p}</p>`; t.appendChild(d); });
}

/* SCROLL ANIMATION */
function initScrollAnimations() {
  if (window.AOS) AOS.init({ once: true, duration: reduceMotion ? 700 : 1400, offset: 90, easing: "ease-out-cubic", });
  else $$("[data-aos]").forEach(e => e.classList.add("aos-animate"));
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    if (e.target.classList.contains("count")) runCounter();
    else setTimeout(() => fx.burst(innerWidth / 2, innerHeight / 2, 120), 1200);
  }), { threshold: .5 });
  io.observe($(".count")); io.observe($("#finalSign"));
  const fill = $("#tlFill"), tl = $("#timeline"), glows = $$("[data-p]");
  let tick = false;
  addEventListener("scroll", () => {
    if (tick) return; tick = true;
    requestAnimationFrame(() => {
      const r = tl.getBoundingClientRect(), p = Math.min(1, Math.max(0, (innerHeight * .6 - r.top) / r.height));
      fill.style.height = p * 100 + "%";
      if (!isMobile()) glows.forEach(g => g.style.transform = `translate3d(0,${scrollY * g.dataset.p}px,0)`);
      tick = false;
    });
  }, { passive: true });
}
function runCounter() {
  const el = $("#counter"), dur = 2600, t0 = performance.now();
  (function step(now) {
    const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(config.daysCounter * e).toLocaleString("id-ID");
    if (p < 1) requestAnimationFrame(step);
  })(t0);
}

/* LOVE LETTER */
function initLetter() {
  const modal = $("#letterModal"), txt = $("#letterText"), env = $("#envelope");
  $("#openLetter").addEventListener("click", async () => {
    env.classList.add("open"); fx.burst(innerWidth / 2, innerHeight * .5, 40);
    await wait(reduceMotion ? 0 : 1500);
    txt.innerHTML = letter.map(l => `<p>${l.replace(/{short}/g, config.shortName)}</p>`).join("");
    modal.classList.add("open"); modal.setAttribute("aria-hidden", "false"); document.body.classList.add("locked");
    $$("p", txt).forEach((p, i) => setTimeout(() => p.classList.add("in"), 500 + i * 900));
    $("#closeLetter").focus();
  });
  const close = () => { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); document.body.classList.remove("locked"); env.classList.remove("open"); };
  $("#closeLetter").onclick = close;
  modal.addEventListener("click", e => { if (e.target === modal) close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && modal.classList.contains("open")) close(); });
}

/* CAKE */
function initCake() {
  const cake = $("#cake"), btn = $("#blowBtn");
  btn.addEventListener("click", () => {
    if (cake.classList.contains("out")) return;
    cake.classList.add("out"); btn.disabled = true; btn.style.opacity = .4;
    const r = cake.getBoundingClientRect();
    fx.burst(r.left + r.width / 2, r.top, 110);
    $("#wish").classList.add("show");
    document.body.style.transition = "background 2s"; document.body.style.background = "#150c26";
  });
}

/* CONFETTI (canvas-confetti, CDN) */
const fx = (() => {
  const colors = ["#e8a4b8", "#d9b382", "#fff6f0", "#f2c4d0", "#ffd98a"];
  const heart = window.confetti && confetti.shapeFromText ? confetti.shapeFromText({ text: "❤", scalar: 2 }) : null;
  function burst(x, y, n) {
    if (!window.confetti) return;
    const o = { particleCount: n, spread: 360, startVelocity: 38, ticks: 220, gravity: .9, zIndex: 90, origin: { x: x / innerWidth, y: y / innerHeight } };
    confetti({ ...o, colors });
    if (heart) confetti({ ...o, particleCount: Math.round(n / 5), shapes: [heart], scalar: 2 });
  }
  return { burst };
})();

/* GIFT */
function initGift() {
  const gift = $("#gift"), btn = $("#giftBtn");
  btn.addEventListener("click", async () => {
    if (gift.classList.contains("open")) return;
    gift.classList.add("open", "animate__animated", "animate__tada"); btn.disabled = true; btn.style.opacity = .4;
    await wait(reduceMotion ? 0 : 700);
    const r = gift.getBoundingClientRect();
    fx.burst(r.left + r.width / 2, r.top + 20, 160);
    setTimeout(() => fx.burst(innerWidth * .2, innerHeight * .4, 60), 500);
    setTimeout(() => fx.burst(innerWidth * .8, innerHeight * .4, 60), 800);
    $("#giftMsg").classList.add("show");
    setTimeout(() => $("#giftMsg").scrollIntoView({ behavior: "smooth", block: "center" }), 600);
  });
}

/* NAVIGATION */
function initNavigation() {
  const nav = $("#nav"), links = $$("#nav a");
  $("#menuBtn").addEventListener("click", () => nav.classList.toggle("open"));
  links.forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(a => a.classList.toggle("active", a.dataset.s === e.target.id));
  }), { rootMargin: "-45% 0px -45% 0px" });
  ["home", "cerita", "kenangan", "surat", "harapan"].forEach(id => io.observe(document.getElementById(id)));
}

/* CURSOR */
function initCursor() {
  if (!matchMedia("(hover:hover) and (pointer:fine)").matches) return;
  document.body.classList.add("has-cursor");
  const cur = $("#cursor"), trail = $("#cursorTrail"); let x = 0, y = 0, tx = 0, ty = 0;
  addEventListener("mousemove", e => {
    x = e.clientX; y = e.clientY; cur.style.transform = `translate(${x}px,${y}px)`;
    const t = e.target.closest ? e.target : document.body;
    const fig = t.closest("figure[data-cursor]"), btn = t.closest("button,a");
    cur.classList.toggle("view", !!fig); cur.classList.toggle("big", !!btn && !fig);
    cur.firstElementChild.textContent = fig ? "LIHAT" : "";
    const m = t.closest(".magnet");
    $$(".magnet").forEach(b => { if (b !== m) b.style.transform = ""; });
    if (m) { const r = m.getBoundingClientRect(); m.style.transform = `translate(${(x - r.left - r.width / 2) * .2}px,${(y - r.top - r.height / 2) * .3}px)`; }
  });
  (function loop() { tx += (x - tx) * .15; ty += (y - ty) * .15; trail.style.transform = `translate(${tx}px,${ty}px)`; requestAnimationFrame(loop); })();
}

/* ATMOSPHERE (bokeh, light rays, mouse parallax) */
function initAtmosphere() {
  const hero = $("#home"), layer = document.createElement("div");
  layer.className = "atmos"; layer.setAttribute("aria-hidden", "true");
  layer.innerHTML = '<div class="rays"></div>';
  const n = isMobile() ? 8 : 16;
  for (let i = 0; i < n; i++) {
    const b = document.createElement("i"), s = 30 + Math.random() * 90;
    b.className = "bokeh";
    b.style.cssText = `width:${s}px;height:${s}px;left:${Math.random() * 100}%;top:${Math.random() * 100}%;animation-duration:${8 + Math.random() * 10}s;animation-delay:${-Math.random() * 10}s;--c:${Math.random() > .5 ? "232,164,184" : "217,179,130"}`;
    layer.appendChild(b);
  }
  hero.prepend(layer);
  if (!isMobile()) hero.addEventListener("mousemove", e => {
    const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
    layer.style.transform = `translate3d(${x * -30}px,${y * -20}px,0)`;
    $("#heroEnd").style.transform = `translate3d(${x * 12}px,${y * 8}px,0)`;
  });
}

/* INITIALIZATION */
document.addEventListener("DOMContentLoaded", () => {
  fillNames(); initParticles(); initGallery(); initTimeline(); initLightbox();
  initScrollAnimations(); initLetter(); initCake(); initGift(); initNavigation(); initCursor(); initAtmosphere();
  initHero();
});
