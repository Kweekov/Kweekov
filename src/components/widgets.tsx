import type { CryptoData, WeatherData } from "../types"
import { useTranslation } from "react-i18next"

export function WeatherWidget({ weather, isDark }: { weather: WeatherData | null; isDark: boolean }) {
  const { t } = useTranslation()
  return (
    <div className={`p-4 rounded-lg border transition-all hover:scale-[1.02] ${
      isDark ? "border-zinc-700 bg-zinc-800/50" : "border-slate-300 bg-white"
    }`}>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">🌤️</span>
        <div>
          <h4 className="text-sm font-semibold">{t('widgets.weather.title')}</h4>
          <p className={`text-xs ${isDark ? "text-zinc-400" : "text-slate-500"}`}>
            {weather?.location || t('widgets.weather.loading')}
          </p>
        </div>
      </div>

      {weather ? (
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold">{weather.temp}°C</span>
            <span className={`text-xs ${isDark ? "text-zinc-400" : "text-slate-500"}`}>
              {weather.description}
            </span>
          </div>
          <p className={`text-xs ${isDark ? "text-zinc-400" : "text-slate-500"}`}>
            {t('widgets.weather.humidity', { defaultValue: 'Влажность' })}: {weather.humidity}%
          </p>
        </div>
      ) : (
        <div className="animate-pulse">
          <div className={`h-4 w-24 rounded ${isDark ? "bg-zinc-700" : "bg-slate-200"}`} />
        </div>
      )}
    </div>
  )
}

export function CryptoWidget({ crypto, isDark }: { crypto: CryptoData[]; isDark: boolean }) {
  const { t } = useTranslation()
  return (
    <div className={`p-4 rounded-lg border transition-all hover:scale-[1.02] ${
      isDark ? "border-zinc-700 bg-zinc-800/50" : "border-slate-300 bg-white"
    }`}>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">₿</span>
        <div>
          <h4 className="text-sm font-semibold">{t('widgets.crypto.title')}</h4>
          <p className={`text-xs ${isDark ? "text-zinc-400" : "text-slate-500"}`}>{t('widgets.crypto.usd')}</p>
        </div>
      </div>

      <div className="space-y-2">
        {crypto.length > 0 ? (
          crypto.map(coin => (
            <div key={coin.symbol} className="flex items-center justify-between">
              <span className="text-xs font-medium">{coin.symbol}</span>
              <div className="text-right">
                <div className="text-xs font-semibold">${coin.price.toLocaleString()}</div>
                <div className={`text-xs ${
                  coin.change >= 0 
                    ? (isDark ? "text-emerald-400" : "text-emerald-600")
                    : (isDark ? "text-red-400" : "text-red-600")
                }`}>
                  {coin.change >= 0 ? "+" : ""}{coin.change.toFixed(2)}%
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="space-y-2">
            <div className={`h-4 w-full rounded ${isDark ? "bg-zinc-700" : "bg-slate-200"}`} />
            <div className={`h-4 w-5/6 rounded ${isDark ? "bg-zinc-700" : "bg-slate-200"}`} />
          </div>
        )}
      </div>
    </div>
  )
}

export function FactWidget({ fact, isDark }: { fact: string; isDark: boolean }) {
  const { t } = useTranslation()
  return (
    <div className={`p-4 rounded-lg border transition-all hover:scale-[1.02] ${
      isDark ? "border-zinc-700 bg-zinc-800/50" : "border-slate-300 bg-white"
    }`}>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">💡</span>
        <div>
          <h4 className="text-sm font-semibold">{t('widgets.fact.title')}</h4>
          <p className={`text-xs ${isDark ? "text-zinc-400" : "text-slate-500"}`}>{t('widgets.fact.subtitle')}</p>
        </div>
      </div>
      <p className={`${isDark ? "text-zinc-300" : "text-slate-600"} text-xs leading-relaxed`}>
        {fact || t('widgets.weather.loading')}
      </p>
    </div>
  )
} 