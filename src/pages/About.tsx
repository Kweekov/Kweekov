import { About as AboutBlock, ExperienceSection, Skills, TechStackSection, TestimonialsSection } from "../components"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"

export function AboutPage({ isDark }: { isDark: boolean }) {
  const { t } = useTranslation()
  const timeline = t('timeline.items', { returnObjects: true, defaultValue: [
    { year: '2021', text: 'Первые пет‑проекты и изучение TypeScript' },
    { year: '2022', text: 'Фриланс, коммерческие проекты на React/Node' },
    { year: '2023', text: 'Проектирование архитектуры, оптимизация производительности' },
    { year: '2024', text: 'Системы, инфраструктура, CI/CD, аналитика' },
  ] }) as Array<{ year: string; text: string }>

  return (
    <section className="mt-10 grid gap-8 md:grid-cols-3 md:items-start">
      <div className="md:col-span-1 space-y-8">
        <AboutBlock isDark={isDark} />
        <Skills isDark={isDark} />
      </div>
      <div className="md:col-span-2 space-y-8">
        <ExperienceSection isDark={isDark} />
        <TechStackSection isDark={isDark} />
        <TestimonialsSection isDark={isDark} />

        <div className={`rounded-lg p-6 border ${isDark ? 'border-zinc-700 bg-zinc-800/30' : 'border-slate-300 bg-white'}`}>
          <h3 className="text-sm font-semibold uppercase">{t('sections.timeline')}</h3>
          <div className="mt-4 space-y-4">
            {timeline.map((e, i) => (
              <motion.div
                key={`${e.year}-${i}`}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-start gap-3"
              >
                <div className={`mt-0.5 h-2 w-2 rounded-full ${isDark ? 'bg-emerald-400' : 'bg-slate-800'}`} />
                <div>
                  <div className="text-xs font-semibold">{e.year}</div>
                  <div className={`${isDark ? 'text-zinc-300' : 'text-slate-700'} text-sm`}>{e.text}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 