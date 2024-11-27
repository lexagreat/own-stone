<template>
   <section class="sell-hero">
      <div class="sell-hero__image">
         <img src="/img/partners/hero.png" alt="">
      </div>
      <div class="container">
         <div class="sell-hero__wrapper">
            <SectionsBreadcrumbs :path="path" />
            <h1 class="sell-hero__title h1 light-title">присоединяйтесь <br> <span>к партнерской программе</span> </h1>
            <div class="sell-hero__main">
               <p>И получайте вознаграждение в размере 30% от общей комиссии по факту реализованной сделки </p>
               <UiButton class="white">Стать партнером</UiButton>
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
      name: "Партнеры",
      to: ""
   },
])


onMounted(() => {
   sharedParallaxAnimation(".sell-hero__image img", ".sell-hero")
})
</script>