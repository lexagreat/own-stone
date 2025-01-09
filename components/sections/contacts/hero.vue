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
                           <p class="h4" v-html="info?.contacts_info.address_string"></p>
                           <p class="h4" v-html="info?.contacts_info.worktime"></p>
                        </div>
                     </div>
                     <div class="contacts-hero__block">
                        <span class="contacts-hero__subtitle">Свяжитесь с нами</span>
                        <div>
                           <NuxtLink class="h4" :to="'tel:' + info?.contacts_info?.phonenumber">
                              {{ info?.contacts_info?.phonenumber }}
                           </NuxtLink>
                           <ul>
                              <li v-for="item in info?.contacts_info?.contacts_info_links" :key="item">
                                 <NuxtLink target="_blank" :to="item?.href_attr" class="circle">
                                    <img :src="item?.icon?.url" alt="" style="width: 16px;">
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
                  <li class="contacts-hero__item" v-for="(item, index) in info?.contacts_hero_list" :key="item">
                     <img v-if="item?.photo?.url" :src="item?.photo?.url" alt="">
                     <h3 class="h3" :class="{ 'light-title': index == 0, 'dark-title': index !== 0 }">{{ item?.title }}
                     </h3>
                     <UiButton :class="{ white: index == 0, black: index !== 0 }">{{ item?.btn_text }}</UiButton>
                  </li>
                  <!-- <li class="contacts-hero__item">
                     <h3 class="h3 dark-title">назначить встречу с персональным брокером</h3>
                     <UiButton class="black">Назначить встречу</UiButton>
                  </li>
                  <li class="contacts-hero__item">
                     <h3 class="h3 dark-title">Оцените качество работы наших брокеров</h3>
                     <UiButton class="black">Оставить отзыв</UiButton>
                  </li> -->
               </ul>
            </div>
         </div>
      </div>
   </section>
</template>
<script setup>
const props = defineProps({
   info: Object
})
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