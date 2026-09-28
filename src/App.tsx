import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

const POSTER = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260912_105822_bf7c2d53-9957-4521-bbbf-7c1ab7a70130.png'
const VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260912_105953_21ad8049-9088-4a00-bad3-aee6b5575a2b.mp4'
const BOOK_MAIL = 'mailto:zeusindustries.zy@gmail.com?subject=ZCC%20appointment'
const MEET_MAIL = 'mailto:dilhamjafferr@gmail.com?subject=ZCC%20signal'

const PROGRAMMES: [string, string][] = [
  ['01', 'Data Protection'],
  ['02', 'Simulation'],
  ['03', 'Authorised Testing'],
  ['04', 'Debug'],
  ['05', 'Threat Analysis'],
  ['06', 'Intelligence'],
  ['07', 'Digital Infrastructure'],
]

const v = (o: Record<string, string | number>) => o as CSSProperties

const Chevron = () => (
  <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="m6.6 3.6 6 5.4-6 5.4" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function App() {
  const [open, setOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Entrance timeline — runs once on mount, then removes the pre-state.
  useEffect(() => {
    const d = document.documentElement
    if (!d.classList.contains('pre')) return
    const EXPO = 'cubic-bezier(.16,1,.3,1)', SOFT = 'cubic-bezier(.22,.7,.25,1)', GLASS = 'cubic-bezier(.2,.75,.28,1)'
    const s = matchMedia('(max-width: 640px)').matches ? 0.86 : 1
    const running: Animation[] = []
    const q = (sel: string) => document.querySelector(sel)
    const qa = (sel: string) => document.querySelectorAll(sel)
    const animate = (el: Element | null, kf: Keyframe[], dur: number, delay: number, ease: string) => {
      if (el && 'animate' in el) running.push((el as HTMLElement).animate(kf, { duration: dur * s, delay: delay * s, easing: ease, fill: 'both' }))
    }
    const lift = (sel: string, delay: number, dist = '.7em', dur = 560) =>
      animate(q(sel), [{ opacity: 0, transform: `translateY(${dist})` }, { opacity: 1, transform: 'translateY(0)' }], dur, delay, SOFT)
    const settle = (sel: string, delay: number, dur = 760, from = 0.985, dist = '1.1em') =>
      animate(q(sel), [{ opacity: 0, transform: `translateY(${dist}) scale(${from})` }, { opacity: 1, transform: 'translateY(0) scale(1)' }], dur, delay, GLASS)
    const rise = (el: Element | null, delay: number, dur: number) =>
      animate(el, [{ clipPath: 'inset(100% 0 -14% 0)', transform: 'translateY(.16em)' }, { clipPath: 'inset(-18% 0 -14% 0)', transform: 'translateY(0)' }], dur, delay, EXPO)
    const liftEl = (el: Element | null, delay: number) =>
      animate(el, [{ opacity: 0, transform: 'translateY(.55em)' }, { opacity: 1, transform: 'translateY(0)' }], 520, delay, SOFT)

    const h1 = qa('h1 .sx'), nums = qa('.num'), lbls = qa('.lbl'), rows = qa('.p-row')
    lift('.brand', 60, '.55em', 600); settle('.nav', 150, 700, 0.99, '.5em'); settle('.cta', 200, 700, 0.985, '.5em'); settle('.burger', 150, 700, 0.9, '.4em')
    lift('.eyebrow', 300, '.8em', 520)
    rise(h1[0], 380, 980); rise(h1[1], 470, 980)
    settle('.play', 720, 640, 0.88, '.3em'); lift('.tag', 770, '.7em', 560); settle('.panel', 800, 880, 0.982, '1.4em')
    animate(q('.shield'), [{ transform: 'scale(.86)' }, { transform: 'scale(1)' }], 700, 1020, EXPO)
    animate(q('.dot'), [{ transform: 'scale(0)' }, { transform: 'scale(1)' }], 520, 1080, EXPO)
    rows.forEach((r, i) => liftEl(r, 860 + i * 70))
    rise(nums[0], 920, 860); rise(nums[1], 990, 860)
    liftEl(lbls[0], 1030); liftEl(lbls[1], 1075)
    animate(q('.slash'), [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], 700, 1010, EXPO)
    settle('.meet', 1140, 820, 0.985, '1.2em')

    Promise.all(running.map((a) => a.finished.catch(() => {}))).then(() => {
      d.classList.remove('pre'); running.forEach((a) => a.cancel()); running.length = 0
    })
  }, [])

  // Burger: close on outside click, Escape, or landscape.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (!t.closest('#site-menu') && !t.closest('.burger')) setOpen(false)
    }
    const mq = matchMedia('(min-aspect-ratio: 1/1)')
    const onMq = (e: MediaQueryListEvent) => { if (e.matches) setOpen(false) }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    mq.addEventListener('change', onMq)
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('click', onClick); mq.removeEventListener('change', onMq) }
  }, [open])

  // Video plate: respect reduced motion, live + on visibility.
  useEffect(() => {
    const el = videoRef.current; if (!el) return
    const mq = matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => { if (mq.matches) { el.pause(); el.currentTime = 0 } else el.play().catch(() => {}) }
    const onVis = () => { if (!document.hidden) sync() }
    mq.addEventListener('change', sync)
    document.addEventListener('visibilitychange', onVis)
    el.addEventListener('canplay', sync)
    sync()
    return () => { mq.removeEventListener('change', sync); document.removeEventListener('visibilitychange', onVis); el.removeEventListener('canplay', sync) }
  }, [])

  return (
    <div className="page">
      <div className="card">
        <video ref={videoRef} className="bg" autoPlay muted loop playsInline preload="auto" disablePictureInPicture aria-hidden="true" poster={POSTER} src={VIDEO} />
        <div className="tint" aria-hidden="true" />
        <div className="stack">

          <div className="row">
            <a className="brand l t" style={v({ '--x': 68, '--y': 47 })} href="#top">
              <span className="mark">
                <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
                  <circle cx="20" cy="20" r="18.4" stroke="#0d1b30" strokeWidth="1.4" />
                  <path d="M22 8 12 22h6l-1 10 10-14h-6z" fill="#0d1b30" />
                </svg>
              </span>
              <b className="sx" style={v({ '--sx': 0.894 })}>ZCC</b>
            </a>
            <button className="burger" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="site-menu" onClick={(e) => { e.stopPropagation(); setOpen((o) => !o) }}>
              <i /><i />
            </button>
            <div className="menu" id="site-menu" {...(open ? { 'data-open': '' } : {})}>
              <nav className="nav" aria-label="Primary">
                <i className="n-home"><svg viewBox="0 0 20 21" fill="none"><path d="M2 8.4 10 2l8 6.4V18a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" stroke="#202940" strokeWidth="1.7" strokeLinejoin="round" /></svg></i>
                <span className="n-explore">Programmes</span>
                <hr className="n-div" />
                <i className="n-grid"><svg viewBox="0 0 20 20" fill="none"><rect x="1" y="1" width="7.4" height="7.4" rx="1.7" stroke="#202940" strokeWidth="1.7" /><rect x="11.6" y="1" width="7.4" height="7.4" rx="1.7" stroke="#202940" strokeWidth="1.7" /><rect x="1" y="11.6" width="7.4" height="7.4" rx="1.7" stroke="#202940" strokeWidth="1.7" /><rect x="11.6" y="11.6" width="7.4" height="7.4" rx="1.7" stroke="#202940" strokeWidth="1.7" /></svg></i>
                <span className="n-product">The desk</span>
              </nav>
              <a className="cta l t r" style={v({ '--x': 58, '--y': 30 })} href={BOOK_MAIL}>
                <span>Book the desk</span>
                <span className="knob"><Chevron /></span>
              </a>
            </div>
          </div>

          <div className="hero-blk">
            <p className="eyebrow l c sx" style={v({ '--x': 65.7, '--y': -209.2, '--sx': 0.9293 })}>Zeus Cybernetics Corp — Cyber defence, Kampala</p>
            <h1 className="l c" style={v({ '--x': 62.6, '--y': -167.3 })}>
              <span className="sx" style={v({ '--sx': 0.9431 })}>Hold the</span><br />
              <span className="sx" style={v({ '--sx': 0.9792 })}>Wire.</span>
            </h1>
            <span className="play l c" style={v({ '--x': 66, '--y': 34 })} aria-hidden="true">
              <svg viewBox="0 0 13 14" fill="none"><path d="M1.4 1.3 11.6 7 1.4 12.7z" fill="#0b1526" /></svg>
            </span>
            <span className="tag l c sx" style={v({ '--x': 131, '--y': 48.7, '--sx': 0.8973 })}>Kampala · Est. 1998 · Signed scope only</span>
            <aside className="panel l c r" style={v({ '--x': 58, '--y': -165 })} aria-label="The seven programmes">
              <span className="p-title">The Seven</span>
              <span className="dot" />
              <span className="shield">
                <svg viewBox="0 0 30 39" fill="none" aria-hidden="true">
                  <path d="M15 1.2 1.6 6.6v13.1c0 6.6 5.1 12.6 13.4 17.9 8.3-5.3 13.4-11.3 13.4-17.9V6.6z" stroke="#101c33" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M2.1 18.9c4.6-1.1 8.9-1.6 12.9-1.6s8.3.5 12.9 1.6" stroke="#101c33" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
              {PROGRAMMES.map(([code, name], i) => (
                <span key={code} className="p-row" style={{ top: `calc(${70 + i * 28}*var(--u))` }}>
                  <u>{code}</u> {name}
                </span>
              ))}
            </aside>
          </div>

          <div className="row">
            <div className="stats">
              <span className="num l b sx" style={v({ '--x': 64, '--y': 60.4, '--sx': 1 })}>1998</span>
              <span className="lbl l b sx" style={v({ '--x': 295, '--y': 73.2, '--sx': 0.9634 })}>Established<br />Kampala<br />Uganda</span>
              <span className="slash l b" style={v({ '--x': 418, '--y': 76 })} aria-hidden="true" />
              <span className="num l b sx" style={v({ '--x': 480, '--y': 60.4, '--sx': 0.9858 })}>07</span>
              <span className="lbl l b sx" style={v({ '--x': 716, '--y': 96.7, '--sx': 0.9209 })}>Programmes<br />Signed scope</span>
            </div>
            <a className="meet l b r" style={v({ '--x': 59, '--y': 66 })} href={MEET_MAIL}>
              <span className="thumb"><img alt="" style={{ objectPosition: '60% 50%' }} src={POSTER} /></span>
              <b>Meet ZCC</b>
              <span className="knob"><Chevron /></span>
            </a>
            <span className="sig">© Zeus Cybernetics Corp (ZCC) · EST. 1998 · KAMPALA — Digital architecture by Zeus Cybernetics Corp (ZCC)</span>
          </div>

        </div>
      </div>
    </div>
  )
}
