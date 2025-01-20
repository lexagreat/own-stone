<template>
   <section class="home-hero">
      <div class="container">
         <div class="home-hero__wrapper">
            <h1 class="home-hero__title h1" v-html="text">
            </h1>
            <ul class="home-hero__btns">
               <li>
                  <UiButton class="black" @click="scrollTo('#home-selection')">Выбрать объект</UiButton>
               </li>
               <li>
                  <UiButton class="white" @click='isMeeting = true'>Назначить встречу</UiButton>
               </li>
            </ul>
         </div>
      </div>
      <SectionsHomeRunningLine :items="running" />
      <ModalMeeteing :isOpen="isMeeting" @close-popup="isMeeting = false" />
   </section>
</template>
<script setup>
const props = defineProps({
   running: Array,
   text: String
})
const isMeeting = ref(false)
</script>