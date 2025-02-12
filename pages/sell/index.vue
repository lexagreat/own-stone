<template>
   <main class="main">
      <SectionsSellHero :info="info.sel_hero" />
      <SectionsSellCooperation :info="info.sell_coop[0]" />
      <SectionsSellSteps :info="info.sell_steps" />
      <SectionsSellPromotion :info="info.sell_promotion" />
      <SectionsSellPortfolio :info="info.sell_portfolio" />
      <SectionsHomeReviews :info="info.reviews" />
      <section class="project-sliders">
         <SectionsProductSlider :products="info.sell_projects_slider.apartmanets" :category="2" white-btns>
            <div v-html="info.sell_projects_slider.title"></div>
         </SectionsProductSlider>
      </section>
      <SectionsSellCalculator />
   </main>
</template>
<script setup>
const { data: info } = await useBaseFetch('/sellpage')
// console.log(info);
useHead({
   title: 'Продать'
})
</script>