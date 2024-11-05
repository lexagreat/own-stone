<template>
   <section class="home-reviews">
      <div class="container">
         <div class="home-reviews__wrapper">
            <div class="home-reviews__header">
               <h2 class="home-reviews__title h1">о нас <span>говорят</span></h2>
               <div class="home-reviews__nav">
                  <UiSliderBtn prev @click="swiperInstance.slidePrev()" />
                  <UiSliderBtn next @click="swiperInstance.slideNext()" />
               </div>
            </div>
            <div class="home-reviews__main">
               <Swiper slidesPerView="auto" :spaceBetween="10" @swiper="onSwiper" :breakpoints="{
                  1025: {
                     slidesPerView: 3
                  }
               }">
                  <SwiperSlide>
                     <CardsReviewBig />
                  </SwiperSlide>
                  <SwiperSlide>
                     <CardsReviewMedium />
                     <CardsReviewMedium />
                  </SwiperSlide>
                  <SwiperSlide>
                     <CardsReviewMedium />
                     <CardsReviewSmall />
                     <CardsReviewSmall />
                  </SwiperSlide>
                  <SwiperSlide>
                     <CardsReviewBig />
                  </SwiperSlide>
                  <SwiperSlide>
                     <CardsReviewMedium />
                     <CardsReviewMedium />
                  </SwiperSlide>
                  <SwiperSlide>
                     <CardsReviewMedium />
                     <CardsReviewSmall />
                  </SwiperSlide>
                  <SwiperSlide>
                     <CardsReviewBig />
                  </SwiperSlide>
                  <SwiperSlide>
                     <CardsReviewMedium />
                     <CardsReviewMedium />
                  </SwiperSlide>
                  <SwiperSlide>
                     <CardsReviewMedium />
                     <CardsReviewSmall />
                  </SwiperSlide>
               </Swiper>
            </div>
         </div>
      </div>
   </section>
</template>
<script setup>
const swiperInstance = ref(false)
const onSwiper = (swiper) => {
   swiperInstance.value = swiper
}

</script>