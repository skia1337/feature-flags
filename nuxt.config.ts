export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],

  typescript: {
    strict: true,
  },

  nitro: {
    preset: "vercel-edge",
  },

  runtimeConfig: {
    public: {
      isProduction: true,
      posthogPublicKey: process.env.POSTHOG_PUBLIC_KEY,
      posthogHost: process.env.POSTHOG_HOST || "https://us.i.posthog.com",
    },
  },

  compatibilityDate: "2025-03-22",
});
