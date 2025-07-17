<template>
   <div class="star-rating">
      <ul class="star-rating__stars">
         <li
            v-for="item in 5"
            :key="item"
            @click="click(item)"
            :class="{ active: item <= model }"
         >
            <svg
               width="35"
               height="34"
               viewBox="0 0 35 34"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
            >
               <path
                  d="M22.1522 11.3564L22.4256 11.8564L22.9852 11.9619L32.3338 13.7119L25.7996 20.624L25.408 21.0371L25.4813 21.6025L26.7049 31.0342L18.1131 26.9561L17.5984 26.7119L17.0838 26.9561L8.49103 31.0342L9.71564 21.6025L9.78888 21.0371L9.39728 20.624L2.86212 13.7119L12.2117 11.9619L12.7713 11.8564L13.0447 11.3564L17.5984 3.00586L22.1522 11.3564Z"
                  stroke="#56000E"
                  fill="transparent"
                  stroke-width="2.4"
               />
            </svg>
         </li>
      </ul>
      <span>Пожалуйста, оцените работу брокера</span>
   </div>
</template>
<script setup>
const model = defineModel();
const click = (i) => {
   model.value = i;
};
</script>

<style lang="scss" scoped>
.star-rating {
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 10px;
   span {
      font-weight: 400;
      color: #18181880;
      font-size: 12px;
      line-height: 140%;
      letter-spacing: 0%;
      text-align: center;
   }
   // .star-rating__stars

   &__stars {
      display: flex;
      align-items: center;
      gap: 5px;

      li {
         cursor: pointer;

         &.active {
            svg path {
               fill: #56000e;
            }
         }

         svg path {
            transition: 0.4s;
         }
      }
   }
   @media (max-width: 1024px) {
      svg {
         width: 32px;
         height: 32px;
      }
      &__stars {
         gap: 4px;
      }
   }
}
</style>
