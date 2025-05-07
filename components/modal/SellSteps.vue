<template>
   <UiModal :isOpen="isOpen" @closePopup="emit('closePopup')" class="object-form">
      <div class="modal__content object-form__content" v-if="success">
         <UiModalCloseBtn @click="emit('closePopup')" />
         <ModalSucess title="Заявка <span>отправлена</span>"
            subtitle="В ближайшее время с Вами свяжется наш специалист" />
      </div>
      <div class="modal__content object-form__content" ref="wrapper" v-else>
         <UiModalCloseBtn @click="emit('closePopup')" />
         <div class="object-form__header" style="text-align: left;">
            <h3 class="object-form__title h1 dark-title">Оставить <br> <span>заявку</span>
            </h3>
            <p class="body-text">Разработаем оптимальную стратегию продажи квартиры. Организуем максимальное количество
               показов и встреч с потенциальными покупателями.</p>
         </div>
         <div class="object-form__main">
            <div class="object-form__inputs">
               <FormInput placeholder="Ваше имя" v-model="name" />
               <FormInput isPhone placeholder="Ваш номер телефона" v-model="phone" />
               <FormInput placeholder="E-mail" v-model="email" />
               <div class="form-section__check">
                  <FormCheckbox v-model="checked" id="object-form__checksdadas312312312" />
                  <label for="object-form__check" style="cursor: pointer;">
                     <span>Я согласен с <NuxtLink to="/policy" target="_blank">политикой в отношении обработки
                           персональных данных</NuxtLink>
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
   isOpen: Boolean
})
const emit = defineEmits(['closePopup'])
const store = useAccount()
const name = ref("")
const phone = ref("")
const email = ref("")
const checked = ref(false)
const wrapper = ref(null)
const isDisabledBtn = computed(() => {
   return phone.value.length >= 15 && name.value.length && checked.value
})
const success = ref(false)
const send = async () => {
   let object = {
      subject: "Оставить заявку с сайта Own stone",
      text: `
         Имя: ${name.value}
         Email: ${email.value}
         Телефон: ${wrapper.value.querySelector('.phone p span').innerHTML} ${phone.value}
      `,
   }
   let response = await store.sendForm(object)
   // console.log(response);
   if (response.status) {
      name.value = ""
      phone.value = ""
      email.value = ""
      checked.value = false
      success.value = true
      setTimeout(() => {
         emit('closePopup')
         success.value = false
      }, 2000)
   }
}

</script>
