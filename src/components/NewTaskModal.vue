<script setup>
import { ref, watch } from 'vue'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon, Clock } from 'lucide-vue-next'
import dayjs from '@/utils/dayjsConfig'
import { cn } from '@/lib/utils'

const props = defineProps({
  open: Boolean,
  task: Object
})

const emit = defineEmits(['update:open', 'save'])

const form = ref({
  title: '',
  description: '',
  dueDate: null,
  time: '09:00',
  priority: 'medium'
})

watch(() => props.open, (newVal) => {
  if (newVal) {
    if (props.task) {
      form.value = {
        title: props.task.title,
        description: props.task.description,
        dueDate: props.task.dueDate ? new Date(props.task.dueDate) : null,
        time: props.task.dueDate ? dayjs(props.task.dueDate).format('HH:mm') : '09:00',
        priority: props.task.priority || 'medium'
      }
    } else {
      form.value = {
        title: '',
        description: '',
        dueDate: null,
        time: '09:00',
        priority: 'medium'
      }
    }
  }
})

const handleSave = () => {
  if (!form.value.title) return

  let finalDueDate = null
  if (form.value.dueDate) {
    const date = dayjs(form.value.dueDate).format('YYYY-MM-DD')
    finalDueDate = dayjs(`${date} ${form.value.time}`).toISOString()
  }

  emit('save', {
    ...form.value,
    dueDate: finalDueDate
  })
  emit('update:open', false)
}
</script>

<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="sm:max-w-[480px] rounded-3xl p-8 border-none shadow-2xl">
      <DialogHeader>
        <DialogTitle class="text-2xl font-bold tracking-tight text-slate-900">
          {{ task ? 'Edit Task' : 'New Task' }}
        </DialogTitle>
        <DialogDescription class="text-slate-500">
          {{ task ? 'Update your task details' : 'Add a new item to your sanctuary.' }}
        </DialogDescription>
      </DialogHeader>

      <div class="grid gap-6 py-4">
        <div class="grid gap-2">
          <Label for="title" class="text-xs font-bold uppercase tracking-wider text-slate-400">Task Title</Label>
          <Input 
            id="title" 
            v-model="form.title" 
            placeholder="What needs to be done?" 
            class="h-12 text-base rounded-xl border-slate-100 bg-slate-50 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 transition-all"
          />
        </div>

        <div class="grid gap-2">
          <Label for="description" class="text-xs font-bold uppercase tracking-wider text-slate-400">Description</Label>
          <Textarea 
            id="description" 
            v-model="form.description" 
            placeholder="Add more details about this task..." 
            class="min-h-[100px] text-base rounded-xl border-slate-100 bg-slate-50 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 transition-all resize-none"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="grid gap-2">
            <Label class="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center">
              <CalendarIcon class="w-3 h-3 mr-1" /> Due Date
            </Label>
            <Popover>
              <PopoverTrigger as-child>
                <Button
                  variant="outline"
                  :class="cn(
                    'h-12 justify-start text-left font-normal rounded-xl border-slate-100 bg-slate-50 hover:bg-slate-100/50 transition-all',
                    !form.dueDate && 'text-slate-400'
                  )"
                >
                  {{ form.dueDate ? dayjs(form.dueDate).format('MMM D, YYYY') : 'Pick a date' }}
                </Button>
              </PopoverTrigger>
              <PopoverContent class="w-auto p-0 border-none shadow-xl rounded-2xl" align="start">
                <Calendar v-model="form.dueDate" initial-focus />
              </PopoverContent>
            </Popover>
          </div>

          <div class="grid gap-2">
            <Label class="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center">
              <Clock class="w-3 h-3 mr-1" /> Time
            </Label>
            <Input 
              type="time" 
              v-model="form.time" 
              class="h-12 rounded-xl border-slate-100 bg-slate-50 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 transition-all"
            />
          </div>
        </div>

        <div class="grid gap-2">
          <Label class="text-xs font-bold uppercase tracking-wider text-slate-400">Priority</Label>
          <Select v-model="form.priority">
            <SelectTrigger class="h-12 rounded-xl border-slate-100 bg-slate-50 hover:bg-slate-100/50 transition-all">
              <SelectValue placeholder="Set priority" />
            </SelectTrigger>
            <SelectContent class="border-none shadow-xl rounded-2xl">
              <SelectItem value="low" class="rounded-lg focus:bg-slate-50 cursor-pointer">
                <span class="flex items-center">
                  <span class="w-2 h-2 rounded-full bg-slate-300 mr-2"></span> Low Priority
                </span>
              </SelectItem>
              <SelectItem value="medium" class="rounded-lg focus:bg-slate-50 cursor-pointer">
                <span class="flex items-center">
                  <span class="w-2 h-2 rounded-full bg-blue-400 mr-2"></span> Normal
                </span>
              </SelectItem>
              <SelectItem value="high" class="rounded-lg focus:bg-slate-50 cursor-pointer">
                <span class="flex items-center">
                  <span class="w-2 h-2 rounded-full bg-red-500 mr-2"></span> High Priority
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DialogFooter class="sm:justify-between gap-4 mt-4">
        <Button variant="ghost" @click="$emit('update:open', false)" class="px-6 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100/50">
          Cancel
        </Button>
        <Button @click="handleSave" class="px-8 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95 font-medium">
          Save Task
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
