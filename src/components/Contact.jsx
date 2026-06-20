import { useState } from 'react'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    const { name, email, message } = form
    const mailto = `mailto:abhisheksawant732003@gmail.com?subject=Hiring Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`
    window.location.href = mailto
    setSent(true)
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
            {sent && <p className="form-success">✅ Opening your email client...</p>}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" placeholder="Your name" required value={form.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="your@email.com" required value={form.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={5} placeholder="Tell me about the role or project..." required value={form.message} onChange={handleChange} />
            </div>
            <button type="submit" className="btn-primary form-submit">Send Message →</button>
          </form>
        </div>
      </div>
    </section>
  )
}
