<template>
   <UiModal :isOpen="isOpen" @closePopup="emit('close')" class="auth-modal">
      <div class="modal__content">
         <UiModalCloseBtn @click="emit('close')" />
         <div class="header-profile">
            <h4 class="h4">Личный кабинет партнера</h4>
            <p>Передайте клиента в наше агентство и получите вознаграждение в размере 30% от общей комиссии по факту
               реализованной сделки</p>
            <div class="header-profile__btns">
               <UiButton class="black" @click="emit('openAuth')">Стать партнером
               </UiButton>
               <UiButton class="white" @click="emit('openAuth')">Войти
               </UiButton>
            </div>
         </div>
      </div>
   </UiModal>
</template>
<script setup>
const props = defineProps({
   isOpen: Boolean
})
const emit = defineEmits(['close', 'openAuth'])
</script>