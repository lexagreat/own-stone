<template>
   <section class="account-info">
      <AccountHeader>
         <h1 class="account-page__title">Информация</h1>
      </AccountHeader>
      <div class="account-info__main">
         <ul class="account-info__list">
            <li v-for="item in faq" :key="item">
               <div class="account-info__header">
                  <h3 class="account-info__subtitle">{{ item.title }}</h3>
                  <div class="circle">
                     <ArrowIcon />
                  </div>
               </div>
               <div class="account-info__spoiler collapse">
                  <p class="body-text">{{ item.text }}</p>
               </div>
            </li>
         </ul>
         <UiButton class="black">Задать вопрос</UiButton>
      </div>
   </section>
</template>
<script setup>
import { accordion } from '#build/imports';
import ArrowIcon from '@/assets/img/icons/arrow-down.svg'
const faq = ref([
   {
      title: "Как рассчитывается размер вознаграждения? ",
      text: "Какие гарантии, что вознаграждение будет выплачено? Какие гарантии, что вознаграждение будет выплачено? "
   },
   {
      title: "Какие сроки получения выплаты? ",
      text: "Какие гарантии, что вознаграждение будет выплачено? Какие гарантии, что вознаграждение будет выплачено? "
   },
   {
      title: "Сколько клиентов возможно передать агентству?",
      text: "Какие гарантии, что вознаграждение будет выплачено? Какие гарантии, что вознаграждение будет выплачено? "
   },
   {
      title: "Какие гарантии, что вознаграждение будет выплачено?",
      text: "Какие гарантии, что вознаграждение будет выплачено? Какие гарантии, что вознаграждение будет выплачено? "
   },
])

onMounted(() => {
   accordion(".account-info__header", ".account-info__spoiler")
})
</script>