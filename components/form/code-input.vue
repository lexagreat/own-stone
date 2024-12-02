<template>
   <div class="code-input">
      <input v-for="(item, index) in fields" ref="inputs" type="text" v-model="fields[index]" v-maska="'#'"
         @input="onInput(index)" @keydown.backspace="onBackspace(index)">
   </div>
</template>
<script setup>
import { vMaska } from "maska/vue"
const emit = defineEmits(['changeValue'])
const fields = ref(["", "", "", ""])
const inputs = ref(null)
const value = computed(() => {
   return +fields.value.join().replaceAll(",", '')
})
watch(value, () => {
   emit('changeValue', value.value)
},
   {
      deep: true
   })
const onInput = (index) => {
   if (fields.value[index] == '' || index + 1 == fields.value.length) {
      return
   }

   inputs.value[index + 1].focus()

}
const onBackspace = (index) => {
   if (index == 0) {
      return
   }
   if (fields.value[index] == '') {
      inputs.value[index - 1].focus()

   }
}
</script>