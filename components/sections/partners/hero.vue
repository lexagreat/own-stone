<template>
   <section class="sell-hero">
      <div class="sell-hero__image">
         <img :src="info?.picture.url" alt="">
      </div>
      <div class="container">
         <div class="sell-hero__wrapper">
            <SectionsBreadcrumbs :path="path" />
            <h1 class="sell-hero__title h1 light-title" v-html="info.title"></h1>
            <div class="sell-hero__main">
               <p>{{ info.desc }}</p>
               <NuxtLink class="btn white" to="/account" v-if="account.user?.phonenumber">Стать партнером
               </NuxtLink>
               <UiButton class="white" @click="isOpenAuthModal = true" v-else>Стать партнером
               </UiButton>
               <ModalAuthNewCollection :is-open="isOpenAuthModal" @close="isOpenAuthModal = false" />
            </div>
         </div>
      </div>
   </section>
</template>
<script setup>
import { sharedParallaxAnimation } from '~/assets/js/animations';
import { useAccount } from '~/store/account';

const isOpenAuthModal = ref(false)
const account = useAccount()
const props = defineProps({
   info: Object
})
const path = ref([
   {
      name: "Главная",
      to: "/"
   },
   {
      name: "Партнерам",
      to: ""
   },
])


onMounted(() => {
   sharedParallaxAnimation(".sell-hero__image img", ".sell-hero")
})
</script>



<style lang="scss">
.sell-hero {
   &:has(.modal.open) {
      z-index: 123;
   }
}
</style>