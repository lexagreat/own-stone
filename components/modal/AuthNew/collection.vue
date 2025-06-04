<template>
   <div>
      <ModalAuthNew :isOpen="isOpen" :opened="isOpen" @closePopup="emit('close')" @openSmsModal="onOpenSmsModal"
         :type="type" />
      <ModalSms :isOpen="isOpenSms" @closePopup="isOpenSms = false" :phone="smsPhone" @changePhone="onChangeSmsPhone" />
   </div>
</template>
<script setup>
const props = defineProps({
   isOpen: Boolean,
   type: String
})
const emit = defineEmits([
   'close',
   'open'
])

const isOpenSms = ref(false)
const smsPhone = ref('')


const onOpenSmsModal = (phone) => {
   smsPhone.value = phone
   isOpenSms.value = true
   emit('close')
}
const onChangeSmsPhone = () => {
   isOpenSms.value = false
   emit('open')
}

</script>