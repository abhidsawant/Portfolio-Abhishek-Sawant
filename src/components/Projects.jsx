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
        { id: 'ui',      label: 'React UI',     icon: '⚛️',  type: 'client',  x: 50, y: 15, detail: 'React.js functional components with Hooks. Handles all user interactions, form logic, and data display for the Specifications Module.', used: ['Component rendering', 'Form handling', 'Data display'], why: 'React was the team standard and its component model maps cleanly to the modular Specifications UI — each trial phase is an isolated component tree.', tradeoff: 'React alone does not solve cross-module state sharing, which is why Redux was added alongside it.' },
        { id: 'redux',   label: 'Redux',        icon: '🔄',  type: 'state',   x: 20, y: 40, detail: 'Redux Toolkit manages global state across Phase I–IV trial data. Ensures consistent data sync between modules.', used: ['Global state', 'Trial phase sync', 'API cache'], why: 'Multiple disconnected modules — Specifications, Mapping, Review — all need to read and write the same trial state. Redux gives a single source of truth with predictable updates.', tradeoff: 'Adds boilerplate compared to local state. Justified because prop drilling across 4+ module levels would be unmaintainable.' },
        { id: 'aggrid',  label: 'Ag-Grid',      icon: '📊',  type: 'client',  x: 80, y: 40, detail: 'Enterprise data grid handling 10,000+ row clinical datasets at 60fps. Used for all tabular data views.', used: ['Large datasets', 'Sorting/filtering', 'Cell editing'], why: 'Clinical datasets regularly exceed 10,000 rows. Ag-Grid uses virtual scrolling to render only visible rows, maintaining 60fps where standard tables freeze.', tradeoff: 'Ag-Grid Enterprise is a paid library with a large bundle size. The performance requirement at scale made it the only viable option.' },
        { id: 'api',     label: 'REST API',      icon: '🔌',  type: 'api',     x: 50, y: 60, detail: 'REST API integration with the backend clinical data services. Handles all CRUD operations for trial data.', used: ['Data fetching', 'SDTM/ADaM output', 'Auth'], why: 'The backend was already a REST service. Integrating via REST kept the frontend decoupled from backend implementation details and allowed independent deployment.', tradeoff: 'REST requires multiple round-trips for related data. GraphQL would reduce over-fetching but was not adopted due to backend constraints.' },
        { id: 'webpack', label: 'Webpack',       icon: '📦',  type: 'service', x: 20, y: 80, detail: 'Custom Webpack config with code-splitting and tree shaking. Reduced initial bundle size significantly.', used: ['Code splitting', 'Asset optimization', 'Build'], why: 'The project predated Vite adoption at Saama. A custom Webpack config was needed to support the existing micro-frontend shell and module federation setup.', tradeoff: 'Webpack config complexity is high compared to modern tools like Vite. Migration was not feasible mid-project without risking the production pipeline.' },
        { id: 'ts',      label: 'TypeScript',    icon: '🔷',  type: 'service', x: 80, y: 80, detail: 'TypeScript throughout for type safety across complex clinical data models and API response shapes.', used: ['Type safety', 'API types', 'Component props'], why: 'Clinical data models are deeply nested and change frequently with regulatory requirements. TypeScript catches shape mismatches at compile time rather than at runtime during a pharma submission.', tradeoff: 'Slower initial development due to type definitions. The investment pays off in a long-lived codebase where API contracts change and bugs are costly.' },
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
    decisions: [
      {
        title: 'Why Redux over local component state?',
        chosen: 'Redux Toolkit',
        why: 'The Specifications Module has multiple disconnected panels that all read and write the same clinical trial state. Local state would require lifting state to a common ancestor several levels up, creating a deeply nested prop-drilling chain that is fragile and hard to debug.',
        alternatives: [
          { name: 'Local component state', reason: 'Would require prop drilling across 4+ component levels. Any state update in a child would trigger re-renders up the entire tree.' },
          { name: 'React Context', reason: 'Context re-renders all consumers on every update. With 10,000-row grids this caused visible frame drops in testing.' },
          { name: 'Zustand', reason: 'Not evaluated — the team had existing Redux expertise. Introducing a new library mid-project carried unnecessary risk.' },
        ],
        tradeoff: 'Redux adds boilerplate (actions, reducers, selectors) and a steeper learning curve. The payoff is predictable state updates, time-travel debugging via Redux DevTools, and a clear data flow that new team members can follow.',
      },
      {
        title: 'Why Ag-Grid over a standard React table?',
        chosen: 'Ag-Grid Enterprise',
        why: 'Clinical datasets regularly contain 10,000–50,000 rows. Standard HTML tables render all rows to the DOM simultaneously, causing the browser to freeze. Ag-Grid uses virtual scrolling — only visible rows are in the DOM at any time — maintaining 60fps regardless of dataset size.',
        alternatives: [
          { name: 'React Table (TanStack)', reason: 'Does not include built-in virtualisation. Would require a separate library and significant custom integration work.' },
          { name: 'MUI DataGrid', reason: 'The free tier lacks row virtualisation above 100 rows. The Pro tier was an additional cost with fewer features than Ag-Grid Enterprise.' },
          { name: 'Custom table', reason: 'Building a virtualised table from scratch was estimated at 3–4 weeks. Ag-Grid solved the problem on day one.' },
        ],
        tradeoff: 'Ag-Grid Enterprise is a paid library with a large bundle size (~500KB gzipped). The performance requirement at scale made this the only viable option for a pharma production environment.',
      },
      {
        title: 'Why TypeScript in a JavaScript codebase?',
        chosen: 'TypeScript',
        why: 'Clinical data models are deeply nested objects that change with every regulatory update. Without types, a backend API change silently breaks the UI at runtime — potentially during a pharma submission deadline. TypeScript catches shape mismatches at compile time.',
        alternatives: [
          { name: 'Plain JavaScript with JSDoc', reason: 'Provides some editor hints but no compile-time guarantees. A mistyped property name still ships to production.' },
          { name: 'Runtime validation (Zod)', reason: 'Catches errors at runtime rather than build time. Useful as a complement to TypeScript, not a replacement.' },
        ],
        tradeoff: 'TypeScript slows initial development due to writing type definitions. In a long-lived codebase with frequent API contract changes, this investment pays back quickly in prevented bugs.',
      },
    ],
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
    decisions: [
      {
        title: 'Why Context API over Redux?',
        chosen: 'React Context API',
        why: 'The app has a small, well-defined global state — a list of expenses, categories, selected currency, and active language. This is exactly the use case Context was designed for. Redux would add actions, reducers, and a store for state that fits in three context files.',
        alternatives: [
          { name: 'Redux Toolkit', reason: 'Overkill for this scope. The boilerplate cost exceeds the benefit when state has fewer than five top-level keys and no complex async flows.' },
          { name: 'Zustand', reason: 'A valid lightweight alternative. Context was chosen because it requires zero additional dependencies and the state shape is simple enough that Zustand offers no practical advantage.' },
          { name: 'Local component state', reason: 'Expenses need to be accessible from the Add screen, List screen, and Statistics screen simultaneously. Local state cannot span screens.' },
        ],
        tradeoff: 'Context re-renders all consumers when the value changes. Mitigated by splitting into separate contexts (ExpenseContext, SettingsContext) so a currency change does not re-render the expense list.',
      },
      {
        title: 'Why AsyncStorage over a local database?',
        chosen: 'AsyncStorage',
        why: 'The data model is a flat list of expense objects. There are no relational queries, no joins, and no need for indexed lookups. Serialising to JSON and storing in AsyncStorage is simpler and faster to implement than setting up SQLite or Realm.',
        alternatives: [
          { name: 'SQLite (expo-sqlite)', reason: 'Appropriate for relational data with complex queries. For a flat expense list it adds schema management and query overhead with no benefit.' },
          { name: 'Realm', reason: 'A powerful mobile database but requires a native module, complicating the Expo managed workflow. Not justified for this data model.' },
        ],
        tradeoff: 'AsyncStorage is unencrypted and has a 6MB limit on some Android versions. For a personal app this is acceptable. A production finance app would use expo-secure-store for sensitive fields.',
      },
      {
        title: 'Why build a custom useExchangeRates hook?',
        chosen: 'Custom hook with in-memory cache',
        why: 'The exchange rates API has a free-tier rate limit. Fetching on every currency conversion would exhaust the limit quickly. A custom hook fetches once per session, caches the result in memory, and exposes a simple convert(amount, from, to) interface to all consumers.',
        alternatives: [
          { name: 'Fetch on every conversion', reason: 'Would hit rate limits within minutes of normal usage and cause visible loading delays on every keypress in the amount field.' },
          { name: 'React Query', reason: 'Would handle caching automatically but adds a dependency. The caching requirement here is simple enough to implement in 20 lines of custom hook code.' },
        ],
        tradeoff: 'In-memory cache is lost on app restart, so the first conversion after each launch makes a network request. A persistent cache in AsyncStorage would eliminate this but adds complexity not warranted for a personal app.',
      },
    ],
    github: 'https://github.com/abhidsawant/Expense-Manager_App',
    live: null,
    badge: 'Personal',
    architecture: {
      nodes: [
        { id: 'app',      label: 'React Native', icon: '📱',  type: 'client',  x: 50, y: 12, detail: 'React Native + Expo app running on iOS and Android. All screens built with functional components and TypeScript.', used: ['UI screens', 'Navigation', 'Platform APIs'], why: 'React Native with Expo allows a single TypeScript codebase to ship on both iOS and Android. Expo removes native build toolchain complexity for a solo developer.', tradeoff: 'Expo managed workflow limits access to some native modules. Acceptable here since the app does not require Bluetooth, background location, or other restricted APIs.' },
        { id: 'nav',      label: 'Navigation',   icon: '🧭',  type: 'client',  x: 20, y: 35, detail: 'React Navigation with stack and tab navigators. Handles screen transitions and deep linking.', used: ['Screen routing', 'Tab bar', 'Stack navigation'], why: 'React Navigation is the de-facto standard for React Native routing. It integrates with the gesture handler and provides native-feeling transitions on both platforms.', tradeoff: 'Requires careful configuration to avoid re-mounting screens on tab switches. Solved with the unmountOnBlur option and memoised screen components.' },
        { id: 'context',  label: 'Context API',  icon: '🔄',  type: 'state',   x: 80, y: 35, detail: 'React Context for global state — expenses, categories, and theme. Persisted with AsyncStorage.', used: ['Expenses state', 'Categories', 'Theme'], why: 'The app has a small, well-defined global state. Context API handles this without the overhead of Redux or Zustand.', tradeoff: 'Context re-renders all consumers on every update. Mitigated by splitting into separate contexts so unrelated components do not re-render.' },
        { id: 'storage',  label: 'AsyncStorage', icon: '💾',  type: 'db',      x: 80, y: 62, detail: 'AsyncStorage for persistent local data. All expenses and settings survive app restarts.', used: ['Expense persistence', 'Settings', 'Categories'], why: 'A personal finance app must survive app restarts. AsyncStorage is the standard Expo-compatible key-value store for persisting JSON data locally without a backend.', tradeoff: 'AsyncStorage is unencrypted. For a personal app this is acceptable, but a production finance app would use expo-secure-store for sensitive data.' },
        { id: 'api',      label: 'Exchange API', icon: '🌐',  type: 'api',     x: 20, y: 62, detail: 'Live exchange rates fetched from a public currency API via custom useExchangeRates hook with in-memory caching.', used: ['Currency conversion', 'Rate caching', 'Multi-currency'], why: 'Hard-coding exchange rates would make the app inaccurate within days. A free public API provides live rates. The custom hook adds in-memory caching to avoid redundant network calls.', tradeoff: 'The free tier has rate limits. The caching strategy keeps requests well within limits for normal usage.' },
        { id: 'i18n',     label: 'i18n',         icon: '🇳🇬',  type: 'service', x: 50, y: 85, detail: 'Full internationalisation supporting English, Spanish, French, and Hindi. Language preference persisted locally.', used: ['EN / ES / FR / HI', 'Dynamic strings', 'RTL support'], why: 'Building i18n from the start is significantly cheaper than retrofitting it. All UI strings are externalised into locale files, making adding a new language a content task rather than a code change.', tradeoff: 'Adds initial setup overhead and discipline to never hardcode strings. The payoff is a genuinely multilingual app rather than an English-only one.' },
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
    decisions: [
      {
        title: 'Why a custom CNN over a pretrained model?',
        chosen: 'Custom CNN trained from scratch',
        why: 'The goal was to understand the full ML pipeline — data collection, labeling, architecture design, training, and validation. Using a pretrained model would have reduced the project to fine-tuning, which does not demonstrate the same depth of understanding.',
        alternatives: [
          { name: 'Transfer learning (ResNet-50)', reason: 'Would achieve higher accuracy with less data. Ruled out because the learning objective was to build and train a model architecture, not to apply an existing one.' },
          { name: 'Traditional CV (edge detection)', reason: 'Canny edge detection and morphological operations were evaluated early. They produced too many false positives on textured concrete surfaces without cracks.' },
        ],
        tradeoff: 'A custom CNN trained on a small dataset is more prone to overfitting than a pretrained model. Data augmentation was used to improve generalisation, but a larger dataset would be needed for production use.',
      },
      {
        title: 'Why Flask over FastAPI or Django?',
        chosen: 'Flask',
        why: 'The API has a single endpoint: accept an image, run inference, return a prediction. Flask is the minimal tool for this job. It keeps the model and the serving layer in the same Python process with no serialisation overhead.',
        alternatives: [
          { name: 'FastAPI', reason: 'Better for async, high-concurrency serving. Overkill for a single-endpoint research prototype with one user.' },
          { name: 'Django REST Framework', reason: 'Designed for full web applications with databases, auth, and admin panels. Far too heavy for a model-serving endpoint.' },
          { name: 'TensorFlow Serving', reason: 'The production-grade option for serving TF models at scale. Requires Docker and a separate deployment pipeline — not appropriate for a research prototype.' },
        ],
        tradeoff: 'Flask is synchronous and single-threaded. Under concurrent load it would queue requests. For a research demo with one user this is irrelevant; for production it would need to be replaced with an async framework.',
      },
      {
        title: 'Why collect a custom dataset?',
        chosen: 'Custom labeled dataset',
        why: 'No suitable public dataset of Indian bridge surface conditions existed. Existing crack datasets (SDNET2018, CFD) contain road and building surfaces that differ in texture, lighting, and crack morphology from bridge concrete. Training on mismatched data produces a model that performs well on benchmarks but poorly on the actual target domain.',
        alternatives: [
          { name: 'SDNET2018 public dataset', reason: 'Contains concrete crack images but from US infrastructure. Surface texture and environmental conditions differ enough to reduce accuracy on Indian bridge surfaces.' },
          { name: 'Crack Forest Dataset (CFD)', reason: 'Road surface cracks only. Bridge surfaces have different texture profiles and crack patterns.' },
        ],
        tradeoff: 'A custom dataset is smaller than public benchmarks, limiting generalisation. Data augmentation partially compensates, but a production system would require a much larger and more diverse dataset.',
      },
    ],
    github: 'https://github.com/abhidsawant/Structural-Health-Monitoring-Of-Bridges',
    live: null,
    badge: 'Personal',
    architecture: {
      nodes: [
        { id: 'web',     label: 'Web UI',       icon: '🌐',  type: 'client',  x: 50, y: 12, detail: 'HTML/CSS/JavaScript frontend for uploading bridge images and viewing crack detection predictions in real time.', used: ['Image upload', 'Result display', 'User interface'], why: 'A lightweight HTML/JS frontend was sufficient for a research prototype. A full framework would add unnecessary complexity for a single-page upload-and-predict interface.', tradeoff: 'Vanilla JS does not scale well for complex UIs. A production system would use a React frontend with proper state management.' },
        { id: 'flask',   label: 'Flask API',    icon: '🐍',  type: 'api',     x: 50, y: 38, detail: 'Python Flask server exposes a REST endpoint that accepts image uploads and returns model predictions.', used: ['Image endpoint', 'Model serving', 'Response formatting'], why: 'Flask is the natural choice for serving a Python ML model. It keeps the model and the API in the same language and runtime, avoiding serialisation overhead of a cross-language bridge.', tradeoff: 'Flask is single-threaded and not suitable for high-concurrency production serving. A production deployment would use FastAPI with async support or TensorFlow Serving.' },
        { id: 'model',   label: 'CNN Model',    icon: '🧠',  type: 'ml',      x: 20, y: 62, detail: 'Convolutional Neural Network trained on custom bridge surface dataset. Binary classifier: Crack / No Crack.', used: ['Image classification', 'Feature extraction', 'Prediction'], why: 'CNNs are the standard architecture for image classification. Convolutional layers automatically learn spatial features like crack edges and texture patterns without manual feature engineering.', tradeoff: 'A custom CNN trained on a small dataset risks overfitting. Transfer learning from a pretrained model (ResNet, VGG) would improve generalisation but was out of scope for this research prototype.' },
        { id: 'dataset', label: 'Dataset',      icon: '🖼️',  type: 'db',      x: 80, y: 62, detail: 'Custom labeled dataset of real bridge surface photographs split into Positive (crack) and Negative (no crack) classes.', used: ['Training data', 'Validation split', 'Labeling pipeline'], why: 'No suitable public dataset of Indian bridge surface conditions existed. Existing crack datasets contain road and building surfaces that differ in texture and crack morphology from bridge concrete.', tradeoff: 'A custom dataset is smaller than public benchmarks. Data augmentation (rotation, brightness jitter) was used to artificially expand the training set.' },
        { id: 'pipeline',label: 'ML Pipeline',  icon: '⚙️',  type: 'service', x: 50, y: 85, detail: 'End-to-end pipeline: data collection → preprocessing → training → validation → model export → Flask serving.', used: ['Preprocessing', 'Training loop', 'Model export'], why: 'Formalising the pipeline as discrete stages made it reproducible and debuggable. Each stage could be re-run independently when data or hyperparameters changed.', tradeoff: 'The pipeline was manual and script-based rather than orchestrated. A production system would need experiment tracking and automated retraining.' },
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
