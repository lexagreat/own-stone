<template>
   <UiModal :isOpen="isOpen" @closePopup="emit('closePopup')" class="object-form">
      <div class="modal__content object-form__content" v-if="success">
         <UiModalCloseBtn @click="emit('closePopup')" />
         <ModalSucess title="Заявка <br> <span>отправлена</span>"
            subtitle="В ближайшее время с Вами свяжется <br> наш специалист" />
      </div>
      <div class="modal__content object-form__content" v-else>
         <UiModalCloseBtn @click="emit('closePopup')" />
         <div class="object-form__header">
            <h3 class="object-form__title h1 dark-title">Вызвать <span>машину</span></h3>
            <p class="body-text">Запланируйте поездку на встречу и мы оплатим такси до нашего офиса</p>
         </div>
         <div class="object-form__main">
            <div class="object-form__inputs">
               <FormInput placeholder="Ваше имя" v-model="name" />
               <FormInput isPhone placeholder="Ваш номер телефона" v-model="phone" />
               <FormInput placeholder="Ваш адрес" v-model="address" />
               <FormInput placeholder="Тема визита" v-model="theme" />
               <div class="form-section__check">
                  <FormCheckbox v-model="checked" id="object-form__checksdadas" />
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
const name = ref("")
const phone = ref("")
const address = ref("")
const theme = ref("")
const checked = ref(false)

const isDisabledBtn = computed(() => {
   return checked.value && name.value.length && phone.value.length == 18
})

const success = ref(false)
const send = async () => {
   let object = {
      subject: "Заявка на такси с сайта Own stone",
      text: `
         Имя: ${name.value}
         Телефон: ${phone.value}
         Адрес: ${address.value}
         Тема визита: ${theme.value}
      `,
   }
   let response = await store.sendForm(object)
   console.log(response);
   if (response.status) {
      name.value = store.user?.firstname || ""
      phone.value = store.user?.phonenumber || ""
      theme.value = ""
      address.value = ""
      checked.value = false
      success.value = true
      setTimeout(() => {
         emit('closePopup')
         success.value = false
      }, 2000)
   }
}

</script>
