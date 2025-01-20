<template>
   <UiModal :isOpen="isOpen" @closePopup="emit('closePopup')" class="object-form">
      <div class="modal__content object-form__content">
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
            <UiButton class="black">Оставить заявку</UiButton>
         </div>
      </div>
   </UiModal>
</template>
<script setup>

const props = defineProps({
   isOpen: Boolean,
   projectName: String
})
const emit = defineEmits(['closePopup'])

const name = ref("")
const phone = ref("")
const checked = ref(false)

const project = ref(props.projectName)
</script>