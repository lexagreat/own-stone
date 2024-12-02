<template>
   <section class="account-documents">
      <AccountHeader>
         <h1 class="account-page__title">Мои клиенты</h1>
         <UiButton class="black">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
               <path d="M10 5C10 13 10 11.6667 10 10M10 10H5M10 10H15M10 10V15" stroke="white" stroke-linecap="round" />
            </svg>
            Передать клиента
         </UiButton>
      </AccountHeader>
      <div class="account-clients">
         <div class="account-clients__cats">
            <span>ФИО</span>
            <span>Бюджет</span>
            <span>Дата обновления</span>
            <span>Статус</span>
            <span>Дата передачи клиента</span>
         </div>
         <ul class="account-clients__list">
            <li v-for="item in 3" :key="item">
               <CardsClient />
            </li>
         </ul>
      </div>
   </section>
</template>
<script setup>
onMounted(() => {
   console.log('mounted clients');
})

</script>