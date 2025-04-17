<template>
   <main class="main">
      <AppProjectHead :seo="info.seo" :title="info.name" />

      <SectionsProjectHero :info="info" />
      <SectionsProjectFilters type="commerce" :projectSlug="info.slug" class="project-filters_commerce"
         :count="info?.apartaments?.length">
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
      <SectionsProjectPosition class="commerce-position" :info="info?.locations_map" v-if="info?.locations_map?.length"
         :projectCoords="info?.coords" :project="info?.name" />
      <SectionsProjectBuyWays class="buy-ways_commerce" :name="info?.name" />
      <SectionsProjectDocuments :documents="info.documents" v-if="info.documents?.length" />
      <!-- <section class="project-sliders">
         <SectionsProductSlider>
            Ближайшие <span>объекты</span>
         </SectionsProductSlider>
      </section> -->
   </main>
</template>
<script setup>
import { useRecently } from '~/store/recently'

const recentlyStore = useRecently()
import { useCatalog } from '~/store/catalog';
const catalogStore = useCatalog()
catalogStore.loading = true
const route = useRoute()
let { data: info } = await useBaseFetch(`/projects/?pLevel=3&filters[slug]=${route.params.slug}`)
if (!info?.length && !info?.data) {
   throw createError({
      statusCode: 404,
      statusMessage: 'Page Not Found'
   })
}
if (info?.data) {
   info = info?.data[0]
} else {
   info = info[0]
}
// console.log('project page info: ', info);
onMounted(async () => {
   catalogStore.loading = false
   recentlyStore.add(route.params.slug)
   await recentlyStore.getProducts()
})
// useHead({
//    title: info?.name
// })
</script>