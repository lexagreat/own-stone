<template>
   <section class="sell-portfolio">
      <div class="container">
         <div class="sell-portfolio__wrapper">
            <h2 class="sell-portfolio__title h1 light-title">
               350+ проданных квартир <br> <span>на вторичном рынке благодаря ownstone</span>
            </h2>
            <div class="sell-portfolio__main">
               <Swiper @swiper="onSwiper" :space-between="10">
                  <SwiperSlide class="sell-portfolio__slide" v-for="item in items" :key="item">
                     <div class="sell-portfolio__gallery">
                        <Swiper :modules="[SwiperPagination]" :pagination="true">
                           <SwiperSlide v-for="image in item.images" :key="image">
                              <img :src="image" alt="">
                           </SwiperSlide>
                        </Swiper>
                     </div>
                     <div class="sell-portfolio__content">
                        <div class="sell-portfolio__header">
                           <h3 class="sell-portfolio__subtitle h3" v-html="item.title"></h3>
                           <div class="sell-portfolio__text body-text">{{ item.text }}</div>
                        </div>
                        <ul class="sell-portfolio__chars body-text">
                           <li v-for="char in item.chars" :key="char">
                              <span>{{ char.key }}</span><span>{{ char.value }}</span>
                           </li>
                        </ul>
                        <div class="sell-portfolio__footer">
                           <div class="sell-portfolio__pagination body-text">{{ swiper?.activeIndex + 1 }}/{{
                              items.length }}
                           </div>
                           <div class="sell-portfolio__nav">
                              <UiSliderBtn prev class="black" @click="swiper.slidePrev()" />
                              <UiSliderBtn next class="black" @click="swiper.slideNext()" />
                           </div>
                        </div>
                     </div>
                  </SwiperSlide>
               </Swiper>
            </div>
         </div>
      </div>
   </section>
</template>
<script setup>
const items = ref([
   {
      title: "3-комнатная квартира,<br> 136 м² в ЖК «Пресня Сити»",
      text: "Провели предпродажную подготовку, организовали фото- и видеосъемку объекта, составили рекламное предложение, направили на площадки. В процессе многочисленных показов и переговоров, удалось найти покупателя. В итоге огромной и слаженной работы агента и юриста объект был реализован по верхней границе рыночной стоимости. ",
      chars: [
         {
            key: "Тип сделки",
            value: "Продажа",
         },
         {
            key: "Стоимость объекта",
            value: "150 000 000 ₽",
         },
         {
            key: "Площадь квартиры",
            value: "136 м2",
         },
         {
            key: "Срок реализации",
            value: "4 месяца",
         },
      ],
      images: [
         "/img/sell/portfolio1.png",
         "/img/sell/portfolio1.png",
         "/img/sell/portfolio1.png",
      ]
   },
   {
      title: "3-комнатная квартира,<br> 136 м² в ЖК «Пресня Сити»",
      text: "Провели предпродажную подготовку, организовали фото- и видеосъемку объекта, составили рекламное предложение, направили на площадки. В процессе многочисленных показов и переговоров, удалось найти покупателя. В итоге огромной и слаженной работы агента и юриста объект был реализован по верхней границе рыночной стоимости. ",
      chars: [
         {
            key: "Тип сделки",
            value: "Продажа",
         },
         {
            key: "Стоимость объекта",
            value: "150 000 000 ₽",
         },
         {
            key: "Площадь квартиры",
            value: "136 м2",
         },
         {
            key: "Срок реализации",
            value: "4 месяца",
         },
      ],
      images: [
         "/img/sell/portfolio1.png",
         "/img/sell/portfolio1.png",
         "/img/sell/portfolio1.png",
      ]
   },
   {
      title: "3-комнатная квартира,<br> 136 м² в ЖК «Пресня Сити»",
      text: "Провели предпродажную подготовку, организовали фото- и видеосъемку объекта, составили рекламное предложение, направили на площадки. В процессе многочисленных показов и переговоров, удалось найти покупателя. В итоге огромной и слаженной работы агента и юриста объект был реализован по верхней границе рыночной стоимости. ",
      chars: [
         {
            key: "Тип сделки",
            value: "Продажа",
         },
         {
            key: "Стоимость объекта",
            value: "150 000 000 ₽",
         },
         {
            key: "Площадь квартиры",
            value: "136 м2",
         },
         {
            key: "Срок реализации",
            value: "4 месяца",
         },
      ],
      images: [
         "/img/sell/portfolio1.png",
         "/img/sell/portfolio1.png",
         "/img/sell/portfolio1.png",
      ]
   },
   {
      title: "3-комнатная квартира,<br> 136 м² в ЖК «Пресня Сити»",
      text: "Провели предпродажную подготовку, организовали фото- и видеосъемку объекта, составили рекламное предложение, направили на площадки. В процессе многочисленных показов и переговоров, удалось найти покупателя. В итоге огромной и слаженной работы агента и юриста объект был реализован по верхней границе рыночной стоимости. ",
      chars: [
         {
            key: "Тип сделки",
            value: "Продажа",
         },
         {
            key: "Стоимость объекта",
            value: "150 000 000 ₽",
         },
         {
            key: "Площадь квартиры",
            value: "136 м2",
         },
         {
            key: "Срок реализации",
            value: "4 месяца",
         },
      ],
      images: [
         "/img/sell/portfolio1.png",
         "/img/sell/portfolio1.png",
         "/img/sell/portfolio1.png",
      ]
   },
])
const swiper = ref(null)
const onSwiper = (s) => {
   swiper.value = s;
}

</script>