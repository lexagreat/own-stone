<template>
   <section class="project-about">
      <div class="container">
         <div class="project-about__wrapper">
            <div class="project-about__header">
               <h2 class="project-about__title h1 dark-title">о проекте</h2>
               <div class="project-about__description" :class="{ active: isTextFull }">
                  <div class="body-text">С помощью агентства OWNSTONE мы с мужем купили квартиру. Очень
                     Коллекция двенадцати клубных домов в частном парке на берегу Москва-реки у входа в легендарный
                     олимпийский комплекс «Лужники». Проект LUZHNIKI COLLECTION был создан международной командой
                     архитекторов как эстетический ансамбль предметов архитектурного искусства, каждый дом и квартира
                     которого представляют собой коллекционные объекты недвижимости, обладающие уникальными
                     характеристиками. С помощью агентства OWNSTONE мы с мужем купили квартиру. Очень
                     Коллекция двенадцати клубных домов в частном парке на берегу Москва-реки у входа в легендарный
                     олимпийский комплекс «Лужники». Проект LUZHNIKI COLLECTION был создан международной командой
                     архитекторов как эстетический ансамбль предметов архитектурного искусства, каждый дом и квартира
                     которого представляют собой коллекционные объекты недвижимости, обладающие уникальными
                     характеристиками. С помощью агентства OWNSTONE мы с мужем купили квартиру. Очень
                     Коллекция двенадцати клубных домов в частном парке на берегу Москва-реки у входа в легендарный
                     олимпийский комплекс «Лужники». Проект LUZHNIKI COLLECTION был создан международной командой
                     архитекторов как эстетический ансамбль предметов архитектурного искусства, каждый дом и квартира
                     которого представляют собой коллекционные объекты недвижимости, обладающие уникальными
                     характеристиками.</div>
                  <transition name="fade">
                     <button @click="isTextFull = true" v-if="!isTextFull">Читать полностью</button>
                  </transition>

               </div>
            </div>
            <div class="project-about__main">
               <ul class="project-about__tabs app-tabs scrollbar-none">
                  <li v-for="item in tabs" :key="item">
                     <input type="radio" name="projectAbout" :value="item.value" :id="'project' + item.value"
                        v-model="tab">
                     <label :for="'project' + item.value">{{ item.name }}</label>
                  </li>
               </ul>
               <div class="project-about__slider">
                  <Swiper :modules="[SwiperPagination]" @swiper="onSwiper" :slides-per-view="1" :pagination="true">
                     <SwiperSlide v-for="item in 3">
                        <img src="/img/project/about-1.png" alt="">
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
const isTextFull = ref(false)
const tabs = ref([
   {
      value: 0,
      name: "Архитектура"
   },
   {
      value: 1,
      name: "Лобби"
   },
   {
      value: 2,
      name: "Интерьеры"
   },
   {
      value: 3,
      name: "Отделка"
   },
   {
      value: 4,
      name: "Благоустройство"
   },
   {
      value: 5,
      name: "Паркинг"
   },
])
const tab = ref(0)
const SwiperInst = ref(null)

const onSwiper = (swiper) => {
   SwiperInst.value = swiper
}

</script>