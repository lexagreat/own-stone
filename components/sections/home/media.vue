<template>
   <section class="home-media">
      <div class="container">
         <div class="home-media__wrapper">
            <div class="home-media__visual">
               <div class="home-media__input">
                  <SearchIcon />
                  <span>{{ currentPhrase }}</span>
               </div>
               <img :src="current?.pucture?.url" alt="">
            </div>
            <div class="home-media__main">
               <h2 class="home-media__title h1">
                  <label v-for="item in info" :key="item">
                     <input type="radio" name="home-media__radios" :value="item" v-model='current'>
                     <span>{{ item.title }}</span>
                  </label>
               </h2>
               <div class="home-media__text body-text">
                  {{ current.text }}
               </div>
               <NuxtLink style="width: fit-content;" :to="current.button_link" target="_blank" class="btn black">
                  <img :src="current.button_ico[0].url" alt="">
                  <span>{{ current.button_text }}</span>
               </NuxtLink>
            </div>
         </div>
      </div>
   </section>
</template>
<script setup>
import SearchIcon from "@/assets/img/icons/search.svg"
const props = defineProps({
   info: Object
})
const current = ref(props.info[0])

const searchPhrases = computed(() => {
   return current.value.home_media_text_list.map(item => item.title);
});

const currentPhrase = ref(""); // Текущая строка
let indexPhrase = ref(0); // Индекс текущей фразы
let timer = null; // Таймер для анимации
let isAnimating = false; // Флаг, чтобы предотвратить множественные анимации

const clearAnimation = () => {
   if (timer) {
      clearInterval(timer); // Очищаем текущий таймер
      timer = null;
   }
   isAnimating = false; // Сбрасываем флаг анимации
};

const animateTextWriting = (charIndex = 0) => {
   clearAnimation(); // Убираем предыдущие анимации, если они остались
   isAnimating = true; // Устанавливаем флаг

   currentPhrase.value = ""; // Сбрасываем текущую строку
   let currentCharIndex = charIndex; // Индекс текущего символа
   const phrase = searchPhrases.value[indexPhrase.value]; // Текущая строка

   timer = setInterval(() => {
      if (currentCharIndex >= phrase.length) {
         clearAnimation(); // Очищаем таймер
         setTimeout(() => {
            // Переход к следующей фразе
            indexPhrase.value = (indexPhrase.value + 1) % searchPhrases.value.length;
            animateTextWriting(); // Запускаем анимацию для следующей строки
         }, 1000); // Задержка между фразами
         return;
      }
      currentPhrase.value += phrase[currentCharIndex]; // Добавляем следующий символ
      currentCharIndex++;
   }, 100); // Скорость добавления символов
};

onMounted(() => {
   animateTextWriting(); // Запуск анимации при монтировании
});

watch(current, () => {
   clearAnimation(); // Очищаем предыдущую анимацию
   currentPhrase.value = ""; // Сбрасываем текущую строку
   indexPhrase.value = 0; // Сбрасываем индекс строки
   setTimeout(() => {
      animateTextWriting(); // Перезапускаем анимацию
   }, 300)
});

onUnmounted(() => {
   clearAnimation(); // Убираем таймер при размонтировании компонента
});
</script>