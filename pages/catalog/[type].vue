<template>
   <AppHead :seo="seo?.seo" />
   <!-- <UiLoader v-if="loading" /> -->
   <main class="main catalog dark-page" style="overflow: hidden;">
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
            <CatalogFilters :reset="reset" :type="type" from-catalog :isOpenModal="isFiltersOpen"
               @changeType="onChangeType" @closeModal="isFiltersOpen = false" @search="search"
               :products="catalog.products" :filters="filters" @setCat="setCat" v-model:loading="loading"
               v-model="sortOption" @update:filtersCount="filtersCount = $event" />
         </div>
      </section>
      <section class="catalog-page">
         <div class="container">
            <div class="catalog-page__wrapper">
               <div class="catalog-page__header">
                  <div class="catalog-page__sort" :class="{ dis: loading }">
                     <button class="circle mobile" @click="mobileSort">
                        <IconSort />
                     </button>
                     <span>Сортировка</span>
                     <UiSelect title="Сортировка" :settings="sortSettings" @selectOption="onSelectSortOption" />
                  </div>
                  <UiButton class="white all-filters" @click="isFiltersOpen = true" :class="{ dis: loading }">
                     <IconFilter />
                     <span>Фильтры</span>
                     <i class="circle">{{ filtersCount }}</i>
                  </UiButton>
                  <div class="catalog-page__controls">

                     <ul class="catalog-page__views">
                        <li v-for="item in views" :key="item">
                           <input v-model="currentView" type="radio" name="catalogViews" :value="item.value"
                              :id="'catalogViews' + item.value">
                           <label class="circle" :for="'catalogViews' + item.value" @click="catalog.isMap = false">
                              <component :is="item.icon" />
                           </label>
                        </li>
                     </ul>
                     <UiButton class="catalog-page__map white" :class="{ active: catalog.isMap }"
                        @click="catalog.isMap = true">
                        <IconGeo />
                        <span>На карте</span>
                     </UiButton>
                  </div>
               </div>
               <div class="catalog-page__main" v-if="!catalog.isMap && catalog.products.length">
                  <CatalogListsGrid :products="splicedProducts[0]" @openForm="onOpenForm" v-if="currentView == 'grid'"
                     :category="category" />
                  <CatalogListsColumn :products="splicedProducts[0]" @openForm="onOpenForm"
                     v-if="currentView == 'column'" :category="category" />
                  <BannersCatalogObject />
                  <CatalogListsGrid :products="splicedProducts[1]" @openForm="onOpenForm"
                     v-if="currentView == 'grid' && splicedProducts[1].length" :category="category" />
                  <CatalogListsColumn :products="splicedProducts[1]" @openForm="onOpenForm"
                     v-if="currentView == 'column' && splicedProducts[1].length" :category="category" />
               </div>
               <CatalogMap v-if="catalog.isMap && catalog.products.length" :searchUrl="searchUrl"
                  :products="catalog.products" :category="category" @openForm="onOpenForm" />

               <CatalogEmpty v-show="catalog?.products?.length === 0" @reset="onreset" />


               <ModalObjectForm :isOpen="isOpenFormModal" @closePopup="isOpenFormModal = false"
                  :id="currentProductForModal" />
            </div>
         </div>
      </section>

      <CatalogPagination v-if="!catalog.isMap && catalog.products.length" :pages="catalog?.meta?.pagination?.pageCount"
         v-model="currentPage" @showMore="onShowMore" />
      <SectionsProductSlider :category="0" :products="recentlyStore.products" v-if="recentlyStore.products?.length">
         Вы ранее <span>смотрели</span>
      </SectionsProductSlider>
      <SectionsProductSlider :category="0" :products="recentlyStore.same" v-if="recentlyStore.same?.length">
         Вам <span>подходит</span>
      </SectionsProductSlider>
   </main>
</template>
<script setup>
import IconFilter from '@/assets/img/icons/filter.svg'
import IconSort from '@/assets/img/icons/sort.svg'
import IconGeo from "@/assets/img/icons/geo.svg"
import { useCatalog } from '~/store/catalog';
import { useRecently } from '~/store/recently';
const recentlyStore = useRecently()
// Получаем параметр type из маршрута
const catalog = useCatalog()
const route = useRoute()
const router = useRouter()
let type = route.params.type
const isOpenFormModal = ref(false)
const currentProductForModal = ref('')
const onOpenForm = (id) => {
   currentProductForModal.value = id;
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
      pageTitle: "Новостройки в москве бизнес и премиум-сегмент",
   },
   secondary: {
      title: "Вторичная недвижимость <br><span>в москве</span>",
      pageTitle: "Вторичная недвижимость в москве",
   },
   commerce: {
      title: "Коммерческая недвижимость <br><span>в москве</span>",
      pageTitle: "Коммерческая недвижимость в москве",
   }
}[type] || "404"

// useHead({
//    title: pageStaticInfo.pageTitle
// })

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
const loading = ref(true)
const currentView = ref("grid")
watch(() => catalog.isMap, (value) => {
   if (value) {
      currentView.value = ''
   }
}, {
   immediate: true
})
const sortSettings = ref({
   options: [
      {
         name: "По рекомендации",
         value: '',
         selected: true
      },
      {
         name: "Сначала новые",
         value: 'createdAt:asc',
      },
      {
         name: "Сначала старые",
         value: 'createdAt:desc',
      },
      {
         name: "По возрастанию цены",
         value: 'cost_total:asc',
      },
      {
         name: "По убыванию цены",
         value: 'cost_total:desc',
      },
      {
         name: "По возрастанию площади",
         value: 'square_apartament:asc',
      },
      {
         name: "По убыванию площади",
         value: 'square_apartament:desc',
      },
   ],
   // placeholder: "Выберите сортировку"
})
const sortOption = ref('')
function onSelectSortOption(option) {
   sortOption.value = option.value
}
const isFiltersOpen = ref(false)
const category = ref(0)
const searchUrl = ref("")
// const onChangeCategory = (value) => {
//    category.value = value
// }
const search = async (url = searchUrl.value) => {
   loading.value = true
   if (url.length) {
      searchUrl.value = url;
   }
   let searchingUrl = url + `&pagination[page]=${currentPage.value}`
   let pageUrl = '/catalog/' + type + searchingUrl
   if (sortOption.value.length) {
      searchingUrl += `&sort=${sortOption.value}`
      pageUrl += `&sort=${sortOption.value}`
   }
   router.push(pageUrl)
   await catalog.getProducts(searchingUrl)
   stopConditionForSearch.value = false
   loading.value = false
}
const filters = ref({})
const setCat = (cat) => {
   category.value = cat
}

// console.log('должно быть set cat -> get filters for cat -> set filters from query -> search');
const splicedProducts = computed(() => {
   if (catalog.products.length <= 8) {
      return [catalog.products, []];
   } else {
      // Иначе возвращаем первые 8 элементов в первом списке и оставшиеся элементы во втором
      return [catalog.products.slice(0, 8), catalog.products.slice(8)];
   }
})
const currentPage = ref(1)

watch(category, async () => {
   catalog.products = []
})
watch(currentPage, async () => {
   if (stopConditionForSearch.value) return
   await search()
})
watch(() => catalog.meta?.pagination?.total, (value) => {
   if (stopConditionForSearch.value) return
   currentPage.value = 1
})
watch(() => route.params.type, () => {
   location.reload()
})
const stopConditionForSearch = ref(true)

const onShowMore = async () => {
   console.log("sortOption", sortOption.value);
   stopConditionForSearch.value = true
   currentPage.value++
   let searchingUrl = searchUrl.value + `&pagination[page]=${currentPage.value}`
   if (sortOption.value.length) {
      searchingUrl += `&sort=${sortOption.value}`

   }
   let pageUrl = route.path + searchingUrl
   router.push(pageUrl)
   // console.log(searchingUrl);

   await catalog.showMore(searchingUrl)
   stopConditionForSearch.value = false
}
onMounted(async () => {
   if (route.query['pagination[page]']) {
      currentPage.value = route.query['pagination[page]']
   }
   if (route.query['sort']) {
      sortSettings.value.options.forEach(item => {
         if (item.value == route.query.sort) {
            item.selected = true
         } else {
            item.selected = false
         }
      });
      onSelectSortOption(sortSettings.value.options.filter(item => item.value == route.query.sort)[0])
   }
   await recentlyStore.getProducts()
   await recentlyStore.getSameProducts()


})
watch(sortOption, async () => {
   if (stopConditionForSearch.value) return
   await search()
})
onBeforeRouteLeave(() => {
   catalog.isMap = false
})
const mobileSort = () => {
   isFiltersOpen.value = true
   document.querySelector('.catalog-filters .sort .v-select').classList.add('open')
}



const filtersCount = ref(0)

const reset = ref(false)
const onreset = () => {
   reset.value = true;
   setTimeout(() => {
      reset.value = false;

   }, 100)
}




const { data: seo } = await useBaseFetch(`/page-${type}`)
</script>


<style lang="scss">
.catalog-page__map {
   &.active {
      background-color: #181818 !important;
      color: white !important;

      svg path {
         fill: white !important;
      }
   }
}

.dis {
   pointer-events: none;
}
</style>