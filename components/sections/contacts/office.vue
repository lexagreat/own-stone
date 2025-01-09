<template>
   <section class="contacts-office">
      <div class="contacts-office__header">
         <h2 class="contacts-office__title h1 dark-title" v-html="info?.title">
         </h2>
         <p class="body-text" v-html="info?.text"></p>
      </div>
      <div class="contacts-office__image">
         <img :src="info?.photo?.url" alt="">
         <UiButton class="black">{{ info?.btn_text }}</UiButton>
      </div>
   </section>
</template>
<script setup>
const props = defineProps({
   info: Object
})
</script>