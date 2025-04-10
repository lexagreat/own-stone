<template>

   <Head>
      <Title>{{ seo?.metaTitle || (title + ' | OWN STONE') }}</Title>
      <Meta name="description" :content="seo?.metaDescription" />
      <Meta name="robots" :content="seo?.keywords" />
      <Meta name="keywords" :content="seo?.metaRobots" />
      <Meta name="og:title" :content="seo?.metaTitle" />
      <Meta name="og:description" :content="seo?.metaDescription" />
      <Meta name="og:url" v-if="seo && seo.openGraph && seo.openGraph['og:url']" :content="seo.openGraph['og:url']" />
      <Meta name="og:type" v-if="seo && seo.openGraph && seo.openGraph['og:type']"
         :content="seo?.openGraph['og:type']" />
      <Meta name="og:site_name" content="resetly.io" />
      <Meta name="og:image" v-if="seo && seo.openGraph && seo.openGraph['og:image']"
         :content="seo?.openGraph['og:image']?.url" />
      <Meta name="og:image:type" v-if="seo && seo.openGraph && seo.openGraph['og:image']"
         :content="seo?.openGraph['og:image']?.mime" />
      <Meta name="og:image:width" content="1024" />
      <Meta name="og:image:height" content="1024" />
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta property="twitter:domain" content="resetly.io" />
      <Meta property="twitter:url" v-if="seo && seo.openGraph && seo.openGraph['og:url']"
         :content="seo?.openGraph['og:url']" />
      <Meta name="twitter:title" :content="seo?.metaTitle" />
      <Meta name="twitter:description" :content="seo?.metaDescription" />
      <Meta name="twitter:image" v-if="seo && seo.openGraph && seo.openGraph['og:image']"
         :content="seo?.openGraph['og:image']?.url" />
      <Link rel="alternate" :href="seo?.canonicalURL" hreflang="ru" />
      <Link rel="canonical" :href="seo?.canonicalURL" hreflang="ru" />
   </Head>
</template>
<script setup>
const props = defineProps({
   seo: Object,
   title: String
})

useHead({
   script: [
      {
         type: 'application/ld+json',
         innerHTML: JSON.stringify(props.seo?.structuredData)
      }
   ]
});
</script>