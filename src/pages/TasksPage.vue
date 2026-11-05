<template>
  <f7-page name="tasks">
    <f7-navbar title="Мої завдання" />

    <div class="app-content">
      <div class="page-heading">
        <h1>Завдання</h1>
        <p>Керуйте своїми завданнями</p>
      </div>

      <div class="task-manager">
        <h2>{{ editingId === null ? 'Нове завдання' : 'Редагування завдання' }}</h2>

        <form @submit.prevent="saveTask">
          <label>Назва</label>
          <input v-model="title" placeholder="Назва завдання" required />

          <label>Опис</label>
          <textarea v-model="description" placeholder="Опис (необов'язково)"></textarea>

          <label>Пріоритет</label>
          <select v-model="priority">
            <option value="low">Низький</option>
            <option value="medium">Середній</option>
            <option value="high">Високий</option>
          </select>

          <button type="submit">
            {{ editingId === null ? '+ Додати завдання' : 'Зберегти зміни' }}
          </button>

          <button v-if="editingId !== null" type="button" class="cancel-btn" @click="resetForm">
            Скасувати
          </button>
        </form>
      </div>

      <h2>Список завдань ({{ taskList.length }})</h2>

      <div class="task-list">
        <div v-for="task in taskList" :key="task.id" class="task-row task-row-detail">
          <f7-icon
            :f7="task.completed ? 'checkmark_circle_fill' : 'circle'"
            :class="{ 'completed-icon': task.completed }"
            @click="toggleTask(task)"
          />

          <div class="task-details">
            <div class="task-title">{{ task.title }}</div>
            <div class="task-description">{{ task.description }}</div>
            <div class="task-status">
              {{ task.completed ? 'Виконано' : 'Очікує виконання' }}
              · {{ priorityLabel(task.priority) }}
            </div>
            <div class="task-actions">
              <button @click="editTask(task)">Редагувати</button>
              <button class="delete-btn" @click="deleteTask(task.id)">Видалити</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AppTabbar active="tasks" />
  </f7-page>
</template>

<script setup>
import { ref, watch } from 'vue';
import AppTabbar from '../components/AppTabbar.vue';
import { tasks } from '../data/tasks.js';

const storageKey = 'taskflow-tasks';
let savedTasks = null;

try {
  const stored = localStorage.getItem(storageKey);
  if (stored) {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) savedTasks = parsed;
  }
} catch (error) {
  console.warn('Не вдалося завантажити завдання', error);
}

const taskList = ref(savedTasks ?? tasks.map(task => ({ ...task })));

const title = ref('');
const description = ref('');
const priority = ref('medium');
const editingId = ref(null);

watch(taskList, value => {
  try {
    localStorage.setItem(storageKey, JSON.stringify(value));
  } catch (error) {
    console.warn('Не вдалося зберегти завдання', error);
  }
}, { deep: true });

function priorityLabel(value) {
  return {
    low: 'Низький пріоритет',
    medium: 'Середній пріоритет',
    high: 'Високий пріоритет'
  }[value] ?? 'Середній пріоритет';
}

function resetForm() {
  title.value = '';
  description.value = '';
  priority.value = 'medium';
  editingId.value = null;
}

function saveTask() {
  if (!title.value.trim()) return;

  if (editingId.value !== null) {
    const task = taskList.value.find(item => item.id === editingId.value);
    if (task) {
      task.title = title.value.trim();
      task.description = description.value.trim();
      task.priority = priority.value;
    }
  } else {
    taskList.value.push({
      id: Math.max(0, ...taskList.value.map(item => Number(item.id) || 0)) + 1,
      title: title.value.trim(),
      description: description.value.trim(),
      priority: priority.value,
      completed: false
    });
  }

  resetForm();
}

function editTask(task) {
  editingId.value = task.id;
  title.value = task.title;
  description.value = task.description ?? '';
  priority.value = task.priority ?? 'medium';
}

function deleteTask(id) {
  if (confirm('Видалити це завдання?')) {
    taskList.value = taskList.value.filter(task => task.id !== id);
  }
}

function toggleTask(task) {
  task.completed = !task.completed;
}
</script>

<style scoped>
.task-manager {
  background: white;
  padding: 24px;
  border: 1px solid #dce3ee;
  border-radius: 18px;
  margin-bottom: 30px;
}

.task-manager h2 {
  margin-top: 0;
}

.task-manager form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.task-manager label {
  font-weight: 600;
}

.task-manager input,
.task-manager textarea,
.task-manager select {
  box-sizing: border-box;
  width: 100%;
  padding: 14px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  background: white;
  color: #172033;
  font: inherit;
}

.task-manager textarea {
  min-height: 85px;
}

.task-manager button {
  padding: 14px;
  border: none;
  border-radius: 10px;
  background: #2563eb;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

.task-manager .cancel-btn {
  background: #64748b;
}

.task-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 12px;
}

.task-actions button {
  padding: 8px 12px;
  border: 1px solid #2563eb;
  border-radius: 8px;
  color: #2563eb;
  background: white;
  cursor: pointer;
}

.task-actions .delete-btn {
  color: #dc2626;
  border-color: #dc2626;
}

.completed-icon {
  color: #059669;
}
</style>
