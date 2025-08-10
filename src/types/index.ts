export interface Localized {
  ru: string
  en: string
}

export interface Project {
  id: string
  title: Localized
  short: Localized
  tags: string[]
  year: string
  thumb?: string
  details: Localized
  url?: string
  status?: "completed" | "in-progress" | "archived"
}

export interface ThemeSettings {
  isDarkMode: boolean
  darkStart: number
  darkEnd: number
  autoSwitch: boolean
}

export interface WeatherData {
  location: string
  temp: number
  description: string
  humidity: number
  icon: string
}

export interface CryptoData {
  symbol: string
  price: number
  change: number
} 