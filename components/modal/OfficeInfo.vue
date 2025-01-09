<template>
   <UiModal :isOpen="isOpen" @closePopup="emit('closePopup')" class="office-modal">
      <div class="modal__content office-modal__content">
         <UiModalCloseBtn @click="emit('closePopup')" />
         <h4 class="h1 office-modal__title dark-title" v-html="title">
         </h4>
         <p class="body-text" v-html="desc"></p>
      </div>
   </UiModal>
</template>
<script setup>
const props = defineProps({
   isOpen: Boolean,
   title: String,
   desc: String,
})
const emit = defineEmits(['closePopup'])
</script>