<template>
   <UiModal :isOpen="isOpen" @closePopup="emit('closePopup')" class="object-form">
      <div class="modal__content object-form__content" v-if="success">
         <UiModalCloseBtn @click="emit('closePopup')" />
         <ModalSucess title="Вопрос <span>отправлен</span>"
            subtitle="В ближайшее время с Вами свяжется наш специалист" />

      </div>
      <div class="modal__content object-form__content row" v-else>
         <UiModalCloseBtn @click="emit('closePopup')" />
         <div class="object-form__image">
            <img src="/img/catalog-modal.png" alt="">
         </div>
         <div class="object-form__wrapper">
            <div class="object-form__header">
               <h3 class="object-form__title h1 dark-title">Выбрать <span>объект</span>
               </h3>
            </div>
            <div class="object-form__main">
               <div class="object-form__inputs">
                  <FormInput placeholder="Ваше имя" v-model="name" />
                  <FormInput isPhone placeholder="Ваш номер телефона" v-model="phone" />
                  <div class="form-section__check">
                     <FormCheckbox v-model="checked" id="object-form__check" />
                     <label for="object-form__check" style="cursor: pointer;">
                        <span>Я согласен с <NuxtLink to="/policy" target="_blank">политикой конфиденциальности
                           </NuxtLink>
                        </span>
                     </label>
                  </div>
               </div>
               <UiButton class="black" style="width: 100%;" :class="{ disabled: !isDisabledBtn }" @click="send">
                  Отправить
                  заявку
               </UiButton>
            </div>
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



const isDisabledBtn = computed(() => {
   return checked.value && name.value.length && phone.value.length == 18
})


const checked = ref(false)
const success = ref(false)

const send = async () => {
   let object = {
      subject: "Выбрать объект с сайта Own stone",
      text: `
         Имя: ${name.value}
         Телефон: ${phone.value}
      `,


   }
   let response = await store.sendForm(object)
   console.log(response);
   if (response.status) {
      name.value = store.user?.firstname
      phone.value = store.user?.phonenumber
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

.object-form {
   &__content {
      &.row {
         width: 907px;
         display: flex;
         flex-direction: row;

         @media(max-width: 1024px) {
            width: 100%;
         }
      }
   }

   &__wrapper {
      display: flex;
      flex-direction: column;
      gap: 40px;

      @media(max-width: 1024px) {
         width: 100%;
      }
   }

   &__image {
      @media(max-width: 1024px) {
         display: none;
      }
   }
}
</style>