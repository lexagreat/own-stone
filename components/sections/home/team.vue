<template>
   <section class="home-team">
      <div class="container">
         <div class="home-team__header">
            <h2 class="home-team__title h1">команда <span>ownstone</span></h2>
            <div class="home-team__btns">
               <UiButton class="black">Стать частью команды</UiButton>
               <NuxtLink to="https://hh.ru/" class="btn white" target="_blank">Вакансии</NuxtLink>
            </div>
         </div>
      </div>
      <div class="home-team__image">
         <img src="/img/home/team.png" alt="">
         <ul class="home-team__dots">
            <li v-for="item in team" :key="item" class="home-team__item" :style="item.line_style">
               <div class="home-team__dot"></div>
               <div class="home-team__modal">
                  <span>{{ item.title }}</span>
               </div>
            </li>
         </ul>
      </div>
   </section>
</template>
<script setup>
const props = defineProps({
   team: Array
})
</script>