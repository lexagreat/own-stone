<template>
   <section class="home-features">
      <div class="container">
         <div class="home-features__wrapper">
            <h2 class="home-features__title h1">
               Агентство недвижимости <span>бизнес и&nbsp;премиум-сегмента </span>
            </h2>
            <p class="body-text home-features__text"> Мы&nbsp;стремимся стать агентством, которое меняет представление
               о&nbsp;сделках с&nbsp;недвижимостью. Наши стандарты основаны на&nbsp;честности, где в&nbsp;центре каждого
               решения находится человек и&nbsp;его потребности. Наши клиенты&nbsp;&mdash; это партнеры, с&nbsp;которыми
               мы&nbsp;идём вместе к&nbsp;созданию лучшего будущего.</p>
            <ul class="home-features__list">
               <li class="home-features__item" v-for="(item, index) in items" :key="item">
                  <h4 class="h1">{{ item.renderNumber + " " + item.title }}</h4>
                  <span>{{ item.subtitle }}</span>
               </li>
            </ul>
         </div>
      </div>
      <div class="home-features__parallax">
         <img src="/img/home/feature.png" alt="" class="desktop">
         <img src="/img/home/feature-tablet.png" alt="" class="tablet">
         <img src="/img/home/feature-mobile.png" alt="" class="mobile">

      </div>
   </section>
</template>
<script setup>
import { sharedParallaxAnimation } from '@/assets/js/animations'
const items = ref([
   {
      number: 8,
      renderNumber: 1,
      title: " лет",
      subtitle: "работы с ведущими застройщиками"
   },
   {
      number: 20,
      renderNumber: 1,
      title: " млрд. ₽",
      subtitle: "привлеченных инвестиций"
   },
   {
      number: 3000,
      renderNumber: 1,
      title: "",
      subtitle: "реализованных сделок"
   },
])
function animateNumber(index) {
   let allTime = 5000;
   let interval = allTime / items.value[index].number;
   let timer = setInterval(() => {
      if (items.value[index].renderNumber == items.value[index].number - 1) {
         clearInterval(timer)
      }
      items.value[index].renderNumber++
   }, interval)
}
onMounted(() => {
   sharedParallaxAnimation(".home-features__parallax", ".home-features")
   const targetElement = document.querySelector('.home-features__list');

   const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
         if (entry.isIntersecting) {
            setTimeout(() => {
               for (let i = 0; i < items.value.length; i++) {
                  animateNumber(i)
               }

            }, 200)
            // Элемент видим - запускаем анимацию
            observer.unobserve(targetElement); // Останавливаем наблюдение после срабатывания
         }
      });
   });

   observer.observe(targetElement); // Наблюдаем за элементом
})
</script>

<style scoped lang="scss">
.tablet,
.mobile {
   display: none;
}

@media(max-width: 1024px) {
   .desktop {
      display: none;
   }

   .tablet {
      display: block;
   }
}

@media(max-width: 568px) {
   .mobile {
      display: block;
   }

   .tablet {
      display: none;
   }
}
</style>