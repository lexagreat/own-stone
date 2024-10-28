<template>
   <section class="home-team">
      <div class="container">
         <div class="home-team__header">
            <h2 class="home-team__title h1">команда <span>ownstone</span></h2>
            <div class="home-team__btns">
               <UiButton class="black">Стать частью команды</UiButton>
               <UiButton class="white">Вакансии</UiButton>
            </div>
         </div>
      </div>
      <div class="home-team__image">
         <img src="/img/home/team.png" alt="">
         <ul class="home-team__dots">
            <li v-for="item in team" :key="item" class="home-team__item">
               <div class="home-team__dot"></div>
               <div class="home-team__modal">
                  <span>{{ item }}</span>
               </div>
            </li>
         </ul>
      </div>
   </section>
</template>
<script setup>
const team = ref([
   "Михаил, брокер",
   "Василий, SEO",
   "Алексей, директор",
   "Александр, основатель",
   "Петр, основатель",
])
</script>