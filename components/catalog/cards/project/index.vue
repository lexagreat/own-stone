<template>
   <div class="catalog-card with-hover">
      <div class="catalog-card__gallery">
         <ul>
            <li v-for="item in 3" @mouseenter="onMouseenter(item)"></li>
         </ul>
         <Swiper @swiper="onSwiper" :spaceBetween="8" :modules="[SwiperPagination]" :pagination="true">
            <SwiperSlide v-for="item in 3" :key="item">

               <img src="/img/catalog-card.png" alt="">
            </SwiperSlide>
         </Swiper>
         <div class="catalog-card__header">
            <ul class="catalog-card__tags">
               <li>СТАРТ ПРОДАЖ</li>
            </ul>
            <button class="catalog-card__like">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                     d="M7.66897 3.3947L8.00333 3.69062L8.33504 3.39174C9.00063 2.79202 9.8709 2.47047 10.7665 2.49333C11.6621 2.51619 12.5149 2.88173 13.149 3.51461C13.7831 4.1475 14.1503 4.99952 14.1749 5.89509C14.1994 6.78637 13.8827 7.65321 13.2898 8.31871L8.00038 13.6156L2.71345 8.32029C2.13026 7.65355 1.82137 6.79033 1.84941 5.90459C1.87761 5.01388 2.24441 4.16745 2.87505 3.53781C3.50569 2.90817 4.35271 2.54272 5.24346 2.51595C6.13387 2.48918 7.00139 2.80386 7.66897 3.3947Z"
                     stroke="white" />
               </svg>
            </button>
         </div>
      </div>
      <div class="catalog-card__main">
         <div class="catalog-card__content">
            <ul class="catalog-card__banners">
               <li>IV кв.2029</li>
               <li>125 лотов</li>
               <li>ID 50555</li>
            </ul>
            <h4 class="catalog-card__title">Republic</h4>
            <span class="catalog-card__price">20 млн ₽ - 124 млн ₽ </span>
            <ul class="catalog-card__addresses">
               <li>
                  <IconAddress />
                  <span>Пресненский вал, вл. 27</span>
               </li>
               <li>
                  <IconDot />
                  <span>Белорусская, 15 мин </span>
                  <IconMan />
               </li>
            </ul>
         </div>
         <div class="catalog-card__footer">
            <ul>
               <li>
                  <p>
                     <span>1-комн. (53)</span>
                     <span>от 26.86 м2</span>
                  </p>
                  <span> от 20 205 360 ₽</span>
               </li>
               <li>
                  <p>
                     <span>2-комн. (49)</span>
                     <span>от 38.27м2</span>
                  </p>
                  <span>от 24 455 360 ₽</span>
               </li>
               <li>
                  <p>
                     <span>3-комн. (73)</span>
                     <span>от 47.49м2</span>
                  </p>
                  <span> от 37 928 955 ₽</span>
               </li>
               <li>
                  <p>
                     <span>4-комн. (53)</span>
                     <span>от 74.66м2</span>
                  </p>
                  <span> от 43 778 744 ₽</span>
               </li>
               <li>
                  <p>
                     <span>5-комн. (4)</span>
                     <span>от 126.16м2</span>
                  </p>
                  <span>от 102 558 678 ₽</span>
               </li>
            </ul>
            <div class="catalog-card__btns">
               <NuxtLink class="btn white" to="/project/lexagreat">Подробнее о проекте</NuxtLink>
               <button class="circle">
                  <IconPhone />
               </button>
            </div>
         </div>
      </div>
   </div>
</template>
<script setup>
import IconMan from '@/assets/img/icons/catalog-card-man.svg'
import IconDot from '@/assets/img/icons/catalog-card-dot.svg'
import IconAddress from '@/assets/img/icons/catalog-card-address.svg'
import IconPhone from '@/assets/img/icons/phone.svg'

const swiperInstance = ref(null)
const onSwiper = (swiper) => {
   swiperInstance.value = swiper
}
const onMouseenter = (index) => {
   swiperInstance.value.slideTo(index - 1)
}
</script>
