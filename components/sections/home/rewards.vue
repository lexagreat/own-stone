<template>
   <section class="rewards-section">
      <div class="container">
         <div class="rewards-section__wrapper">
            <div class="rewards-section__header">
               <span class="rewards-section__subtitle">Наши награды</span>
               <h2 class="rewards-section__title h1">Лидеры продаж <span>в Аквилоне, Эталоне, STONE и в стране</span>
               </h2>
            </div>
            <ul class="rewards-section__list">
               <li>
                  <NuxtLink to="/" @mouseover="show(0)" @mouseleave="hide(0)">
                     <img src="/img/home/rewards1.svg" alt="" ref="start1">
                     <img src="/img/home/rewards2.svg" alt="" class="hidden" ref="img1">

                  </NuxtLink>
               </li>
               <li>
                  <NuxtLink to="/" @mouseover="show(1)" @mouseleave="hide(1)">
                     <img src="/img/home/rewards2.svg" alt="" ref="start2">
                     <img src="/img/home/rewards3.svg" alt="" class="hidden" ref="img2">

                  </NuxtLink>
               </li>
               <li>
                  <NuxtLink to="/" @mouseover="show(2)" @mouseleave="hide(2)">
                     <img src="/img/home/rewards3.svg" alt="" ref="start3">
                     <img src="/img/home/rewards4.svg" alt="" class="hidden" ref="img3">

                  </NuxtLink>
               </li>
               <li>
                  <NuxtLink to="/" @mouseover="show(3)" @mouseleave="hide(3)">
                     <img src="/img/home/rewards4.svg" alt="" ref="start4">
                     <img src="/img/home/rewards1.svg" alt="" class="hidden" ref="img4">
                  </NuxtLink>
               </li>
            </ul>
         </div>
      </div>
   </section>

</template>
<script setup>
const img1 = ref(null)
const img2 = ref(null)
const img3 = ref(null)
const img4 = ref(null)

const hiddenImages = ref([img1, img2, img3, img4])


const start1 = ref(null)
const start2 = ref(null)
const start3 = ref(null)
const start4 = ref(null)
const images = ref([start1, start2, start3, start4])


const show = (index) => {
   hiddenImages.value[index].value.style.opacity = 1
   images.value[index].value.style.opacity = 0
}
const hide = (index) => {
   hiddenImages.value[index].value.style.opacity = 0
   images.value[index].value.style.opacity = 1
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