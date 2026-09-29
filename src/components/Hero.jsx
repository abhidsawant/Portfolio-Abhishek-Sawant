import { useRef, useState, useEffect, useCallback } from 'react'
import useTilt from '../hooks/useTilt'
import './Hero.css'

function HaloRing() {
  return (
    <svg className="hero-halo" viewBox="0 0 500 500" aria-hidden="true">
      <defs>
        <linearGradient id="halo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#22d3ee" stopOpacity="0.95" />
          <stop offset="45%"  stopColor="#7c6aff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.0" />
        </linearGradient>
        <linearGradient id="halo-grad2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#7c6aff" stopOpacity="0.8" />
          <stop offset="50%"  stopColor="#22d3ee" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#7c6aff" stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <circle cx="250" cy="250" r="210" fill="none" stroke="url(#halo-grad)"  strokeWidth="1.2" className="halo-ring halo-ring-1" />
      <circle cx="250" cy="250" r="230" fill="none" stroke="url(#halo-grad2)" strokeWidth="0.6" className="halo-ring halo-ring-2" />
      <circle cx="250" cy="250" r="190" fill="none" stroke="rgba(34,211,238,0.4)"  strokeWidth="1" strokeDasharray="4 14" className="halo-ring halo-ring-3" />
    </svg>
  )
}

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Each group: main path + branches + nodes. All hug edges, center (300–900 x, 150–550 y) stays empty.
const CIRCUIT_GROUPS = [
  {
    id: 'tl', // top-left cluster
    proximity: { cx: 200, cy: 130 },
    paths: [
      'M -2 220 L 60 220 L 60 180 L 140 180 L 140 130 L 200 130',
      'M 60 220 L 60 270 L 110 270 L 110 310',
      'M 140 180 L 140 140 L 90 140 L 90 80 L 160 80 L 160 30',
      'M 200 130 L 260 130 L 260 80 L 220 80',
      'M 110 310 L 160 310 L 160 350 L 110 350',
      'M -2 320 L 50 320 L 50 270',
    ],
    nodes: [{ cx: 200, cy: 130 }, { cx: 110, cy: 310 }, { cx: 160, cy: 80 }, { cx: 60, cy: 220 }, { cx: 140, cy: 180 }],
    pads:  [{ cx: 260, cy: 130 }, { cx: 160, cy: 30 }, { cx: 110, cy: 350 }],
  },
  {
    id: 'tr', // top-right cluster
    proximity: { cx: 1000, cy: 140 },
    paths: [
      'M 1202 200 L 1140 200 L 1140 140 L 1060 140 L 1060 80 L 1000 80',
      'M 1140 200 L 1140 260 L 1080 260 L 1080 310',
      'M 1060 140 L 1000 140 L 1000 80',
      'M 1000 80 L 940 80 L 940 130 L 880 130',
      'M 1080 310 L 1020 310 L 1020 360 L 1080 360',
      'M 1202 320 L 1150 320 L 1150 260',
    ],
    nodes: [{ cx: 1000, cy: 140 }, { cx: 1080, cy: 310 }, { cx: 1060, cy: 80 }, { cx: 1140, cy: 200 }, { cx: 1000, cy: 80 }],
    pads:  [{ cx: 880, cy: 130 }, { cx: 1020, cy: 360 }, { cx: 1150, cy: 260 }],
  },
  {
    id: 'bl', // bottom-left cluster
    proximity: { cx: 220, cy: 560 },
    paths: [
      'M -2 480 L 70 480 L 70 540 L 150 540 L 150 580 L 220 580',
      'M 70 480 L 70 430 L 130 430 L 130 390',
      'M 150 540 L 150 600 L 80 600 L 80 650 L 160 650',
      'M 220 580 L 280 580 L 280 630 L 220 630',
      'M 130 390 L 190 390 L 190 340 L 130 340',
      'M -2 580 L 40 580 L 40 540',
    ],
    nodes: [{ cx: 220, cy: 580 }, { cx: 130, cy: 390 }, { cx: 150, cy: 540 }, { cx: 70, cy: 480 }, { cx: 80, cy: 600 }],
    pads:  [{ cx: 160, cy: 650 }, { cx: 280, cy: 630 }, { cx: 190, cy: 340 }],
  },
  {
    id: 'br', // bottom-right cluster
    proximity: { cx: 980, cy: 560 },
    paths: [
      'M 1202 480 L 1130 480 L 1130 540 L 1050 540 L 1050 580 L 980 580',
      'M 1130 480 L 1130 430 L 1070 430 L 1070 390',
      'M 1050 540 L 1050 600 L 1120 600 L 1120 650 L 1040 650',
      'M 980 580 L 920 580 L 920 630 L 980 630',
      'M 1070 390 L 1010 390 L 1010 340 L 1070 340',
      'M 1202 580 L 1160 580 L 1160 540',
    ],
    nodes: [{ cx: 980, cy: 580 }, { cx: 1070, cy: 390 }, { cx: 1050, cy: 540 }, { cx: 1130, cy: 480 }, { cx: 1120, cy: 600 }],
    pads:  [{ cx: 1040, cy: 650 }, { cx: 920, cy: 630 }, { cx: 1010, cy: 340 }],
  },
  {
    id: 'lm', // left-mid spine
    proximity: { cx: 55, cy: 370 },
    paths: [
      'M -2 370 L 55 370 L 55 420 L 30 420 L 30 460',
      'M 55 370 L 55 320 L 30 320 L 30 280',
      'M 55 420 L 100 420 L 100 450',
      'M 55 320 L 100 320 L 100 290',
    ],
    nodes: [{ cx: 55, cy: 370 }, { cx: 100, cy: 420 }, { cx: 100, cy: 320 }],
    pads:  [{ cx: 30, cy: 460 }, { cx: 30, cy: 280 }],
  },
  {
    id: 'rm', // right-mid spine
    proximity: { cx: 1145, cy: 370 },
    paths: [
      'M 1202 370 L 1145 370 L 1145 420 L 1170 420 L 1170 460',
      'M 1145 370 L 1145 320 L 1170 320 L 1170 280',
      'M 1145 420 L 1100 420 L 1100 450',
      'M 1145 320 L 1100 320 L 1100 290',
    ],
    nodes: [{ cx: 1145, cy: 370 }, { cx: 1100, cy: 420 }, { cx: 1100, cy: 320 }],
    pads:  [{ cx: 1170, cy: 460 }, { cx: 1170, cy: 280 }],
  },
]

function CircuitLines({ mousePos }) {
  if (prefersReducedMotion()) return null
  return (
    <svg className="hero-circuit" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <filter id="node-glow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {CIRCUIT_GROUPS.map(g => {
        const dx = mousePos.x - g.proximity.cx
        const dy = mousePos.y - g.proximity.cy
        const dist = Math.sqrt(dx * dx + dy * dy)
        const lit = dist < 260
        return (
          <g key={g.id} className={`circuit-path-group${lit ? ' lit' : ''}`}>
            {g.paths.map((d, i) => <path key={i} d={d} />)}
            {g.nodes.map((n, i) => <circle key={`n${i}`} className="circuit-node" cx={n.cx} cy={n.cy} r="3" />)}
            {g.pads.map((p, i)  => <rect  key={`p${i}`} className="circuit-pad"  x={p.cx - 4} y={p.cy - 4} width="8" height="8" />)}
          </g>
        )
      })}
    </svg>
  )
}

function MagneticBtn({ children, className, href, download }) {
  const ref = useRef(null)
  // disable magnetic effect on touch-only devices
  const isTouchOnly = !window.matchMedia('(hover: hover)').matches

  const onMove = useCallback(e => {
    e.stopPropagation()
    const el = ref.current
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px)`
  }, [])

  const onLeave = useCallback(e => {
    e.stopPropagation()
    ref.current.style.transform = ''
  }, [])

  return (
    <a
      ref={ref}
      href={href}
      download={download}
      className={className}
      onMouseMove={isTouchOnly ? undefined : onMove}
      onMouseLeave={isTouchOnly ? undefined : onLeave}
    >
      {children}
    </a>
  )
}

const ROLES = ['MERN Stack Developer', 'React.js Developer', 'Full Stack Developer', 'Frontend Engineer', 'JavaScript Specialist']

function TypingText() {
  const reduced = prefersReducedMotion()
  const [roleIdx, setRoleIdx] = useState(0)
  const [text, setText] = useState(reduced ? ROLES[0] : '')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduced) return  // static text, no animation
    const full = ROLES[roleIdx]
    let timeout
    if (!deleting && text === full) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && text === '') {
      setDeleting(false)
      setRoleIdx(i => (i + 1) % ROLES.length)
    } else {
      timeout = setTimeout(() => {
        setText(prev => deleting ? prev.slice(0, -1) : full.slice(0, prev.length + 1))
      }, deleting ? 40 : 80)
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, roleIdx, reduced])

  return <span className="typing-text">{text}{!reduced && <span className="cursor">|</span>}</span>
}

export default function Hero() {
  const sectionRef = useRef(null)
  const spotlightRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: -999, y: -999 })
  const tilt = useTilt(5)

  const handleMouseMove = useCallback(e => {
    if (prefersReducedMotion()) return
    const rect = sectionRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    // scale mouse coords to SVG viewBox (1200x700)
    const svgX = (x / rect.width) * 1200
    const svgY = (y / rect.height) * 700
    setMousePos({ x: svgX, y: svgY })
    spotlightRef.current.style.setProperty('--sx', `${x}px`)
    spotlightRef.current.style.setProperty('--sy', `${y}px`)
    spotlightRef.current.style.opacity = '1'
  }, [])

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: -999, y: -999 })
    spotlightRef.current.style.opacity = '0'
  }, [])

  return (
    <section
      id="hero"
      className="hero-section"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="hero-spotlight" ref={spotlightRef} />
      <div className="hero-glow-purple" />
      <div className="hero-glow-green" />
      <CircuitLines mousePos={mousePos} />
      <div className="hero-os-labels" aria-hidden="true">
        <span>SYS://PORTFOLIO</span>
        <span>STATUS: AVAILABLE</span>
        <span>STACK://MERN</span>
        <span>BUILD://2026</span>
        <span>MODE://ENGINEERING</span>
      </div>
      <div className="container hero-inner" ref={tilt.ref} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave}>
        <HaloRing />
        <div className="hero-badge tag anim-1">✦ Available for Opportunities</div>
        <h1 className="hero-name anim-2">Abhishek Sawant</h1>
        <h2 className="hero-title anim-3"><TypingText /></h2>
        <p className="hero-desc anim-4">
          I build scalable, high-performance web applications with{' '}
          <span className="highlight">React, TypeScript, and the MERN stack</span>,
          focusing on clean architecture, performance, and great user experiences.
        </p>
        <div className="hero-award anim-5">
          <span>🏆</span>
          <span>Spot Award — Best Performance, BRAIN Team · Q1 2026 · Saama Technologies</span>
        </div>
        <div className="hero-actions anim-6">
          <MagneticBtn href="#projects" className="btn-primary btn-shine">View Projects</MagneticBtn>
          <MagneticBtn href="#contact" className="btn-outline">Hire Me</MagneticBtn>
          <MagneticBtn href="/Abhishek_Sawant_Resume.pdf" download className="btn-download">⬇ Download Resume</MagneticBtn>
        </div>
        <div className="hero-links anim-7">
          <a href="https://linkedin.com/in/abhishek-dhanaji-sawant-933639241" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href="https://github.com/abhidsawant" target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
      </div>
    </section>
  )
}
