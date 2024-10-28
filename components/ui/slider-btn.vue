<template>

   <button class="slider-btn" :class="{ 'swiper-button-prev': prev, 'swiper-button-next': next, }">
      <ArrowIcon style="rotate: 90deg;" v-if="prev" />
      <ArrowIcon style="rotate: -90deg;" v-if="next" />
   </button>

</template>
<script setup>
import ArrowIcon from "@/assets/img/icons/arrow_down.svg"
const props = defineProps({
   prev: Boolean,
   next: Boolean
})
</script>