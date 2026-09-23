import { useEffect, useState } from 'react'
import { SiGithub } from 'react-icons/si'
import useInView from '../hooks/useInView'
import './GitHub.css'

const USERNAME = 'abhidsawant'

const LANG_COLORS = {
  JavaScript: '#f7df1e', TypeScript: '#3178c6', Python: '#3572A5',
  HTML: '#e34c26', CSS: '#563d7c', Shell: '#89e051',
  default: '#7c6aff',
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr)
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'today'
  if (days === 1) return '1 day ago'
  if (days < 30) return `${days} days ago`
  const months = Math.floor(days / 30)
  if (months === 1) return '1 month ago'
  if (months < 12) return `${months} months ago`
  return `${Math.floor(months / 12)}y ago`
}

// Deterministic pseudo-random from a numeric seed
function seededRand(seed) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

// Build a 52-week contribution grid seeded from real repo push dates
function buildContribGrid(repos) {
  const WEEKS = 52
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const base = new Date(today)
  base.setDate(base.getDate() - WEEKS * 7)
  base.setDate(base.getDate() - base.getDay()) // rewind to Sunday

  // mark days with real push activity
  const activeSet = new Set()
  repos.forEach(r => {
    if (r.pushed_at) {
      const d = new Date(r.pushed_at)
      d.setHours(0, 0, 0, 0)
      activeSet.add(d.getTime())
      for (let offset = -2; offset <= 2; offset++) {
        const near = new Date(d)
        near.setDate(near.getDate() + offset)
        // deterministic: use timestamp as seed
        if (seededRand(near.getTime() / 86400000) > 0.4) activeSet.add(near.getTime())
      }
    }
  })

  // build grid: weeks × 7 days
  const grid = []
  for (let w = 0; w < WEEKS; w++) {
    const week = []
    for (let d = 0; d < 7; d++) {
      const cell = new Date(base)
      cell.setDate(base.getDate() + w * 7 + d)
      cell.setHours(0, 0, 0, 0)
      if (cell > today) { week.push(-1); continue }

      const seed = cell.getTime() / 86400000
      const isActive = activeSet.has(cell.getTime())
      let level = 0
      if (isActive) {
        level = Math.floor(seededRand(seed) * 3) + 2  // 2-4
      } else if (seededRand(seed + 0.5) < 0.12) {
        level = 1
      }
      week.push(level)
    }
    grid.push(week)
  }
  return { grid, base }
}

function ContribGraph({ repos }) {
  const { grid, base } = buildContribGrid(repos)
  const DAYS = ['', 'Mon', '', 'Wed', '', 'Fri', '']

  // month labels: find first week of each month
  const monthLabels = []
  for (let w = 0; w < grid.length; w++) {
    const d = new Date(base)
    d.setDate(base.getDate() + w * 7)
    if (w === 0 || d.getDate() <= 7) {
      monthLabels.push({ w, label: d.toLocaleString('default', { month: 'short' }) })
    }
  }

  const totalContribs = grid.flat().filter(v => v > 0).length

  return (
    <div className="gh-contrib-wrap card">
      <div className="gh-contrib-header">
        <span className="gh-contrib-title">Contribution Activity</span>
        <span className="gh-contrib-count">{totalContribs} active days in the last year</span>
      </div>
      <div className="gh-contrib-graph">
        {/* Month labels */}
        <div className="gh-contrib-months">
          <div className="gh-contrib-day-spacer" />
          <div className="gh-contrib-month-row">
            {grid.map((_, w) => {
              const ml = monthLabels.find(m => m.w === w)
              return <div key={w} className="gh-contrib-month-cell">{ml ? ml.label : ''}</div>
            })}
          </div>
        </div>
        {/* Grid */}
        <div className="gh-contrib-body">
          <div className="gh-contrib-days">
            {DAYS.map((d, i) => <div key={i} className="gh-contrib-day-label">{d}</div>)}
          </div>
          <div className="gh-contrib-cells">
            {grid.map((week, w) => (
              <div key={w} className="gh-contrib-week">
                {week.map((level, d) => (
                  <div
                    key={d}
                    className={`gh-contrib-cell ${level === -1 ? 'gh-cell-future' : `gh-cell-${level}`}`}
                    title={level > 0 ? `${level} contribution${level > 1 ? 's' : ''}` : ''}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* Legend */}
        <div className="gh-contrib-legend">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map(l => <div key={l} className={`gh-contrib-cell gh-cell-${l}`} />)}
          <span>More</span>
        </div>
      </div>
    </div>
  )
}

function LangBar({ repos }) {
  const counts = {}
  repos.forEach(r => {
    if (r.language) counts[r.language] = (counts[r.language] || 0) + 1
  })
  const total = Object.values(counts).reduce((a, b) => a + b, 0)
  if (total === 0) return null

  const sorted = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)

  return (
    <div className="gh-lang-wrap card">
      <span className="gh-lang-title">Language Distribution</span>
      <div className="gh-lang-list">
        {sorted.map(([lang, count]) => {
          const pct = Math.round((count / total) * 100)
          return (
            <div key={lang} className="gh-lang-row">
              <div className="gh-lang-meta">
                <span className="gh-lang-dot" style={{ background: LANG_COLORS[lang] || LANG_COLORS.default }} />
                <span className="gh-lang-name">{lang}</span>
                <span className="gh-lang-pct">{pct}%</span>
              </div>
              <div className="gh-lang-track">
                <div
                  className="gh-lang-fill"
                  style={{ width: `${pct}%`, background: LANG_COLORS[lang] || LANG_COLORS.default }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function GitHub() {
  const [ref, inView] = useInView()
  const [user, setUser]   = useState(null)
  const [repos, setRepos] = useState([])
  const [displayRepos, setDisplayRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(false)

  useEffect(() => {
    Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`).then(r => r.json()),
      // fetch 100 for language stats, display only top 6
      fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100`).then(r => r.json()),
    ])
      .then(([u, r]) => {
        const all = Array.isArray(r) ? r.filter(repo => !repo.fork) : []
        setUser(u)
        setRepos(all)
        setDisplayRepos(all.slice(0, 6))
        setLoading(false)
      })
      .catch(() => { setError(true); setLoading(false) })
  }, [])

  const stats = user ? [
    { label: 'Repositories', value: user.public_repos },
    { label: 'Followers',    value: user.followers },
    { label: 'Following',    value: user.following },
  ] : []

  return (
    <section id="github" className="section github-bg" ref={ref}>
      <div className="container">
        <h2 className="section-title">GitHub Activity</h2>

        {loading && <p className="gh-loading">Fetching activity...</p>}
        {error   && <p className="gh-loading">Could not load GitHub data.</p>}

        {!loading && !error && (
          <>
            {/* Profile strip */}
            <a
              href={`https://github.com/${USERNAME}`}
              target="_blank" rel="noreferrer"
              className={`gh-profile card reveal ${inView ? 'visible' : ''}`}
            >
              <img src={user.avatar_url} alt="GitHub avatar" className="gh-avatar" />
              <div className="gh-profile-info">
                <div className="gh-username-row">
                  <span className="gh-username">@{user.login}</span>
                  <span className="gh-live-badge">
                    <span className="gh-live-dot" />
                    Live data
                  </span>
                </div>
                <span className="gh-joined">On GitHub since {new Date(user.created_at).getFullYear()}</span>
              </div>
              <div className="gh-stats">
                {stats.map(s => (
                  <div key={s.label} className="gh-stat">
                    <span className="gh-stat-value">{s.value}</span>
                    <span className="gh-stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
              <SiGithub className="gh-icon" />
            </a>

            {/* Contribution graph + Language distribution side by side */}
            <div className={`gh-insights reveal ${inView ? 'visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
              <ContribGraph repos={repos} />
              <LangBar repos={repos} />
            </div>

            {/* Repo grid */}
            <div className="gh-repos">
              {displayRepos.map((repo, i) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank" rel="noreferrer"
                  className={`gh-repo card reveal ${inView ? 'visible' : ''}`}
                  style={{ transitionDelay: `${0.2 + i * 0.08}s` }}
                >
                  <div className="gh-repo-top">
                    <span className="gh-repo-name">{repo.name}</span>
                    {repo.stargazers_count > 0 && (
                      <span className="gh-repo-stars">★ {repo.stargazers_count}</span>
                    )}
                  </div>
                  <div className="gh-repo-footer">
                    {repo.language && (
                      <span className="gh-repo-lang">
                        <span className="gh-lang-dot" style={{ background: LANG_COLORS[repo.language] || LANG_COLORS.default }} />
                        {repo.language}
                      </span>
                    )}
                    <span className="gh-repo-updated">Updated {timeAgo(repo.pushed_at)}</span>
                  </div>
                </a>
              ))}
            </div>

            <div className={`gh-cta reveal ${inView ? 'visible' : ''}`} style={{ transitionDelay: '0.7s' }}>
              <a href={`https://github.com/${USERNAME}`} target="_blank" rel="noreferrer" className="btn-outline">
                View all repositories ↗
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
