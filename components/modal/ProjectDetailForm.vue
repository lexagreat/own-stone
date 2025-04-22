<template>
   <UiModal :isOpen="isOpen" @closePopup="emit('closePopup')" class="object-form">
      <div class="modal__content object-form__content" v-if="success">
         <UiModalCloseBtn @click="emit('closePopup')" />
         <ModalSucess title="Заявка <span>отправлена</span>"
            subtitle="В ближайшее время с Вами свяжется наш специалист" />
      </div>
      <div class="modal__content object-form__content" ref="wrapper" v-else>
         <UiModalCloseBtn @click="emit('closePopup')" />
         <div class="object-form__header">
            <h3 class="object-form__title h1 dark-title">Оставить <span>заявку</span></h3>
            <p class="body-text">Если Вам нужна помощь в выборе объекта - оставьте заявку и наш специалист с Вами
               свяжется в течение 10 минут</p>
         </div>
         <div class="object-form__main">
            <div class="object-form__inputs">
               <FormInput v-model="project" disabled />
               <FormInput placeholder="Ваше имя" v-model="name" />
               <FormInput isPhone placeholder="Ваш номер телефона" v-model="phone" />
               <div class="form-section__check">
                  <FormCheckbox v-model="checked" id="object-form__check" />
                  <label for="object-form__check" style="cursor: pointer;">
                     <span>Я согласен с <NuxtLink to="/policy" target="_blank">политикой конфиденциальности</NuxtLink>
                     </span>
                  </label>
               </div>
            </div>
            <UiButton class="black" :class="{ disabled: !isDisabledBtn }" @click="send">Оставить заявку</UiButton>
         </div>
      </div>
   </UiModal>
</template>
<script setup>
import { useAccount } from '~/store/account'

const props = defineProps({
   isOpen: Boolean,
   projectName: String
})
const emit = defineEmits(['closePopup'])
const store = useAccount()

const name = ref("")
const phone = ref("")
const checked = ref(false)
const wrapper = ref(null)
const project = ref(props.projectName)


const isDisabledBtn = computed(() => {
   return checked.value && name.value.length && phone.value.length >= 15
})
const success = ref(false)

const send = async () => {
   let obj = {
      subject: "Заявка на проект с сайта Own stone",
      text: `
         Имя: ${name.value}
         Телефон: ${wrapper.value.querySelector('.phone p span').innerHTML} ${phone.value}
         Проект: ${project.value}
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