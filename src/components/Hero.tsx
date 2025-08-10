import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"

interface HeroProps {
  isDark: boolean
}

export function Hero({ isDark }: HeroProps) {
  const { t } = useTranslation()
  const lines = t('hero.lines', { returnObjects: true }) as string[]

  return (
    <section className={`mt-10 rounded-lg p-6 border transition-all hover:shadow-lg ${
      isDark 
        ? "border-zinc-700 bg-zinc-800/50 hover:shadow-emerald-500/5" 
        : "border-slate-300 bg-white hover:shadow-slate-200"
    }`}>
      <div className="md:flex md:items-center md:justify-between">
        <div>
          <div className="min-h-[2.5rem]">
            {lines.map((line, i) => (
              <motion.h1
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="text-2xl md:text-3xl font-bold leading-tight"
              >
                {line}
              </motion.h1>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className={`mt-3 text-sm md:text-base max-w-xl ${isDark ? "text-zinc-300" : "text-slate-600"}`}
          >
            {t('hero.subtitle')}
          </motion.p>

          <div className="mt-4 flex flex-wrap gap-3">
            <motion.a
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.25 }}
              href="#projects"
              className={`inline-flex items-center text-sm font-medium px-3 py-2 border rounded-md transition-all hover:scale-105 ${
                isDark 
                  ? "border-zinc-600 hover:border-emerald-500 hover:bg-zinc-800" 
                  : "border-slate-300 hover:border-slate-400 hover:bg-slate-50"
              }`}
            >
              {t('hero.ctaCases')}
            </motion.a>
            <motion.a
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              href="#contact"
              className={`inline-flex items-center text-sm font-medium px-3 py-2 rounded-md transition-all hover:scale-105 ${
                isDark 
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                  : "bg-slate-900 hover:bg-slate-800 text-white"
              }`}
            >
              {t('hero.ctaContact')}
            </motion.a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.35 }}
          className={`${isDark ? "text-zinc-400" : "text-slate-500"} mt-6 md:mt-0 text-sm`}
        >
          <dl className="space-y-3">
            <div>
              <dt className="font-semibold">{t('hero.specialization')}</dt>
              <dd>{t('hero.fullStackDeveloper')}</dd>
            </div>
            <div>
              <dt className="font-semibold">{t('hero.experience')}</dt>
              <dd>{t('hero.years')}</dd>
            </div>
            <div>
              <dt className="font-semibold">{t('hero.locationTitle')}</dt>
              <dd>{t('hero.location')}</dd>
            </div>
          </dl>
        </motion.div>
      </div>
    </section>
  )
} 