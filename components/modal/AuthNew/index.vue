<template>
   <UiModal @closePopup="emit('closePopup')" class="auth-modal auth-new" :class="{ reg: tab == 0 }">
      <div class="auth-modal__content modal__content">
         <UiModalCloseBtn @click="emit('closePopup')" />
         <ul class="app-tabs">
            <li v-for="item in tabs" :key="item">
               <input type="radio" name="projectbuyways" :value="item.value" :id="'project' + item.name" v-model="tab">
               <label :for="'project' + item.name">{{ item.name }}</label>
            </li>
         </ul>
         <h3 class="auth-modal__title h1 dark-title" v-if="tab == 0">регистрация</h3>
         <h3 class="auth-modal__title h1 dark-title" v-if="tab == 1">вход в личный <span>кабинет</span></h3>
         <div class="auth-modal__main">

            <ul class="auth-modal__list" v-if="tab == 0">
               <li>
                  <FormInput placeholder="Имя" v-model="name" />
               </li>
               <li>
                  <FormInput placeholder="Фамилия" v-model="surname" />
               </li>
               <li>
                  <FormInput placeholder="E-mail" v-model="email" />
               </li>
               <li>
                  <FormInput isPhone placeholder="Ваш номер телефона" v-model="phone" />
               </li>
               <li class="gc2">
                  <UiSelect class="app-select" :settings="formSettings" @selectOption="onSelectFormOption" />
               </li>
            </ul>
            <ul class="auth-modal__list" v-if="tab == 1">
               <li class="gc2">
                  <FormInput isPhone placeholder="Ваш номер телефона" v-model="phone" />
               </li>
            </ul>
            <div class="form-section__check" style="margin-bottom: 0;">
               <FormCheckbox v-model="checked" id="form-section__check" />
               <label for="form-section__check" style="cursor: pointer;">
                  <span>Я согласен с <NuxtLink to="/consent" target="_blank">Согласием на обработку персональных
                        данных</NuxtLink>
                  </span>
               </label>
            </div>
            <div class="form-section__check" style="margin: 0;">
               <FormCheckbox v-model="checkedSec" id="form-section__check" />
               <label for="form-section__check" style="cursor: pointer;">
                  <span>Я согласен с <NuxtLink to="/oferta" target="_blank">Соглашением на оферту о сотрудничестве
                     </NuxtLink>
                  </span>
               </label>
            </div>
         </div>
         <UiButton class="black" :disabled="!isDisabledBtn" @click="" v-if="tab == 0">Оставить заявку</UiButton>
         <UiButton class="black" :disabled="!isDisabledBtn" @click="goToSms" v-if="tab == 1">Получить код</UiButton>
      </div>
   </UiModal>
</template>
<script setup>
import { useAccount } from '~/store/account'

const store = useAccount()
const emit = defineEmits(['closePopup', 'openSmsModal'])
const name = ref('')
const surname = ref('')
const email = ref('')
const phone = ref('')
const checked = ref(false)
const checkedSec = ref(false)
const tabs = ref([
   {
      value: 0,
      name: "Зарегистрироваться"
   },
   {
      value: 1,
      name: "Войти"
   },
])
const tab = ref(1)

const formSettings = ref({
   options: [
      {
         value: 0,
         name: "Агентство недвижимости",
      },
      {
         value: 1,
         name: "Частный брокер",
      },
      {
         value: 2,
         name: "Банк/финансовые услуги",
      },
      {
         value: 3,
         name: "Инвестиционная компания",
      },
   ],
   placeholder: "Направление деятельности"
})
const form = ref('')
function onSelectFormOption(option) {
   form.value = option.name
}
const isDisabledBtn = computed(() => {
   return checked.value && checkedSec.value && phone.value.length >= 15 && store.time <= 0
})
const goToSms = async () => {
   console.log(document.querySelector('.auth-modal__main .phone p span').innerHTML + ' ' + phone.value);
   let res = await store.getCode(document.querySelector('.auth-modal__main .phone p span').innerHTML + ' ' + phone.value)
   // console.log(res);
   store.time = 59;
   let timer = setInterval(() => {
      store.time--;
      if (store.time <= 0) {
         clearInterval(timer)
         timer = null
      }
   }, 1000)
   if (res?.status) {
      emit("openSmsModal", document.querySelector('.auth-modal__main .phone p span').innerHTML + ' ' + phone.value)
   }
}
</script>


<style lang="scss">
.auth-new {
   .v-select {
      width: 100%;
      max-width: unset;

      &__wrapper {
         height: 56px;

         &.placeholder {
            color: #1818184D;
         }
      }

      &__item {
         justify-content: space-between !important;
      }
   }

   .app-tabs {
      width: fit-content;
      margin-bottom: 40px;
      border-bottom: 0;
   }

   .auth-modal__list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;

      .gc2 {
         grid-column: span 2;
      }

      @media(max-width: 568px) {
         display: flex;
         flex-direction: column;

      }
   }

   &.reg {
      .modal__content {
         width: 664px;
      }
   }

   .modal__content {
      width: 500px;
   }

   .pc {
      @media(max-width: 568px) {
         display: none;
      }
   }
}
</style>