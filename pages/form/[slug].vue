<template>
   <main class="main" style="overflow: hidden">
      <div class="form-page">
         <div class="object-form__content" v-if="success">
            <UiModalCloseBtn @click="emit('closePopup')" />
            <ModalSucess
               title="Спасибо"
               subtitle="В ближайшее время с Вами свяжется наш специалист"
            />
         </div>
         <div class="object-form__content" v-else>
            <div class="object-form__header">
               <h3
                  class="object-form__title h1 dark-title"
                  v-html="info?.title"
               ></h3>
               <p class="body-text" v-html="info?.subtitle"></p>
            </div>
            <div class="object-form__main">
               <FormBrokerStarRating
                  v-model="rating"
                  v-if="info?.show_rating"
               />
               <div class="object-form__inputs">
                  <FormInput placeholder="Ваше имя" v-model="name" />
                  <FormPhoneInput
                     placeholder="Ваш номер телефона"
                     id="1231231231"
                     v-model="phone"
                  />
                  <div
                     class="form-section__check"
                     style="margin-bottom: 0"
                     v-if="info?.policy?.url?.length"
                  >
                     <FormCheckbox v-model="checked" id="form-section__check" />
                     <label for="form-section__check" style="cursor: pointer">
                        <span
                           >Я согласен с <NuxtLink
                              :to="info?.policy?.url"
                              target="_blank"
                              >Согласием на обработку персональных
                              данных</NuxtLink
                           >
                        </span>
                     </label>
                  </div>
                  <div
                     class="form-section__check"
                     style="margin: 0"
                     v-if="info?.oferta?.url?.length"
                  >
                     <FormCheckbox
                        v-model="checkedSec"
                        id="form-section__check"
                     />
                     <label for="form-section__check" style="cursor: pointer">
                        <span
                           >Я согласен с <NuxtLink
                              :to="info?.oferta?.url"
                              target="_blank"
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
const route = useRoute();
const info = await useBaseFetch(`/appeals/?page_url=${route.params.slug}`);
if (!info.id) {
   throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found",
   });
}
const name = ref("");
const phone = ref("");
const checked = ref(false);
const rating = ref(0);
const checkedSec = ref(false);
const isDisabledBtn = computed(() => {
   return (
      phone.value.length >= 15 &&
      name.value.length &&
      (info.show_rating ? rating.value > 0 : true) &&
      (info.policy?.url?.length ? checked.value : true) &&
      (info.oferta?.url?.length ? checkedSec.value : true)
   );
});
const success = ref(false);

const send = async () => {
   let object = {
      subject: "Форма брокера с сайта Own stone",
      text: `
         Slug: ${route.params.slug}   
         Имя: ${name.value}
         Телефон: ${phone.value}   
         ${info.show_rating ? "Оценка: " + rating.value : ""}
      `,
   };
   let response = await store.sendForm(object);
   console.log(response);
   if (response.status) {
      rating.value = 0;
      name.value = "";
      phone.value = "";
      checked.value = false;
      checkedSec.value = false;
      success.value = true;
      setTimeout(() => {
         success.value = false;
      }, 3000);
   }
};

useHead({
   title: "OWNSTONE - Ваш персональный советник на рынке недвижимости",
});
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
