<template>
   <ul class="catalog-page__list">
      <li v-for="item in 8">
         <CatalogCardsObject v-if="category == 1" />
         <CatalogCardsProject v-else />
      </li>
   </ul>
</template>
<script setup>
const props = defineProps({
   category: Number
})
</script>