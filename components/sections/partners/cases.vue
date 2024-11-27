<template>
   <section class="partners-cases">
      <div class="container">
         <div class="partners-cases__wrapper">
            <div class="partners-cases__header">
               <h2 class="partners-cases__title h1 light-title">кейсы</h2>
               <div class="partners-cases__btns">
                  <UiSliderBtn prev white @click="swiper.slidePrev()" />
                  <UiSliderBtn next white @click="swiper.slideNext()" />
               </div>
            </div>
            <div class="partners-cases__main">
               <Swiper @swiper="onSwiper" slides-per-view="auto" :space-between="10" :breakpoints="breakpoints">
                  <SwiperSlide>
                     <CardsCaseBig />
                  </SwiperSlide>
                  <SwiperSlide>
                     <CardsCaseSmall />
                     <CardsCaseSmall />
                  </SwiperSlide>
                  <SwiperSlide>
                     <CardsCaseSmall />
                     <CardsCaseSmall />
                  </SwiperSlide>
                  <SwiperSlide>
                     <CardsCaseBig />
                  </SwiperSlide>
                  <SwiperSlide>
                     <CardsCaseSmall />
                     <CardsCaseSmall />
                  </SwiperSlide>
                  <SwiperSlide>
                     <CardsCaseSmall />
                     <CardsCaseSmall />
                  </SwiperSlide>
               </Swiper>
            </div>
         </div>
      </div>
   </section>
</template>
<script setup>
const swiper = ref(null)
const onSwiper = (s) => {
   swiper.value = s;
}
const breakpoints = ref({
   1025: {
      slidesPerView: 3,
   }
})
</script>