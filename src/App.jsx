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
import useCommandPalette from './hooks/useCommandPalette'

export default function App() {
  const { open, setOpen } = useCommandPalette()

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
      <CommandPalette open={open} onClose={() => setOpen(false)} onOpen={() => setOpen(true)} />
    </>
  )
}
