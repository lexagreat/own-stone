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
            <p class="body-text">{{ items[index].description }}</p>
         </div>
         <div class="object-form__main">
            <div class="object-form__inputs">
               <FormInput placeholder="Ваше имя" v-model="name" />
               <FormInput isPhone placeholder="Ваш номер телефона" v-model="phone" />
               <div class="form-section__check">
                  <FormCheckbox v-model="checked" id="object-form__check" />
                  <label for="object-form__check" style="cursor: pointer;">
                     <span>Я согласен с <NuxtLink to="/consent" target="_blank">Согласием на обработку персональных
                           данных</NuxtLink>
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
const store = useAccount()
const props = defineProps({
   isOpen: Boolean,
   id: String,
   index: Number
})
const success = ref(false)
const emit = defineEmits(['closePopup'])

const name = ref("")
const phone = ref("")
const checked = ref(false)
const wrapper = ref(null)
const items = ref([
   {
      title: "Покупка",
      description: "Если Вам нужна помощь в выборе объекта - оставьте заявку и наш специалист с Вами свяжется в течение 10 минут",
   },
   {
      title: "Продажа",
      description: "Разработаем оптимальную стратегию продажи квартиры. Организуем максимальное количество показов и встреч с потенциальными покупателями.",
   },
   {
      title: "Инвестиция",
      description: "Подберем инвестиционно-привлекательные лоты и поможем сформировать инвестиционный портфель",
   },
])
const isDisabledBtn = computed(() => {
   return phone.value.length >= 15 && name.value.length && checked.value
})
const send = async () => {
   let object = {
      subject: "Оставить заявку на услугу с сайта Own stone",
      text: `
         Название услуги: ${items.value[props.index].title}
         Имя: ${name.value}
         Телефон: ${wrapper.value.querySelector('.phone p span').innerHTML} ${phone.value}
      `,
   }
   let response = await store.sendForm(object)
   // console.log(response);
   if (response.status) {
      name.value = ""
      phone.value = ""
      checked.value = false
      success.value = true
      setTimeout(() => {
         emit('closePopup')
         success.value = false
      }, 2000)
   }
}
</script>