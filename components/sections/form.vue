<template>
   <section class="form-section">
      <div class="form-section__wrapper">
         <div class="form-section__main">
            <div class="form-section__header">
               <h2 class="form-section__title h1">
                  Оставить <span>заявку</span>
               </h2>
               <p class="body-text">Наши специалисты в кратчайшие сроки свяжутся с Вами и проконсультируют по всем
                  интересующим вопросам!</p>
            </div>
            <div class="form-section__content">
               <ul class="form-section__inputs">
                  <li>
                     <FormInput v-model="name" placeholder="Ваше имя" id="formName" />
                  </li>
                  <li>
                     <FormInput v-model="phone" placeholder="Телефон" id="formPhone" isPhone />
                  </li>
               </ul>
               <div class="form-section__check">
                  <FormCheckbox v-model="checked" id="formCheck" />
                  <span>Я согласен с <NuxtLink to="/" target="_blank">политикой конфиденциальности</NuxtLink></span>
               </div>
               <UiButton class="black">Оставить заявку</UiButton>
            </div>
         </div>
         <div class="form-section__map">
            <MapsOffice />
         </div>
      </div>
   </section>
</template>
<script setup>
const name = ref("")
const phone = ref("")
const checked = ref(false)
</script>