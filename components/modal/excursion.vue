<template>
   <UiModal :isOpen="isOpen" @closePopup="emit('closePopup')" class="meeting-form">
      <div class="modal__content meeting-form__content" v-if="success" style="padding: 40px !important;">
         <UiModalCloseBtn @click="emit('closePopup')" />
         <ModalSucessDark title="Заявка <br> <span>отправлена</span>"
            subtitle="В ближайшее время с Вами свяжется <br> наш специалист" />
      </div>
      <div class="modal__content meeting-form__content" ref="wrapper" style="overflow: hidden;" v-else>
         <UiModalCloseBtn @click="emit('closePopup')" />
         <div class="meeting-form__image">
            <img :src="image" alt="">
         </div>
         <div class="meeting-form__wrapper">
            <div class="meeting-form__header">
               <h3 class="meeting-form__title h1 light-title">Записаться <br> <span>на экскурсию</span></h3>
               <p class="body-text">Если вы хотите записаться на экскурсию - оставьте заявку и мы подберем удобную дату
                  и время!</p>
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
               <UiButton class="white" :class="{ disabled: !isDisabledBtn }" @click="send">Оставить заявку</UiButton>
            </div>
         </div>
      </div>
   </UiModal>
</template>
<script setup>
import { useAccount } from '~/store/account'

const props = defineProps({
   isOpen: Boolean,
   image: String,
   project: String
})
const emit = defineEmits(['closePopup'])
const store = useAccount()
const name = ref("")
const phone = ref("")
const checked = ref(false)

const isDisabledBtn = computed(() => {
   return checked.value && name.value.length && phone.value.length >= 15
})
const wrapper = ref(null)
const success = ref(false)

const send = async () => {
   let obj = {
      subject: "Записать на экскурсию с сайта Own stone",
      text: `
         Имя: ${name.value}
         Телефон: ${wrapper.value.querySelector('.phone p span').innerHTML} ${phone.value}
         Проект: ${props.project}
      `,
   }
   let response = await store.sendForm(obj)
   // console.log(response);
   if (response.status) {
      name.value = store.user?.firstname || ""
      phone.value = store.user?.phonenumber || ""
      checked.value = false
      success.value = true
      setTimeout(() => {
         emit('closePopup')
         success.value = false
      }, 2000)
   }
}

</script>

<style lang="scss">
.meeting-form {
   input {
      background-color: transparent;
      border: 1px solid #FFFFFF99;
      color: #FFFF;

      &::placeholder {
         color: #FFFFFF4D;
      }
   }
}
</style>