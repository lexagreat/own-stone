<template>
   <section class="project-about" v-if="!(!info?.description?.length && tabs?.length)">
      <div class="container">
         <div class="project-about__wrapper">
            <div class="project-about__header">
               <h2 class="project-about__title h1 dark-title">о проекте</h2>
               <div class="project-about__description" v-if="info?.description?.length" :class="{ active: isTextFull }">
                  <div class="body-text" v-html="'<pre>' + info.description + '</pre>'"></div>
                  <transition name="fade">
                     <button @click="isTextFull = true" v-if="!isTextFull">Читать полностью</button>
                  </transition>
                  <transition name="fade">
                     <button @click="isTextFull = false" v-if="isTextFull">Свернуть</button>
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
                     <SwiperSlide v-for="(item, index) in info.about_slider[tab]?.gallery">
                        <img :src="item.url" alt="">
                        <ul class="home-team__dots">
                           <li v-for="item in info.about_slider[tab]?.as_gallery_pin[index]?.pin"
                              class="home-team__item" :style="item.line_style">
                              <div class="home-team__dot"></div>
                              <div class="home-team__modal">
                                 <span>{{ item.text }}</span>
                              </div>
                           </li>
                        </ul>
                     </SwiperSlide>
                  </Swiper>
                  <UiSliderBtn prev transparent @click="SwiperInst.slidePrev()"
                     v-if="info.about_slider[tab]?.gallery?.length > 1" />
                  <UiSliderBtn next transparent @click="SwiperInst.slideNext()"
                     v-if="info.about_slider[tab]?.gallery?.length > 1" />
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


<style lang="scss">
.project-about {
   pre {
      white-space: break-spaces;
   }
}
</style>