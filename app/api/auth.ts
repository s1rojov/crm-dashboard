export const authRepository = () => {
  const config = useRuntimeConfig();

  return {
    async login(credentials: Record<string, string>) {
      return await $fetch<User>('https://dummyjson.com/auth/login', {
        method: 'POST',
        body: credentials,
      });
    },
    async getCurrentUser(accessToken: string) {
      return await $fetch<User>('https://dummyjson.com/auth/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    },
  };
};
