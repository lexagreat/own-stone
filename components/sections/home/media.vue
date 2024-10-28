<template>
   <section class="home-media">
      <div class="container">
         <div class="home-media__wrapper">
            <div class="home-media__visual">
               <div class="home-media__input">
                  <SearchIcon />
                  <span>{{ currentPhrase }}</span>
               </div>
               <img src="/img/home/media.png" alt="">
            </div>
            <div class="home-media__main">
               <h2 class="home-media__title h1">
                  <NuxtLink to="/" target="_blank">TELEGRAM</NuxtLink>
                  <NuxtLink to="/" target="_blank">Instargam</NuxtLink>
                  <NuxtLink to="/" target="_blank">youtube</NuxtLink>
               </h2>
               <div class="home-media__text body-text">
                  Подписывайтесь на наш Telegram. Здесь мы рассказываем о выгодных условиях приобретения недвижимости,
                  эксклюзивных лотах из закрытых продаж, беспроцентных рассрочках, аналитике и прогнозах на рынке
                  недвижимости.
               </div>
               <UiButton class="black">
                  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                     <path
                        d="M16.9882 3.83226L3.70044 8.9234C2.79361 9.28529 2.79885 9.78718 3.53406 10.0121L6.94557 11.0695L14.8388 6.1213C15.212 5.89567 15.553 6.01705 15.2727 6.26427L8.87766 11.998H8.87541L8.87691 11.9995L8.64158 15.4934C8.98633 15.4934 9.13846 15.3363 9.33107 15.1509L10.9889 13.5499L14.4356 16.0794C15.0711 16.4272 15.5275 16.2485 15.6857 15.4949L17.9483 4.90008C18.1799 3.97672 17.5938 3.55972 16.9875 3.83226H16.9882Z"
                        fill="white" />
                  </svg>
                  <span>Читать Telegram</span>
               </UiButton>
            </div>
         </div>
      </div>
   </section>
</template>
<script setup>
import SearchIcon from "@/assets/img/icons/search.svg"


const searchPhrases = ref([
   "Какие квартиры будут расти в цене?",
   "Что будет происходить на рынке?",
   "Еще рандомный текст"
])
const currentPhrase = ref("")
let indexPhrase = ref(0);
const animateTestWriting = () => {
   currentPhrase.value = ""
   let indexChar = 0;
   let timer = setInterval(() => {
      if (searchPhrases.value[indexPhrase.value].length - 1 == indexChar) {
         clearInterval(timer)
         setTimeout(() => {
            if (indexPhrase.value + 1 == searchPhrases.value.length) {
               indexPhrase.value = 0;
               animateTestWriting()
               return
            }
            indexPhrase.value++
            animateTestWriting()
            return
         }, 1000)
      }
      currentPhrase.value += searchPhrases.value[indexPhrase.value][indexChar]
      indexChar++;
   }, 100)
}
onMounted(() => {
   animateTestWriting()
})
</script>