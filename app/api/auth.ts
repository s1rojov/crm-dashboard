export const authRepository = () => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBase;

  return {
    async login(credentials: Record<string, string>) {
      return await $fetch<User>(`${baseUrl}/auth/login`, {
        method: 'POST',
        body: credentials,
      });
    },
    async getCurrentUser(accessToken: string) {
      return await $fetch<User>(`${baseUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    },
  };
};
