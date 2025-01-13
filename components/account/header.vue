<template>
   <div class="account-page__header">
      <UiSliderBtn prev class="account-page__back" white @click="goToAside" />
      <slot />
   </div>
</template>
<script setup>
import { useAccount } from '~/store/account';
const router = useRouter()
const aside = useAccount()

const goToAside = () => {
   aside.openAside()
   router.push('/account/aside')
}
</script>