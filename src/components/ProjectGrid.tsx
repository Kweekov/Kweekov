import type { Project } from "../types"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"

interface ProjectGridProps {
  projects: Project[]
  isDark: boolean
  onProjectClick: (project: Project) => void
}

export function ProjectGrid({ projects, isDark, onProjectClick }: ProjectGridProps) {
  const { t, i18n } = useTranslation()
  const lang = (i18n.language || 'ru') as 'ru' | 'en'

  function getStatusColor(status: Project["status"]) {
    if (isDark) {
      switch (status) {
        case "completed": return "text-emerald-400 bg-emerald-400/10"
        case "in-progress": return "text-amber-400 bg-amber-400/10"
        case "archived": return "text-zinc-400 bg-zinc-400/10"
        default: return "text-zinc-400 bg-zinc-400/10"
      }
    } else {
      switch (status) {
        case "completed": return "text-emerald-600 bg-emerald-50"
        case "in-progress": return "text-amber-600 bg-amber-50"
        case "archived": return "text-slate-500 bg-slate-50"
        default: return "text-slate-500 bg-slate-50"
      }
    }
  }

  function getStatusText(status: Project["status"]) {
    switch (status) {
      case "completed": return lang === 'ru' ? "Завершён" : "Completed"
      case "in-progress": return lang === 'ru' ? "В работе" : "In progress"
      case "archived": return lang === 'ru' ? "Архив" : "Archived"
      default: return ""
    }
  }

  return (
    <div id="projects" className="mt-6 grid gap-4 sm:grid-cols-2">
      {projects.map((p, index) => (
        <motion.article
          key={p.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          tabIndex={0}
          onClick={() => onProjectClick(p)}
          onKeyDown={e => e.key === "Enter" && onProjectClick(p)}
          className={`group cursor-pointer rounded-lg border px-4 py-4 transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] focus:outline-none ${
            isDark 
              ? "border-zinc-700 bg-zinc-800/30 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/5 focus:border-emerald-500" 
              : "border-slate-300 bg-white hover:border-slate-400 hover:shadow-md focus:border-slate-400"
          }`}
        >
          <div className="flex items-start justify-between">
            <h4 className="text-sm font-medium pr-2">{p.title[lang]}</h4>
            {p.status && (
              <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${getStatusColor(p.status)}`}>
                {getStatusText(p.status)}
              </span>
            )}
          </div>
          <p className={`${isDark ? "text-zinc-400" : "text-slate-600"} mt-1 text-xs`}>{p.short[lang]}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {p.tags.map(t => (
              <span
                key={t}
                className={`text-xs px-2 py-1 border rounded-full transition-colors ${
                  isDark 
                    ? "border-zinc-600 text-zinc-300 group-hover:border-emerald-500 group-hover:text-emerald-300" 
                    : "border-slate-300 text-slate-700 group-hover:border-slate-400"
                }`}
              >
                {t}
              </span>
            ))}
          </div>
          <div className={`${isDark ? "text-zinc-400" : "text-slate-500"} mt-3 flex items-center justify-between text-xs`}>
            <span>{p.year}</span>
            <span className="group-hover:underline transition-all group-hover:translate-x-1">{t('projects.open')}</span>
          </div>
        </motion.article>
      ))}

      {projects.length === 0 && (
        <div className={`${isDark ? "bg-zinc-800/50 text-zinc-400" : "bg-slate-50 text-slate-600"} col-span-full rounded-md p-6 text-center text-sm`}>
          {t('projects.empty')}
        </div>
      )}
    </div>
  )
} 