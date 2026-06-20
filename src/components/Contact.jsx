import { useState } from 'react'
import './Contact.css'

const FORMSPREE_URL = 'https://formspree.io/f/xwvjgzko'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section contact-bg">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-grid">
          <div className="contact-info">
            <p className="contact-intro">
              I'm open to full-time roles, freelance projects, and exciting collaborations.
              Drop a message and I'll get back to you promptly.
            </p>
            <div className="contact-details">
              <a href="mailto:abhisheksawant732003@gmail.com" className="contact-item">
                <span className="contact-icon">✉</span>
                abhisheksawant732003@gmail.com
              </a>
              <a href="tel:+918767570884" className="contact-item">
                <span className="contact-icon">📞</span>
                +91-8767570884
              </a>
              <a href="https://linkedin.com/in/abhishek-dhanaji-sawant-933639241" target="_blank" rel="noreferrer" className="contact-item">
                <span className="contact-icon">💼</span>
                linkedin.com/in/abhishek-dhanaji-sawant
              </a>
              <a href="/Abhishek_Sawant_Resume.pdf" download className="contact-item contact-resume">
                <span className="contact-icon">⬇</span>
                Download Resume
              </a>
            </div>
          </div>

          <form className="card contact-form" onSubmit={handleSubmit}>
            {status === 'success' && (
              <p className="form-success">✅ Message sent! I'll get back to you soon.</p>
            )}
            {status === 'error' && (
              <p className="form-error">❌ Something went wrong. Please try again.</p>
            )}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" placeholder="Your name" required value={form.name} onChange={handleChange} disabled={status === 'loading'} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="your@email.com" required value={form.email} onChange={handleChange} disabled={status === 'loading'} />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={5} placeholder="Tell me about the role or project..." required value={form.message} onChange={handleChange} disabled={status === 'loading'} />
            </div>
            <button type="submit" className="btn-primary form-submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Sending...' : 'Send Message →'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
