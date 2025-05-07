<template>
   <div v-if="showBanner" class="cookie-modal">
      <p class="cookie-modal__text">
         Наш сайт использует cookie-файлы в соответствии с 
         <a href="/policy" target="_blank">политикой в отношении обработки персональных данных</a>
      </p>
      <UiButton @click="acceptCookies" class="black">Принять</UiButton>
      <button @click="acceptCookies" class="circle">
         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
               d="M7.63823 15C7.50778 15 7.38164 14.9746 7.25978 14.9237C7.13793 14.8737 7.01999 14.7897 6.90594 14.6719L2.78057 10.409C2.58529 10.2072 2.49195 9.9509 2.50054 9.64015C2.50835 9.32859 2.6099 9.07192 2.80517 8.87013C3.00045 8.66834 3.24454 8.56745 3.53745 8.56745C3.83037 8.56745 4.07446 8.66834 4.26973 8.87013L7.68744 12.4018L15.7671 4.05268C15.9624 3.85089 16.2022 3.75 16.4865 3.75C16.7716 3.75 17.0118 3.85089 17.2071 4.05268C17.4024 4.25447 17.5 4.50266 17.5 4.79727C17.5 5.09107 17.4024 5.33887 17.2071 5.54065L8.37051 14.6719C8.25647 14.7897 8.13852 14.8737 8.01667 14.9237C7.89482 14.9746 7.76867 15 7.63823 15Z"
               fill="white" />
         </svg>
      </button>
   </div>

</template>
<script setup>
const showBanner = ref(false)
const acceptCookies = () => {
   // Устанавливаем флаг в localStorage
   localStorage.setItem('cookiesAccepted', 'true');
   showBanner.value = false; // Скрываем баннер
}
onMounted(() => {
   // Проверяем, принял ли пользователь куки
   const cookiesAccepted = localStorage.getItem('cookiesAccepted');
   if (!cookiesAccepted) {
      showBanner.value = true; // Показываем баннер, если куки не приняты
   }
})
</script>