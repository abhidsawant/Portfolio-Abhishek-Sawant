import { useEffect } from 'react'
import { SiReact, SiNodedotjs, SiMongodb, SiExpress, SiTailwindcss, SiTypescript, SiRedux, SiPostgresql, SiPython } from 'react-icons/si'
import { FaMobileAlt } from 'react-icons/fa'
import './ProjectCaseStudy.css'

const TAG_ICONS = {
  'React.js': <SiReact />, 'Node.js': <SiNodedotjs />, 'MongoDB': <SiMongodb />,
  'Express.js': <SiExpress />, 'Tailwind CSS': <SiTailwindcss />, 'TypeScript': <SiTypescript />,
  'Redux': <SiRedux />, 'PostgreSQL': <SiPostgresql />, 'Python': <SiPython />,
  'React Native': <FaMobileAlt />,
}

export default function ProjectCaseStudy({ project, onClose }) {
  // lock body scroll & close on Escape
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  if (!project) return null

  return (
    <div className="cs-overlay" onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="cs-modal">

        {/* Header */}
        <div className="cs-header">
          <div className="cs-header-left">
            <span className="cs-num">{project.num}</span>
            <span className={`cs-badge badge-${project.badge.toLowerCase()}`}>{project.badge}</span>
          </div>
          <button className="cs-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="cs-body">
          <h2 className="cs-name">{project.name}</h2>
          <p className="cs-subtitle">{project.subtitle}</p>

          {/* Overview */}
          <div className="cs-section">
            <h3 className="cs-section-title">Overview</h3>
            <p className="cs-text">{project.desc}</p>
          </div>

          {/* Problem / Solution */}
          {project.nda ? (
            <div className="cs-nda">
              <span className="cs-nda-icon">🔒</span>
              <div>
                <p className="cs-nda-title">Restricted under NDA</p>
                <p className="cs-nda-text">Detailed problem and solution information for this project is confidential due to a non-disclosure agreement with Saama Technologies. The highlights above reflect what can be shared publicly.</p>
              </div>
            </div>
          ) : (
            <div className="cs-two-col">
              <div className="cs-block">
                <h3 className="cs-section-title">The Problem</h3>
                <p className="cs-text">{project.problem}</p>
              </div>
              <div className="cs-block">
                <h3 className="cs-section-title">The Solution</h3>
                <p className="cs-text">{project.solution}</p>
              </div>
            </div>
          )}

          {/* Key Features */}
          <div className="cs-section">
            <h3 className="cs-section-title">Key Features</h3>
            <ul className="cs-highlights">
              {project.highlights.map((h, i) => (
                <li key={i} className="cs-highlight-item">
                  <span className="cs-highlight-dot" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Role & Impact */}
          {project.role && (
            <div className="cs-two-col">
              <div className="cs-block">
                <h3 className="cs-section-title">My Role</h3>
                <p className="cs-text">{project.role}</p>
              </div>
              {project.impact && (
                <div className="cs-block">
                  <h3 className="cs-section-title">Impact</h3>
                  <p className="cs-text">{project.impact}</p>
                </div>
              )}
            </div>
          )}

          {/* Tech Stack */}
          <div className="cs-section">
            <h3 className="cs-section-title">Tech Stack</h3>
            <div className="cs-tags">
              {project.tags.map(t => (
                <span key={t} className="tag cs-tag">
                  {TAG_ICONS[t] && <span className="tag-icon">{TAG_ICONS[t]}</span>}
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="cs-links">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="btn-outline cs-link">
                GitHub ↗
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" className="btn-primary cs-link">
                Live Demo ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
