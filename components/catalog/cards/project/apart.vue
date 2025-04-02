<template>
   <div class="catalog-card with-hover apart" :class="{ 'project-card': type == 'row', loading: loading }">
      <div class="catalog-card__gallery">
         <UiLoader v-if="!photos?.length" />
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
               <!-- <li>ID {{ product?.id }}</li> -->
            </ul>
            <ul class="list-object__tags" v-if="type == 'row'">
               <li>{{ product?.count_rooms }} {{ morph(+product?.count_rooms, ['комната', 'комнаты', 'комнат']) }}</li>
               <li>{{ product?.square_apartament }}м<sup>2</sup></li>
               <li>этаж {{ product?.floor }} /{{ product?.proekty?.floors_count }}</li>
               <!-- <li>ID {{ product?.id }}</li> -->
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
            <span class="catalog-card__price" style="min-height: 57px;" v-html="product?.description"></span>
            <ul class="catalog-card__addresses">
               <div>
                  <li v-if="product?.proekty?.metro_nearby[0]" style="height: 18px;">
                     <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <rect x="2" y="2" width="8" height="8" rx="4"
                           :fill="product?.proekty?.metro_nearby[0]?.metro_branch?.color_code" />
                     </svg>
                     {{ product?.proekty?.metro_nearby[0]?.name }}, {{ product?.proekty?.metro_nearby[0]?.time_foot ?
                        product?.proekty?.metro_nearby[0]?.time_foot : product?.proekty?.metro_nearby[0]?.time_car }} мин
                     <svg v-if="product?.proekty?.metro_nearby[0]?.time_foot" xmlns="http://www.w3.org/2000/svg"
                        width="14" height="16" viewBox="0 0 14 16" fill="none">
                        <path
                           d="M4.00505 5.94432L5.87505 4.58632C6.08505 4.43232 6.34005 4.35432 6.60005 4.36232C6.91702 4.37078 7.22354 4.47752 7.47721 4.66777C7.73088 4.85802 7.91917 5.12239 8.01605 5.42432C8.12405 5.76432 8.22305 5.99432 8.31305 6.11432C8.5844 6.47645 8.93648 6.77031 9.3413 6.97255C9.57141 7.08751 9.81496 7.17106 10.0654 7.22167C10.3812 7.28547 10.645 7.54064 10.645 7.86276C10.645 8.18453 10.383 8.44969 10.0644 8.40403C9.6634 8.34653 9.27207 8.22946 8.90365 8.05578C8.35904 7.79904 7.878 7.42493 7.49505 6.96032L7.08805 9.26732L8.28905 10.2763L9.38636 13.2907C9.49663 13.5937 9.3404 13.9287 9.03743 14.0389C8.73455 14.149 8.39971 13.9928 8.2895 13.69L7.29905 10.9683L5.32205 9.30932C5.16013 9.17811 5.0362 9.00604 4.96307 8.8109C4.88993 8.61575 4.87025 8.40462 4.90605 8.19932L5.20305 6.51632L4.80805 6.80332L3.91008 8.03919C3.72063 8.29993 3.35567 8.35771 3.09495 8.16824C2.8343 7.97883 2.77649 7.61401 2.96581 7.3533L3.99405 5.93732L4.00505 5.94432ZM7.43705 4.07032C7.28099 4.07489 7.1256 4.04809 6.98007 3.99153C6.83455 3.93496 6.70186 3.84977 6.58986 3.741C6.47786 3.63223 6.38882 3.50209 6.32802 3.35829C6.26722 3.21448 6.23589 3.05994 6.23589 2.90382C6.23589 2.74769 6.26722 2.59315 6.32802 2.44935C6.38882 2.30554 6.47786 2.1754 6.58986 2.06663C6.70186 1.95786 6.83455 1.87267 6.98007 1.8161C7.1256 1.75954 7.28099 1.73275 7.43705 1.73732C7.74051 1.7462 8.02856 1.873 8.24007 2.09079C8.45158 2.30858 8.56989 2.60022 8.56989 2.90382C8.56989 3.20741 8.45158 3.49905 8.24007 3.71684C8.02856 3.93464 7.74051 4.06143 7.43705 4.07032ZM5.70305 11.7603L4.14962 13.6105C3.97255 13.8214 3.65807 13.8489 3.4471 13.6719C3.16433 13.4347 3.12747 13.0131 3.36478 12.7304L4.67105 11.1743L4.96307 8.8109L6.00807 9.6859L5.70305 11.7603Z"
                           fill="#808080" />
                     </svg>
                     <svg v-if="product?.proekty?.metro_nearby[0]?.time_car" style="translate: 0 -1px;"
                        xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="none">
                        <path
                           d="M17.5006 10.9143V17.1643C17.5006 17.3854 17.4215 17.5976 17.2808 17.754C17.14 17.9104 16.9491 17.9983 16.75 17.9983H15.9994C15.8006 17.9977 15.6102 17.9096 15.4698 17.7533C15.3294 17.5969 15.2506 17.3851 15.2506 17.1643V16.3303H4.7494V17.1643C4.7494 17.3851 4.67057 17.5969 4.53019 17.7533C4.38982 17.9096 4.19936 17.9977 4.0006 17.9983H3.25C3.05093 17.9983 2.86001 17.9104 2.71925 17.754C2.57848 17.5976 2.4994 17.3854 2.4994 17.1643V10.9143L1.567 10.6543C1.4061 10.6081 1.26337 10.5043 1.16088 10.359C1.05839 10.2137 1.00185 10.0349 1 9.85025L1 9.25025C1.00047 9.1399 1.04001 9.03418 1.11007 8.95596C1.18013 8.87774 1.27508 8.8333 1.3744 8.83225H2.782L4.384 4.08025C4.49067 3.7624 4.68242 3.4885 4.93344 3.29541C5.18446 3.10231 5.4827 2.99931 5.788 3.00025H14.212C14.5173 2.99931 14.8155 3.10231 15.0666 3.29541C15.3176 3.4885 15.5093 3.7624 15.616 4.08025L17.218 8.83225H18.6256C18.7249 8.8333 18.8199 8.87774 18.8899 8.95596C18.96 9.03418 18.9995 9.1399 19 9.25025V9.85025C18.9989 10.0356 18.9428 10.2153 18.8402 10.3614C18.7377 10.5076 18.5945 10.6119 18.433 10.6583L17.5006 10.9143ZM4.0006 12.1643V13.8303C4.0006 14.0511 4.07943 14.2629 4.21981 14.4193C4.36018 14.5756 4.55064 14.6637 4.7494 14.6643H7.183C7.24801 14.6646 7.31199 14.6462 7.36863 14.6107C7.42528 14.5753 7.47265 14.5241 7.50607 14.4621C7.53949 14.4002 7.55781 14.3296 7.55924 14.2574C7.56067 14.1852 7.54514 14.1138 7.5142 14.0503C6.9094 12.7929 5.7382 12.1643 4.0006 12.1643ZM15.9994 12.1643C14.2618 12.1643 13.0906 12.7929 12.4858 14.0503C12.4549 14.1138 12.4393 14.1852 12.4408 14.2574C12.4422 14.3296 12.4605 14.4002 12.4939 14.4621C12.5274 14.5241 12.5747 14.5753 12.6314 14.6107C12.688 14.6462 12.752 14.6646 12.817 14.6643H15.2506C15.4494 14.6637 15.6398 14.5756 15.7802 14.4193C15.9206 14.2629 15.9994 14.0511 15.9994 13.8303V12.1643ZM5.5 4.66425L4.33 8.56825C4.29272 8.69342 4.28268 8.82663 4.30071 8.95694C4.31873 9.08726 4.36431 9.21097 4.43369 9.31792C4.50308 9.42488 4.5943 9.51203 4.69986 9.57223C4.80543 9.63243 4.92234 9.66397 5.041 9.66425H14.959C15.0777 9.66397 15.1946 9.63243 15.3001 9.57223C15.4057 9.51203 15.4969 9.42488 15.5663 9.31792C15.6357 9.21097 15.6813 9.08726 15.6993 8.95694C15.7173 8.82663 15.7073 8.69342 15.67 8.56825L14.5 4.66425H5.5Z"
                           fill="#808080" />
                     </svg>
                  </li>
               </div>
               <div v-if="!product?.proekty?.metro_nearby?.length" style="height: 18px;"></div>
               <!-- <div v-if="!product?.proekty?.metro_nearby?.length" style="height: 18px;"></div> -->
            </ul>
            <button class="project-card__show" v-if="isCollapse" @click="collapse" :class="{ active: isCollapsed }">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M13 6L8 11L3 6" stroke="#181818" stroke-width="1.33333" stroke-linecap="square"
                     stroke-linejoin="round" />
               </svg>
            </button>
         </div>
         <div class="catalog-card__footer">
            <div class="catalog-card__btns">
               <NuxtLink class="btn white" :to="'tel:' + contactsStore?.info?.contacts_info?.phonenumber">
                  <p>
                     <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Icons / phone">
                           <path id="Vector"
                              d="M17.5 13.6833V16.63C17.5001 16.841 17.4202 17.0441 17.2763 17.1985C17.1325 17.3528 16.9355 17.4469 16.725 17.4617C16.3608 17.4867 16.0633 17.5 15.8333 17.5C8.46917 17.5 2.5 11.5308 2.5 4.16667C2.5 3.93667 2.5125 3.63917 2.53833 3.275C2.5531 3.06454 2.64715 2.86751 2.8015 2.72367C2.95585 2.57984 3.15902 2.4999 3.37 2.5H6.31667C6.42003 2.4999 6.51975 2.53822 6.59644 2.60752C6.67313 2.67682 6.72133 2.77215 6.73167 2.875C6.75083 3.06667 6.76833 3.21917 6.785 3.335C6.9506 4.49077 7.28999 5.61487 7.79167 6.66917C7.87083 6.83583 7.81917 7.035 7.66917 7.14167L5.87083 8.42667C6.97038 10.9887 9.01212 13.0305 11.5742 14.13L12.8575 12.335C12.91 12.2617 12.9865 12.2091 13.0737 12.1864C13.161 12.1637 13.2535 12.1723 13.335 12.2108C14.3892 12.7116 15.513 13.0501 16.6683 13.215C16.7842 13.2317 16.9367 13.25 17.1267 13.2683C17.2294 13.2789 17.3245 13.3271 17.3936 13.4038C17.4628 13.4805 17.5001 13.5801 17.5 13.6833Z"
                              fill="black" />
                        </g>
                     </svg>

                     <input type="text" :value="contactsStore?.info?.contacts_info?.phonenumber"
                        v-maska="'+7 (###) ###-##-##'" disabled>
                  </p>
               </NuxtLink>
            </div>
         </div>
      </div>
      <div class="apart-mobile">
         <div class="catalog-card__footer" :class="{ collapse: isCollapse }" ref="spoiler">
            <div class="catalog-card__btns">
               <NuxtLink class="btn white" :to="'tel:' + contactsStore?.info?.contacts_info?.phonenumber">
                  <p>
                     <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Icons / phone">
                           <path id="Vector"
                              d="M17.5 13.6833V16.63C17.5001 16.841 17.4202 17.0441 17.2763 17.1985C17.1325 17.3528 16.9355 17.4469 16.725 17.4617C16.3608 17.4867 16.0633 17.5 15.8333 17.5C8.46917 17.5 2.5 11.5308 2.5 4.16667C2.5 3.93667 2.5125 3.63917 2.53833 3.275C2.5531 3.06454 2.64715 2.86751 2.8015 2.72367C2.95585 2.57984 3.15902 2.4999 3.37 2.5H6.31667C6.42003 2.4999 6.51975 2.53822 6.59644 2.60752C6.67313 2.67682 6.72133 2.77215 6.73167 2.875C6.75083 3.06667 6.76833 3.21917 6.785 3.335C6.9506 4.49077 7.28999 5.61487 7.79167 6.66917C7.87083 6.83583 7.81917 7.035 7.66917 7.14167L5.87083 8.42667C6.97038 10.9887 9.01212 13.0305 11.5742 14.13L12.8575 12.335C12.91 12.2617 12.9865 12.2091 13.0737 12.1864C13.161 12.1637 13.2535 12.1723 13.335 12.2108C14.3892 12.7116 15.513 13.0501 16.6683 13.215C16.7842 13.2317 16.9367 13.25 17.1267 13.2683C17.2294 13.2789 17.3245 13.3271 17.3936 13.4038C17.4628 13.4805 17.5001 13.5801 17.5 13.6833Z"
                              fill="black" />
                        </g>
                     </svg>

                     <input type="text" :value="contactsStore?.info?.contacts_info?.phonenumber"
                        v-maska="'+7 (###) ###-##-##'" disabled>
                  </p>
               </NuxtLink>
            </div>
         </div>
      </div>
   </div>
</template>
<script setup>
import { vMaska } from "maska/vue"
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import { useFavorites } from '~/store/favorites';
import { useContacts } from '~/store/contacts';
const contactsStore = useContacts()
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
   let tmp = 2;
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
   return favorites.isContains(props.product?.slug, favorites.secondary)
})


const photos = computed(() => props.product?.photos?.length > 3 ? props.product.photos.slice(0, 3) : props.product.photos)
</script>


<style lang="scss" scoped>
.catalog-card {
   &.project-card {
      height: 100%;

      .swiper {
         @media(min-width: 1440px) {
            width: 300px;
         }
      }

      .catalog-card {


         &__footer {
            flex: unset;
            padding-top: 9px;
         }

         &__content {
            flex: 1;
         }

         &__price {
            pointer-events: none;
            white-space: unset;
            -webkit-line-clamp: 4;
            /* Число отображаемых строк */
            display: -webkit-box;
            /* Включаем флексбоксы */
            -webkit-box-orient: vertical;
            /* Вертикальная ориентация */
            /* Обрезаем всё за пределами блока */
         }

         &__banners {
            li:last-child {
               border: 0;
            }
         }

         @media(max-width: 568px) {
            &__main {
               padding: 10px;
               padding-left: 0;
            }

            &__tags {
               display: none;
            }

            &__banners {
               display: none;
            }

            &__footer {
               border: 0 !important;
            }
         }
      }

      @media(max-width: 568px) {
         gap: 10px;
      }
   }

   .list-object__tags {
      display: none;

      @media(max-width: 568px) {
         display: flex;
         width: calc(100% - 38px);

         li:nth-child(3) {
            &::after {
               display: none;
            }
         }

         li:nth-child(4) {
            height: 21px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #F3F3F3;
            color: #181818;
            font-size: 13px;
            border-radius: 30px;
            padding: 0 8px;
            border: 0;
         }
      }
   }

   &__price {
      pointer-events: none;
      // white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: unset;
      -webkit-line-clamp: 3;
      /* Число отображаемых строк */
      display: -webkit-box;
      /* Включаем флексбоксы */
      -webkit-box-orient: vertical;
      // display: block;
      width: 100%;
      font-size: 16px;
      line-height: calc(19 / 16);
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
      padding-top: 0;
   }
}

.catalog-card {
   .loader-wrapper {
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 100%;
   }
}

.apart.project-card {
   max-height: 270px;

   .catalog-card {

      &__header {
         display: flex;

         .catalog-card__like {
            display: none;
         }
      }

      &__gallery {
         height: 100%;

         @media(max-width: 1024px) {
            height: 250px;
         }

         @media(max-width: 568px) {
            height: 170px;
         }
      }

      &__banners {
         max-width: calc(100% - 35px);
      }

      &__price {
         -webkit-line-clamp: 2;
      }

      &__footer {
         border-top: 1px solid var(--black-15, rgba(24, 24, 24, 0.15));
      }
   }

   .catalog-card__main {
      .catalog-card__footer {
         @media(max-width: 1024px) {
            display: none !important;
         }
      }
   }
}

.btn {
   p {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      translate: 5px 0;
   }
}


.apart.project-card {
   @media(max-width: 1024px) {
      flex-wrap: wrap;

   }
}

.apart-mobile {
   display: none;

   @media(max-width: 1024px) {
      display: block;
      flex: 0 0 100%;

      .catalog-card__footer {
         padding-top: 0 !important;
      }

      .catalog-card__btns {
         padding: 20px 10px;
         padding-top: 10px;
      }
   }
}

.apart {
   .catalog-card {
      &__gallery {
         @media(max-width: 568px) {
            flex: 0 0 77px !important;
         }
      }
   }
}
</style>