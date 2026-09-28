// ZCC — TECH-NOIR / LAB STATUS
const PROGRAMMES = [
  ['01', 'DATA PROTECTION', 'Policy, access control, backup drill. A written programme that keeps the house’s data in the house — and a test that the programme still holds.', 'M12 3l7 3v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6z M9 12l2 2 4-4'],
  ['02', 'SIMULATION', 'A closed range. Live-net conditions copied into a room that is allowed to fail. Staff run the incident before the street does.', 'M2 12h4l2-7 4 14 2-7h6'],
  ['03', 'AUTHORISED TESTING', 'Penetration work under a signed scope. Findings in a file the client can act on. No theatre. No methods on a public page.', 'M12 3v3M12 18v3M3 12h3M18 12h3 M12 8a4 4 0 100 8 4 4 0 000-8z'],
  ['04', 'DEBUG', 'Control, feed, or build broken under load. Isolate the fault. Name it. Close it. Engineering, not a war story.', 'M8 7a4 4 0 018 0v5a4 4 0 01-8 0z M6 10h12M6 14h12M9 5L7 3M15 5l2-2'],
  ['05', 'THREAT ANALYSIS', 'What is on the wire, what it wants, what it already knows. A read the desk can use the same week.', 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z M12 12m-2.5 0a2.5 2.5 0 105 0 2.5 2.5 0 10-5 0'],
  ['06', 'INTELLIGENCE', 'Open-scope collection across the surfaces the public internet already shows. Wide net. Written brief.', 'M12 12V3M12 12l7 4M12 12l-7 4 M12 12m-9 0a9 9 0 1018 0 9 9 0 10-18 0'],
  ['07', 'DIGITAL INFRASTRUCTURE', 'Web and app build for the house. Then on-house authorised testing of those special assets — the thing we shipped is the thing we test, under a signed scope.', 'M12 3l9 5-9 5-9-5z M3 13l9 5 9-5'],
];
const SURFACES = ['WEB', 'MAIL', 'IDENTITY', 'CLOUD EDGES', 'VENDOR PORTALS', 'MOBILE', 'INDUSTRIAL LINKS'];
const MAIL = 'zeusindustries.zy@gmail.com', INFO_MAIL = 'dilhamjafferr@gmail.com';
const reduced = matchMedia('(prefers-reduced-motion:reduce)').matches;

const svg = (d) => `<svg class="cicon" viewBox="0 0 24 24">${d.trim().split(/\s+(?=M)/).map(p => `<path d="${p}"/>`).join('')}</svg>`;

/* seven programme cards (verbatim copy) */
document.getElementById('cards').innerHTML = PROGRAMMES.map(([code, name, body, icon]) => `
  <article class="card reveal">
    <div class="card-top"><span class="card-code">${code}</span>${svg(icon)}</div>
    <div class="card-bot"><div><h3>${name}</h3><p>${body}</p></div><span class="plus">+</span></div>
  </article>`).join('');

/* surfaces chips */
document.getElementById('chips').innerHTML = SURFACES.map(s => `<li>${s}</li>`).join('');

/* marquee — duplicate once for a seamless -50% loop */
const PHRASES = [...PROGRAMMES.map(p => p[1]), ...SURFACES];
document.getElementById('mq').innerHTML = [...PHRASES, ...PHRASES].map(p => `<span>${p}</span><span>◆</span>`).join('');

/* house doors — real mailboxes, tel links */
const bookHref = `mailto:${MAIL}?subject=${encodeURIComponent('ZCC appointment — ' + PROGRAMMES[0][1])}&body=${encodeURIComponent('Programme: \nPreferred day: \nOrganisation: \nWhat is happening: ')}`;
['book', 'book2', 'menuBtn'].forEach(id => { const el = document.getElementById(id); if (el) el.href = bookHref; });

/* frequency — mailto-only, no backend */
document.getElementById('freq').addEventListener('submit', e => {
  e.preventDefault();
  const v = document.getElementById('femail').value.trim();
  if (v) location.href = `mailto:${MAIL}?subject=${encodeURIComponent('ZCC signal — ' + v)}&body=${encodeURIComponent('Signal from: ' + v + '\n')}`;
});

/* reveal */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* nav state + signature lit at the end of the wire */
const root = document.documentElement, nav = document.querySelector('.nav'), sig = document.getElementById('sig');
let ticking = false;
function onScroll() {
  const denom = root.scrollHeight - innerHeight;
  const p = denom > 0 ? Math.min(1, Math.max(0, scrollY / denom)) : 0;
  nav.classList.toggle('stuck', scrollY > 24);
  sig.classList.toggle('lit', p > .985);
  ticking = false;
}
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
onScroll();
document.getElementById('yr').textContent = new Date().getFullYear();

/* the field — 3500-point cyan particle environment that answers the cursor */
(function field() {
  if (typeof THREE === 'undefined') return;
  const cv = document.getElementById('field');
  const renderer = new THREE.WebGLRenderer({ canvas: cv, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);
  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, .1, 100);
  cam.position.z = 2;
  const N = 3500, pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    pos[i * 3] = (Math.random() - .5) * 5;
    pos[i * 3 + 1] = (Math.random() - .5) * 3.4;
    pos[i * 3 + 2] = (Math.random() - .5) * 3 - .4;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({ color: 0x00f3ff, size: .005, transparent: true, opacity: .9, sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false });
  const pts = new THREE.Points(geo, mat);
  scene.add(pts);
  const m = { x: 0, y: 0, tx: 0, ty: 0 };
  addEventListener('pointermove', e => { m.tx = (e.clientX / innerWidth - .5) * 2; m.ty = (e.clientY / innerHeight - .5) * 2; }, { passive: true });
  addEventListener('resize', () => { cam.aspect = innerWidth / innerHeight; cam.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); });
  function frame() {
    m.x += (m.tx - m.x) * .04; m.y += (m.ty - m.y) * .04;
    pts.rotation.y += .0006; pts.rotation.x = m.y * .12;
    cam.position.x = m.x * .35; cam.position.y = -m.y * .25; cam.lookAt(scene.position);
    renderer.render(scene, cam);
    requestAnimationFrame(frame);
  }
  renderer.render(scene, cam);
  if (!reduced) frame();
})();
