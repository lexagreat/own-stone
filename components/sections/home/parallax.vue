<template>
   <section class="parallax-section">
      <div style="pointer-events: none;">
         <img :src="info?.picture.url" alt="" class="desktop">
         <img :src="info?.picture_tablet.url" alt="" class="tablet">
         <img :src="info?.picture_mobile.url" alt="" class="mobile">
      </div>
   </section>
</template>
<script setup>
import { parallaxAnimation } from '@/assets/js/animations'
const props = defineProps({
   info: Object
})
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