<template>
   <ul class="catalog-page__column" :class="{ 'catalog-page__column_project': category == 0 }">
      <li v-for="item in 8">
         <CatalogCardsObjectInColumn v-if="category == 1" />
         <CatalogCardsProject type="row" v-else />
      </li>
   </ul>
</template>
<script setup>
const props = defineProps({
   category: Number
})
</script>