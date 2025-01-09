<template>
   <div class="review-small home-reviews__card">
      <div class="review-small__header">
         <div class="review-small__image">
            <img :src="info?.photo.url" alt="">
         </div>
         <div class="review-small__icon" @click="emit('openModal', info)">
            <svg width="40" height="40" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
               <circle cx="27.6" cy="28.1001" r="23.1" fill="#181818" />
               <path d="M31.5 28.32L24.78 32.9273L24.78 23.7127L31.5 28.32Z" fill="white" />
            </svg>
         </div>
      </div>
      <div class="review-small__title h3">{{ info?.name }}</div>
   </div>
</template>
<script setup>
const props = defineProps({
   info: Object
})
const emit = defineEmits(['openModal'])
</script>