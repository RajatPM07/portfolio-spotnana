import { useMotionValue, useSpring, useTransform } from 'motion/react'

const canHover =
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches

// Pointer driven 3D tilt with spring smoothing.
// Returns motion values for rotateX/rotateY plus normalized pointer
// position (px/py in 0..1) for glare effects, and the event handlers.
export function useTilt(maxDeg = 8) {
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [maxDeg, -maxDeg]), { stiffness: 160, damping: 18 })
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxDeg, maxDeg]), { stiffness: 160, damping: 18 })

  function onPointerMove(e) {
    if (!canHover) return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  function onPointerLeave() {
    px.set(0.5)
    py.set(0.5)
  }

  return { rotateX, rotateY, px, py, onPointerMove, onPointerLeave }
}

export { canHover }
