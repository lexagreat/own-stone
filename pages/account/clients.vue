<template>
   <section class="account-documents">
      <AccountHeader>
         <h1 class="account-page__title">Мои клиенты</h1>
         <UiButton class="black" @click="isOpen = true" v-if="store.user.clients?.length">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
               <path d="M10 5C10 13 10 11.6667 10 10M10 10H5M10 10H15M10 10V15" stroke="white" stroke-linecap="round" />
            </svg>
            Передать клиента
         </UiButton>
      </AccountHeader>
      <div class="account-clients" v-if="store.user.clients?.length">
         <div class="account-clients__cats">
            <span>ФИО</span>
            <span>Бюджет</span>
            <span>Дата обновления</span>
            <span>Статус</span>
            <span>Дата передачи клиента</span>
         </div>
         <ul class="account-clients__list">
            <li v-for="item in store.user.clients" :key="item">
               <CardsClient :info="item" />
            </li>
         </ul>
      </div>
      <div class="account-clients__empty" v-else>
         <p class="body-text" style="color: #18181880; max-width: 310px; margin-bottom: 35px;">
            Добавьте информацию о вашем клиенте и отслеживайте статус сделки
         </p>
         <UiButton class="black" @click="isOpen = true">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
               <path d="M10 5C10 13 10 11.6667 10 10M10 10H5M10 10H15M10 10V15" stroke="white" stroke-linecap="round" />
            </svg>
            Передать клиента
         </UiButton>
      </div>
      <ModalAddClient :is-open="isOpen" @closePopup="isOpen = false" />
   </section>
</template>
<script setup>
import { useAccount } from '~/store/account';

const store = useAccount()
const isOpen = ref(false)
</script>