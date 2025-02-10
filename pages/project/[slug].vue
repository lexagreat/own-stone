<template>
   <main class="main">
      <SectionsProjectHero :info="info" />
      <SectionsProjectAbout :info="info" />
      <SectionsProjectChars :info="info">
         <h2 class="project-chars__title h1 dark-title">ХАРАКТЕРИСТИКИ
         </h2>
      </SectionsProjectChars :info="info">
      <SectionsProjectFeatures :info="info.advantages" v-if="info.advantages?.length">
         <h2 class="project-features__title h1 dark-title">преимущества</h2>
      </SectionsProjectFeatures>

      <SectionsProjectFilters type="build" :projectSlug="info.slug">
         ТИПЫ <span>планировок</span>
      </SectionsProjectFilters>
      <!-- <SectionsProjectBuyWays /> -->
      <!-- <SectionsProjectPosition /> -->
      <SectionsProjectNearPlaces :info="info.place_nearby" v-if="info.place_nearby?.length" />
      <SectionsProjectDocuments :documents="info.documents" v-if="info.documents?.length" />
      <!-- <section class="project-sliders">
         <SectionsProductSlider>
            похожие <span>предложения</span>
         </SectionsProductSlider>
         <SectionsProductSlider>
            Вы ранее <span>смотрели</span>
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
useHead({
   title: info.name
})
</script>