<template>
   <section class="partners-process">
      <div class="container">
         <div class="partners-process__wrapper">
            <h2 class="partners-process__title h1 dark-title">Процесс <span>сотрудничества</span></h2>
            <ul class="partners-process__list">
               <li class="partners-process__item" v-for="(item, index) in items" :key="index">
                  <div class="partners-process__index circle">
                     {{ index + 1 }}
                  </div>
                  <div class="partners-process__main">
                     <h3 class="partners-process__subtitle h3">{{ item.title }}</h3>
                     <p class="body-text">{{ item.text }}</p>
                  </div>
               </li>
            </ul>
         </div>
      </div>
   </section>
</template>
<script setup>
const items = ref([
   {
      title: "Заполните заявку",
      text: "Регистрация в Личном кабинете займет не более 2 минут",
   },
   {
      title: "Добавьте клиента",
      text: "В Личном кабинете добавьте информацию о вашем клиенте и отслеживайте статус",
   },
   {
      title: "Старт работы с клиентом",
      text: "Наши эксперты связываются с клиентом и уточняют потребности и задачи",
   },
   {
      title: "подбор вариантов",
      text: "Мы подбираем недвижимость, презентуем клиенту и приглашаем на показ в удобное время",
   },
   {
      title: "Сопровождение",
      text: "В процессе работы мы оказываем сопровождение сделки «под ключ»",
   },
   {
      title: "Выплата процента",
      text: "После закрытия сделки вы получите комиссию до 30%",
   },
])

</script>