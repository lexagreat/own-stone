<template>
   <section class="sell-steps">
      <div class="container">
         <div class="sell-steps__wrapper">
            <h2 class="sell-steps__title h1 dark-title">С нами просто: <br>
               <span>все этапы под контролем</span>
            </h2>
            <ul class="sell-steps__items">
               <li class="sell-step" v-for="(item, index) in steps" :key="index">
                  <div class="sell-step__index circle">{{ index + 1 }}</div>
                  <div class="sell-step__main">
                     <h3 class="sell-step__title h3">{{ item.title }}</h3>
                     <p class="sell-step__text body-text">{{ item.text }}</p>
                  </div>
               </li>
            </ul>
            <UiButton class="black">
               Оставить заявку
            </UiButton>
         </div>
      </div>
   </section>
</template>
<script setup>
const steps = ref([
   {
      title: "Консультация и оценка",
      text: "Оставьте заявку на сайте и наши специалисты свяжутся с Вами в кратчайшие сроки",
   },
   {
      title: "маркетинг и продвижение",
      text: "Разработаем маркетинговый план и начнем активное продвижение недвижимости",
   },
   {
      title: "показы и переговоры",
      text: "Мы организуем показы Вашей недвижимости заинтересованным покупателям",
   },
   {
      title: "документальное сопровождение",
      text: "Осуществляем юридическое сопровождение сделки и послепродажное обслуживание",
   },
])
</script>