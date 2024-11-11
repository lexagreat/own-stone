<template>
   <main class="main catalog">
      <section class="catalog-hero">
         <SectionsBreadcrumbs :path="path" />
         <div class="container">
            <h1 class="catalog-hero__title h1" v-html="pageStaticInfo.title"></h1>
         </div>
      </section>
      <section class="catalog-page__filters">
         <div class="container">
            <ul>
               <li v-for="item in types" :key="item.to">
                  <NuxtLink :to="item.to">{{ item.name }}</NuxtLink>
               </li>
            </ul>
            <CatalogFilters :type="type" from-catalog :isOpenModal="isFiltersOpen"
               @closeModal="isFiltersOpen = false" />
         </div>
      </section>
      <section class="catalog-page">
         <div class="container">
            <div class="catalog-page__wrapper">
               <div class="catalog-page__header">
                  <div class="catalog-page__sort">
                     <button class="circle mobile">
                        <IconSort />
                     </button>
                     <span>Сортировка</span>
                     <UiSelect :settings="sortSettings" @selectOption="onSelectSortOption" />
                  </div>
                  <UiButton class="white all-filters" @click="isFiltersOpen = true">
                     <IconFilter />
                     <span>Все фильтры</span>
                  </UiButton>
                  <div class="catalog-page__controls">
                     <ul class="catalog-page__views">
                        <li v-for="item in views" :key="item">
                           <input v-model="currentView" type="radio" name="catalogViews" :value="item.value"
                              :id="'catalogViews' + item.value">
                           <label class="circle" :for="'catalogViews' + item.value">
                              <component :is="item.icon" />
                           </label>
                        </li>
                     </ul>
                     <UiButton class="catalog-page__map white">
                        <IconGeo />
                        <span>На карте</span>
                     </UiButton>
                  </div>
               </div>
               <div class="catalog-page__main">
                  <ul class="catalog-page__list">
                     <li v-for="item in 8">
                        <CatalogCard />
                     </li>
                  </ul>
                  <BannersCatalogObject />
                  <ul class="catalog-page__list">
                     <li v-for="item in 8">
                        <CatalogCard />
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </section>
      <CatalogPagination />
      <SectionsProductSlider>
         Вы ранее <span>смотрели</span>
      </SectionsProductSlider>
      <SectionsProductSlider>
         Вам <span>подходит</span>
      </SectionsProductSlider>
   </main>
</template>
<script setup>
import IconFilter from '@/assets/img/icons/filter.svg'
import IconSort from '@/assets/img/icons/sort.svg'
import IconGeo from "@/assets/img/icons/geo.svg"
// Получаем параметр type из маршрута
const route = useRoute()
const type = route.params.type

let path = ref([
   {
      name: "Главная",
      to: "/"
   },
   {
      name: "Купить",
      to: "/catalog/" + type
   },
])

// Определяем заголовок страницы
const pageStaticInfo = {
   build: {
      title: "новостройки в москве <br> <span>бизнес и премиум-сегмент</span>",
   },
   secondary: {
      title: "Вторичная недвижимость <br><span>в москве</span>",

   },
   commerce: {
      title: "Коммерческая недвижимость <br><span>в москве</span>",
   }
}[type] || "404"
if (pageStaticInfo == '404') {
   throw createError({
      statusCode: 404,
      statusMessage: 'Page Not Found'
   })
}
const types = ref([
   {
      name: 'Новостройки',
      to: "/catalog/build"
      // icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/new-buildings.svg'))),
   },
   {
      name: 'Вторичная',
      to: "/catalog/secondary"
      // icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/secondary-housing.svg'))),
   },
   {
      name: 'Коммерция ',
      to: "/catalog/commerce"
      // icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/commercial.svg'))),
   },
])

const views = ref([
   {
      icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/card.svg'))),
      value: 'table'
   },
   {
      icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/list.svg'))),
      value: 'list'

   },
])
const currentView = ref("table")
const sortSettings = ref({
   options: [
      {
         name: "По рекомендации",
         value: 0,
         selected: true
      },
      {
         name: "Не по рекомендации",
         value: 1,
      }
   ],
   placeholder: ""
})
const sortOption = ref(null)
function onSelectSortOption(option) {
   sortOption.value = option
}
const isFiltersOpen = ref(false)

</script>