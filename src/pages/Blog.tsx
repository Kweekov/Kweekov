export function BlogPage({ isDark }: { isDark: boolean }) {
  const posts = [
    { id: 1, title: "Оптимизация рендера в React", excerpt: "Мемоизация, секционирование и Suspense..." },
    { id: 2, title: "Практики типобезопасности в TypeScript", excerpt: "Discriminated unions, branded types и zod..." },
  ]
  return (
    <section className="mt-10">
      <h1 className="text-lg font-semibold mb-4">Блог</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {posts.map(p => (
          <article key={p.id} className={`rounded-lg border p-4 ${isDark ? "border-zinc-700 bg-zinc-800/30" : "border-slate-300 bg-white"}`}>
            <h2 className="text-sm font-semibold">{p.title}</h2>
            <p className={`${isDark ? "text-zinc-400" : "text-slate-600"} text-xs mt-1`}>{p.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  )
} 