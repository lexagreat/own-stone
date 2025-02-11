<template>
   <div class="catalog-card catalog-card_object" @click=" emit('onForm', product.documentId)">
      <div class="catalog-card__gallery">
         <img :src="product?.preview_picture?.url" alt="">
         <div class="catalog-card__header">
            <ul class="catalog-card__tags">
               <li>{{ product?.proekty?.date_complete }}</li>
               <li>{{ product?.name }}</li>
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
               <li>ID {{ product?.id }}</li>
            </ul>
            <h4 class="catalog-card__title">{{ formatPrice(product?.cost_total) }}</h4>
            <span class="catalog-card__price">{{ +product?.count_rooms > 5 ? "5+" : product?.count_rooms }} комнатная
               квартира, {{ product?.square_apartament }}м<sup>2</sup>, 2
               спальни </span>
            <ul class="catalog-card__addresses">
               <li>
                  <IconAddress />
                  <span>{{ product?.proekty?.address_short }}</span>
               </li>
               <li v-if="product?.proekty?.metro_nearby?.length">
                  <div class="circle" :style="{ background: product?.proekty?.metro_nearby[0].color }">
                  </div>
                  <span>{{ product?.proekty?.metro_nearby[0].name }}, {{ product?.proekty?.metro_nearby[0].time }} мин
                  </span>
                  <IconMan />
               </li>
            </ul>
         </div>

      </div>
   </div>
</template>
<script setup>
import IconMan from '@/assets/img/icons/catalog-card-man.svg'
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
</script>
