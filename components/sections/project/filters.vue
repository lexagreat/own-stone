<template>
   <section class="project-selection" :class="{ empty: !catalog.products?.length }">
      <div class="container">
         <div class="project-selection__wrapper">
            <div class="project-selection__filters project-filters">
               <h2 class="project-filters__title h1 dark-title pc">подобрать <span>квартиру</span></h2>
               <h2 class="project-filters__title h1 dark-title mob">
                  подобрать квартиру
                  <span>{{ formatNumber(count) }} {{ morph(count, ['предложение', 'предложения', 'предложений'])
                     }}</span>
               </h2>
               <div class="catalog-filters scrollbar-none" :class="{ open: isOpenModal }">
                  <div class="catalog-filters__header">
                     <button class="circle circle40" @click="isOpenModal = false">
                        <ArrowDownIcon style="rotate: 90deg;" />
                     </button>
                     <h3 class="catalog-filters__title">Фильтр</h3>
                     <button class="catalog-filters__reset" @click="resetFitlers">Сбросить все</button>
                  </div>
                  <div class="catalog-filters__content">
                     <ul class="catalog-filters__items">

                        <li class="catalog-filter" id="RoomsCount" v-if="type !== 'commerce'">
                           <span class="catalog-filter__title">Количество комнат</span>
                           <ul class="catalog-filter__rooms">
                              <li v-for="item in 6">
                                 <input v-model="roomsChecked" type="checkbox" :value="item - 1"
                                    :id="'catalogFilterRooms' + item" name="catalogFilterRooms">
                                 <label class="circle" :for="'catalogFilterRooms' + item" v-if="item - 1 == 0">С</label>
                                 <label class="circle" :for="'catalogFilterRooms' + item" v-else>{{ item - 1 }} {{ item
                                    == 6 ?
                                    "+" : ""
                                 }}</label>
                              </li>
                           </ul>
                        </li>
                        <li class="catalog-filter">
                           <span class="catalog-filter__title">Площадь, м2</span>
                           <div class="catalog-range">
                              <div class="catalog-range__output">
                                 <input type="text" :value="formatNumber(areaMinValue)"
                                    @input="areaMinValue = +$event.target.value.replaceAll(' ', '')">
                                 <input type="text" :value="formatNumber(areaMaxValue)"
                                    @input="areaMaxValue = +$event.target.value.replaceAll(' ', '')">
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
                           <span class="catalog-filter__title">Стоимость за
                              <label><input v-model="priceType" type="radio" name="priceType"
                                    :value="0"><span>все</span></label>
                              <label>
                                 <input v-model="priceType" type="radio" name="priceType" :value="1">
                                 <span>м2</span>
                              </label>

                           </span>
                           <div class="catalog-range" v-if="priceType">
                              <div class="catalog-range__output">
                                 <input type="text" :value="formatNumber(priceForOneMinValue)"
                                    @input="priceForOneMinValue = +$event.target.value.replaceAll(' ', '')">
                                 <input type="text" :value="formatNumber(priceForOneMaxValue)"
                                    @input="priceForOneMaxValue = +$event.target.value.replaceAll(' ', '')">
                              </div>
                              <MultiRangeSlider :ruler="false" :min="priceForOneMin" :max="priceForOneMax" :step="10000"
                                 :minValue="priceForOneMinValue" :maxValue="priceForOneMaxValue"
                                 @input="UpdateForOnePrices" />
                           </div>
                           <div class="catalog-range" v-else>
                              <div class="catalog-range__output">
                                 <input type="text" :value="formatNumber(priceMinValue)"
                                    @input="priceMinValue = +$event.target.value.replace(/\D/g, '')">
                                 <input type="text" :value="formatNumber(priceMaxValue)"
                                    @input="priceMaxValue = +$event.target.value.replace(/\D/g, '')">
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
                           <UiCatalogSelect class="srok-select" title="Срок сдачи" :settings="dateSettings"
                              v-model="dates" />
                        </li>

                        <li class="catalog-filter" v-if="options.length">
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
                           <button class="catalog-filters__resetpc" @click="resetFitlers">Сбросить все</button>
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
         <ul class="project-selection__rooms" v-if="formattedRooms?.length">
            <li v-for="(item, index) in formattedRooms" :key="index">
               <p v-html="item.label + ' ' + item.formatted_area"></p>
               <p>{{ item.formatted_short_price }}</p>
            </li>
         </ul>
      </div>
      <SectionsProductSlider white-btns :category="category" :products="catalog.products"
         v-show="catalog.products?.length">
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
   count: Number,
   formattedRooms: Array
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

watch(isOpenModal, (value) => {
   if (value) {
      bodyLock()
   } else {
      bodyUnlock()
   }
})

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

const priceForOneMin = ref(0)
const priceForOneMax = ref(50000000)
const priceForOneMinValue = ref(priceForOneMin.value)
const priceForOneMaxValue = ref(priceForOneMax.value)
const UpdateForOnePrices = (e) => {
   priceForOneMinValue.value = e.minValue
   priceForOneMaxValue.value = e.maxValue
}

const priceType = ref(0)
watch(priceType, (value) => {
   if (value) {
      priceMinValue.value = priceMin.value
      priceMaxValue.value = priceMax.value
   } else {
      priceForOneMinValue.value = priceForOneMin.value
      priceForOneMaxValue.value = priceForOneMax.value
   }
})



const areaMin = ref(0)
const areaMax = ref(500)
const areaMinValue = ref(areaMin.value)
const areaMaxValue = ref(areaMax.value)
const UpdateAreas = (e) => {
   areaMinValue.value = e.minValue
   areaMaxValue.value = e.maxValue
}


const options = ref([
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

   if (priceForOneMinValue.value !== priceForOneMin.value) {
      obj.priceForOne = {}
      obj.priceForOne.min = priceForOneMinValue.value
   }
   if (priceForOneMaxValue.value !== priceForOneMax.value) {
      if (!obj.priceForOne) {
         obj.priceForOne = {}
      }
      obj.priceForOne.max = priceForOneMaxValue.value
   }


   obj.date = dates.value
   obj.target = target.value
   obj.tags = checkedOptions.value
   return obj
})
const first = ref(true)
const search = async () => {
   isOpenModal.value = false
   // emit('setCat', category.value)
   if (route.query["filters[category]"] == 'apartaments' && category.value == 0 || route.query["filters[category]"] == 'projects' && category.value == 1) {
      await setCat()
   }
   // console.log('3. search');
   const url = catalog.getUrl(filtersObject.value) + `&filters[proekty][slug]=${props.projectSlug}`

   await catalog.getProducts(url)

   if (!first.value) {
      document.querySelector('.project-selection .product-slider').scrollIntoView({
         behavior: 'smooth'
      })
   }

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

   priceForOneMin.value = obj.ranges?.priceForOne?.min
   priceForOneMax.value = obj.ranges?.priceForOne?.max
   priceForOneMinValue.value = priceForOneMin.value
   priceForOneMaxValue.value = priceForOneMax.value


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
   first.value = false;
})
const resetFitlers = async () => {
   priceMinValue.value = priceMin.value
   priceMaxValue.value = priceMax.value

   priceForOneMinValue.value = priceForOneMin.value
   priceForOneMaxValue.value = priceForOneMax.value

   areaMinValue.value = areaMin.value
   areaMaxValue.value = areaMax.value

   target.value = [
      {
         name: "Не важно",
         value: 0,
      },
   ]
   dates.value = [
      {
         name: "Не важно",
         value: 0,
      },
   ]
   repair.value = [{
      name: "Любая",
      value: 0,
   }]

   roomsChecked.value = []
   checkedOptions.value = []
   await search()

}

</script>


<style lang="scss">
.empty {
   .project-banner__wrapper {
      margin-top: var(--margin);
   }
}

.all-filters {
   svg path {
      fill: black;
   }
}

.project-selection {
   .mob {
      display: none;
   }

   .catalog-filter__title,
   .v-select__wrapper {
      text-align: left;
   }

   @media(max-width: 1024px) {
      .mob {
         display: flex;
         flex-direction: column;
         align-items: center;
         text-align: center;

         span {
            color: rgba(#181818, 0.15);
         }
      }

      .pc {
         display: none;
      }
   }

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