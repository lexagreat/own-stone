<template>
   <section class="sell-hero">
      <div class="sell-hero__image">
         <img src="/img/sell/hero.png" alt="">
      </div>
      <div class="container">
         <div class="sell-hero__wrapper">
            <SectionsBreadcrumbs :path="path" />
            <h1 class="sell-hero__title h1 light-title">продать <span>недвижимость</span> </h1>
            <div class="sell-hero__main">
               <p>Специализируемся на быстрой и квалифицированной помощи в продаже недвижимости. Подберем индивидуальную
                  стратегию и сэкономим ваше время, силы и деньги. Возьмём на себя продвижение, найдем покупателя и
                  безопасно проведем сделку. </p>
               <UiButton class="white">Оценить стоимость</UiButton>
            </div>
         </div>
      </div>
   </section>
</template>
<script setup>
import { sharedParallaxAnimation } from '~/assets/js/animations';
const path = ref([
   {
      name: "Главная",
      to: "/"
   },
   {
      name: "Продать",
      to: ""
   },
])


onMounted(() => {
   sharedParallaxAnimation(".sell-hero__image img", ".sell-hero")
})
</script>