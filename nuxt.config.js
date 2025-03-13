// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from "vite-svg-loader"; // Импортируем svgLoader
export default defineNuxtConfig({
   devtools: { enabled: true },
   app: {
      head: {
         link: [
            {
               rel: "icon",
               href: "/fav.svg",
               type: "image/x-icon",
            },
            {
               rel: "apple-touch-icon",
               href: "/fav.svg",
            },
         ],
         meta: [
            {
               name: "viewport",
               content: "width=device-width, initial-scale=1.0",
            },
            {
               name: "format-detection",
               content: "telephone=no",
            },
         ],
         script: [],
      },
   },
   modules: ["nuxt-swiper", "@pinia/nuxt", "vue-yandex-maps/nuxt"],
   yandexMaps: {
      apikey: "bd41a6a2-c519-457e-9050-57a1ca739237",
      lang: "ru_RU",
   },
   vite: {
      plugins: [
         svgLoader(), // Добавляем плагин для работы с SVG как с Vue компонентами
      ],
   },
   runtimeConfig: {
      public: {
         baseURL:
            process.env.BASE_URL || "https://own-admin.okttastudio.ru/api",
      },
   },
   experimental: {
      typedPages: true,
      payloadExtraction: true, // Уменьшает объём передаваемых данных // оптимизация
   },
   routeRules: {
      "/catalog": { redirect: "/catalog/build" },
   },
   build: {
      // оптимизация
      splitChunks: {
         layouts: true,
         pages: true,
         commons: true,
      },
      transpile: ["@fancyapps/ui"],
   },
   nitro: {
      // оптимизация
      compressPublicAssets: true, // Включить сжатие
   },
});
