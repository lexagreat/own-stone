<template>
   <section class="buy-ways">
      <ModalIpoteka :tab="tab" :is-open="isOpenModal" @close-popup="isOpenModal = false" />
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
                  <div class="buy-ways__form">
                     <h3 class="buy-ways__subtitle">{{ tab == 0 ? 'Ипотека' : 'Рассрочка' }}</h3>
                     <ul class="buy-ways__filters">
                        <li>
                           <span>Проект</span>
                           <FormInput v-model="project" disabled />
                        </li>

                        <li>
                           <span>Стоимость недвижимости asdas</span>
                           <div class="catalog-range">
                              <div class="catalog-range__output">
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
                                 <span>{{ formatPrice(initialMaxValue) }}</span>
                              </div>
                              <MultiRangeSlider :ruler="false" :min="initialMin" :max="initialMax" :step="10000"
                                 :minValue="initialMinValue" :maxValue="initialMaxValue" @input="UpdateInitial" />
                           </div>
                        </li>
                        <li>
                           <span>Срок</span>
                           <div class="catalog-range srok">
                              <div class="catalog-range__output">
                                 <span>{{ dateMaxValue }} {{ morph(dateMaxValue, ['год', 'года', 'лет']) }}</span>
                              </div>
                              <MultiRangeSlider :ruler="false" :min="dateMin" :max="dateMax" :step="1"
                                 :minValue="dateMinValue" :maxValue="dateMaxValue" @input="UpdateDate" />
                           </div>

                        </li>
                     </ul>
                  </div>
                  <div class="buy-ways__banner buy-banner">
                     <div class="buy-banner__header">
                        <h4 class="buy-banner__title h3" v-if="tab == 0">Поможем выгодно приобрести <br> недвижимость
                        </h4>
                        <h4 class="buy-banner__title h3" v-else>Подберём выгодную <br> банковскую программу</h4>
                        <div class="buy-banner__image">
                           <img class="first" src="/img/project/ipoteka.svg" alt="" v-if="tab == 0">
                           <img class="second" src="/img/project/rassrochka.svg" alt="" v-else>
                        </div>
                     </div>
                     <div class="buy-banner__main">
                        <ul class="buy-banner__list" v-if="tab == 0">
                           <li>
                              <span>Ежемесячный платеж</span>
                              <p>от 135 605 ₽</p>
                           </li>
                           <li>
                              <span>Сумма кредита</span>
                              <p>23 300 000 ₽</p>
                           </li>
                           <li>
                              <span>Процентная ставка</span>
                              <p style="color: #18181880;">от 11,04 %</p>
                           </li>
                        </ul>
                        <ul class="buy-banner__list" v-else>
                           <li>
                              <span>Первый взнос</span>
                              <p>от 40 % </p>
                           </li>
                           <li>
                              <span>Сумма платежа</span>
                              <p>от 219 300 ₽ </p>
                           </li>
                           <li>
                              <span>Процентная ставка</span>
                              <p style="color: #18181880;">от 0 % </p>
                           </li>
                        </ul>
                        <p class="buy-banner__descripiton">
                           Данный расчёт является примерным. Для получения более <br> точной информации, оставьте заявку
                        </p>
                     </div>
                     <div class="buy-banner__footer">
                        <UiButton class="black" @click="isOpenModal = true">Оставить заявку</UiButton>
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
const props = defineProps({
   name: String
})
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

const project = ref(props.name)


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
const dateMax = ref(30)
const dateMinValue = ref(dateMin.value)
const dateMaxValue = ref(dateMax.value)
const UpdateDate = (e) => {
   dateMinValue.value = e.minValue
   dateMaxValue.value = e.maxValue
}

const isOpenModal = ref(false)




</script>



<style lang="scss">
.buy-ways {
   .catalog-range {
      &__output {
         span {
            grid-column: span 2;
            border: 0;
            width: 100%;
         }
      }

      .multi-range-slider {
         width: 100%;
         translate: -1px;
      }

      .thumb-left {
         display: none;
      }
   }
}
</style>