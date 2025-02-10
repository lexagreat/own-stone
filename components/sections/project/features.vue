<template>
   <section class="project-features">
      <div class="container">
         <div class="project-features__wrapper">
            <div class="project-features__header">
               <slot />
               <div class="project-features__btns">
                  <UiSliderBtn prev @click="swiper.slidePrev()" />
                  <UiSliderBtn next @click="swiper.slideNext()" />
               </div>
            </div>
            <div class="project-features__main">
               <Swiper class="pc" :modules="[Mousewheel]" :mousewheel="{ enabled: true, forceToAxis: true }"
                  @swiper="onSwiper" slides-per-view="auto" :space-between="10" :breakpoints="breakpoints" loop
                  :speed="700">
                  <SwiperSlide v-for="item in items" :key="item">
                     <div class="project-feature" v-for="sub in item" :key="sub">
                        <img :src="sub?.picture[0].url" alt="">
                        <h3 class="h3">{{ sub.title }}</h3>
                     </div>
                  </SwiperSlide>
                  <SwiperSlide v-for="item in items" :key="item">
                     <div class="project-feature" v-for="sub in item" :key="sub">
                        <img :src="sub?.picture[0].url" alt="">
                        <h3 class="h3">{{ sub.title }}</h3>
                     </div>
                  </SwiperSlide>
               </Swiper>
               <Swiper class="mobile" :modules="[Mousewheel]" :mousewheel="{ enabled: true, forceToAxis: true }"
                  slides-per-view="auto" :space-between="10" :breakpoints="breakpoints" loop :speed="700"
                  :freeMode="true">
                  <SwiperSlide v-for="item in info" :key="item">
                     <div class="project-feature">
                        <img :src="item?.picture[0]?.url" alt="">
                        <h3 class="h3">{{ item.title }}</h3>
                     </div>
                  </SwiperSlide>
                  <SwiperSlide v-for="item in info" :key="item">
                     <div class="project-feature">
                        <img :src="item?.picture[0]?.url" alt="">
                        <h3 class="h3">{{ item.title }}</h3>
                     </div>
                  </SwiperSlide>
               </Swiper>
            </div>
         </div>
      </div>
   </section>
</template>
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Mousewheel } from 'swiper/modules'
const props = defineProps({
   info: Array
})
const swiper = ref(null)
const breakpoints = {
   1025: {
      slidesPerView: 3
   }
}
const onSwiper = (s) => {
   swiper.value = s;
}
const items = [];
let takeOne = false; // Флаг, который определяет, сколько элементов брать

for (let i = 0; i < props.info.length;) {
   if (takeOne) {
      // Если флаг установлен, берем один элемент
      items.push([props.info[i]]);
      i += 1;
   } else {
      // Иначе берем два элемента
      items.push(props.info.slice(i, i + 2));
      i += 2;
   }
   // Переключаем флаг
   takeOne = !takeOne;
}
</script>


<style lang="scss" scoped>
.mobile {
   display: none;

   @media(max-width: 568px) {
      display: block;
   }
}

.pc {
   display: block;

   @media(max-width: 568px) {
      display: none;
   }
}
</style>