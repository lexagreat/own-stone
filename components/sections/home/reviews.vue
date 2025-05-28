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
                  <SwiperSlide v-for="item in groupedArray" :key="item">
                     <div v-if="item[0]?.video">
                        <CardsReviewBig :info="item[0]" @openModal="openReviewsModal" />
                     </div>
                     <div v-if="item[0]?.text && !item[0]?.video">
                        <CardsReviewMedium @openModal="openModal" :info="item[0]" />
                        <CardsReviewMedium @openModal="openModal" :info="item[1]"
                           v-if="item[1]?.text && !item[1]?.video" />
                        <CardsReviewSmall v-if="item[1]?.video && !item[1]?.text" :info="item[1]"
                           @openModal="openReviewsModal" />
                        <CardsReviewSmall v-if="item[1]?.video && !item[1]?.text" :info="item[2]"
                           @openModal="openReviewsModal" />
                     </div>
                  </SwiperSlide>

               </Swiper>
            </div>
         </div>
      </div>
      <ModalReviewText :isOpen="isModalOpen" @closePopup="isModalOpen = false" :info="currentMedium" />
      <ModalVideos :isOpen="isVideoModalOpen" @closePopup="isVideoModalOpen = false" :info="videoReviews"
         :currentIndex="currentVideo" />
   </section>
</template>
<script setup>
import { Swiper, SwiperSlide } from "swiper/vue"
const props = defineProps({
   info: Array
})

const currentMedium = ref(null)
const swiperInstance = ref(null)
const isModalOpen = ref(false)
const isVideoModalOpen = ref(false)
const currentVideo = ref(0)
const openModal = (info) => {
   isModalOpen.value = true
   currentMedium.value = info
}
const onSwiper = (swiper) => {
   swiperInstance.value = swiper
}

function splitArray(inputArray) {
   let result = [];
   let groupSizes = [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3]; // Предопределённый шаблон размеров групп
   let index = 0;

   for (let size of groupSizes) {
      if (index < inputArray.length) {
         result.push(inputArray.slice(index, index + size));
         index += size;
      }
   }

   return result;
}
const groupedArray = splitArray(props.info);



const videoReviews = props.info.filter(item => item?.video?.url)



const openReviewsModal = (obj) => {
   isVideoModalOpen.value = true
   currentVideo.value = videoReviews.findIndex(item => item.id == obj.id)
}
</script>