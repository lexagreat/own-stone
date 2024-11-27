<template>
   <main class="main contacts-page">
      <SectionsBreadcrumbs :path="path" />
      <SectionsContactsHero />
      <SectionsContactsOffice />
   </main>
</template>
<script setup>
const path = ref([
   {
      name: "Главная",
      to: "/"
   },
   {
      name: "Контакты",
      to: ""
   },
])
</script>