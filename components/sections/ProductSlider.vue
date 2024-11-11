<template>
   <section class="product-slider">
      <div class="container">
         <div class="product-slider__wrapper">
            <div class="product-slider__header">
               <h2 class="product-slider__title h1 dark-title">
                  <slot />
               </h2>
               <div class="product-slider__btns">
                  <UiSliderBtn prev @click="slidePrev" />
                  <UiSliderBtn next @click="slideNext" />
               </div>
            </div>
            <div class="product-slider__main">
               <Swiper @swiper="onSwiper" :space-between="10" slides-per-view="auto" :loop="true" :breakpoints="{
                  1025: {
                     slidesPerView: 4
                  }
               }">
                  <SwiperSlide v-for="item in 8">
                     <CatalogCard />
                  </SwiperSlide>
               </Swiper>
            </div>
         </div>
      </div>
   </section>
</template>
<script setup>
const swiperInst = ref(null)
const onSwiper = (swiper) => {
   swiperInst.value = swiper;
}
const slidePrev = () => {
   swiperInst.value.slidePrev()
}
const slideNext = () => {
   swiperInst.value.slideNext()
}
</script>