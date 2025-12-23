import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  animate,
} from 'framer-motion'
import type { AnimationPlaybackControls } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTelegram, faGithub } from '@fortawesome/free-brands-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { portfolioInfo } from '../data/portfolio'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

interface ContactCardProps {
  title: string
  description: string
  href: string
  icon: IconDefinition
  isExternal?: boolean
}

function ContactCard({
  title,
  description,
  href,
  icon,
  isExternal = false,
}: ContactCardProps) {
  return (
    <motion.a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="group block p-8 bg-gradient-to-br from-neutral-50 to-white border border-neutral-200 rounded-3xl hover:border-neutral-900 transition-colors"
      variants={itemVariants}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="w-14 h-14 rounded-2xl bg-neutral-900 text-white flex items-center justify-center">
          <FontAwesomeIcon icon={icon} className="text-2xl" />
        </div>
        <svg
          className="w-6 h-6 text-neutral-400 group-hover:text-neutral-900 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>

      <h3 className="text-2xl font-bold text-neutral-900 mb-3 tracking-tight">
        {title}
      </h3>
      <p className="text-neutral-600 text-sm leading-relaxed font-light">
        {description}
      </p>
    </motion.a>
  )
}

type MagneticCtaButtonProps = {
  label: string
  href: string
  isExternal?: boolean
  subLabel?: string
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v))
}

function rubber01(t: number, k = 2.35) {
  const tt = clamp(t, 0, 1)
  const den = Math.tanh(k)
  if (den === 0) return 0
  return Math.tanh(k * tt) / den
}

function MagneticCtaButton({
  label,
  href,
  isExternal = true,
  subLabel,
}: MagneticCtaButtonProps) {
  const ref = useRef<HTMLAnchorElement | null>(null)

  const MAX_TRANSLATE = 30
  const MAX_CONTENT = 14
  const MAX_STRETCH = 0.08

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rawScaleX = useMotionValue(1)
  const rawScaleY = useMotionValue(1)

  const x = useSpring(rawX, { stiffness: 220, damping: 16, mass: 1.35 })
  const y = useSpring(rawY, { stiffness: 220, damping: 16, mass: 1.35 })
  const scaleX = useSpring(rawScaleX, { stiffness: 200, damping: 18, mass: 1.15 })
  const scaleY = useSpring(rawScaleY, { stiffness: 200, damping: 18, mass: 1.15 })

  // Контент — плавно, только позиция
  const rawContentX = useMotionValue(0)
  const rawContentY = useMotionValue(0)
  const contentX = useSpring(rawContentX, { stiffness: 260, damping: 22, mass: 0.9 })
  const contentY = useSpring(rawContentY, { stiffness: 260, damping: 22, mass: 0.9 })

  const contentScaleX = useSpring(useMotionValue(1), {
    stiffness: 300,
    damping: 24,
    mass: 0.7,
  })
  const contentScaleY = useSpring(useMotionValue(1), {
    stiffness: 300,
    damping: 24,
    mass: 0.7,
  })

  useEffect(() => {
    const u1 = scaleX.on('change', (v) => contentScaleX.set(v === 0 ? 1 : 1 / v))
    const u2 = scaleY.on('change', (v) => contentScaleY.set(v === 0 ? 1 : 1 / v))
    return () => {
      u1()
      u2()
    }
  }, [scaleX, scaleY, contentScaleX, contentScaleY])

  const rippleX = useMotionValue(0)
  const rippleY = useMotionValue(0)
  const r = useMotionValue(0)

  const rippleAnimRef = useRef<AnimationPlaybackControls | null>(null)

  const mask = useMotionTemplate`
    radial-gradient(${r}px circle at ${rippleX}px ${rippleY}px,
      #000 0%,
      #000 99.9%,
      transparent 100%
    )
  `

  const [isHovering, setIsHovering] = useState(false)
  const [rippleVisible, setRippleVisible] = useState(false)

  const rel = useMemo(
    () => (isExternal ? 'noopener noreferrer' : undefined),
    [isExternal]
  )

  const snapBack = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
    rawScaleX.set(1)
    rawScaleY.set(1)
    rawContentX.set(0)
    rawContentY.set(0)
  }, [rawX, rawY, rawScaleX, rawScaleY, rawContentX, rawContentY])

  const startRipple = useCallback(
    (clientX: number, clientY: number) => {
      const el = ref.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      rippleX.set(clientX - rect.left)
      rippleY.set(clientY - rect.top)

      r.set(0)
      setRippleVisible(true)

      rippleAnimRef.current?.stop()

      const maxR = Math.hypot(rect.width, rect.height) * 1.25

      rippleAnimRef.current = animate(r, maxR, {
        duration: 3,
        ease: [0.22, 1, 0.36, 1],
      })
    },
    [r, rippleX, rippleY]
  )

  const stopRippleInstant = useCallback(() => {
    rippleAnimRef.current?.stop()
    r.set(0)
    setRippleVisible(false)
  }, [r])

  const updateByPointer = useCallback(
    (clientX: number, clientY: number) => {
      const el = ref.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const inside =
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom

      if (!inside) return

      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2

      const nx = clamp((clientX - cx) / (rect.width / 2), -1, 1)
      const ny = clamp((clientY - cy) / (rect.height / 2), -1, 1)

      const dist = Math.hypot(nx, ny) / Math.SQRT2
      const t = rubber01(dist, 2.35)

      const d = Math.hypot(nx, ny)
      const ux = d < 1e-6 ? 0 : nx / d
      const uy = d < 1e-6 ? 0 : ny / d

      const move = MAX_TRANSLATE * t
      rawX.set(ux * move)
      rawY.set(uy * move)

      const contentMove = MAX_CONTENT * t
      rawContentX.set(ux * contentMove)
      rawContentY.set(uy * contentMove)

      const stretch = MAX_STRETCH * t
      const ax = Math.abs(ux)
      const ay = Math.abs(uy)

      const sx = 1 + stretch * ax
      const sy = 1 + stretch * ay

      const squashX = 1 - stretch * 0.35 * ay
      const squashY = 1 - stretch * 0.35 * ax

      rawScaleX.set(sx * squashX)
      rawScaleY.set(sy * squashY)
    },
    [rawX, rawY, rawScaleX, rawScaleY, rawContentX, rawContentY]
  )

  return (
    <a
      ref={ref}
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={rel}
      className="block w-full"
      onPointerEnter={(e) => {
        setIsHovering(true)
        updateByPointer(e.clientX, e.clientY)
        startRipple(e.clientX, e.clientY)
      }}
      onPointerMove={(e) => {
        updateByPointer(e.clientX, e.clientY)

        const el = ref.current
        if (el) {
          const rect = el.getBoundingClientRect()
          rippleX.set(e.clientX - rect.left)
          rippleY.set(e.clientY - rect.top)
        }
      }}
      onPointerLeave={() => {
        setIsHovering(false)
        stopRippleInstant()
        snapBack()
      }}
    >
      <motion.div
        style={{ x, y, scaleX, scaleY, willChange: 'transform' }}
        className={[
          'relative w-full isolate',
          'rounded-[2rem] border border-neutral-200 bg-white',
          'transition-colors duration-300 hover:border-neutral-900',
          'shadow-[0_10px_35px_-25px_rgba(0,0,0,0.35)]',
        ].join(' ')}
      >
        <div className="relative overflow-hidden rounded-[2rem]">
          <motion.span
            aria-hidden
            className="absolute inset-0 bg-neutral-900 pointer-events-none z-0"
            style={{
              WebkitMaskImage: mask,
              maskImage: mask,
              opacity: rippleVisible ? 1 : 0,
            }}
          />

          <motion.div
            className="relative z-20 px-8 sm:px-10 py-7 sm:py-8"
            style={{
              x: contentX,
              y: contentY,
              scaleX: contentScaleX,
              scaleY: contentScaleY,
              willChange: 'transform',
            }}
          >
            <div className="flex items-center justify-between gap-6">
              <div className="min-w-0">
                <div
                  className={[
                    'text-2xl sm:text-3xl font-black tracking-tight uppercase',
                    'transition-colors duration-300',
                    isHovering ? 'text-white' : 'text-neutral-900',
                  ].join(' ')}
                >
                  {label}
                </div>

                {subLabel ? (
                  <div
                    className={[
                      'mt-1 text-sm sm:text-base font-light',
                      'transition-colors duration-300',
                      isHovering ? 'text-white/75' : 'text-neutral-500',
                    ].join(' ')}
                  >
                    {subLabel}
                  </div>
                ) : null}
              </div>

              <div
                className={[
                  'shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center',
                  'transition-colors duration-300',
                  isHovering ? 'bg-white/12 text-white' : 'bg-neutral-900 text-white',
                ].join(' ')}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h12"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 6l6 6-6 6"
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </a>
  )
}

export function Contact() {
  const githubUrl = `https://github.com/${portfolioInfo.nickname}`
  const telegramUrl = `https://t.me/Kweek0v`

  return (
    <section
      id="contact"
      className="relative min-h-screen py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-neutral-50 to-white overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-neutral-900/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-neutral-900/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <motion.div
        className="relative max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="mb-10 sm:mb-12 md:mb-16 px-4 sm:px-0">
          <motion.div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-8 mb-6 sm:mb-8" variants={itemVariants}>
            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-neutral-900 uppercase tracking-tighter leading-none">
              СВЯЗАТЬСЯ
            </h2>
            <div className="hidden sm:block flex-1 h-px bg-gradient-to-r from-neutral-900 to-transparent mb-6" />
          </motion.div>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-neutral-600 font-light max-w-3xl leading-relaxed"
            variants={itemVariants}
          >
            Готов обсудить ваш проект и помочь реализовать ваши идеи. Выберите удобный
            способ связи.
          </motion.p>
        </div>

        <motion.div variants={itemVariants} className="mb-10 sm:mb-12">
          <MagneticCtaButton
            label="СВЯЗАТЬСЯ"
            subLabel="Написать в Telegram — самый быстрый способ"
            href={telegramUrl}
            isExternal
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <ContactCard
            title="Telegram"
            description="Свяжитесь со мной в Telegram для быстрого общения"
            href={telegramUrl}
            icon={faTelegram}
            isExternal
          />

          <ContactCard
            title="GitHub"
            description="Посмотрите мои проекты и код на GitHub"
            href={githubUrl}
            icon={faGithub}
            isExternal
          />
        </div>

      </motion.div>
    </section>
  )
}
