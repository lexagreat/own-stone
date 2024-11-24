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
               <UiSelect :settings="repairSettings" @selectOption="onSelectRepairOption" />
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
               <UiSelect :settings="targetSettings" @selectOption="onSelectTargetOption" />
            </li>
            <li class="catalog-filter" v-if="type !== 'secondary'">
               <span class="catalog-filter__title">Срок сдачи</span>
               <UiSelect :settings="dateSettings" @selectOption="onSelectDateOption" />
            </li>
            <li class="catalog-filter">
               <span class="catalog-filter__title">Локация</span>
               <UiSelect :settings="placementSettings" @selectOption="onSelectPlacementOption" />
            </li>
            <li class="catalog-filter">
               <span class="catalog-filter__title">Внутри транспортных колец</span>
               <UiSelect :settings="transportSettings" @selectOption="onSelectTransportOption" />
            </li>
            <li class="catalog-filter" v-if="type == 'commerce'">
               <span class="catalog-filter__title">Этаж</span>
               <UiSelect :settings="floorSettings" @selectOption="onSelectFloorOption" />
            </li>
            <li class="catalog-filter" v-if="type == 'commerce'">
               <span class="catalog-filter__title">Вход</span>
               <UiSelect :settings="entrySettings" @selectOption="onSelectEntryOption" />
            </li>
            <li class="catalog-filter">
               <span class="catalog-filter__title"></span>
               <ul class="catalog-filter__options catalog-filter__rooms">
                  <li v-for="item in filteredOptions">
                     <input v-model="checkedOptions" type="checkbox" :value="item.value"
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
               <UiButton class="black">Показать 1 100 предложений</UiButton>
            </li>
         </ul>
      </div>
   </div>
</template>
<script setup>
import MultiRangeSlider from "multi-range-slider-vue";
import { formatNumber, formatPrice } from "~/utils/formattingNumbers";
import IconFilter from '@/assets/img/icons/filter.svg'
import ArrowDownIcon from '@/assets/img/icons/arrow_down.svg'
const props = defineProps({
   isOpenModal: Boolean,
   type: String,
   fromCatalog: Boolean
})
const emit = defineEmits(["closeModal", "changeCategory"])
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
const myType = ref(0)

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
      {
         name: "Без ремонта",
         value: 1,
      },
      {
         name: "С ремонтом",
         value: 2,
      },
   ],
   placeholder: ""
})
const repairOption = ref(null)
function onSelectRepairOption(option) {
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
      {
         name: "Важно",
         value: 1,
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


const options = ref([
   {
      name: "Старт продаж",
      value: 0,
      types: [
         "build",
         "commerce",
      ]
   },
   {
      name: "В Хамовниках",
      value: 1,
      types: [
         "build",
      ]
   },
   {
      name: "Вид на парк",
      value: 2,
      types: [
         "build",
      ]
   },
   {
      name: "Цена снижена",
      value: 3,
      types: [
         "secondary",
      ]
   },
   {
      name: "Эксклюзив",
      value: 4,
      types: [
         "secondary",
      ]
   },
])
const checkedOptions = ref([])
const filteredOptions = computed(() => {
   return options.value.filter(item => {
      return item.types.includes(props.type)
   })
})

watch(() => props.isOpenModal, (value) => {
   if (value) {
      bodyLock()
   } else {
      bodyUnlock()
   }
})


const categoryCard = computed(() => {
   if (props.type == 'secondary') {
      return 0
   }
   return category.value
})
watch(categoryCard, (value) => {
   emit('changeCategory', value)
})

</script>


<style lang="scss">
.all-filters {
   svg path {
      fill: black;
   }
}
</style>