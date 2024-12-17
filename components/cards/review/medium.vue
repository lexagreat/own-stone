<template>
   <div class="review-medium home-reviews__card">
      <div class="review-medium__header">
         <div class="review-medium__image">
            <img src="/img/home/review-medium.png" alt="">
         </div>
         <div class="review-medium__title h3">Елена</div>
      </div>
      <div class="review-medium__main body-text">
         <div class="review-medium__visible">С помощью агентства OWNSTONE мы с мужем купили квартиру. Очень комфортно
            было смотреть квартиры, Елизавета договаривалась по времени удобно для нас. Очень ответственная, вежливая, к
            работе с полной отдачей. Нас устроило отношения, профессионализм. Всегда была с нами на связи, отвечала на
            интересующие вопросы. Сделка прошла легко и отлично.</div>

         <button @click="emit('openModal')">Читать полностью</button>
      </div>
   </div>
</template>
<script setup>
const emit = defineEmits(['openModal'])

</script>