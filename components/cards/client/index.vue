<template>
   <div class="client-card body-text">
      <div class="client-card__wrapper">
         <span class="client-card__name">Иванов Александр Александрович</span>
         <span class="client-card__price">25 000 000 ₽ </span>
         <span class="client-card__date">11.11.2024</span>
         <span class="client-card__banner">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
               <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M2.86323 13.9842L1.15625 4.72823V4.61416L1.20921 4.5612L4.6802 2.57311L4.90834 2.45496V14.1064H2.86323V13.9883V13.9842ZM10.5385 5.69375L14.0625 6.49224L12.8648 14.1064H9.67893L10.5345 5.69783L10.5385 5.69375ZM5.24648 1.2002L5.19352 14.1024H9.40191L10.4815 3.4205L5.24648 1.2002Z"
                  fill="#181818" />
            </svg>
            подбор объекта
         </span>
         <span class="client-card__date2">5.11.2024</span>
         <div class="client-card__icon" @click="toggle" :class="{ active: isCollapse }">
            <ArrowIcon />
         </div>
      </div>
      <div class="client-card__spoiler collapse" ref="spoiler">
         <ul>
            <li>
               <span>Бюджет</span>
               <span>25 000 000 ₽</span>
            </li>
            <li>
               <span>Дата обновления</span>
               <span>11.11.2024</span>
            </li>
            <li>
               <span>Дата передачи клиента</span>
               <span>5.11.2024</span>
            </li>
         </ul>
      </div>
   </div>
</template>
<script setup>
import ArrowIcon from '@/assets/img/icons/arrow_down.svg'
import { slideHide, slideShow } from '#build/imports';
const isCollapse = ref(false)
const spoiler = ref(null)

const toggle = () => {
   if (isCollapse.value) {
      slideHide(spoiler.value)
   } else {
      slideShow(spoiler.value)
   }
   isCollapse.value = !isCollapse.value
}
</script>