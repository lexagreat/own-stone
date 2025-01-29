<template>
   <yandex-map real-settings-location :settings="{
      location: {
         center: [37.598672, 55.745838],
         zoom: 9,
         duration: 2500
      }
   }">
      <yandex-map-default-scheme-layer :settings="{ theme: 'dark' }" />

      <!-- 🔹 Добавляем слой для объектов карты -->
      <yandex-map-default-features-layer />

      <!-- Маркер -->
      <yandex-map-marker :settings="{
         coordinates: [37.598672, 55.745838],
         icon: {
            layout: 'default#image',
            imageHref: '/fav.svg', // URL иконки
            imageSize: [40, 40], // Размер иконки
            imageOffset: [-20, -40] // Смещение
         }
      }" />
      <yandex-map-placemark :settings="{
         coordinates: [37.598672, 55.745838]
      }" />

      <yandex-map-controls :settings="{ position: 'right' }">
         <yandex-map-zoom-control />
      </yandex-map-controls>
   </yandex-map>
</template>

<script setup>
import {
   VueYandexMaps,
   YandexMap,
   YandexMapControls,
   YandexMapDefaultSchemeLayer,
   YandexMapDefaultFeaturesLayer, // 🔹 Импортируем слой объектов
   YandexMapZoomControl,
   YandexMapMarker
} from "vue-yandex-maps";
</script>
