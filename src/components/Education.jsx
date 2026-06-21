import useInView from '../hooks/useInView'
import useTilt from '../hooks/useTilt'
import './Education.css'

export default function Education() {
  const [ref, inView] = useInView()
  const tilt = useTilt(5)

  return (
    <section id="education" className="section" ref={ref}>
      <div className="container">
        <h2 className="section-title">Education</h2>
        <div
          ref={tilt.ref}
          onMouseMove={tilt.onMouseMove}
          onMouseLeave={tilt.onMouseLeave}
          className={`card edu-card reveal ${inView ? 'visible' : ''}`}
        >
          <h3 className="edu-degree">Bachelor of Engineering — Computer Engineering</h3>
          <p className="edu-school">International Institute of Information Technology (I²IT), Pune, India</p>
        </div>
      </div>
    </section>
  )
}
