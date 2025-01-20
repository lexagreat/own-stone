<template>
   <UiModal :isOpen="isOpen" @closePopup="emit('closePopup')" class="meeting-form">
      <div class="modal__content meeting-form__content">
         <UiModalCloseBtn @click="emit('closePopup')" />
         <div class="meeting-form__image">
            <img src="/img/meeting.png" alt="">
         </div>
         <div class="meeting-form__wrapper">
            <div class="meeting-form__header">
               <h3 class="meeting-form__title h1 light-title">Назначить <span>встречу</span></h3>
               <p class="body-text">Если вы хотите назначить встречу с персональным брокером в нашем офисе - оставьте
                  заявку и мы подберем удобную дату и время!</p>
            </div>
            <div class="meeting-form__main">
               <div class="meeting-form__inputs">
                  <FormInput placeholder="Ваше имя" v-model="name" />
                  <FormInput isPhone placeholder="Ваш номер телефона" v-model="phone" />
                  <div class="form-section__check">
                     <FormCheckbox v-model="checked" id="meeting-form__checksdadas" />
                     <label for="meeting-form__check" style="cursor: pointer;">
                        <span>Я согласен с <NuxtLink to="/policy" target="_blank">политикой конфиденциальности
                           </NuxtLink>
                        </span>
                     </label>
                  </div>
               </div>
               <UiButton class="white" :class="{ disabled: !isDisabledBtn }" @click="send">Оставить отзыв</UiButton>
            </div>
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
const checked = ref(false)

const isDisabledBtn = computed(() => {
   return checked.value && name.value.length && phone.value.length == 18
})
const send = async () => {
   let obj = {
      subject: "Заявка на встречу с сайта Own stone",
      text: `
         Имя: ${name.value}
         Телефон: ${phone.value}
      `,
   }
   let response = await store.sendForm(obj)
   console.log(response);
   if (response.status) {
      name.value = store.user?.firstname || ""
      phone.value = store.user?.phonenumber || ""
      checked.value = false
      emit('closePopup')
   }
}

</script>
