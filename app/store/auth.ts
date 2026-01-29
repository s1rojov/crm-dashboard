import { defineStore } from 'pinia';
import type { User } from '~/types/auth';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const accessToken = ref<string>('');
  const refreshToken = ref<string>('');

  const isAuthenticated = computed(() => !!accessToken.value);

  const setAuth = (newUser: User) => {
    user.value = newUser;
    if (newUser.accessToken) accessToken.value = newUser.accessToken;
    if (newUser.refreshToken) refreshToken.value = newUser.refreshToken;
  };

  const logout = () => {
    user.value = null;
    accessToken.value = null;
    refreshToken.value = null;
    navigateTo('/login');
  };

  return { user, refreshToken, accessToken, isAuthenticated, setAuth, logout };
});
