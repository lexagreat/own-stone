<template>
   <div class="case-small">
      <div class="case-small__header">
         <div class="case-small__image circle">
            <img :src="info?.photo?.url" alt="">
         </div>
         <h3 class="case-small__title h3">{{ info?.title }}</h3>
      </div>
      <div class="case-small__main body-text">
         <ul>
            <li v-for="item in info?.partners_case_props" :key="item">
               <span>{{ item?.name }}</span>
               <span>{{ item?.value }}</span>
            </li>
         </ul>
      </div>
      <button class="case-small__link" @click="open">Читать кейс</button>
   </div>
</template>
<script setup>
const props = defineProps({
   info: Object
})
const emit = defineEmits(['openModal'])
const open = () => {
   emit('openModal', props.info)
}
</script>