# TaskFlow — практична робота №4

Vue 3 + Framework7 + Vite + PWA + Cloudflare Workers.

## Встановлення (у вже наявному проєкті)

```bash
npm install
npm run dev
```

Перевірка production/PWA:

```bash
npm run build
npm run preview
```

Публікація після перевірки:

```bash
npx wrangler deploy
```

Збереження в GitHub: `git add .`, `git commit -m "Add Framework7 and PWA"`, `git push origin main`.

**Не виконуйте `git init` повторно** у вже підключеному репозиторії. Файли `.git`, `node_modules`, `dist` та `.wrangler` не потрібно копіювати з архіву оновлення.

## Структура

- `src/main.js` — підключення Vue та Framework7;
- `src/App.vue` — контейнер Framework7;
- `src/routes.js` — маршрути `/` і `/about/`;
- `src/pages/` — головна сторінка та сторінка «Про застосунок»;
- `src/components/TaskCard.vue` — картка завдання зі статусом і пріоритетом;
- `src/data/tasks.js` — початкові тестові дані;
- `src/css/app.css` — стилі;
- `vite.config.js` — PWA Manifest і Workbox Service Worker;
- `public/icons/` — іконки застосунку;
- `scripts/generate-icons.mjs` — генерація іконок через sharp;
- `wrangler.jsonc` — Cloudflare Workers.

Завдання зберігаються у `localStorage` цього браузера і не синхронізуються між пристроями.
