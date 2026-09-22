import { useState } from 'react'
import './DecisionsPanel.css'

export default function DecisionsPanel({ decisions }) {
  const [open, setOpen] = useState(0)

  if (!decisions?.length) return null

  return (
    <div className="dp-root">
      {decisions.map((d, i) => (
        <div key={i} className={`dp-card ${open === i ? 'dp-card-open' : ''}`}>
          <button className="dp-trigger" onClick={() => setOpen(open === i ? null : i)}>
            <span className="dp-trigger-left">
              <span className="dp-chosen">{d.chosen}</span>
              <span className="dp-title">{d.title}</span>
            </span>
            <span className="dp-chevron">{open === i ? '▲' : '▼'}</span>
          </button>

          {open === i && (
            <div className="dp-body">
              <div className="dp-section">
                <span className="dp-label dp-label-why">Why this?</span>
                <p className="dp-text">{d.why}</p>
              </div>

              <div className="dp-section">
                <span className="dp-label dp-label-alt">Alternatives considered</span>
                <div className="dp-alts">
                  {d.alternatives.map((a, j) => (
                    <div key={j} className="dp-alt">
                      <span className="dp-alt-name">{a.name}</span>
                      <span className="dp-alt-reason">{a.reason}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="dp-section dp-section-tradeoff">
                <span className="dp-label dp-label-tradeoff">Trade-off</span>
                <p className="dp-text">{d.tradeoff}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
