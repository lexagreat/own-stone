<template>
   <section class="project-hero">
      <Swiper :modules="[Pagination, Autoplay]" :pagination="{ el: pagination }" :slides-per-view="1" :autoplay="{
         delay: 1500,
         enadled: true
      }" :speed="700">
         <SwiperSlide v-for="item in info.detail_picture" :key="item">
            <img :src="item.url" alt="">
         </SwiperSlide>
      </Swiper>
      <div class="container">
         <div class="project-hero__wrapper">
            <div class="project-hero__header">
               <SectionsBreadcrumbs :path="path" />
               <button class="circle project-hero__like" @click="onLike" :class="{ active: liked }">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                     <path
                        d="M13.4322 6.10547L14.0054 6.61277L14.5741 6.1004C15.7151 5.07232 17.207 4.52108 18.7423 4.56027C20.2777 4.59946 21.7395 5.2261 22.8266 6.31105C23.9136 7.39599 24.5431 8.8566 24.5853 10.3919C24.6273 11.9198 24.0844 13.4058 23.068 14.5467L14.0004 23.6271L4.93707 14.5494C3.93732 13.4064 3.40779 11.9266 3.45585 10.4081C3.50419 8.88122 4.13299 7.43019 5.21409 6.35081C6.29519 5.27143 7.74722 4.64495 9.27422 4.59904C10.8006 4.55316 12.2878 5.0926 13.4322 6.10547Z"
                        stroke="white" stroke-width="1.71429" />
                  </svg>
               </button>
            </div>
            <div class="project-hero__main">
               <ul class="project-hero__banners">
                  <li>ID {{ info.id }}</li>
               </ul>
               <h1 class="project-hero__title h1 light-title">{{ info.name }} <span>в хамовниках</span></h1>
               <UiButton class="white" @click="isOpenFormModal = true">Оставить заявку</UiButton>
            </div>
            <div class="project-hero__footer">
               <ul class="project-hero__banners">
                  <li>{{ info.date_complete }}</li>
                  <li>
                     <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
                        <path
                           d="M6 1.25C3.93 1.25 2.25 2.762 2.25 4.625C2.25 7.625 6 11.75 6 11.75C6 11.75 9.75 7.625 9.75 4.625C9.75 2.762 8.07 1.25 6 1.25ZM6 6.5C5.80075 6.50364 5.60276 6.46754 5.41762 6.3938C5.23247 6.32006 5.06388 6.21017 4.92168 6.07055C4.77948 5.93092 4.66653 5.76436 4.58943 5.58059C4.51233 5.39683 4.47262 5.19954 4.47262 5.00025C4.47262 4.80096 4.51233 4.60367 4.58943 4.41991C4.66653 4.23614 4.77948 4.06958 4.92168 3.92995C5.06388 3.79033 5.23247 3.68044 5.41762 3.6067C5.60276 3.53296 5.80075 3.49686 6 3.5005C6.39302 3.50768 6.76751 3.66884 7.04291 3.94932C7.31832 4.22979 7.47262 4.60717 7.47262 5.00025C7.47262 5.39333 7.31832 5.77071 7.04291 6.05118C6.76751 6.33166 6.39302 6.49282 6 6.5Z"
                           fill="white" />
                     </svg>
                     {{ info.address_short }}
                  </li>
                  <li v-if="info.metro_nearby[0]">
                     <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <rect x="2" y="2" width="8" height="8" rx="4" :fill="info.metro_nearby[0]?.color" />
                     </svg>
                     {{ info.metro_nearby[0]?.name }}, {{ info.metro_nearby[0]?.time }} мин
                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
                        <path
                           d="M4.00505 5.94432L5.87505 4.58632C6.08505 4.43232 6.34005 4.35432 6.60005 4.36232C6.91702 4.37078 7.22354 4.47752 7.47721 4.66777C7.73088 4.85802 7.91917 5.12239 8.01605 5.42432C8.12405 5.76432 8.22305 5.99432 8.31305 6.11432C8.5844 6.47645 8.93648 6.77031 9.3413 6.97255C9.57141 7.08751 9.81496 7.17106 10.0654 7.22167C10.3812 7.28547 10.645 7.54064 10.645 7.86276C10.645 8.18453 10.383 8.44969 10.0644 8.40403C9.6634 8.34653 9.27207 8.22946 8.90365 8.05578C8.35904 7.79904 7.878 7.42493 7.49505 6.96032L7.08805 9.26732L8.28905 10.2763L9.38636 13.2907C9.49663 13.5937 9.3404 13.9287 9.03743 14.0389C8.73455 14.149 8.39971 13.9928 8.2895 13.69L7.29905 10.9683L5.32205 9.30932C5.16013 9.17811 5.0362 9.00604 4.96307 8.8109C4.88993 8.61575 4.87025 8.40462 4.90605 8.19932L5.20305 6.51632L4.80805 6.80332L3.91008 8.03919C3.72063 8.29993 3.35567 8.35771 3.09495 8.16824C2.8343 7.97883 2.77649 7.61401 2.96581 7.3533L3.99405 5.93732L4.00505 5.94432ZM7.43705 4.07032C7.28099 4.07489 7.1256 4.04809 6.98007 3.99153C6.83455 3.93496 6.70186 3.84977 6.58986 3.741C6.47786 3.63223 6.38882 3.50209 6.32802 3.35829C6.26722 3.21448 6.23589 3.05994 6.23589 2.90382C6.23589 2.74769 6.26722 2.59315 6.32802 2.44935C6.38882 2.30554 6.47786 2.1754 6.58986 2.06663C6.70186 1.95786 6.83455 1.87267 6.98007 1.8161C7.1256 1.75954 7.28099 1.73275 7.43705 1.73732C7.74051 1.7462 8.02856 1.873 8.24007 2.09079C8.45158 2.30858 8.56989 2.60022 8.56989 2.90382C8.56989 3.20741 8.45158 3.49905 8.24007 3.71684C8.02856 3.93464 7.74051 4.06143 7.43705 4.07032ZM5.70305 11.7603L4.14962 13.6105C3.97255 13.8214 3.65807 13.8489 3.4471 13.6719C3.16433 13.4347 3.12747 13.0131 3.36478 12.7304L4.67105 11.1743L4.96307 8.8109L6.00807 9.6859L5.70305 11.7603Z"
                           fill="white" />
                     </svg>
                  </li>
                  <li>квартиры от {{ formatPrice(apartamentsMinPrice) }}</li>
               </ul>
               <div class="project-hero__pagination" ref="pagination"></div>
            </div>
         </div>
      </div>
      <ModalProjectDetailForm :isOpen="isOpenFormModal" @closePopup="isOpenFormModal = false"
         :project-name="info.name" />
   </section>
</template>
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Autoplay } from 'swiper/modules';
import { useFavorites } from '~/store/favorites';
const favorites = useFavorites()
const props = defineProps({
   info: Object
})
const path = ref([
   {
      name: "Главная",
      to: "/"
   },
   {
      name: "Купить",
      to: "/catalog/build"
   },
   {
      name: props.info.name,
      to: ""
   },
])
const pagination = ref(null)

const apartamentsMinPrice = computed(() => {
   return Math.min(...props.info.apartaments.map((item) => +item.cost_total))
})

const onLike = () => {
   favorites.toggle(props.info)
}
const liked = computed(() => {
   return favorites.isContains(props.info?.slug, favorites.build.projects) || favorites.isContains(props.info?.slug, favorites.commerce.projects);
})
const isOpenFormModal = ref(false)
</script>