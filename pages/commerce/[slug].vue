<template>
   <main class="main">
      <SectionsProjectHero :info="info" />
      <SectionsProjectFilters type="commerce" :projectSlug="info.slug" class="project-filters_commerce">
         варианты <span>планировок</span>
      </SectionsProjectFilters>
      <SectionsProjectChars class="project-chars_commerce" :info="info">
         <h2 class="project-chars__title h1 dark-title" style="text-align: center;">Особенности <span>помещений</span>
         </h2>
      </SectionsProjectChars>
      <SectionsProjectFeatures class="project-dark project-features_commerce" :info="info.advantages"
         v-if="info.advantages?.length">
         <h2 class="project-features__title h1 light-title">преимущества</h2>
      </SectionsProjectFeatures>
      <!-- <SectionsProjectPosition class="commerce-position" /> -->
      <!-- <SectionsProjectBuyWays class="buy-ways_commerce" /> -->
      <SectionsProjectDocuments :documents="info.documents" v-if="info.documents?.length" />
      <!-- <section class="project-sliders">
         <SectionsProductSlider>
            Ближайшие <span>объекты</span>
         </SectionsProductSlider>
      </section> -->
   </main>
</template>
<script setup>
const route = useRoute()
let { data: info } = await useBaseFetch(`/projects/?pLevel=3&filters[slug]=${route.params.slug}`)
if (!info.length) {
   throw createError({
      statusCode: 404,
      statusMessage: 'Page Not Found'
   })
}
info = info[0]
// console.log('project page info: ', info);
</script>