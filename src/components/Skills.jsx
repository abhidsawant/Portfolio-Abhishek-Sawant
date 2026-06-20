import useInView from '../hooks/useInView'
import './Skills.css'

const groups = [
  {
    title: 'Languages & Frameworks',
    skills: ['JavaScript (ES6+)', 'TypeScript', 'React.js', 'React Hooks', 'Redux', 'Node.js', 'Express.js'],
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
  const [ref, inView] = useInView()

  return (
    <section id="skills" className="section skills-bg" ref={ref}>
      <div className="container">
        <h2 className="section-title">Technical Skills</h2>
        <div className="skills-grid">
          {groups.map((g, i) => (
            <div
              key={g.title}
              className={`card skill-group reveal ${inView ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <h3 className="skill-group-title">{g.title}</h3>
              <div className="skill-tags">
                {g.skills.map((s, j) => (
                  <span
                    key={s}
                    className={`tag skill-tag ${inView ? 'tag-visible' : ''}`}
                    style={{ animationDelay: `${0.2 + i * 0.1 + j * 0.05}s` }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
