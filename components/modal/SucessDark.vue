<template>
   <div class="modal-success">
      <div class="modal-success__title h1 light-title" v-html="title"></div>
      <div class="modal-success__description body-text" style="color: rgba(255, 255, 255, 0.50);" v-html="subtitle">
      </div>
   </div>
</template>
<script setup>
const props = defineProps({
   title: String,
   subtitle: String
})
</script>