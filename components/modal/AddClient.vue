<template>
   <UiModal :isOpen="isOpen" @closePopup="emit('closePopup')" class="object-form">
      <div class="modal__content object-form__content">
         <UiModalCloseBtn @click="emit('closePopup')" />
         <div class="object-form__header">
            <h3 class="object-form__title h1 dark-title">Передать <span>клиента</span>
            </h3>
            <p class="body-text">Добавьте информацию о вашем клиенте и отслеживайте статус сделки</p>
         </div>
         <div class="object-form__main">
            <div class="object-form__inputs">
               <FormInput placeholder="ФИО клиента" v-model="fio" />
               <FormInput isPhone placeholder="Контактный телефон клиента" v-model="phone" />
               <UiSelect :settings="typeSettings" @selectOption="onSelectTypeOption" />
               <FormInput placeholder="Бюджет" v-model="budget" custom-mask="##########" />
               <div class="form-section__check">
                  <FormCheckbox v-model="checked" id="object-form__check" />
                  <label for="object-form__check" style="cursor: pointer;">
                     <span>Я согласен с <NuxtLink to="/" target="_blank">политикой конфиденциальности</NuxtLink></span>
                  </label>
               </div>
            </div>
            <UiButton class="black" :class="{ disabled: !isDisabledBtn }" @click="send">Оставить заявку</UiButton>
         </div>

      </div>
   </UiModal>
</template>
<script setup>
import { useAccount } from '~/store/account'

const store = useAccount()
const props = defineProps({
   isOpen: Boolean
})
const emit = defineEmits(['closePopup'])

const fio = ref("")
const phone = ref("")
const budget = ref("")


const typeSettings = ref({
   options: [
      {
         name: "Покупка недвижимости ",
         value: 0,
         selected: true
      },
      {
         name: "Продажа недвижимости",
         value: 1,
      },
   ],
   placeholder: ""
})
const typeOption = ref(null)
function onSelectTypeOption(option) {
   typeOption.value = option
}

const isDisabledBtn = computed(() => {
   return checked.value && fio.value.length && phone.value.length == 18 && budget.value.length
})


const checked = ref(false)

const send = async () => {
   let object = {
      firstname: fio.value,
      phone: phone.value,
      budget: budget.value,
      type: typeOption.value.name
   }
   let response = await store.addNewClient(object)
   console.log(response);
   if (response.status) {
      fio.value = ""
      phone.value = ""
      budget.value = ""
      checked.value = false
      emit('closePopup')
   }
}
</script>


<style lang="scss" scoped>
.v-select {
   max-width: 100%;
}
</style>