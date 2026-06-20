import useInView from '../hooks/useInView'
import './About.css'

const stats = [
  { value: '1+', label: 'Year Experience' },
  { value: '50+', label: 'Bugs Resolved' },
  { value: '7+', label: 'Major User Stories' },
  { value: '2', label: 'Global Pharma Clients' },
]

export default function About() {
  const [ref, inView] = useInView()

  return (
    <section id="about" className="section" ref={ref}>
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-grid">
          <div className={`about-text card reveal ${inView ? 'visible' : ''}`}>
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
              <div
                key={s.label}
                className={`stat-card card reveal-scale ${inView ? 'visible' : ''}`}
                style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
              >
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
