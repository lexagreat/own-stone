<template>
   <section class="home-conductor" style="margin-bottom: 100px;">
      <div class="container">
         <div class="home-conductor__wrapper">
            <h2 class="home-conductor__title h1 dark-title pc" v-html="info.title"></h2>
            <h2 class="home-conductor__title h1 dark-title mobile" v-html="info.title_mobile"></h2>
            <ul class="home-conductor__filters" style="display: flex;">
               <li v-for="(item, index) in types" :key="index">
                  <input v-model="type" type="radio" :value="item.name" :id="'conductorRadio' + item.value"
                     name="conductorRadio">
                  <label :for="'conductorRadio' + item.value">
                     <component :is="item.icon" />
                     <span>{{ item.name }}</span>
                  </label>
               </li>
            </ul>

            <div class="home-conductor__forms scrollbar-none" v-if="type == 'Коммерческая'">
               <div class="home-conductor__form conductor-form" v-for="(item, index) in items" :key="index"
                  :class="{ dark: index == 1 }">
                  <div class="conductor-form__main">
                     <div class="conductor-form__title h2">{{ item.title }}</div>
                     <div class="conductor-form__desc body-text" v-html="item.text"></div>
                     <UiButton @click="isMeeting = true" :class="{ black: index == 0, white: index == 1 }">Оставить
                        заявку</UiButton>
                  </div>
                  <div class=" conductor-form__image">
                     <img :src="item.image" alt="">
                  </div>
               </div>
            </div>
            <div class="home-conductor__slider" v-else>
               <Swiper :pagination="{
                  type: 'progressbar',
               }" :modules="modules" :mousewheel="{ enabled: true, forceToAxis: true }" :space-between="10"
                  slides-per-view="auto" :speed="500">
                  <SwiperSlide v-for="item in filtered" :key="item">
                     <NuxtLink :to="item?.url" class="home-conductor__slide">
                        <div>
                           <ul class="home-conductor__banners" v-if="item.labels">
                              <li v-for="banner in item.labels.split(',')">{{ banner }}</li>
                           </ul>
                        </div>
                        <img :src="item?.picture?.url" alt="">
                        <h3 class="home-conductor__subtitle h3">{{ item.title }}</h3>
                     </NuxtLink>
                  </SwiperSlide>
               </Swiper>
            </div>
            <ModalMeeteing :isOpen="isMeeting" @closePopup="isMeeting = false" />
         </div>
      </div>
   </section>
</template>
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Mousewheel } from 'swiper/modules';
const props = defineProps({
   info: Object
})
const modules = ref([Pagination, Mousewheel])
const types = ref([
   {
      name: 'Новостройки',
      value: 0,
      icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/new-buildings.svg'))),
   },
   {
      name: 'Вторичная',
      value: 1,
      icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/secondary-housing.svg'))),
   },
   {
      name: 'Коммерческая',
      value: 2,
      icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/commercial.svg'))),
   },
])
const type = ref('Новостройки')

const filtered = computed(() => {
   return props.info?.home_conductor_elements?.filter(item => item.type == type.value) || [];
});

const items = ref([
   {
      title: "РИТЕЙЛ",
      text: "Если Вам нужна помощь в выборе объекта - оставьте заявку и мы с Вами свяжемся в ближайшее время",
      image: "/img/home/conductor-form1-new.png"
   },
   {
      title: "Офисы",
      text: "Если Вам нужна помощь в выборе объекта - оставьте заявку и мы с Вами свяжемся в ближайшее время",
      image: "/img/home/conductor-form2-new.png"
   },
])
const isMeeting = ref(false)
</script>


<style lang="scss" scoped>
.mobile {
   display: none;

   @media(max-width: 568px) {
      display: block;
   }
}

.pc {
   display: block;

   @media(max-width: 568px) {
      display: none;
   }
}
</style>