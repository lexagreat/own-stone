<template>
   <main class="main">
      <SectionsProjectHero />
      <SectionsProjectFilters type="commerce" class="project-filters_commerce">
         варианты <span>планировок</span>
      </SectionsProjectFilters>
      <SectionsProjectChars class="project-chars_commerce">
         <h2 class="project-chars__title h1 dark-title" style="text-align: center;">Особенности <span>помещений</span>
         </h2>
      </SectionsProjectChars>
      <SectionsProjectFeatures class="project-dark project-features_commerce">
         <h2 class="project-features__title h1 light-title">преимущества</h2>
      </SectionsProjectFeatures>
      <SectionsProjectBuyWays class="buy-ways_commerce" />
      <SectionsProjectPosition />
      <SectionsProjectDocuments />
      <section class="project-sliders">
         <SectionsProductSlider>
            Ближайшие <span>объекты</span>
         </SectionsProductSlider>
      </section>
   </main>
</template>
<script setup></script>