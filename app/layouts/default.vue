<template>
  <div class="min-h-screen bg-gray-50 flex">
    <aside class="w-64 bg-slate-900 text-white hidden md:block">
      <div class="p-6 text-xl font-bold border-b border-slate-800">My CRM</div>
      <nav class="p-4 space-y-2">
        <NuxtLink to="/" class="block p-3 hover:bg-slate-800 rounded"
          >Dashboard</NuxtLink
        >
        <NuxtLink to="/customers" class="block p-3 hover:bg-slate-800 rounded"
          >Mijozlar</NuxtLink
        >
        <NuxtLink to="/settings" class="block p-3 hover:bg-slate-800 rounded"
          >Sozlamalar</NuxtLink
        >
      </nav>
    </aside>

    <div class="flex-1 flex flex-col">
      <header
        class="h-16 bg-white border-b flex items-center justify-between px-8"
      >
        <h2 class="font-semibold text-gray-700">Xush kelibsiz!</h2>
        <div class="flex items-center gap-4">
          <button
            @click="authStore.logout"
            class="text-sm text-red-500 font-medium"
          >
            Chiqish
          </button>
        </div>
      </header>

      <main class="p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useAuthStore } from '~/store/auth';
  const authStore = useAuthStore();
</script>
