<template>
   <section class="contacts-office">
      <div class="contacts-office__header">
         <h2 class="contacts-office__title h1 dark-title" v-html="info?.title">
         </h2>
         <p class="body-text" v-html="info?.text"></p>
      </div>
      <div class="contacts-office__image">
         <div class="marquee-0">
            <div class="marquee marquee-b2b">
               <div class="marquee__group">
                  <img :src="info?.photo?.url" alt="">
               </div>
               <div aria-hidden="true" class="marquee__group">
                  <li class="running-line__item">
                     <img :src="info?.photo?.url" alt="">
                  </li>
               </div>
            </div>


         </div>
         <UiButton class="black" @click="isOpenModal = true">{{ info?.btn_text }}</UiButton>
      </div>
      <ModalTeam :isOpen="isOpenModal" @close-popup="isOpenModal = false" />
   </section>
</template>
<script setup>
const props = defineProps({
   info: Object
})

const isOpenModal = ref(false)
</script>
