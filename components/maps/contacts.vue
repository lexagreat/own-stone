<template>
   <yandex-map :settings="{
      location: {
         center: [55.745838, 37.598672],
         zoom: 9,
         duration: 2500
      }
   }">
      <yandex-map-default-scheme-layer :settings="{ theme: 'dark' }" />

      <!-- Маркер -->
      <yandex-map-marker :settings="{
         coordinates: [55.745838, 37.598672],
         icon: {
            layout: 'default#image',
            imageHref: '/fav.svg', // URL иконки
            imageSize: [40, 40], // Размер иконки
            imageOffset: [-20, -40] // Смещение, чтобы центрировать
         }
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
   YandexMapZoomControl,
   YandexMapMarker
} from "vue-yandex-maps";
</script>
