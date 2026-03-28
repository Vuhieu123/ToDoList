<script setup>
import { useTaskStore } from '@/stores/useTaskStore'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Edit2, Trash2, Calendar as CalendarIcon, AlertCircle } from 'lucide-vue-next'
import dayjs from '@/utils/dayjsConfig'
import { cn } from '@/lib/utils'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['edit'])
const taskStore = useTaskStore()

const formatDueDate = (date) => {
  if (!date) return ''
  const d = dayjs(date)
  if (d.isSame(dayjs(), 'day')) return `Today, ${d.format('h:mm A')}`
  if (d.isSame(dayjs().add(1, 'day'), 'day')) return `Tomorrow, ${d.format('h:mm A')}`
  return d.format('MMM D, h:mm A')
}

const priorityColors = {
  low: 'bg-slate-100 text-slate-600',
  medium: 'bg-blue-50 text-blue-600',
  high: 'bg-red-50 text-red-600'
}
</script>

<template>
  <div 
    class="group relative flex items-start gap-4 p-5 transition-all duration-300 rounded-3xl border"
    :class="[
      task.completed ? 'opacity-60 bg-white border-transparent' : 'bg-white border-transparent hover:border-slate-100 hover:shadow-xl hover:shadow-slate-100/50',
      task.overdue ? 'border-red-400 bg-red-50/30' : ''
    ]"
  >
    <div class="mt-1">
      <Checkbox 
        :model-value="task.completed" 
        @update:model-value="taskStore.toggleTaskCompletion(task.id)"
        class="w-5 h-5 rounded-lg border-slate-200 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 transition-all duration-300"
      />
    </div>

    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2 mb-1">
        <h3 
          class="text-base font-semibold text-slate-800 transition-all duration-300 truncate"
          :class="task.completed ? 'line-through text-slate-400' : ''"
        >
          {{ task.title }}
        </h3>
        
        <div v-if="task.overdue" class="flex items-center px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-100 rounded-md animate-pulse">
          <AlertCircle class="w-3 h-3 mr-1" />
          Overdue
        </div>

        <span 
          v-if="task.priority"
          class="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md"
          :class="priorityColors[task.priority]"
        >
          {{ task.priority }}
        </span>
      </div>

      <p 
        v-if="task.description" 
        class="mb-3 text-sm text-slate-500 line-clamp-1 group-hover:line-clamp-none transition-all duration-300"
        :class="task.completed ? 'text-slate-300' : ''"
      >
        {{ task.description }}
      </p>

      <div class="flex items-center gap-4 text-xs font-medium text-slate-400">
        <div v-if="task.dueDate" class="flex items-center gap-1.5" :class="task.overdue ? 'text-red-500' : ''">
          <CalendarIcon class="w-3.5 h-3.5" />
          {{ formatDueDate(task.dueDate) }}
        </div>
      </div>
    </div>

    <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <Button 
        variant="ghost" 
        size="icon" 
        @click="$emit('edit', task)"
        class="w-9 h-9 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
      >
        <Edit2 class="w-4 h-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        @click="taskStore.deleteTask(task.id)"
        class="w-9 h-9 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
      >
        <Trash2 class="w-4 h-4" />
      </Button>
    </div>
  </div>
</template>
