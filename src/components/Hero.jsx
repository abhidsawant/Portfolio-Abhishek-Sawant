import './Hero.css'

export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="container hero-inner">
        <div className="hero-badge tag">Available for Opportunities</div>
        <h1 className="hero-name">Abhishek Sawant</h1>
        <h2 className="hero-title">React.js Developer <span>&</span> Frontend Engineer</h2>
        <p className="hero-desc">
          I craft fast, scalable, and accessible frontend experiences for
          mission-critical clinical data platforms in the pharma industry.
          Specializing in <span className="highlight">React.js</span>, <span className="highlight">Redux</span>, and <span className="highlight">TypeScript</span> —
          with a track record of shipping complex features and squashing production
          fires for <span className="highlight">Pfizer</span> and <span className="highlight">Jazz Pharma</span>.
        </p>
        <div className="hero-award">
          <span>🏆</span>
          <span>Spot Award — Best Performance, UI Team · Q1 2026 · Saama Technologies</span>
        </div>
        <div className="hero-actions">
          <a href="#experience" className="btn-primary">View Experience</a>
          <a href="#contact" className="btn-outline">Hire Me</a>
          <a href="/Abhishek_Sawant_Resume.pdf" download className="btn-download">⬇ Download Resume</a>
        </div>
        <div className="hero-links">
          <a href="https://linkedin.com/in/abhishek-dhanaji-sawant-933639241" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href="tel:+918767570884">+91-8767570884</a>
        </div>
      </div>
    </section>
  )
}
