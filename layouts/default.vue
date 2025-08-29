<template lang="">
  <UiLoader v-if="catalogStore.loading" />
  <app-header />
  <slot />
  <UiConsultIcon />
  <modal-secondary-card
    :isOpen="catalogStore.isOpenSecondaryModal"
    @close="catalogStore.isOpenSecondaryModal = false"
    :info="catalogStore.secondaryModalInfo"
  />
  <app-footer />
</template>
<script setup>
import { useCatalog } from '~/store/catalog';

const catalogStore = useCatalog();
</script>

<style lang="scss"></style>
