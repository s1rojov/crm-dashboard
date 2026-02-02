<script setup lang="ts">
  definePageMeta({
    layout: 'blank',
  });

  import { useAuthStore } from '~/store/auth';
  import { authRepository } from '~/api/auth';

  const { login } = authRepository();
  const authStore = useAuthStore();

  const form = reactive({
    username: '',
    password: '',
  });

  const loading = ref(false);

  const handleLogin = async () => {
    if (loading.value) return;

    loading.value = true;
    try {
      const data = await login(form);
      authStore.setAuth(data);
      console.log(data);
      return await navigateTo('/');
    } catch (err: any) {
      console.error('Login Error:', err);
      alert('Login yoki parol xato!');
    } finally {
      loading.value = false;
    }
  };
</script>

<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <form
      @submit.prevent="handleLogin"
      class="p-8 bg-white rounded-lg shadow-lg w-96"
    >
      <h1 class="text-2xl font-bold mb-6 text-center text-gray-800">
        CRM Login
      </h1>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Username</label
          >
          <input
            v-model="form.username"
            type="text"
            placeholder="emilys"
            class="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            :disabled="loading"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Parol</label>
          <input
            v-model="form.password"
            type="password"
            placeholder="emilyspass"
            class="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            :disabled="loading"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded font-semibold transition-colors disabled:bg-blue-300"
          :disabled="loading"
        >
          {{ loading ? 'Kirilmoqda...' : 'Kirish' }}
        </button>
      </div>
    </form>
  </div>
</template>
