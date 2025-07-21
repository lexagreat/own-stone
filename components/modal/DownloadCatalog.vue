<template>
   <UiModal
      :isOpen="isOpen"
      @closePopup="emit('closePopup')"
      class="object-form"
   >
      <div class="modal__content object-form__content" v-if="success">
         <UiModalCloseBtn @click="emit('closePopup')" />
         <ModalSucess
            title="Заявка <br> <span>отправлена</span>"
            subtitle="В ближайшее время с Вами свяжется <br> наш специалист"
         />
      </div>
      <div class="modal__content object-form__content" ref="wrapper" v-else>
         <UiModalCloseBtn @click="emit('closePopup')" />
         <div class="object-form__header">
            <h3 class="object-form__title h1 dark-title">
               Получить <span>каталог</span>
            </h3>
            <p class="body-text">
               Оставьте свои контактные данные и наш специалист свяжется с Вами
               для уточнения запроса
            </p>
         </div>
         <div class="object-form__main">
            <div class="object-form__inputs">
               <FormInput placeholder="Ваше имя" v-model="name" />
               <FormInput
                  isPhone
                  placeholder="Ваш номер телефона"
                  v-model="phone"
               />
               <div class="form-section__check">
                  <FormCheckbox
                     v-model="checked"
                     id="object-form__checksdadas312312312"
                  />
                  <label for="object-form__check" style="cursor: pointer">
                     <span
                        >Я согласен с <NuxtLink to="/consent" target="_blank"
                           >Согласием на обработку персональных данных</NuxtLink
                        >
                     </span>
                  </label>
               </div>
            </div>
            <UiButton
               class="black"
               :class="{ disabled: !isDisabledBtn }"
               @click="send"
               >Оставить заявку</UiButton
            >
         </div>
      </div>
   </UiModal>
</template>
<script setup>
import { useAccount } from "~/store/account";

const props = defineProps({
   isOpen: Boolean,
   file: String,
});
const emit = defineEmits(["closePopup"]);
const store = useAccount();
const phone = ref("");
const name = ref("");
const checked = ref(false);

const isDisabledBtn = computed(() => {
   return phone.value.length >= 15 && checked.value && name.value.length;
});
const success = ref(false);
const wrapper = ref(null);
const send = async () => {
   let object = {
      subject: "Скачать каталог с сайта Own stone",
      text: `
         Имя: ${name.value}
         Телефон: ${wrapper.value.querySelector(".phone p span").innerHTML} ${
         phone.value
      }
      `,
   };
   let response = await store.sendForm(object);
   // console.log(response);
   if (response.status) {
      const fileUrl = props.file;
      const link = document.createElement("a");
      link.href = fileUrl;
      link.target = "_blank";
      link.download = "catalog"; // Можно указать имя файла, например: 'presentation.pdf'
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      phone.value = "";
      name.value = "";
      checked.value = false;
      success.value = true;
      setTimeout(() => {
         emit("closePopup");
         success.value = false;
      }, 2000);
   }
};
</script>
