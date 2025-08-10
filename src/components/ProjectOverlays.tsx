import { useEffect, useLayoutEffect, useRef, useState } from "react"
import type { Project, ThemeSettings } from "../types"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from "react-i18next"
import { createPortal } from "react-dom"

interface SlideOverProps {
  project: Project | null
  isDark: boolean
  onClose: () => void
}

export function ProjectSlideOver({ project, isDark, onClose }: SlideOverProps) {
  const { t, i18n } = useTranslation()
  const lang = (i18n.language || 'ru') as 'ru'|'en'

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [onClose])

  useEffect(() => {
    if (!project) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [project])

  return (
    <AnimatePresence>
      {project && (
        <motion.div className="fixed inset-0 z-50 flex bg-black/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="absolute inset-0 z-0" onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: 'tween', duration: 0.25 }}
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
            className={`relative z-10 ${isDark ? "bg-zinc-900 text-zinc-100" : "bg-white text-slate-900"} ml-auto h-full w-full max-w-md shadow-xl border-l ${isDark ? "border-zinc-700" : "border-slate-200"}`}
          >
            <div className="p-6 flex items-start justify-between border-b border-white/5">
              <div>
                <h2 id="project-title" className="text-lg font-semibold">{project.title[lang]}</h2>
                <p className={`${isDark ? "text-zinc-400" : "text-slate-500"} text-xs mt-1`}>
                  {project.tags.join(" • ")} • {project.year}
                </p>
              </div>
              <button
                onClick={onClose}
                className={`${isDark ? "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800" : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"} p-2 rounded-md transition`}
                aria-label={t('common.close')}
              >
                ✕
              </button>
            </div>

            <div className={`${isDark ? "text-zinc-300" : "text-slate-700"} p-6 text-sm space-y-4 overflow-y-auto h-[calc(100%-156px)]`}>
              <p>{project.details[lang]}</p>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${isDark ? "bg-emerald-600 hover:bg-emerald-700" : "bg-slate-900 hover:bg-slate-800"} inline-flex items-center gap-2 px-3 py-2 rounded-md text-white text-sm transition`}
                >
                  {t('projects.open')}
                  <span aria-hidden>↗</span>
                </a>
              )}
            </div>

            <div className="px-4 pt-4 border-t border-white/5 text-xs flex items-center justify-between">
              <span className={`${isDark ? "text-zinc-400" : "text-slate-500"}`}>{t('overlay.swipeClose')}</span>
              <button
                onClick={onClose}
                className={`${isDark ? "border-zinc-600 hover:border-zinc-500 hover:bg-zinc-800" : "border-slate-300 hover:border-slate-400 hover:bg-slate-50"} px-3 py-1.5 rounded-md border transition`}
              >
                {t('common.close')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

interface ThemePopoverProps {
  anchorEl: HTMLButtonElement | null
  open: boolean
  settings: ThemeSettings
  isDark: boolean
  onClose: () => void
  onSave: (s: ThemeSettings) => void
}

export function ThemePopover({ anchorEl, open, settings, isDark, onClose, onSave }: ThemePopoverProps) {
  const [localSettings, setLocalSettings] = useState(settings)
  const popRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 })
  const { t } = useTranslation()

  useLayoutEffect(() => {
    setLocalSettings(settings)
  }, [settings])

  useLayoutEffect(() => {
    if (!anchorEl || !open) return
    const compute = () => {
      const rect = anchorEl.getBoundingClientRect()
      const PADDING = 8
      const POPOVER_WIDTH = 320
      const left = Math.min(Math.max(PADDING, rect.left), window.innerWidth - POPOVER_WIDTH - PADDING)
      const top = rect.bottom + PADDING
      setPos({ top, left })
    }
    compute()
  }, [anchorEl, open])

  useEffect(() => {
    if (!anchorEl || !open) return
    const onRecalc = () => {
      const rect = anchorEl.getBoundingClientRect()
      const PADDING = 8
      const POPOVER_WIDTH = 320
      const left = Math.min(Math.max(PADDING, rect.left), window.innerWidth - POPOVER_WIDTH - PADDING)
      const top = rect.bottom + PADDING
      setPos({ top, left })
    }
    window.addEventListener('resize', onRecalc)
    window.addEventListener('scroll', onRecalc, true)
    return () => {
      window.removeEventListener('resize', onRecalc)
      window.removeEventListener('scroll', onRecalc, true)
    }
  }, [anchorEl, open])

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!popRef.current) return
      if (!popRef.current.contains(e.target as Node) && anchorEl && !anchorEl.contains(e.target as Node)) onClose()
    }
    if (open) document.addEventListener("mousedown", onDoc)
    return () => document.removeEventListener("mousedown", onDoc)
  }, [open, anchorEl, onClose])

  function handleSave() {
    onSave(localSettings)
    onClose()
  }

  if (!open) return null

  return createPortal(
    <div className="fixed z-[60]" style={{ top: pos.top, left: pos.left }} ref={popRef}>
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 4 }}
        transition={{ duration: 0.15 }}
        className={`${isDark ? "bg-zinc-800 border-zinc-700" : "bg-white border-slate-300"} w-80 rounded-lg border p-4 shadow-xl`}
      >
        <h3 className="text-sm font-semibold mb-3">{t('theme.title')}</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={localSettings.autoSwitch}
              onChange={e => setLocalSettings(prev => ({ ...prev, autoSwitch: e.target.checked }))}
              className="w-4 h-4 rounded"
            />
            <span className="text-sm">{t('theme.auto')}</span>
          </label>

          {localSettings.autoSwitch && (
            <div className="space-y-4">
              <div>
                <label className={`${isDark ? "text-zinc-300" : "text-slate-700"} block text-sm font-medium mb-2`}>
                  {t('theme.darkRange', { start: localSettings.darkStart, end: localSettings.darkEnd })}
                </label>
                <div className="space-y-3">
                  <div>
                    <span className="text-xs text-zinc-500 mb-1 block">{t('theme.darkRange', { start: localSettings.darkStart, end: localSettings.darkStart })}</span>
                    <input type="range" min="0" max="23" value={localSettings.darkStart} onChange={e => setLocalSettings(prev => ({ ...prev, darkStart: parseInt(e.target.value) }))} className="w-full" />
                  </div>
                  <div>
                    <span className="text-xs text-zinc-500 mb-1 block">{t('theme.darkRange', { start: localSettings.darkEnd, end: localSettings.darkEnd })}</span>
                    <input type="range" min="0" max="23" value={localSettings.darkEnd} onChange={e => setLocalSettings(prev => ({ ...prev, darkEnd: parseInt(e.target.value) }))} className="w-full" />
                  </div>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={() => setLocalSettings(prev => ({ ...prev, isDarkMode: !prev.isDarkMode }))}
            className={`${isDark ? "border-zinc-600 hover:border-emerald-500 hover:bg-zinc-700" : "border-slate-300 hover:border-slate-400 hover:bg-slate-50"} w-full p-3 rounded-md border text-sm transition`}
          >
            {localSettings.isDarkMode ? t('theme.toLight') : t('theme.toDark')}
          </button>

          <div className="flex justify-end gap-2">
            <button onClick={onClose} className={`${isDark ? "border-zinc-600 hover:border-zinc-500 hover:bg-zinc-700" : "border-slate-300 hover:border-slate-400 hover:bg-slate-50"} px-3 py-2 rounded-md border text-sm transition`}>{t('theme.cancel')}</button>
            <button onClick={handleSave} className={`${isDark ? "bg-emerald-600 hover:bg-emerald-700" : "bg-slate-900 hover:bg-slate-800"} px-3 py-2 rounded-md text-white text-sm transition`}>
              {t('theme.save')}
            </button>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  )
} 