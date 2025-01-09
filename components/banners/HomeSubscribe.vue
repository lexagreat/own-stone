<template>
   <section class="home-subscribe">
      <div class="container">
         <div class="home-subscribe__wrapper">
            <h2 class="home-subscribe__title h1" v-html="info.title"></h2>
            <div class="home-subscribe__main">
               <div class="home-subscribe__text body-text" v-html="info.desc"></div>
               <UiButton class="white">
                  Подписаться
               </UiButton>
            </div>
         </div>
      </div>
   </section>
</template>
<script setup>

const props = defineProps({
   info: Object
})
</script>