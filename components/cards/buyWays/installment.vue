<template>
   <div class="ipoteka-card ipoteka-card_instal">
      <div class="ipoteka-card__main">
         <span class="ipoteka-card__subtitle">Срок</span>
         <span class="ipoteka-card__item">{{ info.maxperiod }} {{ morph(info.maxperiod, ['год', 'года', 'лет']) }}
         </span>
      </div>
      <span class="ipoteka-card__item">от {{ Math.ceil(info.mincash) }}%</span>
      <span class="ipoteka-card__item">{{ Math.ceil(info.percentrate) }} %</span>
      <span class="ipoteka-card__item">-</span>
      <span class="ipoteka-card__price">{{ formatPrice(platezh) }} </span>
      <ul>
         <li>
            <span>Первый взнос</span>
            <span>от {{ Math.ceil(info.mincash) }}%</span>
         </li>
         <li>
            <span>Ставка</span>
            <span>{{ Math.ceil(info.percentrate) }}%</span>
         </li>
         <li>
            <span>Периодичность платежей</span>
            <span>-</span>
         </li>
         <li>
            <span>Сумма платежа</span>
            <span>{{ formatPrice(platezh) }}</span>
         </li>
      </ul>
      <button class="btn transparent ipoteka-card__btn" @click="emit('form', info)">Подробнее</button>
   </div>
</template>
<script setup>
const props = defineProps({
   info: Object
})
const emit = defineEmits(['form'])
const platezh = computed(() => {
   const ezhemes_stavka = props.info.percentrate / 12 / 100;
   const obch_stavka = Math.pow((1 + ezhemes_stavka), props.info.maxperiod * 12);
   const res = props.info.maxamount * obch_stavka * ezhemes_stavka / (obch_stavka - 1)
   return Math.ceil(res)
})
</script>