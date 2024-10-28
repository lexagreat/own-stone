<template>
   <div class="runeline">
      <div class="marquee-0">
         <div class="marquee marquee-b2b">
            <div class="marquee__group">
               <li class="running-line__item" v-for="item in items" :key="item">
                  <NuxtLink to="/" target="_blank">
                     <component :is="item.icon" />
                  </NuxtLink>
               </li>

            </div>
            <div aria-hidden="true" class="marquee__group">
               <li class="running-line__item" v-for="item in items" :key="item">
                  <NuxtLink to="/" target="_blank">
                     <component :is="item.icon" />
                  </NuxtLink>
               </li>
            </div>
         </div>


      </div>
   </div>
</template>
<script setup>
let items = ref([
   {
      icon: markRaw(defineAsyncComponent(() => import('@/assets/img/home/running1.svg'))),
   },
   {
      icon: markRaw(defineAsyncComponent(() => import('@/assets/img/home/running2.svg'))),
   },
   {
      icon: markRaw(defineAsyncComponent(() => import('@/assets/img/home/running3.svg'))),
   },
   {
      icon: markRaw(defineAsyncComponent(() => import('@/assets/img/home/running4.svg'))),
   },
   {
      icon: markRaw(defineAsyncComponent(() => import('@/assets/img/home/running5.svg'))),
   },
   {
      icon: markRaw(defineAsyncComponent(() => import('@/assets/img/home/running6.svg'))),
   },
   {
      icon: markRaw(defineAsyncComponent(() => import('@/assets/img/home/running7.svg'))),
   },
   {
      icon: markRaw(defineAsyncComponent(() => import('@/assets/img/home/running8.svg'))),
   },
   {
      icon: markRaw(defineAsyncComponent(() => import('@/assets/img/home/running9.svg'))),
   },
   {
      icon: markRaw(defineAsyncComponent(() => import('@/assets/img/home/running10.svg'))),
   },
])
</script>