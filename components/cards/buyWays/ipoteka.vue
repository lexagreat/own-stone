<template>
   <div class="ipoteka-card">
      <div class="ipoteka-card__main">
         <!-- <div class="ipoteka-card__image circle">
            <IpotekaIcon />
         </div> -->
         <div class="ipoteka-card__info">
            <span class="ipoteka-card__item">{{ info?.bank_programs?.length }} {{ morph(info?.bank_programs?.length,
               ['предложение', 'предложения', 'предложений']) }} </span>
            <span class="ipoteka-card__item" style="color: #18181880;">{{ info?.bank_title }}</span>
         </div>
      </div>
      <ul>
         <li>
            <span>Ставка</span>
            <span>от {{ Math.ceil(stavka) }}%</span>
         </li>
         <li>
            <span>Срок</span>
            <span>до {{ srok }} {{ morph(srok, ['год', 'года', 'лет']) }}</span>
         </li>
         <li>
            <span>Ежемесячный платеж</span>
            <span>от {{ formatPrice(platezh) }}/мес</span>
         </li>
      </ul>
      <span class="ipoteka-card__item">от {{ Math.ceil(stavka) }}%</span>
      <span class="ipoteka-card__item">до {{ srok }} {{ morph(srok, ['год', 'года', 'лет']) }}</span>
      <span class="ipoteka-card__item">от {{ formatPrice(platezh) }}/мес</span>
      <UiButton class="transparent ipoteka-card__btn" @click="emit('form', info)">Оставить заявку</UiButton>
   </div>
</template>
<script setup>
import IpotekaIcon from '@/assets/img/icons/ipoteka-card.svg'
const emit = defineEmits(['form'])
const props = defineProps({
   info: Object
})

const stavka = computed(() => {
   return Math.min(...props.info.bank_programs.map(item => item.percentrate))
})
const srok = computed(() => {
   return Math.min(...props.info.bank_programs.map(item => item.maxperiod))
})
const platezh = computed(() => {
   let current = props.info.bank_programs.find(item => item.percentrate == stavka.value)
   const ezhemes_stavka = stavka.value / 12 / 100;
   const obch_stavka = Math.pow((1 + ezhemes_stavka), srok.value * 12);
   const res = current.maxamount * obch_stavka * ezhemes_stavka / (obch_stavka - 1)
   return Math.ceil(res)
})
</script>
