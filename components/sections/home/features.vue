<template>
   <section class="home-features">
      <div class="container">
         <div class="home-features__wrapper">
            <h2 class="home-features__title h1" v-html="info.title"></h2>
            <p class="body-text home-features__text" v-html="info.text"></p>
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
         <img src="/img/home/feature-mobile.png" alt="" class="mobile">\
      </div>
   </section>
</template>
<script setup>
import { sharedParallaxAnimation } from '@/assets/js/animations'
const props = defineProps({
   info: Object
})
const items = ref([])
items.value = props.info.home_features_list.map(item => {
   return {
      number: +item.number,
      title: item.sub_number || '',
      renderNumber: 1,
      subtitle: item.title
   }
})
function animateNumber(index) {
   let allTime = 3000;
   let step = 1;
   if (index == 2) {
      step = 5
   }
   let interval = allTime / items.value[index].number;
   let timer = setInterval(() => {
      if (items.value[index].renderNumber == items.value[index].number - 1) {
         clearInterval(timer)
      }

      items.value[index].renderNumber += step;
      if (index == 2 && Math.abs(items.value[index].renderNumber - items.value[index].number - 1) < 5) {
         clearInterval(timer)
         items.value[index].renderNumber = items.value[index].number
      }
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