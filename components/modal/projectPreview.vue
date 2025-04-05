<template>
   <UiModal :is-open="isOpen" @closePopup="emit('closePopup')" class="catalog-preview">
      <div class="modal__content catalog-preview__content">
         <UiModalCloseBtn @click="emit('closePopup')" />
         <div class="catalog-preview__wrapper">
            <Swiper @swiper="onSwiper" :spaceBetween="8" :modules="[Pagination]" :pagination="true">
               <SwiperSlide v-for="item in photos" :key="item?.url">
                  <img :src="item?.url" alt="">
               </SwiperSlide>
            </Swiper>

         </div>
      </div>
   </UiModal>
</template>
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
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
onMounted(() => {
   swiperInstance.value.slideTo(props.currentIndex)

})
watch(() => props.currentIndex, (value) => {
   swiperInstance.value.slideTo(value)
})
</script>



<style lang="scss">
.catalog-preview {
   &__content {
      width: 80vw;
      height: 80vh;
      padding: 0 !important;

      @media(max-width: 1024px) {
         width: 100vw;
         height: 100vh;
         border-radius: 0 !important;
      }

      .modal__close {
         z-index: 2;
         background-color: white !important;
      }
   }

   &__wrapper {
      width: 100%;
      height: 100%;
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

         @media(max-width: 1024px) {
            border-radius: 0 !important;
         }
      }

      img {
         width: 100%;
         height: 100%;
         object-fit: cover;
      }
   }
}
</style>