import ScrollProgress from './components/ScrollProgress'
import SectionDots from './components/SectionDots'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import GitHub from './components/GitHub'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CommandPalette from './components/CommandPalette'
import Terminal from './components/Terminal'
import RecruiterView from './components/RecruiterView'
import useCommandPalette from './hooks/useCommandPalette'
import { useState, useEffect } from 'react'
import './App.css'

export default function App() {
  const { open, setOpen } = useCommandPalette()
  const [termOpen, setTermOpen] = useState(false)
  const [recruiterMode, setRecruiterMode] = useState(false)

  useEffect(() => {
    const onKey = e => {
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault()
        setTermOpen(o => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      {!recruiterMode && <ScrollProgress />}
      {!recruiterMode && <SectionDots />}
      <Navbar onOpenPalette={() => setOpen(true)} recruiterMode={recruiterMode} onToggleRecruiter={() => setRecruiterMode(m => !m)} />
      {recruiterMode ? <RecruiterView /> : (
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <GitHub />
          <Education />
          <Contact />
        </main>
      )}
      {!recruiterMode && <Footer />}
      {!recruiterMode && <CommandPalette open={open} onClose={() => setOpen(false)} onOpen={() => setOpen(true)} onOpenTerminal={() => setTermOpen(true)} />}
      {!recruiterMode && <Terminal open={termOpen} setOpen={setTermOpen} />}
      {!recruiterMode && (
        <button
          className="term-fab"
          onClick={() => setTermOpen(o => !o)}
          aria-label="Toggle terminal"
          title="Open Terminal"
        >
          &gt;_
        </button>
      )}
    </>
  )
}
