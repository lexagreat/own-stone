<template>
   <UiModal :is-open="isOpen" @closePopup="emit('closePopup')" class="catalog-preview">
      <div class="modal__content catalog-preview__content">
         <UiModalCloseBtn @click="emit('closePopup')" />
         <div class="catalog-preview__wrapper">
            <Swiper @swiper="onSwiper" :mousewheel="{ enabled: true, forceToAxis: true }" :spaceBetween="8"
               :modules="[Pagination, Mousewheel, Navigation]" :initial-slide="currentIndex" :pagination="true">
               <SwiperSlide v-for="item in photos" :key="item?.url">
                  <img :src="item?.url" alt="">
               </SwiperSlide>
            </Swiper>
            <UiSliderBtn prev @click="swiperInstance.slidePrev()" v-if="photos?.length > 1" />
            <UiSliderBtn next @click="swiperInstance.slideNext()" v-if="photos?.length > 1" />

         </div>
      </div>
   </UiModal>
</template>
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Mousewheel, Navigation } from 'swiper/modules';

const props = defineProps({
   isOpen: Boolean,
   photos: Array,
   currentIndex: Number
})
const emit = defineEmits(['closePopup'])
const swiperInstance = ref(null)
const onSwiper = (swiper) => {
   swiperInstance.value = swiper
}
// onMounted(() => {
//    swiperInstance.value.slideTo(props.currentIndex)

// })
// watch(() => props.currentIndex, (value) => {
//    swiperInstance.value.slideTo(value)
// })
</script>



<style lang="scss">
.catalog-preview {
   &__content {
      width: 80vw;
      height: 80vh;
      padding: 0 !important;
      background-color: rgba($color: #181818, $alpha: 1);

      @media(max-width: 1024px) {
         top: 50%;
         left: 50%;
         translate: -50% -50%;
         // width: 100vw;
         // height: 100vh;
         border-radius: 0 !important;
         width: calc(100% - 40px);
      }

      @media(max-width: 568px) {
         width: 100vw;
         height: 100vh;

      }

      .modal__close {
         z-index: 2;
         background-color: white !important;
      }
   }

   &__wrapper {
      width: 100%;
      height: 100%;
      position: relative;

      .slider-btn {
         position: absolute !important;
         translate: 0 -50% !important;
         top: 50% !important;

         &.swiper-button-prev {
            left: 12px !important;
         }

         &.swiper-button-next {

            right: 12px !important;

         }
      }
   }

   .swiper {
      max-width: 100% !important;
      max-height: 100% !important;
      width: 100% !important;

      @media(max-width: 1024px) {
         border-radius: 0 !important;
      }

      .swiper-slide {
         height: auto;
         display: flex;
         align-items: center;
         justify-content: center;

         @media(max-width: 1024px) {
            border-radius: 0 !important;
         }
      }

      img {
         width: 100%;
         height: auto;
         object-fit: contain;
      }
   }
}
</style>