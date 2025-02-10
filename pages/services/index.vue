<template>
   <main class="main services-page">
      <SectionsBreadcrumbs :path="path" />
      <ModalService :isOpen="isOpen" :index="current" @closePopup="isOpen = false" />
      <section class="services-section">
         <div class="services-section__bgs">
            <img class="services-section__bg" v-for="item in services" :key="item" :src="item.image" alt="">
         </div>
         <div class="services-section__card" style="overflow: hidden;">
            <ul class="services-section__list">
               <li class="services-section__item" v-for="(item, i) in services" :key="item">
                  <div class="services-section__header">
                     <div class="circle">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                           <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M8.45179 3.50049V11.6498L11.7531 8.31669L12.2505 8.80929L8.10179 12.9978L3.95312 8.80929L4.45046 8.31669L7.75179 11.6498V3.50049H8.45179Z"
                              fill="#181818" />
                        </svg>
                     </div>
                     <h2 class="h3" v-html="item.title"></h2>
                  </div>
                  <div class="services-section__content collapse">
                     <div>
                        <h2 class="h1 dark-title" v-html="item.title"></h2>
                        <div class="services-section__description">
                           <div class="body-text" v-html="item.text"></div>
                           <UiButton v-if="item?.isBtn" class="black" @click="onForm(i)">Оставить заявку</UiButton>
                        </div>
                     </div>
                  </div>
               </li>
            </ul>
         </div>
      </section>
      <section class="services-mobile">
         <div class="container">
            <div class="services-section__bgs">
               <img class="services-section__bg" v-for="(item, i) in services" :key="item" :src="item.image" alt="">
            </div>
            <div class="services-mobile__wrapper">
               <div class="services-mobile__header">
                  <h1 class="services-mobile__title h1" v-html="services[0].title"></h1>
                  <p class="body-text"> {{ services[0].text }}</p>
               </div>
               <Swiper @slide-change="onSlideChange" :speed="500" centered-slides :space-between="10"
                  slides-per-view="auto" class="services-section__list">
                  <template v-for="(item, index) in services" :key="item">
                     <SwiperSlide class="services-section__item" v-if="index !== 0">
                        <h2 class="h1 dark-title" v-html="item.title"></h2>
                        <div class="services-section__description">
                           <div class="body-text" v-html="item.text"></div>
                           <UiButton class="black" @click="onForm(i)">Оставить заявку</UiButton>
                        </div>
                     </SwiperSlide>
                  </template>
               </Swiper>
            </div>
         </div>
      </section>
   </main>
</template>
<script setup>
import { servicesAnimation } from '~/assets/js/animations';
import { Swiper, SwiperSlide } from 'swiper/vue'
const { data: info } = await useBaseFetch('/servicespage/')
// console.log(info.services_page);
const path = ref([
   {
      name: "Главная",
      to: "/"
   },
   {
      name: "Услуги",
      to: ""
   },
])

const services = info.services_page.map((item, i) => {
   return {
      image: item?.picture?.url,
      title: item?.title,
      text: item?.text,
      isBtn: i ? true : false,
   }
})
const isOpen = ref(false)
const current = ref(0)
const onForm = (i) => {
   current.value = i - 1
   isOpen.value = true
}

onMounted(() => {
   setTimeout(() => {
      servicesAnimation()
   }, 300)
})
const onSlideChange = (s) => {
   const bgs = document.querySelectorAll('.services-mobile .services-section__bg')
   bgs.forEach((bg, index) => {
      if (index < s.activeIndex) {
         bg.classList.add("hidden")
      } else {
         bg.classList.remove("hidden")
      }
   })
}
useHead({
   title: 'Услуги'
})


</script>