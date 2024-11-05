<template>
   <section class="home-partners">
      <div class="container">
         <div class="home-partners__wrapper">
            <div class="home-partners__header">
               <h2 class="home-partners__title h1">
                  партнерская программа <span>для клиентов OWNSTONE</span>
               </h2>
               <div class="home-partners__text body-text">
                  Если у Вас есть клиент, друг или партнер, который хочет приобрести жилую или коммерческую недвижимость
                  в Москве, вы можете передать его в наше агентство и получить вознаграждение в размере 30% от общей
                  комиссии по факту реализованной сделки. За всеми этапами сделки вы сможете наблюдать в личном
                  кабинете.
               </div>
            </div>
            <ul class="home-partners__list scrollbar-none">
               <li class="home-partners__item" v-for="(item, i) in items" :key="item">
                  <div class="home-partners__image">
                     <component :is="item.icon" />
                     <img :src="`/img/home/partners${i + 1}.svg`" alt="">
                  </div>
                  <p class="home-partners__text h4" v-html="item.text"></p>
               </li>
            </ul>
            <div class="home-partners__footer">
               <span class="body-text">Зарабатывай вместе с нами!</span>
               <UiButton class="black">
                  Стать партнером
               </UiButton>
            </div>
         </div>
      </div>
   </section>
</template>
<script setup>
const items = ref([
   {
      text: "Нашими партнерами могут </br> стать физические </br> и юридические лица",
      // icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/partners1.svg'))),
   },
   {
      text: "Партнерские отношения </br> закрепляются на основании </br> соглашения",
      // icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/partners2.svg'))),
      // icon: "",
   },
   {
      text: "За всеми этапами сделки вы </br> можете наблюдать в личном</br> кабинете",
      // icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/partners3.svg'))),
   },
   {
      text: "Комиссия партнеру выплачивается </br>в течение 7 рабочих дней </br>с момента поступления средств </br>от застройщика",
      // icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/partners4.svg'))),
   },
])
</script>