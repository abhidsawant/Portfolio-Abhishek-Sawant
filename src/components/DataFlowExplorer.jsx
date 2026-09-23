import { useState, useEffect, useRef } from 'react'
import './DataFlowExplorer.css'

export default function DataFlowExplorer({ dataFlow }) {
  const [mode, setMode]       = useState('normal')
  const [active, setActive]   = useState(null)
  const [running, setRunning] = useState(false)
  const [reached, setReached] = useState([])
  const [nodeRects, setNodeRects] = useState({})
  const containerRef = useRef(null)
  const nodeRefs     = useRef({})
  const timerRefs    = useRef([])

  useEffect(() => () => timerRefs.current.forEach(clearTimeout), [])

  useEffect(() => {
    setActive(null)
    setReached([])
    setRunning(false)
    timerRefs.current.forEach(clearTimeout)
  }, [mode, dataFlow])

  // measure node centers after paint
  const measure = () => {
    if (!containerRef.current) return
    const box = containerRef.current.getBoundingClientRect()
    const rects = {}
    Object.entries(nodeRefs.current).forEach(([id, el]) => {
      if (!el) return
      const r = el.getBoundingClientRect()
      rects[id] = { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 }
    })
    setNodeRects(rects)
  }

  useEffect(() => {
    const id = requestAnimationFrame(measure)
    return () => cancelAnimationFrame(id)
  }, [dataFlow, mode])

  useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver(() => requestAnimationFrame(measure))
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [dataFlow])

  if (!dataFlow) return null

  const { steps, edges, failureNode, failureSteps, failureNote } = dataFlow
  const failureIndex = steps.findIndex(s => s.id === failureNode)

  function runFlow() {
    if (running) return
    setReached([])
    setActive(null)
    setRunning(true)
    const stopAt = mode === 'failure' ? failureNode : null
    steps.forEach((step, i) => {
      const t = setTimeout(() => {
        setReached(prev => [...prev, step.id])
        if ((stopAt && step.id === stopAt) || i === steps.length - 1) setRunning(false)
      }, i * 600)
      timerRefs.current.push(t)
    })
  }

  function getStepState(step, index) {
    if (mode === 'failure') {
      if (index < failureIndex)  return reached.includes(step.id) ? 'reached' : 'idle'
      if (index === failureIndex) return reached.includes(step.id) ? 'failed' : 'idle'
      return 'blocked'
    }
    return reached.includes(step.id) ? 'reached' : 'idle'
  }

  function getEdgeState(edge) {
    const fromIdx = steps.findIndex(s => s.id === edge.from)
    const toIdx   = steps.findIndex(s => s.id === edge.to)
    if (mode === 'failure' && (fromIdx >= failureIndex || toIdx > failureIndex)) return 'blocked'
    if (reached.includes(edge.from) && reached.includes(edge.to)) return 'active'
    return 'idle'
  }

  const activeStep = steps.find(s => s.id === active)

  // Use explicit x/y from data if present, otherwise auto-layout vertically
  const hasExplicitLayout = steps.every(s => s.x !== undefined && s.y !== undefined)
  const ROW_GAP  = 72
  const CANVAS_H = hasExplicitLayout ? 340 : steps.length * ROW_GAP + 20

  const positions = {}
  steps.forEach((step, i) => {
    positions[step.id] = hasExplicitLayout
      ? { x: step.x, y: step.y }
      : { x: 50, y: ((i * ROW_GAP + ROW_GAP / 2) / CANVAS_H) * 100 }
  })

  return (
    <div className="df-root">
      {/* Controls */}
      <div className="df-controls">
        <div className="df-mode-toggle">
          <button className={`df-mode-btn ${mode === 'normal' ? 'df-mode-active' : ''}`} onClick={() => setMode('normal')}>Normal Flow</button>
          <button className={`df-mode-btn df-mode-failure-btn ${mode === 'failure' ? 'df-mode-active df-mode-failure-active' : ''}`} onClick={() => setMode('failure')}>Failure Mode</button>
        </div>
        <button className="df-run-btn" onClick={runFlow} disabled={running}>
          {running ? 'Running...' : '▶ Run Flow'}
        </button>
      </div>

      {mode === 'failure' && failureNote && (
        <div className="df-failure-banner">
          <span className="df-failure-banner-icon">⚠️</span>
          <span>{failureNote}</span>
        </div>
      )}

      {/* SVG canvas diagram */}
      <div className="df-canvas" style={{ height: CANVAS_H }} ref={containerRef}>
        {/* SVG edges */}
        <svg className="df-svg" aria-hidden="true">
          {edges.map((edge, i) => {
            const from = nodeRects[edge.from]
            const to   = nodeRects[edge.to]
            if (!from || !to) return null
            const state = getEdgeState(edge)
            // midpoint for label
            const mx = (from.x + to.x) / 2
            const my = (from.y + to.y) / 2
            return (
              <g key={i}>
                <line
                  x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                  className={`df-svg-edge df-svg-edge-${state}`}
                />
                {edge.label && (
                  <text x={mx + 6} y={my} className={`df-svg-label df-svg-label-${state}`}>
                    {edge.label}
                  </text>
                )}
              </g>
            )
          })}
        </svg>

        {/* Step nodes */}
        {steps.map((step, i) => {
          const state = getStepState(step, i)
          const pos   = positions[step.id]
          return (
            <button
              key={step.id}
              ref={el => nodeRefs.current[step.id] = el}
              className={`df-step df-step-${state}`}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              onClick={() => setActive(active === step.id ? null : step.id)}
            >
              <span className="df-step-icon">{step.icon}</span>
              <span className="df-step-label">{step.label}</span>
              {state === 'reached' && <span className="df-step-check">✓</span>}
              {state === 'failed'  && <span className="df-step-x">✕</span>}
              {state === 'blocked' && <span className="df-step-block">—</span>}
            </button>
          )
        })}
      </div>

      {/* Failure chain */}
      {mode === 'failure' && reached.includes(failureNode) && failureSteps?.length > 0 && (
        <div className="df-failure-chain">
          <span className="df-failure-chain-title">Failure Chain</span>
          <ol className="df-failure-chain-list">
            {failureSteps.map((s, i) => (
              <li key={i} className="df-failure-chain-item">
                <span className="df-failure-chain-num">{i + 1}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Detail panel */}
      <div className={`df-detail ${activeStep ? 'df-detail-visible' : ''}`}>
        {activeStep ? (
          <>
            <div className="df-detail-header">
              <span className="df-detail-icon">{activeStep.icon}</span>
              <span className="df-detail-name">{activeStep.label}</span>
              <button className="df-detail-close" onClick={() => setActive(null)}>✕</button>
            </div>
            <p className="df-detail-desc">{activeStep.detail}</p>
          </>
        ) : (
          <p className="df-detail-hint">↑ Click any step to learn more</p>
        )}
      </div>
    </div>
  )
}
