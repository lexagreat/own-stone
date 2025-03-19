<template>
   <yandex-map :settings="{
      location: {
         center: center,
         zoom: 14,
         duration: 2500,
      },
      behaviors: enabledBehaviors,
      mapsRenderWaitDuration: 5000, // Increase timeout duration (default is 2000ms)

   }">
      <yandex-map-listener :settings="{ onWheel: onUpdate }" />
      <yandex-map-default-scheme-layer :settings="{ theme: 'light' }" />

      <yandex-map-default-features-layer />


      <yandex-map-marker position="top-center left-center" v-if="JSON.parse(projectMarker?.coords)"
         :settings="{ coordinates: JSON.parse(projectMarker?.coords) }" @click="toggleBalloon(index)">

         <div v-if="activeMarker === index && projectMarker.title?.length" class="balloon project">
            {{ projectMarker.title }}
         </div>
         <div class="circle pin project" v-else>
            <component :is="projectMarker.icon" />
         </div>

      </yandex-map-marker>


      <!-- Кластеризатор с дополнительными настройками -->
      <yandex-map-clusterer :settings="{

      }">
         <template v-for="(item, index) in info" :key="index">
            <yandex-map-marker position="top-center left-center" v-if="JSON.parse(item?.coords) && item?.id"
               :settings="{ coordinates: JSON.parse(item?.coords) }" @click="toggleBalloon(index)">

               <div v-if="activeMarker === index && item.title?.length" class="balloon" :class="{ project: !item?.id }">
                  {{ item.title }}
               </div>
               <div class="circle pin" :class="{ project: !item?.id }" v-else>
                  <component :is="item.icon" />
               </div>

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
   YandexMapClusterer,
   YandexMapListener
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
const projectMarker = computed(() => {
   return props.info.find(item => !item.id)
})
const enabledBehaviors = ref(['drag', 'pinchZoom', 'dblClick']);
</script>


<style lang="scss" scoped>
.pin {
   cursor: pointer;
   --size: 48px;
   background-color: #181818;

   &.project {
      background-color: unset;


   }
}

.balloon {
   position: absolute;
   background: #181818;
   color: white;
   padding: 10px;
   border-radius: 4px;
   cursor: pointer;
   width: fit-content;
   top: 0;
   left: 0;
   translate: -50% -50%;

   &.project {
      background: #4F0014;

      &::after {
         background-color: #4F0014;

      }
   }

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
   translate: -50% -50%;
}
</style>