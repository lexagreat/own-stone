<template>
   <section class="form-section">
      <div class="form-section__wrapper">
         <div class="form-section__main">
            <div class="form-section__header">
               <h2 class="form-section__title h1" v-html="info.title">
               </h2>
               <p class="body-text" v-html="info.text"></p>
            </div>
            <div class="form-section__content">
               <ul class="form-section__inputs">
                  <li>
                     <FormInput v-model="name" placeholder="Ваше имя" id="formName" />
                  </li>
                  <li>
                     <FormInput v-model="phone" placeholder="Телефон" id="formPhone" isPhone />
                  </li>
               </ul>
               <div class="form-section__check">
                  <FormCheckbox v-model="checked" id="formCheck" />
                  <span>Я согласен с <NuxtLink to="/policy" target="_blank">политикой конфиденциальности</NuxtLink>
                  </span>
               </div>
               <UiButton class="black" :class="{ disabled: !isDisabledBtn }" @click="send">Оставить заявку</UiButton>
            </div>
         </div>
         <div class="form-section__map">
            <MapsOffice :info="contacts?.info?.contacts_info" />
         </div>
      </div>
      <ModalSuccessModal :isOpen="success" @closePopup="success = false" />
   </section>
</template>
<script setup>
import { useAccount } from '~/store/account'
import { useContacts } from '~/store/contacts'
const contacts = useContacts()
const store = useAccount()
const props = defineProps({
   info: Object
})
const name = ref("")
const phone = ref("")
const checked = ref(false)
const success = ref(false)



const isDisabledBtn = computed(() => {
   return checked.value && name.value.length && phone.value.length >= 15
})
const send = async () => {
   let object = {
      subject: "Заявка с сайта Own stone",
      text: `
         Имя: ${name.value}
         Телефон: ${phone.value}
      `,
   }
   let response = await store.sendForm(object)
   // console.log(response);
   if (response.status) {
      name.value = store.user?.firstname || ""
      phone.value = store.user?.phonenumber || ""
      checked.value = false
      success.value = true
      setTimeout(() => {
         success.value = false
      }, 2000)

   }
}
</script>