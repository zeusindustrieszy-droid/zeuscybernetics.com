// ZCC — THE WIRE ROOM
const PROGRAMMES = [
  ['01 · DATA PROTECTION', 'Policy, access control, backup drill. A written programme that keeps the house’s data in the house — and a test that the programme still holds.'],
  ['02 · SIMULATION', 'A closed range. Live-net conditions copied into a room that is allowed to fail. Staff run the incident before the street does.'],
  ['03 · AUTHORISED TESTING', 'Penetration work under a signed scope. Findings in a file the client can act on. No theatre. No methods on a public page.'],
  ['04 · DEBUG', 'Control, feed, or build broken under load. Isolate the fault. Name it. Close it. Engineering, not a war story.'],
  ['05 · THREAT ANALYSIS', 'What is on the wire, what it wants, what it already knows. A read the desk can use the same week.'],
  ['06 · INTELLIGENCE', 'Open-scope collection across the surfaces the public internet already shows. Wide net. Written brief.'],
  ['07 · DIGITAL INFRASTRUCTURE', 'Web and app build for the house. Then on-house authorised testing of those special assets — the thing we shipped is the thing we test, under a signed scope.'],
];
const SURFACES = ['WEB', 'MAIL', 'IDENTITY', 'CLOUD EDGES', 'VENDOR PORTALS', 'MOBILE', 'INDUSTRIAL LINKS'];
const MAIL = 'zeusindustries.zy@gmail.com', INFO_MAIL = 'dilhamjafferr@gmail.com';
const reduced = matchMedia('(prefers-reduced-motion:reduce)').matches;

/* programme rows (verbatim copy) */
document.getElementById('rows').innerHTML = PROGRAMMES.map(([t, b]) => `
  <div class="row reveal" tabindex="0" data-n="${t.split(' · ')[0]}" data-name="${t.split(' · ')[1]}"
    ><div class="idx">${t.split(' · ')[0]}</div>
  <div><h3>${t.split(' · ')[1]}</h3><p>${b}</p></div><span class="plus">+</span></div>`).join('');
document.querySelectorAll('.row').forEach(r => r.addEventListener('click', () => r.classList.toggle('open')));

/* surfaces ticker */
document.getElementById('tick').innerHTML =
  [...SURFACES, ...SURFACES, ...SURFACES, ...SURFACES].map(s => `<span>${s}</span>`).join('');

/* house doors — real mailboxes, tel links */
document.getElementById('book').href = `mailto:${MAIL}?subject=${encodeURIComponent('ZCC appointment — ') + PROGRAMMES[0][0]}&body=${encodeURIComponent('Programme: \nPreferred day: \nOrganisation: \nWhat is happening: ')}`;
document.getElementById('call').href = 'tel:+256730078031';

/* reveal */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* scramble-decode on view */
const GLYPHS = '▚▞◆▚/\\|_=+*#01';
function scramble(el) {
  const final = el.textContent; let f = 0;
  const steps = 14;
  const t = setInterval(() => {
    f++;
    el.textContent = final.split('').map((c, i) =>
      c === ' ' ? ' ' : i < (f / steps) * final.length ? c : GLYPHS[Math.random() * GLYPHS.length | 0]).join('');
    if (f >= steps) { clearInterval(t); el.textContent = final; }
  }, 45);
}
if (!reduced) {
  const so = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { scramble(e.target); so.unobserve(e.target); } }), { threshold: .8 });
  document.querySelectorAll('[data-scramble]').forEach(el => so.observe(el));
}

/* the rail — one wire, the scroll pulse travels it and arrives at the signature */
const root = document.documentElement;
const sig = document.getElementById('sig');
let ticking = false;
function rail() {
  const p = Math.min(1, Math.max(0, scrollY / (root.scrollHeight - innerHeight)));
  root.style.setProperty('--sp', p.toFixed(4));
  sig.classList.toggle('lit', p > .985);
  ticking = false;
}
if (!reduced) {
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(rail); } }, { passive: true });
  rail();
}

/* the seven — sticky index tracks whichever row crosses centre */
const bigNum = document.getElementById('bigNum');
const progName = document.getElementById('progName');
const barFill = document.getElementById('barFill');
let curK = 0;
function setK(k, name) {
  if (k === curK) return;
  curK = k;
  bigNum.textContent = String(k + 1).padStart(2, '0');
  progName.textContent = name;
  barFill.style.setProperty('--k', k + 1);
  bigNum.classList.remove('snap'); void bigNum.offsetWidth; bigNum.classList.add('snap');
}
const ko = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) {
    e.target.classList.add('active');
    setK(+e.target.dataset.n - 1, e.target.dataset.name);
  } else e.target.classList.remove('active');
}), { rootMargin: '-45% 0px -45% 0px' });
document.querySelectorAll('.row').forEach(r => ko.observe(r));

/* the wire — node constellation that answers the cursor */
const cv = document.getElementById('wire'), cx = cv.getContext('2d');
let W, H, N, nodes = [];
const DPR = devicePixelRatio;
const mouse = { x: -1e4, y: -1e4 };
addEventListener('pointermove', e => { mouse.x = e.clientX * DPR; mouse.y = e.clientY * DPR; }, { passive: true });
addEventListener('pointerdown', e => {
  const mx = e.clientX * DPR, my = e.clientY * DPR;
  for (const n of nodes) {
    const dx = n.x - mx, dy = n.y - my, d = Math.hypot(dx, dy);
    if (d < 220 * DPR && d > 0) { n.vx += dx / d * 2.2 * DPR; n.vy += dy / d * 2.2 * DPR; }
  }
}, { passive: true });
function resize() {
  W = cv.width = innerWidth * DPR; H = cv.height = innerHeight * DPR;
  N = Math.min(80, innerWidth / 20 | 0);
  nodes = Array.from({ length: N }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    vx: (Math.random() - .5) * .18 * DPR, vy: (Math.random() - .5) * .18 * DPR,
  }));
}
resize(); addEventListener('resize', resize);
const LINK = 130 * DPR, REPEL = 120 * DPR;
function draw() {
  cx.clearRect(0, 0, W, H);
  for (const n of nodes) {
    const dx = n.x - mouse.x, dy = n.y - mouse.y, d = Math.hypot(dx, dy) || 1;
    if (d < REPEL) { const f = (1 - d / REPEL) * .35; n.vx += dx / d * f; n.vy += dy / d * f; }
    n.vx *= .986; n.vy *= .986;
    const s = Math.hypot(n.vx, n.vy);
    if (s < .06 * DPR) { n.vx += (Math.random() - .5) * .02 * DPR; n.vy += (Math.random() - .5) * .02 * DPR; }
    n.x += n.vx; n.y += n.vy;
    if (n.x < 0 || n.x > W) n.vx *= -1;
    if (n.y < 0 || n.y > H) n.vy *= -1;
  }
  cx.lineWidth = DPR;
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
    const a = nodes[i], b = nodes[j], dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
    if (d < LINK) {
      const near = Math.hypot((a.x + b.x) / 2 - mouse.x, (a.y + b.y) / 2 - mouse.y) < REPEL;
      cx.strokeStyle = near ? `rgba(196,163,90,${(1 - d / LINK) * .5})` : `rgba(196,163,90,${(1 - d / LINK) * .16})`;
      cx.beginPath(); cx.moveTo(a.x, a.y); cx.lineTo(b.x, b.y); cx.stroke();
    }
  }
  for (const n of nodes) {
    const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
    cx.fillStyle = d < REPEL ? 'rgba(196,163,90,.9)' : 'rgba(239,234,224,.5)';
    cx.beginPath(); cx.arc(n.x, n.y, (d < REPEL ? 1.8 : 1) * DPR, 0, 7); cx.fill();
  }
}
function tick() { draw(); requestAnimationFrame(tick); }
draw(); if (!reduced) tick();
