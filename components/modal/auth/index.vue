<template>
   <UiModal @closePopup="emit('closePopup')" class="auth-modal">
      <div class="auth-modal__content modal__content">
         <UiModalCloseBtn @click="emit('closePopup')" />
         <h3 class="auth-modal__title h1 dark-title">вход или <br class="pc"> <span>регистрация</span></h3>
         <div class="auth-modal__main">

            <FormInput isPhone placeholder="Ваш номер телефона" v-model="phone" />
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
                  <span>Я согласен с <NuxtLink to="/oferta" target="_blank">соглашением на оферту</NuxtLink>
                  </span>
               </label>
            </div>
         </div>
         <UiButton class="black" :disabled="!isDisabledBtn" @click="goToSms">Получить код</UiButton>
      </div>
   </UiModal>
</template>
<script setup>
import { useAccount } from '~/store/account'

const store = useAccount()
const emit = defineEmits(['closePopup', 'openSmsModal'])
const phone = ref('')
const checked = ref(false)
const checkedSec = ref(false)


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


<style lang="scss" scoped>
.pc {
   @media(max-width: 568px) {
      display: none;
   }
}
</style>