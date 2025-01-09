<template>
   <section class="about-value">
      <div class="container">
         <div class="about-value__wrapper scrollbar-none">
            <div class="about-value__row" v-for="item in info" :key="item">
               <div class="about-value__bg">
                  <h2 class="about-value__title h1 dark-title">
                     <p v-html="item.title"></p>
                  </h2>
               </div>
               <div class="about-value__item">
                  <img :src="item.picture.url" alt="">
                  <h4 class="h4" v-html="item.text">
                  </h4>
                  <NuxtLink class="btn black" v-if="item.btn_title?.length" to="/services">{{ item.btn_title }}
                  </NuxtLink>
               </div>
            </div>
         </div>
      </div>
   </section>
</template>
<script setup>
import { aboutValueAnim } from '~/assets/js/animations';

const props = defineProps({
   info: Array
})
onMounted(() => {
   aboutValueAnim()
})
</script>