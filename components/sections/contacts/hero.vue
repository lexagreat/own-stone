<template>
   <section class="contacts-hero">
      <div class="container">
         <div class="contacts-hero__wrapper">
            <h1 class="contacts-hero__title h1 dark-title">Контакты</h1>
            <div class="contacts-hero__main">
               <div class="contacts-hero__row">
                  <div class="contacts-hero__info">
                     <div class="contacts-hero__image">
                        <img src="/img/contacts/hero.png" alt="">
                     </div>
                     <div class="contacts-hero__block">
                        <span class="contacts-hero__subtitle">Офлайн-пространство OWNSTONE</span>
                        <div>
                           <p class="h4">Москва,<br> Нащокинский пер., 8</p>
                           <p class="h4">ежедневно: 10:00 – 20:00</p>
                        </div>
                     </div>
                     <div class="contacts-hero__block">
                        <span class="contacts-hero__subtitle">Свяжитесь с нами</span>
                        <div>
                           <NuxtLink class="h4" to="tel:+7 (993) 338-07 07">+7 (993) 338-07 07</NuxtLink>
                           <ul>
                              <li v-for="item in media" :key="item">
                                 <NuxtLink :to="item.to" class="circle">
                                    <component :is="item.icon" />
                                 </NuxtLink>
                              </li>
                           </ul>
                        </div>
                     </div>
                  </div>
                  <div class="contacts-hero__map">
                     <MapsContacts />
                  </div>
               </div>
               <ul class="contacts-hero__list">
                  <li class="contacts-hero__item">
                     <img src="/public/img/home/taxi.png" alt="">
                     <h3 class="h3 light-title">оплатим такси до нашего офиса</h3>
                     <UiButton class="white">Вызвать машину</UiButton>
                  </li>
                  <li class="contacts-hero__item">
                     <h3 class="h3 dark-title">назначить встречу с персональным брокером</h3>
                     <UiButton class="black">Назначить встречу</UiButton>
                  </li>
                  <li class="contacts-hero__item">
                     <h3 class="h3 dark-title">Оцените качество работы наших брокеров</h3>
                     <UiButton class="black">Оставить отзыв</UiButton>
                  </li>
               </ul>
            </div>
         </div>
      </div>
   </section>
</template>
<script setup>
const media = ref([
   {
      icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/mail.svg'))),
      to: ""
   },
   {
      icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/tg.svg'))),
      to: ""
   },
   {
      icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/whatsapp.svg'))),
      to: ""
   }
])
</script>