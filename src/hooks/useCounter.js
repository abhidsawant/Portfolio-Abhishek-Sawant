import { useEffect, useRef, useState } from 'react'

export default function useCounter(target, duration = 1500) {
  const [count, setCount] = useState(0)
  const [ref, setRef] = useState(null)
  const started = useRef(false)

  useEffect(() => {
    if (!ref) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const numeric = parseInt(target)
          if (isNaN(numeric)) { setCount(target); return }
          const suffix = target.toString().replace(/[0-9]/g, '')
          let start = 0
          const step = Math.ceil(numeric / (duration / 16))
          const timer = setInterval(() => {
            start += step
            if (start >= numeric) { setCount(numeric + suffix); clearInterval(timer) }
            else setCount(start + suffix)
          }, 16)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(ref)
    return () => observer.disconnect()
  }, [ref, target, duration])

  return [setRef, count]
}
