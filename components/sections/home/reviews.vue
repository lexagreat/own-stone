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
                     <CardsReviewMedium @openModal="openModal" />
                     <CardsReviewMedium @openModal="openModal" />
                  </SwiperSlide>
                  <SwiperSlide>
                     <CardsReviewMedium @openModal="openModal" />
                     <CardsReviewSmall />
                     <CardsReviewSmall />
                  </SwiperSlide>
                  <SwiperSlide>
                     <CardsReviewBig />
                  </SwiperSlide>
                  <SwiperSlide>
                     <CardsReviewMedium @openModal="openModal" />
                     <CardsReviewMedium @openModal="openModal" />
                  </SwiperSlide>
                  <SwiperSlide>
                     <CardsReviewMedium v-model="isModalOpen" />
                     <CardsReviewSmall />
                  </SwiperSlide>
                  <SwiperSlide>
                     <CardsReviewBig />
                  </SwiperSlide>
                  <SwiperSlide>
                     <CardsReviewMedium @openModal="openModal" />
                     <CardsReviewMedium @openModal="openModal" />
                  </SwiperSlide>
                  <SwiperSlide>
                     <CardsReviewMedium @openModal="openModal" />
                     <CardsReviewSmall />
                  </SwiperSlide>
               </Swiper>
            </div>
         </div>
      </div>
      <modalReviewText :isOpen="isModalOpen" @closePopup="isModalOpen = false" />
   </section>
</template>
<script setup>
import { Swiper, SwiperSlide } from "swiper/vue"
const swiperInstance = ref(null)
const isModalOpen = ref(false)
const openModal = () => {
   isModalOpen.value = true
}
const onSwiper = (swiper) => {
   swiperInstance.value = swiper
}

</script>