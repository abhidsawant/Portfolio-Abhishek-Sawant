import { useState, useEffect, useRef, useCallback } from 'react'
import './Terminal.css'

const PROMPT = 'abhishek@portfolio:~$'

const RESPONSES = {
  help: `Available commands:

  whoami          About Abhishek
  ls              List sections
  cat about.txt   Read about me
  cat skills.txt  View tech stack
  open projects   Go to Projects
  open github     Open GitHub
  open linkedin   Open LinkedIn
  download resume Download CV
  clear           Clear terminal
  exit            Close terminal`,

  whoami: `Abhishek Sawant
  Associate Software Engineer @ Saama Technologies
  React.js · TypeScript · Redux · Node.js · MERN Stack
  📍 Pune, India  |  🏆 Q1 2026 Spot Award — Best Performance`,

  ls: `about/
projects/
experience/
skills/
education/
github/
contact/`,

  'cat about.txt': `Results-driven React.js Developer with 1+ year of experience
building high-performance, scalable frontend applications for
clinical data platforms in the pharmaceutical domain.

Proficient in React Hooks, Redux, TypeScript, Ag-Grid,
REST API integration, and Webpack optimization.

Recognized with the Q1 2026 Spot Award for Best Performance
in the BRAIN team at Saama Technologies.`,

  'cat skills.txt': `Languages    →  JavaScript (ES6+), TypeScript
Frameworks   →  React.js, Next.js, React Native, Node.js
State        →  Redux, Context API, Zustand
UI           →  Material UI, Tailwind CSS, Ag-Grid
Tools        →  Webpack, Git, REST APIs, CI/CD
Databases    →  MySQL, PostgreSQL, MongoDB
AI Tools     →  Claude AI, GitHub Copilot, Codex`,
}

const EASTER_EGGS = {
  'sudo rm -rf /':    '❌ Nice try.',
  'vim':              'You are now in vim. Good luck getting out. (just kidding — type :q)',
  'git blame':        '👀 All commits by Abhishek. No one else to blame.',
  'npm install':      '📦 Installing... ████████░░ 80% — just kidding, nothing to install.',
  'ls -la':           'drwxr-xr-x  abhishek  staff   talent\ndrwxr-xr-x  abhishek  staff   ambition\n-rw-r--r--  abhishek  staff   resume.pdf',
  'pwd':              '/home/abhishek/portfolio',
  'date':             new Date().toDateString(),
  'echo hello':       'hello',
  'uname':            'PortfolioOS 2.0 — Built with React + Vite',
  'coffee':           '☕ Brewing... done. Ready to code.',
  'hire abhishek':    '✅ Great choice. Check the contact section!',
}

function processCommand(input, setOpen) {
  const cmd = input.trim().toLowerCase()

  if (cmd === '') return null
  if (cmd === 'exit') { setOpen(false); return null }
  if (cmd === 'clear') return '__clear__'

  if (RESPONSES[cmd]) return RESPONSES[cmd]
  if (EASTER_EGGS[cmd]) return EASTER_EGGS[cmd]

  if (cmd === 'open projects') {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
    return null
  }
  if (cmd === 'open github') {
    window.open('https://github.com/abhidsawant', '_blank', 'noreferrer')
    return '↗ Opening GitHub...'
  }
  if (cmd === 'open linkedin') {
    window.open('https://linkedin.com/in/abhishek-dhanaji-sawant-933639241', '_blank', 'noreferrer')
    return '↗ Opening LinkedIn...'
  }
  if (cmd === 'download resume') {
    const a = document.createElement('a')
    a.href = '/Abhishek_Sawant_Resume.pdf'
    a.download = ''
    a.click()
    return '⬇ Downloading resume...'
  }

  return `command not found: ${input.trim()}\nType 'help' to see available commands.`
}

export default function Terminal({ open, setOpen }) {
  const [history, setHistory] = useState([
    { type: 'output', text: `Welcome to Abhishek's Portfolio Terminal \nType 'help' to see available commands. Press Ctrl+Shift+T to toggle.\n` }
  ])
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState([])
  const [histIdx, setHistIdx] = useState(-1)
  const inputRef = useRef(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const submit = useCallback(() => {
    const cmd = input.trim()
    if (!cmd) return

    const result = processCommand(cmd, setOpen)

    if (result === '__clear__') {
      setHistory([])
    } else {
      setHistory(h => [
        ...h,
        { type: 'input', text: cmd },
        ...(result ? [{ type: 'output', text: result }] : []),
      ])
    }

    setCmdHistory(h => [cmd, ...h])
    setHistIdx(-1)
    setInput('')
  }, [input, setOpen])

  const onKeyDown = e => {
    if (e.key === 'Enter') { submit() }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const idx = Math.min(histIdx + 1, cmdHistory.length - 1)
      setHistIdx(idx)
      setInput(cmdHistory[idx] ?? '')
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const idx = Math.max(histIdx - 1, -1)
      setHistIdx(idx)
      setInput(idx === -1 ? '' : cmdHistory[idx])
    }
    if (e.key === 'Escape') setOpen(false)
  }

  if (!open) return null

  return (
    <div className="term-overlay" onClick={e => { if (e.target === e.currentTarget) setOpen(false) }}>
      <div className="term-window">
        {/* Title bar */}
        <div className="term-titlebar">
          <div className="term-dots">
            <span className="term-dot term-dot-red" onClick={() => setOpen(false)} />
            <span className="term-dot term-dot-yellow" />
            <span className="term-dot term-dot-green" />
          </div>
          <span className="term-title">abhishek@portfolio — terminal</span>
          <span />
        </div>

        {/* Output */}
        <div className="term-body" onClick={() => inputRef.current?.focus()}>
          {history.map((line, i) => (
            <div key={i} className={`term-line term-${line.type}`}>
              {line.type === 'input' && (
                <span className="term-prompt">{PROMPT} </span>
              )}
              <span className="term-text">{line.text}</span>
            </div>
          ))}

          {/* Input row */}
          <div className="term-line term-input-row">
            <span className="term-prompt">{PROMPT} </span>
            <input
              ref={inputRef}
              className="term-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              autoComplete="off"
              spellCheck="false"
              autoCapitalize="off"
            />
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  )
}
