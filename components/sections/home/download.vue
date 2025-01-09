<template>
   <section class="home-download">
      <div class="container">
         <div class="home-download__wrapper">
            <h2 class="home-download__title h1" v-html="info.title"></h2>
            <div class="home-download__image">
               <img :src="info?.picture[0].url" alt="">
            </div>
            <div class="home-download__content">
               <p class="body-text" v-html="info.text">

               </p>
               <NuxtLink class="btn black" download :to="info.file[0].url" target="_blank">
                  Скачать каталог
               </NuxtLink>
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