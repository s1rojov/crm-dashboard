<script setup lang="ts">
  // 1. Layoutni belgilash
  definePageMeta({
    layout: 'blank',
  });

  // 2. Importlar (Nuxt 4 da auto-import ishlaydi, lekin Store va API larni tekshiramiz)
  // Agar '~/api/auth' va '~/store/auth' fayllaringizda default export bo'lmasa, {} ishlatiladi
  import { useAuthStore } from '~/store/auth';
  import { authRepository } from '~/api/auth';

  const { login } = authRepository();
  const authStore = useAuthStore();

  const form = reactive({
    username: '', // DummyJSON uchun test: 'emilys'
    password: '', // DummyJSON uchun test: 'emilyspass'
  });

  const loading = ref(false);

  const handleLogin = async () => {
    if (loading.value) return;

    loading.value = true;
    try {
      const data = await login(form);

      // Store-ga saqlash
      authStore.setAuth(data);
      console.log(data);
      // 3. navigateTo ni await bilan ishlatish (va return qilish)
      return await navigateTo('/');
    } catch (err: any) {
      console.error('Login Error:', err);
      alert('Login yoki parol xato! (Test uchun: emilys / emilyspass)');
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
