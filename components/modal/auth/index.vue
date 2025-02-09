<template>
   <UiModal @closePopup="emit('closePopup')" class="auth-modal">
      <div class="auth-modal__content modal__content">
         <UiModalCloseBtn @click="emit('closePopup')" />
         <h3 class="auth-modal__title h1 dark-title">вход или <br class="pc"> <span>регистрация</span></h3>
         <div class="auth-modal__main">
            <FormInput isPhone placeholder="Ваш номер телефона" v-model="phone" />
            <div class="form-section__check">
               <FormCheckbox v-model="checked" id="form-section__check" />
               <label for="form-section__check" style="cursor: pointer;">
                  <span>Я согласен с <NuxtLink to="/policy" target="_blank">политикой конфиденциальности</NuxtLink>
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


const isDisabledBtn = computed(() => {
   return checked.value && phone.value.length == 18
})
const goToSms = async () => {
   let res = await store.getCode(phone.value)
   // console.log(res);
   if (res?.status) {
      emit("openSmsModal", phone.value)
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