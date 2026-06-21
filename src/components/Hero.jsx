import { useEffect, useRef, useState } from 'react'
import './Hero.css'

const ROLES = ['React.js Developer', 'Frontend Engineer', 'UI Specialist', 'JavaScript Specialist', 'Node.js Enthusiast']

function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let W, H, particles

    const init = () => {
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
      particles = Array.from({ length: 80 }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
      }))
    }

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
      // draw lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(167,139,250,${0.15 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }

    init()
    draw()
    window.addEventListener('resize', init)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', init) }
  }, [])

  return <canvas ref={canvasRef} className="hero-canvas" />
}

function TypingText() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
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
  }, [text, deleting, roleIdx])

  return <span className="typing-text">{text}<span className="cursor">|</span></span>
}

export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      <ParticleCanvas />
      <div className="hero-glow" />
      <div className="container hero-inner">
        <div className="hero-badge tag anim-1">✦ Available for Opportunities</div>
        <h1 className="hero-name anim-2">Abhishek Sawant</h1>
        <h2 className="hero-title anim-3"><TypingText /></h2>
        <p className="hero-desc anim-4">
          I craft fast, scalable, and accessible frontend experiences for
          mission-critical clinical data platforms in the pharma industry.
          Specializing in <span className="highlight">React.js</span>, <span className="highlight">Redux</span>, and <span className="highlight">TypeScript</span> —
          with a track record of shipping complex features and squashing production
          fires for <span className="highlight">Pfizer</span> and <span className="highlight">Jazz Pharma</span>.
        </p>
        <div className="hero-award anim-5">
          <span>🏆</span>
          <span>Spot Award — Best Performance, UI Team · Q1 2026 · Saama Technologies</span>
        </div>
        <div className="hero-actions anim-6">
          <a href="#experience" className="btn-primary btn-shine">View Experience</a>
          <a href="#contact" className="btn-outline">Hire Me</a>
          <a href="/Abhishek_Sawant_Resume.pdf" download className="btn-download">⬇ Download Resume</a>
        </div>
        <div className="hero-links anim-7">
          <a href="https://linkedin.com/in/abhishek-dhanaji-sawant-933639241" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href="tel:+918767570884">+91-8767570884</a>
        </div>
      </div>
    </section>
  )
}
