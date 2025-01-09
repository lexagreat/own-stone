<template>
   <div class="case-big">
      <div class="case-big__image">
         <img :src="info?.photo?.url" alt="">
      </div>
      <div class="case-big__main">
         <UiPlayButton @click="emit('openVideo', info)" />
         <div class="case-big__info">
            <h3 class="case-big__title h3">{{ info?.title }}</h3>
            <span class="case-big__author body-text">
               {{ info?.text_short }}
            </span>
         </div>
      </div>

   </div>
</template>
<script setup>
const props = defineProps({
   info: Object
})
const emit = defineEmits('openVideo')
</script>