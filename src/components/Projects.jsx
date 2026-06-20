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
  return (
    <section id="projects" className="section projects-bg">
      <div className="container">
        <h2 className="section-title">Key Project</h2>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <div key={i} className="card project-card">
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
