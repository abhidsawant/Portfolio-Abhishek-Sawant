import { useState } from 'react'
import { SiGithub } from 'react-icons/si'
import './Navbar.css'

const isMac = navigator.platform?.includes('Mac') || navigator.userAgent?.includes('Mac')
const MOD = isMac ? '⌘' : 'Ctrl'

const links = ['About', 'Skills', 'Experience', 'Projects', 'GitHub', 'Education', 'Contact']

export default function Navbar({ onOpenPalette }) {
  const [open, setOpen] = useState(false)

  const appTitle = "<Code.AS/>";

  return (
    <nav className="navbar">
      <div className="container nav-inner">
        <a href="#hero" className="nav-logo">{appTitle}</a>
        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {links.map(l => (
            <li key={l}><a href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}>{l}</a></li>
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
