<template>
   <section class="sell-hero">
      <div class="sell-hero__image">
         <img :src="info.picture.url" alt="">
      </div>
      <div class="container">
         <div class="sell-hero__wrapper">
            <SectionsBreadcrumbs :path="path" />
            <h1 class="sell-hero__title h1 light-title" v-html="info.title"></h1>
            <div class="sell-hero__main">
               <p v-html="info.text"></p>
               <UiButton class="white" @click="scrollTo('.sell-calc')">{{ info.btn_name }}</UiButton>
            </div>
         </div>
      </div>
   </section>
</template>
<script setup>
import { sharedParallaxAnimation } from '~/assets/js/animations';
const props = defineProps({
   info: Object
})
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