import type { CryptoData, WeatherData } from "../types"

const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast?latitude=55.7558&longitude=37.6173&current_weather=true&hourly=temperature_2m,relative_humidity_2m'
const CRYPTO_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin&vs_currencies=usd&include_24hr_change=true'
const FACT_URL = 'https://uselessfacts.jsph.pl/random.json?language=ru'

export async function fetchWeather(): Promise<WeatherData | null> {
  try {
    const response = await fetch(WEATHER_URL)
    const data = await response.json()
    if (!data.current_weather) return null
    return {
      location: "Москва",
      temp: Math.round(data.current_weather.temperature),
      description: getWeatherDescription(data.current_weather.weathercode),
      humidity: data.hourly?.relative_humidity_2m?.[0] ?? 0,
      icon: getWeatherIcon(data.current_weather.weathercode)
    }
  } catch {
    return null
  }
}

export async function fetchCrypto(): Promise<CryptoData[]> {
  try {
    const response = await fetch(CRYPTO_URL)
    const data = await response.json()
    return [
      { symbol: "BTC", price: data.bitcoin?.usd || 0, change: data.bitcoin?.usd_24h_change || 0 },
      { symbol: "ETH", price: data.ethereum?.usd || 0, change: data.ethereum?.usd_24h_change || 0 },
      { symbol: "BNB", price: data.binancecoin?.usd || 0, change: data.binancecoin?.usd_24h_change || 0 },
    ]
  } catch {
    return []
  }
}

export async function fetchRandomFact(): Promise<string> {
  try {
    const response = await fetch(FACT_URL)
    const data = await response.json()
    return data.text || "Загружаем интересный факт..."
  } catch {
    return "💡 Знали ли вы, что TypeScript был создан в Microsoft в 2012 году?"
  }
}

function getWeatherDescription(code: number): string {
  const codes: { [key: number]: string } = {
    0: "Ясно",
    1: "Преимущественно ясно",
    2: "Переменная облачность",
    3: "Пасмурно",
    45: "Туман",
    48: "Изморозь",
    51: "Лёгкая морось",
    53: "Умеренная морось",
    55: "Густая морось",
    61: "Лёгкий дождь",
    63: "Умеренный дождь",
    65: "Сильный дождь",
    71: "Лёгкий снег",
    73: "Умеренный снег",
    75: "Сильный снег",
    80: "Ливни",
    95: "Гроза"
  }
  return codes[code] || "Неизвестно"
}

function getWeatherIcon(code: number): string {
  if (code === 0) return "☀️"
  if (code <= 3) return "⛅"
  if (code <= 48) return "🌫️"
  if (code <= 65) return "🌧️"
  if (code <= 75) return "❄️"
  if (code <= 82) return "🌧️"
  return "⛈️"
} 