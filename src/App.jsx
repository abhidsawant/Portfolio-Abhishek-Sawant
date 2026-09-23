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
import useCommandPalette from './hooks/useCommandPalette'
import { useState, useEffect } from 'react'
import './App.css'

export default function App() {
  const { open, setOpen } = useCommandPalette()
  const [termOpen, setTermOpen] = useState(false)

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
      <ScrollProgress />
      <SectionDots />
      <Navbar onOpenPalette={() => setOpen(true)} />
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
      <Footer />
      <CommandPalette open={open} onClose={() => setOpen(false)} onOpen={() => setOpen(true)} onOpenTerminal={() => setTermOpen(true)} />
      <Terminal open={termOpen} setOpen={setTermOpen} />
      <button
        className="term-fab"
        onClick={() => setTermOpen(o => !o)}
        aria-label="Toggle terminal"
        title="Open Terminal"
      >
        &gt;_
      </button>
    </>
  )
}
