<template>
   <ul class="catalog-page__list">
      <li v-for="item in products">
         <CatalogCardsObject :product="item" @click="emit('openForm')" v-if="category == 1" />
         <CatalogCardsProject :product="item" v-else />
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