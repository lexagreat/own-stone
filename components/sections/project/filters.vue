<template>
   <section class="project-selection">
      <div class="container">
         <div class="project-selection__wrapper">
            <div class="project-selection__filters project-filters">
               <h2 class="project-filters__title h1 dark-title">подобрать <span>квартиру</span></h2>
               <div class="catalog-filters scrollbar-none" :class="{ open: isOpenModal }">
                  <div class="catalog-filters__header">
                     <button class="circle circle40" @click="isOpenModal = false">
                        <ArrowDownIcon style="rotate: 90deg;" />
                     </button>
                     <h3 class="catalog-filters__title">Фильтр</h3>
                     <button class="catalog-filters__reset">Сбросить все</button>
                  </div>
                  <div class="catalog-filters__content">
                     <ul class="catalog-filters__items">

                        <li class="catalog-filter" id="RoomsCount" v-if="type !== 'commerce'">
                           <span class="catalog-filter__title">Количество комнат</span>
                           <ul class="catalog-filter__rooms">
                              <li v-for="item in 5">
                                 <input v-model="roomsChecked" type="checkbox" :value="item"
                                    :id="'catalogFilterRooms' + item" name="catalogFilterRooms">
                                 <label class="circle" :for="'catalogFilterRooms' + item">{{ item }} {{ item == 5 ? "+"
                                    : ""
                                    }}</label>
                              </li>
                           </ul>
                        </li>
                        <li class="catalog-filter">
                           <span class="catalog-filter__title">Площадь, м2</span>
                           <div class="catalog-range">
                              <div class="catalog-range__output">
                                 <!-- <input type="number" v-model="priceMinValue"> -->
                                 <span>{{ formatNumber(areaMinValue) }}</span>
                                 <!-- <input type="number" v-model="priceMaxValue"> -->
                                 <span>{{ formatNumber(areaMaxValue) }}</span>
                              </div>
                              <MultiRangeSlider :ruler="false" :min="areaMin" :max="areaMax" :step="10"
                                 :minValue="areaMinValue" :maxValue="areaMaxValue" @input="UpdateAreas" />
                           </div>
                        </li>
                        <li class="catalog-filter" v-if="type !== 'commerce'">
                           <span class="catalog-filter__title">Отделка</span>
                           <UiCatalogSelect title="Отделка" :settings="repairSettings" v-model="repair" />
                        </li>
                        <li class="catalog-filter" id="priceRange">
                           <span class="catalog-filter__title">Стоимость за <b>все</b> м2</span>
                           <div class="catalog-range">
                              <div class="catalog-range__output">
                                 <!-- <input type="number" v-model="priceMinValue"> -->
                                 <span>{{ formatPrice(priceMinValue) }}</span>
                                 <!-- <input type="number" v-model="priceMaxValue"> -->
                                 <span>{{ formatPrice(priceMaxValue) }}</span>
                              </div>
                              <MultiRangeSlider :ruler="false" :min="priceMin" :max="priceMax" :step="10000"
                                 :minValue="priceMinValue" :maxValue="priceMaxValue" @input="UpdatePrices" />
                           </div>
                        </li>
                        <li class="catalog-filter" v-if="type == 'commerce'">
                           <span class="catalog-filter__title">Назначение</span>
                           <UiCatalogSelect title="Назначение" :settings="targetSettings" v-model="target" />
                        </li>
                        <li class="catalog-filter">
                           <span class="catalog-filter__title">Срок сдачи</span>
                           <UiCatalogSelect title="Срок сдачи" :settings="dateSettings" v-model="dates" />
                        </li>

                        <li class="catalog-filter">
                           <span class="catalog-filter__title"></span>
                           <ul class="catalog-filter__options catalog-filter__rooms">
                              <li v-for="item in options">
                                 <input v-model="checkedOptions" type="checkbox" :value="item.value"
                                    :id="'catalogFilterOptions' + item.value" name="catalogFilterOptions">
                                 <label class="circle" :for="'catalogFilterOptions' + item.value">{{ item.name
                                    }}</label>
                              </li>
                           </ul>
                        </li>
                        <li class="catalog-filters__btns">
                           <UiButton class="black" @click="search">Показать все</UiButton>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
            <UiButton class="black project-selection__open" @click="isOpenModal = true">
               <FilterIcon />
               Параметры
            </UiButton>
         </div>
      </div>
      <SectionsProductSlider white-btns :category="category" :products="catalog.products">
         <slot />
      </SectionsProductSlider>
      <BannersProjectMoreInfo v-if="type !== 'commerce'" />
   </section>
</template>
<script setup>
import MultiRangeSlider from "multi-range-slider-vue";
import { formatNumber, formatPrice } from "~/utils/formattingNumbers";
import ArrowDownIcon from '@/assets/img/icons/arrow_down.svg'
import FilterIcon from '@/assets/img/icons/filter.svg'
import { useCatalog } from "~/store/catalog";
const catalog = useCatalog()
const route = useRoute()
const props = defineProps({
   type: String,
   projectSlug: String,
})
const category = ref(1)

const isOpenModal = ref(false)
const roomsChecked = ref([])

const repairSettings = ref({
   options: [
      {
         name: "Любая",
         value: 0,
      },
   ],
   placeholder: ""
})
const repair = ref([{
   name: "Любая",
   value: 0,
}])



const dateSettings = ref({
   options: [
      {
         name: "Не важно",
         value: 0,
      },
   ],
   placeholder: ""
})
const dates = ref([
   {
      name: "Не важно",
      value: 0,
   },
])

const targetSettings = ref({
   options: [
      {
         name: "Не важно",
         value: 0,
      },
   ],
   placeholder: ""
})
const target = ref([
   {
      name: "Не важно",
      value: 0,
   },
])

const priceMin = ref(0)
const priceMax = ref(50000000)
const priceMinValue = ref(priceMin.value)
const priceMaxValue = ref(priceMax.value)
const UpdatePrices = (e) => {
   priceMinValue.value = e.minValue
   priceMaxValue.value = e.maxValue
}
const areaMin = ref(0)
const areaMax = ref(500)
const areaMinValue = ref(areaMin.value)
const areaMaxValue = ref(areaMax.value)
const UpdateAreas = (e) => {
   areaMinValue.value = e.minValue
   areaMaxValue.value = e.maxValue
}


const options = ref([
   {
      name: "NEW",
      value: 0,

   },

])
const checkedOptions = ref([])

watch(() => isOpenModal, (value) => {
   if (value) {
      bodyLock()
   } else {
      bodyUnlock()
   }
})
const types = ref([
   {
      name: 'Новостройки',
      value: "build",
      icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/new-buildings.svg'))),
   },
   {
      name: 'Вторичная',
      value: "secondary",
      icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/secondary-housing.svg'))),
   },
   {
      name: 'Коммерция',
      value: "commerce",
      icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/commercial.svg'))),
   },
])
const filtersObject = computed(() => {
   let obj = {}
   obj.category = category.value
   obj.type = types.value.find(item => item.value == props.type).name
   if (roomsChecked.value?.length) {
      obj.rooms = roomsChecked.value
   }
   if (areaMinValue.value !== areaMin.value) {
      obj.area = {}
      obj.area.min = areaMinValue.value
   }
   if (areaMaxValue.value !== areaMax.value) {
      if (!obj.area) {
         obj.area = {}
      }
      obj.area.max = areaMaxValue.value
   }
   obj.repair = repair.value
   if (priceMinValue.value !== priceMin.value) {
      obj.price = {}
      obj.price.min = priceMinValue.value
   }
   if (priceMaxValue.value !== priceMax.value) {
      if (!obj.price) {
         obj.price = {}
      }
      obj.price.max = priceMaxValue.value
   }
   obj.date = dates.value
   obj.target = target.value
   obj.tags = checkedOptions.value
   return obj
})
const search = async () => {
   isOpenModal.value = false
   // emit('setCat', category.value)
   if (route.query["filters[category]"] == 'apartaments' && category.value == 0 || route.query["filters[category]"] == 'projects' && category.value == 1) {
      await setCat()
   }
   // console.log('3. search');
   const url = catalog.getUrl(filtersObject.value) + `&filters[proekty][slug]=${props.projectSlug}`

   await catalog.getProducts(url)
}
const setCat = async () => {

   let response = await catalog.getFiltersForCats(category.value, props.type, props.projectSlug);
   // console.log("1. filters from cat", response);
   setFiltersFromCat(response)
}

function setFiltersFromCat(obj) {
   // set ranges
   priceMin.value = obj.ranges?.price?.min
   priceMax.value = obj.ranges?.price?.max
   priceMinValue.value = priceMin.value
   priceMaxValue.value = priceMax.value
   areaMin.value = Math.round(obj.ranges?.area?.min)
   areaMax.value = Math.round(obj.ranges?.area?.max)
   areaMinValue.value = areaMin.value
   areaMaxValue.value = areaMax.value

   // set repair
   repairSettings.value.options = obj?.repair
   // set sroks
   dateSettings.value.options = obj?.sroks
   // set target
   targetSettings.value.options = obj?.target


   options.value = obj?.tags

   // console.log("2. set filters");
}


onMounted(async () => {
   await setCat()
   await search()
})



</script>


<style lang="scss">
.all-filters {
   svg path {
      fill: black;
   }
}

.project-selection {
   .swiper-slide {
      // max-width: 333px;
      margin-right: 8px !important;
   }

   @media(max-width: 568px) {
      .product-slider__title {
         margin: 0 auto;
      }
   }
}

@media(max-width: 1024px) {
   .project-selection {
      .catalog-filters {
         .v-select__item {
            text-align: left;
         }
      }
   }
}
</style>