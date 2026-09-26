import { useEffect, useRef, useState } from 'react'

/** Adds `.in` once the element scrolls into view. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const sel = '.r, .glyph'
    if (!('IntersectionObserver' in window)) {
      el.querySelectorAll<HTMLElement>(sel).forEach(t => t.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.15 })
    const observe = (root: ParentNode) => {
      if (root instanceof HTMLElement && root.matches(sel) && !root.classList.contains('in')) io.observe(root)
      root.querySelectorAll<HTMLElement>(sel).forEach(t => {
        if (!t.classList.contains('in')) io.observe(t)
      })
    }
    observe(el)
    // Conditional sections (form states) mount after the first paint.
    const mo = new MutationObserver(records =>
      records.forEach(r => r.addedNodes.forEach(n => n instanceof HTMLElement && observe(n))))
    mo.observe(el, { childList: true, subtree: true })
    return () => { io.disconnect(); mo.disconnect() }
  }, [])
  return ref
}

export function useScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setP(h > 0 ? Math.min(1, window.scrollY / h) : 0)
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return p
}

/** Which section id is currently under the header. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('')
  useEffect(() => {
    const els = ids.map(i => document.getElementById(i)).filter((e): e is HTMLElement => !!e)
    if (!('IntersectionObserver' in window) || !els.length) return
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
    }, { rootMargin: '-45% 0px -50% 0px' })
    els.forEach(e => io.observe(e))
    return () => io.disconnect()
  }, [ids])
  return active
}
