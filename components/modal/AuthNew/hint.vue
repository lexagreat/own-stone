<template>
   <UiModal :isOpen="isOpen" @closePopup="emit('close')" class="auth-modal">
      <div class="modal__content">
         <UiModalCloseBtn @click="emit('close')" />
         <div class="header-profile">
            <h4 class="h4">Личный кабинет партнера</h4>
            <p>Передайте клиента в наше агентство и получите свое вознаграждение по факту реализованной
               сделки</p>
            <div class="header-profile__btns">
               <UiButton class="black" @click="emit('openAuth', 'reg')">Стать партнером
               </UiButton>
               <UiButton class="white" @click="emit('openAuth', 'log')">Войти
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