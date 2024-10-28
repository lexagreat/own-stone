<template>
   <section class="home-office">
      <div class="container">
         <div class="home-office__wrapper">
            <div class="home-office__main">
               <h2 class="home-office__title h1">Офис компании</h2>
               <div class="home-office__text">
                  <div class="body-text" :class="{ active: isTextFull }">
                     <p>
                        Мы тщательно подошли к созданию пространства, где вам предстоит сделать
                        важный выбор в пользу своей идеальной недвижимости.
                     </p>
                     <p>
                        Наш офис располагается в доме-особняке, в историческом центре Москвы, где вы сможете окунуться в
                        атмосферу доверия и профессионализма, а также насладиться готическим стилем архитектуры XIX
                        века.
                        В 1934 году М.А. Булгаков жил и творил напротив здания нашего офиса, поэтому принято считать,
                        что
                        именно этот дом стал прототипом особняка Маргариты из знаменитого романа писателя.
                        Вдохновленные стремлением предоставить нашим клиентам исключительный опыт и премиальный сервис,
                        мы
                        продумали каждую деталь пространства, где гармонично сочетаются современный стиль, комфорт и
                        вековая
                        история.
                     </p>
                  </div>
                  <transition name="fade">
                     <button @click="isTextFull = true" v-if="!isTextFull">Читать полностью</button>
                  </transition>
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
   </section>
</template>
<script setup>
import { Autoplay, EffectFade } from 'swiper/modules';
const swiperInstance = ref(null)
const thumbsSwiper = ref(null)

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