<template>
   <yandex-map ref="map" v-if="info?.contacts_map_coords?.length" :settings="{
      location: {
         center: JSON.parse(info?.contacts_map_coords[0]?.coords),
         zoom: 17,
         duration: 2500
      },
      behaviors: enabledBehaviors,

      mapsRenderWaitDuration: 5000 // Increase timeout duration (default is 2000ms)
   }">
      <yandex-map-default-scheme-layer :settings="{ theme: 'light' }" />

      <yandex-map-default-features-layer />


      <!-- <yandex-map-marker position="top-center left-center" :settings="{ coordinates: JSON.parse(info[0]?.coords) }">
         <img alt="" class="pin" src="/map-marker.svg" style="width: 60px;">

      </yandex-map-marker> -->


      <template v-for="(item, index) in info?.contacts_map_coords" :key="index">
         <yandex-map-marker position="top-center left-center" :settings="{ coordinates: JSON.parse(item.coords) }"
            @click="toggleBalloon(index)">

            <div v-if="activeMarker === index" class="balloon" :style="getBalloonStyle(JSON.parse(item.coords))">
               {{ info?.address_string }}
            </div>
            <img alt="" class="pin" src="/map-marker.svg" style="width: 60px; height: 72px;" v-else>
         </yandex-map-marker>
      </template>


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
   info: Object
})

// Отслеживание активного маркера
const activeMarker = ref(null);

// Открытие/закрытие балуна
const toggleBalloon = (index) => {
   activeMarker.value = activeMarker.value === index ? null : index;
};

// Определяем стиль балуна (можно улучшить)
const getBalloonStyle = (coords) => {
   return {
      // left: `${coords[0]}px`,
      // top: `${coords[1]}px`,

   };
};

const enabledBehaviors = ref(['drag', 'pinchZoom', 'dblClick']);

</script>


<style lang="scss">
.pin {
   cursor: pointer;
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
</style>