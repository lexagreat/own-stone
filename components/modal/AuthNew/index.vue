<template>
   <UiModal @closePopup="emit('closePopup'), success = false" class="auth-modal auth-new" :class="{ reg: tab == 0 }">
      <div class="auth-modal__content modal__content success" v-if="success">
         <UiModalCloseBtn @click="emit('closePopup')" />
         <ModalSucess title="Заявка <br> <span>отправлена</span>"
            subtitle="Благодарим за проявленный интерес к сотрудничеству с агентством OWNSTONE! Рассмотрение заявки происходит в течение 1-2 дней" />
      </div>
      <div class="auth-modal__content modal__content" v-else>
         <UiModalCloseBtn @click="emit('closePopup'), success = false" />

         <ul class="app-tabs">
            <li v-for="item in tabs" :key="item">
               <input type="radio" name="newauth" :value="item.value" :id="'newauth' + item.value" v-model="tab">
               <label :class="{ active: tab == item.value }" :for="'newauth' + item.value">{{ item.name }}</label>
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
                  <UiSelect class="app-select auth-select" :settings="formSettings"
                     @selectOption="onSelectFormOption" />
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
         <UiButton class="black" :disabled="!isFormValid" @click="register" v-if="tab == 0">Оставить заявку</UiButton>
         <UiButton class="black" :disabled="!isFormValid" @click="goToSms" v-if="tab == 1">Получить код</UiButton>
         <span class="auth-modal__error" v-if="errorMes.length">{{ errorMes }}</span>
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
const errorMes = ref('')
const success = ref(false)
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
      {
         value: 4,
         name: "Юридические услуги",
      },
      {
         value: 5,
         name: "Меблировка/дизайн/отделка",
      },
      {
         value: 6,
         name: "Другое",
      },
   ],
   placeholder: "Направление деятельности"
})
const form = ref('')
function onSelectFormOption(option) {
   form.value = option.name
}
const isFormValid = computed(() => {
   return (
      checked.value &&
      checkedSec.value &&
      phone.value.length >= 15 &&
      store.time <= 0 &&
      (
         tab.value === 1 ||
         (
            tab.value === 0 &&
            name.value.length > 0 &&
            surname.value.length > 0 &&
            validEmail(email.value)
         )
      )
   );
});
const register = async () => {
   let obj = {
      type: 'register',
      firstname: name.value, // имя
      secondname: surname.value, // фамилия
      email: email.value, // email
      user_avctivity: form.value //направление деятельности
   }
   let res = await store.getCode(document.querySelector('.auth-new .auth-modal__main .phone p span').innerHTML + ' ' + phone.value, obj)
   if (!res.status) {
      errorMes.value = res.message
      return
   } else {
      success.value = true

      name.value = ""
      surname.value = ""
      email.value = ""
      form.value = ""
      phone.value = ""
      setTimeout(() => {
         emit('closePopup')
         success.value = false
      }, 5000)
   }
}
const goToSms = async () => {
   let res = await store.getCode(document.querySelector('.auth-new .auth-modal__main .phone p span').innerHTML + ' ' + phone.value, {
      type: "auth"
   })
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
      emit("openSmsModal", document.querySelector('.auth-new .auth-modal__main .phone p span').innerHTML + ' ' + phone.value)
   }
}
watch(
   () => [
      name.value,
      surname.value,
      email.value,
      phone.value,
      form.value,
      tab.value
   ],
   (newValues) => {
      errorMes.value = "";
   },
   { deep: true }
)
</script>


<style lang="scss">
.auth-new {
   .auth-modal__error {
      color: #FF5E5C;
      font-size: 12px;
      font-weight: 400;
      line-height: 100%;
      margin-top: 12px;
      display: block;
      /* 12px */
   }

   .auth-select {
      width: 100%;
      max-width: unset;

      .v-select {
         &__wrapper {
            height: 56px;

            &.placeholder {
               color: #1818184D;
            }
         }

         &__item {
            justify-content: space-between !important;
         }

         &__list {
            height: 168px;
            overflow: auto;
         }
      }

   }

   .phone {
      &:has(.open) {
         z-index: 20;
      }
   }

   .app-tabs {
      width: fit-content;
      margin-bottom: 40px;
      border-bottom: 0;

      .active {
         color: #181818;

         &::after {
            scale: 1;
         }
      }
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

         @media(max-width: 1024px) {
            width: 100%;
         }
      }
   }

   .modal__content.success {
      width: 470px;

      @media(max-width: 1024px) {
         width: 100%;
      }
   }

   .modal__content {
      width: 500px;

      @media(max-width: 1024px) {
         width: 100%;
      }
   }

   .pc {
      @media(max-width: 568px) {
         display: none;
      }
   }
}
</style>