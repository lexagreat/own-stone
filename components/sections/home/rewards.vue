<template>
   <section class="rewards-section">
      <div class="container">
         <div class="rewards-section__wrapper">
            <div class="rewards-section__header">
               <span class="rewards-section__subtitle">Наши награды</span>
               <h2 class="rewards-section__title h1" v-html="info.title">
               </h2>
            </div>
            <ul class="rewards-section__list">
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
   </section>

</template>
<script setup>

const props = defineProps({
   info: Object
})

const hiddenImages = ref([ref(null), ref(null), ref(null), ref(null), ref(null), ref(null), ref(null), ref(null), ref(null), ref(null)])

const images = ref([ref(null), ref(null), ref(null), ref(null), ref(null), ref(null), ref(null), ref(null), ref(null), ref(null)])


const show = (index) => {
   hiddenImages.value[index].value[0].style.opacity = 1
   images.value[index].value[0].style.opacity = 0
}
const hide = (index) => {
   hiddenImages.value[index].value[0].style.opacity = 0
   images.value[index].value[0].style.opacity = 1
}
</script>


<style lang="scss" scoped>
.rewards-section {
   &__list {
      li {
         a {
            img {
               transition: 0.4s;
            }

            position: relative;

            .hidden {
               position: absolute;
               top: 50%;
               left: 50%;
               translate: -50% -50%;
               opacity: 0;
            }
         }
      }
   }
}
</style>