<template>
   <UiModal :isOpen="isOpen" @closePopup="emit('closePopup')" class="partner-info">
      <div class="modal__content partner-info__content scrollbar-none">
         <UiModalCloseBtn @click="emit('closePopup')" />
         <div class="partner-info__image">
            <img src="/img/about/partner-info-modal.png" alt="">
         </div>
         <div class="partner-info__main">
            <h3 class="h3 partner-info__title">ГК ФСК</h3>
            <p class="body-text partner-info__desc">
               Группа компаний ФСК является одной из крупнейших строительных компаний России, входит в десятку
               крупнейших девелоперов страны и является лидером в рейтинге уверенности российских застройщиков
               в сегменте массового жилья, по версии делового издания Forbes. ГК ФСК работает не только в Москве
               и Московской области, но также в Санкт-Петербурге и Ленинградской области, Калужской области
               и Краснодарском крае, а с 2022 года и во Владивостоке. В структуру корпорации входят собственные
               производственные мощности, генподрядные организации, технический заказчик, агентство недвижимости,
               управление и эксплуатация, сервисные службы.
            </p>
            <UiButton class="white" @click="emit('openForm')">Запросить контакты</UiButton>
         </div>
      </div>
   </UiModal>
</template>
<script setup>
const props = defineProps({
   isOpen: Boolean
})
const emit = defineEmits(['closePopup', 'openForm'])

</script>