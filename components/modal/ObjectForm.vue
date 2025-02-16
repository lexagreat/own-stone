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
            <h3 class="object-form__title h1 dark-title">Узнать <span>подробнее</span></h3>
            <p class="body-text">Если Вы хотите узнать подробнее об объекте - оставьте заявку и наш специалист с Вами
               свяжется в течение
               10 минут</p>
         </div>
         <div class="object-form__main">
            <div class="object-form__inputs">
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
         <div class="object-form__footer">
            <span class="body-text">Или свяжитесь с нами</span>
            <ul>
               <li>
                  <NuxtLink :to="contacts?.contacts_info?.contacts_info_links[1].href_attr" class="circle"
                     target="_blank">
                     <TgIcon />
                  </NuxtLink>
               </li>
               <li>
                  <NuxtLink :to="contacts?.contacts_info?.contacts_info_links[2].href_attr" class="circle"
                     target="_blank">
                     <WhatsappIcon />
                  </NuxtLink>
               </li>
               <li>
                  <NuxtLink :to="'tel:' + contacts?.contacts_info?.phonehumber" class="circle" target="_blank">
                     <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Icons / phone">
                           <path id="Vector"
                              d="M17.5 13.6833V16.63C17.5001 16.841 17.4202 17.0441 17.2763 17.1985C17.1325 17.3528 16.9355 17.4469 16.725 17.4617C16.3608 17.4867 16.0633 17.5 15.8333 17.5C8.46917 17.5 2.5 11.5308 2.5 4.16667C2.5 3.93667 2.5125 3.63917 2.53833 3.275C2.5531 3.06454 2.64715 2.86751 2.8015 2.72367C2.95585 2.57984 3.15902 2.4999 3.37 2.5H6.31667C6.42003 2.4999 6.51975 2.53822 6.59644 2.60752C6.67313 2.67682 6.72133 2.77215 6.73167 2.875C6.75083 3.06667 6.76833 3.21917 6.785 3.335C6.9506 4.49077 7.28999 5.61487 7.79167 6.66917C7.87083 6.83583 7.81917 7.035 7.66917 7.14167L5.87083 8.42667C6.97038 10.9887 9.01212 13.0305 11.5742 14.13L12.8575 12.335C12.91 12.2617 12.9865 12.2091 13.0737 12.1864C13.161 12.1637 13.2535 12.1723 13.335 12.2108C14.3892 12.7116 15.513 13.0501 16.6683 13.215C16.7842 13.2317 16.9367 13.25 17.1267 13.2683C17.2294 13.2789 17.3245 13.3271 17.3936 13.4038C17.4628 13.4805 17.5001 13.5801 17.5 13.6833Z"
                              fill="#181818" />
                        </g>
                     </svg>
                  </NuxtLink>
               </li>
            </ul>
         </div>
      </div>
   </UiModal>
</template>
<script setup>
import TgIcon from '~/assets/img/icons/tg.svg'
import WhatsappIcon from '~/assets/img/icons/whatsapp.svg'
import { useAccount } from '~/store/account'
import { useContacts } from '~/store/contacts'
const store = useAccount()
const contacts = useContacts()
const props = defineProps({
   isOpen: Boolean,
   id: String
})
const emit = defineEmits(['closePopup'])

const name = ref("")
const phone = ref("")
const checked = ref(false)


const isDisabledBtn = computed(() => {
   return phone.value.length >= 17 && name.value.length && checked.value
})
const success = ref(false)
const send = async () => {
   let object = {
      subject: "Узнать подробнее про объект с сайта Own stone",
      text: `
         Имя: ${name.value}
         Телефон: ${phone.value}
         DocumentId: ${props.id}
      `,
      documentId: props.id
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