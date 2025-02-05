<template>
   <div class="text-input" ref="input">

      <input :disabled="disabled" :placeholder="placeholder" type="text" :id="id"
         @input="emit('update:modelValue', $event?.target?.value)" :value="7" v-maska="'+7 (###) ###-##-##'"
         v-if="isPhone" />
      <input :disabled="disabled" :placeholder="placeholder" type="text" :id="id"
         @input="emit('update:modelValue', $event?.target?.value)" :value="props.modelValue" v-maska="customMask"
         v-else-if="customMask?.length" />
      <input :disabled="disabled" :placeholder="placeholder" type="text" :id="id"
         @input="emit('update:modelValue', $event?.target?.value)" :value="props.modelValue" v-else />
   </div>
</template>
<script setup>
import { vMaska } from "maska/vue"
const emit = defineEmits(["update:modelValue"]);
let props = defineProps({
   id: String,
   modelValue: String,
   placeholder: String,
   customMask: String,
   isPhone: {
      type: Boolean,
      default: false,
   },
   disabled: {
      type: Boolean,
      default: false,
   },
   isEmail: {
      type: Boolean,
      default: false,
   },
});
</script>
