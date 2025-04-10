<template>
   <main class="main dark-page">
      <SectionsBreadcrumbs :path="path" />
      <section class="favorite-page">
         <div class="container">
            <div class="favorite-page__wrapper">
               <div class="favorite-page__header">
                  <h1 class="favorite-page__title h1 dark-title">избранное</h1>
                  <ul class="favorite-page__types catalog-filters__radios">
                     <li v-for="(item, index) in types" :key="index">
                        <input v-model="type" type="radio" :value="item.value" :id="'catalogRadio' + item.value"
                           name="catalogRadio">
                        <label :for="'catalogRadio' + item.value">
                           <component :is="item.icon" />
                           <span>{{ item.name }}</span>
                           <span style="color: #18181880;">{{ counts[index] }}</span>
                        </label>
                     </li>
                  </ul>
               </div>
               <div class="favorite-page__main">
                  <ul class="favorite-page__categories catalog-filter__categories" v-if="type !== 1">
                     <li v-for="(item, index) in categories" :key="index">
                        <input v-model="category" type="radio" :value="item.value"
                           :id="'catalogFilterType' + item.value" name="catalogFilterType">
                        <label :for="'catalogFilterType' + item.value">
                           <span>{{ item.name }}</span>
                           <span>{{ catsCounts[index] }}</span>

                        </label>
                     </li>
                  </ul>
                  <div class="favrotite-page__products">
                     <CatalogListsGrid :products="products" @openForm="onOpenForm" :category="category" />

                  </div>
                  <ModalObjectForm :isOpen="isOpenFormModal" @closePopup="isOpenFormModal = false"
                     :id="currentProductForModal" />
               </div>
            </div>
         </div>
      </section>
   </main>
</template>
<script setup>
import { useFavorites } from '~/store/favorites';
import { useRecently } from '~/store/recently';
const recentlyStore = useRecently()
const favorites = useFavorites()
const path = ref([
   {
      name: "Главная",
      to: "/"
   },
   {
      name: "Избранное",
      to: ""
   },
])
const isOpenFormModal = ref(false)
const currentProductForModal = ref('')
const onOpenForm = (id) => {
   currentProductForModal.value = id;
   isOpenFormModal.value = true
}
const categories = ref([
   {
      name: "Проекты",
      value: 0,
   },
   {
      name: "Квартиры",
      value: 1,
   },
])
const category = ref(0)



const buildLength = computed(() => {
   return favorites.build.apartaments.length + favorites.build.projects.length
})
const secLength = computed(() => {
   return favorites.secondary.length
})
const commerceLength = computed(() => {
   return favorites.commerce.apartaments.length + favorites.commerce.projects.length
})
const counts = ref([
   buildLength, secLength, commerceLength
])

const types = ref([
   {
      name: 'Новостройки',
      value: 0,
      icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/new-buildings.svg'))),
   },
   {
      name: 'Вторичная',
      value: 1,
      icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/secondary-housing.svg'))),
   },
   {
      name: 'Коммерция ',
      value: 2,
      icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/commercial.svg'))),
   },
])
const type = ref(0)

watch(type, (value) => {
   if (value == 1) {
      category.value = 2
   } else {
      category.value = 0

   }
})


const catsCounts = computed(() => {
   let arr = [0, 0]
   if (type.value == 0) {
      arr = [favorites.build.projects.length, favorites.build.apartaments.length]
   } else if (type.value == 2) {
      arr = [favorites.commerce.projects.length, favorites.commerce.apartaments.length]
   }
   return arr;
})

const products = computed(() => {
   let arr = []
   if (type.value == 0) {
      if (category.value) {
         arr = favorites.build.apartaments
      } else {
         arr = favorites.build.projects
      }
   } else if (type.value == 2) {
      if (category.value) {
         arr = favorites.commerce.apartaments
      } else {
         arr = favorites.commerce.projects
      }
   } else if (type.value == 1) {
      arr = favorites.secondary
   }
   return arr
})

useHead({
   title: 'Избранное'
})
// onMounted(() => {
//    recentlyStore.add(route.params.slug)
// })
</script>



<style lang="scss" scoped>
.catalog-filter__categories {
   label {
      display: flex;
      gap: 10px;

      span:last-child {
         color: #18181880;
      }
   }

   input:checked+label {
      span:last-child {
         color: #FFFFFF80;
      }
   }
}
</style>