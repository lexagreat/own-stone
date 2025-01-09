<template>
   <section class="home-taxi">
      <img :src="info?.picture.url" alt="">
      <div class="container">
         <div class="home-taxi__wrapper">
            <h2 class="home-taxi__title h1" v-html="info.title"></h2>
            <UiButton class="white">
               Вызвать машину
            </UiButton>
         </div>
      </div>
   </section>
</template>
<script setup>
import { sharedParallaxAnimation } from '@/assets/js/animations'
const props = defineProps({
   info: Object
})
onMounted(() => {
   sharedParallaxAnimation(".home-taxi > img", ".home-taxi")
})

</script>