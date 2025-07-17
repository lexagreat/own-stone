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
               hid: "yandex-metrika",
               innerHTML: `
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(97044815, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true
          });
        `,
               type: "text/javascript",
               charset: "utf-8",
            },
         ],
         noscript: [
            {
               hid: "yandex-metrika-noscript",
               innerHTML: `<div><img src="https://mc.yandex.ru/watch/97044815" style="position:absolute; left:-9999px;" alt="" /></div>`,
            },
         ],
      },
   },

   modules: ["nuxt-swiper", "@pinia/nuxt", "vue-yandex-maps/nuxt"],
   yandexMaps: {
      apikey: "9b84c928-50ce-467d-9998-aeadb81193db",
      lang: "ru_RU",
   },
   vite: {
      plugins: [
         svgLoader(), // Добавляем плагин для работы с SVG как с Vue компонентами
      ],
   },
   runtimeConfig: {
      public: {
         baseURL: process.env.BASE_URL || "https://admin.ownstone.ru/api",
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
