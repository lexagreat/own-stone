<template>
   <div class="account-page__header">
      <UiSliderBtn prev class="account-page__back" white @click="aside.openAside" />
      <slot />
   </div>
</template>
<script setup>
import { useAside } from '~/store/account';
const aside = useAside()

</script>