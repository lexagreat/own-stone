<template>
   <section class="buy-ways">
      <ModalBuyways :is-open="isOpenModal" @close-popup="isOpenModal = false" :info="formInfo" />
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
                           <FormInput placeholder="Проект" v-model="projectValue" disabled />
                        </li>
                        <li v-if="tab == 0">
                           <span>Программа ипотеки</span>
                           <UiCatalogSelect :settings="ipotekaSettings" v-model="ipoteka" />
                        </li>
                        <li>
                           <span>Стоимость недвижимости</span>
                           <div class="catalog-range">
                              <div class="catalog-range__output">
                                 <!-- <span>{{ formatPrice(priceMaxValue) }}</span> -->
                                 <input type="number" v-model="priceMaxValue">

                              </div>
                              <MultiRangeSlider :ruler="false" :min="priceMin" :max="priceMax" :step="10000"
                                 :minValue="priceMinValue" :maxValue="priceMaxValue" @input="UpdatePrices" />
                           </div>
                        </li>
                        <li>
                           <span>Первоначальный взнос</span>
                           <div class="catalog-range">
                              <div class="catalog-range__output">
                                 <!-- <span>{{ initialMaxValue }} %</span> -->
                                 <input type="number" v-model="initialMaxValue">

                              </div>
                              <MultiRangeSlider :ruler="false" :min="initialMin" :max="initialMax" :step="1"
                                 :minValue="initialMinValue" :maxValue="initialMaxValue" @input="UpdateInitial" />
                           </div>
                        </li>
                        <li>
                           <span>Срок</span>
                           <div class="catalog-range">
                              <div class="catalog-range__output">
                                 <!-- <span>{{ dateMaxValue }} {{ morph(dateMaxValue, ['год', 'года', 'лет']) }}</span> -->
                                 <input type="number" v-model="dateMaxValue">

                              </div>
                              <MultiRangeSlider :ruler="false" :min="dateMin" :max="dateMax" :step="1"
                                 :minValue="dateMinValue" :maxValue="dateMaxValue" @input="UpdateDate" />
                           </div>

                        </li>
                        <li v-if="tab == 0">
                           <span>Банки</span>
                           <UiCatalogSelect :settings="banksSettings" v-model="banks" />

                        </li>
                     </ul>
                     <UiButton class="black" @click="search">Показать предложения</UiButton>
                  </div>
                  <div class="buy-ways__content" v-if="tab == 0">
                     <BannersIpoteka @form="onForm" />
                     <div class="buy-ways__items">
                        <div class="buy-ways__cats">
                           <!-- <UiSelect :settings="sortSettings" @selectOption="onSelectSortOption" /> -->
                           <span class="desktop">Ставка</span>
                           <span class="desktop">Срок</span>
                           <span class="desktop">Ежемесячный платеж</span>
                           <span>{{ items.length }} {{ morph(items.length, ['предложение', 'предложения',
                              'предложений'])
                              }}</span>
                        </div>

                        <ul class="buy-ways__list scrollbar-none">
                           <li v-for="(item, index) in items" :key="index">
                              <CardsBuyWaysIpoteka :info="item" @form="onForm" />
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
                           <li v-for="item in rassr" :key="item">
                              <CardsBuyWaysInstallment :info="item" @form="onForm" />
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
import { useBanks } from "~/store/banks";
const props = defineProps({
   name: String
})
const bankStore = useBanks()
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
const projectValue = ref(props.name)

const ipotekaSettings = ref({
   options: [],
   placeholder: ""
})
const ipoteka = ref([])

const banksSettings = ref({
   options: [
   ],
   placeholder: ""
})
const banks = ref([])
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
const initialMax = ref(100)
const initialMinValue = ref(initialMin.value)
const initialMaxValue = ref(initialMax.value)
const UpdateInitial = (e) => {
   initialMinValue.value = e.minValue
   initialMaxValue.value = e.maxValue
}
const dateMin = ref(0)
const dateMax = ref(36)
const dateMinValue = ref(dateMin.value)
const dateMaxValue = ref(dateMax.value)
const UpdateDate = (e) => {
   dateMinValue.value = e.minValue
   dateMaxValue.value = e.maxValue
}



const formHeight = ref(0)
const form = ref(null)
const filtersObject = computed(() => {
   let obj = {}


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
   if (initialMinValue.value !== initialMin.value) {
      obj.initial = {}
      obj.initial.min = initialMinValue.value
   }
   if (initialMaxValue.value !== initialMax.value) {
      if (!obj.initial) {
         obj.initial = {}
      }
      obj.initial.max = initialMaxValue.value
   }
   if (dateMinValue.value !== dateMin.value) {
      obj.date = {}
      obj.date.min = dateMinValue.value
   }
   if (dateMaxValue.value !== dateMax.value) {
      if (!obj.date) {
         obj.date = {}
      }
      obj.date.max = dateMaxValue.value
   }

   obj.banks = banks.value
   obj.programms = ipoteka.value
   return obj
})

const setFilters = async () => {
   let data = await bankStore.getFilters()
   banksSettings.value.options = data.titles
   ipotekaSettings.value.options = data.programms
   banks.value = [
      {
         name: "Не важно",
         value: 0,
      },
   ]
   ipoteka.value = [
      {
         name: "Не важно",
         value: 0,
      },
   ]




   priceMin.value = data.amount.min
   priceMinValue.value = data.amount.min
   priceMax.value = data.amount.max
   priceMaxValue.value = data.amount.max

   initialMin.value = data.cash.min
   initialMinValue.value = data.cash.min
   initialMax.value = data.cash.max
   initialMaxValue.value = data.cash.max

   dateMin.value = data.period.min
   dateMinValue.value = data.period.min
   dateMax.value = data.period.max
   dateMaxValue.value = data.period.max
}
const search = async () => {
   let response = await bankStore.getList(bankStore.getUrl(filtersObject.value))
   console.log('result', response);
   items.value = response
}
onMounted(async () => {
   await setFilters()
   await search()
   // formHeight.value = form.value.clientHeight;
})
const items = ref([])
const rassr = computed(() => {
   if (!items.value.length) return []
   return items.value.flatMap((item) => item.bank_programs)
})
const currentBank = ref(0)
const isOpenModal = ref(false)
const formInfo = computed(() => {
   return {
      project: props.name,
      price: priceMaxValue.value,
      initial: initialMaxValue.value,
      srok: dateMaxValue.value,
      bank: currentBank.value
   }
})
const onForm = (data) => {
   console.log(data);
   currentBank.value = data?.bank_title
   isOpenModal.value = true
}
</script>



<style lang="scss">
.buy-ways {
   &__form {
      .catalog-range__output {
         display: grid;
         grid-template-columns: 1fr !important;

         input {
            width: 100% !important;
            border-right: 0 !important;
         }
      }
   }

   .v-select {
      max-width: 377px;

      @media(max-width: 1024px) {
         max-width: calc(100vw - 40px - 70px);
      }

      @media(max-width: 568px) {
         max-width: calc(100vw - 48px);
      }

      &__wrapper {
         height: 56px;
      }

      &__input {
         font-size: 16px;
      }

      &__list {
         max-height: 400px;
         overflow: auto;
      }

      &__footer {
         display: none !important;
      }
   }

   &__cats {
      .v-select__wrapper {
         width: fit-content;
      }
   }
}
</style>