<template>
   <section class="account-info">
      <AccountHeader>
         <h1 class="account-page__title">Информация</h1>
      </AccountHeader>
      <div class="account-info__main">
         <ul class="account-info__list">
            <li v-for="item in store.faq" :key="item">
               <div class="account-info__header">
                  <h3 class="account-info__subtitle">{{ item.title }}</h3>
                  <div class="circle">
                     <ArrowIcon />
                  </div>
               </div>
               <div class="account-info__spoiler collapse">
                  <p class="body-text">{{ item.description }}</p>
               </div>
            </li>
         </ul>
         <UiButton class="black" @click="isOpen = true">Задать вопрос</UiButton>
         <ModalAskQuestion :is-open="isOpen" @closePopup="isOpen = false" />
      </div>
   </section>
</template>
<script setup>
import { accordion } from '#build/imports';
import ArrowIcon from '@/assets/img/icons/arrow-down.svg'
import { useAccount } from '~/store/account';
const store = useAccount()
const isOpen = ref(false)
onMounted(() => {
   accordion(".account-info__header", ".account-info__spoiler")

})
</script>