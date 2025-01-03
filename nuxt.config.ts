// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: [
    "~/assets/styles/main.scss",
    "@fortawesome/fontawesome-free/css/all.min.css",
  ],
  modules: ["@pinia/nuxt"],
  pinia: {
    // @ts-ignore
    autoImports: ["defineStore"],
  },
  routeRules: {
    "/*": {
      // @ts-ignore
      middleware: "auth",
    },

    "/**": { isr: false },
  },
});
