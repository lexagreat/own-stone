<template>
   <section class="form-section">
      <div class="form-section__wrapper">
         <div class="form-section__main">
            <div class="form-section__header">
               <h2 class="form-section__title h1">
                  Будем рады видеть <br> <span>вас в нашем офисе</span>
               </h2>

            </div>
            <div class="about-office__content">
               <div class="about-office__address">
                  <p class="h4">Москва, <br> Нащокинский пер., 8</p>
                  <span class="body-text">ежедневно: 10:00 – 20:00</span>
               </div>
               <div class="about-office__taxi">
                  <span class="h4">Оплатим такси до нашего офиса</span>
                  <UiButton class="black" style="width: fit-content;">
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                           d="M17.5006 10.9143V17.1643C17.5006 17.3854 17.4215 17.5976 17.2808 17.754C17.14 17.9104 16.9491 17.9983 16.75 17.9983H15.9994C15.8006 17.9977 15.6102 17.9096 15.4698 17.7533C15.3294 17.5969 15.2506 17.3851 15.2506 17.1643V16.3303H4.7494V17.1643C4.7494 17.3851 4.67057 17.5969 4.53019 17.7533C4.38982 17.9096 4.19936 17.9977 4.0006 17.9983H3.25C3.05093 17.9983 2.86001 17.9104 2.71925 17.754C2.57848 17.5976 2.4994 17.3854 2.4994 17.1643V10.9143L1.567 10.6543C1.4061 10.6081 1.26337 10.5043 1.16088 10.359C1.05839 10.2137 1.00185 10.0349 1 9.85025L1 9.25025C1.00047 9.1399 1.04001 9.03418 1.11007 8.95596C1.18013 8.87774 1.27508 8.8333 1.3744 8.83225H2.782L4.384 4.08025C4.49067 3.7624 4.68242 3.4885 4.93344 3.29541C5.18446 3.10231 5.4827 2.99931 5.788 3.00025H14.212C14.5173 2.99931 14.8155 3.10231 15.0666 3.29541C15.3176 3.4885 15.5093 3.7624 15.616 4.08025L17.218 8.83225H18.6256C18.7249 8.8333 18.8199 8.87774 18.8899 8.95596C18.96 9.03418 18.9995 9.1399 19 9.25025V9.85025C18.9989 10.0356 18.9428 10.2153 18.8402 10.3614C18.7377 10.5076 18.5945 10.6119 18.433 10.6583L17.5006 10.9143ZM4.0006 12.1643V13.8303C4.0006 14.0511 4.07943 14.2629 4.21981 14.4193C4.36018 14.5756 4.55064 14.6637 4.7494 14.6643H7.183C7.24801 14.6646 7.31199 14.6462 7.36863 14.6107C7.42528 14.5753 7.47265 14.5241 7.50607 14.4621C7.53949 14.4002 7.55781 14.3296 7.55924 14.2574C7.56067 14.1852 7.54514 14.1138 7.5142 14.0503C6.9094 12.7929 5.7382 12.1643 4.0006 12.1643ZM15.9994 12.1643C14.2618 12.1643 13.0906 12.7929 12.4858 14.0503C12.4549 14.1138 12.4393 14.1852 12.4408 14.2574C12.4422 14.3296 12.4605 14.4002 12.4939 14.4621C12.5274 14.5241 12.5747 14.5753 12.6314 14.6107C12.688 14.6462 12.752 14.6646 12.817 14.6643H15.2506C15.4494 14.6637 15.6398 14.5756 15.7802 14.4193C15.9206 14.2629 15.9994 14.0511 15.9994 13.8303V12.1643ZM5.5 4.66425L4.33 8.56825C4.29272 8.69342 4.28268 8.82663 4.30071 8.95694C4.31873 9.08726 4.36431 9.21097 4.43369 9.31792C4.50308 9.42488 4.5943 9.51203 4.69986 9.57223C4.80543 9.63243 4.92234 9.66397 5.041 9.66425H14.959C15.0777 9.66397 15.1946 9.63243 15.3001 9.57223C15.4057 9.51203 15.4969 9.42488 15.5663 9.31792C15.6357 9.21097 15.6813 9.08726 15.6993 8.95694C15.7173 8.82663 15.7073 8.69342 15.67 8.56825L14.5 4.66425H5.5Z"
                           fill="white" />
                     </svg>
                     <span>Вызвать машину</span>
                  </UiButton>
               </div>
            </div>
         </div>
         <div class="form-section__map">
            <MapsOffice />
         </div>
      </div>
   </section>
</template>
<script setup>
</script>



<style lang="scss" scoped>
.form-section__header {
   max-width: unset;
   text-align: left;
}

.form-section__main {
   gap: 275px;
   align-items: flex-start;
   padding-right: 40px;
   padding-left: calc((100vw - 1360px) / 2);

   @media(max-width: 1400px) {
      padding-left: var(--containerPadding);
   }

   @media(max-width: 1024px) {
      gap: 70px;
      padding: 70px 40px;
   }

   @media(max-width: 568px) {
      gap: 24px;
      padding: 40px var(--containerPadding);
   }
}

.about-office {
   &__content {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(2, 1fr);

      @media(max-width: 568px) {
         grid-template-columns: 1fr;
         gap: 40px;
      }
   }

   &__address {
      padding-right: 44px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      border-right: 1px solid rgba(24, 24, 24, 0.15);

      p {
         color: #181818;
      }

      span {
         color: rgba(24, 24, 24, 0.50);
      }

      @media(max-width: 568px) {
         border: 0;
         padding-right: 0;
         gap: 0;
      }
   }

   &__taxi {
      display: flex;
      flex-direction: column;
      gap: 25px;
      padding-left: 44px;

      @media(max-width: 568px) {
         padding-left: 0;
         gap: 15px;
      }
   }
}
</style>