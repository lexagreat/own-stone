<template>
   <yandex-map :settings="{
      location: {
         center: [37.598672, 55.745838],
         zoom: 9,
         duration: 2500
      }
   }">
      <yandex-map-default-scheme-layer :settings="{ theme: 'dark' }" />
      <yandex-map-default-features-layer />

      <!-- 🔹 Дефолтный маркер -->
      <yandex-map-placemark :settings="{
         coordinates: [37.598672, 55.745838]
      }" />

      <!-- 🔹 Маркер с кастомной иконкой -->
      <yandex-map-placemark :settings="{
         coordinates: [37.598672, 55.745838],
         properties: {
            hintContent: 'Кастомный маркер',
            balloonContent: 'Это мой маркер'
         },
         options: {
            iconLayout: 'default#image',
            iconImageHref: '/fav.svg', // Путь к иконке
            iconImageSize: [40, 40],
            iconImageOffset: [-20, -40]
         }
      }" />

      <yandex-map-controls :settings="{ position: 'right' }">
         <yandex-map-zoom-control />
      </yandex-map-controls>
   </yandex-map>

</template>

<script setup>
import {
   YandexMap,
   YandexMapControls,
   YandexMapDefaultSchemeLayer,
   YandexMapDefaultFeaturesLayer,
   YandexMapZoomControl,
} from "vue-yandex-maps";
</script>
