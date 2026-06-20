import './Skills.css'

const groups = [
  {
    title: 'Languages & Frameworks',
    skills: ['JavaScript (ES6+)', 'TypeScript', 'React.js', 'React Native', 'Next.js', 'React Hooks', 'Redux', 'Node.js', 'Express.js'],
  },
  {
    title: 'UI & Styling',
    skills: ['Material UI', 'Tailwind CSS', 'Bootstrap', 'Ag-Grid React', 'HTML5', 'CSS3', 'Responsive Design'],
  },
  {
    title: 'Performance & Tooling',
    skills: ['Webpack', 'Code Splitting', 'Tree Shaking', 'Git', 'GitHub', 'REST APIs', 'CI/CD'],
  },
  {
    title: 'Testing & Methodology',
    skills: ['Jest', 'Agile/Scrum', 'Code Reviews', 'Cross-browser Compatibility'],
  },
  {
    title: 'Databases',
    skills: ['MySQL', 'PostgreSQL', 'MongoDB'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="section skills-bg">
      <div className="container">
        <h2 className="section-title">Technical Skills</h2>
        <div className="skills-grid">
          {groups.map(g => (
            <div key={g.title} className="card skill-group">
              <h3 className="skill-group-title">{g.title}</h3>
              <div className="skill-tags">
                {g.skills.map(s => <span key={s} className="tag">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
