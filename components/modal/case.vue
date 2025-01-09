<template>
   <UiModal :isOpen="isOpen" @closePopup="emit('closePopup')" class="case-modal">
      <div class="modal__content case-modal__content review-modal__content">
         <UiModalCloseBtn @click="emit('closePopup')" />
         <div class="case-small__header">
            <div class="case-small__image circle">
               <img :src="info?.photo?.url" alt="">
            </div>
            <h3 class="case-small__title h3">{{ info?.title }}</h3>
         </div>
         <div class="case-small__main body-text">
            <ul>
               <li v-for="item in info?.partners_case_props" :key="item">
                  <span>{{ item?.name }}</span>
                  <span>{{ item?.value }}</span>
               </li>
            </ul>
            <p v-html="info?.text_long"></p>
         </div>
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
<script setup></script>