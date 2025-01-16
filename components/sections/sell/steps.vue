<template>
   <section class="sell-steps">
      <div class="container">
         <div class="sell-steps__wrapper">
            <h2 class="sell-steps__title h1 dark-title" v-html="info.title">
            </h2>
            <ul class="sell-steps__items">
               <li class="sell-step" v-for="(item, index) in steps" :key="index">
                  <div class="sell-step__index circle">{{ index + 1 }}</div>
                  <div class="sell-step__main">
                     <h3 class="sell-step__title h3">{{ item.title }}</h3>
                     <p class="sell-step__text body-text">{{ item.text }}</p>
                  </div>
               </li>
            </ul>
            <UiButton class="black">
               {{ info.btn_name }}
            </UiButton>
         </div>
      </div>
   </section>
</template>
<script setup>
const props = defineProps({
   info: Object
})
const steps = ref(props.info.sell_steps_list)
</script>