<template>
   <div class="ipoteka-card">
      <div class="ipoteka-card__main">
         <div class="ipoteka-card__image circle">
            <IpotekaIcon />
         </div>
         <div class="ipoteka-card__info">
            <span class="ipoteka-card__item">1 предложение </span>
            <span class="ipoteka-card__item" style="color: #18181880;">Сбер</span>
         </div>
      </div>
      <ul>
         <li>
            <span>Ставка</span>
            <span>от 21%</span>
         </li>
         <li>
            <span>Срок</span>
            <span>до 30 лет</span>
         </li>
         <li>
            <span>Ежемесячный платеж</span>
            <span>от 218 480 ₽/мес</span>
         </li>
      </ul>
      <span class="ipoteka-card__item">от 21%</span>
      <span class="ipoteka-card__item">до 30 лет</span>
      <span class="ipoteka-card__item">от 218 480 ₽/мес</span>
      <UiButton class="transparent ipoteka-card__btn">Подробнее</UiButton>
   </div>
</template>
<script setup>
import IpotekaIcon from '@/assets/img/icons/ipoteka-card.svg'
</script>