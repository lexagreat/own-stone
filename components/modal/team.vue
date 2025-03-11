<template>
   <UiModal :isOpen="isOpen" @closePopup="emit('closePopup')" class="object-form team-modal">
      <div class="modal__content object-form__content" v-if="success">
         <UiModalCloseBtn @click="emit('closePopup')" />
         <ModalSucess title="Резюме <br> <span>отправлено</span>"
            subtitle="Благодарим за проявленный интерес к работе в агентстве OWNSTONE! В ближайшее время с вами свяжется сотрудник HR-отдела." />

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
               <label class="team-modal__file" style="cursor: pointer;">
                  <input type="file" @change='onChangeFile'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                     <path
                        d="M12.6159 3.00049C11.749 3.00049 10.8956 3.33679 10.2379 3.99457L4.39036 9.84208C2.53648 11.696 2.53662 14.7123 4.39036 16.5667C6.24423 18.4206 9.26054 18.4205 11.115 16.5667L15.0133 12.6684L14.1362 11.7913L10.2379 15.6896C8.86013 17.0668 6.64455 17.0667 5.26748 15.6896C3.89028 14.3119 3.89041 12.0963 5.26748 10.7192L11.115 4.87169C11.9538 4.03286 13.2974 4.03286 14.1362 4.87169C14.975 5.71052 14.975 7.05408 14.1362 7.89291L8.2887 13.7404C7.98815 14.0406 7.51644 14.0402 7.21665 13.7404C6.91645 13.4399 6.91687 12.9682 7.21665 12.6684L12.5769 7.30816L11.6997 6.43103L6.33953 11.7913C5.56275 12.568 5.56316 13.8403 6.33953 14.6175C7.11631 15.3943 8.38856 15.3939 9.16583 14.6175L15.0133 8.77003C16.3289 7.45449 16.3289 5.31011 15.0133 3.99457C14.3556 3.33679 13.4827 3.00049 12.6159 3.00049Z"
                        fill="#181818" fill-opacity="0.3" />
                  </svg>
                  <span style="color: black;" v-if="file?.name">{{ file?.name }}</span>
                  <span v-else>Прикрепите резюме</span>
               </label>
               <FormInput placeholder="Краткий рассказ о себе" v-model="about" />
               <div class="form-section__check">
                  <FormCheckbox v-model="checked" id="object-form__checksdadas312312312" />
                  <label for="object-form__check" style="cursor: pointer;">
                     <span>Я согласен с <NuxtLink to="/policy" target="_blank">политикой конфиденциальности</NuxtLink>
                     </span>
                  </label>
               </div>
            </div>
            <UiButton class="black" :loading="loading" :class="{ disabled: !isDisabledBtn }" @click="send">Отправить
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
const name = ref("")
const phone = ref("7")
const email = ref("")
const about = ref("")
const checked = ref(false)
const file = ref(null)
const loading = ref(false)
const isDisabledBtn = computed(() => {
   return checked.value && name.value.length && phone.value.length >= 17
})
const success = ref(false)
const onChangeFile = (e) => {
   file.value = e.target.files[0]
}
const send = async () => {
   let object = {
      subject: "Стать частью команды с сайта Own stone",
      file: file.value,
      text: `
         Имя: ${name.value}
         Телефон: ${phone.value}
         E-mail: ${email.value}
         О себе: ${about.value}
      `,
   }
   loading.value = true
   let response = await store.sendForm(object)
   // console.log(response);
   if (response.status) {
      name.value = store.user?.firstname || ""
      phone.value = store.user?.phonenumber || ""
      email.value = ""
      file.value = null
      about.value = ""
      checked.value = false
      success.value = true
      loading.value = false
      setTimeout(() => {
         emit('closePopup')
         success.value = false
      }, 5000)
   }
}
watch(() => props.isOpen, () => {
   success.value = false;

})
</script>

<style lang="scss" scoped>
.team-modal {
   .modal__content {
      width: 500px;

      @media(max-width: 568px) {
         width: 100%;
      }
   }

   &__file {
      display: flex;
      align-items: center;
      gap: 8px;
      height: 56px;
      width: 100%;
      padding-left: 20px;
      border-radius: 4px;
      background: white;
      color: rgba(24, 24, 24, 0.30);
      // font-family: Arial;
      font-size: 16px;
      font-weight: 400;
      line-height: 100%;
      /* 16px */
      color: #1818184D;

      input {
         display: none;
      }
   }
}
</style>