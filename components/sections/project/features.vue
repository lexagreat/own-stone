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
               <Swiper @swiper="onSwiper" slides-per-view="auto" :space-between="10" :breakpoints="breakpoints" loop>
                  <SwiperSlide>
                     <div class="project-feature">
                        <img src="/img/project/feature1.png" alt="">
                        <h3 class="h3">авторская архитектура</h3>
                     </div>
                     <div class="project-feature">
                        <img src="/img/project/feature2.png" alt="">
                        <h3 class="h3">большой приватный парк</h3>
                     </div>
                  </SwiperSlide>
                  <SwiperSlide>
                     <div class="project-feature">
                        <img src="/img/project/feature4.png" alt="">
                        <h3 class="h3">Drop off
                           парадный подъезд к каждому дому</h3>
                     </div>
                  </SwiperSlide>
                  <SwiperSlide>
                     <div class="project-feature">
                        <img src="/img/project/feature3.png" alt="">
                        <h3 class="h3">панорамное остекление</h3>
                     </div>
                     <div class="project-feature">
                        <img src="/img/project/feature4.png" alt="">
                        <h3 class="h3">50 М ДО ВХОДА В ОК «ЛУЖНИКИ»</h3>
                     </div>
                  </SwiperSlide>
                  <SwiperSlide>
                     <div class="project-feature">
                        <img src="/img/project/feature1.png" alt="">
                        <h3 class="h3">авторская архитектура</h3>
                     </div>
                     <div class="project-feature">
                        <img src="/img/project/feature2.png" alt="">
                        <h3 class="h3">большой приватный парк</h3>
                     </div>
                  </SwiperSlide>
                  <SwiperSlide>
                     <div class="project-feature">
                        <img src="/img/project/feature4.png" alt="">
                        <h3 class="h3">Drop off
                           парадный подъезд к каждому дому</h3>
                     </div>
                  </SwiperSlide>
                  <SwiperSlide>
                     <div class="project-feature">
                        <img src="/img/project/feature3.png" alt="">
                        <h3 class="h3">панорамное остекление</h3>
                     </div>
                     <div class="project-feature">
                        <img src="/img/project/feature4.png" alt="">
                        <h3 class="h3">50 М ДО ВХОДА В ОК «ЛУЖНИКИ»</h3>
                     </div>
                  </SwiperSlide>
                  <SwiperSlide>
                     <div class="project-feature">
                        <img src="/img/project/feature1.png" alt="">
                        <h3 class="h3">авторская архитектура</h3>
                     </div>
                     <div class="project-feature">
                        <img src="/img/project/feature2.png" alt="">
                        <h3 class="h3">большой приватный парк</h3>
                     </div>
                  </SwiperSlide>
                  <SwiperSlide>
                     <div class="project-feature">
                        <img src="/img/project/feature4.png" alt="">
                        <h3 class="h3">Drop off
                           парадный подъезд к каждому дому</h3>
                     </div>
                  </SwiperSlide>
                  <SwiperSlide>
                     <div class="project-feature">
                        <img src="/img/project/feature3.png" alt="">
                        <h3 class="h3">панорамное остекление</h3>
                     </div>
                     <div class="project-feature">
                        <img src="/img/project/feature4.png" alt="">
                        <h3 class="h3">50 М ДО ВХОДА В ОК «ЛУЖНИКИ»</h3>
                     </div>
                  </SwiperSlide>
               </Swiper>
            </div>
         </div>
      </div>
   </section>
</template>
<script setup>
const swiper = ref(null)
const breakpoints = {
   1025: {
      slidesPerView: 3
   }
}
const onSwiper = (s) => {
   swiper.value = s;
}
</script>