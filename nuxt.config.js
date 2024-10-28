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
      },
   },
   modules: ["nuxt-swiper"],
   vite: {
      plugins: [
         svgLoader(), // Добавляем плагин для работы с SVG как с Vue компонентами
      ],
   },
});
