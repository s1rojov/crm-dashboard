import { useAuthStore } from '~/store/auth';

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const accessToken = authStore.accessToken;
  const token = useCookie('access_token');
  if (!token.value && to.path !== '/login') {
    return navigateTo('/login');
  }

  if (token.value && to.path === '/login') {
    return navigateTo('/');
  }
});
