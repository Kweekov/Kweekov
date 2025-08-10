import { useTranslation } from "react-i18next"

interface SearchBarProps {
  value: string
  isDark: boolean
  onChange: (v: string) => void
}

export function SearchBar({ value, isDark, onChange }: SearchBarProps) {
  const { t } = useTranslation()
  return (
    <input
      aria-label={t('projects.title')}
      value={value}
      onChange={e => onChange(e.target.value)}
      className={`w-full md:w-56 text-sm px-3 py-2 border rounded-md transition-colors focus:outline-none focus:ring-2 ${
        isDark ? "bg-zinc-800 border-zinc-700 text-zinc-100 focus:ring-emerald-500" : "bg-white border-slate-300 text-slate-900 focus:ring-slate-300"
      }`}
      placeholder={t('search.placeholder', { defaultValue: 'Поиск: React, 2025...' })}
    />
  )
} 