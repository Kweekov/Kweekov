import { useEffect, useMemo, useState } from "react"
import { About, CryptoWidget, FactWidget, Hero, ProjectGrid, SearchBar, Skills, WeatherWidget } from "../components"
import type { CryptoData, Project, WeatherData } from "../types"
import { fetchCrypto, fetchRandomFact, fetchWeather } from "../services/api"
import { SAMPLE_PROJECTS } from "../services/data"
import { useTranslation } from "react-i18next"

export function HomePage({ isDark, onProjectOpen }: { isDark: boolean; onProjectOpen: (p: Project) => void }) {
  const [query, setQuery] = useState("")
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [crypto, setCrypto] = useState<CryptoData[]>([])
  const [randomFact, setRandomFact] = useState("")
  const { t, i18n } = useTranslation()
  const lang = (i18n.language || 'ru') as 'ru' | 'en'

  useEffect(() => {
    async function hydrate() {
      const [w, c] = await Promise.all([fetchWeather(), fetchCrypto()])
      setWeather(w)
      setCrypto(c)
    }
    async function loadFact() {
      const f = await fetchRandomFact()
      setRandomFact(f)
    }
    hydrate()
    loadFact()
    const dataTimer = setInterval(hydrate, 5 * 60 * 1000)
    const factTimer = setInterval(loadFact, 10 * 60 * 1000)
    return () => {
      clearInterval(dataTimer)
      clearInterval(factTimer)
    }
  }, [])

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
    <>
      <Hero isDark={isDark} />
      <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <WeatherWidget weather={weather} isDark={isDark} />
        <CryptoWidget crypto={crypto} isDark={isDark} />
        <FactWidget fact={randomFact} isDark={isDark} />
      </section>
      <section className="mt-12 grid gap-10 md:grid-cols-3 md:items-start">
        <div className="md:col-span-1">
          <About isDark={isDark} />
          <div className="mt-8">
            <h3 className={`${isDark ? "text-zinc-400" : "text-slate-500"} text-sm font-semibold uppercase`}>{t('sections.skills')}</h3>
            <Skills isDark={isDark} />
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h3 className="text-lg font-semibold">{t('projects.title')}</h3>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <SearchBar value={query} isDark={isDark} onChange={setQuery} />
            </div>
          </div>
          <ProjectGrid projects={filtered} isDark={isDark} onProjectClick={onProjectOpen} />
        </div>
      </section>
    </>
  )
} 