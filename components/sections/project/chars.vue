<template>
   <section class="project-chars">
      <div class="container">
         <div class="project-chars__wrapper">
            <slot />
            <ul class="project-chars__list">
               <li>
                  <span>Срок сдачи</span>
                  <p>{{ info.date_complete }}</p>
               </li>
               <li v-if="info.properties.find(item => item.title == 'Класс')">
                  <span>Класс</span>
                  <p>{{ info.properties.find(item => item.title == 'Класс')?.desc }}</p>
               </li>
               <li>
                  <span>Застройщик</span>
                  <p>{{ info.developer }}</p>
               </li>
               <li>
                  <span>Стоимость лотов</span>
                  <p>от {{ formatPrice(apartamentsMinPrice) }}</p>
               </li>
               <li>
                  <span>Тип отделки</span>
                  <p> {{ finishing }}</p>
               </li>
               <li v-if="info.properties.find(item => item.title == 'Этажи')">
                  <span>Этажи</span>
                  <p>{{ info.properties.find(item => item.title == 'Этажи')?.desc }}</p>
               </li>
               <li>
                  <span>Всего лотов</span>
                  <p>{{ info.apartaments.length }}</p>
               </li>
               <li v-if="info.properties.find(item => item.title == 'Высота потолков')">
                  <span>Высота потолков</span>
                  <p>{{ info.properties.find(item => item.title == 'Высота потолков')?.desc }}</p>
               </li>
               <li>
                  <span>Площадь лотов</span>
                  <p>от {{ apartamentsMinArea }} м<sup>2</sup></p>
               </li>
               <li v-if="info.properties.find(item => item.title == 'Паркинг')">
                  <span>Паркинг</span>
                  <p>{{ info.properties.find(item => item.title == 'Паркинг')?.desc }}</p>
               </li>
            </ul>
         </div>
      </div>
   </section>
</template>
<script setup>
const props = defineProps({
   info: Object
})

const apartamentsMinPrice = computed(() => {
   return Math.min(...props.info.apartaments.map((item) => +item.cost_total))
})
const apartamentsMinArea = computed(() => {
   return Math.min(...props.info.apartaments.map((item) => +item.square_apartament))
})

let finishing = [...new Set(props.info.apartaments.map((item) => item.finishing))].map(
   (item) => item
).join(", ");
</script>