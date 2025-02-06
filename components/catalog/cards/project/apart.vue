<template>
   <div class="catalog-card with-hover apart" :class="{ 'project-card': type == 'row', loading: loading }">
      <div class="catalog-card__gallery">
         <ul>
            <li v-for="(item, index) in photos" :key="index" @mouseenter="onMouseenter(index)"></li>
         </ul>
         <Swiper @swiper="onSwiper" :spaceBetween="8" :modules="[Pagination]" :pagination="true">
            <SwiperSlide v-for="photo in photos" :key="photo">
               <img :src="photo?.url" alt="" ref="images">
            </SwiperSlide>
         </Swiper>
         <div class="catalog-card__header">
            <ul class="catalog-card__tags">
               <li v-for="tag in product.ap_tags" :key="tag">{{ tag.tag }}</li>
            </ul>
            <button class="catalog-card__like" @click="onLike" :class="{ active: liked }">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                     d="M7.66897 3.3947L8.00333 3.69062L8.33504 3.39174C9.00063 2.79202 9.8709 2.47047 10.7665 2.49333C11.6621 2.51619 12.5149 2.88173 13.149 3.51461C13.7831 4.1475 14.1503 4.99952 14.1749 5.89509C14.1994 6.78637 13.8827 7.65321 13.2898 8.31871L8.00038 13.6156L2.71345 8.32029C2.13026 7.65355 1.82137 6.79033 1.84941 5.90459C1.87761 5.01388 2.24441 4.16745 2.87505 3.53781C3.50569 2.90817 4.35271 2.54272 5.24346 2.51595C6.13387 2.48918 7.00139 2.80386 7.66897 3.3947Z"
                     stroke="white" />
               </svg>
            </button>
         </div>
      </div>
      <div class="catalog-card__main">
         <div class="catalog-card__content">
            <ul class="catalog-card__banners">
               <li>{{ product?.count_rooms }} {{ morph(+product?.count_rooms, ['комната', 'комнаты', 'комнат']) }}</li>
               <li>{{ product?.square_apartament }}м<sup>2</sup></li>
               <li>этаж {{ product?.floor }} /{{ product?.proekty?.floors_count }}</li>
               <li>ID {{ product?.id }}</li>
            </ul>
            <button class="catalog-card__like" @click="onLike" :class="{ active: liked }">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                     d="M7.66897 3.3947L8.00333 3.69062L8.33504 3.39174C9.00063 2.79202 9.8709 2.47047 10.7665 2.49333C11.6621 2.51619 12.5149 2.88173 13.149 3.51461C13.7831 4.1475 14.1503 4.99952 14.1749 5.89509C14.1994 6.78637 13.8827 7.65321 13.2898 8.31871L8.00038 13.6156L2.71345 8.32029C2.13026 7.65355 1.82137 6.79033 1.84941 5.90459C1.87761 5.01388 2.24441 4.16745 2.87505 3.53781C3.50569 2.90817 4.35271 2.54272 5.24346 2.51595C6.13387 2.48918 7.00139 2.80386 7.66897 3.3947Z"
                     stroke="white" />
               </svg>
            </button>
            <!-- <h4 class="catalog-card__title">{{ product?.name }}</h4> -->
            <h4 class="catalog-card__title">{{ formatNumber(product?.cost_total) }} ₽ </h4>
            <span class="catalog-card__price">{{ product?.description }} </span>
            <ul class="catalog-card__addresses">
               <li v-if="product?.proekty?.metro_nearby?.length">
                  <div class="circle" :style="{ background: product?.proekty?.metro_nearby[0].color }">
                  </div>
                  <span>{{ product?.proekty?.metro_nearby[0].name }}, {{ product?.proekty?.metro_nearby[0].time }} мин
                  </span>
                  <IconMan />
               </li>
            </ul>
            <button class="project-card__show" v-if="isCollapse" @click="collapse" :class="{ active: isCollapsed }">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M13 6L8 11L3 6" stroke="#181818" stroke-width="1.33333" stroke-linecap="square"
                     stroke-linejoin="round" />
               </svg>
            </button>
         </div>
         <div class="catalog-card__footer" :class="{ collapse: isCollapse }" ref="spoiler">
            <div class="catalog-card__btns">
               <NuxtLink class="btn white" :to="'tel:' + product?.proekty?.phone">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <g id="Icons / phone">
                        <path id="Vector"
                           d="M17.5 13.6833V16.63C17.5001 16.841 17.4202 17.0441 17.2763 17.1985C17.1325 17.3528 16.9355 17.4469 16.725 17.4617C16.3608 17.4867 16.0633 17.5 15.8333 17.5C8.46917 17.5 2.5 11.5308 2.5 4.16667C2.5 3.93667 2.5125 3.63917 2.53833 3.275C2.5531 3.06454 2.64715 2.86751 2.8015 2.72367C2.95585 2.57984 3.15902 2.4999 3.37 2.5H6.31667C6.42003 2.4999 6.51975 2.53822 6.59644 2.60752C6.67313 2.67682 6.72133 2.77215 6.73167 2.875C6.75083 3.06667 6.76833 3.21917 6.785 3.335C6.9506 4.49077 7.28999 5.61487 7.79167 6.66917C7.87083 6.83583 7.81917 7.035 7.66917 7.14167L5.87083 8.42667C6.97038 10.9887 9.01212 13.0305 11.5742 14.13L12.8575 12.335C12.91 12.2617 12.9865 12.2091 13.0737 12.1864C13.161 12.1637 13.2535 12.1723 13.335 12.2108C14.3892 12.7116 15.513 13.0501 16.6683 13.215C16.7842 13.2317 16.9367 13.25 17.1267 13.2683C17.2294 13.2789 17.3245 13.3271 17.3936 13.4038C17.4628 13.4805 17.5001 13.5801 17.5 13.6833Z"
                           fill="black" />
                     </g>
                  </svg>

                  <input type="text" :value="product?.proekty?.phone" v-maska="'+7 (###) ###-##-##'" disabled>
               </NuxtLink>
            </div>
         </div>
      </div>
   </div>
</template>
<script setup>
import { vMaska } from "maska/vue"
import IconMan from '@/assets/img/icons/catalog-card-man.svg'

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import { useFavorites } from '~/store/favorites';
const favorites = useFavorites()
const props = defineProps({
   type: String,
   product: Object
})

const swiperInstance = ref(null)
const onSwiper = (swiper) => {
   swiperInstance.value = swiper
}
const onMouseenter = (index) => {
   swiperInstance.value.slideTo(index)
}
const isCollapse = ref(false)
const spoiler = ref(null)
const isCollapsed = ref(false)
const setСollapse = () => {
   isCollapse.value = getIsCollapse()
}
const loading = ref(true)
const images = ref([])
onMounted(() => {
   isCollapse.value = getIsCollapse()
   window.addEventListener("resize", setСollapse)
   let tmp = 1;
   if (images.value?.length > 0) {
      images.value.forEach(item => {
         item.onload = () => {
            tmp++
            loading.value = tmp < images.value.length

         }
      })
   } else {
      loading.value = false

   }
})
onBeforeUnmount(() => {
   window.removeEventListener('resize', setСollapse)
   // if (swiperInstance.value) {
   //    swiperInstance.value.destroy(true, true)
   // }
})
const getIsCollapse = () => {
   if (props.type == 'row' && window.innerWidth <= 568) {
      return true
   }
   return false
}

const collapse = () => {
   if (spoiler.value.classList.contains("collapse_show")) {
      slideHide(spoiler.value)
      isCollapsed.value = false
   } else {
      slideShow(spoiler.value);
      isCollapsed.value = true

   }
}
const onLike = () => {
   favorites.toggle(props.product)
}
const liked = computed(() => {
   return favorites.isContains(props.product?.slug, favorites.build.projects) || favorites.isContains(props.product?.slug, favorites.commerce.projects)
})


const photos = computed(() => props.product.photos.length > 3 ? props.product.photos.slice(0, 3) : props.product.photos)
</script>


<style lang="scss" scoped>
.catalog-card {
   &.project-card {
      .catalog-card {
         &__footer {
            flex: unset;
         }

         &__content {
            flex: 1;
         }

         &__price {
            white-space: unset;
            -webkit-line-clamp: 4;
            /* Число отображаемых строк */
            display: -webkit-box;
            /* Включаем флексбоксы */
            -webkit-box-orient: vertical;
            /* Вертикальная ориентация */
            /* Обрезаем всё за пределами блока */
         }
      }
   }

   &__price {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
      width: 100%;
      font-size: 16px;
   }

   &__banners {
      flex-wrap: wrap;
   }

   &__btns {
      input {
         background: transparent;
      }
   }

   &__footer {
      border-top: 0;
   }
}
</style>