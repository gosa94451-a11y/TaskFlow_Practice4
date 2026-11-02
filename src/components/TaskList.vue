<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const newTask = ref('')
const tasks = ref([])
const filter = ref('all')

// Load saved tasks
onMounted(() => {
  try {
    const saved = JSON.parse(
      localStorage.getItem('taskflow-tasks') || '[]'
    )
    tasks.value = Array.isArray(saved) ? saved : []
  } catch {
    tasks.value = []
  }
})

// Save tasks automatically
watch(tasks, (value) => {
  localStorage.setItem(
    'taskflow-tasks',
    JSON.stringify(value)
  )
}, { deep: true })

// Add a new task
function addTask() {
  const title = newTask.value.trim()

  if (!title) return

  tasks.value.push({
    id: crypto.randomUUID(),
    title: title,
    completed: false
  })

  newTask.value = ''
}

// Delete a task
function deleteTask(id) {
  tasks.value = tasks.value.filter(
    task => task.id !== id
  )
}

// Filter tasks
const filteredTasks = computed(() => {
  if (filter.value === 'active') {
    return tasks.value.filter(task => !task.completed)
  }

  if (filter.value === 'completed') {
    return tasks.value.filter(task => task.completed)
  }

  return tasks.value
})

// Count completed tasks
const completedCount = computed(() => {
  return tasks.value.filter(task => task.completed).length
})
</script>

<template>
  <div class="task-container">
    <h1>TaskFlow</h1>

    <p>Менеджер особистих завдань</p>

    <form @submit.prevent="addTask">
      <input
        v-model="newTask"
        type="text"
        placeholder="Введіть нове завдання"
      />

      <button type="submit">
        Додати
      </button>
    </form>

    <div class="filters">
      <button @click="filter = 'all'">
        Усі
      </button>

      <button @click="filter = 'active'">
        Активні
      </button>

      <button @click="filter = 'completed'">
        Виконані
      </button>
    </div>

    <ul>
      <li
        v-for="task in filteredTasks"
        :key="task.id"
      >
        <input
          v-model="task.completed"
          type="checkbox"
        />

        <span
          :style="{
            textDecoration: task.completed
              ? 'line-through'
              : 'none'
          }"
        >
          {{ task.title }}
        </span>

        <button @click="deleteTask(task.id)">
          Видалити
        </button>
      </li>
    </ul>

    <p v-if="filteredTasks.length === 0">
      Завдань немає
    </p>

    <div class="statistics">
      <p>Усього завдань: {{ tasks.length }}</p>
      <p>Виконано: {{ completedCount }}</p>
    </div>
  </div>
</template>
