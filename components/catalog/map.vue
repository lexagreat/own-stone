<template>
   <div class="catalog-map__wrapper">
      <yandex-map ref="map" class="catalog-map" v-if="products?.length" :settings="{
         location: {
            center: parseCoords(products[0]) || [37.6173, 55.7558], // Москва по умолчанию
            zoom: 9,
            duration: 2500
         },
         mapsRenderWaitDuration: 5000
      }">
         <yandex-map-default-scheme-layer :settings="{ theme: 'dark' }" />
         <yandex-map-default-features-layer />

         <!-- Кластеризатор с дополнительными настройками -->
         <yandex-map-clusterer :settings="{

         }">
            <template v-for="(item, index) in products" :key="index">
               <yandex-map-marker v-if="parseCoords(item)" :settings="{ coordinates: parseCoords(item) }">
                  <div class="marker circle" @click="onMarkerClick(index)">
                     {{ item.count || 1 }}
                  </div>
               </yandex-map-marker>
            </template>
            <template #cluster="{ length, clusterer, coordinates }">
               <div class="cluster">
                  <div class="marker circle" @click="onClusterClick({ length, clusterer, coordinates })">
                     {{ length }}
                  </div>
               </div>
            </template>
         </yandex-map-clusterer>

         <yandex-map-controls :settings="{ position: 'right' }">
            <yandex-map-zoom-control />
         </yandex-map-controls>
      </yandex-map>
      <CatalogListsMap :products="currentProducts" :category="category" @openForm="onForm"
         @close="currentProducts = []" />
   </div>
</template>

<script setup>
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
   searchUrl: String,
   category: Number
});
const products = ref([])
const getProducts = async () => {
   let base = "catalog";
   const { data } = await useBaseFetch(base + props.searchUrl + `&pagination[pageSize]=10000`);
   // console.log('SEARCH CATALOG MAP', data);
   products.value = data;
   // if (!data?.length) {
   //    products.value = [];
   //    return;
   // }
   // if (data[0]?.coords) {
   //    products.value = data;
   //    return
   // }
   // products.value = [...new Set(data.map(item => item.proekty))];
}
watch(() => props.searchUrl, async () => {
   await getProducts()
}, {
   immediate: true
})
const currentProducts = ref([])

// Функция парсинга координат
const parseCoords = (item) => {
   let coords;
   if (!item?.coords && !item?.proekty) return null;

   if (item?.proekty) {
      coords = item?.proekty.coords;
   } else {
      coords = item?.coords;
   }
   try {
      return typeof coords === "string" ? JSON.parse(coords) : coords;
   } catch (error) {
      console.error("Ошибка парсинга координат:", coords);
      return null;
   }
};


const onMarkerClick = (index) => {
   currentProducts.value = [products.value[index]]
   // console.log('Элементы в маркере:', currentProducts.value);

}
const onClusterClick = ({ length, clusterer, coordinates }) => {
   // Получаем все маркеры внутри кластера через `clusterer.getChildren()`
   const clusterMarkers = clusterer ? clusterer.features : [];

   // Извлекаем координаты всех маркеров в кластере
   const clusterCoords = clusterMarkers.map(marker => marker.geometry.coordinates);

   // Фильтруем продукты, координаты которых совпадают с координатами маркеров в кластере
   const itemsInCluster = products.value.filter(product => {
      const productCoords = parseCoords(product);
      return productCoords && clusterCoords.some(coords =>
         coords[0] === productCoords[0] && coords[1] === productCoords[1]
      );
   });

   currentProducts.value = itemsInCluster
   // console.log('Элементы в кластере:', currentProducts.value);
}

const emit = defineEmits(['openForm'])

const onForm = (id) => {
   emit('openForm', id)
}
</script>

<style scoped>
.pin {
   cursor: pointer;
}

.catalog-map__wrapper {
   position: relative;
   overflow: hidden;
   margin-bottom: 160px;
   height: fit-content;

   @media(max-width: 1024px) {
      margin-bottom: 80px;
      overflow: unset;
   }
}

.catalog-map {
   border-radius: 8px;
   overflow: hidden;
   height: 640px !important;
   width: 100% !important;

   @media(max-width: 1024px) {

      margin-left: -20px;
      margin-right: -20px;
      width: 100vw !important;
      border-radius: 0 !important;
   }

   @media(max-width: 568px) {
      margin-left: -12px;
      margin-right: -12px;
   }
}

.marker {
   cursor: pointer;
   width: 40px;
   height: 40px;
   background-color: black;
   color: white;
   display: flex;
   justify-content: center;
   align-items: center;
   border-radius: 5px;
}
</style>