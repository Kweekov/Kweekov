import type { Project } from "../types"

export const SAMPLE_PROJECTS: Project[] = [
  {
    id: "p1",
    title: { ru: "Ravir.store", en: "Ravir.store" },
    short: { ru: "Сайт для Российского интернет-магазина", en: "Russian e-commerce website" },
    tags: ["React", "TS", "Design System", "Node.js", "Express", "MySQL"],
    year: "2024 - 2025",
    status: "completed",
    details: {
      ru: "Разработал полнофункциональный интернет-магазин с нуля. Реализовал интеграцию с API CDEK для автоматического расчета стоимости доставки и отслеживания статусов. Внедрил систему вебхуков для мгновенного обновления статусов заказов. Интегрировал оплату через Tinkoff. Дополнительно создал внутреннюю CRM систему для эффективного управления заказами, включающую: автоматизированную обработку заказов, систему уведомлений, аналитику продаж, управление складскими остатками. Реализовал систему лояльности с персональными скидками и бонусами.",
      en: "Developed a full-featured e-commerce platform from scratch. Implemented CDEK API integration for automatic shipping cost calculation and tracking. Added webhook system for instant order status updates. Integrated payment via Tinkoff. Additionally created an internal CRM system for efficient order management, including: automated order processing, notification system, sales analytics, inventory management. Implemented loyalty system with personal discounts and bonuses."
    },
    url: "https://ravir.store",
  },
  {
    id: "p2",
    title: { ru: "Crypt0r — шифратор паролем", en: "Crypt0r — password-based encryptor" },
    short: {
      ru: "SPA на React/Vite: PBKDF2 → потоковый HMAC‑SHA256 → XOR + HMAC‑тег целостности. Визуализация пайплайна и внутреннее API.",
      en: "React/Vite SPA: PBKDF2 → streaming HMAC‑SHA256 → XOR + integrity HMAC tag. Pipeline visualization and internal API."
    },
    tags: ["React", "TypeScript", "Vite", "Crypto"],
    year: "2025",
    status: "completed",
    details: {
      ru: "Пет‑проект с собственным методом шифрования и детальной визуализацией процесса. Ключ вырабатывается через PBKDF2 (соль + итерации). Далее запускается поток HMAC‑SHA256, генерирующий блоки, которыми выполняется XOR с байтами текста. В завершение рассчитывается HMAC‑тег целостности по заголовку и шифртексту. Приложение содержит внутреннее API (без сервера) с типобезопасными ответами формата { success, data?, error? }, отдельные страницы для шифрования и расшифровки, а также наглядный прогресс‑бар этапов пайплайна. Поддерживаются параметры соли (base64url) и количества итераций, есть генератор паролей и тёмная тема с неоновыми акцентами.",
      en: "Side project featuring a custom encryption method with step‑by‑step visualization. A key is derived via PBKDF2 (salt + iterations). Then a streaming HMAC‑SHA256 produces blocks used to XOR the plaintext bytes. Finally, an integrity HMAC tag is calculated over the header and ciphertext. The app provides an internal client‑only API with typed responses { success, data?, error? }, separate pages for encryption/decryption, and a progress visualizer of the pipeline stages. Supports salt (base64url) and iterations, includes a password generator, and a neon‑accented dark theme."
    },
    url: "https://kweekov.github.io/Crypt0r",
  },
] 