<template>
   <section class="about-partners">
      <div class="container">
         <div class="about-partners__wrapper">
            <h2 class="h1 about-partners__title light-title">партнеры</h2>
            <ul class="about-partners__list">
               <li class="about-partners__item" @click="clickHandler(item)" v-for="item in 8" :key="item">
                  <div class="about-partners__icon">
                     <svg xmlns="http://www.w3.org/2000/svg" width="116" height="20" viewBox="0 0 116 20" fill="none">
                        <g clip-path="url(#clip0_3608_47601)">
                           <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M61.3624 0.0168264L53.8027 19.9832H57.8196L63.4371 5.14706L69.0545 19.9832H73.0714L65.5119 0.0168264H61.3624ZM83.9406 16.0732C80.6523 16.0732 77.9867 13.3399 77.9867 9.96796C77.9867 6.59598 80.6523 3.86249 83.9406 3.86249C87.229 3.86249 89.895 6.59598 89.895 9.96796C89.895 13.3399 87.229 16.0732 83.9406 16.0732ZM83.9406 0C78.5718 0 74.2195 4.4627 74.2195 9.96796C74.2195 15.473 78.5718 19.9357 83.9406 19.9357C89.3099 19.9357 93.6623 15.473 93.6623 9.96796C93.6623 4.4627 89.3099 0 83.9406 0ZM110.784 0.0168264L110.777 8.98741V19.9832H114.584L114.587 0.0168264H110.784ZM101.224 0.0168264H97.421V19.9832H101.224V11.9378H109.25L110.717 8.06219H101.224V0.0168264ZM12.8648 8.06242H4.99145L5.03259 11.9378H11.3976L12.8648 8.06242ZM7.43006 0.0320394C4.71676 0.0320394 2.26331 1.17232 0.5 3.01079L3.16386 5.74221C4.24535 4.60262 5.75689 3.89476 7.43006 3.89476C10.7186 3.89476 13.3846 6.62802 13.3846 10C13.3846 13.3718 10.7186 16.1052 7.43006 16.1052C5.75689 16.1052 4.24535 15.3971 3.16386 14.2578L0.5 16.9892C2.26331 18.8274 4.71676 19.968 7.43006 19.968C12.7991 19.968 17.1517 15.505 17.1517 10C17.1517 4.49474 12.7991 0.0320394 7.43006 0.0320394ZM32.6541 0.033653H19.0312V3.88807H23.9767V20H27.7358V3.88807H32.6541V0.033653ZM40.2138 0.0168264L32.6541 19.9832H36.6713L38.1513 16.0741H43.4625L44.9299 12.1988H39.6187L42.2887 5.14706L47.906 19.9832H51.9231L44.3632 0.0168264H40.2138Z"
                              fill="white" />
                        </g>
                        <defs>
                           <clipPath id="clip0_3608_47601">
                              <rect width="115" height="20" fill="white" transform="translate(0.5)" />
                           </clipPath>
                        </defs>
                     </svg>
                  </div>
                  <p class="about-partners__text body-text">
                     Группа «Эталон» сегодня является одной из крупнейших корпораций в сфере девелопмента
                     и строительства в России. Группа «Эталон» фокусируется на жилой недвижимости для среднего класса
                     в Москве, Московской области и Санкт-Петербурге
                  </p>
                  <button class="about-partners__btn" @click.stop="clickHandler(item, 'form')">Запросить
                     контакты</button>
               </li>
            </ul>
            <UiButton class="white" style="width: 152px;">Показать еще</UiButton>
         </div>
      </div>
      <ModalAboutPartnerInfo :isOpen="isOpenInfoModal" @closePopup="isOpenInfoModal = false"
         @openForm="isOpenInfoModal = false, isOpenFormModal = true" />
      <ModalAboutPartnerForm :isOpen="isOpenFormModal" @closePopup="isOpenFormModal = false" />
   </section>
</template>
<script setup>
const isOpenInfoModal = ref(false)
const isOpenFormModal = ref(false)
const currentPartner = ref(null)

const clickHandler = (item, type) => {
   currentPartner.value = item;
   if (type == 'form') {
      isOpenFormModal.value = true
   } else {
      isOpenInfoModal.value = true

   }
}
</script>