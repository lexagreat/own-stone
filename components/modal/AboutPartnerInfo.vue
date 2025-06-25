<template>
   <UiModal :isOpen="isOpen" @closePopup="emit('closePopup')" class="partner-info">
      <div class="modal__content partner-info__content scrollbar-none">
         <UiModalCloseBtn @click="emit('closePopup')" />
         <div class="partner-info__image">
            <img :src="info?.big_image?.url" alt="">
         </div>
         <div class="partner-info__main">
            <h3 class="h3 partner-info__title">{{ info?.title }}</h3>
            <p class="body-text partner-info__desc" v-html="info?.big_description">
            </p>
            <UiButton class="white" @click="emit('openForm')">Запросить контакты</UiButton>
         </div>
      </div>
   </UiModal>
</template>
<script setup>
const props = defineProps({
   isOpen: Boolean,
   info: Object
})
const emit = defineEmits(['closePopup', 'openForm'])

</script>