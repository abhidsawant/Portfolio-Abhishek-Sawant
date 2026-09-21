import useInView from '../hooks/useInView'
import useTilt from '../hooks/useTilt'
import { SiReact, SiNodedotjs, SiMongodb, SiExpress, SiTailwindcss, SiTypescript, SiRedux, SiPostgresql, SiPython } from 'react-icons/si'
import { FaMobileAlt } from 'react-icons/fa'
import './Projects.css'

const TAG_ICONS = {
  'React.js': <SiReact />, 'Node.js': <SiNodedotjs />, 'MongoDB': <SiMongodb />,
  'Express.js': <SiExpress />, 'Tailwind CSS': <SiTailwindcss />, 'TypeScript': <SiTypescript />,
  'Redux': <SiRedux />, 'PostgreSQL': <SiPostgresql />, 'Python': <SiPython />,
  'React Native': <FaMobileAlt />,
}

const projects = [
  {
    num: '01',
    name: 'SIGMA / Brain',
    subtitle: 'Clinical Trial Lifecycle Automation · Saama Technologies',
    desc: 'End-to-end clinical data platform serving global pharma clients including Pfizer and Jazz Pharma. Owned the complete UI pipeline from raw data capture to regulatory-ready SDTM/ADaM submission formats.',
    highlights: [
      'Tracked medication vs. placebo groups across Phase I–IV clinical trials',
      'Handled 10,000+ row datasets in Ag-Grid without performance degradation',
      'Optimized REST API integrations with re-render performance tuning',
      'Ensured compliance-ready SDTM/ADaM output for regulatory submissions',
    ],
    tags: ['React.js', 'Redux', 'TypeScript'],
    github: null,
    live: null,
    badge: 'Production',
  },
  {
    num: '02',
    name: 'Expense Manager App',
    subtitle: 'Cross-Platform Mobile Finance Tracker · React Native + Expo',
    desc: 'A full-featured personal finance app built with React Native and TypeScript. Supports multi-currency expense tracking with live exchange rates, custom categories, spending statistics, and full i18n support across 4 languages.',
    highlights: [
      'Live exchange rates via custom useExchangeRates hook with caching',
      'Multi-language support — English, Spanish, French, Hindi',
      'Custom category management with color picker and icon selection',
      'Spending stats screen with category breakdowns and monthly trends',
      'Persistent storage with AsyncStorage and context-based state',
    ],
    tags: ['React Native', 'TypeScript', 'Redux'],
    github: 'https://github.com/abhidsawant/Expense-Manager_App',
    live: null,
    badge: 'Personal',
  },
  {
    num: '03',
    name: 'Structural Health Monitoring of Bridges',
    subtitle: 'AI / Computer Vision · Python + Deep Learning',
    desc: 'A machine learning system for automated crack detection in bridge structures using image classification. Trained on a custom dataset of bridge surface images labeled as Positive (crack) and Negative (no crack).',
    highlights: [
      'Binary image classifier trained on real bridge surface photographs',
      'Custom dataset with Positive/Negative crack labeling pipeline',
      'Model validation pipeline with train/valid split and accuracy tracking',
      'Web interface for uploading bridge images and viewing predictions',
    ],
    tags: ['Python', 'Machine Learning', 'Computer Vision', 'Deep Learning'],
    github: 'https://github.com/abhidsawant/Structural-Health-Monitoring-Of-Bridges',
    live: null,
    badge: 'Personal',
  },
]

export default function Projects() {
  const [ref, inView] = useInView()
  const tilt = useTilt(5)

  return (
    <section id="projects" className="section projects-bg" ref={ref}>
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <div
              key={i}
              ref={tilt.ref}
              onMouseMove={tilt.onMouseMove}
              onMouseLeave={tilt.onMouseLeave}
              className={`card project-card reveal ${inView ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="project-header">
                <span className="project-num">{p.num}</span>
                <span className={`project-badge badge-${p.badge.toLowerCase()}`}>{p.badge}</span>
              </div>
              <h3 className="project-name">{p.name}</h3>
              <p className="project-subtitle">{p.subtitle}</p>
              <p className="project-desc">{p.desc}</p>
              <ul className="project-highlights">
                {p.highlights.map((h, j) => <li key={j}>{h}</li>)}
              </ul>
              <div className="project-footer">
                <div className="project-tags">
                  {p.tags.map(t => (
                    <span key={t} className="tag project-tag">
                      {TAG_ICONS[t] && <span className="tag-icon">{TAG_ICONS[t]}</span>}{t}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="proj-link">GitHub ↗</a>}
                  {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="proj-link proj-link-live">Live ↗</a>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
