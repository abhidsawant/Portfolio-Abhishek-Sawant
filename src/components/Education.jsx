import useInView from '../hooks/useInView'
import './Education.css'

export default function Education() {
  const [ref, inView] = useInView()

  return (
    <section id="education" className="section" ref={ref}>
      <div className="container">
        <h2 className="section-title">Education</h2>
        <div className={`card edu-card reveal ${inView ? 'visible' : ''}`} ref={ref}>
          <h3 className="edu-degree">Bachelor of Engineering — Computer Engineering</h3>
          <p className="edu-school">International Institute of Information Technology (I²IT), Pune, India</p>
        </div>
      </div>
    </section>
  )
}
