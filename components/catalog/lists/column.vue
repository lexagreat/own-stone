<template>
   <ul class="catalog-page__column" v-if="products?.length"
      :class="{ 'catalog-page__column_project': category == 0 || category == 2 }">
      <li v-for="item in products" :key="item">
         <CatalogCardsObjectInColumn :product="item" @click="emit('openForm', item.documentId)" v-if="category == 1" />
         <CatalogCardsProject :product="item" type="row" v-else-if="category == 0 && !item?.proekty" />
         <CatalogCardsProjectApart :product="item" type="row" v-else-if="category == 2" />
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