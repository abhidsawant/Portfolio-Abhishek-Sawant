import useInView from '../hooks/useInView'
import useTilt from '../hooks/useTilt'
import './Projects.css'

const projects = [
  {
    name: 'SIGMA/Brain',
    subtitle: 'Clinical Trial Lifecycle Automation Platform · Saama Technologies',
    desc: 'End-to-end clinical data platform serving global pharma clients including Pfizer and Jazz Pharma. Owned the complete UI pipeline from raw data capture to regulatory-ready SDTM/ADaM submission formats.',
    highlights: [
      'Tracked medication vs. placebo groups across Phase I–IV clinical trials',
      'Handled 10,000+ row datasets in Ag-Grid without performance degradation',
      'Optimized REST API integrations with re-render performance tuning',
      'Ensured compliance-ready SDTM/ADaM output for regulatory submissions',
    ],
    tags: ['React.js', 'Redux', 'Ag-Grid', 'Material UI', 'TypeScript', 'Webpack', 'REST API'],
  },
]

export default function Projects() {
  const [ref, inView] = useInView()
  const tilt = useTilt(5)

  return (
    <section id="projects" className="section projects-bg" ref={ref}>
      <div className="container">
        <h2 className="section-title">Key Project</h2>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <div
              key={i}
              ref={tilt.ref}
              onMouseMove={tilt.onMouseMove}
              onMouseLeave={tilt.onMouseLeave}
              className={`card project-card reveal ${inView ? 'visible' : ''}`}
            >
              <div className="project-header">
                <div>
                  <h3 className="project-name">{p.name}</h3>
                  <p className="project-subtitle">{p.subtitle}</p>
                </div>
              </div>
              <p className="project-desc">{p.desc}</p>
              <ul className="project-highlights">
                {p.highlights.map((h, j) => <li key={j}>{h}</li>)}
              </ul>
              <div className="project-tags">
                {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
