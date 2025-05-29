<template>
   <UiModal :isOpen="isOpen" @closePopup="emit('closePopup')" class="videos-modal">
      <div class="videos-modal__content modal__content">
         <Swiper @swiper="onSwiper" :breakpoints="breakpoints" :slides-per-view="1" centered-slides :space-between="8">
            <SwiperSlide v-for="item in info">
               <UiSliderBtn prev @click="swiper.slidePrev()" v-if="info?.length > 1" />
               <UiModalCloseBtn @click="emit('closePopup')" />
               <video :src="item.video.url"></video>
               <UiSliderBtn next @click="swiper.slideNext()" v-if="info?.length > 1" />
            </SwiperSlide>
         </Swiper>
      </div>
   </UiModal>
</template>
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
const props = defineProps({
   isOpen: Boolean,
   info: Array,
   currentIndex: Number
})
const breakpoints = ref({
   1024: {
      slidesPerView: 2.6,
      spaceBetween: 200
   },
})
const emit = defineEmits(['closePopup'])

const swiper = ref(null)
const onSwiper = (s) => {
   swiper.value = s
   swiper.value.slideTo(props.currentIndex)
}

watch(() => props.currentIndex, () => {
   // console.log(props.currentIndex);
   swiper.value.slideTo(props.currentIndex)

})
watch(() => props.isOpen, (value) => {
   const video = document.querySelectorAll('.videos-modal .swiper-slide video')[props.currentIndex]
   // console.log(video);

   if (!value) {
      video.pause()
   } else {
      video.play()
   }
})
</script>