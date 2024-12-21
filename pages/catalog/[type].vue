<template>
   <main class="main catalog dark-page">
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
            <CatalogFilters :type="type" from-catalog :isOpenModal="isFiltersOpen" @changeType="onChangeType"
               @closeModal="isFiltersOpen = false" @search="search" :products="catalog.products" :filters="filters"
               @setCat="setCat" />
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
                  <CatalogListsGrid :products="catalog.products" @openForm="onOpenForm" v-if="currentView == 'grid'"
                     :category="category" />
                  <CatalogListsColumn :products="catalog.products" @openForm="onOpenForm" v-if="currentView == 'column'"
                     :category="category" />
                  <BannersCatalogObject />
                  <CatalogListsGrid :products="catalog.products" @openForm="onOpenForm" v-if="currentView == 'grid'"
                     :category="category" />
                  <CatalogListsColumn :products="catalog.products" @openForm="onOpenForm" v-if="currentView == 'column'"
                     :category="category" />
               </div>
               <ModalObjectForm :isOpen="isOpenFormModal" @closePopup="isOpenFormModal = false" />
            </div>
         </div>
      </section>
      <CatalogPagination />
      <!-- <SectionsProductSlider>
         Вы ранее <span>смотрели</span>
      </SectionsProductSlider>
      <SectionsProductSlider>
         Вам <span>подходит</span>
      </SectionsProductSlider> -->
   </main>
</template>
<script setup>
import IconFilter from '@/assets/img/icons/filter.svg'
import IconSort from '@/assets/img/icons/sort.svg'
import IconGeo from "@/assets/img/icons/geo.svg"
import { useCatalog } from '~/store/catalog';
// Получаем параметр type из маршрута
const catalog = useCatalog()
const route = useRoute()
const router = useRouter()
let type = route.params.type
const isOpenFormModal = ref(false)
const onOpenForm = () => {
   isOpenFormModal.value = true
}
const path = ref([
   {
      name: "Главная",
      to: "/"
   },
   {
      name: "Купить",
      to: ""
   },
])
const onChangeType = (value) => {
   type = value
}
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
      name: 'Коммерция',
      to: "/catalog/commerce"
      // icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/commercial.svg'))),
   },
])

const views = ref([
   {
      icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/card.svg'))),
      value: 'grid'
   },
   {
      icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/list.svg'))),
      value: 'column'

   },
])
const currentView = ref("grid")
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
const category = ref(0)
const searchUrl = ref("")
// const onChangeCategory = (value) => {
//    category.value = value
// }
const search = async (url = searchUrl.value) => {
   router.push(route.path + url)
   await catalog.getProducts(url)
}
const filters = ref({})
const setCat = (cat) => {
   category.value = cat
}

// console.log('должно быть set cat -> get filters for cat -> set filters from query -> search');
</script>