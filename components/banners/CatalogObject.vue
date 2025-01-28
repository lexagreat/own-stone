<template>
   <section class="object-banner">
      <div class="object-banner__wrapper">
         <h2 class="object-banner__title h1">Выбрать <span>объект</span></h2>
         <div class="object-banner__main">
            <p class="body-text">Если Вам нужна помощь в выборе объекта - оставьте заявку и наш специалист с Вами
               свяжется в течение 10
               минут</p>
            <UiButton class="white" @click="isOpen = true">Оставить заявку</UiButton>
         </div>
      </div>
      <ModalCatalogChoose :is-open="isOpen" @closePopup="isOpen = false" />
   </section>
</template>
<script setup>
const isOpen = ref(false)
</script>