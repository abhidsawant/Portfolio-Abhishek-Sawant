import { useEffect, useState } from 'react'
import './SectionDots.css'

const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'education', 'contact']

export default function SectionDots() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const observers = sections.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.4 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  return (
    <nav className="section-dots">
      {sections.map(id => (
        <a
          key={id}
          href={`#${id}`}
          className={`dot ${active === id ? 'active' : ''}`}
          title={id.charAt(0).toUpperCase() + id.slice(1)}
        />
      ))}
    </nav>
  )
}
