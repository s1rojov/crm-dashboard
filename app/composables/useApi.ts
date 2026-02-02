export const useApi = (url: string, opts?: any) => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();
  const accessToken = useCookie('access_token');
  const refreshToken = useCookie('refresh_token');

  return $fetch(url, {
    baseURL: config.public.apiBase,
    ...opts,

    async onRequest({ options }) {
      if (accessToken.value) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${accessToken.value}`,
        };
      }
    },

    async onResponseError({ response, options }) {
      if (response.status === 401 && refreshToken.value) {
        try {
          const data = await $fetch<{ accessToken: string }>(
            `${config.public.apiBase}/auth/refresh`,
            {
              method: 'POST',
              body: {
                refreshToken: refreshToken.value,
                expiresInMins: 30,
              },
            },
          );
          accessToken.value = data.accessToken;
          options.headers = {
            ...options.headers,
            Authorization: `Bearer ${data.accessToken}`,
          };

          return $fetch(url, options);
        } catch (refreshError) {
          authStore.logout();
        }
      }
    },
  });
};
