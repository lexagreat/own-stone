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


      <yandex-map-marker position="top-center left-center" :settings="{ coordinates: [37.598672, 55.745838] }">
         <img alt="" class="pin" src="/fav.svg" style="width: 30px;">
      </yandex-map-marker>


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
   YandexMapDefaultMarker,
   YandexMapMarker
} from "vue-yandex-maps";
let markerIcon = {
   layout: 'default#image',
   imageHref: 'https://own-admin.okttastudio.ru/uploads/parallax_f885095265.png',
   imageSize: [30, 30],
   imageOffset: [-15, -15],
}
</script>
