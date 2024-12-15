<template>
   <section class="about-value">
      <div class="container">
         <div class="about-value__wrapper scrollbar-none">
            <div class="about-value__row" v-for="item in items" :key="item">
               <div class="about-value__bg">
                  <h2 class="about-value__title h1 dark-title">
                     <p v-html="item.title"></p>
                  </h2>
               </div>
               <div class="about-value__item">
                  <component :is="item.icon" />
                  <h4 class="h4">
                     {{ item.text }}

                  </h4>
                  <NuxtLink class="btn black" v-if="item.isButton" to="/services">Наши услуги</NuxtLink>
               </div>
            </div>
         </div>
      </div>
   </section>
</template>
<script setup>
import { aboutValueAnim } from '~/assets/js/animations';
const items = ref([
   {
      isButton: true,
      title: "Главная наша ценность – <span> время наших клиентов</span>",
      icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/about-value1.svg'))),
      text: "Мы экономим ваше время, понимая, что время — это деньги. Мы берем все сложные процессы по приобретению недвижимости на себя, чтобы вы просто наслаждались покупкой."
   },
   {
      title: "Реальная <br> <span> экспертность</span>",
      icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/about-value2.svg'))),
      text: "Наша команда имеет длительный опыт работы на стороне застройщика, поэтому мы лучше других знаем, как все работает изнутри. Для нас важно постоянно актуализировать знания, поэтому в нашей компании внедрена партнерская система обмена опытом. А значит мы всегда обладаем актуальной информацией и свои решения мы основываем на глубокой экспертизе."
   },
   {
      title: "Честность",
      icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/about-value3.svg'))),
      text: "Будучи заинтересованными в долгосрочном сотрудничестве с вами, мы строим доверительные отношения, действуя открыто на каждом этапе сделки."
   },
   {
      title: "Исключительный <br> <span>подход</span>",
      icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/about-value4.svg'))),
      text: "Мы не предлагаем шаблонные решения — мы анализируем ваши запросы, вникаем в проблемы и предлагаем стратегические варианты, которые будут работать на ваше благо."
   },
   {
      title: "Оперативность ",
      icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/about-value5.svg'))),
      text: "Для оказания высшего уровня сервиса, все процессы в нашем агентстве автоматизированы и работают как единый механизм. Мы оперативно реагируем на ваши запросы и всегда находим оптимальные решения в самые сжатые сроки и без потери качества."
   },
   {
      title: "Амбициозность",
      icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/about-value6.svg'))),
      text: "Мы энергичная и быстро растущая команда, которая не боится брать на себя ответственность и предлагать смелые решения. Мы всегда предложим вам варианты, которые помогут вам выйти за рамки стандартного выбора, а также позволят заработать больше на инвестициях в недвижимость."
   },
])
onMounted(() => {
   aboutValueAnim()
})
</script>