<template>
   <div class="review-big home-reviews__card">
      <div class="review-big__header">
         <div class="review-big__image">
            <img :src="info?.photo.url" alt="">
         </div>
         <UiPlayButton @click="emit('openModal', info)" />
      </div>
      <div class="review-big__main">
         <div class="review-big__title h2">{{ info?.name }}</div>
         <div class="review-big__text body-text">{{ info?.text }}</div>
      </div>
   </div>
</template>
<script setup>
const props = defineProps({
   info: Object
})
const emit = defineEmits(['openModal'])
</script>