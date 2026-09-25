import { useState, useEffect } from 'react'
import { SiGithub } from 'react-icons/si'
import './Navbar.css'

const isMac = navigator.platform?.includes('Mac') || navigator.userAgent?.includes('Mac')
const MOD = isMac ? '⌘' : 'Ctrl'

const links = ['About', 'Skills', 'Experience', 'Projects', 'GitHub', 'Education', 'Contact']

export default function Navbar({ onOpenPalette }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = links.map(l => document.getElementById(l.toLowerCase())).filter(Boolean)
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const appTitle = "<Code.AS/>";

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#hero" className="nav-logo">{appTitle}</a>
        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {links.map(l => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                className={active === l.toLowerCase() ? 'active' : ''}
                onClick={() => setOpen(false)}
              >{l}</a>
            </li>
          ))}
        </ul>
        <a href="https://github.com/abhidsawant" target="_blank" rel="noreferrer" className="nav-github" aria-label="GitHub">
          <SiGithub />
        </a>
        <button className="nav-cmd" onClick={onOpenPalette} aria-label="Open command palette">
          <span className="nav-cmd-text">Search...</span>
          <span className="nav-cmd-kbd">
            <kbd>{MOD}</kbd>
            <span className="nav-cmd-plus">+</span>
            <kbd>K</kbd>
          </span>
        </button>
        <button className="hamburger" onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
