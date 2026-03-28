<script setup>
import { ref, computed } from 'vue'
import { useTaskStore } from '@/stores/useTaskStore'
import { storeToRefs } from 'pinia'
import AppHeader from '@/components/AppHeader.vue'
import EmptyState from '@/components/EmptyState.vue'
import TaskItem from '@/components/TaskItem.vue'
import NewTaskModal from '@/components/NewTaskModal.vue'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-vue-next'

const taskStore = useTaskStore()
const { filteredTasks, hasTasks } = storeToRefs(taskStore)

const isModalOpen = ref(false)
const editingTask = ref(null)

const openNewTaskModal = () => {
  editingTask.value = null
  isModalOpen.value = true
}

const openEditTaskModal = (task) => {
  editingTask.value = task
  isModalOpen.value = true
}

const handleSaveTask = (taskData) => {
  if (editingTask.value) {
    taskStore.updateTask(editingTask.value.id, taskData)
  } else {
    taskStore.addTask(taskData)
  }
}

const handleDeleteTask = (id) => {
  if (confirm('Are you sure you want to delete this task?')) {
    taskStore.deleteTask(id)
  }
}
</script>

<template>
  <div class="w-full max-w-4xl mx-auto px-4 sm:px-6 pb-32">
    <AppHeader />

    <main class="mt-8 relative z-10">
      <div v-if="!hasTasks" class="mt-12">
        <EmptyState @create="openNewTaskModal" />
      </div>

      <div v-else class="space-y-12">
        <div class="relative group">
          <div class="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
          <div class="relative flex items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 transition-all duration-300 group-hover:shadow-md">
            <div class="flex-1 min-w-0">
              <h2 class="text-3xl font-bold text-slate-900 tracking-tight mb-2">Focus on what matters.</h2>
              <p class="text-slate-500 font-medium">Organize your journey with clarity and calm.</p>
            </div>
            <Button 
              @click="openNewTaskModal" 
              size="lg" 
              class="h-14 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95 group"
            >
              <Plus class="w-5 h-5 mr-2 transition-transform group-hover:rotate-90" />
              Add Task
            </Button>
          </div>
        </div>

        <section v-if="filteredTasks.length > 0" class="space-y-4">
          <div class="flex items-center justify-between mb-6 px-2">
            <h2 class="text-sm font-bold uppercase tracking-widest text-slate-400">Current Sanctuary</h2>
            <div class="flex items-center gap-4 text-xs font-semibold text-slate-400">
              <span class="flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                {{ filteredTasks.length }} Task{{ filteredTasks.length > 1 ? 's' : '' }}
              </span>
              <button @click="taskStore.clearCompleted" class="hover:text-blue-600 transition-colors">Clear Completed</button>
            </div>
          </div>

          <div class="space-y-3">
            <TransitionGroup 
              name="task-list"
              enter-active-class="transition duration-500 ease-out"
              enter-from-class="opacity-0 translate-y-4"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition duration-300 ease-in absolute w-full"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
              move-class="transition duration-500"
            >
              <TaskItem 
                v-for="task in filteredTasks" 
                :key="task.id" 
                :task="task" 
                @edit="openEditTaskModal"
                @delete="handleDeleteTask"
              />
            </TransitionGroup>
          </div>
        </section>

        <div v-else class="py-20 text-center border-2 border-dashed border-slate-100 rounded-3xl">
          <p class="text-slate-400 font-medium">No tasks found in this view.</p>
        </div>
      </div>
    </main>

    <NewTaskModal 
      v-model:open="isModalOpen" 
      :task="editingTask" 
      @save="handleSaveTask"
    />

    <footer class="mt-20 flex justify-center pb-10">
      <div class="px-6 py-3 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        <p class="text-xs font-semibold text-slate-400">© 2024 Sanctuary Tasks. Keep evolving.</p>
        <div class="hidden sm:block h-4 w-px bg-slate-100"></div>
        <div class="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
          <a href="#" class="hover:text-blue-600 transition-colors">Privacy</a>
          <a href="#" class="hover:text-blue-600 transition-colors">Help</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.task-list-move {
  transition: all 0.5s ease;
}
</style>
