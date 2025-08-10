# Портфолио — Kweekov

Одностраничный сайт‑портфолио на React 19 + Vite 7 + TypeScript 5 + Tailwind CSS 4. В проекте есть домашняя страница с виджетами, список проектов с кейсами и лёгкая тёмная тема.

## Технологии
- React 19, Vite 7, TypeScript 5
- React Router DOM 7
- Tailwind CSS 4 (утилитарные классы)
- Framer Motion (микро‑анимации)
- i18next (RU/EN)

## Разделы
- Главная: хиро‑блок, виджеты (погода, курсы, факт), навыки
- Проекты: карточки кейсов с быстрым просмотром и слайдовером
- Обо мне: опыт, стек, отзывы
- Контакты: быстрые ссылки

## Кейсы
- Ravir.store — e‑commerce витрина и CRM (React/Node/Express/MySQL)
- Crypt0r — пет‑проект: собственный метод шифрования (PBKDF2 + потоковый HMAC‑SHA256 + XOR + HMAC‑тег целостности), визуализация пайплайна, внутреннее API. Репозиторий: `https://github.com/Kweekov/Crypt0r`

## Локальный запуск
```bash
npm i
npm run dev
```

## Сборка
```bash
npm run build
npm run preview
```

## Деплой на GitHub Pages
Репозиторий: `https://github.com/Kweekov/Kweekov.git`

Конфиг `vite.config.ts` уже содержит `base: '/Kweekov/'`.

1. Установите зависимости и соберите проект:
```bash
npm i
npm run build
```
2. Закоммитьте и отправьте изменения (см. команды ниже)
3. Включите Pages: Settings → Pages → Deploy from GitHub Actions либо `gh-pages` (если используете workflow ниже)

### GitHub Actions (опционально)
Добавьте workflow `.github/workflows/deploy-pages.yml` для автоматического деплоя при `push` в `main`.

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

## Команды для экспорта в GitHub
```bash
# если репозиторий ещё не инициализирован
git init

git remote add origin https://github.com/Kweekov/Kweekov.git

git add .
git commit -m "feat: initial portfolio setup"

git branch -M main
git push -u origin main
```

Если используете GitHub Pages с Actions — после пуша дождитесь завершения workflow «Deploy to GitHub Pages» и откройте страницу в `https://kweekov.github.io/Kweekov/`.

## Лицензия
ISC
