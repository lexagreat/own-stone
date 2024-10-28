<template lang="">
   <div class="app-checkbox">
      <input
         type="checkbox"
         :id="id"
         :checked="modelValue"
         @change="emit('update:modelValue', $event.target.checked)"
      />
      <label :for="id">
         <div class="app-checkbox__circle"></div>
      </label>
   </div>
</template>
<script setup>
const props = defineProps({
   id: String,
   modelValue: Boolean,
})
const emit = defineEmits(["update:modelValue"]);
</script>
<style lang=""></style>
