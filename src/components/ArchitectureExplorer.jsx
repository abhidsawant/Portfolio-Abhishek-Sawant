import { useState, useRef, useEffect } from 'react'
import './ArchitectureExplorer.css'

export default function ArchitectureExplorer({ architecture }) {
  const [active, setActive] = useState(null)
  const [nodeRects, setNodeRects] = useState({})
  const containerRef = useRef(null)
  const nodeRefs = useRef({})

  // Measure node center positions after render
  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current.getBoundingClientRect()
    const rects = {}
    Object.entries(nodeRefs.current).forEach(([id, el]) => {
      if (!el) return
      const r = el.getBoundingClientRect()
      rects[id] = {
        x: r.left - container.left + r.width / 2,
        y: r.top - container.top + r.height / 2,
      }
    })
    setNodeRects(rects)
  }, [architecture])

  if (!architecture) return null

  const activeNode = architecture.nodes.find(n => n.id === active)
  const connectedIds = active
    ? architecture.edges
        .filter(e => e.from === active || e.to === active)
        .flatMap(e => [e.from, e.to])
        .filter(id => id !== active)
    : []

  return (
    <div className="arch-root">
      <div className="arch-diagram" ref={containerRef}>
        {/* Connections */}
        <svg className="arch-svg" aria-hidden="true">
          {architecture.edges.map((e, i) => {
            const from = nodeRects[e.from]
            const to   = nodeRects[e.to]
            if (!from || !to) return null
            const isActive = active === e.from || active === e.to
            return (
              <line
                key={i}
                x1={from.x} y1={from.y}
                x2={to.x}   y2={to.y}
                className={`arch-edge ${isActive ? 'arch-edge-active' : ''}`}
              />
            )
          })}
        </svg>

        {/* Nodes */}
        {architecture.nodes.map(node => {
          const isActive = active === node.id
          const isConnected = connectedIds.includes(node.id)
          const isDimmed = active && !isActive && !isConnected
          return (
            <button
              key={node.id}
              ref={el => nodeRefs.current[node.id] = el}
              className={`arch-node arch-node-${node.type} ${isActive ? 'arch-node-active' : ''} ${isConnected ? 'arch-node-connected' : ''} ${isDimmed ? 'arch-node-dimmed' : ''}`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onClick={() => setActive(isActive ? null : node.id)}
              aria-label={node.label}
            >
              <span className="arch-node-icon">{node.icon}</span>
              <span className="arch-node-label">{node.label}</span>
            </button>
          )
        })}
      </div>

      {/* Detail panel */}
      <div className={`arch-detail ${activeNode ? 'arch-detail-visible' : ''}`}>
        {activeNode ? (
          <>
            <div className="arch-detail-header">
              <span className="arch-detail-icon">{activeNode.icon}</span>
              <span className="arch-detail-name">{activeNode.label}</span>
              <button className="arch-detail-close" onClick={() => setActive(null)}>✕</button>
            </div>
            <p className="arch-detail-desc">{activeNode.detail}</p>
            {activeNode.used && (
              <div className="arch-detail-used">
                <span className="arch-detail-used-label">Used for</span>
                <ul>
                  {activeNode.used.map((u, i) => <li key={i}>{u}</li>)}
                </ul>
              </div>
            )}
          </>
        ) : (
          <p className="arch-detail-hint">← Click any node to learn more</p>
        )}
      </div>
    </div>
  )
}
