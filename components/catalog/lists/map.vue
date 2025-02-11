<template>
   <div class="catalog-map__list_wrapper" v-if="products?.length">
      <div class="catalog-map__header">
         <div class="h1 dark-title">
            {{ products.length }} {{ morph(products.length, ['проект', 'проекта', 'проектов']) }} <span>на карте</span>
         </div>
         <UiModalCloseBtn @click="emit('close')" />
      </div>
      <ul class="catalog-map__list">
         <li v-for="item in products" :key="item">
            <CatalogCardsObject :product="item" @onForm="onForm" v-if="category == 1" />
            <CatalogCardsProject :product="item" v-else-if="category == 0 && !item?.proekty" />
            <CatalogCardsProjectApart :product="item" v-else-if="category == 2" />
         </li>
      </ul>
   </div>
</template>
<script setup>
const props = defineProps({
   category: [Number, String], // Массив, а не логическое выражение
   products: Array
})
const emit = defineEmits(['openForm', 'close'])

const onForm = (id) => {
   emit('openForm', id)
}
</script>




<style lang="scss">
.catalog-map__header {
   .h1 {
      display: none;
   }

   .modal__close {
      top: 10px;
      left: 100%;
      right: unset;
      translate: 10px 0;
      background-color: #181818 !important;
      --size: 40px;

      svg path {
         fill: white;
      }
   }

   @media(max-width: 1024px) {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .modal__close {
         position: relative !important;
         top: unset !important;
         right: unset !important;
         left: unset !important;
         bottom: unset !important;
         translate: unset !important;
      }

      .h1 {
         display: inline;
      }
   }
}

.catalog-map__list {
   background-color: #f1f1f1;
   display: flex;
   flex-direction: column;
   align-items: center;
   padding: 15px;
   gap: 15px;
   height: 100%;
   overflow: auto;

   @media(max-width: 1024px) {
      background-color: #F8F8F8;
      padding: 0;

   }

   &>li {
      height: 100%;

      .catalog-card {
         height: 100%;
      }
   }

   @media(max-width: 1024px) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 10px;
      row-gap: 30px;
   }

   @media(max-width: 568px) {
      display: grid;
      grid-template-columns: 1fr;
      gap: 12px;
   }

   &_wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: fit-content;
      bottom: 0;


      @media(max-width: 1024px) {
         padding: 30px 20px;
         display: flex;
         flex-direction: column;
         gap: 30px;
         background-color: #F8F8F8;
         position: fixed;
         z-index: 125;
         top: 0;
         left: 0;
         width: 100vw;
         height: 100dvh;
      }
   }
}
</style>