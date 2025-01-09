<template>
   <section class="home-partners">
      <div class="container">
         <div class="home-partners__wrapper">
            <div class="home-partners__header">
               <h2 class="home-partners__title h1" v-html="info.title">
               </h2>
               <div class="home-partners__text body-text" v-html="info.text"></div>
            </div>
            <ul class="home-partners__list scrollbar-none">
               <li class="home-partners__item" v-for="(item, i) in info.home_partners_list" :key="item">
                  <div class="home-partners__image">
                     <component :is="item.icon" />
                     <img :src="item?.picture.url" alt="">
                  </div>
                  <p class="home-partners__text h4" v-html="item.text"></p>
               </li>
            </ul>
            <div class="home-partners__footer">
               <span class="body-text">{{ info.sub_text }}</span>
               <UiButton class="black">
                  Стать партнером
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