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

const skillDocs = {
  'JavaScript (ES6+)': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  'TypeScript': 'https://www.typescriptlang.org/docs/',
  'React.js': 'https://react.dev',
  'Next.js': 'https://nextjs.org/docs',
  'React Native': 'https://reactnative.dev/docs/getting-started',
  'React Hooks': 'https://react.dev/reference/react',
  'Redux': 'https://redux.js.org/introduction/getting-started',
  'Node.js': 'https://nodejs.org/en/docs',
  'Express.js': 'https://expressjs.com/en/starter/installing.html',
  'Material UI': 'https://mui.com/material-ui/getting-started/',
  'Tailwind CSS': 'https://tailwindcss.com/docs',
  'Bootstrap': 'https://getbootstrap.com/docs',
  'Ag-Grid React': 'https://www.ag-grid.com/react-data-grid/',
  'HTML5': 'https://developer.mozilla.org/en-US/docs/Web/HTML',
  'CSS3': 'https://developer.mozilla.org/en-US/docs/Web/CSS',
  'Responsive Design': 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design',
  'Webpack': 'https://webpack.js.org/concepts/',
  'Code Splitting': 'https://webpack.js.org/guides/code-splitting/',
  'Tree Shaking': 'https://webpack.js.org/guides/tree-shaking/',
  'Git': 'https://git-scm.com/doc',
  'GitHub': 'https://docs.github.com',
  'REST APIs': 'https://developer.mozilla.org/en-US/docs/Glossary/REST',
  'CI/CD': 'https://docs.github.com/en/actions',
  'Jest': 'https://jestjs.io/docs/getting-started',
  'Agile/Scrum': 'https://www.scrum.org/resources/what-scrum-module',
  'Code Reviews': 'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews',
  'Cross-browser Compatibility': 'https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing',
  'MySQL': 'https://dev.mysql.com/doc/',
  'PostgreSQL': 'https://www.postgresql.org/docs/',
  'MongoDB': 'https://www.mongodb.com/docs/',
  'Claude AI': 'https://docs.anthropic.com',
  'Codex': 'https://platform.openai.com/docs/guides/code',
  'GitHub Copilot': 'https://docs.github.com/en/copilot',
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
          <a
            key={s}
            href={skillDocs[s] || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className={`tag skill-tag ${inView ? 'tag-visible' : ''}`}
            style={{ animationDelay: `${0.2 + i * 0.1 + j * 0.05}s`, '--group-color': group.color }}
          >
            {skillIcons[s] && <span className="skill-icon">{skillIcons[s]}</span>}
            {s}
          </a>
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
