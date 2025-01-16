<template>
   <div class="partners-calc__form partners-form">
      <div class="partners-form__title h4">Стоимость недвижимости</div>
      <div class="partners-form__main">
         <div class="partners-form__slider">
            <input v-maska="mask" :style="{ left: leftPercent }" type="text" :value="formatNumber(Number(maxValue))"
               @input="onChangeInput">
            <MultiRangeSlider :ruler="false" :min="min" :max="max" :step="5000000" :minValue="minValue"
               :maxValue="maxValue" @input="UpdateValues" />
         </div>
         <div class="partners-form__ranges body-text">
            <span>{{ formatNumber(min) }}</span><span>{{ formatNumber(max) }}</span>
         </div>
      </div>
   </div>
</template>
<script setup>
import { vMaska } from "maska/vue"
import MultiRangeSlider from "multi-range-slider-vue";
import { formatNumber } from "~/utils/formattingNumbers";
const min = ref(5000000)
const max = ref(1000000000)
const minValue = ref(min.value)
const maxValue = ref(min.value)
const UpdateValues = (e) => {
   minValue.value = e.minValue
   maxValue.value = e.maxValue
}
const leftValue = ref(5);
const rightValue = ref(7);
const checkWindowWidth = () => {
   if (window.innerWidth < 568) {
      leftValue.value = 15;
      rightValue.value = 17;
   } else {
      leftValue.value = 5;
      rightValue.value = 7;
   }
}
onMounted(() => {
   checkWindowWidth()
   window.addEventListener('resize', checkWindowWidth)
})
onBeforeUnmount(() => {
   window.removeEventListener('resize', checkWindowWidth)
})
const leftPercent = computed(() => {
   let value = maxValue.value / max.value * 100;
   if (value > 90) {
      value -= rightValue.value
   }
   if (value < 10) {
      value += leftValue.value
   }
   return value + '%'
})

const mask = computed(() => {
   if (+maxValue.value.length <= 3) {
      return '###'
   } else if (+maxValue.value.length == 4) {
      return '# ###'
   } else if (+maxValue.value.length == 5) {
      return '## ###'
   } else if (+maxValue.value.length == 6) {
      return '### ###'
   } else if (+maxValue.value.length == 7) {
      return '# ### ###'
   } else if (+maxValue.value.length == 8) {
      return '## ### ###'
   } else if (+maxValue.value.length == 9) {
      return '### ### ###'
   }
})


const onChangeInput = (e) => {
   let result = e.target.value.replace(/ /g, "");
   if (+result > maxValue.value) return
   maxValue.value = +result
}
</script>