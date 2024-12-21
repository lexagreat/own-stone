<template>
   <section class="project-hero">
      <Swiper :modules="[Pagination, Autoplay]" :pagination="{ el: pagination }" :slides-per-view="1" :autoplay="{
         delay: 1500,
         enadled: true
      }" :speed="700">
         <SwiperSlide v-for="item in 3">
            <img src="/img/project/hero.png" alt="">
         </SwiperSlide>
      </Swiper>
      <div class="container">
         <div class="project-hero__wrapper">
            <div class="project-hero__header">
               <SectionsBreadcrumbs :path="path" />
               <button class="circle project-hero__like">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                     <path
                        d="M13.4322 6.10547L14.0054 6.61277L14.5741 6.1004C15.7151 5.07232 17.207 4.52108 18.7423 4.56027C20.2777 4.59946 21.7395 5.2261 22.8266 6.31105C23.9136 7.39599 24.5431 8.8566 24.5853 10.3919C24.6273 11.9198 24.0844 13.4058 23.068 14.5467L14.0004 23.6271L4.93707 14.5494C3.93732 13.4064 3.40779 11.9266 3.45585 10.4081C3.50419 8.88122 4.13299 7.43019 5.21409 6.35081C6.29519 5.27143 7.74722 4.64495 9.27422 4.59904C10.8006 4.55316 12.2878 5.0926 13.4322 6.10547Z"
                        stroke="white" stroke-width="1.71429" />
                  </svg>
               </button>
            </div>
            <div class="project-hero__main">
               <ul class="project-hero__banners">
                  <li>ID 60675</li>
               </ul>
               <h1 class="project-hero__title h1 light-title">luzhniki collection <span>в хамовниках</span></h1>
               <UiButton class="white">Оставить заявку</UiButton>
            </div>
            <div class="project-hero__footer">
               <ul class="project-hero__banners">
                  <li>IV кв.2026</li>
                  <li>
                     <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
                        <path
                           d="M6 1.25C3.93 1.25 2.25 2.762 2.25 4.625C2.25 7.625 6 11.75 6 11.75C6 11.75 9.75 7.625 9.75 4.625C9.75 2.762 8.07 1.25 6 1.25ZM6 6.5C5.80075 6.50364 5.60276 6.46754 5.41762 6.3938C5.23247 6.32006 5.06388 6.21017 4.92168 6.07055C4.77948 5.93092 4.66653 5.76436 4.58943 5.58059C4.51233 5.39683 4.47262 5.19954 4.47262 5.00025C4.47262 4.80096 4.51233 4.60367 4.58943 4.41991C4.66653 4.23614 4.77948 4.06958 4.92168 3.92995C5.06388 3.79033 5.23247 3.68044 5.41762 3.6067C5.60276 3.53296 5.80075 3.49686 6 3.5005C6.39302 3.50768 6.76751 3.66884 7.04291 3.94932C7.31832 4.22979 7.47262 4.60717 7.47262 5.00025C7.47262 5.39333 7.31832 5.77071 7.04291 6.05118C6.76751 6.33166 6.39302 6.49282 6 6.5Z"
                           fill="white" />
                     </svg>
                     Лужнецкая набережная, вл. 2/4
                  </li>
                  <li>
                     <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <rect x="2" y="2" width="8" height="8" rx="4" fill="#E52313" />
                     </svg>Воробьевы горы, 10 мин
                  </li>
                  <li>квартиры от 57 968 000 ₽</li>
               </ul>
               <div class="project-hero__pagination" ref="pagination"></div>
            </div>
         </div>
      </div>
   </section>
</template>
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Autoplay } from 'swiper/modules';
const path = ref([
   {
      name: "Главная",
      to: "/"
   },
   {
      name: "Купить",
      to: "/catalog/build"
   },
   {
      name: "Luzhniki Collection",
      to: ""
   },
])
const pagination = ref(null)
</script>