import useInView from '../hooks/useInView'
import useCounter from '../hooks/useCounter'
import useTilt from '../hooks/useTilt'
import './About.css'

const stats = [
  { value: '1+', label: 'Year Experience' },
  { value: '70+', label: 'Bugs Resolved' },
  { value: '12+', label: 'Major User Stories' },
  { value: '2', label: 'Global Pharma Clients' },
]

function StatCard({ value, label, delay, inView }) {
  const [countRef, count] = useCounter(value)
  const tilt = useTilt(8)

  return (
    <div
      ref={el => { tilt.ref.current = el; countRef(el) }}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className={`stat-card card reveal-scale ${inView ? 'visible' : ''}`}
      style={{ transitionDelay: delay, transition: 'box-shadow 0.25s, border-color 0.25s, opacity 0.5s ease, transform 0.5s ease' }}
    >
      <span className="stat-value">{count}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

export default function About() {
  const [ref, inView] = useInView()
  const tilt = useTilt(5)

  return (
    <section id="about" className="section" ref={ref}>
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-grid">
          <div
            ref={tilt.ref}
            onMouseMove={tilt.onMouseMove}
            onMouseLeave={tilt.onMouseLeave}
            className={`about-text card reveal ${inView ? 'visible' : ''}`}
            style={{ transition: 'box-shadow 0.25s, border-color 0.25s, opacity 0.6s ease, transform 0.6s ease' }}
          >
            <p>
              Results-driven React.js Developer with 1+ year of experience building high-performance,
              scalable frontend applications for clinical data platforms in the pharmaceutical domain.
            </p>
            <p>
              Proficient in React Hooks, Redux, TypeScript, Ag-Grid, REST API integration, and Webpack
              optimization. Recognized with the <strong className="highlight">Q1 2026 Spot Award for Best Performance</strong> in
              the UI team at Saama Technologies.
            </p>
            <p>
              Proven track record delivering complex UI features and resolving high-priority production
              issues for global pharma clients including <strong className="highlight">Pfizer</strong> and <strong className="highlight">Jazz Pharma</strong>.
            </p>
          </div>
          <div className="about-stats">
            {stats.map((s, i) => (
              <StatCard key={s.label} value={s.value} label={s.label} delay={`${0.1 + i * 0.1}s`} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
