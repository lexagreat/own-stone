<template>
   <section class="partners-process">
      <div class="container">
         <div class="partners-process__wrapper">
            <h2 class="partners-process__title h1 dark-title" v-html="info.title"></h2>
            <ul class="partners-process__list">
               <li class="partners-process__item" v-for="(item, index) in info.
                  partners_pocess_list" :key="index">
                  <div class="partners-process__index circle">
                     {{ index + 1 }}
                  </div>
                  <div class="partners-process__main">
                     <h3 class="partners-process__subtitle h3">{{ item.title }}</h3>
                     <p class="body-text">{{ item.text }}</p>
                  </div>
               </li>
            </ul>
         </div>
      </div>
   </section>
</template>
<script setup>
const props = defineProps({
   info: Object
})
</script>