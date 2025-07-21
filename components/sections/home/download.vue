<template>
   <ModalDownloadCatalog
      :is-open="isOpen"
      @close-popup="isOpen = false"
      :file="info.file[0]?.url"
   />
   <section class="home-download">
      <div class="container">
         <div class="home-download__wrapper">
            <h2 class="home-download__title h1" v-html="info.title"></h2>
            <div class="home-download__image">
               <img :src="info?.picture[0].url" alt="" />
            </div>
            <div class="home-download__content">
               <p class="body-text" v-html="info.text"></p>
               <button class="btn black" @click="isOpen = true">
                  Скачать каталог
               </button>
            </div>
         </div>
      </div>
   </section>
</template>
<script setup>
const props = defineProps({
   info: Object,
});
const isOpen = ref(false);
</script>
