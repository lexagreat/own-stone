<template>
   <ul class="catalog-page__column" :class="{ 'catalog-page__column_project': category == 0 }">
      <li v-for="item in 8">
         <CatalogCardsObjectInColumn @click="emit('openForm')" v-if="category == 1" />
         <CatalogCardsProject type="row" v-else />
      </li>
   </ul>
</template>
<script setup>
const props = defineProps({
   category: Number
})
const emit = defineEmits(['openForm'])
</script>