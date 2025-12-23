import { motion } from 'framer-motion'
import { portfolioInfo, cases } from '../data/portfolio'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
}

const statsVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
}

const totalProjects = cases.reduce((acc, caseItem) => acc + caseItem.projects.length, 0)
const completedProjects = cases.reduce(
  (acc, caseItem) => acc + caseItem.projects.filter(p => p.status === 'completed').length,
  0
)

export function Hero() {
  return (
    <motion.section
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative bg-white overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-neutral-100 rounded-full blur-3xl opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-neutral-100 rounded-full blur-3xl opacity-30"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="text-center max-w-5xl mx-auto relative z-10">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-neutral-900 tracking-tight"
          variants={itemVariants}
        >
          Привет, я{' '}
          <span className="font-bold text-neutral-900">{portfolioInfo.name}</span>
        </motion.h1>
        
        <motion.p
          className="text-2xl sm:text-3xl md:text-4xl text-neutral-700 mb-4 font-light tracking-wide"
          variants={itemVariants}
        >
          {portfolioInfo.role}
        </motion.p>
        
        <motion.p
          className="text-lg sm:text-xl text-neutral-500 mb-8 font-light"
          variants={itemVariants}
        >
          @{portfolioInfo.nickname} · {portfolioInfo.age} лет
        </motion.p>

        <motion.p
          className="text-base sm:text-lg text-neutral-600 mb-12 font-light max-w-2xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Создаю современные веб-приложения с упором на качество, производительность и пользовательский опыт.
          От концепции до реализации — полный цикл разработки.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 mb-10 sm:mb-12"
          variants={itemVariants}
        >
          <motion.div
            className="flex flex-col items-center"
            variants={statsVariants}
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-1">
              {totalProjects}+
            </div>
            <div className="text-xs sm:text-sm text-neutral-500 font-light">
              Проектов
            </div>
          </motion.div>
          <motion.div
            className="flex flex-col items-center"
            variants={statsVariants}
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-1">
              {completedProjects}
            </div>
            <div className="text-xs sm:text-sm text-neutral-500 font-light">
              Завершено
            </div>
          </motion.div>
          <motion.div
            className="flex flex-col items-center"
            variants={statsVariants}
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-1">
              {cases.length}
            </div>
            <div className="text-xs sm:text-sm text-neutral-500 font-light">
              Кейсов
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6"
          variants={itemVariants}
        >
          <a
            href="#cases"
            className="px-6 py-3 sm:px-8 sm:py-4 bg-neutral-800 text-white rounded-full hover:bg-neutral-900 transition-all text-xs sm:text-sm font-medium tracking-wide"
          >
            Мои проекты
          </a>
          <a
            href="#contact"
            className="px-6 py-3 sm:px-8 sm:py-4 bg-white border border-neutral-800 text-neutral-800 rounded-full hover:bg-neutral-800 hover:text-white transition-all text-xs sm:text-sm font-medium tracking-wide"
          >
            Связаться
          </a>
          <a
            href="#skills"
            className="px-6 py-3 sm:px-8 sm:py-4 bg-white border border-neutral-800 text-neutral-800 rounded-full hover:bg-neutral-800 hover:text-white transition-all text-xs sm:text-sm font-medium tracking-wide"
          >
            Навыки
          </a>
        </motion.div>
      </div>
    </motion.section>
  )
}
