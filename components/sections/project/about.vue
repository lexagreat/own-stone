<template>
   <section class="project-about" v-if="!(!info?.description?.length && tabs?.length)">
      <div class="container">
         <div class="project-about__wrapper">
            <div class="project-about__header">
               <h2 class="project-about__title h1 dark-title">о проекте</h2>
               <div class="project-about__description" v-if="info?.description?.length" :class="{ active: isTextFull }">
                  <div class="body-text">{{ info.description }}</div>
                  <transition name="fade">
                     <button @click="isTextFull = true" v-if="!isTextFull">Читать полностью</button>
                  </transition>

               </div>
            </div>
            <div class="project-about__main" v-if=tabs?.length>
               <ul class="project-about__tabs app-tabs scrollbar-none">
                  <li v-for="item in tabs" :key="item">
                     <input type="radio" name="projectAbout" :value="item.value" :id="'project' + item.value"
                        v-model="tab">
                     <label :for="'project' + item.value">{{ item.name }}</label>
                  </li>
               </ul>
               <div class="project-about__slider">
                  <Swiper :modules="[Pagination, Mousewheel]" :mousewheel="{ enabled: true, forceToAxis: true }"
                     @swiper="onSwiper" :slides-per-view="1" :pagination="true">
                     <SwiperSlide v-for="item in info.about_slider[tab]?.gallery">
                        <img :src="item.url" alt="">
                     </SwiperSlide>
                  </Swiper>
                  <UiSliderBtn prev transparent @click="SwiperInst.slidePrev()" />
                  <UiSliderBtn next transparent @click="SwiperInst.slideNext()" />
               </div>

            </div>
         </div>
      </div>
   </section>
</template>
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Mousewheel } from 'swiper/modules';
const props = defineProps({
   info: Object
})
const isTextFull = ref(false)
const tab = ref(0)
const SwiperInst = ref(null)

const onSwiper = (swiper) => {
   SwiperInst.value = swiper
}

const tabs = props.info.about_slider.map((item, index) => {
   return {
      name: item.title,
      value: index
   }
})
watch(tab, () => {
   SwiperInst.value.slideTo(0)
})
</script>