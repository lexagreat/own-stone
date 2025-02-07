<template>
   <main class="main">
      <SectionsHomeHero :text="info.hero_text" :running="info.running_line" />
      <SectionsHomeParallax :info="info.paralax_media" />
      <SectionsHomeSelection />
      <SectionsHomeConductor :info="info.home_conductor" />
      <SectionsHomeDownload :info="info.home_download" />
      <SectionsHomeFeatures :info="info.home_features" />
      <SectionsHomeBosses :info="info.bosses_section" />
      <SectionsHomeTeam :team="info.home_team" />
      <SectionsHomeRewards :info="info.rewards_section" />
      <SectionsHomeOffice :info="info.home_office" />
      <SectionsHomeMedia :info="info.home_media" />
      <SectionsHomeReviews :info="info.home_reviews" />
      <BannersHomeSubscribe :info="info.home_subscribe" />
      <SectionsHomePartners :info="info.home_partners" />
      <SectionsHomeTaxi :info="info.home_taxi" />
      <SectionsForm :info="info.home_form_section" />
   </main>
</template>
<script setup>
const { data: info } = await useBaseFetch("/mainpage?pLevel=5")
// console.log(info);
</script>