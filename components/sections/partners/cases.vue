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
                  <SwiperSlide v-for="item in transformedData" :key="item">
                     <CardsCaseBig v-if="!Array.isArray(item)" :info="item" @openVideo="onOpenVideoModal" />
                     <CardsCaseSmall v-if="item.length == 2" :info="item[0]" @openModal="onOpenModal" />
                     <CardsCaseSmall v-if="item.length == 2" :info="item[1]" @openModal="onOpenModal" />
                  </SwiperSlide>
               </Swiper>
            </div>
         </div>
      </div>
      <ModalCase :isOpen="isTextModalOpen" @closePopup="isTextModalOpen = false" :info="currentMedium" />
      <ModalVideos :isOpen="isVideoModalOpen" @closePopup="isVideoModalOpen = false" :info="videoCases"
         :currentIndex="currentVideo" />
   </section>
</template>
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
const props = defineProps({
   info: Object
})
const isTextModalOpen = ref(false)
const isVideoModalOpen = ref(false)
const currentMedium = ref(null)
const currentVideo = ref(0)
const onOpenModal = (item) => {
   currentMedium.value = item
   isTextModalOpen.value = true
}
const swiper = ref(null)
const onSwiper = (s) => {
   swiper.value = s;
}
const breakpoints = ref({
   1025: {
      slidesPerView: 3,
   }
})

const transformArray = (array) => {
   const result = [];
   for (let i = 0; i < array.length; i++) {
      const item = array[i];
      if (item?.is_video) {
         result.push(item);
      } else {
         const nextItem = array[i + 1];
         result.push([item, nextItem]);
         i++; // Пропускаем следующий элемент, так как он уже обработан
      }
   }
   return result;
};

const transformedData = transformArray(props.info?.partners_case_list);

const videoCases = props.info.partners_case_list.filter(item => item?.video)
const onOpenVideoModal = (obj) => {
   currentVideo.value = props.info.partners_case_list.findIndex(item => item.id == obj.id)
   isVideoModalOpen.value = true
}
</script>