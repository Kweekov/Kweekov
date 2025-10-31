import { useEffect, useState } from "react"
import "./index.css"
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom"
import { Container, Footer, Header, ProjectSlideOver, ThemePopover } from "./components"
import type { Project, ThemeSettings } from "./types"
import { HomePage } from "./pages/Home"
import { ProjectsPage } from "./pages/Projects"
import { AboutPage } from "./pages/About"
import { ContactPage } from "./pages/Contact"
import { ExamPage } from "./pages/Exam"

// Компонент для обработки редиректа из 404.html
// Когда GitHub Pages возвращает 404.html, он редиректит на '/' с сохранением пути в sessionStorage
// Этот компонент восстанавливает правильный путь через React Router
function RedirectHandler() {
  const navigate = useNavigate()
  const location = useLocation()
  
  useEffect(() => {
    // Проверяем, есть ли сохраненный путь из 404.html
    const savedPath = sessionStorage.getItem('redirectPath')
    if (savedPath) {
      sessionStorage.removeItem('redirectPath')
      // Если мы на корневой странице, но есть сохраненный путь - перенаправляем
      if (location.pathname === '/' && savedPath !== '/') {
        navigate(savedPath, { replace: true })
        return
      }
    }
    
    // Проверяем текущий путь на валидность
    const currentPath = location.pathname
    const validRoutes = ['/', '/projects', '/about', '/contact', '/exam']
    
    // Если путь не валидный, перенаправляем на главную
    if (currentPath && !validRoutes.includes(currentPath)) {
      navigate('/', { replace: true })
    }
  }, [navigate, location])
  
  return null
}

export default function App() {
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>(() => {
    const saved = localStorage.getItem("themeSettings")
    return saved ? JSON.parse(saved) : { isDarkMode: true, darkStart: 18, darkEnd: 8, autoSwitch: true }
  })
  const [currentTime, setCurrentTime] = useState(new Date())
  const [themeAnchor, setThemeAnchor] = useState<HTMLButtonElement | null>(null)
  const [isThemeOpen, setIsThemeOpen] = useState(false)
  const [active, setActive] = useState<Project | null>(null)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60_000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!themeSettings.autoSwitch) return
    const hour = currentTime.getHours()
    const shouldBeDark = themeSettings.darkStart > themeSettings.darkEnd 
      ? hour >= themeSettings.darkStart || hour < themeSettings.darkEnd
      : hour >= themeSettings.darkStart && hour < themeSettings.darkEnd
    if (shouldBeDark !== themeSettings.isDarkMode) setThemeSettings(prev => ({ ...prev, isDarkMode: shouldBeDark }))
  }, [currentTime, themeSettings.darkStart, themeSettings.darkEnd, themeSettings.autoSwitch])

  useEffect(() => {
    localStorage.setItem("themeSettings", JSON.stringify(themeSettings))
  }, [themeSettings])

  function handleOpenTheme(anchor: HTMLButtonElement | null) {
    setThemeAnchor(anchor)
    setIsThemeOpen(true)
  }

  const isDark = themeSettings.isDarkMode

  // Для кастомного домена kweekov.ru base должен быть '/'
  // Если BASE_URL содержит '/Kweekov/', нормализуем его
  const basePath = import.meta.env.BASE_URL || '/'
  const normalizedBase = basePath.replace(/\/Kweekov\/?/, '/') || '/'

  return (
    <BrowserRouter basename={normalizedBase}>
      <RedirectHandler />
      <div className={`${isDark ? "bg-zinc-900 text-zinc-100" : "bg-white text-slate-900"} min-h-screen transition-colors duration-500 antialiased`}>
        <Container>
          <Header isDark={isDark} onThemeClick={handleOpenTheme} />
          <main>
            <Routes>
              <Route path="/" element={<HomePage isDark={isDark} onProjectOpen={setActive} />} />
              <Route path="/projects" element={<ProjectsPage isDark={isDark} onProjectOpen={setActive} />} />
              <Route path="/about" element={<AboutPage isDark={isDark} />} />
              <Route path="/contact" element={<ContactPage isDark={isDark} />} />
              <Route path="/exam" element={<ExamPage isDark={isDark} />} />
            </Routes>
        </main>
        <Footer isDark={isDark} />
        </Container>
        <ProjectSlideOver project={active} isDark={isDark} onClose={() => setActive(null)} />
        <ThemePopover
          anchorEl={themeAnchor}
          open={isThemeOpen}
          settings={themeSettings}
          isDark={isDark}
          onClose={() => setIsThemeOpen(false)}
          onSave={setThemeSettings}
        />
      </div>
    </BrowserRouter>
  )
}
