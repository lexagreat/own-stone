<template>
   <UiModal :isOpen="isOpen" @closePopup="emit('closePopup')" class="review-modal">
      <div class="modal__content review-modal__content">
         <UiModalCloseBtn @click="emit('closePopup')" />
         <div class="review-modal__header">
            <div class="review-modal__image circle">
               <img src="/img/home/review-medium.png" alt="">
            </div>
            <span class="review-modal__name">Елена</span>
         </div>
         <p class="body-text">
            С помощью агентства OWNSTONE мы с мужем купили квартиру. Очень комфортно было смотреть квартиры, Елизавета
            договаривалась по времени удобно для нас. Очень ответственная, вежливая, к работе с полной отдачей. Нас
            устроило отношения, профессионализм. Всегда была с нами на связи, отвечала на интересующие вопросы. Сделка
            прошла легко и отлично.
         </p>
      </div>
   </UiModal>
</template>
<script setup>
const props = defineProps({
   isOpen: Boolean
})
const emit = defineEmits(['closePopup'])
</script>