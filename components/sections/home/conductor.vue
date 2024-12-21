<template>
   <section class="home-conductor" style="margin-bottom: 100px;">
      <div class="container">
         <div class="home-conductor__wrapper">
            <h2 class="home-conductor__title h1">
               ваш проводник к идеальному <br><span>выбору недвижимости</span>
            </h2>
            <ul class="home-conductor__filters" style="display: flex;">
               <li v-for="(item, index) in types" :key="index">
                  <input v-model="type" type="radio" :value="item.value" :id="'conductorRadio' + item.value"
                     name="conductorRadio">
                  <label :for="'conductorRadio' + item.value">
                     <component :is="item.icon" />
                     <span>{{ item.name }}</span>
                  </label>
               </li>
            </ul>
            <div class="home-conductor__slider">
               <Swiper :pagination="{
                  type: 'progressbar',
               }" :modules="modules" :space-between="10" slides-per-view="auto" :speed="500">
                  <SwiperSlide v-for="item in items" :key="item" class="home-conductor__slide">
                     <ul class="home-conductor__banners">
                        <li v-for="banner in item.banners">{{ banner }}</li>
                     </ul>
                     <img :src="item.image" alt="">
                     <h3 class="home-conductor__subtitle h3">{{ item.title }}</h3>
                  </SwiperSlide>
                  <SwiperSlide v-for="item in items" :key="item" class="home-conductor__slide">
                     <ul class="home-conductor__banners">
                        <li v-for="banner in item.banners">{{ banner }}</li>
                     </ul>
                     <img :src="item.image" alt="">
                     <h3 class="home-conductor__subtitle h3">{{ item.title }}</h3>
                  </SwiperSlide>
               </Swiper>
            </div>
         </div>
      </div>
   </section>
</template>
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
const modules = ref([Pagination])
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
      name: 'Коммерция ',
      value: 2,
      icon: markRaw(defineAsyncComponent(() => import('@/assets/img/icons/commercial.svg'))),
   },
])
const type = ref()


const items = ref([
   {
      // image: require('@/assets/img/home/conductor0.png'),
      image: '/img/home/conductor0.png',
      title: "Квартиры в Хамовниках",
      banners: []
   },
   {
      // image: require('@/assets/img/home/conductor1.png'),
      image: '/img/home/conductor3.png',
      title: "Квартиры в ЗАО",
      banners: [
         "NEW"
      ]
   },
   {
      // image: require('@/assets/img/home/conductor3.png'),
      image: '/img/home/conductor0.png',
      title: "Квартиры в САО",
      banners: []
   },
   {
      // image: require('@/assets/img/home/conductor4.png'),
      image: '/img/home/conductor3.png',
      title: "Квартиры в ЦАО",
      banners: [
         "РАССРОЧКА 0%"
      ]
   },
])

</script>