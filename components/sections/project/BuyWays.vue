<template>
   <section class="buy-ways">
      <div class="container">
         <div class="buy-ways__wrapper">
            <h2 class="buy-ways__title h1 dark-title">способы <span>покупки</span></h2>
            <div class="buy-ways__main">
               <ul class="app-tabs">
                  <li v-for="item in tabs" :key="item">
                     <input type="radio" name="projectbuyways" :value="item.value" :id="'project' + item.name"
                        v-model="tab">
                     <label :for="'project' + item.name">{{ item.name }}</label>
                  </li>
               </ul>
               <div class="buy-ways__row">
                  <div class="buy-ways__form" ref="form">
                     <h3 class="buy-ways__subtitle">{{ tab == 0 ? 'Ипотека' : 'Рассрочка' }}</h3>
                     <ul class="buy-ways__filters">
                        <li>
                           <span>Проект</span>
                           <UiSelect :settings="projectSettings" @selectOption="onSelectProjectOption" />
                        </li>
                        <li v-if="tab == 0">
                           <span>Программа ипотеки</span>
                           <UiSelect :settings="ipotekaSettings" @selectOption="onSelectIpotekaOption" />
                        </li>
                        <li>
                           <span>Стоимость недвижимости</span>
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
                        <li>
                           <span>Первоначальный взнос</span>
                           <div class="catalog-range">
                              <div class="catalog-range__output">
                                 <!-- <input type="number" v-model="priceMinValue"> -->
                                 <span>{{ formatPrice(initialMinValue) }}</span>
                                 <!-- <input type="number" v-model="priceMaxValue"> -->
                                 <span>{{ formatPrice(initialMaxValue) }}</span>
                              </div>
                              <MultiRangeSlider :ruler="false" :min="initialMin" :max="initialMax" :step="10000"
                                 :minValue="initialMinValue" :maxValue="initialMaxValue" @input="UpdateInitial" />
                           </div>
                        </li>
                        <li>
                           <span>Срок</span>
                           <div class="catalog-range">
                              <div class="catalog-range__output">
                                 <!-- <input type="number" v-model="priceMinValue"> -->
                                 <span>{{ formatPrice(dateMinValue) }}</span>
                                 <!-- <input type="number" v-model="priceMaxValue"> -->
                                 <span>{{ formatPrice(dateMaxValue) }}</span>
                              </div>
                              <MultiRangeSlider :ruler="false" :min="dateMin" :max="dateMax" :step="10000"
                                 :minValue="dateMinValue" :maxValue="dateMaxValue" @input="UpdateDate" />
                           </div>

                        </li>
                        <li v-if="tab == 0">
                           <span>Банки</span>
                           <UiSelect :settings="banksSettings" @selectOption="onSelectBanksOption" />
                        </li>
                     </ul>
                     <UiButton class="black">Оставить заявку</UiButton>
                  </div>
                  <div class="buy-ways__content" :style="{ height: formHeight + 'px' }" v-if="tab == 0">
                     <BannersIpoteka />
                     <div class="buy-ways__items">
                        <div class="buy-ways__cats">
                           <UiSelect :settings="sortSettings" @selectOption="onSelectSortOption" />
                           <span class="desktop">Ставка</span>
                           <span class="desktop">Срок</span>
                           <span class="desktop">Ежемесячный платеж</span>
                           <span>15 предложений</span>
                        </div>

                        <ul class="buy-ways__list scrollbar-none">
                           <li v-for="item in 10" :key="item">
                              <CardsBuyWaysIpoteka />
                           </li>
                        </ul>
                     </div>
                  </div>
                  <div class="buy-ways__content" v-else>
                     <div class="buy-ways__items">
                        <div class="buy-ways__cats buy-ways__cats_instal">
                           <span>Срок</span>
                           <span>Первый взнос</span>
                           <span>Ставка</span>
                           <span>Периодичность платежей</span>
                           <span>Сумма платежа </span>
                        </div>
                        <ul class="buy-ways__list buy-ways__list_instal scrollbar-none">
                           <li v-for="item in 20" :key="item">
                              <CardsBuyWaysInstallment />
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </section>
</template>
<script setup>
import MultiRangeSlider from "multi-range-slider-vue";
const tabs = ref([
   {
      name: "Рассчитайте ипотеку",
      value: 0
   },
   {
      name: "Рассчитайте рассрочку",
      value: 1
   },
])
const tab = ref(0)


const projectSettings = ref({
   options: [
      {
         name: "Luzhniki Collection",
         value: 0,
         selected: true
      },
      {
         name: "Luzhniki Collection 1",
         value: 1,
      },
      {
         name: "Luzhniki Collection 2",
         value: 2,
      },
   ],
   placeholder: ""
})
const projectOption = ref(null)
function onSelectProjectOption(option) {
   projectOption.value = option
}
const ipotekaSettings = ref({
   options: [
      {
         name: "Все программы",
         value: 0,
         selected: true
      },
      {
         name: "Все программы 1",
         value: 1,
      },
      {
         name: "Все программы 2",
         value: 2,
      },
   ],
   placeholder: ""
})
const ipotekaOption = ref(null)
function onSelectIpotekaOption(option) {
   ipotekaOption.value = option
}
const banksSettings = ref({
   options: [
      {
         name: "Все банки",
         value: 0,
         selected: true
      },
      {
         name: "Все банки 1",
         value: 1,
      },
      {
         name: "Все банки 2",
         value: 2,
      },
   ],
   placeholder: ""
})
const banksOption = ref(null)
function onSelectBanksOption(option) {
   banksOption.value = option
}
const sortSettings = ref({
   options: [
      {
         name: "По умолчанию",
         value: 0,
         selected: true
      },
      {
         name: "По убыванию",
         value: 1,
      },
      {
         name: "По возрастанию",
         value: 2,
      },
   ],
   placeholder: ""
})
const sortOption = ref(null)
function onSelectSortOption(option) {
   sortOption.value = option
}


const priceMin = ref(0)
const priceMax = ref(50000000)
const priceMinValue = ref(priceMin.value)
const priceMaxValue = ref(priceMax.value)
const UpdatePrices = (e) => {
   priceMinValue.value = e.minValue
   priceMaxValue.value = e.maxValue
}
const initialMin = ref(0)
const initialMax = ref(50000000)
const initialMinValue = ref(initialMin.value)
const initialMaxValue = ref(initialMax.value)
const UpdateInitial = (e) => {
   initialMinValue.value = e.minValue
   initialMaxValue.value = e.maxValue
}
const dateMin = ref(0)
const dateMax = ref(50000000)
const dateMinValue = ref(dateMin.value)
const dateMaxValue = ref(dateMax.value)
const UpdateDate = (e) => {
   dateMinValue.value = e.minValue
   dateMaxValue.value = e.maxValue
}



const formHeight = ref(0)
const form = ref(null)
onMounted(() => {
   formHeight.value = form.value.clientHeight;
})
</script>