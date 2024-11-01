<template>
   <section class="selection-section">
      <div class="container">
         <div class="selection-section__wrapper">
            <div class="selection-section__header h1">
               <h2 class="selection-section__title">подобрать недвижимость </h2>
               <span class="selection-section__count">3 100 объектов </span>
            </div>
            <div class="selection-section__main">
               <CatalogFilters :isOpenModal="isOpenModal" @closeModal="isOpenModal = false" />
            </div>
            <div class="catalog-filters__controls">
               <UiButton class="black" @click="isOpenModal = true">
                  <filterIcon />
                  Параметры
               </UiButton>
               <UiButton class="white map">
                  <img src="@/assets/img/icons/btn-map.png" alt="">
                  <span>На карте</span>
               </UiButton>
            </div>
         </div>
      </div>
   </section>
</template>
<script setup>
import filterIcon from '@/assets/img/icons/filter.svg'
const isOpenModal = ref(false)
</script>