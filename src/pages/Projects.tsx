import { useMemo, useState } from "react"
import { ProjectGrid, SearchBar } from "../components"
import type { Project } from "../types"
import { SAMPLE_PROJECTS } from "../services/data"
import { useTranslation } from "react-i18next"

export function ProjectsPage({ isDark, onProjectOpen }: { isDark: boolean; onProjectOpen: (p: Project) => void }) {
  const [query, setQuery] = useState("")
  const { t, i18n } = useTranslation()
  const lang = (i18n.language || 'ru') as 'ru' | 'en'

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return SAMPLE_PROJECTS
    return SAMPLE_PROJECTS.filter(p =>
      p.title[lang].toLowerCase().includes(q) ||
      p.short[lang].toLowerCase().includes(q) ||
      p.tags.join(" ").toLowerCase().includes(q)
    )
  }, [query, lang])

  return (
    <section className="mt-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-lg font-semibold">{t('projects.title')}</h1>
        <SearchBar value={query} isDark={isDark} onChange={setQuery} />
      </div>
      <ProjectGrid projects={filtered} isDark={isDark} onProjectClick={onProjectOpen} />
    </section>
  )
} 