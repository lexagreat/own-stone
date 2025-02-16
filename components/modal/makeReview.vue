<template>
   <UiModal :isOpen="isOpen" @closePopup="emit('closePopup')" class="object-form review">
      <div class="modal__content object-form__content" v-if="success">
         <UiModalCloseBtn @click="emit('closePopup')" />
         <ModalSucess title="Благодарим <br> за <span>вашу оценку</span>"
            subtitle="Мы обработаем информацию в ближайшее время и свяжемся с вами при необходимости" />
      </div>
      <div class="modal__content object-form__content" v-else>
         <UiModalCloseBtn @click="emit('closePopup')" />
         <div class="object-form__header">
            <h3 class="object-form__title h1 dark-title">Оценить качество <br> <span>работы</span></h3>
         </div>
         <div class="object-form__main">
            <div class="object-form__inputs">
               <FormInput placeholder="Ваше имя" v-model="name" />
               <FormInput isPhone placeholder="Ваш номер телефона" v-model="phone" />
               <FormInput placeholder="ФИО специалиста" v-model="fio" />
               <UiSelect :settings="typeSettings" @selectOption="onSelectTypeOption" />
               <FormTextarea class="gc2" placeholder="Ваш отзыв" v-model="review" />
               <UiStarRaing v-model="rating" class="gc2" />
               <div class="form-section__check">
                  <FormCheckbox v-model="checked" id="object-form__check" />
                  <label for="object-form__check" style="cursor: pointer;">
                     <span>Я согласен с <NuxtLink to="/policy" target="_blank">политикой конфиденциальности</NuxtLink>
                     </span>
                  </label>
               </div>
            </div>
            <UiButton class="black" :class="{ disabled: !isDisabledBtn }" @click="send">Оставить отзыв</UiButton>
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
const fio = ref("")
const review = ref("")
const checked = ref(false)
const rating = ref(0);

const typeSettings = ref({
   options: [
      {
         name: "Покупка недвижимости ",
         value: 0,
         selected: true
      },
      {
         name: "Продажа недвижимости",
         value: 1,
      },
   ],
   placeholder: ""
})
const typeOption = ref(null)
function onSelectTypeOption(option) {
   typeOption.value = option.name
}

const isDisabledBtn = computed(() => {
   return checked.value && name.value.length && phone.value.length >= 17
})
const success = ref(false)
const send = async () => {
   let object = {
      subject: "Оценка качества работы с сайта Own stone",
      text: `
         Имя: ${name.value}
         ФИО сотрудника: ${fio.value}
         Телефон: ${phone.value}
         Тип: ${typeOption.value}
         Отзыв: ${review.value}
         Рейтинг: ${rating.value}
      `,
   }
   let response = await store.sendForm(object)
   // console.log(response);
   if (response.status) {
      name.value = store.user?.firstname || ""
      phone.value = store.user?.phonenumber || ""
      review.value = ""
      fio.value = ""
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
.object-form.review {
   .object-form {
      &__content {
         width: 664px;

         @media(max-width: 1024px) {
            width: 100%;
         }
      }

      // .object-form__header

      &__header {}

      // .object-form__title

      &__title {}

      // .object-form__main

      &__main {}

      // .object-form__inputs

      &__inputs {
         display: grid;
         grid-template-columns: repeat(2, 1fr);

         .gc2 {
            grid-column: span 2;
         }

         .v-select {
            max-width: 100%;

            &__wrapper {
               width: 100%;
               height: 100%;
            }
         }

         @media(max-width: 1024px) {
            display: flex;
            flex-direction: column;
         }
      }
   }
}
</style>