<template>
   <section class="account-documents">
      <AccountHeader>
         <h1 class="account-page__title">Документы</h1>
      </AccountHeader>
      <ul class="account-documents__list">
         <li v-for="doc in store.user.documents" :key="doc">
            <CardsDocument :info="doc" />
         </li>
      </ul>
   </section>
</template>
<script setup>
import { useAccount } from '~/store/account';

const store = useAccount()
const docs = ref([
   { name: "Разрешение на строительство" },
   { name: "Проектная декларация" },
   { name: "Извещение о начале строительства" },
   { name: "Извещение о начале строительства" },
])
</script>