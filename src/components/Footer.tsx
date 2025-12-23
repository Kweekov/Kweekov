import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTelegram, faGithub } from '@fortawesome/free-brands-svg-icons'
import { portfolioInfo } from '../data/portfolio'

const navItems = [
  { label: 'Обо мне', href: '#about' },
  { label: 'Навыки', href: '#skills' },
  { label: 'Проекты', href: '#cases' },
  { label: 'Контакты', href: '#contact' },
]

export function Footer() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const githubUrl = `https://github.com/${portfolioInfo.nickname}`
  const telegramUrl = `https://t.me/Kweek0v`

  return (
    <footer className="relative bg-neutral-900 text-neutral-100 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-4 tracking-tight">
              {portfolioInfo.name}
            </h3>
            <p className="text-neutral-400 text-sm font-light mb-4">
              {portfolioInfo.role}
            </p>
            <p className="text-neutral-500 text-xs font-light">
              @{portfolioInfo.nickname} · {portfolioInfo.age} лет
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
              Навигация
            </h4>
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-neutral-300 hover:text-neutral-100 transition-colors text-sm font-light w-fit"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
              Социальные сети
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-neutral-300 hover:text-neutral-100 transition-colors text-sm font-light group"
              >
                <div className="w-8 h-8 rounded-lg bg-neutral-800 group-hover:bg-neutral-700 transition-colors flex items-center justify-center">
                  <FontAwesomeIcon icon={faTelegram} className="text-base" />
                </div>
                <span>Telegram</span>
              </a>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-neutral-300 hover:text-neutral-100 transition-colors text-sm font-light group"
              >
                <div className="w-8 h-8 rounded-lg bg-neutral-800 group-hover:bg-neutral-700 transition-colors flex items-center justify-center">
                  <FontAwesomeIcon icon={faGithub} className="text-base" />
                </div>
                <span>GitHub</span>
              </a>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-neutral-800 pt-8 sm:pt-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-neutral-500 text-xs font-light text-center sm:text-left">
              © {new Date().getFullYear()} {portfolioInfo.name}. Все права защищены.
            </p>
            <p className="text-neutral-600 text-xs font-light text-center sm:text-right">
              Создано с использованием React, TypeScript и Tailwind CSS
            </p>
          </div>
        </div>
      </div>

      <motion.button
        className={`fixed bottom-8 right-8 z-40 w-12 h-12 bg-neutral-900 text-white rounded-full shadow-lg flex items-center justify-center border border-neutral-800 hover:bg-neutral-800 transition-colors ${
          isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={scrollToTop}
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
        aria-label="Наверх"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.button>
    </footer>
  )
}

