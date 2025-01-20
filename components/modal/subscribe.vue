<template>
   <UiModal :isOpen="isOpen" @closePopup="emit('closePopup')" class="object-form">
      <div class="modal__content object-form__content">
         <UiModalCloseBtn @click="emit('closePopup')" />
         <div class="object-form__header">
            <h3 class="object-form__title h1 dark-title">Подписка <br> <span>на рассылку</span></h3>
         </div>
         <div class="object-form__main">
            <div class="object-form__inputs">
               <FormInput placeholder="E-mail" v-model="email" />
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
const email = ref("")
const checked = ref(false)

const isDisabledBtn = computed(() => {
   return email.value.length > 3
})
const send = async () => {
   let object = {
      subject: "Подписка на рассылку с сайта Own stone",
      text: `
         E-mail: ${email.value}
      `,
   }
   let response = await store.sendForm(object)
   console.log(response);
   if (response.status) {
      email.value = ""
      checked.value = false
      emit('closePopup')
   }
}

</script>
