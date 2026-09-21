import { useState } from 'react'
import { SiGithub } from 'react-icons/si'
import './Navbar.css'

const links = ['About', 'Skills', 'Experience', 'Projects', 'GitHub', 'Education', 'Contact']

export default function Navbar() {
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
        <button className="hamburger" onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
