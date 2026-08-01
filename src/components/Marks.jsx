export const DODO_BODY_PATH =
  'M58 118c-14-6-22-20-20-36 2-19 16-35 34-44 12-6 19-16 24-27 3-7 9-9 13-4 6 8 5 17 1 25 12 2 22 9 28 19 8 13 9 30 2 44-2 4 0 8 4 9 8 3 12 8 10 13-2 4-8 5-13 3-6-2-9 1-8 6 1 6-3 10-9 9-5-1-7-5-6-10-9 4-19 5-29 3-11-2-20-6-31-10Z'
export const DODO_BEAK_PATH =
  'M148 62c10-3 20-2 27 3 5 4 5 9-1 11-8 3-18 2-26-3-4-3-4-8 0-11Z'
export const DODO_TAIL_PATH =
  'M50 108c-8 2-14 8-15 15-1 5 3 7 7 4 5-4 8-9 8-15Z'

export function DodoMark({ className = 'w-24 h-24', color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 200 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* body */}
      <path d={DODO_BODY_PATH} fill={color} />
      {/* beak */}
      <path d={DODO_BEAK_PATH} fill={color} />
      {/* eye */}
      <circle cx="126" cy="60" r="3.2" fill="#0a1a26" />
      {/* leg + foot */}
      <path d="M84 122c-2 10-2 20 0 28" stroke={color} strokeWidth="6" strokeLinecap="round" />
      <path d="M74 152h20M78 158h6M92 158h6" stroke={color} strokeWidth="5" strokeLinecap="round" />
      {/* tail tuft */}
      <path d={DODO_TAIL_PATH} fill={color} />
    </svg>
  )
}

export function Footprint({ className = 'w-6 h-6', color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill={color} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="32" cy="42" rx="13" ry="17" />
      <ellipse cx="14" cy="24" rx="6" ry="11" transform="rotate(-22 14 24)" />
      <ellipse cx="32" cy="16" rx="6.5" ry="12" />
      <ellipse cx="50" cy="24" rx="6" ry="11" transform="rotate(22 50 24)" />
    </svg>
  )
}

export function ClockIcon({ className = 'w-4 h-4', color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  )
}

export function BadgeIcon({ className = 'w-6 h-6', color = 'currentColor', locked = false }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 14.4 7.2 16.9l.9-5.4-3.9-3.8 5.4-.8L12 2Z"
        fill={locked ? 'none' : color}
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        opacity={locked ? 0.35 : 1}
      />
    </svg>
  )
}

export function WaveDivider({ className = 'w-full h-8', color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 400 24" className={className} preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M0 12c33-10 67-10 100 0s67 10 100 0 67-10 100 0 67 10 100 0v12H0Z"
        fill={color}
      />
    </svg>
  )
}
