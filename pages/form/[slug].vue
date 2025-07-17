<template>
   <main class="main" style="overflow: hidden">
      <div class="form-page">
         <div class="object-form__content">
            <div class="object-form__header">
               <h3 class="object-form__title h1 dark-title">
                  Оставить <br />
                  <span>заявку</span>
               </h3>
               <p class="body-text">
                  Наши специалист в кратчайшие сроки свяжутся с Вами и
                  проконсультируют по всем интересующим вопросам!
               </p>
            </div>
            <div class="object-form__main">
               <FormBrokerStarRating v-model="rating" />
               <div class="object-form__inputs">
                  <FormInput placeholder="Ваше имя" v-model="name" />
                  <FormPhoneInput
                     placeholder="Ваш номер телефона"
                     v-model="phone"
                  />
                  <div class="form-section__check" style="margin-bottom: 0">
                     <FormCheckbox v-model="checked" id="form-section__check" />
                     <label for="form-section__check" style="cursor: pointer">
                        <span
                           >Я согласен с <NuxtLink to="/consent" target="_blank"
                              >Согласием на обработку персональных
                              данных</NuxtLink
                           >
                        </span>
                     </label>
                  </div>
                  <div class="form-section__check" style="margin: 0">
                     <FormCheckbox
                        v-model="checkedSec"
                        id="form-section__check"
                     />
                     <label for="form-section__check" style="cursor: pointer">
                        <span
                           >Я согласен с <NuxtLink to="/oferta" target="_blank"
                              >Соглашением на оферту о сотрудничестве
                           </NuxtLink>
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
      </div>
   </main>
</template>
<script setup>
import { useAccount } from "~/store/account";

const store = useAccount();
const name = ref("");
const phone = ref("");
const checked = ref(false);
const rating = ref(0);
const checkedSec = ref(false);
const wrapper = ref(null);
const isDisabledBtn = computed(() => {
   return (
      phone.value.length >= 15 &&
      name.value.length &&
      checked.value &&
      checkedSec.value
   );
});
const success = ref(false);

const send = async () => {
   let object = {
      subject: "Заказать звонок с сайта Own stone",
      text: `
         Телефон: ${wrapper.value.querySelector(".phone p span").innerHTML} ${
         phone.value
      }
      `,
   };
   let response = await store.sendForm(object);
   console.log(response);
   if (response.status) {
      phone.value = "";
      checked.value = false;
      success.value = true;
      setTimeout(() => {
         emit("closePopup");
         success.value = false;
      }, 3000);
   }
};
</script>

<style lang="scss" scoped>
.form-page {
   margin: 0 auto;
   margin-top: 40px;
   margin-bottom: 130px;
   padding: 20px 0;
   width: 728px;
   display: flex;
   align-items: center;
   justify-content: center;
   background-color: #f8f8f8;
   .object-form {
      &__content {
         align-items: center;
         text-align: center;
         padding: 0 !important;
      }
      &__main {
         width: 100%;
      }
   }
   .form-section__check {
      text-align: left;
   }
   @media (max-width: 1024px) {
      width: 100%;
      margin: 0;
      padding: 40px 30px;
   }
}
</style>
