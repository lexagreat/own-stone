<template>
   <section class="sell-promotion">
      <div class="container">
         <div class="sell-promotion__wrapper">
            <div class="sell-promotion__header">
               <h2 class="sell-promotion__title dark-title h1" v-html="info.title">
               </h2>
               <div class="sell-promotion__nav">
                  <UiSliderBtn prev @click="swiperInstance.slidePrev()" />
                  <UiSliderBtn next @click="swiperInstance.slideNext()" />
               </div>
            </div>
            <div class="sell-promotion__slider">
               <Swiper :modules="[Mousewheel]" @swiper="onSwiper" :mousewheel="{ enabled: true, forceToAxis: true }"
                  slides-per-view="auto" :space-between="10">
                  <SwiperSlide v-for="(item, index) in info.sell_promotion_list" :key="index">
                     <img :src="item.picture.url" alt="">
                     <h4 class="h4">{{ item.title }}</h4>
                  </SwiperSlide>
               </Swiper>
            </div>
         </div>
      </div>
   </section>
</template>
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Mousewheel } from 'swiper/modules';

const swiperInstance = ref(null)
const props = defineProps({
   info: Object
})
const onSwiper = (swiper) => {
   swiperInstance.value = swiper
}
</script>