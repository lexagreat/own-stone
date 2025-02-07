<template>
   <main class="main">
      <AppHead :seo="info.seo" />
      <SectionsPartnersHero :info="info.sell_hero" />
      <SectionsPartnersFeatures :info="info.partners_blocks" />
      <SectionsPartnersCollab :info="info.partners_collab" />
      <SectionsPartnersProcess :info="info.partners_pocess" />
      <SectionsPartnersCases :info="info.partners_case" />
      <SectionsPartnersCalculator />
      <SectionsPartnersControl :info="info.partners_control" />
   </main>
</template>
<script setup>
const { data: info } = await useBaseFetch('/partnerspage')
// console.log(info);
</script>