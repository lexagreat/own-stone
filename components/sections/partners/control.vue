<template>
   <section class="sell-coop partners-control">
      <div class="container">
         <div class="sell-coop__wrapper">
            <div class="sell-coop__main">
               <h2 class="sell-coop__title h1 dark-title">Контролируйте статус<br> <span>сделки в личном кабинете</span>
               </h2>
               <p class="body-text">Ни одна сделка не пройдет мимо Вас. Вы сможете контролировать все онлайн и быть в
                  курсе каждого этапа. В личном кабинете доступны информация по клиентам, полезная информация и статусы
                  сделки. Начните зарабатывать больше с партнерской программой OWNSTONE.</p>
               <NuxtLink to="/profile" class="btn black">Войти в личный кабинет</NuxtLink>
            </div>
            <div class="sell-coop__visual">
               <div class="sell-coop__input">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                     <path
                        d="M10.0795 18.4818C5.67113 18.4818 2.09766 14.9083 2.09766 10.4999C2.09766 6.09155 5.67113 2.51807 10.0795 2.51807C14.4879 2.51807 18.0614 6.09155 18.0614 10.4999C18.0614 14.9083 14.4879 18.4818 10.0795 18.4818ZM9.14113 13.5501C9.21988 13.6288 9.34756 13.6288 9.42631 13.5501L14.7843 8.19128C14.8631 8.11253 14.8631 7.98487 14.7843 7.90612L13.9409 7.06266C13.8621 6.98391 13.7344 6.98391 13.6557 7.06267L9.42631 11.2928C9.34756 11.3715 9.21988 11.3716 9.14113 11.2928L7.16824 9.31992C7.08949 9.24117 6.96182 9.24117 6.88307 9.31992L6.03961 10.1634C5.96086 10.2421 5.96086 10.3698 6.03961 10.4486L9.14113 13.5501Z"
                        fill="#181818" />
                  </svg>
                  <span>{{ phrases[currentIndex] }}</span>
               </div>
               <div class="sell-coop__image">
                  <img src="/public/img/sell/coop-tel.png" alt="">
               </div>
            </div>
         </div>
      </div>
   </section>
</template>
<script setup>
const phrases = ref([
   "Статус работы по сделке",
   "Оптимальная стратегия",
   "фраза номер 3",
])
const currentIndex = ref(0)
const animatePhrases = () => {
   setInterval(() => {
      if (currentIndex.value + 1 == phrases.value.length) {
         currentIndex.value = 0
      } else {
         currentIndex.value++
      }
   }, 1500)
}
onMounted(() => {
   animatePhrases()

})
</script>