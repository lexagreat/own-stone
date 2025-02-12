<template>
   <section class="sell-calc">
      <ModalSuccessModal :isOpen="success" @close-popup="success = false" />
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
                     <div class="calc-res__output">
                        <!-- <li>
                           <span class="body-text">Диапазон цен</span>
                           <p>18 966 000 ₽ - 22 537 000 ₽ </p>
                        </li>
                        <li>
                           <span class="body-text">Цена за м2</span>
                           <p>199 600 ₽ - 281 700 ₽ </p>
                        </li> -->
                        <p class="body-text" style="color: rgba(24, 24, 24, 0.50);">
                           Оставьте свои контактные данные и наш специалист <br> свяжется с Вами
                        </p>
                        <div class="object-form__inputs">
                           <FormInput placeholder="Ваше имя" v-model="name" />
                           <FormInput isPhone placeholder="+7 (999) 999-99-99" v-model="phone" />
                           <div class="form-section__check">
                              <FormCheckbox v-model="checked" id="object-form__check" />
                              <label for="object-form__check" style="cursor: pointer;">
                                 <span>Я согласен с <NuxtLink to="/policy" target="_blank">политикой конфиденциальности
                                    </NuxtLink>
                                 </span>
                              </label>
                           </div>
                           <UiButton class="black" :class="{ disabled: !isDisabledBtn }" @click="send">Отправить
                           </UiButton>
                        </div>
                     </div>
                     <!-- <div class="calc-res__footer">
                        <span>Для более точной оценки, свяжитесь с нами</span>
                        <ul>
                           <li v-for="item in media" :key="item">
                              <NuxtLink class="circle" :to="item.href">
                                 <component :is="item.icon" />
                              </NuxtLink>
                           </li>
                        </ul>
                     </div> -->
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
                           <FormInput v-model="size" placeholder="Площадь, м²" id="calcSize" />
                        </li>
                        <li class="gc2">
                           <FormInput placeholder="Ваше имя" v-model="name" />
                        </li>
                        <li class="gc2">
                           <FormInput isPhone placeholder="+7 (999) 999-99-99" v-model="phone" />
                        </li>
                     </ul>
                     <ul class="calc-res__output calc-inputs__res">

                        <div class="object-form__inputs">
                           <div class="form-section__check">
                              <FormCheckbox v-model="checked" id="object-form__check" />
                              <label for="object-form__check" style="cursor: pointer;">
                                 <span>Я согласен с <NuxtLink to="/policy" target="_blank">политикой конфиденциальности
                                    </NuxtLink>
                                 </span>
                              </label>
                           </div>
                           <UiButton class="black" :class="{ disabled: !isDisabledBtn }" @click="send2">Узнать цену
                           </UiButton>
                        </div>
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
import { useAccount } from '~/store/account';
const store = useAccount()
const name = ref('')
const phone = ref('')
const checked = ref(false)
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
            title: "Спасибо!",
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
         name: "Студия",
         value: 0,
         selected: true
      },
      {
         name: "1 комната",
         value: 1,
         selected: true
      },
      {
         name: "2 комнаты",
         value: 2,
         selected: true
      },
      {
         name: "3 комнаты",
         value: 3,
      },
      {
         name: "4 комнаты",
         value: 4,
      },
      {
         name: "4+ комнаты",
         value: 5,
      },
   ],
   placeholder: ""
})
const roomsOption = ref(null)
function onSelectRoomsOption(option) {
   roomsOption.value = option
}

const onChangeRegion = (name) => {
   // console.log(name);
   steps.value.stepsList[2].checked = name
}

onMounted(() => {
   sharedParallaxAnimation(".sell-calc__bg img", ".sell-calc")
})




const isDisabledBtn = computed(() => {
   return checked.value && name.value.length && phone.value.length == 18
})


const success = ref(false)
const send = async () => {
   let object = {
      subject: "Оценить стоимость с сайта Own stone",
      text: `
         Имя: ${name.value}
         Телефон: ${phone.value}
         Кол-во комнат: ${steps.value.stepsList[0].checked}
         Площадь квартиры: ${steps.value.stepsList[1].checked}
         Округ: ${steps.value.stepsList[2].checked}
      `,
   }
   let response = await store.sendForm(object)
   // console.log(response);
   if (response.status) {
      name.value = store.user?.firstname
      phone.value = store.user?.phonenumber
      checked.value = false
      success.value = true
      setTimeout(() => {
         success.value = false
      }, 2000)
   }
}
const send2 = async () => {
   let object = {
      subject: "Оценить стоимость с сайта Own stone",
      text: `
         Имя: ${name.value}
         Телефон: ${phone.value}
         Кол-во комнат: ${roomsOption.value.name}
         Площадь квартиры: ${size.value}
         Адрес: ${address.value}
      `,
   }
   let response = await store.sendForm(object)
   // console.log(response);
   if (response.status) {
      name.value = store.user?.firstname
      phone.value = store.user?.phonenumber
      address.value = ""
      size.value = ''
      checked.value = false
      success.value = true
      setTimeout(() => {
         success.value = false
      }, 2000)
   }
}
const address = ref('')
const size = ref('')
const clear = () => {
   address.value = ""
   size.value = ''
}
</script>




<style lang="scss" scoped>
.calc-res__output .text-input input {
   background: #F8F8F8;
}

.gc2 {
   grid-column: span 2;

   @media(max-width: 568px) {
      grid-column: unset;
   }
}

.sell-calc {
   .v-select {
      font-size: 16px;
   }
}
</style>