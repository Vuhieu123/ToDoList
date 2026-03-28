<script setup>
import DashboardView from '@/views/DashboardView.vue'
</script>

<template>
  <div class="min-h-screen bg-[#fafafa] font-sans text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-700">
    <DashboardView />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

:root {
  font-family: 'Plus Jakarta Sans', sans-serif;
}

body {
  background-color: #fafafa;
  margin: 0;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}
</style>
