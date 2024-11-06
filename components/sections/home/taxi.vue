<template>
   <section class="home-taxi">
      <img src="/img/home/taxi.png" alt="">
      <div class="container">
         <div class="home-taxi__wrapper">
            <h2 class="home-taxi__title h1">
               оплатим такси <span>до нашего офиса</span>
            </h2>
            <UiButton class="white">
               Вызвать машину
            </UiButton>
         </div>
      </div>
   </section>
</template>
<script setup>
import { taxiAnimation } from '@/assets/js/animations'

onMounted(() => {
   taxiAnimation()
})

</script>