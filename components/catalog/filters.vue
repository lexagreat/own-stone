<template>
   <UiLoader v-if="loading && fromCatalog" />
   <!-- .catalog-filters.loading  чтоб был скелетон-->
   <div class="catalog-filters scrollbar-none" :class="{ open: isOpenModal, 'catalog-filters_catalog': fromCatalog }">
      <div class="catalog-filters__header">
         <button class="circle circle40" @click="emit('closeModal')">
            <ArrowDownIcon style="rotate: 90deg;" />
         </button>
         <h3 class="catalog-filters__title">Фильтр</h3>
         <button class="catalog-filters__reset" @click="resetFilters">Сбросить все</button>
      </div>
      <ul class="catalog-filters__radios">
         <li v-for="(item, index) in types" :key="index">
            <input v-model="myType" type="radio" :value="item.value" :id="'catalogRadio' + item.value"
               name="catalogRadio">
            <label :for="'catalogRadio' + item.value">
               <component :is="item.icon" />
               <span>{{ item.name }}</span>
            </label>
         </li>
      </ul>
      <div class="catalog-filters__content">
         <ul class="catalog-filters__items">
            <li class="catalog-filter" v-if="type !== 'secondary'">
               <span class="catalog-filter__title"></span>
               <ul class="catalog-filter__categories">

                  <li v-for="(item, index) in categories" :key="index">
                     <input v-model="category" type="radio" :value="item.value" :id="'catalogFilterType' + item.value"
                        name="catalogFilterType">
                     <label :for="'catalogFilterType' + item.value">{{ item.name }}</label>
                  </li>
               </ul>
            </li>
            <li class="sort" style="display: none;">
               <UiSelect title="Сортировка" :settings="sortSettings" @selectOption="onSelectSortOption" />
            </li>
            <li class="catalog-filter" v-if="type !== 'commerce'">
               <span class="catalog-filter__title">Количество комнат</span>
               <ul class="catalog-filter__rooms">
                  <li v-for="item in 6">
                     <input v-model="roomsChecked" type="checkbox" :value="item - 1" :id="'catalogFilterRooms' + item"
                        name="catalogFilterRooms">
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
                  <MultiRangeSlider :ruler="false" :min="areaMin" :max="areaMax" :step="areaStep"
                     :minValue="areaMinValue" :maxValue="areaMaxValue" @input="UpdateAreas" />
               </div>
            </li>
            <li class="catalog-filter" v-if="type !== 'commerce'">
               <span class="catalog-filter__title">Отделка</span>
               <UiCatalogSelect title="Отделка" :settings="repairSettings" v-model="repair" />
            </li>
            <li class="catalog-filter" id="priceRange">
               <span class="catalog-filter__title">Стоимость за
                  <label>
                     <input v-model="priceType" type="radio" name="priceType" :value="0">
                     <span>все</span>
                  </label>
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
                  <MultiRangeSlider :ruler="false" :min="priceForOneMin" :max="priceForOneMax" :step="200000"
                     :minValue="priceForOneMinValue" :maxValue="priceForOneMaxValue" @input="UpdateForOnePrices" />
               </div>
               <div class="catalog-range" v-else>
                  <div class="catalog-range__output">
                     <input type="text" :value="formatNumber(priceMinValue)"
                        @input="priceMinValue = +$event.target.value.replace(/\D/g, '')">
                     <input type="text" :value="formatNumber(priceMaxValue)"
                        @input="priceMaxValue = +$event.target.value.replace(/\D/g, '')">
                  </div>
                  <MultiRangeSlider :ruler="false" :min="priceMin" :max="priceMax" :step="200000"
                     :minValue="priceMinValue" :maxValue="priceMaxValue" @input="UpdatePrices" />
               </div>
            </li>
            <li class="catalog-filter" v-if="type == 'commerce'">
               <span class="catalog-filter__title">Назначение</span>
               <UiCatalogSelect title="Назначение" :settings="targetSettings" v-model="target" />
            </li>
            <li class="catalog-filter" v-if="type !== 'secondary'">
               <span class="catalog-filter__title">Срок сдачи</span>

               <UiCatalogSelect class="srok-select" title="Срок сдачи" :settings="dateSettings" v-model="dates" />
            </li>
            <!-- <li class="catalog-filter" v-if="!fromHome">
               <span class="catalog-filter__title">Расположение</span>
               <UiCatalogSelect title="Расположение" :settings="placementSettings" v-model="placement" />
            </li> -->
            <li class="catalog-filter" ъ>
               <span class="catalog-filter__title">Расположение</span>
               <UiPlacementSelect title="Расположение" :placementOptions="placementSettings.options"
                  v-model:placement="placement" :projectsOptions="projectsSettings.options" v-model:projects="projects"
                  :metroOptions="metroSettings.options" v-model:metro="metro" />
            </li>
            <li class="catalog-filter" v-if="!fromHome">
               <span class="catalog-filter__title">Внутри транспортных колец</span>
               <UiCatalogSelect title="Внутри транспортных колец" :settings="transportSettings" v-model="transport" />
            </li>
            <li class="catalog-filter">
               <span class="catalog-filter__title">Поиск по проектам</span>
               <CatalogProjectSearch title="Найти проект" :projectsOptions="projectsSettings.options"
                  v-model:projects="projects" />
            </li>
            <li class="catalog-filter" v-if="type == 'commerce'">
               <span class="catalog-filter__title">Этаж</span>
               <UiCatalogSelect title="Этаж" :settings="floorSettings" v-model="floor" />
            </li>
            <li class="catalog-filter" v-if="type == 'commerce'">
               <span class="catalog-filter__title">Вход</span>
               <UiCatalogSelect title="Вход" :settings="entrySettings" v-model="entry" />
            </li>
            <li class="catalog-filter" v-if="options.length">
               <span class="catalog-filter__title"></span>
               <ul class="catalog-filter__options catalog-filter__rooms">
                  <li v-for="item in options" :key="item">
                     <input v-model="checkedOptions" type="checkbox" :value="item.name"
                        :id="'catalogFilterOptions' + item.value" name="catalogFilterOptions">
                     <label class="circle" :for="'catalogFilterOptions' + item.value">{{ item.name }}</label>
                  </li>
                  <!-- <li v-if="fromCatalog">
                     <UiButton class="white all-filters">
                        <IconFilter />
                        <span>Все фильтры</span>
                     </UiButton>
                  </li> -->
               </ul>
            </li>
            <li class="catalog-filters__btns">
               <UiButton class="white map" v-if="!fromCatalog" @click="search('map')">
                  <img src="/img/btn-map.png" alt="" class="circle">
                  <span>На карте</span>
               </UiButton>
               <button class="catalog-filters__resetpc" @click="resetFilters">Сбросить все</button>
               <UiButton class="black" @click="search">Показать все</UiButton>
            </li>
         </ul>
         <div class="catalog-filters__sticky">
            <UiButton class="black" @click="search">Показать все</UiButton>
         </div>
      </div>
   </div>
</template>
<script setup>
import MultiRangeSlider from "multi-range-slider-vue";
import { formatNumber, formatPrice } from "~/utils/formattingNumbers";
import ArrowDownIcon from '@/assets/img/icons/arrow_down.svg'
import { useCatalog } from "~/store/catalog";
const catalog = useCatalog()
const route = useRoute()
const props = defineProps({
   isOpenModal: Boolean,
   type: String,
   fromCatalog: Boolean,
   fromHome: Boolean,
   isSearchingMap: Boolean,
   products: Array,
   filters: Object,
   reset: Boolean
})

const emit = defineEmits(["closeModal", "setCat", "changeType", "search", 'update:filtersCount'])
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
const myType = ref("build")

const categories = ref([
   {
      name: "Проекты",
      value: 0
   },
   {
      name: props.type == 'build' ? "Квартиры" : 'Объекты',
      value: 1
   },
])
const category = ref(0)

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





const placementSettings = ref({
   options: [
      {
         name: "Не важно",
         value: 0,
      },
   ],
   placeholder: ""
})
const placement = ref([{
   name: "Не важно",
   value: 0,
}])




const transportSettings = ref({
   options: [
      {
         name: "Не важно",
         value: 0,
      },
   ],
   placeholder: ""
})

const transport = ref([{
   name: "Не важно",
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


const floorSettings = ref({
   options: [
      {
         name: "Не важно",
         value: 0,
      },
   ],
   placeholder: ""
})
const floor = ref([
   {
      name: "Не важно",
      value: 0,
   },
])


const entrySettings = ref({
   options: [
      {
         name: "Не важно",
         value: 0,
         selected: true
      },
   ],
   placeholder: ""
})
const entry = ref([
   {
      name: "Не важно",
      value: 0,
   },
])

const projectsSettings = ref({
   options: [
      // {
      //    name: "Не важно",
      //    value: 0,
      //    selected: true
      // },
   ],
   placeholder: ""
})
const projects = ref([
   {
      name: "Не важно",
      value: 0,
   },
])
const metroSettings = ref({
   options: [
      {
         name: "Не важно",
         value: 0,
         selected: true
      },
   ],
   placeholder: ""
})
const metro = ref([
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
const areaStep = computed(() => {
   // if (areaMaxValue.value > 150) {
   //    return 50
   // }
   return 10
})

const options = ref([])
const checkedOptions = ref([])

watch(() => props.isOpenModal, (value) => {
   if (value) {
      bodyLock()
   } else {
      bodyUnlock()
   }
})
watch(() => props.type, async (value) => {
   myType.value = value
   await setCat()

})
watch(myType, (value) => {
   emit("changeType", value)
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
const sortOption = defineModel()
const loading = defineModel('loading')

function onSelectSortOption(option) {
   sortOption.value = option.value
   emit('closeModal')
}




watch(category, () => {
   if (!props.fromHome) {
      search()
   }
})

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
   obj.floor = floor.value
   obj.placement = placement.value
   obj.transport = transport.value
   obj.target = target.value
   obj.entry = entry.value
   obj.tags = checkedOptions.value
   obj.projects = projects.value
   obj.metro = metro.value
   return obj
})
const search = async (map = false) => {
   emit("closeModal")
   if (props.type == 'secondary') {
      category.value = 2
   }
   emit('setCat', category.value)
   if (route.query["filters[category]"] == 'apartaments' && category.value == 0 || route.query["filters[category]"] == 'projects' && category.value == 1) {
      await setCat()
   }
   // console.log('3. search');
   let url = catalog.getUrl(filtersObject.value)
   if (map == 'map') {
      console.log('map is true', map);
      catalog.isMap = true
      // url += "&map=true"
   }
   emit('search', url)
}
const getFiltersFromQuery = () => {
   if (route.query["filters[category]"] == 'apartaments') {
      category.value = 1
   } else {
      category.value = 0

   }
   if (route.query["filters[count_rooms]"]) {
      if (Array.isArray(route.query["filters[count_rooms]"])) {
         roomsChecked.value = route.query["filters[count_rooms]"].map(item => +item)
      } else {
         roomsChecked.value = [+route.query["filters[count_rooms]"]]
      }
   }
   if (route.query["filters[apartaments][count_rooms]"]) {
      if (Array.isArray(route.query["filters[apartaments][count_rooms]"])) {
         roomsChecked.value = route.query["filters[apartaments][count_rooms]"].map(item => +item)
      } else {
         roomsChecked.value = [+route.query["filters[apartaments][count_rooms]"]]
      }
   }
   if (route.query["filters[square_apartament][$gte]"]) {
      areaMinValue.value = +route.query["filters[square_apartament][$gte]"]
   }
   if (route.query["filters[apartaments][square_apartament][$gte]"]) {
      areaMinValue.value = +route.query["filters[apartaments][square_apartament][$gte]"]
   }
   if (route.query["filters[square_apartament][$lte]"] || route.query["filters[apartaments][square_apartament][$lte]"]) {
      areaMaxValue.value = +route.query["filters[square_apartament][$lte]"] || +route.query["filters[apartaments][square_apartament][$lte]"]
   }
   if (route.query["filters[cost_total][$gte]"]) {
      priceMinValue.value = +route.query["filters[cost_total][$gte]"]
   }
   if (route.query["filters[apartaments][cost_total][$gte]"]) {
      priceMinValue.value = +route.query["filters[apartaments][cost_total][$gte]"]
   }
   if (route.query["filters[cost_total][$lte]"] || route.query["filters[apartaments][cost_total][$lte]"]) {
      priceMaxValue.value = +route.query["filters[cost_total][$lte]"] || +route.query["filters[apartaments][cost_total][$lte]"]
   }

   if (route.query["filters[cost_total_m2][$gte]"]) {
      priceForOneMinValue.value = +route.query["filters[cost_total_m2][$gte]"]
   }
   if (route.query["filters[apartaments][cost_total_m2][$gte]"]) {
      priceForOneMinValue.value = +route.query["filters[apartaments][cost_total_m2][$gte]"]
   }
   if (route.query["filters[cost_total_m2][$lte]"] || route.query["filters[apartaments][cost_total_m2][$lte]"]) {
      priceForOneMaxValue.value = +route.query["filters[cost_total_m2][$lte]"] || +route.query["filters[apartaments][cost_total_m2][$lte]"]
   }
   if (route.query["filters[cost_total_m2][$gte]"] || route.query["filters[apartaments][cost_total_m2][$gte]"] || route.query["filters[cost_total_m2][$lte]"] || route.query["filters[apartaments][cost_total_m2][$lte]"]) {
      priceType.value = 1
   }






   if (route.query["filters[finishing]"]) {

      if (Array.isArray(route.query["filters[finishing]"])) {
         let arr = route.query["filters[finishing]"];
         arr.forEach((q, i) => {
            repair.value[i] = repairSettings.value.options.find(item => item.name == q)
         })
      } else {
         repair.value[0] = repairSettings.value.options.find(item => item.name == route.query["filters[finishing]"])
      }
   }
   if (route.query["filters[apartaments][finishing]"]) {

      if (Array.isArray(route.query["filters[apartaments][finishing]"])) {
         let arr = route.query["filters[apartaments][finishing]"];
         arr.forEach((q, i) => {
            repair.value[i] = repairSettings.value.options.find(item => item.name == q)
         })
      } else {
         repair.value[0] = repairSettings.value.options.find(item => item.name == route.query["filters[apartaments][finishing]"])
      }
   }


   if (route.query["filters[proekty][date_complete]"]) {

      if (Array.isArray(route.query["filters[proekty][date_complete]"])) {
         let arr = route.query["filters[proekty][date_complete]"];
         arr.forEach((q, i) => {
            dates.value[i] = dateSettings.value.options.find(item => item.name == q)
         })
      } else {
         dates.value[0] = dateSettings.value.options.find(item => item.name == route.query["filters[proekty][date_complete]"])
      }
   }
   if (route.query["filters[apartaments][proekty][date_complete]"]) {

      if (Array.isArray(route.query["filters[apartaments][proekty][date_complete]"])) {
         let arr = route.query["filters[apartaments][proekty][date_complete]"];
         arr.forEach((q, i) => {
            dates.value[i] = dateSettings.value.options.find(item => item.name == q)
         })
      } else {
         dates.value[0] = dateSettings.value.options.find(item => item.name == route.query["filters[apartaments][proekty][date_complete]"])
      }
   }

   if (route.query["filters[proekty][name]"]) {

      if (Array.isArray(route.query["filters[proekty][name]"])) {
         let arr = route.query["filters[proekty][name]"];
         arr.forEach((q, i) => {
            projects.value[i] = projectsSettings.value.options.find(item => item.name == q)
         })
      } else {

         projects.value[0] = projectsSettings.value.options.find(item => item.name == route.query["filters[proekty][name]"])
      }
   }

   if (route.query["filters[apartaments][proekty][name]"]) {

      if (Array.isArray(route.query["filters[apartaments][proekty][name]"])) {
         let arr = route.query["filters[apartaments][proekty][name]"];
         arr.forEach((q, i) => {
            projects.value[i] = projectsSettings.value.options.find(item => item.name == q)
         })
      } else {
         console.log(projectsSettings.value.options.find(item => item.name == route.query["filters[apartaments][proekty][name]"]));
         projects.value[0] = projectsSettings.value.options.find(item => item.name == route.query["filters[apartaments][proekty][name]"])
      }
   }

   if (route.query["filters[proekty][metro_nearby][name]"]) {

      if (Array.isArray(route.query["filters[proekty][metro_nearby][name]"])) {
         let arr = route.query["filters[proekty][metro_nearby][name]"];
         arr.forEach((q, i) => {
            metro.value[i] = metroSettings.value.options.find(item => item.name == q)
         })
      } else {
         metro.value[0] = metroSettings.value.options.find(item => item.name == route.query["filters[proekty][metro_nearby][name]"])
      }
   }

   if (route.query["filters[apartaments][proekty][metro_nearby][name]"]) {

      if (Array.isArray(route.query["filters[apartaments][proekty][metro_nearby][name]"])) {
         let arr = route.query["filters[apartaments][proekty][metro_nearby][name]"];
         arr.forEach((q, i) => {
            metro.value[i] = metroSettings.value.options.find(item => item.name == q)
         })
      } else {
         metro.value[0] = metroSettings.value.options.find(item => item.name == route.query["filters[apartaments][proekty][metro_nearby][name]"])
      }
   }




   if (route.query["filters[floor]"]) {

      if (Array.isArray(route.query["filters[floor]"])) {
         let arr = route.query["filters[floor]"];
         arr.forEach((q, i) => {
            floor.value[i] = floorSettings.value.options.find(item => item.name == q)
         })
      } else {
         floor.value[0] = floorSettings.value.options.find(item => item.name == route.query["filters[floor]"])
      }
   }
   if (route.query["filters[apartaments][floor]"]) {

      if (Array.isArray(route.query["filters[apartaments][floor]"])) {
         let arr = route.query["filters[apartaments][floor]"];
         arr.forEach((q, i) => {
            floor.value[i] = floorSettings.value.options.find(item => item.name == q)
         })
      } else {
         floor.value[0] = floorSettings.value.options.find(item => item.name == route.query["filters[apartaments][floor]"])
      }
   }





   if (route.query["filters[proekty][district]"]) {

      if (Array.isArray(route.query["filters[proekty][district]"])) {
         let arr = route.query["filters[proekty][district]"];
         arr.forEach((q, i) => {
            placement.value[i] = placementSettings.value.options.find(item => item.name == q)
         })
      } else {
         placement.value[0] = placementSettings.value.options.find(item => item.name == route.query["filters[proekty][district]"])
      }
   }
   if (route.query["filters[apartaments][proekty][district]"]) {

      if (Array.isArray(route.query["filters[apartaments][proekty][district]"])) {
         let arr = route.query["filters[apartaments][proekty][district]"];
         arr.forEach((q, i) => {
            placement.value[i] = placementSettings.value.options.find(item => item.name == q)
         })
      } else {
         placement.value[0] = placementSettings.value.options.find(item => item.name == route.query["filters[apartaments][proekty][district]"])
      }
   }



   if (route.query["filters[ring_road]"]) {

      if (Array.isArray(route.query["filters[ring_road]"])) {
         let arr = route.query["filters[ring_road]"];
         arr.forEach((q, i) => {
            transport.value[i] = transportSettings.value.options.find(item => item.name == q)
         })
      } else {
         transport.value[0] = transportSettings.value.options.find(item => item.name == route.query["filters[ring_road]"])
      }
   }
   if (route.query["filters[apartaments][ring_road]"]) {

      if (Array.isArray(route.query["filters[apartaments][ring_road]"])) {
         let arr = route.query["filters[apartaments][ring_road]"];
         arr.forEach((q, i) => {
            transport.value[i] = transportSettings.value.options.find(item => item.name == q)
         })
      } else {
         transport.value[0] = transportSettings.value.options.find(item => item.name == route.query["filters[apartaments][ring_road]"])
      }
   }



   if (route.query["filters[appointment]"]) {

      if (Array.isArray(route.query["filters[appointment]"])) {
         let arr = route.query["filters[appointment]"];
         arr.forEach((q, i) => {
            target.value[i] = targetSettings.value.options.find(item => item.name == q)
         })
      } else {
         target.value[0] = targetSettings.value.options.find(item => item.name == route.query["filters[appointment]"])
      }
   }
   if (route.query["filters[apartaments][appointment]"]) {

      if (Array.isArray(route.query["filters[apartaments][appointment]"])) {
         let arr = route.query["filters[apartaments][appointment]"];
         arr.forEach((q, i) => {
            target.value[i] = targetSettings.value.options.find(item => item.name == q)
         })
      } else {
         target.value[0] = targetSettings.value.options.find(item => item.name == route.query["filters[apartaments][appointment]"])
      }
   }





   if (route.query["filters[entrance]"]) {

      if (Array.isArray(route.query["filters[entrance]"])) {
         let arr = route.query["filters[entrance]"];
         arr.forEach((q, i) => {
            entry.value[i] = entrySettings.value.options.find(item => item.name == q)
         })
      } else {
         entry.value[0] = entrySettings.value.options.find(item => item.name == route.query["filters[entrance]"])
      }
   }
   if (route.query["filters[apartaments][entrance]"]) {

      if (Array.isArray(route.query["filters[apartaments][entrance]"])) {
         let arr = route.query["filters[apartaments][entrance]"];
         arr.forEach((q, i) => {
            entry.value[i] = entrySettings.value.options.find(item => item.name == q)
         })
      } else {
         entry.value[0] = entrySettings.value.options.find(item => item.name == route.query["filters[apartaments][entrance]"])
      }
   }






   if (route.query['filters[proekty][ap_tags][tag][$eq]']) {
      if (Array.isArray(route.query['filters[proekty][ap_tags][tag][$eq]'])) {
         checkedOptions.value = route.query['filters[proekty][ap_tags][tag][$eq]'].map(item => item)
      } else {
         checkedOptions.value = [route.query['filters[proekty][ap_tags][tag][$eq]']]
      }
   }
   if (route.query['filters[apartaments][proekty][ap_tags][tag][$eq]']) {
      if (Array.isArray(route.query['filters[apartaments][proekty][ap_tags][tag][$eq]'])) {
         checkedOptions.value = route.query['filters[apartaments][proekty][ap_tags][tag][$eq]'].map(item => item)
      } else {
         checkedOptions.value = [route.query['filters[apartaments][proekty][ap_tags][tag][$eq]']]
      }
   }
}
const setCat = async () => {
   loading.value = true
   let response = await catalog.getFiltersForCats(category.value, props.type);
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
   // set floors
   floorSettings.value.options = obj?.floors
   // set location
   placementSettings.value.options = obj?.location
   // set transport
   transportSettings.value.options = obj?.transport
   // set target
   targetSettings.value.options = obj?.target
   // set entry
   entrySettings.value.options = obj?.entry

   // set entry
   projectsSettings.value.options = obj?.projects
   // set entry
   metroSettings.value.options = obj?.metro





   // set entry
   options.value = obj?.tags

   loading.value = false

}
onMounted(async () => {
   if (props.fromHome) {
      await setCat()
      return
   }
   await setCat()
   getFiltersFromQuery()
   await search()

})
watch(() => props.reset, async (value) => {
   if (value) {
      resetFilters()
      await search()
   }
})
const resetFilters = async () => {
   // set ranges
   priceMinValue.value = priceMin.value
   priceMaxValue.value = priceMax.value

   priceForOneMinValue.value = priceForOneMin.value
   priceForOneMaxValue.value = priceForOneMax.value

   areaMinValue.value = areaMin.value
   areaMaxValue.value = areaMax.value

   // set repair
   repair.value = [{
      name: "Любая",
      value: 0,
   }]
   // set sroks
   dates.value = [
      {
         name: "Не важно",
         value: 0,
      },
   ]

   // set floors
   floor.value = [
      {
         name: "Не важно",
         value: 0,
      },
   ]
   // set location
   placement.value = [{
      name: "Не важно",
      value: 0,
   }]
   // set transport
   transport.value = [{
      name: "Не важно",
      value: 0,
   }]

   // set target
   target.value = [
      {
         name: "Не важно",
         value: 0,
      },
   ]
   // set entry
   entry.value = [
      {
         name: "Не важно",
         value: 0,
      },
   ]
   projects.value = [
      {
         name: "Не важно",
         value: 0,
      },
   ]
   roomsChecked.value = []
   checkedOptions.value = []
   await search()

}
const filtersCount = computed(() => {
   let int = 0;
   if (roomsChecked.value?.length) {
      int++
   }
   if (areaMinValue.value !== areaMin.value) {
      int++
   }
   if (areaMaxValue.value !== areaMax.value) {
      int++
   }
   if (priceMinValue.value !== priceMin.value) {
      int++
   }
   if (priceMaxValue.value !== priceMax.value) {
      int++
   }
   if (repair.value[0].value !== 0) {
      int++
   }
   if (dates.value[0].value !== 0) {
      int++
   }
   if (target.value[0].value !== 0) {
      int++
   }
   if (entry.value[0].value !== 0) {
      int++
   }
   if (transport.value[0].value !== 0) {
      int++
   }
   if (floor.value[0].value !== 0) {
      int++
   }
   if (entry.value[0].value !== 0) {
      int++
   }
   if (checkedOptions.value.length) {
      int++
   }
   return int
})

watch(filtersCount, (value) => {
   emit('update:filtersCount', value)
})


watch(() => props.isSearchingMap, (value) => {
   if (value) {
      search('map')
   }
})
</script>


<style lang="scss">
.all-filters {
   svg path {
      fill: black;
   }
}

.sort {
   &:has(.open) {
      display: flex !important;
   }
}

.map {
   overflow: hidden;

   .circle {
      --size: 32px;
   }
}
</style>
