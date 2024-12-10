<template>
   <section class="about-events">
      <Swiper :modules="[Autoplay, EffectFade]" :slides-per-view="1" :loop="true" :autoplay="autoplayOptions"
         effect="fade" :speed="1000" @before-transition-start="onSlideChange">
         <SwiperSlide v-for="item in events" :key="item">
            <img :src="item.image" alt="">
         </SwiperSlide>
      </Swiper>
      <ul class="about-events__pagination">
         <li v-for="(item, index) in events" :class="{ active: currentIndex == index }">
            <span>{{ item.name }}</span>
            <div></div>
         </li>
      </ul>
   </section>
</template>
<script setup>
import { Autoplay, EffectFade } from 'swiper/modules';
const autoplayOptions = {
   delay: 3000, // Время задержки между слайдами в миллисекундах
};
const currentIndex = ref(0)
const onSlideChange = (s) => {
   currentIndex.value = s.realIndex
}
const events = ref([
   {
      name: "Название мероприятия",
      image: "/img/about/events.png",
   },
   {
      name: "Название мероприятия",
      image: "/img/home/taxi.png",
   },
   {
      name: "Название мероприятия",
      image: "/img/about/events.png",
   },
   {
      name: "Название мероприятия",
      image: "/img/home/taxi.png",
   },

])
</script>