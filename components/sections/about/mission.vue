<template>
   <section class="about-mission">
      <div class="container">
         <div class="about-mission__wrapper">
            <div class="about-mission__header">
               <span class="rewards-section__subtitle">Наша миссия</span>
               <h2 class="h1 about-mission__title light-title">Мы ежедневно работаем и повышаем свою экспертизу,
                  <span>чтобы наши клиенты могли получать лучшие условия и делать бескомпромиссный выбор недвижимости,
                     основанный на их собственных предпочтениях</span>
               </h2>
            </div>
            <div class="about-mission__main">
               <ul class="home-features__list">
                  <li class="home-features__item" v-for="(item, index) in items" :key="item">
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