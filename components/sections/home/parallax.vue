<template>
   <section class="parallax-section">
      <div>
         <img src="/img/home/parallax.png" alt="" class="desktop">
         <img src="/img/home/parallax-tablet.png" alt="" class="tablet">
         <img src="/img/home/parallax-mobile.png" alt="" class="mobile">
      </div>
   </section>
</template>
<script setup>
import { parallaxAnimation } from '@/assets/js/animations'

onMounted(() => {
   parallaxAnimation()
})
</script>


<style scoped lang="scss">
.tablet,
.mobile {
   display: none;
}

@media(max-width: 1024px) {
   .desktop {
      display: none;
   }

   .tablet {
      display: block;
   }
}

@media(max-width: 568px) {
   .mobile {
      display: block;
   }

   .tablet {
      display: none;
   }
}
</style>