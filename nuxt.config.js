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
         script: [
            {
               src: "https://maps.api.2gis.ru/2.0/loader.js?pkg=full",
            },
            // {
            //    src: "https://mapgl.2gis.com/api/js/v1",
            // },
         ],
      },
   },
   modules: ["nuxt-swiper", "@pinia/nuxt", "vue-yandex-maps/nuxt"],
   yandexMaps: {
      apikey: "bd41a6a2-c519-457e-9050-57a1ca739237",
      lang: "ru_RU",
      version: "2.1",
      coordorder: "longlat", // 🛠 Важно для корректного порядка координат
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
   },
   nitro: {
      // оптимизация
      compressPublicAssets: true, // Включить сжатие
   },
});
