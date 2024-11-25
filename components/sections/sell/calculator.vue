<template>
   <section class="sell-calc">
      <div class="sell-calc__bg">
         <img src="/img/sell/calc.png" alt="">
      </div>
      <div class="container">
         <div class="sell-calc__wrapper">
            <h2 class="sell-calc__title light-title h1">Оценить стоимость <br>
               <span>объекта</span>
            </h2>
            <div class="sell-calc__main">
               <ul class="sell-calc__radios">
                  <li v-for="item in methods" :key="item">
                     <input type="radio" v-model="method" :value="item.value" :id="`sellCalc${item.value}`">
                     <label :for="`sellCalc${item.value}`">
                        {{ item.name }}
                     </label>
                  </li>
               </ul>
               <div class="sell-calc__form calc-form" v-if="method == 0">
                  <div class="calc-form__header">
                     <h3 class="calc-form__title">{{ steps.stepsList[currentStep].title }}</h3>

                     <div class="calc-form__pagination" v-if="currentStep + 1 !== steps.stepsList.length">{{ currentStep
                        + 1 }}/3
                     </div>
                  </div>
                  <div class="calc-form__main" v-if="currentStep + 1 !== steps.stepsList.length">
                     <div class="calc-form__content">
                        <ul class="calc-form__inputs" v-if="currentStep !== 2">
                           <li v-for="item in steps.stepsList[currentStep].items" :key="item">
                              <input type="radio" :name="`calcformcontent${currentStep}`"
                                 v-model="steps.stepsList[currentStep].checked" :value="item.title"
                                 :id="`calcformcontent${item.title}`">
                              <label :for="`calcformcontent${item.title}`">
                                 <component :is="item.icon" />
                                 <span class="body-text" v-html="item.title"></span>
                              </label>
                           </li>
                        </ul>
                        <div class="calc-form__map" v-else>
                           <FormSellMap @changeRegion="onChangeRegion" />

                        </div>
                     </div>
                     <div class="calc-form__footer">
                        <UiButton class="white" @click="minusStep" v-if="currentStep !== 0">Назад</UiButton>
                        <UiButton class="black" :disabled="!isDisabledNextStep" @click="plusStep">{{ currentStep !== 2 ?
                           'Далее' : 'Узнать цену' }}</UiButton>
                     </div>
                  </div>
                  <div class="calc-form__main calc-res" v-else>
                     <ul class="calc-res__checked body-text">
                        <template v-for="item in steps.stepsList" :key="item">
                           <li v-if="item.checked">
                              <span v-html="item.checked"></span>
                           </li>
                        </template>
                     </ul>
                     <ul class="calc-res__output">
                        <li>
                           <span class="body-text">Диапазон цен</span>
                           <p>18 966 000 ₽ - 22 537 000 ₽ </p>
                        </li>
                        <li>
                           <span class="body-text">Цена за м2</span>
                           <p>199 600 ₽ - 281 700 ₽ </p>
                        </li>
                     </ul>
                     <div class="calc-res__footer">
                        <span>Для более точной оценки, свяжитесь с нами</span>
                        <ul>
                           <li v-for="item in media" :key="item">
                              <NuxtLink class="circle" :to="item.href">
                                 <component :is="item.icon" />
                              </NuxtLink>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
               <div class="sell-calc__form calc-form" v-else>
                  <div class="calc-form__header">
                     <h3 class="calc-form__title">{{ stepsForData[currentStepForData].title }}</h3>
                  </div>
                  <div class="calc-inputs">
                     <ul class="calc-inputs__list">
                        <li>
                           <FormInput v-model="address" placeholder="Адрес" id="calcaddress" />
                        </li>
                        <li>
                           <UiSelect :settings="roomsSettings" @selectOption="onSelectRoomsOption" />
                        </li>
                        <li>
                           <FormInput v-model="size" placeholder="Метраж" id="calcSize" />
                        </li>
                     </ul>
                     <UiButton class="black" @click="currentStepForData++" v-if="currentStepForData == 0">Узнать цену
                     </UiButton>
                     <UiButton class="transparent" v-else>Очистить</UiButton>
                     <ul class="calc-res__output calc-inputs__res" v-if="currentStepForData == 1">
                        <li>
                           <span class="body-text">Цена за м2</span>
                           <p>199 600 ₽</p>
                        </li>
                        <li>
                           <span class="body-text">Цена</span>
                           <p>20 700 000 ₽</p>
                        </li>
                        <li>
                           <span class="body-text">Диапазон цен</span>
                           <p>18 966 000 ₽ - 22 537 000 ₽ </p>
                        </li>
                     </ul>
                  </div>
               </div>

            </div>
         </div>
      </div>
   </section>
</template>
<script setup>
import { sharedParallaxAnimation } from '~/assets/js/animations';

const media = ref([
   {
      icon: markRaw(defineAsyncComponent(() => import('~/assets/img/icons/tg-20.svg'))),
      href: "/"
   },
   {
      icon: markRaw(defineAsyncComponent(() => import('~/assets/img/icons/whatsapp-20.svg'))),
      href: "/"
   },
   {
      icon: markRaw(defineAsyncComponent(() => import('~/assets/img/icons/phone.svg'))),
      href: "/"
   },
])
const methods = ref([
   {
      name: "По параметрам",
      value: 0
   },
   {
      name: "Ввести данные",
      value: 1
   }
])

const method = ref(0)
watch(method, () => {
   currentStep.value = 0
   currentStepForData.value = 0
})

const steps = ref({
   stepsList:
      [
         {
            title: "Укажите количество комнат в квартире",
            items: [
               {
                  title: "Студия",
                  icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/calc1.svg'))),
               },
               {
                  title: "3-комнатная",
                  icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/calc2.svg'))),
               },
               {
                  title: "1-комнатная",
                  icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/calc3.svg'))),
               },
               {
                  title: "4-комнатная и более",
                  icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/calc4.svg'))),
               },
               {
                  title: "2-комнатная",
                  icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/calc5.svg'))),
               },
            ],
            checked: ""
         },
         {
            title: "Площадь квартиры",
            items: [
               {
                  title: "до 20м<sup>2</sup>",
                  icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/calc6.svg'))),
               },
               {
                  title: "более 80м<sup>2</sup>",
                  icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/calc6.svg'))),
               },
               {
                  title: "до 40м<sup>2</sup>",
                  icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/calc6.svg'))),
               },
               {
                  title: "более 100м<sup>2</sup>",
                  icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/calc6.svg'))),
               },
               {
                  title: "40м<sup>2</sup> – 80м<sup>2</sup>",
                  icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/calc6.svg'))),
               },
            ],
            checked: ""
         },
         {
            title: "Выберите округ",
            checked: ""
         },
         {
            title: "Результат оценки",
         }

      ]
}
)
const currentStep = ref(0)

const minusStep = () => {
   currentStep.value--
}
const plusStep = () => {
   currentStep.value++
   console.log(steps.value);

}
const isDisabledNextStep = computed(() => {
   if (steps.value.stepsList[currentStep.value].checked) {
      return true
   } else {
      return false
   }
})

const stepsForData = ref([
   {
      title: "Введите данные для рассчета"
   },
   {
      title: "Результат оценки "
   },
])
const currentStepForData = ref(0)

const roomsSettings = ref({
   options: [
      {
         name: "2 комнаты",
         value: 0,
         selected: true
      },
      {
         name: "3 комнаты",
         value: 1,
      },
   ],
   placeholder: ""
})
const roomsOption = ref(null)
function onSelectRoomsOption(option) {
   roomsOption.value = option
}

const onChangeRegion = (name) => {
   console.log(name);
   steps.value.stepsList[2].checked = name
}

onMounted(() => {
   sharedParallaxAnimation(".sell-calc__bg img", ".sell-calc")
})
</script>