<template>
   <section class="rewards-section about-rewards">
      <div class="container">
         <div class="rewards-section__wrapper">
            <div class="rewards-section__header">
               <span class="rewards-section__subtitle">Наши награды</span>
               <div class="rewards-section__right">
                  <h2 class="rewards-section__title h1">Лидеры продаж <span>в Аквилоне, Эталоне, STONE и в стране</span>
                  </h2>
                  <ul class="rewards-section__list scrollbar-none">
                     <li v-for="(item, index) in info.rewards_section_images" :key="item">
                        <NuxtLink to="/" @mouseover="show(index)" @mouseleave="hide(index)">
                           <img :src="item?.rewards_img?.url" alt="" :ref="images[index]">
                           <img :src="item?.rewards_img_hover?.url || item?.rewards_img?.url" alt="" class="hidden"
                              :ref="hiddenImages[index]">
                        </NuxtLink>
                     </li>

                  </ul>
               </div>
            </div>
         </div>
      </div>
   </section>

</template>
<script setup>
import { rewardsAnimmation } from "@/assets/js/animations"

const props = defineProps({
   info: Object
})


const hiddenImages = ref([ref(null), ref(null), ref(null), ref(null), ref(null), ref(null), ref(null), ref(null), ref(null),])

const images = ref([ref(null), ref(null), ref(null), ref(null), ref(null), ref(null), ref(null), ref(null), ref(null),])


const show = (index) => {
   hiddenImages.value[index].value[0].style.opacity = 1
   images.value[index].value[0].style.opacity = 0
}
const hide = (index) => {
   hiddenImages.value[index].value[0].style.opacity = 0
   images.value[index].value[0].style.opacity = 1
}


onMounted(() => {
   rewardsAnimmation()
})
</script>



<style lang="scss">
@media(max-width: 568px) {
   .about-rewards {
      .rewards-section__title span {
         display: block;
      }
   }
}
</style>
