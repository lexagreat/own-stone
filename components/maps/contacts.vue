<template>
   <yandex-map v-if="info?.length" :settings="{
      location: {
         center: JSON.parse(info[0]?.coords),
         zoom: 9,
         duration: 2500
      },
      mapsRenderWaitDuration: 5000 // Increase timeout duration (default is 2000ms)
   }">
      <yandex-map-default-scheme-layer :settings="{ theme: 'dark' }" />

      <yandex-map-default-features-layer />


      <yandex-map-marker position="top-center left-center" :settings="{ coordinates: JSON.parse(info[0]?.coords) }">
         <img alt="" class="pin" src="/map-marker.svg" style="width: 60px;">
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
const props = defineProps({
   info: Array
})



</script>
