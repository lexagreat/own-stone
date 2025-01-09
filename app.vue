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
import { useContacts } from './store/contacts';
const contacts = useContacts()
onMounted(() => {
   favorites.getFromLS()
})

contacts.getInfo()
</script>

<style lang="scss">
@import 'swiper/swiper-bundle.css';
@import "@/assets/scss/style";
</style>
