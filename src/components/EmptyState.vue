<script setup>
import { Button } from '@/components/ui/button'
import { Plus, Target } from 'lucide-vue-next'

defineEmits(['create'])
</script>

<template>
  <div class="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
    <div class="relative mb-6">
      <div class="absolute inset-0 bg-blue-100 rounded-full blur-2xl opacity-30 animate-pulse"></div>
      <div class="relative flex items-center justify-center w-24 h-24 transition-transform duration-500 rounded-3xl bg-slate-50 shadow-sm border border-slate-100 hover:scale-110">
        <Target class="w-10 h-10 text-blue-500" />
      </div>
    </div>
    
    <h2 class="mb-2 text-2xl font-semibold text-slate-800 tracking-tight">No tasks yet. Ready to conquer your day?</h2>
    <p class="mb-8 text-slate-500 max-w-sm">Your digital sanctuary is clear and calm. Take the first step towards your goals by adding a new task.</p>
    
    <Button @click="$emit('create')" size="lg" class="px-8 py-6 text-lg font-medium transition-all duration-300 rounded-2xl bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 active:scale-95 group">
      <Plus class="w-5 h-5 mr-2 transition-transform group-hover:rotate-90" />
      Create your first task
    </Button>

    <div class="grid grid-cols-3 gap-6 mt-16 max-w-2xl w-full">
      <div class="p-4 rounded-2xl bg-slate-50/50 border border-slate-100/50 text-left">
        <div class="w-8 h-8 mb-3 rounded-lg bg-blue-50 flex items-center justify-center">
          <Plus class="w-4 h-4 text-blue-500" />
        </div>
        <h3 class="text-sm font-semibold text-slate-800 mb-1">Quick Add</h3>
        <p class="text-xs text-slate-500">Press 'N' anywhere to start a new task instantly.</p>
      </div>
      <div class="p-4 rounded-2xl bg-slate-50/50 border border-slate-100/50 text-left">
        <div class="w-8 h-8 mb-3 rounded-lg bg-purple-50 flex items-center justify-center text-purple-500">
          <Target class="w-4 h-4" />
        </div>
        <h3 class="text-sm font-semibold text-slate-800 mb-1">Stay Focused</h3>
        <p class="text-xs text-slate-500">Break down big goals into manageable steps.</p>
      </div>
      <div class="p-4 rounded-2xl bg-slate-50/50 border border-slate-100/50 text-left">
        <div class="w-8 h-8 mb-3 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500">
          <Plus class="w-4 h-4" />
        </div>
        <h3 class="text-sm font-semibold text-slate-800 mb-1">Smart Sorting</h3>
        <p class="text-xs text-slate-500">Prioritize your most urgent needs automatically.</p>
      </div>
    </div>
  </div>
</template>
