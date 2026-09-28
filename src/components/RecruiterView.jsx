import './RecruiterView.css'

const topSkills = ['React.js', 'JavaScript (ES6+)', 'TypeScript', 'Redux', 'Node.js', 'Express.js', 'Material UI', 'Ag-Grid', 'REST APIs', 'Webpack', 'MongoDB']

const experience = [
  {
    role: 'Associate Software Engineer',
    company: 'Saama Technologies Pvt. Ltd.',
    period: 'Oct 2025 – Present',
    award: '🏆 Spot Award — Best Performance, Q1 2026',
    highlights: [
      'Frontend of SIGMA/Brain clinical data platform (Pfizer & Jazz Pharma)',
      'Built interactive dashboards with Ag-Grid managing large-scale datasets at 60fps',
      'Delivered 12+ major user stories; resolved 70+ high-priority production bugs',
      'Optimized Webpack config with code-splitting, reducing initial bundle size',
    ],
  },
  {
    role: 'Trainee – Frontend Developer',
    company: 'Saama Technologies Pvt. Ltd.',
    period: 'Mar 2025 – Sep 2025',
    highlights: [
      'Built reusable React components using Hooks to refactor legacy code',
      'Translated Figma wireframes into responsive Material UI interfaces',
      'Integrated REST APIs with loading states and error boundaries',
    ],
  },
]

export default function RecruiterView() {
  return (
    <div className="rv-wrapper">
      <div className="rv-container">

        {/* Header */}
        <div className="rv-header">
          <div className="rv-badge">👔 Recruiter Mode</div>
          <h1 className="rv-name">Abhishek Sawant</h1>
          <p className="rv-title">MERN Stack Developer · React.js Specialist · Frontend Engineer</p>
          <p className="rv-summary">
            1+ year building scalable clinical data platforms at Saama Technologies.
            Expert in React, JavaScript, Redux, and Node.js. Recognized with a Spot Award for Best Performance in Q1 2026.
          </p>
          <div className="rv-actions">
            <a href="/Abhishek_Sawant_Resume.pdf" download className="rv-btn rv-btn-primary">⬇ Download Resume</a>
            <a href="mailto:abhisheksawant732003@gmail.com" className="rv-btn rv-btn-outline">✉ Email Me</a>
            <a href="https://linkedin.com/in/abhishek-dhanaji-sawant-933639241" target="_blank" rel="noreferrer" className="rv-btn rv-btn-outline">💼 LinkedIn</a>
          </div>
        </div>

        {/* Stats */}
        <div className="rv-stats">
          {[
            { value: '1+', label: 'Year Experience' },
            { value: '70+', label: 'Bugs Resolved' },
            { value: '12+', label: 'User Stories' },
            { value: '2', label: 'Global Pharma Clients' },
          ].map(s => (
            <div key={s.label} className="rv-stat">
              <span className="rv-stat-value">{s.value}</span>
              <span className="rv-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="rv-section">
          <h2 className="rv-section-title">Top Skills</h2>
          <div className="rv-skills">
            {topSkills.map(s => <span key={s} className="rv-skill-tag">{s}</span>)}
          </div>
        </div>

        {/* Experience */}
        <div className="rv-section">
          <h2 className="rv-section-title">Experience</h2>
          {experience.map((job, i) => (
            <div key={i} className="rv-job">
              <div className="rv-job-header">
                <div>
                  <h3 className="rv-job-role">{job.role}</h3>
                  <p className="rv-job-company">{job.company}</p>
                </div>
                <span className="rv-job-period">{job.period}</span>
              </div>
              {job.award && <p className="rv-job-award">{job.award}</p>}
              <ul className="rv-job-points">
                {job.highlights.map((h, j) => <li key={j}>{h}</li>)}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="rv-section rv-contact">
          <h2 className="rv-section-title">Contact</h2>
          <div className="rv-contact-links">
            <a href="mailto:abhisheksawant732003@gmail.com">✉ abhisheksawant732003@gmail.com</a>
            <a href="tel:+918767570884">📞 +91-8767570884</a>
            <a href="https://github.com/abhidsawant" target="_blank" rel="noreferrer">🐙 github.com/abhidsawant</a>
          </div>
        </div>

      </div>
    </div>
  )
}
