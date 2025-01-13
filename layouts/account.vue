<template lang="">
   <AppHeader />
   <main class="main account-page dark-page">
      <div class="container">
         <div class="account-page__wrapper">
            <AccountAside   :class="{active: aside.isAside}"/>
            <div class="account-page__main" :class="{hidden: aside.isAside}">
               <slot/>
            </div>
         </div>
      </div>
   </main>
   <AppFooter />
</template>
<script setup>
import { useAccount } from '~/store/account';
const aside = useAccount()

</script>

<style lang=""></style>
