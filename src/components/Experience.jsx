import './Experience.css'

const jobs = [
  {
    role: 'Associate Software Engineer',
    company: 'Saama Technologies Pvt. Ltd.',
    location: 'Pune, India',
    period: 'Oct 2025 – Present',
    award: 'Spot Award — Best Performance, Q1 2026',
    stack: 'JavaScript (ES6+) · TypeScript · React.js · Redux · Material UI · Ag-Grid · Webpack · REST API',
    points: [
      'Architecting and maintaining the frontend of SIGMA/Brain, a clinical data platform serving Pfizer and Jazz Pharma.',
      'Engineered complex React components using Hooks (useState, useEffect, useMemo, useCallback) for the Specifications Module.',
      'Built highly interactive dashboards using Ag-Grid React managing large-scale clinical datasets at 60fps.',
      'Implemented Redux-based global state management to synchronize patient data across Phase I–IV clinical trials.',
      'Delivered 7+ major user stories involving complex UI logic for clinical trial phase management.',
      'Resolved 50+ high-priority production bug tickets impacting Pfizer and Jazz Pharma submission timelines.',
      'Architected Webpack config with code-splitting and asset optimization, reducing initial bundle size significantly.',
    ],
  },
  {
    role: 'Trainee – Frontend Developer',
    company: 'Saama Technologies Pvt. Ltd.',
    location: 'Pune, India',
    period: 'Mar 2025 – Sep 2025',
    stack: 'JavaScript · HTML5 · CSS3 · React.js · React Hooks · Material UI · Redux · Git',
    points: [
      'Built reusable React functional components using Hooks to refactor legacy code, improving maintainability.',
      'Translated Figma wireframes into responsive, pixel-perfect interfaces using Material UI.',
      'Integrated REST APIs to dynamically fetch and display real-time data with loading states and error boundaries.',
      'Participated in code reviews and maintained high standards using Git-based version control.',
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <h2 className="section-title">Experience</h2>
        <div className="exp-list">
          {jobs.map((job, i) => (
            <div key={i} className="card exp-card">
              <div className="exp-header">
                <div>
                  <h3 className="exp-role">{job.role}</h3>
                  <p className="exp-company">{job.company} · {job.location}</p>
                </div>
                <div className="exp-header-right">
                  {job.award && (
                    <span className="exp-award">🏆 {job.award}</span>
                  )}
                  <span className="exp-period tag">{job.period}</span>
                </div>
              </div>
              <p className="exp-stack">{job.stack}</p>
              <ul className="exp-points">
                {job.points.map((p, j) => <li key={j}>{p}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
