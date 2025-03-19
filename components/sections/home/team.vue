<template>
   <section class="home-team">
      <div class="container">
         <div class="home-team__header">
            <h2 class="home-team__title h1" v-html="info?.title"></h2>
            <div class="home-team__btns">
               <UiButton class="black" @click="isTeam = true">Стать частью команды</UiButton>
               <NuxtLink :to="info?.home_team_title_btn?.btn_link" class="btn white" target="_blank">{{
                  info?.home_team_title_btn?.btn_title }}</NuxtLink>
            </div>
         </div>
      </div>
      <div class="home-team__image">
         <img :src="image.url" alt="">
         <ul class="home-team__dots">
            <li v-for="item in team" :key="item" class="home-team__item" :style="item.line_style">
               <div class="home-team__dot"></div>
               <div class="home-team__modal">
                  <span>{{ item.title }}</span>
               </div>
            </li>
         </ul>
      </div>
      <ModalTeam :is-open="isTeam" @close-popup="isTeam = false" />
   </section>
</template>
<script setup>
const props = defineProps({
   team: Array,
   info: Object,
   image: Object
})
const isTeam = ref(false)
</script>