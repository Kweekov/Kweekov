import { useState } from 'react'
import { motion } from 'framer-motion'
import { cases } from '../data/portfolio'
import type { Project } from '../types/portfolio'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
}

interface ProjectItemProps {
  project: Project
}

function ProjectItem({ project }: ProjectItemProps) {
  return (
    <motion.div
      variants={itemVariants}
      className="flex items-center justify-between py-4 border-b border-neutral-700 last:border-0 hover:bg-neutral-800/50 transition-colors px-2 -mx-2"
    >
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-neutral-200 hover:text-neutral-100 hover:underline font-medium text-base tracking-wide transition-colors"
      >
        {project.name}
      </a>
      {project.status === 'development' ? (
        <span className="px-3 py-1 text-xs text-amber-400 font-medium border border-amber-500/30 rounded">
          В разработке
        </span>
      ) : project.status === 'completed' ? (
        <span className="px-3 py-1 text-xs text-green-400 font-medium border border-green-500/30 rounded">
          Завершен
        </span>
      ) : project.status === 'discussion' ? (
        <span className="px-3 py-1 text-xs text-yellow-400 font-medium border border-yellow-500/30 rounded">
          В процессе обсуждения
        </span>
      ) : (
        <span className="px-3 py-1 text-xs text-neutral-400 font-medium border border-neutral-500/30 rounded">
          Неизвестно
        </span>
      )}
    </motion.div>
  )
}

interface CaseCardProps {
  caseItem: typeof cases[0]
}

function CaseCard({ caseItem }: CaseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getCaseDescription = () => {
    switch (caseItem.title) {
      case 'Ravir.store':
        return {
          main: 'Ravir.store — мой первый проект, интернет-магазин одежды. Полнофункциональная платформа с каталогом, корзиной, системой заказов и личным кабинетом. Включает административную панель для управления товарами, заказами и пользователями.',
          details: [
            'Интернет-магазин с полным функционалом',
            'Интеграция платежных систем',
            'Система управления заказами',
            'Административная панель',
          ],
        }
      case 'Echelondelamour.ru':
        return {
          main: 'Echelondelamour.ru — второй заказ на интернет-магазин, более упрощенная версия с фокусом на элегантности и простоте использования. Премиальный дизайн для целевой аудитории с упором на визуальную привлекательность и удобство.',
          details: [
            'Упрощенная архитектура',
            'Премиальный дизайн',
            'Оптимизированный пользовательский опыт',
            'Интеграция с CRM системой',
          ],
        }
      case 'Cashercollection.com':
        return {
          main: 'Cashercollection.com — один из ведущих streetwear-брендов России, сайт создан как современная e-commerce платформа с уникальным дизайном и акцентом на пользовательском опыте. Разработка включала интеграцию сложных бизнес-процессов и расширенный функционал для удобства администраторов и покупателей. Особое внимание уделено системам управления товарами и коллекциями, а также стабильности и безопасности приложения.',
          details: [
            'Современная и модульная архитектура приложения',
            'Разработка и внедрение RESTful API для интеграций и мобильной версии',
            'Гибкая система управления товарами и коллекциями, простая для админов',
            'Интуитивный и адаптивный UI/UX для роста продаж',
            'Расширенная система аналитики и отслеживания заказов',
            'Интеграция онлайн-оплаты и сервисов доставки',
            'Высокий уровень производительности и безопасности',
          ],
        }
      default:
        return {
          main: 'Кейс в разработке',
          details: [],
        }
    }
  }

  const description = getCaseDescription()

  return (
    <motion.div
      variants={itemVariants}
      className="mb-12 sm:mb-16 md:mb-24 last:mb-0"
    >
      <div className="border border-neutral-700 rounded-2xl p-4 sm:p-6 md:p-8 hover:border-neutral-600 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4 sm:mb-6">
          <a
            href={caseItem.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-100 hover:text-neutral-50 transition-colors tracking-tight"
          >
            {caseItem.title}
          </a>
          {caseItem.status === 'development' ? (
            <span className="px-4 py-1.5 text-xs text-red-400 font-medium border border-red-500/30 rounded">
              В разработке
            </span>
          ) : caseItem.status === 'completed' ? (
            <span className="px-4 py-1.5 text-xs text-green-400 font-medium border border-green-500/30 rounded">
              Завершен
            </span>
          ) : caseItem.status === 'almost-completed' ? (
            <span className="px-4 py-1.5 text-xs text-yellow-400 font-medium border border-yellow-500/30 rounded">
              Почти завершен
            </span>
          ) : caseItem.status === 'main-project' ? (
            <span className="px-4 py-1.5 text-xs text-blue-400 font-medium border border-blue-500/30 rounded">
              Основной проект
            </span>
          ) : caseItem.status === 'discussion' ? (
            <span className="px-4 py-1.5 text-xs text-yellow-400 font-medium border border-yellow-500/30 rounded">
              В процессе обсуждения
            </span>
          ) : (
            <span className="px-4 py-1.5 text-xs text-neutral-400 font-medium border border-neutral-500/30 rounded">
              Неизвестно
            </span>
          )}
        </div>
        
        <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed max-w-4xl">
            {description.main}
          </p>
          
          {description.details.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
              {description.details.map((detail, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
                  <span className="text-neutral-400 text-sm">{detail}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {caseItem.projects.length > 1 && (
          <div>
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-neutral-400 hover:text-neutral-200 transition-colors font-medium text-sm mb-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{isExpanded ? 'Скрыть' : 'Показать'} подпроекты ({caseItem.projects.length})</span>
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.button>
            
            <motion.div
              initial={false}
              animate={{
                height: isExpanded ? 'auto' : 0,
                opacity: isExpanded ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pt-6 mt-6 border-t border-neutral-700">
                <h4 className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-6">
                  Подпроекты
                </h4>
                <div>
                  {caseItem.projects.map((project) => (
                    <ProjectItem key={project.url} project={project} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {caseItem.title === 'Ravir.store' && (
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-neutral-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div>
                <h4 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-3">
                  ravir.productions
                </h4>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  Производство и бренд под ключ. Полный цикл от дизайна до реализации продукции.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-3">
                  ravir.delivery
                </h4>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  Сервис доставок для платформы Ravir с отслеживанием и управлением логистикой.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-3">
                  API экосистема
                </h4>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  Комплексное API для интеграции всех сервисов платформы Ravir.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export function Cases() {
  return (
    <section
      id="cases"
      className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 relative bg-neutral-900 min-h-screen flex items-center"
    >
      <motion.div
        className="max-w-7xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="flex flex-row justify-between mb-12 sm:mb-16 md:mb-20 px-4 sm:px-0">
          <motion.h2
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-neutral-100 uppercase tracking-tighter leading-none"
            variants={itemVariants}
          >
            КЕЙСЫ
          </motion.h2>
          <motion.h2
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-neutral-100/5 uppercase tracking-tighter leading-none hidden sm:block"
            variants={itemVariants}
          >
            CASES
          </motion.h2>
        </div>
        
        <motion.div
          className="space-y-4 sm:space-y-6 text-base sm:text-lg text-neutral-300 leading-relaxed font-light mb-12 sm:mb-16 max-w-4xl px-4 sm:px-0"
          variants={itemVariants}
        >
          <p>
            Ниже представлены ключевые проекты, над которыми я работал. Каждый из них 
            демонстрирует различные аспекты моих навыков и подход к решению сложных задач.
          </p>
        </motion.div>

        <div className="space-y-4">
          {cases.map((caseItem) => (
            <CaseCard key={caseItem.url} caseItem={caseItem} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
