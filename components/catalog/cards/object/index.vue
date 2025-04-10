<template>
   <div class="catalog-card catalog-card_object" @click="clickHandler">
      <div class="catalog-card__gallery">
         <!-- <ModalFancybox class="fancy" :options="{
            Image: {
               zoom: true, // Включаем зум
            },
         }">
            <a data-fancybox="gallery" :href="product?.preview_picture?.url">
               <img :src="product?.preview_picture?.url" alt="">
            </a>
         </ModalFancybox> -->
         <UiLoader v-if="!product?.preview_picture?.url" />
         <img v-else :src="product?.preview_picture?.url" alt="">
         <div class="catalog-card__header">
            <ul class="catalog-card__tags">
               <li>{{ product?.proekty?.date_complete }}</li>

               <!-- <li>{{ product?.name }}</li> -->
            </ul>
            <button class="catalog-card__like" @click.stop="onLike" :class="{ active: liked }">
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
               <li v-if="product?.floor">{{ product?.floor }} ЭТАЖ</li>
               <li v-if="product?.finishing?.length">{{ product?.finishing }}</li>
               <!-- <li>ID {{ product?.id }}</li> -->
            </ul>
            <h4 class="catalog-card__title">{{ formatPrice(product?.cost_total) }}</h4>
            <span class="catalog-card__price lc2" v-if="product?.type_aparts == 'Коммерция'">{{ product?.name_commerce ?
               product?.name_commerce : "Помещение" }},
               {{ product?.square_apartament }}м<sup>2</sup>, {{ product?.proekty?.name }}</span>
            <span class="catalog-card__price" v-else>{{ +product?.count_rooms > 5 ? "5+" : product?.count_rooms }}
               комнатная
               квартира, {{ product?.square_apartament }}м<sup>2</sup></span>
            <ul class="catalog-card__addresses">
               <li>
                  <IconAddress />
                  <span>{{ product?.proekty?.address_short }}</span>
               </li>

               <li
                  v-if="product?.proekty?.metro_nearby?.length && product?.proekty?.metro_nearby[0] && (product?.proekty?.metro_nearby[0].time_foot || product?.proekty?.metro_nearby[0].time_car)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                     <rect x="2" y="2" width="8" height="8" rx="4"
                        :fill="product?.proekty?.metro_nearby[0]?.metro_branch?.color_code" />
                  </svg>
                  {{ product?.proekty?.metro_nearby[0]?.name }}, {{ product.proekty.metro_nearby[0]?.time_foot ?
                     product?.proekty?.metro_nearby[0]?.time_foot : product.proekty.metro_nearby[0]?.time_car }} мин
                  <svg v-if="product?.proekty?.metro_nearby[0]?.time_foot" xmlns="http://www.w3.org/2000/svg" width="14"
                     height="16" viewBox="0 0 14 16" fill="none">
                     <path
                        d="M4.00505 5.94432L5.87505 4.58632C6.08505 4.43232 6.34005 4.35432 6.60005 4.36232C6.91702 4.37078 7.22354 4.47752 7.47721 4.66777C7.73088 4.85802 7.91917 5.12239 8.01605 5.42432C8.12405 5.76432 8.22305 5.99432 8.31305 6.11432C8.5844 6.47645 8.93648 6.77031 9.3413 6.97255C9.57141 7.08751 9.81496 7.17106 10.0654 7.22167C10.3812 7.28547 10.645 7.54064 10.645 7.86276C10.645 8.18453 10.383 8.44969 10.0644 8.40403C9.6634 8.34653 9.27207 8.22946 8.90365 8.05578C8.35904 7.79904 7.878 7.42493 7.49505 6.96032L7.08805 9.26732L8.28905 10.2763L9.38636 13.2907C9.49663 13.5937 9.3404 13.9287 9.03743 14.0389C8.73455 14.149 8.39971 13.9928 8.2895 13.69L7.29905 10.9683L5.32205 9.30932C5.16013 9.17811 5.0362 9.00604 4.96307 8.8109C4.88993 8.61575 4.87025 8.40462 4.90605 8.19932L5.20305 6.51632L4.80805 6.80332L3.91008 8.03919C3.72063 8.29993 3.35567 8.35771 3.09495 8.16824C2.8343 7.97883 2.77649 7.61401 2.96581 7.3533L3.99405 5.93732L4.00505 5.94432ZM7.43705 4.07032C7.28099 4.07489 7.1256 4.04809 6.98007 3.99153C6.83455 3.93496 6.70186 3.84977 6.58986 3.741C6.47786 3.63223 6.38882 3.50209 6.32802 3.35829C6.26722 3.21448 6.23589 3.05994 6.23589 2.90382C6.23589 2.74769 6.26722 2.59315 6.32802 2.44935C6.38882 2.30554 6.47786 2.1754 6.58986 2.06663C6.70186 1.95786 6.83455 1.87267 6.98007 1.8161C7.1256 1.75954 7.28099 1.73275 7.43705 1.73732C7.74051 1.7462 8.02856 1.873 8.24007 2.09079C8.45158 2.30858 8.56989 2.60022 8.56989 2.90382C8.56989 3.20741 8.45158 3.49905 8.24007 3.71684C8.02856 3.93464 7.74051 4.06143 7.43705 4.07032ZM5.70305 11.7603L4.14962 13.6105C3.97255 13.8214 3.65807 13.8489 3.4471 13.6719C3.16433 13.4347 3.12747 13.0131 3.36478 12.7304L4.67105 11.1743L4.96307 8.8109L6.00807 9.6859L5.70305 11.7603Z"
                        fill="#808080" />
                  </svg>
                  <svg v-if="product?.proekty.metro_nearby[0]?.time_car" style="translate: 0 -1px;"
                     xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="none">
                     <path
                        d="M17.5006 10.9143V17.1643C17.5006 17.3854 17.4215 17.5976 17.2808 17.754C17.14 17.9104 16.9491 17.9983 16.75 17.9983H15.9994C15.8006 17.9977 15.6102 17.9096 15.4698 17.7533C15.3294 17.5969 15.2506 17.3851 15.2506 17.1643V16.3303H4.7494V17.1643C4.7494 17.3851 4.67057 17.5969 4.53019 17.7533C4.38982 17.9096 4.19936 17.9977 4.0006 17.9983H3.25C3.05093 17.9983 2.86001 17.9104 2.71925 17.754C2.57848 17.5976 2.4994 17.3854 2.4994 17.1643V10.9143L1.567 10.6543C1.4061 10.6081 1.26337 10.5043 1.16088 10.359C1.05839 10.2137 1.00185 10.0349 1 9.85025L1 9.25025C1.00047 9.1399 1.04001 9.03418 1.11007 8.95596C1.18013 8.87774 1.27508 8.8333 1.3744 8.83225H2.782L4.384 4.08025C4.49067 3.7624 4.68242 3.4885 4.93344 3.29541C5.18446 3.10231 5.4827 2.99931 5.788 3.00025H14.212C14.5173 2.99931 14.8155 3.10231 15.0666 3.29541C15.3176 3.4885 15.5093 3.7624 15.616 4.08025L17.218 8.83225H18.6256C18.7249 8.8333 18.8199 8.87774 18.8899 8.95596C18.96 9.03418 18.9995 9.1399 19 9.25025V9.85025C18.9989 10.0356 18.9428 10.2153 18.8402 10.3614C18.7377 10.5076 18.5945 10.6119 18.433 10.6583L17.5006 10.9143ZM4.0006 12.1643V13.8303C4.0006 14.0511 4.07943 14.2629 4.21981 14.4193C4.36018 14.5756 4.55064 14.6637 4.7494 14.6643H7.183C7.24801 14.6646 7.31199 14.6462 7.36863 14.6107C7.42528 14.5753 7.47265 14.5241 7.50607 14.4621C7.53949 14.4002 7.55781 14.3296 7.55924 14.2574C7.56067 14.1852 7.54514 14.1138 7.5142 14.0503C6.9094 12.7929 5.7382 12.1643 4.0006 12.1643ZM15.9994 12.1643C14.2618 12.1643 13.0906 12.7929 12.4858 14.0503C12.4549 14.1138 12.4393 14.1852 12.4408 14.2574C12.4422 14.3296 12.4605 14.4002 12.4939 14.4621C12.5274 14.5241 12.5747 14.5753 12.6314 14.6107C12.688 14.6462 12.752 14.6646 12.817 14.6643H15.2506C15.4494 14.6637 15.6398 14.5756 15.7802 14.4193C15.9206 14.2629 15.9994 14.0511 15.9994 13.8303V12.1643ZM5.5 4.66425L4.33 8.56825C4.29272 8.69342 4.28268 8.82663 4.30071 8.95694C4.31873 9.08726 4.36431 9.21097 4.43369 9.31792C4.50308 9.42488 4.5943 9.51203 4.69986 9.57223C4.80543 9.63243 4.92234 9.66397 5.041 9.66425H14.959C15.0777 9.66397 15.1946 9.63243 15.3001 9.57223C15.4057 9.51203 15.4969 9.42488 15.5663 9.31792C15.6357 9.21097 15.6813 9.08726 15.6993 8.95694C15.7173 8.82663 15.7073 8.69342 15.67 8.56825L14.5 4.66425H5.5Z"
                        fill="#808080" />
                  </svg>
               </li>
            </ul>
         </div>

      </div>
   </div>
</template>
<script setup>
import IconAddress from '@/assets/img/icons/catalog-card-address.svg'
import { useFavorites } from '~/store/favorites';
const favorites = useFavorites()
const emit = defineEmits(["onForm"])
const props = defineProps({
   product: Object
})

const onLike = () => {
   favorites.toggle(props.product)
}
const liked = computed(() => {
   return favorites.isContains(props.product?.slug, favorites.build.apartaments) || favorites.isContains(props.product?.slug, favorites.commerce.apartaments) || favorites.isContains(props.product?.slug, favorites.secondary)
})
const clickHandler = (e) => {
   // if (!e.target.closest('.fancy')) {
   emit('onForm', props.product.documentId)

   // }
}
</script>

<style lang="scss" scoped>
.catalog-card {
   .fancy {
      width: 100%;
      height: 100%;

      button {
         width: 100%;
         height: 100%;
      }
   }

   &__price {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
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

.lc2 {
   display: -webkit-box;
   -webkit-line-clamp: 2;
   -webkit-box-orient: vertical;
   overflow: hidden;
   white-space: unset;
}
</style>