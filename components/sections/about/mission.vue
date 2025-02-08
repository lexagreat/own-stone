<template>
   <section class="about-mission">
      <div class="container">
         <div class="about-mission__wrapper">
            <div class="about-mission__header">
               <span class="rewards-section__subtitle">Наша миссия</span>
               <h2 class="h1 about-mission__title light-title" v-html="title">
               </h2>
            </div>
            <div class="about-mission__main">
               <ul class="home-features__list">
                  <li class="home-features__item" v-for="(item, index) in res" :key="item">
                     <h4 class="h1">{{ item.renderNumber + " " + item.title }}</h4>
                     <span>{{ item.subtitle }}</span>
                  </li>
               </ul>
            </div>
         </div>
      </div>
   </section>
</template>
<script setup>
const props = defineProps({
   title: String,
   items: Array
})
const res = ref([])
res.value = props.items.map(item => {
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
      step = 4
   }
   let interval = allTime / res.value[index].number;
   let timer = setInterval(() => {
      if (res.value[index].renderNumber == res.value[index].number - 1) {
         clearInterval(timer)
      }

      res.value[index].renderNumber += step;
      if (index == 2 && Math.abs(res.value[index].renderNumber - res.value[index].number - 1) < 5) {
         clearInterval(timer)
         res.value[index].renderNumber = res.value[index].number
      }
   }, interval)
}
onMounted(() => {
   const targetElement = document.querySelector('.home-features__list');

   const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
         if (entry.isIntersecting) {
            setTimeout(() => {
               for (let i = 0; i < res.value.length; i++) {
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