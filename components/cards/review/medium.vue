<template>
   <div class="review-medium home-reviews__card">
      <div class="review-medium__header">
         <div class="review-medium__image">
            <img src="/img/home/review-medium.png" alt="">
         </div>
         <div class="review-medium__title h3">Елена</div>
      </div>
      <div class="review-medium__main body-text" :class="{ active: isTextFull }">
         <div class="review-medium__visible">С помощью агентства OWNSTONE мы с мужем купили квартиру. Очень комфортно
            было смотреть квартиры, Елизавета договаривалась по времени удобно для нас. Очень ответственная, вежливая, к
            работе с полной отдачей. Нас устроило отношения, профессионализм. Всегда была с нами на связи, отвечала на
            интересующие вопросы. Сделка прошла легко и отлично.</div>
         <transition name="fade">
            <button @click="isTextFull = true" v-if="!isTextFull">Читать полностью</button>
         </transition>
         <div class="review-medium__hidden">С помощью агентства OWNSTONE мы с мужем купили квартиру. Очень комфортно
            было смотреть квартиры, Елизавета договаривалась по времени удобно для нас. Очень ответственная, вежливая, к
            работе с полной отдачей. Нас устроило отношения, профессионализм. Всегда была с нами на связи, отвечала на
            интересующие вопросы. Сделка прошла легко и отлично.</div>
      </div>
   </div>
</template>
<script setup>
const isTextFull = ref(false)

</script>