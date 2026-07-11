// Shared Motion presets. Spread onto motion elements: <motion.h2 {...rise()} />
export const spring = { type: 'spring', stiffness: 120, damping: 20 }

export function rise(delay = 0) {
  return {
    initial: { opacity: 0, y: 26, rotateX: 12, scale: 0.98 },
    whileInView: { opacity: 1, y: 0, rotateX: 0, scale: 1 },
    viewport: { once: true, amount: 0.25 },
    transition: { ...spring, delay },
  }
}

export function flipIn(delay = 0) {
  return {
    initial: { opacity: 0, rotateX: 45, y: 24 },
    whileInView: { opacity: 1, rotateX: 0, y: 0 },
    viewport: { once: true, amount: 0.35 },
    transition: { ...spring, delay },
  }
}

export function swingIn(delay = 0) {
  return {
    initial: { opacity: 0, rotateY: 32, x: -14 },
    whileInView: { opacity: 1, rotateY: 0, x: 0 },
    viewport: { once: true, amount: 0.35 },
    transition: { ...spring, delay },
  }
}
