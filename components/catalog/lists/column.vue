<template>
   <ul class="catalog-page__column" :class="{ 'catalog-page__column_project': category == 0 }">
      <li v-for="item in products" :key="item">
         <CatalogCardsObjectInColumn :product="item" @click="emit('openForm')" v-if="category == 1" />
         <CatalogCardsProject :product="item" type="row" v-else />
      </li>
   </ul>
</template>
<script setup>
const props = defineProps({
   category: Number || String,
   products: Array

})
const emit = defineEmits(['openForm'])
</script>