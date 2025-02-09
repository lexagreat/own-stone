<template>
   <div class="star-rating">
      <span>Ваша оценка</span>
      <ul class="star-rating__stars">
         <li v-for="item in 5" :key="item" @click="click(item)" :class="{ active: item <= model }">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
               <path
                  d="M8.02413 0.475528C8.17315 0.0134861 8.82685 0.0134858 8.97586 0.475528L10.5099 5.23212C10.5766 5.43904 10.7694 5.57913 10.9868 5.57865L15.9847 5.56773C16.4702 5.56667 16.6722 6.18838 16.2788 6.47288L12.229 9.40169C12.0529 9.5291 11.9792 9.75576 12.0468 9.96239L13.6016 14.7122C13.7527 15.1736 13.2238 15.5579 12.8317 15.2716L8.79478 12.3252C8.61916 12.197 8.38084 12.197 8.20522 12.3252L4.16832 15.2716C3.77618 15.5579 3.24732 15.1736 3.39835 14.7122L4.95315 9.96239C5.02079 9.75576 4.94715 9.5291 4.77097 9.40169L0.721223 6.47288C0.327842 6.18838 0.529849 5.56667 1.01532 5.56773L6.01315 5.57865C6.23057 5.57913 6.42338 5.43904 6.49011 5.23212L8.02413 0.475528Z"
                  fill="#181818" fill-opacity="0.15" />
            </svg>
         </li>
      </ul>
   </div>
</template>
<script setup>
const model = defineModel()
const click = (i) => {
   model.value = i
}
</script>

<style lang="scss">
.star-rating {
   display: flex;
   align-items: center;
   gap: 15px;

   // .star-rating__stars

   &__stars {
      display: flex;
      align-items: center;
      gap: 3px;

      li {
         cursor: pointer;

         &.active {

            svg path {
               fill-opacity: 1;
            }
         }

         svg path {
            transition: 0.4s;
         }
      }
   }
}
</style>