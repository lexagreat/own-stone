<template>
   <UiModal :isOpen="isOpen" @closePopup="emit('closePopup')" class="review-modal">
      <div class="modal__content review-modal__content">
         <UiModalCloseBtn @click="emit('closePopup')" />
         <div class="review-modal__header">
            <div class="review-modal__image circle">
               <img :src="info?.photo?.url" alt="">
            </div>
            <span class="review-modal__name">{{ info?.name }}</span>
         </div>
         <p class="body-text">
            {{ info?.text }}
         </p>
      </div>
   </UiModal>
</template>
<script setup>
const props = defineProps({
   isOpen: Boolean,
   info: Object
})
const emit = defineEmits(['closePopup'])
</script>