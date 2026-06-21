import { useRef, useCallback } from 'react'

export default function useTilt(strength = 10) {
  const ref = useRef(null)

  const onMouseMove = useCallback(e => {
    const el = ref.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    const x = (e.clientX - left) / width - 0.5
    const y = (e.clientY - top) / height - 0.5
    el.style.transform = `perspective(600px) rotateY(${x * strength}deg) rotateX(${-y * strength}deg) translateZ(8px)`
  }, [strength])

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) translateZ(0px)'
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}
