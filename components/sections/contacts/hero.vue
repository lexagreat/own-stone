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
                           <p class="h4">
                              {{ city }}, <br> {{ address }}
                           </p>
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
                     <MapsContacts :info="info?.contacts_info?.contacts_map_coords" />
                  </div>
               </div>
               <ul class="contacts-hero__list">
                  <li class="contacts-hero__item" v-for="(item, index) in info?.contacts_hero_list" :key="item">
                     <img v-if="item?.photo?.url" :src="item?.photo?.url" alt="">
                     <h3 class="h3" :class="{ 'light-title': index == 0, 'dark-title': index !== 0 }">{{ item?.title }}
                     </h3>
                     <UiButton :class="{ white: index == 0, black: index !== 0 }" @click="onBtnClick(item.modalname)">{{
                        item?.btn_text }}</UiButton>
                  </li>
               </ul>
               <ModalMakeReview :isOpen="isReviewModalOpen" @close-popup="isReviewModalOpen = false" />
               <ModalTaxi :isOpen="isTaxiModalOpen" @close-popup="isTaxiModalOpen = false" />
               <ModalMeeteing :isOpen="isMeetingModalOpen" @close-popup="isMeetingModalOpen = false" />
            </div>
         </div>
      </div>
   </section>
</template>
<script setup>
const props = defineProps({
   info: Object
})
const isReviewModalOpen = ref(false)
const isTaxiModalOpen = ref(false)
const isMeetingModalOpen = ref(false)
const onBtnClick = (name) => {
   if (name == 'review') {
      isReviewModalOpen.value = true
   }
   if (name == 'taxi') {
      isTaxiModalOpen.value = true
   }
   if (name == 'meet') {
      isMeetingModalOpen.value = true
   }
}
const city = computed(() => {
   return props.info?.contacts_info?.address_string.split(',')[0]
})
const address = computed(() => {
   return props.info?.contacts_info?.address_string.split(',').slice(1).join('')
})
</script>


<style lang="scss">
.contacts-hero__item {
   &:last-child {
      .h3 {
         max-width: unset;
      }
   }
}
</style>