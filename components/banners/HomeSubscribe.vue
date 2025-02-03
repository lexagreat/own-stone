<template>
   <section class="home-subscribe">
      <div class="container">
         <div class="home-subscribe__wrapper">
            <h2 class="home-subscribe__title h1" v-html="info.title"></h2>
            <div class="home-subscribe__main">
               <div class="home-subscribe__text body-text" v-html="info.desc"></div>
               <UiButton class="white" @click="isModal = true" style="width: 180px;">
                  Подписаться
               </UiButton>
            </div>
            <ModalSubscribe :is-open="isModal" @close-popup="isModal = false" />
         </div>
      </div>
   </section>
</template>
<script setup>

const props = defineProps({
   info: Object
})


const isModal = ref(false)
</script>