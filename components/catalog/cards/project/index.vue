<template>
   <div class="catalog-card with-hover" :class="{ 'project-card': type == 'row', loading: loading }">
      <div class="catalog-card__gallery">
         <ul>
            <li v-for="(item, index) in product?.photos" :key="index" @mouseenter="onMouseenter(index)"></li>
         </ul>
         <Swiper @swiper="onSwiper" :spaceBetween="8" :modules="[Pagination]" :pagination="true">
            <SwiperSlide v-for="photo in product?.photos" :key="photo">
               <img :src="photo?.url" alt="" lazy ref="images">
            </SwiperSlide>
         </Swiper>
         <div class="catalog-card__header">
            <ul class="catalog-card__tags">
               <li v-for="tag in tags" :key="tag">{{ tag }}</li>
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
               <li>{{ product?.date_complete }}</li>
               <li>{{ product?.apartaments?.length }} лотов</li>
               <li>ID {{ product?.id }}</li>
            </ul>
            <button class="catalog-card__like" @click="onLike" :class="{ active: liked }">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                     d="M7.66897 3.3947L8.00333 3.69062L8.33504 3.39174C9.00063 2.79202 9.8709 2.47047 10.7665 2.49333C11.6621 2.51619 12.5149 2.88173 13.149 3.51461C13.7831 4.1475 14.1503 4.99952 14.1749 5.89509C14.1994 6.78637 13.8827 7.65321 13.2898 8.31871L8.00038 13.6156L2.71345 8.32029C2.13026 7.65355 1.82137 6.79033 1.84941 5.90459C1.87761 5.01388 2.24441 4.16745 2.87505 3.53781C3.50569 2.90817 4.35271 2.54272 5.24346 2.51595C6.13387 2.48918 7.00139 2.80386 7.66897 3.3947Z"
                     stroke="white" />
               </svg>
            </button>
            <h4 class="catalog-card__title">{{ product?.name }}</h4>
            <span class="catalog-card__price">{{ formatNumber(prices?.min) }} ₽ - {{ formatNumber(prices?.max) }}
               ₽ </span>
            <ul class="catalog-card__addresses">
               <li v-if="product?.address_short?.length">
                  <IconAddress />
                  <span>{{ product?.address_short }}</span>
               </li>
               <li v-if="product?.metro_nearby?.length">
                  <div class="circle" :style="{ background: product?.metro_nearby[0].color }">
                  </div>
                  <span>{{ product?.metro_nearby[0].name }}, {{ product?.metro_nearby[0].time }} мин </span>
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
            <ul>
               <template v-for="arr in apartsRooms" :key="arr">
                  <li v-if="arr?.length">
                     <p>
                        <span v-if="arr[0].count_rooms <= 5">{{ arr[0]?.count_rooms }}-комн. ({{ arr?.length }})</span>
                        <span v-else>5+ комн. ({{ arr?.length }})</span>
                        <span>от {{ getMinArea(arr) }} м<sup>2</sup></span>
                     </p>
                     <span> от {{ formatPrice(getMinPrice(arr)) }}</span>
                  </li>
               </template>
            </ul>
            <div class="catalog-card__btns">
               <NuxtLink class="btn white" :to="link">Подробнее о проекте</NuxtLink>
               <NuxtLink class="circle" :to="'tel:' + product.phone">
                  <IconPhone />
               </NuxtLink>
            </div>
         </div>
      </div>
   </div>
</template>
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import IconMan from '@/assets/img/icons/catalog-card-man.svg'
import IconAddress from '@/assets/img/icons/catalog-card-address.svg'
import IconPhone from '@/assets/img/icons/phone.svg'
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
const prices = computed(() => {
   let arr = props.product?.apartaments?.map((item) => +item.cost_total);
   let min = 0;
   let max = 0;
   if (arr) {
      min = Math.round(Math.min(...arr))
      max = Math.round(Math.max(...arr))
   }
   return {
      min: min,
      max: max,
   }
})
const tags = computed(() => {
   if (!props.product?.tags?.length) return []
   return props.product?.tags.split(",")
})
const apartsRooms = computed(() => {
   let arr = []
   if (!props.product?.apartaments?.length) {
      return arr;
   }
   props.product?.apartaments.forEach(item => {
      if (+item.count_rooms == 1) {
         if (!Array.isArray(arr[0])) {
            arr[0] = []
         }
         arr[0].push(item)
      }
      if (+item.count_rooms == 2) {
         if (!Array.isArray(arr[1])) {
            arr[1] = []
         }
         arr[1].push(item)
      }
      if (+item.count_rooms == 3) {
         if (!Array.isArray(arr[2])) {
            arr[2] = []
         }
         arr[2].push(item)
      }
      if (+item.count_rooms == 4) {
         if (!Array.isArray(arr[3])) {
            arr[3] = []
         }
         arr[3].push(item)
      }
      if (+item.count_rooms == 5) {
         if (!Array.isArray(arr[4])) {
            arr[4] = []
         }
         arr[4].push(item)
      }
      if (+item.count_rooms > 5) {
         if (!Array.isArray(arr[5])) {
            arr[5] = []
         }
         arr[5].push(item)
      }
   })
   return arr
})
const getMinPrice = (arr) => {
   let res = 0;
   let prices = arr.map((item) => +item.cost_total);
   // let areas = arr.map((item) => +item.square_apartament);
   res = Math.min(...prices);
   return res
}
const getMinArea = (arr) => {
   let res = 0;
   let areas = arr.map((item) => +item.square_apartament);
   res = Math.min(...areas);
   return res
}
const onLike = () => {
   favorites.toggle(props.product)
}
const liked = computed(() => {
   return favorites.isContains(props.product?.slug, favorites.build.projects) || favorites.isContains(props.product?.slug, favorites.commerce.projects)
})
const link = computed(() => {
   let base = '/project/'
   if (!props.product?.apartaments?.length) {
      return ''
   }
   props.product?.apartaments[0]?.type_aparts !== 'Новостройки' ? base = '/commerce/' : '';
   let url = base + props.product?.slug
   return url
})
</script>
