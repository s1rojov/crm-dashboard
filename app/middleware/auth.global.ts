import { useAuthStore } from '~/store/auth';

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  // Token ni store yoki cookie-dan olamiz
  const accessToken = authStore.accessToken;
  // 1. Agar foydalanuvchi tizimga kirmagan bo'lsa va Login sahifasida bo'lmasa
  if (!accessToken && to.path !== '/login') {
    return navigateTo('/login');
  }

  // 2. Agar foydalanuvchi tizimga kirgan bo'lsa va Login sahifasiga kirmoqchi bo'lsa
  if (accessToken && to.path === '/login') {
    return navigateTo('/');
  }
});
