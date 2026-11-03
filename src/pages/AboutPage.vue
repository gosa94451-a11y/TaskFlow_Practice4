<template>
  <f7-page name="about">
    <f7-navbar title="Про TaskFlow" back-link="Назад" />

    <div class="app-content">
      <div class="welcome-block">
        <h1>TaskFlow</h1>
        <p>PWA-застосунок для управління завданнями.</p>
      </div>

      <div class="info-card">
        <h2>Використані технології</h2>
        <p><strong>Vue 3</strong> — реактивний інтерфейс</p>
        <p><strong>Framework7</strong> — мобільні компоненти</p>
        <p><strong>Vite</strong> — середовище розробки та збірка</p>
        <p><strong>PWA</strong> — встановлення та офлайн-режим</p>
      </div>

      <div class="info-card">
        <h2>Можливості TaskFlow</h2>
        <p>Створення та видалення завдань, пріоритети, статуси й фільтрація.</p>
        <p>Завдання зберігаються в браузері на цьому пристрої.</p>
      </div>

      <f7-button large fill href="/">На головну</f7-button>
    </div>
  </f7-page>
</template>
