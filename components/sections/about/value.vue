<template>
   <section class="about-value">
      <div class="container">
         <div class="about-value__wrapper scrollbar-none">
            <div class="about-value__row" ref="rows" v-for="item in info" :key="item">
               <div class="about-value__bg">
                  <h2 class="about-value__title h1 dark-title">
                     <p v-html="item.title"></p>
                  </h2>
               </div>
               <div class="about-value__item">
                  <img :src="item.picture.url" alt="">
                  <h4 class="h4" v-html="item.text">
                  </h4>
                  <a class="btn black" v-if="item.btn_title?.length" href="/services">{{ item.btn_title }}
                  </a>
               </div>
            </div>
         </div>
      </div>
   </section>
</template>
<script setup>
import { aboutValueAnim } from '~/assets/js/animations';
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
const props = defineProps({
   info: Array
})
const rows = ref([])
// const triggers = []
onMounted(() => {
   aboutValueAnim(rows.value)
})

</script>