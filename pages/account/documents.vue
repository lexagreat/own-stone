<template>
   <section class="account-documents">
      <AccountHeader>
         <h1 class="account-page__title">Документы</h1>
      </AccountHeader>
      <ul class="account-documents__list">
         <li v-for="doc in docs" :key="doc">
            <CardsDocument :info="doc" />
         </li>
      </ul>
   </section>
</template>
<script setup>
const docs = ref([
   { name: "Разрешение на строительство" },
   { name: "Проектная декларация" },
   { name: "Извещение о начале строительства" },
   { name: "Извещение о начале строительства" },
])
onMounted(() => {
   console.log('mounted docs');
})
</script>