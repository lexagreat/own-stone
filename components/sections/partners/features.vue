<template>
   <section class="home-partners partners-features">
      <div class="container">
         <div class="home-partners__wrapper">
            <div class="home-partners__header">
               <h2 class="home-partners__title h1">
                  ПРЕИМУЩЕСТВА <br><span>партнерства с OWNSTONE</span>
               </h2>
            </div>
            <ul class="home-partners__list scrollbar-none">
               <li class="home-partners__item" v-for="(item, i) in info" :key="item">
                  <div class="home-partners__image">
                     <img :src="item?.picture.url" alt="">
                  </div>
                  <p class="home-partners__text h4" v-html="item.text"></p>
               </li>
            </ul>

         </div>
      </div>
   </section>
</template>
<script setup>
const props = defineProps({
   info: Object
})
</script>
