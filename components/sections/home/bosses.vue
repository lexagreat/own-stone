<template>
   <section class="bosses-section">
      <div class="container">
         <div class="bosses-section__wrapper">
            <div class="bosses-section__card" v-for="(item, index) in info" :key="item">
               <div class="bosses-section__main">
                  <div class="bosses-section__image">
                     <img :src="item?.photo?.url" alt="">
                  </div>
                  <div class="bosses-section__info">
                     <span class="bosses-section__rang body-text">{{ item?.rank }}</span>
                     <h3 class="bosses-section__name h2">{{ item?.name }}</h3>
                     <p class="bosses-section__text" :class="{ full: isOpenText[index] }">{{ item?.text }}</p>
                     <button @click="isOpenText[index] = true" v-if="!isOpenText[index]">Читать полностью</button>
                  </div>
               </div>
               <div class="bosses-section__footer">
                  <p class="body-text">{{ item?.suptext }}</p>
                  <ul>
                     <li v-for="media in item?.bosses_socials" :key="media">
                        <NuxtLink :to="media?.link" target="_blank" class="circle">
                           <img :src="media?.ico?.url" alt="">
                        </NuxtLink>
                     </li>
                  </ul>
               </div>
            </div>

         </div>
      </div>
   </section>
</template>
<script setup>
const props = defineProps({
   info: Array
})
const isOpenText = ref([false, false])
</script>