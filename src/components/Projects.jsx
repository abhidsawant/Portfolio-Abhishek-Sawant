import { useState } from 'react'
import useInView from '../hooks/useInView'
import useTilt from '../hooks/useTilt'
import { SiReact, SiNodedotjs, SiMongodb, SiExpress, SiTailwindcss, SiTypescript, SiRedux, SiPostgresql, SiPython } from 'react-icons/si'
import { FaMobileAlt } from 'react-icons/fa'
import ProjectCaseStudy from './ProjectCaseStudy'
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
    problem: null,
    solution: null,
    nda: true,
    role: 'Frontend Developer at Saama Technologies. Solely responsible for the Specifications Module UI — from architecture decisions to production delivery. Collaborated directly with pharma clients to gather requirements and resolve critical bugs.',
    impact: 'Resolved 70+ high-priority production bugs impacting Pfizer and Jazz Pharma submission timelines. Delivered 12+ major user stories. Received the Q1 2026 Spot Award for Best Performance in the BRAIN team.',
    highlights: [
      'Tracked medication vs. placebo groups across Phase I–IV clinical trials',
      'Handled 10,000+ row datasets in Ag-Grid without performance degradation',
      'Optimized REST API integrations with re-render performance tuning',
      'Ensured compliance-ready SDTM/ADaM output for regulatory submissions',
    ],
    tags: ['React.js', 'Redux Toolkit', 'JavaScript', 'Material UI', 'Ag-Grid', 'REST APIs', 'Webpack'],
    github: null,
    live: null,
    badge: 'Production',
  },
  {
    num: '02',
    name: 'Expense Manager App',
    subtitle: 'Cross-Platform Mobile Finance Tracker · React Native + Expo',
    desc: 'A full-featured personal finance app built with React Native and TypeScript. Supports multi-currency expense tracking with live exchange rates, custom categories, spending statistics, and full i18n support across 4 languages.',
    problem: 'Most expense tracking apps are either too simple or too complex. There was a need for a clean, fast mobile app that supports multiple currencies and languages out of the box, with a smooth onboarding experience.',
    solution: 'Built a React Native app with Expo using TypeScript throughout. Implemented a custom useExchangeRates hook with caching, a full i18n system supporting 4 languages, and a context-based state architecture with AsyncStorage persistence.',
    role: 'Solo developer — designed the architecture, built all screens, implemented the exchange rates API integration, i18n system, and custom category management with color picker.',
    impact: 'Fully functional cross-platform app running on both iOS and Android. Demonstrates ability to build production-quality mobile apps independently with TypeScript, custom hooks, and real API integrations.',
    highlights: [
      'Live exchange rates via custom useExchangeRates hook with caching',
      'Multi-language support — English, Spanish, French, Hindi',
      'Custom category management with color picker and icon selection',
      'Spending stats screen with category breakdowns and monthly trends',
      'Persistent storage with AsyncStorage and context-based state',
    ],
    tags: ['React Native', 'TypeScript', 'Context API', 'Expo', 'i18n', 'API Integration'],
    github: 'https://github.com/abhidsawant/Expense-Manager_App',
    live: null,
    badge: 'Personal',
  },
  {
    num: '03',
    name: 'Structural Health Monitoring of Bridges',
    subtitle: 'AI / Computer Vision · Python + Deep Learning',
    desc: 'A machine learning system for automated crack detection in bridge structures using image classification. Trained on a custom dataset of bridge surface images labeled as Positive (crack) and Negative (no crack).',
    problem: 'Manual inspection of bridge structures is time-consuming, expensive, and prone to human error. There was a need for an automated system that could detect structural cracks from photographs with high accuracy.',
    solution: 'Built a binary image classifier using deep learning trained on a custom dataset of real bridge surface photographs. Implemented a full data pipeline from image collection and labeling to model training, validation, and a web interface for predictions.',
    role: 'Solo developer and researcher — collected and labeled the dataset, designed the model architecture, built the training pipeline, and developed the web interface for uploading images and viewing predictions.',
    impact: 'Demonstrated practical application of computer vision to civil engineering. Achieved reliable crack detection on unseen bridge images. Showcases ability to work across the full ML pipeline from data to deployment.',
    highlights: [
      'Binary image classifier trained on real bridge surface photographs',
      'Custom dataset with Positive/Negative crack labeling pipeline',
      'Model validation pipeline with train/valid split and accuracy tracking',
      'Web interface for uploading bridge images and viewing predictions',
    ],
    tags: ['Python', 'Machine Learning', 'Computer Vision', 'Deep Learning', 'Flask', 'HTML/CSS', 'JavaScript'],
    github: 'https://github.com/abhidsawant/Structural-Health-Monitoring-Of-Bridges',
    live: null,
    badge: 'Personal',
  },
]

export default function Projects() {
  const [ref, inView] = useInView()
  const tilt = useTilt(5)
  const [selected, setSelected] = useState(null)

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
              <button
                className={`proj-case-study-btn ${p.nda ? 'proj-case-study-nda' : ''}`}
                onClick={() => !p.nda && setSelected(p)}
                disabled={p.nda}
              >
                {p.nda ? 'Restricted — NDA 🔒' : 'View Case Study →'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <ProjectCaseStudy project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}
