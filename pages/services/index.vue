<template>
   <main class="main services-page">
      <SectionsBreadcrumbs :path="path" />
      <section class="services-section">
         <div class="services-section__bgs">
            <img class="services-section__bg" v-for="item in services" :key="item" :src="item.image" alt="">
         </div>
         <div class="services-section__card">
            <ul class="services-section__list">
               <li class="services-section__item" v-for="item in services" :key="item">
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
                           <UiButton v-if="item?.isBtn" class="black">Оставить заявку</UiButton>
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
               <img class="services-section__bg" v-for="item in services" :key="item" :src="item.image" alt="">
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
                           <UiButton class="black">Оставить заявку</UiButton>

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

const services = ref([
   {
      image: "/img/services/service0.jpeg",
      title: "Услуги",
      text: "Мы предлагаем полный комплекс профессиональных услуг в сфере недвижимости, как на первичном, так и на вторичном рынке, работая с объектами жилого и коммерческого назначения."
   },
   {
      isBtn: true,
      image: "/img/services/service1.jpeg",
      title: "Покупка <span> недвижимости</span>",
      text: `<ul>
   <li>Выявление точного запроса </li>
   <li>Персонализированная подборка лотов </li>
   <li>Организация и проведение встреч на объекте </li>
   <li>Полное сопровождение сделки: подготовка документов, юридическая проверка, контроль на каждом этапе </li>
   <li>Одобрение ипотеки, подбор выгодной банковской программы </li>
   <li>Регистрация в Росреестре </li>
</ul>`
   },
   {
      isBtn: true,
      image: "/img/services/service2.jpeg",
      title: "Продажа <span> недвижимости</span>",
      text: `
<ul>
   <li>Аналитика по рынку: конкурентный анализ, локационный спрос, ценообразование </li>
   <li>Профессиональная оценка вашей недвижимости</li>
   <li>Организация фото и видео-съемки объекта</li>
   <li>Упаковка и размещение объявления </li>
   <li>Маркетинговая поддержка, продвижение </li>
   <li>Организация просмотров объекта</li>
   <li>Юридическое сопровождение сделки</li>
</ul>
      `
   },
   {
      isBtn: true,
      image: "/img/services/service3.jpeg",
      title: "Инвестиции <span> в недвижимость</span>",
      text: `
<ul>
   <li>Аналитика по рынку: конкурентный анализ, локационный спрос, ценообразование </li>
   <li>Профессиональная оценка вашей недвижимости</li>
   <li>Организация фото и видео-съемки объекта</li>
   <li>Упаковка и размещение объявления </li>
   <li>Маркетинговая поддержка, продвижение </li>
   <li>Организация просмотров объекта</li>
   <li>Юридическое сопровождение сделки</li>
</ul>
      `
   },
])


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
</script>