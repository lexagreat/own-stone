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
            <h3 class="object-form__title h1 dark-title">стать частью <br /> <span>команды</span></h3>
            <p class="body-text">Хотите стать частью команды OWNSTONE? Оставьте заявку и наш HR-cпециалист свяжется с
               Вами!</p>
         </div>
         <div class="object-form__main">
            <div class="object-form__inputs">
               <FormInput placeholder="Ваше имя и фамилия" v-model="name" />
               <FormInput isPhone placeholder="Ваш номер телефона" v-model="phone" />
               <FormInput placeholder="E-mail" v-model="email" />
               <FormInput placeholder="Краткий рассказ о себе" v-model="about" />
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
const name = ref("")
const phone = ref("")
const email = ref("")
const about = ref("")
const checked = ref(false)

const isDisabledBtn = computed(() => {
   return checked.value && name.value.length && phone.value.length == 18
})
const success = ref(false)

const send = async () => {
   let object = {
      subject: "Стать частью команды с сайта Own stone",
      text: `
         Имя: ${name.value}
         Телефон: ${phone.value}
         E-mail: ${email.value}
         О себе: ${about.value}
      `,
   }
   let response = await store.sendForm(object)
   console.log(response);
   if (response.status) {
      name.value = store.user?.firstname || ""
      phone.value = store.user?.phonenumber || ""
      email.value = ""
      about.value = ""
      checked.value = false
      success.value = true
      setTimeout(() => {
         emit('closePopup')
         success.value = false
      }, 2000)
   }
}

</script>
