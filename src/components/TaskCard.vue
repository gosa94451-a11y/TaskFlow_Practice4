<template>
  <article class="task-card">
    <div class="task-card__top">
      <span class="task-card__status" :class="`status-${task.status}`">
        {{ statusText }}
      </span>
      <span class="task-card__priority" :class="`priority-${task.priority}`">
        {{ priorityText }}
      </span>
    </div>

    <h3 class="task-card__title">{{ task.title }}</h3>
    <p class="task-card__description">{{ task.description || 'Без опису' }}</p>

    <div class="task-card__actions">
      <label :for="`status-${task.id}`">Статус:</label>
      <select
        :id="`status-${task.id}`"
        :value="task.status"
        :aria-label="`Змінити статус: ${task.title}`"
        @change="$emit('status-change', { id: task.id, status: $event.target.value })"
      >
        <option value="todo">Заплановано</option>
        <option value="progress">У роботі</option>
        <option value="done">Виконано</option>
      </select>
      <button class="delete-button" type="button" @click="$emit('delete', task.id)">
        Видалити
      </button>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  task: { type: Object, required: true },
});

defineEmits(['status-change', 'delete']);

const statusLabels = {
  todo: 'Заплановано',
  progress: 'У роботі',
  done: 'Виконано',
};
const priorityLabels = {
  low: 'Низький',
  medium: 'Середній',
  high: 'Високий',
};

const statusText = computed(() => statusLabels[props.task.status] ?? 'Невідомо');
const priorityText = computed(() => priorityLabels[props.task.priority] ?? 'Не визначено');
</script>
