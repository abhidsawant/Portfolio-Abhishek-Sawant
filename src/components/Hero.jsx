import { useEffect, useRef, useState, useCallback } from 'react'
import './Hero.css'

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const getParticleCount = () => {
  if (prefersReducedMotion()) return 0
  const w = window.innerWidth
  if (w < 640)  return 20   // mobile
  if (w < 1024) return 40   // tablet
  return 80                  // desktop
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

const ROLES = ['React.js Developer', 'Frontend Engineer', 'UI Specialist', 'JavaScript Specialist', 'Node.js Enthusiast', 'MERN Stack Developer']

function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const count = getParticleCount()
    if (count === 0) return  // reduced-motion: skip entirely

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let W, H, particles

    const init = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
      const n = getParticleCount()  // re-check on resize
      particles = Array.from({ length: n }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
      }))
    }

    // connection distance scales with particle count to keep density consistent
    const connDist = count >= 80 ? 100 : count >= 40 ? 80 : 60

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(167,139,250,0.5)'
        ctx.fill()
      })
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < connDist) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(167,139,250,${0.15 * (1 - dist / connDist)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }

    const onResize = () => init()
    window.addEventListener('resize', onResize)
    init()
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize) }
  }, [])

  if (getParticleCount() === 0) return null
  return <canvas ref={canvasRef} className="hero-canvas" />
}

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

  const handleSpotlight = useCallback(e => {
    if (prefersReducedMotion()) return
    const rect = sectionRef.current.getBoundingClientRect()
    spotlightRef.current.style.setProperty('--sx', `${e.clientX - rect.left}px`)
    spotlightRef.current.style.setProperty('--sy', `${e.clientY - rect.top}px`)
    spotlightRef.current.style.opacity = '1'
  }, [])

  const handleSpotlightLeave = useCallback(() => {
    spotlightRef.current.style.opacity = '0'
  }, [])

  return (
    <section
      id="hero"
      className="hero-section"
      ref={sectionRef}
      onMouseMove={handleSpotlight}
      onMouseLeave={handleSpotlightLeave}
    >
      <div className="hero-spotlight" ref={spotlightRef} />
      <ParticleCanvas />
      <div className="hero-glow" />
      <div className="container hero-inner">
        <div className="hero-badge tag anim-1">✦ Available for Opportunities</div>
        <h1 className="hero-name anim-2">Abhishek Sawant</h1>
        <h2 className="hero-title anim-3"><TypingText /></h2>
        <p className="hero-desc anim-4">
          I build fast, scalable, and accessible web applications with a strong focus on
          clean architecture and smooth user experiences. Specializing in{' '}
          <span className="highlight">React.js</span>, <span className="highlight">Redux</span>, and <span className="highlight">JavaScript</span> —
          with hands-on experience across the full <span className="highlight">MERN stack</span>,
          performance optimization, and delivering production-ready features end to end.
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
