import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
}

export function About() {
  return (
    <section
      id="about"
      className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 relative bg-neutral-900 min-h-screen flex items-center"
    >
      <motion.div 
      className="relative max-w-7xl mx-auto w-full"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      >
        <div className="flex flex-row justify-between mb-12 sm:mb-16 md:mb-20 px-4 sm:px-0">
          <motion.h2
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-neutral-100 uppercase tracking-tighter leading-none"
            variants={itemVariants}
          >
            ОБО МНЕ
          </motion.h2>
          <motion.h2
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-neutral-100/5 uppercase tracking-tighter leading-none hidden sm:block"
            variants={itemVariants}
          >
            ABOUT ME
          </motion.h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-start px-4 sm:px-0">
          <motion.div
            className="space-y-6 sm:space-y-8 text-base sm:text-lg text-neutral-200 leading-relaxed font-light"
            variants={itemVariants}
          >
            <div className="space-y-4 sm:space-y-6">
              <p className="text-lg sm:text-xl text-neutral-100">
                Меня зовут Кирилл, мне 19 лет, и я FullStack Web Developer. 
                Специализируюсь на создании современных веб-приложений с использованием 
                передовых технологий и лучших практик разработки.
              </p>
              <p className="text-neutral-300">
                Моя работа охватывает как фронтенд, так и бэкенд разработку, 
                что позволяет мне создавать полноценные решения от концепции до реализации. 
                Я увлечен созданием качественных продуктов и постоянно изучаю новые технологии.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="space-y-8 sm:space-y-10"
            variants={itemVariants}
          >
            <div className="pt-6 sm:pt-8 border-t border-neutral-700">
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-100 mb-3 sm:mb-4 tracking-tight">
                Опыт и подход
              </h3>
              <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">
                Работаю над полным циклом разработки: от проектирования архитектуры и UX/UI 
                до развертывания и поддержки. Фокусируюсь на создании масштабируемых решений, 
                которые остаются удобными в поддержке и эффективными в работе.
              </p>
            </div>

            <div className="pt-6 sm:pt-8 border-t border-neutral-700">
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-100 mb-3 sm:mb-4 tracking-tight">
                Философия работы
              </h3>
              <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">
                Верю в важность чистого кода, тестирования и документации. Каждый проект 
                для меня — возможность применить лучшие практики и создать что-то, чем можно 
                гордиться. Постоянно слежу за трендами индустрии и активно изучаю новые 
                инструменты и подходы.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
