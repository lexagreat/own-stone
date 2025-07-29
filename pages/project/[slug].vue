<template>
   <UiLoader v-if="loader" />
   <main class="main">
      <AppProjectHead :seo="info.seo" :title="info.name" />
      <SectionsProjectHero :info="info" />
      <SectionsProjectAbout :info="info" />
      <SectionsProjectChars :info="info" class="project-chars_commerce">
         <h2 class="project-chars__title h1 dark-title">ХАРАКТЕРИСТИКИ
         </h2>
      </SectionsProjectChars :info="info">
      <SectionsProjectFeatures :info="info.advantages" v-if="info.advantages?.length">
         <h2 class="project-features__title h1 dark-title">преимущества</h2>
      </SectionsProjectFeatures>
      <SectionsProjectFilters type="build" title="квартиру" :projectSlug="info.slug" :formatted-rooms="info?.formatted_rooms"
         :count="info?.apartaments?.length">
         ТИПЫ <span>планировок</span>
      </SectionsProjectFilters>
      <SectionsProjectBuyWays :name="info?.name" />
      <SectionsProjectPosition class="commerce-position" :project="info.name"
         :image="info.detail_picture?.length ? info.detail_picture[0]?.url : ''" :info="info?.locations_map"
         v-if="info?.locations_map?.length" :projectCoords="info?.coords" />
      <SectionsProjectNearPlaces :info="info.place_nearby" v-if="info.place_nearby?.length" />

      <SectionsProjectDocuments :documents="info.documents" v-if="info.documents?.length" />
      <section class="project-sliders"
         v-if="(recentlyStore?.same.length && recentlyStore?.same.filter(item => item.slug !== route.params.slug)?.length) || (recentlyStore.products.length && recentlyStore.products?.filter(item => item.slug !== route.params.slug).length)">
         <SectionsProductSlider v-if="recentlyStore.same.filter(item => item.slug !== route.params.slug).length"
            :products="recentlyStore.same.filter(item => item.slug !== route.params.slug)">
            похожие <span>предложения</span>
         </SectionsProductSlider>
         <SectionsProductSlider v-if="recentlyStore.products.filter(item => item.slug !== route.params.slug).length"
            :category="0" :products="recentlyStore.products.filter(item => item.slug !== route.params.slug)">
            Вы ранее <span>смотрели</span>
         </SectionsProductSlider>
      </section>

   </main>
</template>
<script setup>
import { useCatalog } from '~/store/catalog'
import { useRecently } from '~/store/recently'
const recentlyStore = useRecently()
const route = useRoute()
const catalogStore = useCatalog()
catalogStore.loading = true
let info = await useBaseFetch(`/projects/?pLevel=4&filters[slug]=${route.params.slug}`)
console.log(info);
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

onMounted(async () => {
   catalogStore.loading = false
   recentlyStore.add(route.params.slug)
   await recentlyStore.getProducts()
   await recentlyStore.getSameProducts()
})
</script>