<template>
   <UiModal :isOpen="isOpen" @closePopup="emit('closePopup')" class="object-form">
      <div class="modal__content object-form__content" v-if="success">
         <UiModalCloseBtn @click="emit('closePopup')" />
         <ModalSucess title="подписка <br> <span>оформлена</span>"
            subtitle="Теперь Вы будете в курсе всех <br> уникальных предложений" />
      </div>
      <div class="modal__content object-form__content" v-else>
         <UiModalCloseBtn @click="emit('closePopup')" />
         <div class="object-form__header">
            <h3 class="object-form__title h1 dark-title">Подписка <br class="pc-br"> <span>на рассылку</span></h3>
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
            <UiButton class="black" style="width: 100%;" :class="{ disabled: !isDisabledBtn }" @click="send">Отправить
               заявку
            </UiButton>
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
   return validEmail(email.value) && checked.value
})

const success = ref(true)
const send = async () => {
   let object = {
      subject: "Подписка на рассылку с сайта Own stone",
      text: `
         E-mail: ${email.value}
      `,
   }
   let response = await store.sendForm(object)
   // console.log(response);
   if (response.status) {
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

<style lang="scss" scoped>
.pc-br {
   @media(max-width: 1024px) {
      display: none;
   }
}
</style>