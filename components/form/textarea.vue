<template>
   <div class="app-textarea" ref="input">
      <textarea name="" id="" :placeholder="placeholder" @input="emit('update:modelValue', $event?.target?.value)"
         :value="props.modelValue"></textarea>
   </div>
</template>
<script setup>
const emit = defineEmits(["update:modelValue"]);
let props = defineProps({
   id: String,
   modelValue: String,
   placeholder: String,
});
</script>
