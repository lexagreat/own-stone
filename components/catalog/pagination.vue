<template>
   <div class="catalog-pagination">
      <div class="container">
         <div class="catalog-pagination__wrapper">
            <UiButton v-if="pages > 1 && currentPage !== pages" class="white" @click="showMore">Показать еще</UiButton>
            <ul class="catalog-pagination__list">
               <li>
                  <button :class="{ active: canMakeLessPage }" @click="minusPage" class="catalog-pagination__prev">
                     <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                        <path d="M10.5 13L5.5 8L10.5 3" stroke="black" stroke-opacity="0.2" stroke-width="1.33333"
                           stroke-linecap="square" stroke-linejoin="round" />
                     </svg>
                  </button>
               </li>
               <li v-for="page in filteredPages" :key="page">
                  <button @click="setPage(page)" :class="{ active: page == currentPage }">
                     {{ page }}
                  </button>
               </li>
               <li>
                  <button :class="{ active: canMakeMorePage }" @click="plusPage" class="catalog-pagination__next">
                     <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                        <path d="M6.5 3L11.5 8L6.5 13" stroke="black" stroke-width="1.33333" stroke-linecap="square"
                           stroke-linejoin="round" />
                     </svg>
                  </button>
               </li>
            </ul>
         </div>
      </div>
   </div>
</template>
<script setup>
const props = defineProps({
   pages: Number
})
const emit = defineEmits(['showMore'])
const currentPage = defineModel()
// const currentPage = ref(1)


const minusPage = () => {
   if (canMakeLessPage.value) {
      currentPage.value--
   }
}
const plusPage = () => {
   if (canMakeMorePage.value) {
      currentPage.value++

   }
}
const setPage = (page) => {
   if (Number(page)) {
      currentPage.value = page
   }
}
const canMakeLessPage = computed(() => {
   return currentPage.value > 1
})
const canMakeMorePage = computed(() => {
   return currentPage.value !== props.pages
})



const filteredPages = computed(() => {
   let array = []
   for (let i = 1; i <= props.pages; i++) {
      array.push(i);
   }
   if (array.length <= 6) {
      return array
   } else {
      if (currentPage.value == 1) {
         return [currentPage.value, currentPage.value + 1, currentPage.value + 2, currentPage.value + 3, '...', array.length]
      } else if (array.length - 5 < currentPage.value) {
         return [array.length - 5, array.length - 4, array.length - 3, array.length - 2, array.length - 1, array.length]
      } else {
         return [currentPage.value - 1, currentPage.value, currentPage.value + 1, currentPage.value + 2, '...', array.length]
      }
   }
})


const showMore = () => {
   emit('showMore')
}


</script>