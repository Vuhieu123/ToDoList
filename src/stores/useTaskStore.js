import { defineStore } from 'pinia'
import dayjs from '@/utils/dayjsConfig'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    filter: 'all', // 'all', 'active', 'completed'
  }),
  getters: {
    filteredTasks: (state) => {
      const now = dayjs()
      const tasksWithOverdue = state.tasks.map(task => ({
        ...task,
        overdue: !task.completed && task.dueDate && dayjs(task.dueDate).isBefore(now)
      }))

      if (state.filter === 'active') return tasksWithOverdue.filter(t => !t.completed)
      if (state.filter === 'completed') return tasksWithOverdue.filter(t => t.completed)
      return tasksWithOverdue
    },
    hasTasks: (state) => state.tasks.length > 0,
  },
  actions: {
    addTask(task) {
      this.tasks.push({
        id: crypto.randomUUID(),
        title: task.title,
        description: task.description || '',
        dueDate: task.dueDate || null,
        priority: task.priority || 'medium',
        completed: false,
        createdAt: new Date().toISOString(),
      })
    },
    updateTask(id, updatedTask) {
      const index = this.tasks.findIndex(t => t.id === id)
      if (index !== -1) {
        this.tasks[index] = { ...this.tasks[index], ...updatedTask }
      }
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id)
    },
    toggleTaskCompletion(id) {
      const task = this.tasks.find(t => t.id === id)
      if (task) {
        task.completed = !task.completed
      }
    },
    setFilter(newFilter) {
      this.filter = newFilter
    },
    clearCompleted() {
      this.tasks = this.tasks.filter(t => !t.completed)
    }
  },
  persist: true,
})
