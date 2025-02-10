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


useHead({
   title: 'Профиль | Документы'
})

</script>