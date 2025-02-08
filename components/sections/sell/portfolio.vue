<template>
   <section class="sell-portfolio">
      <div class="container">
         <div class="sell-portfolio__wrapper">
            <h2 class="sell-portfolio__title h1 light-title" v-html="info.title">
            </h2>
            <div class="sell-portfolio__main">
               <Swiper @swiper="onSwiper" :space-between="10">
                  <SwiperSlide class="sell-portfolio__slide" v-for="(item, index) in info.sell_portfolio_list"
                     :key="item">
                     <div class="sell-portfolio__gallery">
                        <Swiper :modules="[Pagination]" :pagination="true">
                           <SwiperSlide v-for="image in item.gallery" :key="image">
                              <img :src="image.url" alt="">
                           </SwiperSlide>
                        </Swiper>
                     </div>
                     <div class="sell-portfolio__content">
                        <div class="sell-portfolio__header">
                           <h3 class="sell-portfolio__subtitle h3" v-html="item.title"></h3>
                           <div class="sell-portfolio__text body-text" :class="{ full: fullText[index] }">{{ item.text
                              }}
                           </div>
                           <button @click="fullText[index] = true" v-if="!fullText[index]">Читать полностью</button>
                        </div>
                        <ul class="sell-portfolio__chars body-text">
                           <li v-for="char in item.sell_portfolio_list_properties" :key="char">
                              <span>{{ char.name }}</span><span>{{ char.value }}</span>
                           </li>
                        </ul>
                        <div class="sell-portfolio__footer">
                           <div class="sell-portfolio__pagination body-text">{{ swiper?.activeIndex + 1 }}/{{
                              info.sell_portfolio_list.length }}
                           </div>
                           <div class="sell-portfolio__nav">
                              <UiSliderBtn prev class="black" @click="swiper.slidePrev()" />
                              <UiSliderBtn next class="black" @click="swiper.slideNext()" />
                           </div>
                        </div>
                     </div>
                  </SwiperSlide>
               </Swiper>
            </div>
         </div>
      </div>
   </section>
</template>
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
const props = defineProps({
   info: Object
})
const swiper = ref(null)
const onSwiper = (s) => {
   swiper.value = s;
}
const fullText = ref([])
props.info.sell_portfolio_list.forEach(item => {
   fullText.value.push(false)
})
</script>