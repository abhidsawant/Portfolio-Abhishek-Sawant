import { useState, useRef, useEffect } from 'react'
import './ArchitectureExplorer.css'

function Diagram({ architecture, evolution }) {
  const [active, setActive] = useState(null)
  const [nodeRects, setNodeRects] = useState({})
  const [version, setVersion] = useState(0)
  const containerRef = useRef(null)
  const nodeRefs = useRef({})

  const data = evolution ? evolution[version] : architecture

  useEffect(() => {
    setActive(null)
    setNodeRects({})
    nodeRefs.current = {}
  }, [version, data])

  const measure = useRef(null)
  measure.current = () => {
    if (!containerRef.current) return
    const container = containerRef.current.getBoundingClientRect()
    // container not yet laid out — skip, ResizeObserver will retry
    if (container.width === 0) return
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
  }

  useEffect(() => {
    // Double rAF: first frame commits layout, second frame paints
    // setTimeout 300 catches cases where a CSS transition delays final layout
    let raf1, raf2, timer
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        measure.current()
        // extra pass after any transition (modal scaleIn = 200ms, tab switch)
        timer = setTimeout(() => measure.current(), 300)
      })
    })
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
      clearTimeout(timer)
    }
  }, [data, version])

  useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver(() => requestAnimationFrame(() => measure.current()))
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [data, version])

  if (!data) return null

  const activeNode = data.nodes.find(n => n.id === active)
  const connectedIds = active
    ? data.edges
        .filter(e => e.from === active || e.to === active)
        .flatMap(e => [e.from, e.to])
        .filter(id => id !== active)
    : []

  return (
    <div className="arch-root">
      {/* Version selector */}
      {evolution && (
        <div className="arch-evolution">
          <div className="arch-version-pills">
            {evolution.map((ev, i) => (
              <button
                key={i}
                className={`arch-version-pill ${version === i ? 'arch-version-active' : ''}`}
                onClick={() => setVersion(i)}
              >
                <span className="arch-version-tag">{ev.version}</span>
                <span className="arch-version-label">{ev.label}</span>
              </button>
            ))}
          </div>
          <p className="arch-evolution-note">{data.note}</p>
        </div>
      )}

      <div className="arch-diagram" ref={containerRef}>
        <svg className="arch-svg" aria-hidden="true">
          {data.edges.map((e, i) => {
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

        {data.nodes.map(node => {
          const isActive    = active === node.id
          const isConnected = connectedIds.includes(node.id)
          const isDimmed    = active && !isActive && !isConnected
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

      {/* Detail panel — only show for full architecture (has detail/why/tradeoff) */}
      {!evolution && (
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
              {activeNode.why && (
                <div className="arch-detail-why">
                  <span className="arch-detail-why-label">Why this?</span>
                  <p>{activeNode.why}</p>
                </div>
              )}
              {activeNode.tradeoff && (
                <div className="arch-detail-tradeoff">
                  <span className="arch-detail-tradeoff-label">Trade-off</span>
                  <p>{activeNode.tradeoff}</p>
                </div>
              )}
            </>
          ) : (
            <p className="arch-detail-hint">← Click any node to learn more</p>
          )}
        </div>
      )}
    </div>
  )
}

export default function ArchitectureExplorer({ architecture, evolution }) {
  return <Diagram architecture={architecture} evolution={evolution} />
}
