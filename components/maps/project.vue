<template>
   <yandex-map v-if="info[0]?.coords?.length" :settings="{
      location: {
         center: center,
         zoom: 9,
         duration: 2500
      },
      mapsRenderWaitDuration: 5000 // Increase timeout duration (default is 2000ms)
   }">
      <yandex-map-default-scheme-layer :settings="{ theme: 'dark' }" />

      <yandex-map-default-features-layer />


      <!-- Кластеризатор с дополнительными настройками -->
      <yandex-map-clusterer :settings="{

      }">
         <template v-for="(item, index) in info" :key="index">
            <yandex-map-marker position="top-center left-center" :settings="{ coordinates: JSON.parse(item?.coords) }"
               @click="toggleBalloon(index)">

               <!-- <div v-if="activeMarker === index" class="balloon">
               {{ info?.address_string }}
            </div> -->
               <div class="circle pin">
                  <component :is="item.icon" />
               </div>
               <!-- <img alt="" class="pin" src="/map-marker.svg" style="width: 60px; height: 72px;"> -->
            </yandex-map-marker>
         </template>

         <template #cluster="{ length, clusterer, coordinates }">
            <div class="cluster">
               <div class="marker circle">
                  {{ length }}
               </div>
            </div>
         </template>
      </yandex-map-clusterer>




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
   YandexMapMarker,
   YandexMapClusterer
} from "vue-yandex-maps";
const props = defineProps({
   info: Array,
   center: Array
})

// Отслеживание активного маркера
const activeMarker = ref(null);

// Открытие/закрытие балуна
const toggleBalloon = (index) => {
   activeMarker.value = activeMarker.value === index ? null : index;
};




</script>


<style lang="scss">
.pin {
   cursor: pointer;
   --size: 48px;
   background-color: #181818;

}

.balloon {
   position: absolute;
   background: #181818;
   color: white;
   padding: 10px;
   border-radius: 4px;
   cursor: pointer;
   width: 164px;
   top: 0;
   left: 0;
   translate: -50% -50%;

   &::after {
      content: "";
      display: block;
      clip-path: polygon(50% 100%, 0 0, 100% 0);
      width: 20px;
      aspect-ratio: 2;
      background-color: #181818;
      position: absolute;
      top: 98%;
      left: 50%;
      translate: -50% 0;
   }
}

.marker {
   cursor: pointer;
   width: 40px;
   height: 40px;
   background-color: #181818;
   color: white;
   display: flex;
   justify-content: center;
   align-items: center;
   border-radius: 50%;
}
</style>