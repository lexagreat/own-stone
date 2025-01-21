<template>
   <section class="partners-calc">
      <div class="container">
         <div class="partners-calc__wrapper">
            <div class="partners-calc__header">
               <h2 class="partners-calc__title h1 light-title">рассчитать <span>комиссию</span> </h2>
               <NuxtLink class="btn white" to="/account" v-if="account.user?.phonenumber">Стать партнером
               </NuxtLink>
               <UiButton class="white" @click="isOpenAuthModal = true" v-else>Стать партнером
               </UiButton>
            </div>
            <div class="partners-calc__main">
               <div class="partners-calc__card calc-card">
                  <div class="calc-card__header">
                     <div class="calc-card__image circle">
                        %
                     </div>
                     <div class="calc-card__info">
                        <h4 class="h4">Ваша комиссия</h4>
                        <span class="body-text">Расчет предварительный</span>
                     </div>
                  </div>
                  <h4 class="h1 calc-card__price">{{ formatPrice(comission) }} </h4>
               </div>
               <FormPartnerCalc v-model="price" />
            </div>
         </div>
         <ModalAuthCollection :isOpen="isOpenAuthModal" @close="isOpenAuthModal = false"
            @open="isOpenAuthModal = true" />
      </div>
   </section>
</template>
<script setup>
import { useAccount } from '~/store/account';
const price = ref(5000000)
const isOpenAuthModal = ref(false)
const account = useAccount()

const comission = computed(() => {
   return ((price.value * 0.03) * 0.94) * 0.2
})
</script>