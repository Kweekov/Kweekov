import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const saved = localStorage.getItem('lang')
const lng = saved || 'en'

const resources = {
  ru: {
    translation: {
      header: { name: 'Кирилл, 19 лет' },
      nav: { home: 'Главная', projects: 'Проекты', about: 'Обо мне', blog: 'Блог', contact: 'Контакты' },
      hero: {
        lines: [ 'Я создаю аккуратный интерфейс и понятный код.', 'Превращаю сложные задачи в элегантные решения.', 'Делаю веб лучше, один коммит за другим.' ],
        ctaCases: 'Мои кейсы', ctaContact: 'Связаться', subtitle: 'FullStack разработчик с фокусом на современные технологии.',
        specialization: 'Специализация',
        fullStackDeveloper: 'FullStack разработчик',
        experience: 'Опыт',
        years: '3+ года',
        locationTitle: 'Локация',
        location: 'Удаленно / Россия'
      },
      sections: { skills: 'Навыки', contact: 'Контакт', about: 'Обо мне', experience: 'Опыт', tech: 'Технологический стек', testimonials: 'Отзывы', timeline: 'Таймлайн' },
      widgets: {
        weather: { title: 'Погода', loading: 'Загрузка...', humidity: 'Влажность' },
        crypto: { title: 'Криптовалюты', usd: 'Курс USD', loading: 'Загружаем курсы...' },
        fact: { title: 'Интересный факт', subtitle: 'Обновляется каждые 10 мин' }
      },
      projects: { title: 'Проекты', open: 'Открыть кейс →', empty: 'Ничего не найдено — попробуйте другой запрос.' },
      contact: { email: 'Email', extra: 'Готов обсудить интересные проекты и возможности сотрудничества.' },
      footer: { made: 'Сделано с ❤️ на React + TypeScript' },
      theme: { title: 'Настройки темы', auto: 'Автоматическое переключение', darkRange: 'Тёмная тема с {{start}}:00 до {{end}}:00', cancel: 'Отмена', save: 'Сохранить', toLight: 'Переключить на светлую', toDark: 'Переключить на тёмную' },
      overlay: { swipeClose: 'Свайп вправо, чтобы закрыть' },
      common: { close: 'Закрыть' },
      search: { placeholder: 'Поиск: React, 2025...' },
      about: {
        text: 'Разрабатываю полнофункциональные веб‑приложения от идеи до продакшена. Специализируюсь на React, Node.js и современных инструментах разработки. Ценю чистый код, производительность и отличный UX.',
        note: '🚀 Открыт для интересных проектов и сотрудничества'
      },
      skills: { items: [
        { name: 'React + TypeScript', level: 0.5 },
        { name: 'Node.js + Express', level: 0.5 }, 
        { name: 'Database Design', level: 0.7 },
        { name: 'System Architecture', level: 0.83 },
        { name: 'JavaScript / ES6+', level: 0.58 },
        { name: 'HTML5 + CSS3', level: 1 },
        { name: 'Git & CI/CD', level: 0.68 },
        { name: 'REST APIs', level: 0.66 },
        { name: 'Markdown', level: 1 },
        { name: 'Docker', level: 0.3 }
      ]},
      timeline: { items: [
        { year: '2021', text: 'Первые пет‑проекты и изучение TypeScript' },
        { year: '2022', text: 'Фриланс, коммерческие проекты на React/Node' },
        { year: '2023', text: 'Проектирование архитектуры, оптимизация производительности' },
        { year: '2024', text: 'Системы, инфраструктура, CI/CD, аналитика' }
      ]}
    }
  },
  en: {
    translation: {
      header: { name: 'Kirill, 19 years old' },
      nav: { home: 'Home', projects: 'Projects', about: 'About', blog: 'Blog', contact: 'Contact' },
      hero: {
        lines: [ 'I craft clean UI and readable code.', 'I turn complex problems into elegant solutions.', 'Making the web better, one commit at a time.' ],
        ctaCases: 'Case studies', ctaContact: 'Contact', subtitle: 'FullStack developer focused on modern technologies.',
        specialization: 'Specialization',
        fullStackDeveloper: 'FullStack developer',
        experience: 'Experience',
        years: '3+ years',
        locationTitle: 'Location',
        location: 'Remote / Russia'
      },
      sections: { skills: 'Skills', contact: 'Contact', about: 'About', experience: 'Experience', tech: 'Tech stack', testimonials: 'Testimonials', timeline: 'Timeline' },
      widgets: {
        weather: { title: 'Weather', loading: 'Loading...', humidity: 'Humidity' },
        crypto: { title: 'Crypto', usd: 'USD rate', loading: 'Loading rates...' },
        fact: { title: 'Fun fact', subtitle: 'Updates every 10 min' }
      },
      projects: { title: 'Projects', open: 'Open case →', empty: 'Nothing found — try another query.' },
      contact: { email: 'Email', extra: 'Open to interesting projects and collaboration.' },
      footer: { made: 'Built with ❤️ using React + TypeScript' },
      theme: { title: 'Theme settings', auto: 'Automatic switching', darkRange: 'Dark from {{start}}:00 to {{end}}:00', cancel: 'Cancel', save: 'Save', toLight: 'Switch to light', toDark: 'Switch to dark' },
      overlay: { swipeClose: 'Swipe right to close' },
      common: { close: 'Close' },
      search: { placeholder: 'Search: React, 2025...' },
      about: {
        text: 'I build end‑to‑end web applications from idea to production. Focused on React, Node.js and modern tooling. I value clean code, performance and great UX.',
        note: '🚀 Open to interesting projects and collaborations'
      },
      skills: { items: [
        { name: 'React + TypeScript', level: 0.5 },
        { name: 'Node.js + Express', level: 0.5 }, 
        { name: 'Database Design', level: 0.7 },
        { name: 'System Architecture', level: 0.83 },
        { name: 'JavaScript / ES6+', level: 0.58 },
        { name: 'HTML5 + CSS3', level: 1 },
        { name: 'Git & CI/CD', level: 0.68 },
        { name: 'REST APIs', level: 0.66 },
        { name: 'Markdown', level: 1 },
        { name: 'Docker', level: 0.3 }
      ]},
      timeline: { items: [
        { year: '2021', text: 'First pet projects and learning TypeScript' },
        { year: '2022', text: 'Freelance, commercial projects on React/Node' },
        { year: '2023', text: 'Architecture design, performance optimization' },
        { year: '2024', text: 'Systems, infrastructure, CI/CD, analytics' }
      ]}
    }
  }
}

i18n.use(initReactI18next).init({ resources, lng, fallbackLng: 'en', interpolation: { escapeValue: false } })

export default i18n 