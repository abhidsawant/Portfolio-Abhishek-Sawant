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
    architecture: {
      nodes: [
        { id: 'ui',      label: 'React UI',     icon: '⚛️',  type: 'client',  x: 50, y: 15, detail: 'React.js functional components with Hooks. Handles all user interactions, form logic, and data display for the Specifications Module.', used: ['Component rendering', 'Form handling', 'Data display'] },
        { id: 'redux',   label: 'Redux',        icon: '🔄',  type: 'state',   x: 20, y: 40, detail: 'Redux Toolkit manages global state across Phase I–IV trial data. Ensures consistent data sync between modules.', used: ['Global state', 'Trial phase sync', 'API cache'] },
        { id: 'aggrid',  label: 'Ag-Grid',      icon: '📊',  type: 'client',  x: 80, y: 40, detail: 'Enterprise data grid handling 10,000+ row clinical datasets at 60fps. Used for all tabular data views.', used: ['Large datasets', 'Sorting/filtering', 'Cell editing'] },
        { id: 'api',     label: 'REST API',      icon: '🔌',  type: 'api',     x: 50, y: 60, detail: 'REST API integration with the backend clinical data services. Handles all CRUD operations for trial data.', used: ['Data fetching', 'SDTM/ADaM output', 'Auth'] },
        { id: 'webpack', label: 'Webpack',       icon: '📦',  type: 'service', x: 20, y: 80, detail: 'Custom Webpack config with code-splitting and tree shaking. Reduced initial bundle size significantly.', used: ['Code splitting', 'Asset optimization', 'Build'] },
        { id: 'ts',      label: 'TypeScript',    icon: '🔷',  type: 'service', x: 80, y: 80, detail: 'TypeScript throughout for type safety across complex clinical data models and API response shapes.', used: ['Type safety', 'API types', 'Component props'] },
      ],
      edges: [
        { from: 'ui', to: 'redux' }, { from: 'ui', to: 'aggrid' },
        { from: 'ui', to: 'api' },   { from: 'redux', to: 'api' },
        { from: 'api', to: 'webpack' }, { from: 'ui', to: 'ts' },
      ],
    },
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
    architecture: {
      nodes: [
        { id: 'app',      label: 'React Native', icon: '📱',  type: 'client',  x: 50, y: 12, detail: 'React Native + Expo app running on iOS and Android. All screens built with functional components and TypeScript.', used: ['UI screens', 'Navigation', 'Platform APIs'] },
        { id: 'nav',      label: 'Navigation',   icon: '🧭',  type: 'client',  x: 20, y: 35, detail: 'React Navigation with stack and tab navigators. Handles screen transitions and deep linking.', used: ['Screen routing', 'Tab bar', 'Stack navigation'] },
        { id: 'context',  label: 'Context API',  icon: '🔄',  type: 'state',   x: 80, y: 35, detail: 'React Context for global state — expenses, categories, and theme. Persisted with AsyncStorage.', used: ['Expenses state', 'Categories', 'Theme'] },
        { id: 'storage',  label: 'AsyncStorage', icon: '💾',  type: 'db',      x: 80, y: 62, detail: 'AsyncStorage for persistent local data. All expenses and settings survive app restarts.', used: ['Expense persistence', 'Settings', 'Categories'] },
        { id: 'api',      label: 'Exchange API', icon: '🌐',  type: 'api',     x: 20, y: 62, detail: 'Live exchange rates fetched from a public currency API via custom useExchangeRates hook with in-memory caching.', used: ['Currency conversion', 'Rate caching', 'Multi-currency'] },
        { id: 'i18n',     label: 'i18n',         icon: '🇳🇬',  type: 'service', x: 50, y: 85, detail: 'Full internationalisation supporting English, Spanish, French, and Hindi. Language preference persisted locally.', used: ['EN / ES / FR / HI', 'Dynamic strings', 'RTL support'] },
      ],
      edges: [
        { from: 'app', to: 'nav' }, { from: 'app', to: 'context' },
        { from: 'context', to: 'storage' }, { from: 'app', to: 'api' },
        { from: 'api', to: 'context' }, { from: 'app', to: 'i18n' },
      ],
    },
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
    architecture: {
      nodes: [
        { id: 'web',     label: 'Web UI',       icon: '🌐',  type: 'client',  x: 50, y: 12, detail: 'HTML/CSS/JavaScript frontend for uploading bridge images and viewing crack detection predictions in real time.', used: ['Image upload', 'Result display', 'User interface'] },
        { id: 'flask',   label: 'Flask API',    icon: '🐍',  type: 'api',     x: 50, y: 38, detail: 'Python Flask server exposes a REST endpoint that accepts image uploads and returns model predictions.', used: ['Image endpoint', 'Model serving', 'Response formatting'] },
        { id: 'model',   label: 'CNN Model',    icon: '🧠',  type: 'ml',      x: 20, y: 62, detail: 'Convolutional Neural Network trained on custom bridge surface dataset. Binary classifier: Crack / No Crack.', used: ['Image classification', 'Feature extraction', 'Prediction'] },
        { id: 'dataset', label: 'Dataset',      icon: '🖼️',  type: 'db',      x: 80, y: 62, detail: 'Custom labeled dataset of real bridge surface photographs split into Positive (crack) and Negative (no crack) classes.', used: ['Training data', 'Validation split', 'Labeling pipeline'] },
        { id: 'pipeline',label: 'ML Pipeline',  icon: '⚙️',  type: 'service', x: 50, y: 85, detail: 'End-to-end pipeline: data collection → preprocessing → training → validation → model export → Flask serving.', used: ['Preprocessing', 'Training loop', 'Model export'] },
      ],
      edges: [
        { from: 'web', to: 'flask' }, { from: 'flask', to: 'model' },
        { from: 'model', to: 'dataset' }, { from: 'dataset', to: 'pipeline' },
        { from: 'pipeline', to: 'model' },
      ],
    },
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
