<template>
  <f7-page name="home">
    <f7-navbar title="TaskFlow" />

    <div class="app-content">
      <div class="welcome-block">
        <h1>Мої завдання</h1>
        <p>Керуйте завданнями та відстежуйте їх виконання.</p>
      </div>

      <div class="summary-card">
        <div>
          <span class="summary-label">Виконано завдань</span>
          <div class="summary-value">{{ completedCount }} / {{ tasks.length }}</div>
        </div>
        <div class="summary-icon" aria-hidden="true">✓</div>
      </div>

      <form class="add-task-form" @submit.prevent="addTask">
        <h2>Нове завдання</h2>
        <label for="new-task-title">Назва</label>
        <input
          id="new-task-title"
          v-model="newTitle"
          type="text"
          maxlength="120"
          placeholder="Наприклад: Підготувати звіт"
          required
        />
        <label for="new-task-description">Опис</label>
        <textarea
          id="new-task-description"
          v-model="newDescription"
          rows="2"
          maxlength="500"
          placeholder="Короткий опис (необов'язково)"
        />
        <label for="new-task-priority">Пріоритет</label>
        <select id="new-task-priority" v-model="newPriority">
          <option value="low">Низький</option>
          <option value="medium">Середній</option>
          <option value="high">Високий</option>
        </select>
        <button class="primary-button" type="submit">+ Додати завдання</button>
      </form>

      <div class="section-header">
        <h2>Список завдань</h2>
        <span>{{ tasks.length }} завдань</span>
      </div>

      <div class="filter-row" role="group" aria-label="Фільтр завдань">
        <button type="button" :class="{ active: filter === 'all' }" @click="filter = 'all'">Усі</button>
        <button type="button" :class="{ active: filter === 'active' }" @click="filter = 'active'">Активні</button>
        <button type="button" :class="{ active: filter === 'done' }" @click="filter = 'done'">Виконані</button>
      </div>

      <div class="task-list">
        <TaskCard
          v-for="task in filteredTasks"
          :key="task.id"
          :task="task"
          @status-change="changeStatus"
          @delete="deleteTask"
        />
        <div v-if="filteredTasks.length === 0" class="empty-state">У цьому списку завдань немає.</div>
      </div>

      <f7-button fill large href="/about/" class="about-button">Про застосунок</f7-button>
    </div>
  </f7-page>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import TaskCard from '../components/TaskCard.vue';
import { tasks as initialTasks } from '../data/tasks.js';

const STORAGE_KEY = 'taskflow-pwa-tasks';

function loadTasks() {
  try {
    // Зберігаємо дані попередньої версії TaskFlow, якщо вони існують.
    const current = localStorage.getItem(STORAGE_KEY);
    if (current !== null) {
      const parsed = JSON.parse(current);
      if (Array.isArray(parsed)) return parsed;
    }

    const previous = localStorage.getItem('taskflow-tasks');
    if (previous !== null) {
      const parsed = JSON.parse(previous);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(task => ({
          id: task.id,
          title: task.title,
          description: task.description || '',
          status: task.completed ? 'done' : 'todo',
          priority: 'medium',
        }));
      }
    }
  } catch (error) {
    console.warn('Не вдалося прочитати збережені завдання:', error);
  }
  return initialTasks.map(task => ({ ...task }));
}

const tasks = ref(loadTasks());
const newTitle = ref('');
const newDescription = ref('');
const newPriority = ref('medium');
const filter = ref('all');

watch(tasks, value => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch (error) {
    console.warn('Не вдалося зберегти завдання:', error);
  }
}, { deep: true });

const completedCount = computed(() => tasks.value.filter(task => task.status === 'done').length);
const filteredTasks = computed(() => {
  if (filter.value === 'active') return tasks.value.filter(task => task.status !== 'done');
  if (filter.value === 'done') return tasks.value.filter(task => task.status === 'done');
  return tasks.value;
});

function addTask() {
  const title = newTitle.value.trim();
  if (!title) return;
  tasks.value.unshift({
    id: crypto.randomUUID(),
    title,
    description: newDescription.value.trim(),
    status: 'todo',
    priority: newPriority.value,
  });
  newTitle.value = '';
  newDescription.value = '';
  newPriority.value = 'medium';
  filter.value = 'all';
}

function changeStatus({ id, status }) {
  if (!['todo', 'progress', 'done'].includes(status)) return;
  const task = tasks.value.find(task => task.id === id);
  if (task) task.status = status;
}

function deleteTask(id) {
  tasks.value = tasks.value.filter(task => task.id !== id);
}
</script>
