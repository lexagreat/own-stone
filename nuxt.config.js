// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from "vite-svg-loader"; // Импортируем svgLoader
export default defineNuxtConfig({
   devtools: { enabled: true },
   app: {
      head: {
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
         ],
      },
   },
   modules: ["nuxt-swiper", "@nuxt/image-edge"],
   vite: {
      plugins: [
         svgLoader(), // Добавляем плагин для работы с SVG как с Vue компонентами
      ],
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
      compressPublicAssets: true, // Включить сжатие
   },
   image: {
      // оптимизация
      // domains: ['example.com'], // Укажите домены для внешних изображений
      presets: {
         thumbnail: {
            modifiers: {
               format: "webp",
               quality: 90,
            },
         },
      },
   },
});
