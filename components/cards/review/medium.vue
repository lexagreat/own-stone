<template>
   <div class="review-medium home-reviews__card">
      <div class="review-medium__header">
         <div class="review-medium__image">
            <img :src="info?.photo?.url" alt="">
         </div>
         <div class="review-medium__title h3">{{ info?.name }}</div>
      </div>
      <div class="review-medium__main body-text">
         <div class="review-medium__visible" v-html="info?.text"></div>

         <button @click="emit('openModal', info)">Читать полностью</button>
      </div>
   </div>
</template>
<script setup>
const props = defineProps({
   info: Object
})
const emit = defineEmits(['openModal'])

</script>