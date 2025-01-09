<template>
   <div class="runeline">
      <div class="marquee-0">
         <div class="marquee marquee-b2b">
            <div class="marquee__group">
               <li class="running-line__item" v-for="item in items" :key="item">
                  <div>
                     <img :src="item.url" alt="">
                  </div>
               </li>

            </div>
            <div aria-hidden="true" class="marquee__group">
               <li class="running-line__item" v-for="item in items" :key="item">
                  <div>
                     <img :src="item.url" alt="">
                  </div>
               </li>
            </div>
         </div>


      </div>
   </div>
</template>
<script setup>
const props = defineProps({
   items: Array
})
</script>