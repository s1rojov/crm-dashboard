// nuxt.config.ts
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  pinia: {
    storesDirs: ['./app/store/**'],
  },

  devtools: { enabled: true },
});
