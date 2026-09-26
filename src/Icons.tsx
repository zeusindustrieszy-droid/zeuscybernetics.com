import type { SVGProps } from 'react'

const base = {
  viewBox: '0 0 32 32',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.3,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

type P = SVGProps<SVGSVGElement> & { size?: number }

const Svg = ({ size = 30, children, ...rest }: P & { children: React.ReactNode }) => (
  <svg className="ico" width={size} height={size} {...base} {...rest}>{children}</svg>
)

export const IconProtect = (p: P) => (
  <Svg {...p}>
    <path d="M16 3.5 26 7v9c0 6.2-4.2 10.4-10 12.5C10.2 26.4 6 22.2 6 16V7z"/>
    <path d="M16 12.4a2.6 2.6 0 0 1 2.6 2.6v1.4h-5.2V15A2.6 2.6 0 0 1 16 12.4Z"/>
    <path d="M12.4 16.4h7.2v4.6h-7.2z"/>
  </Svg>
)

export const IconSim = (p: P) => (
  <Svg {...p}>
    <circle cx="16" cy="16" r="12"/>
    <circle cx="16" cy="16" r="7"/>
    <circle cx="16" cy="16" r="2"/>
    <path d="M16 16 26 10"/>
    <path d="M22.5 4.5 27 3l-1.5 4.5"/>
  </Svg>
)

export const IconTest = (p: P) => (
  <Svg {...p}>
    <path d="M11 8 4 16l7 8"/>
    <path d="M21 8l7 8-7 8"/>
    <circle cx="16" cy="16" r="4.2"/>
    <path d="M16 8.2v2M16 21.8v2M8.4 16h1.8M21.8 16h1.8"/>
  </Svg>
)

export const IconDebug = (p: P) => (
  <Svg {...p}>
    <path d="M2 18h6l3-9 4 15 3-8h4"/>
    <path d="M25 18h5"/>
    <circle cx="24" cy="18" r="1.6"/>
  </Svg>
)

export const IconThreat = (p: P) => (
  <Svg {...p}>
    <path d="M2.5 16S7.5 7.5 16 7.5 29.5 16 29.5 16 24.5 24.5 16 24.5 2.5 16 2.5 16Z"/>
    <circle cx="16" cy="16" r="4"/>
    <path d="M16 13.6v4.8"/>
    <path d="M6 5.5 9 8M26 5.5 23 8"/>
  </Svg>
)

export const IconIntel = (p: P) => (
  <Svg {...p}>
    <circle cx="16" cy="6" r="2.4"/>
    <circle cx="6" cy="22" r="2.4"/>
    <circle cx="26" cy="22" r="2.4"/>
    <circle cx="16" cy="16" r="2.8"/>
    <path d="M16 8.4v4.8M14 17.8 8 21M18 17.8 24 21M8.4 22h15.2"/>
  </Svg>
)

export const IconInfra = (p: P) => (
  <Svg {...p}>
    <path d="M16 4 28 10l-12 6L4 10z"/>
    <path d="M4 16l12 6 12-6"/>
    <path d="M4 22l12 6 12-6"/>
  </Svg>
)

/** Mandate line-draws: the wire, the door, the lock. */
export const GlyphWire = (p: P) => (
  <Svg size={44} {...p}>
    <path className="st" style={{ ['--len' as string]: '120' }} d="M3 22h8l4-12 5 20 4-12h14"/>
    <circle cx="3" cy="22" r="1.8" fill="currentColor" stroke="none"/>
    <circle cx="29" cy="18" r="1.8" fill="currentColor" stroke="none"/>
  </Svg>
)

export const GlyphDoor = (p: P) => (
  <Svg size={44} {...p}>
    <path className="st" style={{ ['--len' as string]: '130' }} d="M10 5h13v22H10z"/>
    <path className="st" style={{ ['--len' as string]: '60' }} d="M23 12l6-4v18l-6-4"/>
    <circle cx="13.5" cy="16" r="1.4" fill="currentColor" stroke="none"/>
  </Svg>
)

export const GlyphLock = (p: P) => (
  <Svg size={44} {...p}>
    <path className="st" style={{ ['--len' as string]: '70' }} d="M11 14v-3a5 5 0 0 1 10 0v3"/>
    <rect className="st" style={{ ['--len' as string]: '100' }} x="8" y="14" width="16" height="13" rx="2"/>
    <path d="M16 19v4" stroke="currentColor" strokeWidth="1.6"/>
  </Svg>
)
