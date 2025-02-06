<template>
   <ul class="catalog-page__list" v-if="products?.length">
      <li v-for="item in products" :key="item">
         <CatalogCardsObject :product="item" @onForm="onForm" v-if="category == 1" />
         <CatalogCardsProject :product="item" v-else-if="category == 0 && !item?.proekty" />
         <CatalogCardsProjectApart :product="item" v-else-if="category == 2" />
      </li>
   </ul>
</template>
<script setup>
const props = defineProps({
   category: [Number, String], // Массив, а не логическое выражение
   products: Array
})
const emit = defineEmits(['openForm'])

const onForm = (id) => {
   emit('openForm', id)
}
</script>