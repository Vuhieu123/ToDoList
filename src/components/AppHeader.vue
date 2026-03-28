<script setup>
import { useTaskStore } from '@/stores/useTaskStore'
import { storeToRefs } from 'pinia'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import logoUrl from '@/assets/google-tasks7052.logowik.com.webp'

const taskStore = useTaskStore()
const { filter } = storeToRefs(taskStore)
</script>

<template>
  <header class="flex items-center justify-between py-6 mb-8 border-b">
    <div class="flex items-center gap-3">
      <img :src="logoUrl" alt="Sanctuary Tasks Logo" class="w-10 h-10 object-contain" />
      <h1 class="text-2xl font-bold tracking-tight text-slate-900">Sanctuary Tasks</h1>
    </div>
    
    <Tabs v-model="filter" class="w-auto">
      <TabsList class="bg-slate-100/50">
        <TabsTrigger value="all" @click="taskStore.setFilter('all')" class="px-4 py-1.5 text-sm font-medium transition-all rounded-md data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">
          All
        </TabsTrigger>
        <TabsTrigger value="active" @click="taskStore.setFilter('active')" class="px-4 py-1.5 text-sm font-medium transition-all rounded-md data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">
          Active
        </TabsTrigger>
        <TabsTrigger value="completed" @click="taskStore.setFilter('completed')" class="px-4 py-1.5 text-sm font-medium transition-all rounded-md data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">
          Completed
        </TabsTrigger>
      </TabsList>
    </Tabs>
  </header>
</template>
