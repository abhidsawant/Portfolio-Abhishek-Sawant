import { useEffect, useState } from 'react'
import { SiGithub } from 'react-icons/si'
import useInView from '../hooks/useInView'
import './GitHub.css'

const USERNAME = 'abhidsawant'

const LANG_COLORS = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
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

export default function GitHub() {
  const [ref, inView] = useInView()
  const [user, setUser] = useState(null)
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`).then(r => r.json()),
      fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=6`).then(r => r.json()),
    ])
      .then(([u, r]) => {
        setUser(u)
        setRepos(Array.isArray(r) ? r.filter(repo => !repo.fork) : [])
        setLoading(false)
      })
      .catch(() => { setError(true); setLoading(false) })
  }, [])

  const stats = user ? [
    { label: 'Repositories', value: user.public_repos },
    { label: 'Followers', value: user.followers },
    { label: 'Following', value: user.following },
  ] : []

  return (
    <section id="github" className="section github-bg" ref={ref}>
      <div className="container">
        <h2 className="section-title">GitHub Activity</h2>

        {loading && <p className="gh-loading">Fetching activity...</p>}
        {error && <p className="gh-loading">Could not load GitHub data.</p>}

        {!loading && !error && (
          <>
            {/* Profile strip */}
            <a
              href={`https://github.com/${USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className={`gh-profile card reveal ${inView ? 'visible' : ''}`}
            >
              <img src={user.avatar_url} alt="GitHub avatar" className="gh-avatar" />
              <div className="gh-profile-info">
                <span className="gh-username">@{user.login}</span>
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

            {/* Repo grid */}
            <div className="gh-repos">
              {repos.map((repo, i) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className={`gh-repo card reveal ${inView ? 'visible' : ''}`}
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <div className="gh-repo-top">
                    <span className="gh-repo-name">{repo.name}</span>
                    {repo.stargazers_count > 0 && (
                      <span className="gh-repo-stars">★ {repo.stargazers_count}</span>
                    )}
                  </div>
                  {repo.description && (
                    <p className="gh-repo-desc">{repo.description}</p>
                  )}
                  <div className="gh-repo-footer">
                    {repo.language && (
                      <span className="gh-repo-lang">
                        <span
                          className="gh-lang-dot"
                          style={{ background: LANG_COLORS[repo.language] || LANG_COLORS.default }}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="gh-repo-updated">Updated {timeAgo(repo.pushed_at)}</span>
                  </div>
                </a>
              ))}
            </div>

            <div className={`gh-cta reveal ${inView ? 'visible' : ''}`} style={{ transitionDelay: '0.5s' }}>
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
