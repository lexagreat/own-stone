<template>
   <section class="about-video" :class="{ bounce: isBouncing }">
      <video :src="video" ref="videoElement" loop></video>
      <button class="about-video__btn circle" @click="onClick">
         <IconPlay class="play" v-if="!isPlaying" />
         <IconPause class="pause" v-else />
      </button>
   </section>
</template>
<script setup>
import { stickyForCursor } from "~/assets/js/animations";
import IconPlay from "@/assets/img/icons/video-play.svg"
import IconPause from "@/assets/img/icons/pause.svg"

const props = defineProps({
   video: String
})

const isBouncing = ref(false)
const isPlaying = ref(false)
const videoElement = ref(null)
onMounted(() => {
   stickyForCursor(".about-video", ".about-video__btn")
})

const onClick = () => {
   isPlaying.value = !isPlaying.value
   isBouncing.value = true;

   // Сбросить класс после завершения анимации (0.5s в данном случае)
   setTimeout(() => {
      isBouncing.value = false;
   }, 200);
}

watch(isPlaying, (value) => {
   if (value) {
      videoElement.value.play()
   } else {
      videoElement.value.pause()

   }
})
</script>



<style lang="scss">
@keyframes bounce {
   0% {
      width: 130px;
      height: 130px;
   }

   50% {
      width: 100px;
      height: 100px;
   }

   100% {
      width: 130px;
      height: 130px;
   }
}

.bounce .circle {
   animation: bounce 0.2s ease;
}
</style>