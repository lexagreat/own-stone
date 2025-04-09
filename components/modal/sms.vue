<template>
   <UiModal @closePopup="emit('closePopup')" class="auth-modal">
      <div class="auth-modal__content modal__content">
         <UiModalCloseBtn @click="emit('closePopup')" />
         <div class="auth-modal__header">
            <h3 class="auth-modal__title h1 dark-title">ВВЕдите <br class="pc"> <span>СМС-код</span></h3>
            <p class="body-text" style="color: #18181880;">
               Для подтверждения телефона введите код из смс, отправленного на номер:
            </p>
            <div class="sms-modal__row">
               <span>{{ phone }}</span>
               <button @click="emit('changePhone')" style="color: #181818;" v-if="store.time <= 0">Изменить</button>
            </div>
         </div>
         <div class="sms-modal__main">
            <FormCodeInput @changeValue="onChangeCode" />
            <span v-if="store.time > 0">Получить код повторно через 00:{{ store.time >= 10 ? store.time : '0' +
               store.time
               }}</span>
         </div>
      </div>
   </UiModal>
</template>
<script setup>
import { useAccount } from '~/store/account'
const router = useRouter()
const store = useAccount()
const props = defineProps({
   phone: String,
})
const emit = defineEmits(['closePopup', 'changePhone'])

const code = ref('')
const onChangeCode = (value) => {
   code.value = value

}
watch(code, async (value) => {
   if (String(value).length == 4) {
      // console.log(value);
      let res = await store.sendCode(props.phone, value)
      if (res?.status) {
         emit('closePopup')
         router.push('/account')
      }
   }
})
</script>


<style lang="scss" scoped>
.pc {
   @media(max-width: 568px) {
      display: none;
   }
}
</style>