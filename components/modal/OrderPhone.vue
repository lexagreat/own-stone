<template>
   <UiModal :isOpen="isOpen" @closePopup="emit('closePopup')" class="object-form">
      <div class="modal__content object-form__content">
         <UiModalCloseBtn @click="emit('closePopup')" />
         <div class="object-form__header">
            <h3 class="object-form__title h1 dark-title">Заказать <br> звонок</h3>
            <p class="body-text">Укажите свой номер телефона и наш персональный брокер свяжется с Вами в течение 10
               минут</p>
         </div>
         <div class="object-form__main">
            <div class="object-form__inputs">
               <FormInput isPhone placeholder="Ваш номер телефона" v-model="phone" />
               <div class="form-section__check">
                  <FormCheckbox v-model="checked" id="object-form__checksdadas312312312" />
                  <label for="object-form__check" style="cursor: pointer;">
                     <span>Я согласен с <NuxtLink to="/policy" target="_blank">политикой конфиденциальности</NuxtLink>
                     </span>
                  </label>
               </div>
            </div>
            <UiButton class="black" :class="{ disabled: !isDisabledBtn }" @click="send">Отправить</UiButton>
         </div>
      </div>
   </UiModal>
</template>
<script setup>
import { useAccount } from '~/store/account'

const props = defineProps({
   isOpen: Boolean
})
const emit = defineEmits(['closePopup'])
const store = useAccount()
const phone = ref("")
const checked = ref(false)

const isDisabledBtn = computed(() => {
   return phone.value.length == 18
})
const send = async () => {
   let object = {
      subject: "Заказать звонок с сайта Own stone",
      text: `
         Телефон: ${phone.value}
      `,
   }
   let response = await store.sendForm(object)
   console.log(response);
   if (response.status) {
      phone.value = ""
      checked.value = false
      emit('closePopup')
   }
}

</script>
