<template>
   <div class="catalog-filters scrollbar-none" :class="{ open: isOpenModal, 'catalog-filters_catalog': fromCatalog }">
      <div class="catalog-filters__header">
         <button class="circle circle40" @click="emit('closeModal')">
            <ArrowDownIcon style="rotate: 90deg;" />
         </button>
         <h3 class="catalog-filters__title">Фильтр</h3>
         <button class="catalog-filters__reset">Сбросить все</button>
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
            <li class="catalog-filter" v-if="type !== 'commerce'">
               <span class="catalog-filter__title">Количество комнат</span>
               <ul class="catalog-filter__rooms">
                  <li v-for="item in 5">
                     <input v-model="roomsChecked" type="checkbox" :value="item" :id="'catalogFilterRooms' + item"
                        name="catalogFilterRooms">
                     <label class="circle" :for="'catalogFilterRooms' + item">{{ item }} {{ item == 5 ? "+" : ""
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
                  <MultiRangeSlider :ruler="false" :min="areaMin" :max="areaMax" :step="10" :minValue="areaMinValue"
                     :maxValue="areaMaxValue" @input="UpdateAreas" />
               </div>
            </li>
            <li class="catalog-filter" v-if="type !== 'commerce'">
               <span class="catalog-filter__title">Отделка</span>
               <UiSelect title="Отделка" :settings="repairSettings" @selectOption="onSelectRepairOption" />
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
               <UiSelect title="Назначение" :settings="targetSettings" @selectOption="onSelectTargetOption" />
            </li>
            <li class="catalog-filter" v-if="type !== 'secondary'">
               <span class="catalog-filter__title">Срок сдачи</span>
               <UiSelect title="Срок сдачи" :settings="dateSettings" @selectOption="onSelectDateOption" />
            </li>
            <li class="catalog-filter" v-if="!fromHome">
               <span class="catalog-filter__title">Локация</span>
               <UiSelect title="Локация" :settings="placementSettings" @selectOption="onSelectPlacementOption" />
            </li>
            <li class="catalog-filter" v-if="fromHome">
               <span class="catalog-filter__title">Расположение</span>
               <UiPlacementSelect title="Расположение" />
            </li>
            <li class="catalog-filter" v-if="!fromHome">
               <span class="catalog-filter__title">Внутри транспортных колец</span>
               <UiSelect title="Внутри транспортных колец" :settings="transportSettings"
                  @selectOption="onSelectTransportOption" />
            </li>
            <li class="catalog-filter" v-if="type == 'commerce'">
               <span class="catalog-filter__title">Этаж</span>
               <UiSelect title="Этаж" :settings="floorSettings" @selectOption="onSelectFloorOption" />
            </li>
            <li class="catalog-filter" v-if="type == 'commerce'">
               <span class="catalog-filter__title">Вход</span>
               <UiSelect title="Вход" :settings="entrySettings" @selectOption="onSelectEntryOption" />
            </li>
            <li class="catalog-filter">
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
               <UiButton class="white map" v-if="!fromCatalog">
                  <img src="@/assets/img/icons/btn-map.png" alt="">
                  <span>На карте</span>
               </UiButton>
               <UiButton class="black" @click="search">Показать все</UiButton>
            </li>
         </ul>
         <div class="catalog-filters__sticky">
            <UiButton class="black">Показать все</UiButton>
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
   products: Array,
   filters: Object
})
const emit = defineEmits(["closeModal", "setCat", "changeType", "search",])
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
      name: "Квартиры",
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
         selected: true
      },
   ],
   placeholder: ""
})
const repairOption = ref(null)
function onSelectRepairOption(option) {
   console.log("select repair option", option);
   repairOption.value = option
}
const placementSettings = ref({
   options: [
      {
         name: "Не важно",
         value: 0,
         selected: true
      },
      {
         name: "Важно",
         value: 1,
      },
   ],
   placeholder: ""
})
const placementOption = ref(null)
function onSelectPlacementOption(option) {
   placementOption.value = option
}
const transportSettings = ref({
   options: [
      {
         name: "Не важно",
         value: 0,
         selected: true
      },
      {
         name: "Важно",
         value: 1,
      },
   ],
   placeholder: ""
})
const transportOption = ref(null)
function onSelectTransportOption(option) {
   transportOption.value = option
}
const dateSettings = ref({
   options: [
      {
         name: "Не важно",
         value: 0,
         selected: true
      },
   ],
   placeholder: ""
})
const dateOption = ref(null)
function onSelectDateOption(option) {
   dateOption.value = option
}
const targetSettings = ref({
   options: [
      {
         name: "Не важно",
         value: 0,
         selected: true
      },
      {
         name: "Важно",
         value: 1,
      },
   ],
   placeholder: ""
})
const targetOption = ref(null)
function onSelectTargetOption(option) {
   targetOption.value = option
}
const floorSettings = ref({
   options: [
      {
         name: "Не важно",
         value: 0,
         selected: true
      },
      {
         name: "Важно",
         value: 1,
      },
   ],
   placeholder: ""
})
const floorOption = ref(null)
function onSelectFloorOption(option) {
   floorOption.value = option
}
const entrySettings = ref({
   options: [
      {
         name: "Не важно",
         value: 0,
         selected: true
      },
      {
         name: "Важно",
         value: 1,
      },
   ],
   placeholder: ""
})
const entryOption = ref(null)
function onSelectEntryOption(option) {
   entryOption.value = option
}



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


const options = ref([])
const checkedOptions = ref([])

watch(() => props.isOpenModal, (value) => {
   if (value) {
      bodyLock()
   } else {
      bodyUnlock()
   }
})
watch(() => props.type, (value) => {
   myType.value = value
})
watch(myType, (value) => {
   emit("changeType", value)
})

// const categoryCard = computed(() => { // не нужно вроде
//    if (props.type == 'secondary') {
//       return 0
//    }
//    return category.value
// })
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
   obj.repair = repairOption.value
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
   obj.date = dateOption.value
   obj.floor = floorOption.value
   obj.placement = placementOption.value
   obj.transport = transportOption.value
   obj.target = targetOption.value
   obj.entry = entryOption.value
   obj.tags = checkedOptions.value
   return obj
})
const search = async () => {
   // console.log('category', category.value);
   // console.log("props.type", props.type);
   if (props.type == 'secondary') {
      category.value = 1
   }
   emit('setCat', category.value)
   if (route.query["filters[category]"] == 'apartaments' && category.value == 0 || route.query["filters[category]"] == 'projects' && category.value == 1) {
      await setCat()
   }
   console.log('3. search');
   const url = catalog.getUrl(filtersObject.value)
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
   if (route.query["filters[finishing]"] || route.query["filters[apartaments][finishing]"]) {
      repairSettings.value.options.forEach(item => {
         if (item.name == (route.query["filters[finishing]"] || route.query["filters[apartaments][finishing]"])) {
            item.selected = true
         } else {
            item.selected = false
         }
      });
      console.log(repairSettings.value.options);
      onSelectRepairOption(repairSettings.value.options.filter(item => item.name == (route.query["filters[finishing]"] || route.query["filters[apartaments][finishing]"]))[0])
   }
   if (route.query["filters[proekty][date_complete]"] || route.query["filters[apartaments][proekty][date_complete]"]) {
      dateSettings.value.options.forEach(item => {
         if (item.name == (route.query["filters[proekty][date_complete]"] || route.query["filters[apartaments][proekty][date_complete]"])) {
            item.selected = true
         } else {
            item.selected = false
         }
      });
      onSelectDateOption(dateSettings.value.options.filter(item => item.name == (route.query["filters[proekty][date_complete]"] || route.query["filters[apartaments][proekty][date_complete]"]))[0])
   }
   if (route.query["filters[floor]"] || route.query["filters[apartaments][floor]"]) {
      floorSettings.value.options.forEach(item => {
         if (item.name == (route.query["filters[floor]"] || route.query["filters[apartaments][floor]"])) {
            item.selected = true
         } else {
            item.selected = false
         }
      });
      onSelectFloorOption(floorSettings.value.options.filter(item => item.name == (route.query["filters[floor]"] || route.query["filters[apartaments][floor]"]))[0])
   }
   if (route.query["filters[location]"] || route.query["filters[apartaments][location]"]) {
      placementSettings.value.options.forEach(item => {
         if (item.name == (route.query["filters[location]"] || route.query["filters[apartaments][location]"])) {
            item.selected = true
         } else {
            item.selected = false
         }
      });
      onSelectPlacementOption(placementSettings.value.options.filter(item => item.name == (route.query["filters[location]"] || route.query["filters[apartaments][location]"]))[0])
   }
   if (route.query["filters[ring_road]"] || route.query["filters[apartaments][ring_road]"]) {
      transportSettings.value.options.forEach(item => {
         if (item.name == (route.query["filters[ring_road]"] || route.query["filters[apartaments][ring_road]"])) {
            item.selected = true
         } else {
            item.selected = false
         }
      });
      onSelectTransportOption(transportSettings.value.options.filter(item => item.name == (route.query["filters[ring_road]"] || route.query["filters[apartaments][ring_road]"]))[0])
   }
   if (route.query["filters[appointment]"] || route.query["filters[apartaments][appointment]"]) {
      targetSettings.value.options.forEach(item => {
         if (item.name == (route.query["filters[appointment]"] || route.query["filters[apartaments][appointment]"])) {
            item.selected = true
         } else {
            item.selected = false
         }
      });
      onSelectTargetOption(targetSettings.value.options.filter(item => item.name == (route.query["filters[appointment]"] || route.query["filters[apartaments][appointment]"]))[0])
   }
   if (route.query["filters[entrance]"] || route.query["filters[apartaments][entrance]"]) {
      entrySettings.value.options.forEach(item => {
         if (item.name == (route.query["filters[entrance]"] || route.query["filters[apartaments][entrance]"])) {
            item.selected = true
         } else {
            item.selected = false
         }
      });
      onSelectEntryOption(entrySettings.value.options.filter(item => item.name == (route.query["filters[entrance]"] || route.query["filters[apartaments][entrance]"]))[0])
   }

   if (route.query['filters[ap_tags][tag][$eq]']) {
      if (Array.isArray(route.query['filters[ap_tags][tag][$eq]'])) {
         checkedOptions.value = route.query['filters[ap_tags][tag][$eq]'].map(item => item)
      } else {
         checkedOptions.value = [route.query['filters[ap_tags][tag][$eq]']]
      }
   }
   if (route.query['filters[apartaments][ap_tags][tag][$eq]']) {
      if (Array.isArray(route.query['filters[apartaments][ap_tags][tag][$eq]'])) {
         checkedOptions.value = route.query['filters[apartaments][ap_tags][tag][$eq]'].map(item => item)
      } else {
         checkedOptions.value = [route.query['filters[apartaments][ap_tags][tag][$eq]']]
      }
   }
}
const setCat = async () => {

   let response = await catalog.getFiltersForCats(category.value, props.type);
   console.log("1. filters from cat", response);
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
   options.value = obj?.tags

   console.log("2. set filters");
}
onMounted(async () => {
   await setCat()
   getFiltersFromQuery()
   await search()

})
</script>


<style lang="scss">
.all-filters {
   svg path {
      fill: black;
   }
}
</style>