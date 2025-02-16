<template>
   <div class="wrapper lock-padding">
      <NuxtLayout>
         <NuxtPage />
      </NuxtLayout>
   </div>
</template>
<script setup>
import { useFavorites } from './store/favorites';
import { useContacts } from './store/contacts';
import { useRecently } from './store/recently';
const contacts = useContacts()
const recentlyStore = useRecently()
const favorites = useFavorites()

onMounted(() => {
   favorites.getFromLS()
   recentlyStore.getFromLS()
})

contacts.getInfo()
</script>

<style lang="scss">
@import 'swiper/swiper-bundle.css';
@import "@/assets/scss/style";
</style>
