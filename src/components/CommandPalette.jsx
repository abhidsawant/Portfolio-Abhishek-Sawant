import { useState, useEffect, useRef, useCallback } from 'react'
import './CommandPalette.css'

const ACTIONS = [
  { id: 'about',      label: 'About Me',           hint: 'Navigate',  icon: '👤', type: 'nav',  target: '#about' },
  { id: 'skills',     label: 'Skills',              hint: 'Navigate',  icon: '⚡', type: 'nav',  target: '#skills' },
  { id: 'experience', label: 'Experience',          hint: 'Navigate',  icon: '💼', type: 'nav',  target: '#experience' },
  { id: 'projects',   label: 'Projects',            hint: 'Navigate',  icon: '🚀', type: 'nav',  target: '#projects' },
  { id: 'github-sec', label: 'GitHub Activity',     hint: 'Navigate',  icon: '🐙', type: 'nav',  target: '#github' },
  { id: 'education',  label: 'Education',           hint: 'Navigate',  icon: '🎓', type: 'nav',  target: '#education' },
  { id: 'contact',    label: 'Contact',             hint: 'Navigate',  icon: '✉️', type: 'nav',  target: '#contact' },
  { id: 'resume',     label: 'Download Resume',     hint: 'Download',  icon: '📄', type: 'link', target: '/Abhishek_Sawant_Resume.pdf', download: true },
  { id: 'github',     label: 'Open GitHub',         hint: 'External',  icon: '🐙', type: 'link', target: 'https://github.com/abhidsawant' },
  { id: 'linkedin',   label: 'Open LinkedIn',       hint: 'External',  icon: '💼', type: 'link', target: 'https://linkedin.com/in/abhishek-dhanaji-sawant-933639241' },
  { id: 'hire',       label: 'Hire Me',             hint: 'Navigate',  icon: '🤝', type: 'nav',  target: '#contact' },
  { id: 'terminal',   label: 'Open Terminal',        hint: 'Easter Egg', icon: '⌨️', type: 'terminal' },
]

const isMac = navigator.platform?.includes('Mac') || navigator.userAgent?.includes('Mac')
const MOD = isMac ? '⌘' : 'Ctrl'

export default function CommandPalette({ open, onClose, onOpen, onOpenTerminal }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [lastUsed, setLastUsed] = useState(null)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  const filtered = ACTIONS.filter(a =>
    a.label.toLowerCase().includes(query.toLowerCase())
  )

  // reset on open — keep lastUsed, just reset query and focus last used item
  useEffect(() => {
    if (open) {
      setQuery('')
      const idx = ACTIONS.findIndex(a => a.id === lastUsed)
      setActive(idx >= 0 ? idx : 0)
      setTimeout(() => inputRef.current?.focus(), 10)
    }
  }, [open])

  // clamp active index when filtered list changes
  useEffect(() => {
    setActive(i => Math.min(i, Math.max(filtered.length - 1, 0)))
  }, [filtered.length])

  // scroll active item into view
  useEffect(() => {
    const el = listRef.current?.children[active]
    el?.scrollIntoView({ block: 'nearest' })
  }, [active])

  const runAction = useCallback(action => {
    setLastUsed(action.id)
    onClose()
    if (action.type === 'nav') {
      const el = document.querySelector(action.target)
      el?.scrollIntoView({ behavior: 'smooth' })
    } else if (action.type === 'terminal') {
      onOpenTerminal?.()
    } else if (action.type === 'link') {
      if (action.download) {
        const a = document.createElement('a')
        a.href = action.target
        a.download = ''
        a.click()
      } else {
        window.open(action.target, '_blank', 'noreferrer')
      }
    }
  }, [onClose])

  const onKeyDown = e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(i => Math.min(i + 1, filtered.length - 1)) }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setActive(i => Math.max(i - 1, 0)) }
    if (e.key === 'Enter' && filtered[active]) runAction(filtered[active])
    if (e.key === 'Escape') onClose()
  }

  if (!open) return (
    <button className="cp-fab" onClick={onOpen} aria-label="Open command palette">⌘</button>
  )

  return (
    <div className="cp-overlay" onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="cp-modal" role="dialog" aria-modal="true" aria-label="Command palette">
        <div className="cp-search">
          <span className="cp-search-icon">⌘</span>
          <input
            ref={inputRef}
            className="cp-input"
            placeholder="Type a command or search..."
            value={query}
            onChange={e => { setQuery(e.target.value); setActive(0) }}
            onKeyDown={onKeyDown}
            autoComplete="off"
            spellCheck="false"
          />
          {query && (
            <button className="cp-clear" onClick={() => { setQuery(''); inputRef.current?.focus() }}>✕</button>
          )}
        </div>

        <ul className="cp-list" ref={listRef} role="listbox">
          {filtered.length === 0 && (
            <li className="cp-empty">No results for "{query}"</li>
          )}
          {filtered.map((action, i) => (
            <li
              key={action.id}
              role="option"
              aria-selected={i === active}
              className={`cp-item ${i === active ? 'cp-item-active' : ''}`}
              onMouseEnter={() => setActive(i)}
              onMouseDown={() => runAction(action)}
            >
              <span className="cp-item-icon">{action.icon}</span>
              <span className="cp-item-label">{action.label}</span>
              {action.id === lastUsed && <span className="cp-item-recent">Recent</span>}
              <span className="cp-item-hint">{action.hint}</span>
            </li>
          ))}
        </ul>

        <div className="cp-footer">
          <span className="cp-footer-item"><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
          <span className="cp-footer-sep" />
          <span className="cp-footer-item"><kbd>↵</kbd> Select</span>
          <span className="cp-footer-sep" />
          <span className="cp-footer-item"><kbd>{MOD}</kbd>+<kbd>K</kbd> Toggle</span>
          <span className="cp-footer-sep" />
          <span className="cp-footer-item"><kbd>Esc</kbd> Close</span>
        </div>
      </div>
    </div>
  )
}
