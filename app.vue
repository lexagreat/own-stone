<template>
   <div class="wrapper lock-padding">
      <NuxtLayout>
         <NuxtPage />
      </NuxtLayout>
   </div>
</template>
<script setup>
import { useFavorites } from './store/favorites';
const favorites = useFavorites()
onMounted(() => {
   favorites.getFromLS()
})
</script>

<style lang="scss">
@import 'swiper/swiper-bundle.css';
@import "@/assets/scss/style";
</style>
