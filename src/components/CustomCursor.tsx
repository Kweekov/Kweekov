import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  const xSpring = useSpring(x, { stiffness: 400, damping: 35 })
  const ySpring = useSpring(y, { stiffness: 400, damping: 35 })

  const [state, setState] = useState({
    hovering: false,
    clicking: false,
    dragging: false,
    scrolling: false,
  })

  const scrollTimeout = useRef<number | null>(null)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }

    const down = () =>
      setState(s => ({ ...s, clicking: true, dragging: true }))

    const up = () =>
      setState(s => ({ ...s, clicking: false, dragging: false }))

    const scroll = () => {
      setState(s => ({ ...s, scrolling: true }))
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
      scrollTimeout.current = window.setTimeout(() => {
        setState(s => ({ ...s, scrolling: false }))
      }, 200)
    }

    const enter = () => setState(s => ({ ...s, hovering: true }))
    const leave = () => setState(s => ({ ...s, hovering: false }))

    document.addEventListener('mousemove', move)
    document.addEventListener('mousedown', down)
    document.addEventListener('mouseup', up)
    document.addEventListener('scroll', scroll, true)

    document.querySelectorAll(
      'a, button, input, textarea, select, [role="button"]'
    ).forEach(el => {
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
    })

    document.body.style.cursor = 'none'

    return () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mousedown', down)
      document.removeEventListener('mouseup', up)
      document.removeEventListener('scroll', scroll, true)
      document.body.style.cursor = ''
    }
  }, [x, y])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          x: xSpring,
          y: ySpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="bg-white rounded-full"
          animate={{
            width: state.hovering ? 22 : 12,
            height: state.hovering ? 22 : 12,
            scale: state.clicking ? 0.7 : state.dragging ? 1.2 : 1,
            opacity: state.scrolling ? 0.7 : 1,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
        />
      </motion.div>

      {state.clicking && (
        <motion.div
          className="fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-difference border border-white rounded-full"
          style={{
            x: xSpring,
            y: ySpring,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ width: 10, height: 10, opacity: 0.6 }}
          animate={{ width: 50, height: 50, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      )}
    </>
  )
}
