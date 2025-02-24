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

      <SectionsProjectFilters type="build" :projectSlug="info.slug" :count="info?.apartaments?.length">
         ТИПЫ <span>планировок</span>
      </SectionsProjectFilters>
      <SectionsProjectBuyWays :name="info?.name" />
      <SectionsProjectPosition :project="info.name"
         :image="info.detail_picture?.length ? info.detail_picture[0]?.url : ''" :info="info?.locations_map"
         v-if="info?.locations_map?.length" :projectCoords="info?.coords" />
      <SectionsProjectNearPlaces :info="info.place_nearby" v-if="info.place_nearby?.length" />
      <SectionsProjectDocuments :documents="info.documents" v-if="info.documents?.length" />
      <section class="project-sliders">
         <SectionsProductSlider :products="recentlyStore.same.filter(item => item.slug !== route.params.slug)">
            похожие <span>предложения</span>
         </SectionsProductSlider>
         <SectionsProductSlider :category="0"
            :products="recentlyStore.products.filter(item => item.slug !== route.params.slug)">
            Вы ранее <span>смотрели</span>
         </SectionsProductSlider>
      </section>

   </main>
</template>
<script setup>
import { useRecently } from '~/store/recently'
const recentlyStore = useRecently()
const route = useRoute()
let { data: info } = await useBaseFetch(`/projects/?pLevel=4&filters[slug]=${route.params.slug}`)
if (!info.length) {
   throw createError({
      statusCode: 404,
      statusMessage: 'Page Not Found'
   })
}
info = info[0]
onMounted(async () => {
   recentlyStore.add(route.params.slug)
   await recentlyStore.getProducts()
   await recentlyStore.getSameProducts()
})
useHead({
   title: info.name
})
</script>