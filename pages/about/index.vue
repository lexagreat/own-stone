<template>
   <main class="main">
      <AppHead :seo="info.seo" />

      <SectionsAboutHero :text="info.about_hero_text" />
      <SectionsAboutVideo v-if="info?.about_video?.url?.length" :video="info.about_video.url" />
      <SectionsAboutMission :title="info.about_mission_title" :items="info.home_features" />
      <SectionsAboutValue :info="info.about_value" />
      <SectionsHomeBosses :info="info.about_bosses" />
      <SectionsAboutRewards :info="info.about_rewards.rewards_section" />
      <SectionsAboutEvents :items="info.about_events" />
      <!-- <SectionsAboutPartners /> -->
      <SectionsHomeOffice :info="info.about_office.home_office" />
      <SectionsAboutOffice />
   </main>
</template>
<script setup>
const { data: info } = await useBaseFetch('/aboutpage')
// useHead({
//    title: 'О компании'
// })
</script>