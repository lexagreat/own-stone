<template>
   <section class="about-events">
      <Swiper :modules="[Autoplay, EffectFade]" :slides-per-view="1" :loop="true" :autoplay="autoplayOptions"
         effect="fade" :speed="1000" @before-transition-start="onSlideChange">
         <SwiperSlide v-for="item in items" :key="item">
            <img :src="item.picture.url" alt="">
         </SwiperSlide>
      </Swiper>
      <ul class="about-events__pagination">
         <li v-for="(item, index) in items" :class="{ active: currentIndex == index }">
            <span>{{ item.title }}</span>
            <div></div>
         </li>
      </ul>
   </section>
</template>
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, EffectFade } from 'swiper/modules';

const props = defineProps({
   items: Array
})
const autoplayOptions = {
   delay: 3000, // Время задержки между слайдами в миллисекундах
};
const currentIndex = ref(0)
const onSlideChange = (s) => {
   currentIndex.value = s.realIndex
}
</script>