import { useEffect, useState, type MouseEvent } from "react"
import { Link, NavLink } from "react-router-dom"
import { useTranslation } from "react-i18next"

interface HeaderProps {
  isDark: boolean
  onThemeClick: (anchor: HTMLButtonElement | null) => void
}

export function Header({ isDark, onThemeClick }: HeaderProps) {
  const [time, setTime] = useState(new Date())
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t, i18n } = useTranslation()

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  function handleOpenTheme(e: MouseEvent<HTMLButtonElement>) {
    onThemeClick(e.currentTarget)
  }

  function toggleLang() {
    const next = i18n.language === 'ru' ? 'en' : 'ru'
    i18n.changeLanguage(next)
    localStorage.setItem('lang', next)
  }

  const linkBase = isDark ? "text-zinc-300" : "text-slate-600"
  const linkActive = isDark ? "text-white" : "text-slate-900"

  return (
    <header className="relative">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 no-underline group">
          <div className={`w-10 h-10 flex items-center justify-center rounded-md border transition-all group-hover:scale-105 ${
            isDark 
              ? "border-zinc-700 bg-zinc-800 group-hover:border-emerald-500" 
              : "border-slate-300 bg-white group-hover:border-slate-400"
          }`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="3" y="3" width="18" height="18" stroke="currentColor" strokeWidth="1.2" rx="2" />
              <path d="M7 12h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <span className="text-sm font-semibold">Kweekov</span>
            <div className={`${isDark ? "text-zinc-400" : "text-slate-500"} text-xs`}>
              {t('header.name')}
            </div>
          </div>
        </Link>

        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 rounded-md transition-all hover:scale-105"
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Desktop navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <nav className={`text-sm flex items-center gap-4 sm:gap-6 ${linkBase}`}>
            <NavLink to="/" end className={({ isActive }) => isActive ? linkActive : undefined}>{t('nav.home')}</NavLink>
            <NavLink to="/projects" className={({ isActive }) => isActive ? linkActive : undefined}>{t('nav.projects')}</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? linkActive : undefined}>{t('nav.about')}</NavLink>
            <NavLink to="/blog" className={({ isActive }) => isActive ? linkActive : undefined}>{t('nav.blog')}</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? linkActive : undefined}>{t('nav.contact')}</NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleLang}
              className={`px-2 py-1 text-xs rounded-md border ${isDark ? 'border-zinc-700 hover:bg-zinc-800' : 'border-slate-300 hover:bg-slate-50'}`}
              aria-label="Switch language"
            >
              {i18n.language.toUpperCase()}
            </button>
            <div className={`text-xs ${isDark ? "text-zinc-400" : "text-slate-500"}`}>
              {time.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </div>
            <button
              onClick={handleOpenTheme}
              className={`p-2 rounded-md transition-all hover:scale-105 ${
                isDark 
                  ? "bg-zinc-800 hover:bg-zinc-700 border border-zinc-700" 
                  : "bg-white hover:bg-slate-50 border border-slate-300"
              }`}
              aria-label="Настройки темы"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className={`lg:hidden absolute top-full left-0 right-0 mt-2 p-4 rounded-lg shadow-lg ${isDark ? 'bg-zinc-800' : 'bg-white'} border ${isDark ? 'border-zinc-700' : 'border-slate-200'}`}>
          <nav className="flex flex-col gap-4">
            <NavLink to="/" end className={({ isActive }) => `${isActive ? linkActive : linkBase} py-2`} onClick={() => setIsMenuOpen(false)}>{t('nav.home')}</NavLink>
            <NavLink to="/projects" className={({ isActive }) => `${isActive ? linkActive : linkBase} py-2`} onClick={() => setIsMenuOpen(false)}>{t('nav.projects')}</NavLink>
            <NavLink to="/about" className={({ isActive }) => `${isActive ? linkActive : linkBase} py-2`} onClick={() => setIsMenuOpen(false)}>{t('nav.about')}</NavLink>
            <NavLink to="/blog" className={({ isActive }) => `${isActive ? linkActive : linkBase} py-2`} onClick={() => setIsMenuOpen(false)}>{t('nav.blog')}</NavLink>
            <NavLink to="/contact" className={({ isActive }) => `${isActive ? linkActive : linkBase} py-2`} onClick={() => setIsMenuOpen(false)}>{t('nav.contact')}</NavLink>
          </nav>
          <div className={`flex items-center gap-3 mt-4 pt-4 border-t ${isDark ? 'border-zinc-700' : 'border-slate-200'}`}>
            <button
              onClick={toggleLang}
              className={`px-2 py-1 text-xs rounded-md border ${isDark ? 'border-zinc-700 hover:bg-zinc-700' : 'border-slate-300 hover:bg-slate-50'}`}
            >
              {i18n.language.toUpperCase()}
            </button>
            <button
              onClick={handleOpenTheme}
              className={`p-2 rounded-md transition-all hover:scale-105 ${
                isDark 
                  ? "bg-zinc-700 hover:bg-zinc-600 border border-zinc-600" 
                  : "bg-white hover:bg-slate-50 border border-slate-300"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </header>
  )
}