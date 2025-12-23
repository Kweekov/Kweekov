import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { skills } from '../data/portfolio'

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
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
    },
  },
}

const skillDescriptions: Record<string, string> = {
  'HTML': 'Семантическая разметка и структурирование контента для современных веб-приложений',
  'CSS': 'Стилизация и создание адаптивных интерфейсов с использованием современных возможностей',
  'JavaScript': 'Разработка интерактивных компонентов и логики приложений на современном ES6+',
  'TypeScript': 'Типизированная разработка для повышения надежности и поддерживаемости кода',
  'React': 'Создание динамических пользовательских интерфейсов с компонентным подходом',
  'Vite': 'Современный инструмент сборки для быстрой разработки и оптимизации производительности',
  'Tailwind CSS': 'Утилитарный CSS-фреймворк для быстрого создания современного дизайна',
  'React Router DOM': 'Маршрутизация и навигация в React-приложениях для создания SPA',
  'Node.js': 'Серверная разработка и создание масштабируемых backend-приложений',
  'Express': 'Минималистичный веб-фреймворк для создания REST API и серверных приложений',
  'PHP': 'Разработка серверной логики и интеграция с базами данных',
  'Prisma': 'Современная ORM для работы с базами данных и управления схемой',
  'MySQL': 'Проектирование и оптимизация реляционных баз данных',
  'PostgreSQL': 'Продвинутая реляционная СУБД с расширенными возможностями и надежностью',
  'Git': 'Система контроля версий для управления кодом и командной разработки',
  'npm': 'Менеджер пакетов для установки и управления зависимостями проекта',
  'Docker': 'Контейнеризация приложений для упрощения развертывания и масштабирования',
  'Markdown': 'Документирование проектов и создание структурированного контента',
}

export function Skills() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const columns = 10
  const rows = 2
  const totalCells = columns * rows

  const cells: (typeof skills[0] | null)[] = Array(totalCells).fill(null)

  const skillPositions = [0, 1, 3, 4, 5, 7, 8, 10, 11, 12, 13, 15, 16, 17, 18, 19]
  
  skills.forEach((skill, index) => {
    if (index < skillPositions.length && skillPositions[index] < totalCells) {
      const position = skillPositions[index]
      cells[position] = skill
    }
  })

  const columnsData: (typeof skills[0] | null)[][] = []
  for (let i = 0; i < columns; i++) {
    columnsData.push([cells[i * rows], cells[i * rows + 1]])
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return
    setIsDragging(true)
    const container = scrollContainerRef.current
    setStartX(e.pageX - container.getBoundingClientRect().left)
    setScrollLeft(container.scrollLeft)
    container.style.cursor = 'grabbing'
    container.style.userSelect = 'none'
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab'
      scrollContainerRef.current.style.userSelect = ''
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab'
      scrollContainerRef.current.style.userSelect = ''
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return
    e.preventDefault()
    const container = scrollContainerRef.current
    const x = e.pageX - container.getBoundingClientRect().left
    const walk = (x - startX) * 2
    container.scrollLeft = scrollLeft - walk
  }

  return (
    <section
      id="skills"
      className="py-12 sm:py-16 md:py-20 relative bg-white min-h-screen"
    >
      <motion.div
      className="mx-auto"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      >
        <div className="flex flex-row justify-between max-w-7xl mx-auto px-4 sm:px-0">
          <motion.h2
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-8 sm:mb-12 md:mb-16 text-neutral-900 uppercase tracking-tighter leading-none"
            variants={itemVariants}
          >
            НАВЫКИ
          </motion.h2>
          <motion.h2
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-8 sm:mb-12 md:mb-16 text-neutral-900/10 uppercase tracking-tighter leading-none hidden sm:block"
            variants={itemVariants}
          >
            SKILLS
          </motion.h2>
        </div>
        
        <div
          ref={scrollContainerRef}
          data-draggable
          className="overflow-x-auto py-4 scrollbar-hide cursor-grab mx-2 sm:mx-4 px-2 sm:px-4"
          style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <motion.div
            className="inline-grid grid-cols-10 gap-6"
            variants={itemVariants}
            style={{ width: 'max-content' }}
          >
            {columnsData.map((column, colIndex) => {
              const shouldBeWhite = colIndex % 3 === 0 || colIndex % 3 === 2
              
              return (
                <div key={`col-${colIndex}`} className="flex flex-col gap-4 sm:gap-6 min-w-[280px] sm:min-w-[320px] md:min-w-[180px]">
                  {column.map((skill, rowIndex) => {
                    const cellIndex = colIndex * rows + rowIndex
                    
                    if (!skill) {
                      return <div key={`empty-${cellIndex}`} className="h-[200px] sm:h-[240px]" />
                    }
                    
                    return (
                      <motion.div
                        key={skill.name}
                        className={`p-4 sm:p-6 rounded-2xl h-[200px] sm:h-[240px] w-[280px] sm:w-[320px] md:w-full md:max-w-[400px] flex flex-col ${
                          shouldBeWhite
                            ? 'border border-neutral-900 text-neutral-900'
                            : 'bg-neutral-800 text-neutral-100'
                        }`}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-start justify-between mb-3 sm:mb-4">
                          <h3 className="text-lg sm:text-xl font-bold tracking-tight">
                            {skill.name}
                          </h3>
                          <span className={`text-xs sm:text-sm font-medium ${
                            shouldBeWhite ? 'text-neutral-400' : 'text-neutral-500'
                          }`}>
                            {String(cellIndex + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <p className={`text-xs sm:text-sm leading-relaxed ${
                          shouldBeWhite ? 'text-neutral-700' : 'text-neutral-300'
                        }`}>
                          {skillDescriptions[skill.name] || 'Профессиональная работа с данной технологией'}
                        </p>
                      </motion.div>
                    )
                  })}
                </div>
              )
            })}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
