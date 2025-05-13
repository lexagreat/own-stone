<template>
   <UiModal :isOpen="isOpen" @closePopup="emit('closePopup')" class="object-form">
      <div class="modal__content object-form__content" v-if="success">
         <UiModalCloseBtn @click="emit('closePopup')" />
         <ModalSucess title="Вопрос <span>отправлен</span>"
            subtitle="В ближайшее время с Вами свяжется наш специалист" />

      </div>
      <div class="modal__content object-form__content" ref="wrapper" v-else>
         <UiModalCloseBtn @click="emit('closePopup')" />
         <div class="object-form__header">
            <h3 class="object-form__title h1 dark-title">Задать <span>вопрос</span>
            </h3>
            <p class="body-text">Если возникли вопросы - оставьте заявку и наш специалист свяжется с Вами в ближайшее
               время</p>
         </div>
         <div class="object-form__main">
            <div class="object-form__inputs">
               <FormInput placeholder="Ваше имя" v-model="name" />
               <FormInput isPhone placeholder="Ваш номер телефона" v-model="phone" />
               <FormTextarea placeholder="Ваш вопрос" v-model="question" />
               <div class="form-section__check">
                  <FormCheckbox v-model="checked" id="object-form__check" />
                  <label for="object-form__check" style="cursor: pointer;">
                     <span>Я согласен с <NuxtLink to="/consent" target="_blank">Согласием на обработку персональных
                           данных</NuxtLink>
                     </span>
                  </label>
               </div>
            </div>
            <UiButton class="black" style="width: 100%;" :class="{ disabled: !isDisabledBtn }" @click="send">Отправить
            </UiButton>
         </div>

      </div>
   </UiModal>
</template>
<script setup>
import { useAccount } from '~/store/account'

const store = useAccount()
const props = defineProps({
   isOpen: Boolean
})
const emit = defineEmits(['closePopup'])

const name = ref(store.user?.firstname)
const phone = ref(store.user?.phonenumber)
const question = ref("")



const isDisabledBtn = computed(() => {
   return checked.value && name.value.length && phone.value.length >= 15 && question.value.length
})


const checked = ref(false)
const success = ref(false)
const wrapper = ref(null)
const send = async () => {
   let object = {
      subject: "Новый вопрос с сайта Own stone",
      text: `
         Имя: ${name.value}
         Телефон: ${wrapper.value.querySelector('.phone p span').innerHTML} ${phone.value}
         Вопрос: ${question.value}
      `,


   }
   let response = await store.sendForm(object)
   // console.log(response);
   if (response.status) {
      name.value = store.user?.firstname
      phone.value = store.user?.phonenumber
      question.value = ""
      checked.value = false
      success.value = true
      setTimeout(() => {
         emit('closePopup')
         success.value = false
      }, 2000)
   }
}
</script>


<style lang="scss" scoped>
.v-select {
   max-width: 100%;
}
</style>