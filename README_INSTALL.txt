ОНОВЛЕННЯ TASKFLOW — ПРАКТИЧНА РОБОТА №4

1. Розпакуйте TaskFlow_PZ4_UPDATE.zip.
2. Відкрийте папку TaskFlow_PZ4_UPDATE та скопіюйте ВСІ її файли й папки, КРІМ цього README_INSTALL.txt.
3. Вставте у вашу наявну папку taskflow-demo (де вже є .git, node_modules та package-lock.json).
4. Якщо macOS запитає про об'єднання/заміну файлів, підтвердіть об'єднання папок і заміну однакових файлів.
5. У VS Code відкрийте taskflow-demo, у терміналі виконайте: npm install
6. Потім: npm run dev
7. Після перевірки: npm run build
8. Після перевірки PWA: npx wrangler deploy
9. GitHub: git add . && git commit -m "Add Framework7 and PWA" && git push origin main

НЕ КОПІЮЙТЕ чужі .git / node_modules / dist. Архів їх не містить.
Початкові дані із попередньої версії TaskFlow імпортуються з localStorage, якщо вони були.
