interface CommonProps { isDark: boolean }

export function ExperienceSection({ isDark }: CommonProps) {
  const items = [
    { title: "FullStack Developer", place: "Freelance", period: "2022 — сейчас", details: "Проектирование, разработка и доставка production‑фич end‑to‑end." },
    { title: "Frontend Developer", place: "Side‑projects", period: "2021 — 2022", details: "UI‑библиотеки, быстрые прототипы, эксперименты с UX." },
  ]
  return (
    <section className={`rounded-lg p-6 border ${isDark ? "border-zinc-700 bg-zinc-800/30" : "border-slate-300 bg-white"}`}>
      <h3 className="text-sm font-semibold uppercase">Опыт</h3>
      <div className="mt-4 space-y-4">
        {items.map((it, i) => (
          <div key={it.title} className="animate-fade-in" style={{ animationDelay: `${i * 0.06}s` }}>
            <div className="flex items-center justify-between text-sm">
              <div className="font-medium">{it.title} · {it.place}</div>
              <div className={isDark ? "text-zinc-400" : "text-slate-500"}>{it.period}</div>
            </div>
            <p className={`${isDark ? "text-zinc-300" : "text-slate-600"} mt-1 text-sm`}>{it.details}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function TestimonialsSection({ isDark }: CommonProps) {
  const quotes = [
    { name: "Алексей", role: "PM", text: "Надежный исполнитель. Быстро погружается и качественно закрывает задачи." },
    { name: "Марина", role: "UX Lead", text: "Внимателен к деталям и заботится о пользователе. Отличный вкус к интерфейсам." },
  ]
  return (
    <section className={`rounded-lg p-6 border ${isDark ? "border-zinc-700 bg-zinc-800/30" : "border-slate-300 bg-white"}`}>
      <h3 className="text-sm font-semibold uppercase">Отзывы</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {quotes.map((q, i) => (
          <blockquote key={q.name} className={`${isDark ? "bg-zinc-900/50" : "bg-slate-50"} p-4 rounded-md animate-fade-in`} style={{ animationDelay: `${i * 0.06}s` }}>
            <p className={`${isDark ? "text-zinc-300" : "text-slate-700"} text-sm`}>“{q.text}”</p>
            <footer className={`${isDark ? "text-zinc-400" : "text-slate-500"} mt-2 text-xs`}>— {q.name}, {q.role}</footer>
          </blockquote>
        ))}
      </div>
    </section>
  )
}

export function TechStackSection({ isDark }: CommonProps) {
  const tech = [
    { name: "TypeScript", level: "Advanced" },
    { name: "React / Vite / Tailwind", level: "Advanced" },
    { name: "Node.js / Express", level: "Advanced" },
    { name: "Prisma / PostgreSQL", level: "Advanced" },
  ]
  return (
    <section className={`rounded-lg p-6 border ${isDark ? "border-zinc-700 bg-zinc-800/30" : "border-slate-300 bg-white"}`}>
      <h3 className="text-sm font-semibold uppercase">Технологический стек</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {tech.map((t, i) => (
          <div key={t.name} className={`${isDark ? "bg-zinc-900/50" : "bg-slate-50"} p-4 rounded-md animate-fade-in`} style={{ animationDelay: `${i * 0.06}s` }}>
            <div className="text-sm font-medium">{t.name}</div>
            <div className={`${isDark ? "text-zinc-400" : "text-slate-500"} text-xs`}>{t.level}</div>
          </div>
        ))}
      </div>
    </section>
  )
} 