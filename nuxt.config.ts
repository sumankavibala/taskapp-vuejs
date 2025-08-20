// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
        // Private variables, only available server-side
    NUXT_TASK_PROXY_URL: process.env.NUXT_TASK_PROXY_URL,

    // Public variables, available both client and server
    public: {
      NUXT_PUBLIC_API_URL: process.env.NUXT_PUBLIC_API_URL
    }
  },
  nitro: {
    experimental: {
      noVueServer: true
    }
  }
})
