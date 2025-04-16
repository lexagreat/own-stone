<template lang="">
   <UiLoader v-if="catalogStore.loading" />
   <app-header />
      <slot />
   <app-footer />
</template>
<script setup>
import { useCatalog } from "~/store/catalog";

const catalogStore = useCatalog()
</script>

<style lang="scss"></style>
