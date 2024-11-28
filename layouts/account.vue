<template lang="">
   <AppHeader />
   <main class="main account-page dark-page">
      <div class="container">
         <div class="account-page__wrapper">
            <AccountAside :class="{active: aside.isAside}" />
            <div class="account-page__main" :class="{hidden: aside.isAside}">
               <slot v-if="!aside.isAside"/>

            </div>
         </div>
      </div>
   </main>
   <AppFooter />
</template>
<script setup>
import { useAside } from '~/store/account';
const aside = useAside()

</script>

<style lang=""></style>
