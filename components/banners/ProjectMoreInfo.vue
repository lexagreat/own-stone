<template>
   <section class="project-banner">
      <div class="container">
         <div class="project-banner__wrapper">
            <h2 class="project-banner__title h1 light-title">подборнее о квартирах
               <br> <span>в жилом комплексе</span>
            </h2>
            <div class="project-banner__main">
               <div class="project-banner__image">
                  <img src="/img/project/banner-more-info.svg" alt="">
               </div>
               <UiButton class="white" @click="isOpen = true">Запланировать визит</UiButton>
               <ModalProjectVisit :is-open="isOpen" @closePopup="isOpen = false" />
            </div>
         </div>
      </div>
   </section>
</template>
<script setup>
const isOpen = ref(false)

</script>