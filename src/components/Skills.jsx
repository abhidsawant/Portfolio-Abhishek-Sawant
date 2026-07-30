import useInView from '../hooks/useInView'
import useTilt from '../hooks/useTilt'
import {
  SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiRedux, SiNodedotjs, SiExpress,
  SiMaterialdesign, SiTailwindcss, SiBootstrap, SiHtml5, SiCss,
  SiWebpack, SiGit, SiGithub,
  SiJest, SiMysql, SiPostgresql, SiMongodb,
} from 'react-icons/si'
import { FaMobileAlt, FaCode, FaPalette, FaTools, FaFlask, FaDatabase, FaRobot, FaBrain } from 'react-icons/fa'
import { SiAnthropic } from 'react-icons/si'
import './Skills.css'

const skillIcons = {
  'JavaScript (ES6+)': <SiJavascript />,
  'TypeScript': <SiTypescript />,
  'React.js': <SiReact />,
  'Next.js': <SiNextdotjs />,
  'React Native': <FaMobileAlt />,
  'React Hooks': <SiReact />,
  'Redux': <SiRedux />,
  'Node.js': <SiNodedotjs />,
  'Express.js': <SiExpress />,
  'Material UI': <SiMaterialdesign />,
  'Tailwind CSS': <SiTailwindcss />,
  'Bootstrap': <SiBootstrap />,
  'HTML5': <SiHtml5 />,
  'CSS3': <SiCss />,
  'Webpack': <SiWebpack />,
  'Git': <SiGit />,
  'GitHub': <SiGithub />,
  'Jest': <SiJest />,
  'MySQL': <SiMysql />,
  'PostgreSQL': <SiPostgresql />,
  'MongoDB': <SiMongodb />,
  'Claude AI': <SiAnthropic />,
  'Codex': <FaBrain />,
  'GitHub Copilot': <SiGithub />,
}

const groups = [
  {
    title: 'Languages & Frameworks',
    icon: <FaCode />,
    color: '#7c6aff',
    skills: ['JavaScript (ES6+)', 'TypeScript', 'React.js', 'Next.js', 'React Native', 'React Hooks', 'Redux', 'Node.js', 'Express.js'],
  },
  {
    title: 'UI & Styling',
    icon: <FaPalette />,
    color: '#a78bfa',
    skills: ['Material UI', 'Tailwind CSS', 'Bootstrap', 'Ag-Grid React', 'HTML5', 'CSS3', 'Responsive Design'],
  },
  {
    title: 'Performance & Tooling',
    icon: <FaTools />,
    color: '#34d399',
    skills: ['Webpack', 'Code Splitting', 'Tree Shaking', 'Git', 'GitHub', 'REST APIs', 'CI/CD'],
  },
  {
    title: 'Testing & Methodology',
    icon: <FaFlask />,
    color: '#f59e0b',
    skills: ['Jest', 'Agile/Scrum', 'Code Reviews', 'Cross-browser Compatibility'],
  },
  {
    title: 'Databases',
    icon: <FaDatabase />,
    color: '#38bdf8',
    skills: ['MySQL', 'PostgreSQL', 'MongoDB'],
  },
  {
    title: 'AI Coding Tools',
    icon: <FaRobot />,
    color: '#f472b6',
    skills: ['Claude AI', 'Codex', 'GitHub Copilot'],
  },
]

function SkillCard({ group, inView, i }) {
  const tilt = useTilt(6)
  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className={`card skill-group reveal ${inView ? 'visible' : ''}`}
      style={{ transitionDelay: `${i * 0.1}s`, '--group-color': group.color }}
    >
      <span className="skill-count-badge" style={{ background: group.color }}>
        {group.skills.length}
      </span>

      <h3 className="skill-group-title">
        <span className="category-icon" style={{ color: group.color }}>{group.icon}</span>
        {group.title}
      </h3>

      <div className="skill-tags">
        {group.skills.map((s, j) => (
          <span
            key={s}
            className={`tag skill-tag ${inView ? 'tag-visible' : ''}`}
            style={{ animationDelay: `${0.2 + i * 0.1 + j * 0.05}s`, '--group-color': group.color }}
          >
            {skillIcons[s] && <span className="skill-icon">{skillIcons[s]}</span>}
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const [ref, inView] = useInView()

  return (
    <section id="skills" className="section skills-bg" ref={ref}>
      <div className="container">
        <h2 className="section-title">Technical Skills</h2>
        <div className="skills-grid">
          {groups.map((g, i) => <SkillCard key={g.title} group={g} inView={inView} i={i} />)}
        </div>
      </div>
    </section>
  )
}
