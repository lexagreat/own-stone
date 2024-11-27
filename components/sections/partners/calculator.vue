<template>
   <section class="partners-calc">
      <div class="container">
         <div class="partners-calc__wrapper">
            <div class="partners-calc__header">
               <h2 class="partners-calc__title h1 light-title">рассчитать <span>комиссию</span> </h2>
               <UiButton class="white">
                  Стать партнером
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
                  <h4 class="h1 calc-card__price">2 000 000 ₽ </h4>
               </div>
               <FormPartnerCalc />
            </div>
         </div>
      </div>
   </section>
</template>
<script setup></script>