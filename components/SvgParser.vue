<template>
   <div v-html="svgContent">
   </div>
</template>

<script setup>
const props = defineProps({
   iconUrl: String,
})
const svgContent = ref('');
const getSvg = async () => {
   if (!props?.iconUrl) {
      return;
   }
   let code = await fetch(props?.iconUrl)
      .then((response) => response.text())
      .catch((error) => {
         console.error("Ошибка при получении SVG:", error);
      });
   svgContent.value = code;
}
onMounted(async () => {
   await getSvg()
});
watch(() => props.iconUrl, async () => {
   await getSvg()
})

</script>