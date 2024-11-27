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
                        </label>
                     </li>
                  </ul>
               </div>
               <div class="favorite-page__main">
                  <ul class="favorite-page__categories catalog-filter__categories" v-if="type !== 1">
                     <li v-for="(item, index) in categories" :key="index">
                        <input v-model="category" type="radio" :value="item.value"
                           :id="'catalogFilterType' + item.value" name="catalogFilterType">
                        <label :for="'catalogFilterType' + item.value">{{ item.name }}</label>
                     </li>
                  </ul>
                  <div class="favrotite-page__products">
                     <CatalogListsGrid :category="category" />
                     <CatalogListsGrid :category="category" />
                  </div>
               </div>
            </div>
         </div>
      </section>
   </main>
</template>
<script setup>
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

const categories = ref([
   {
      name: "Проекты",
      value: 0
   },
   {
      name: "Квартиры",
      value: 1
   },
])
const category = ref(0)


const types = ref([
   {
      name: 'Новостройки',
      value: 0,
      count: 10,
      icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/new-buildings.svg'))),
   },
   {
      name: 'Вторичная',
      value: 1,
      count: 10,
      icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/secondary-housing.svg'))),
   },
   {
      name: 'Коммерция ',
      value: 2,
      count: 10,
      icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/commercial.svg'))),
   },
])
const type = ref(0)

watch(type, (value) => {
   if (value == 1) {
      category.value = 0
   }
})
</script>