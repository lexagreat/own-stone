<template>
   <yandex-map ref="map" class="catalog-map" v-if="products?.length" :settings="{
      location: {
         center: parseCoords(products[0]?.coords) || [37.6173, 55.7558], // Москва по умолчанию
         zoom: 9,
         duration: 2500
      },
      mapsRenderWaitDuration: 5000
   }">
      <yandex-map-default-scheme-layer :settings="{ theme: 'dark' }" />
      <yandex-map-default-features-layer />

      <!-- <template v-for="(item, index) in products" :key="index">
         <yandex-map-marker v-if="item.coords && parseCoords(item.coords)" position="top-center left-center"
            :settings="{ coordinates: parseCoords(item.coords) }" @click="toggleBalloon(index)">
            <img alt="" class="pin" src="/map-marker.svg" style="width: 60px;">
         </yandex-map-marker>
      </template> -->
      <yandex-map-clusterer :settings="{
         gridSize: 64,
         clusterDisableClickZoom: false
      }">
         <template v-for="(item, index) in products" :key="index">
            <yandex-map-marker v-if="item.coords && parseCoords(item.coords)"
               :settings="{ coordinates: parseCoords(item.coords) }" @click="toggleBalloon(index)">
               <div class="marker">
                  {{ item.count || 1 }}
               </div>
            </yandex-map-marker>
         </template>
      </yandex-map-clusterer>

      <yandex-map-controls :settings="{ position: 'right' }">
         <yandex-map-zoom-control />
      </yandex-map-controls>
   </yandex-map>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
   YandexMap,
   YandexMapControls,
   YandexMapDefaultSchemeLayer,
   YandexMapDefaultFeaturesLayer,
   YandexMapZoomControl,
   YandexMapMarker,
   YandexMapClusterer
} from "vue-yandex-maps";

const props = defineProps({
   products: Array
});

// Функция парсинга координат
const parseCoords = (coords) => {
   if (!coords) return null;
   try {
      return typeof coords === "string" ? JSON.parse(coords) : coords;
   } catch (error) {
      console.error("Ошибка парсинга координат:", coords);
      return null;
   }
};

// Проверка данных при загрузке
onMounted(() => {
   console.log("products:", props.products.map(item => item.coords));
});
</script>

<style scoped>
.pin {
   cursor: pointer;
}

.catalog-map {
   height: 640px !important;
   width: 100% !important;
   margin-bottom: 160px;

   @media(max-width: 1024px) {
      margin-bottom: 80px;
   }
}

.marker {
   width: 40px;
   height: 40px;
   background-color: black;
   color: white;
   display: flex;
   justify-content: center;
   align-items: center;
   border-radius: 50%;
   font-weight: bold;
   font-size: 14px;
   cursor: pointer;
}
</style>