<template>
   <main class="main contacts-page">
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
</script>