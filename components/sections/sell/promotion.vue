<template>
   <section class="sell-promotion">
      <div class="container">
         <div class="sell-promotion__wrapper">
            <div class="sell-promotion__header">
               <h2 class="sell-promotion__title dark-title h1">
                  индивидуально Подбираем <br> <span>способы продвижения</span>
               </h2>
               <div class="sell-promotion__nav">
                  <UiSliderBtn prev @click="swiperInstance.slidePrev()" />
                  <UiSliderBtn next @click="swiperInstance.slideNext()" />
               </div>
            </div>
            <div class="sell-promotion__slider">
               <Swiper @swiper="onSwiper" slides-per-view="auto" :space-between="10">
                  <SwiperSlide v-for="(item, index) in items" :key="index">
                     <img :src="`/img/sell/promotion${index + 1}.png`" alt="">
                     <h4 class="h4">{{ item.text }}</h4>
                  </SwiperSlide>
               </Swiper>
            </div>
         </div>
      </div>
   </section>
</template>
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
const swiperInstance = ref(null)
const onSwiper = (swiper) => {
   swiperInstance.value = swiper
}
const items = ref([
   {
      text: "Размещение рекламы вашего объекта на площадках-классифайдах",
   },
   {
      text: "Организация профессиональной фото и видео съемки вашего объекта",
   },
   {
      text: "Предложение вашего объекта внутренней базе клиентов агентства",
   },
   {
      text: "Публикация вашего объекта в социальных сетях агентства",
   },
   {
      text: "Приоритетная поддержка персонального брокера 24/7",
   },
   {
      text: "Эксклюзивный видео-ролик о вашем объекте",
   },
   {
      text: "Привлечение партнеров к реализации вашего объекта",
   },
   {
      text: "Сбор статистики и формирование отчетов каждые 10 дней экспонирования",
   },
])
</script>