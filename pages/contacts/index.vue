<template>
   <main class="main contacts-page">
      <AppHead :seo="data?.seo" />

      <SectionsBreadcrumbs :path="path" />
      <SectionsContactsHero :info="contacts?.info" />
      <SectionsContactsOffice :info="contacts?.info?.contacts_office" />
   </main>
</template>
<script setup>
import { useContacts } from './store/contacts';
const contacts = useContacts()
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
let { data } = await useBaseFetch("/contactspage");
// useHead({
//    title: 'Контакты'
// })
</script>