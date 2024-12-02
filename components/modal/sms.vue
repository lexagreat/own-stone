<template>
   <UiModal @closePopup="emit('closePopup')" class="auth-modal">
      <div class="auth-modal__content modal__content">
         <UiModalCloseBtn @click="emit('closePopup')" />
         <div class="auth-modal__header">
            <h3 class="auth-modal__title h1 dark-title">ВВЕдите <br> <span>СМС-код</span></h3>
            <p class="body-text">
               Для подтверждения телефона введите код из смс, отправленного на номер:
            </p>
            <div class="sms-modal__row">
               <span>{{ phone }}</span>
               <button @click="emit('changePhone')">Изменить</button>
            </div>
         </div>
         <div class="sms-modal__main">
            <FormCodeInput @changeValue="onChangeCode" />
            <span>Получить код повторно через 00:53</span>
         </div>
      </div>
   </UiModal>
</template>
<script setup>
const props = defineProps({
   phone: String
})
const emit = defineEmits(['closePopup', 'changePhone'])

const code = ref('')
const onChangeCode = (value) => {
   code.value = value
}
</script>