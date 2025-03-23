export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],

  typescript: {
    strict: true
  },

  nitro: {
    preset: 'vercel-edge'
  },

  runtimeConfig: {
    public: {
      isProduction: true
    }
  },

  compatibilityDate: '2025-03-22'
})