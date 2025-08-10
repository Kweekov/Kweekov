import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
interface CommonProps { isDark: boolean }

export function About({ isDark }: CommonProps) {
  const { t } = useTranslation()
  return (
    <aside>
      <h3 className={`text-sm font-semibold uppercase ${isDark ? "text-zinc-400" : "text-slate-500"}`}>{t('sections.about')}</h3>
      <p className={`mt-3 text-sm ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
        {t('about.text', { defaultValue: 'Разрабатываю полнофункциональные веб‑приложения от идеи до продакшена. Специализируюсь на React, Node.js и современных инструментах разработки. Ценю чистый код, производительность и отличный UX.' })}
      </p>
      <div className={`mt-4 text-xs ${isDark ? "text-zinc-400" : "text-slate-500"}`}>
        <div>{t('about.note', { defaultValue: '🚀 Открыт для интересных проектов и сотрудничества' })}</div>
      </div>
    </aside>
  )
}

export function Skills({ isDark }: CommonProps) {
  const { t } = useTranslation()
  const skills = (t('skills.items', { returnObjects: true, defaultValue: [
    { name: 'React + TypeScript', level: 0.95 },
    { name: 'Node.js + Express', level: 0.9 },
    { name: 'Database Design', level: 0.85 },
    { name: 'System Architecture', level: 0.8 },
  ] }) as Array<{ name: string; level: number }>)

  return (
    <motion.div 
      id="skills" 
      className="mt-3 space-y-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {skills.map((s, index) => (
        <motion.div
          key={s.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <motion.div 
            className="flex items-center justify-between text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: index * 0.15 }}
          >
            <span>{s.name}</span>
            <span className={isDark ? "text-zinc-400" : "text-slate-500"}>{Math.round(s.level * 100)}%</span>
          </motion.div>
          <div className={`${isDark ? "bg-zinc-700" : "bg-slate-100"} mt-1 h-2 w-full rounded-full overflow-hidden`}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${s.level * 100}%` }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              className={`${isDark ? "bg-gradient-to-r from-emerald-500 to-emerald-600" : "bg-gradient-to-r from-slate-600 to-slate-800"} h-full rounded-full`}
              aria-hidden
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export function Contact({ isDark }: CommonProps) {
  const { t } = useTranslation()
  return (
    <div id="contact" className="mt-3 text-sm space-y-2">
      <p className={isDark ? "text-zinc-400" : "text-slate-500"}>Telegram: <a href="https://t.me/kweek0v" className={`${isDark ? "hover:text-emerald-400" : "hover:text-emerald-600"} underline transition-colors`}><span className="font-mono">@kweek0v</span></a></p>
      <p className={isDark ? "text-zinc-400" : "text-slate-500"}>GitHub: <a href="https://github.com/kweekov" className={`${isDark ? "hover:text-emerald-400" : "hover:text-emerald-600"} underline transition-colors`}><span className="font-mono">https://github.com/kweekov</span></a></p>
      <p className={`${isDark ? "text-zinc-400" : "text-slate-500"} text-xs mt-3`}>{t('contact.extra')}</p>
    </div>
  )
}

export function Footer({ isDark }: CommonProps) {
  const { t } = useTranslation()
  return (
    <footer className={`${isDark ? "border-zinc-700 text-zinc-400" : "border-slate-300 text-slate-500"} mt-16 border-t py-6 text-sm`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>© {new Date().getFullYear()} Kweekov</div>
        <div className="flex items-center gap-4 text-xs">
          <span>{t('footer.made')}</span>
        </div>
      </div>
    </footer>
  )
} 