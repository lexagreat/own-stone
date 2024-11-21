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

                        <li class="catalog-filter" id="RoomsCount">
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
                        <li class="catalog-filter">
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
                        <li class="catalog-filter">
                           <span class="catalog-filter__title">Срок сдачи</span>
                           <UiSelect :settings="dateSettings" @selectOption="onSelectDateOption" />
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
                           <UiButton class="black">Показать 1 100 предложений</UiButton>
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
      <SectionsProductSlider white-btns>
         ТИПЫ <span>планировок</span>
      </SectionsProductSlider>
      <BannersProjectMoreInfo />
   </section>
</template>
<script setup>
import MultiRangeSlider from "multi-range-slider-vue";
import { formatNumber, formatPrice } from "~/utils/formattingNumbers";
import ArrowDownIcon from '@/assets/img/icons/arrow_down.svg'
import FilterIcon from '@/assets/img/icons/filter.svg'
const isOpenModal = ref(false)
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
</script>


<style lang="scss">
.all-filters {
   svg path {
      fill: black;
   }
}
</style>