<template>
   <main class="main">
      <SectionsProjectHero />
      <SectionsProjectAbout />
      <SectionsProjectChars />
      <SectionsProjectFeatures />
      <SectionsProjectFilters />
      <SectionsProjectFilters v-if="false" />
      <SectionsProjectBuyWays v-if="false" />
      <SectionsProjectPosition v-if="false" />
      <SectionsProjectNearPlaces v-if="false" />
      <SectionsProjectDocuments v-if="false" />
      <section class="project-sliders" v-if="false">
         <SectionsProductSlider>
            похожие <span>предложения</span>
         </SectionsProductSlider>
         <SectionsProductSlider>
            Вы ранее <span>смотрели</span>
         </SectionsProductSlider>
      </section>
   </main>
</template>
<script setup></script>