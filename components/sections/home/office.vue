<template>
   <section class="home-office">
      <div class="container">
         <div class="home-office__wrapper">
            <div class="home-office__main">
               <h2 class="home-office__title h1">Офис компании</h2>
               <div class="home-office__text">
                  <div class="body-text">
                     <p>
                        Мы тщательно подошли к созданию пространства, где вам предстоит сделать
                        важный выбор в пользу своей идеальной недвижимости.
                     </p>
                  </div>
                  <button @click="isModalOpen = true" v-if="!isTextFull">Читать полностью</button>

               </div>
               <div class="home-office__navigation">
                  <UiSliderBtn prev @click="swiperInstance.slidePrev()" />
                  <UiSliderBtn next @click="swiperInstance.slideNext()" />
               </div>
            </div>
            <div class="home-office__slider">
               <Swiper @swiper="setThumbsSwiper" class="thumbs" direction="vertical" slides-per-view="auto"
                  :space-between="10" :loop="true" :speed="1000">
                  <SwiperSlide>
                     <img src="/img/home/office1.jpeg" alt="">
                  </SwiperSlide>
                  <SwiperSlide>
                     <img src="/img/home/office2.png" alt="">
                  </SwiperSlide>
                  <SwiperSlide>
                     <img src="/img/home/office3.png" alt="">
                  </SwiperSlide>
                  <SwiperSlide>
                     <img src="/img/home/office4.png" alt="">
                  </SwiperSlide>
                  <SwiperSlide>
                     <img src="/img/home/office5.png" alt="">
                  </SwiperSlide>
                  <SwiperSlide>
                     <img src="/img/home/office1.jpeg" alt="">
                  </SwiperSlide>
                  <SwiperSlide>
                     <img src="/img/home/office2.png" alt="">
                  </SwiperSlide>
                  <SwiperSlide>
                     <img src="/img/home/office3.png" alt="">
                  </SwiperSlide>
                  <SwiperSlide>
                     <img src="/img/home/office4.png" alt="">
                  </SwiperSlide>
                  <SwiperSlide>
                     <img src="/img/home/office5.png" alt="">
                  </SwiperSlide>
               </Swiper>
               <Swiper :modules="[Autoplay, EffectFade]" @swiper="onSwiper" @slideNextTransitionStart="onSlideNext"
                  @slidePrevTransitionStart="onSlidePrev" class="main-slider" :slides-per-view="1" :loop="true"
                  :autoplay="autoplayOptions" effect="fade" :speed="1000">
                  <SwiperSlide>
                     <img src="/img/home/office1.jpeg" alt="">
                  </SwiperSlide>
                  <SwiperSlide>
                     <img src="/img/home/office2.png" alt="">
                  </SwiperSlide>
                  <SwiperSlide>
                     <img src="/img/home/office3.png" alt="">
                  </SwiperSlide>
                  <SwiperSlide>
                     <img src="/img/home/office4.png" alt="">
                  </SwiperSlide>
                  <SwiperSlide>
                     <img src="/img/home/office5.png" alt="">
                  </SwiperSlide>
                  <SwiperSlide>
                     <img src="/img/home/office1.jpeg" alt="">
                  </SwiperSlide>
                  <SwiperSlide>
                     <img src="/img/home/office2.png" alt="">
                  </SwiperSlide>
                  <SwiperSlide>
                     <img src="/img/home/office3.png" alt="">
                  </SwiperSlide>
                  <SwiperSlide>
                     <img src="/img/home/office4.png" alt="">
                  </SwiperSlide>
                  <SwiperSlide>
                     <img src="/img/home/office5.png" alt="">
                  </SwiperSlide>
               </Swiper>
            </div>
         </div>
      </div>
      <ModalOfficeInfo :isOpen="isModalOpen" @closePopup="isModalOpen = false" />
   </section>
</template>
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, EffectFade } from 'swiper/modules';
const swiperInstance = ref(null)
const thumbsSwiper = ref(null)
const isModalOpen = ref(false)
const onSwiper = (swiper) => {
   swiperInstance.value = swiper
}
const setThumbsSwiper = (swiper) => {
   thumbsSwiper.value = swiper;
};
const onSlideNext = () => {
   thumbsSwiper.value.slideNext()
   swiperInstance.value.autoplay.start();
}
const onSlidePrev = () => {
   thumbsSwiper.value.slidePrev()
   swiperInstance.value.autoplay.start();
}
const autoplayOptions = {
   delay: 3000, // Время задержки между слайдами в миллисекундах
};
const isTextFull = ref(false)
</script>