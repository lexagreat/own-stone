<template>
   <main class="main">
      <SectionsAboutHero :text="info.about_hero_text" />
      <SectionsAboutVideo :video="info.about_video.url" />
      <SectionsAboutMission :title="info.about_mission_title" :items="info.home_features" />
      <SectionsAboutValue :info="info.about_value" />
      <SectionsHomeBosses :info="info.about_bosses" />
      <SectionsAboutRewards :info="info.about_rewards.rewards_section" />
      <SectionsAboutEvents :items="info.about_events" />
      <SectionsHomeOffice :info="info.about_office.home_office" />
      <SectionsAboutOffice />
   </main>
</template>
<script setup>
const { data: info } = await useBaseFetch('/aboutpage')
</script>