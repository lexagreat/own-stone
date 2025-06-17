<template>
   <div class="v-select placement-select" :class="{ open: isOpen }">
      <div class="v-select__backdrop" @click="isOpen = false"></div>
      <div class="v-select__wrapper" @click="isOpen = !isOpen">
         <!-- <span class="v-select__input">
            {{ choosedValue }}
         </span>
         <div class="v-select__icon">
            <ArrowDownIcon />
         </div> -->
         <div class="placement-select__search">
            <div class="text-input">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                     d="M6.90918 1.50085C8.33279 1.51744 9.69252 2.09474 10.6934 3.1073C11.6942 4.11987 12.2559 5.4863 12.2559 6.91003C12.2558 8.16264 11.8203 9.37004 11.0342 10.3319L14.3516 13.6473C14.5469 13.8426 14.5468 14.1591 14.3516 14.3544C14.1563 14.5496 13.8398 14.5496 13.6445 14.3544L10.332 11.0438C9.37692 11.8491 8.16846 12.3036 6.90918 12.3182C6.19371 12.3265 5.48374 12.1927 4.82031 11.9247C4.15679 11.6566 3.55291 11.2598 3.04395 10.7567C2.53497 10.2536 2.13126 9.65439 1.85547 8.99401C1.57973 8.33377 1.43756 7.62554 1.4375 6.91003C1.4375 6.19436 1.57967 5.48546 1.85547 4.82507C2.13127 4.1647 2.53497 3.56546 3.04395 3.06237C3.55292 2.5593 4.15679 2.16249 4.82031 1.89441C5.48374 1.62637 6.19371 1.49257 6.90918 1.50085ZM6.89844 2.50085C6.31526 2.49405 5.73608 2.60275 5.19531 2.82116C4.65451 3.03965 4.16193 3.36332 3.74707 3.77331C3.33217 4.1834 3.00216 4.6725 2.77734 5.21081C2.55269 5.74895 2.4375 6.32688 2.4375 6.91003C2.43756 7.49324 2.55259 8.07108 2.77734 8.60925C3.00216 9.14748 3.33222 9.63573 3.74707 10.0458C4.16193 10.4558 4.6545 10.7794 5.19531 10.9979C5.73609 11.2163 6.31525 11.325 6.89844 11.3182C8.05858 11.3046 9.16674 10.8347 9.98242 10.0096C10.7981 9.18436 11.2557 8.07039 11.2559 6.91003C11.2559 5.7495 10.7982 4.63483 9.98242 3.80944C9.16674 2.98437 8.05857 2.51449 6.89844 2.50085Z"
                     fill="#181818" fill-opacity="0.5" />
               </svg>
               <input placeholder="Найти проект" type="text" v-model="data[tab].searchValue" />
            </div>
         </div>
      </div>
      <div class="v-select__content placement-select__content scrollbar-none" ref="content">
         <div class="v-select__subheader">
            <button class="circle circle40" @click="isOpen = false">
               <ArrowDownIcon style="rotate: 90deg;" />
            </button>
            <span>{{ title }}</span>
         </div>
         <div class="placement-select__search mob">
            <div class="text-input">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                     d="M6.90918 1.50085C8.33279 1.51744 9.69252 2.09474 10.6934 3.1073C11.6942 4.11987 12.2559 5.4863 12.2559 6.91003C12.2558 8.16264 11.8203 9.37004 11.0342 10.3319L14.3516 13.6473C14.5469 13.8426 14.5468 14.1591 14.3516 14.3544C14.1563 14.5496 13.8398 14.5496 13.6445 14.3544L10.332 11.0438C9.37692 11.8491 8.16846 12.3036 6.90918 12.3182C6.19371 12.3265 5.48374 12.1927 4.82031 11.9247C4.15679 11.6566 3.55291 11.2598 3.04395 10.7567C2.53497 10.2536 2.13126 9.65439 1.85547 8.99401C1.57973 8.33377 1.43756 7.62554 1.4375 6.91003C1.4375 6.19436 1.57967 5.48546 1.85547 4.82507C2.13127 4.1647 2.53497 3.56546 3.04395 3.06237C3.55292 2.5593 4.15679 2.16249 4.82031 1.89441C5.48374 1.62637 6.19371 1.49257 6.90918 1.50085ZM6.89844 2.50085C6.31526 2.49405 5.73608 2.60275 5.19531 2.82116C4.65451 3.03965 4.16193 3.36332 3.74707 3.77331C3.33217 4.1834 3.00216 4.6725 2.77734 5.21081C2.55269 5.74895 2.4375 6.32688 2.4375 6.91003C2.43756 7.49324 2.55259 8.07108 2.77734 8.60925C3.00216 9.14748 3.33222 9.63573 3.74707 10.0458C4.16193 10.4558 4.6545 10.7794 5.19531 10.9979C5.73609 11.2163 6.31525 11.325 6.89844 11.3182C8.05858 11.3046 9.16674 10.8347 9.98242 10.0096C10.7981 9.18436 11.2557 8.07039 11.2559 6.91003C11.2559 5.7495 10.7982 4.63483 9.98242 3.80944C9.16674 2.98437 8.05857 2.51449 6.89844 2.50085Z"
                     fill="#181818" fill-opacity="0.5" />
               </svg>
               <input placeholder="Найти проект" type="text" v-model="data[tab].searchValue" />
            </div>
         </div>
         <template v-for="(item, index) in data" :key="item">
            <div class="placement-select__main" v-if="tab == index">
               <!-- <div class="placement-select__search">
                  <div class="text-input">
                     <SearchIcon />
                     <input :placeholder="'Найти проект'" type="text" v-model="data[tab].searchValue" />
                  </div>
               </div> -->
               <ul class="v-select__list" v-if="searchedItems.length">
                  <li class="v-select__item" :class="{ active: isSelected(option) }"
                     v-for="(option, index) in searchedItems" :key="index" @click="selectOption(option)">
                     <span class="circle" v-if="option?.color" :style="{ background: option.color }"></span>
                     {{ option.name }}
                  </li>
               </ul>
               <p class="placement-select__nothing" v-else>
                  По вашему запросу ничего не найдено. Попробуйте изменить запрос
               </p>
            </div>
         </template>
      </div>
   </div>
</template>
<script setup>
import ArrowDownIcon from "@/assets/img/icons/arrow_down.svg"
import SearchIcon from "@/assets/img/icons/search.svg"
const props = defineProps({
   title: String,
   projectsOptions: Array,
})
const projectsValue = defineModel('projects')

const isOpen = ref(false)
const tab = ref(0)

const data = ref([
   {
      tabName: "Проект",
      searchValue: ref(""),
      items: []
   },
])
const content = ref(null)
const searchedItems = computed(() => {
   return data.value[tab.value].items.filter((item) => {
      return item.name.toLowerCase().includes(data.value[tab.value].searchValue.toLowerCase())
   })
})
// const choosedValue = computed(() => {

//    let arr = projectsValue.value
//    if (arr.some(item => item.value !== 0)) {
//       return arr.filter(item => item.value !== 0).map(item => item.name).join(', ')
//    } else {
//       return 'Не важно'
//    }
// })
function selectOption(option) {
   console.log(option);
   data.value[tab.value].items.forEach(item => {
      if (item.name === option.name) {
         item.selected = !item.selected
      } else {
         if (option.value == 0) {
            item.selected = false
         }
      }
   })
   // if (option.value) {
   //    data.value[tab.value].items[0].selected = false
   // }
   setValues()
}
watch(isOpen, (value) => {
   if (document.querySelector('.catalog-filters')) {
      let top = document.querySelector('.catalog-filters').scrollTop
      console.log(top);
      if (window?.innerWidth <= 1024) {
         content.value.style.top = top + "px"
      }
   }
})

const isSelected = (option) => {
   return projectsValue.value.some(item => item.name == option.name)
}
watch(() => props.projectsOptions, () => {
   setOptions()
}, {
   deep: true
})
const setOptions = () => {
   data.value[0].items = props?.projectsOptions;
}
const setValues = () => {
   projectsValue.value = data.value[0].items.filter(item => item.selected)
}
watch(() => data.value[tab.value].searchValue, (value) => {
   isOpen.value = true
})
onMounted(() => {
   setOptions()
})
</script>
<style lang="scss" scoped>
.v-select {
   cursor: pointer;
   position: relative;
   position: relative;
   z-index: 10;
   max-width: fit-content;

   &.open {
      .v-select__backdrop {
         display: block;
      }

      ul {
         opacity: 1;
         pointer-events: all;
      }

      .v-select__icon {
         transform: rotate(180deg);
      }
   }

   &__wrapper {
      display: flex;
      align-items: center;
      gap: 12px;
   }

   &__icon {
      transition: 0.3s;
   }

   &__backdrop {
      // background-color: red;
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      display: none;
   }

   &__input {
      display: block;
      cursor: pointer;
   }

   &__list {
      position: absolute;
      left: 0;
      // top: 24px;
      top: 100%;
      translate: 0 4px;
      width: 100%;
      z-index: 2;
      opacity: 0;
      pointer-events: none;
      transition: 0.3s;
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: 16px 14px;
      background-color: white;

      // @media(min-width: 1024px) {
      //    height: 168px;
      //    overflow: auto;
      // }
   }

   &__item {
      padding-bottom: 14px;
      border-bottom: 1px solid #0000001A;
      justify-content: flex-start !important;

      &:last-child {
         padding: 0;
         border: 0;
      }
   }
}

.placement-select {
   width: 220px !important;

   @media(max-width: 1024px) {
      width: 100% !important;
   }

   &.open {
      .placement-select__content {
         opacity: 1;
         pointer-events: all;
      }
   }

   .v-select__input {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
   }

   // .placement-select__content

   &__content {
      box-shadow: 0px 4px 6px 0px #1818180D;
      background-color: white;
      border-radius: 4px;
      position: absolute;
      top: 100%;
      translate: 0 4px;
      left: 0;
      width: 271px;
      padding: 0 14px;
      max-height: 300px;
      overflow-y: auto;
      opacity: 0;
      pointer-events: none;
      transition: 0.4s;

      .v-select__subheader {
         margin-bottom: 50px;
      }

      @media(max-width: 1024px) {
         max-height: unset;
         translate: 0;
         opacity: 1;
         top: 0;
         padding-bottom: 75px !important;
      }
   }

   // .placement-select__tabs

   &__tabs {
      display: flex;
      gap: 8px;

      input {
         display: none;
      }

      label {
         cursor: pointer;
         height: 40px;
         display: flex;
         align-items: center;
         justify-content: center;
         font-size: 13px;
         line-height: 14.3px;
         color: #181818;
         padding: 0 8px;
         position: relative;

         &::after {
            content: "";
            display: block;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            background: #181818;
            height: 1px;
            transform-origin: left;
            scale: 0;
            transition: 0.4s;
         }

         &:has(input:checked) {
            &::after {
               scale: 1;
            }
         }
      }
   }

   // .placement-select__main

   &__main {


      & * {
         opacity: 1;
      }

      .v-select__list {
         position: relative;
         top: unset;
         translate: unset;
         padding: 0;
         gap: 0;
         margin-top: 24px;
      }

      .v-select__item {
         height: 42px;
         display: flex;
         padding: 0;
         align-items: center;
         position: relative;

         .circle {
            --size: 8px;
            margin-right: 10px;
         }

         @media(hover:hover) {
            &:hover {
               &::after {
                  opacity: 0.4;
               }
            }
         }

         &.active {
            &::after {
               opacity: 1;
            }
         }

         &::after {
            content: "";
            display: block;
            width: 14px;
            height: 14px;
            position: absolute;
            top: 50%;
            translate: 0 -50%;
            right: 0;
            opacity: 0;
            transition: 0.4s;
            background: url("@/assets/img/icons/check.svg") center;
         }
      }
   }

   // .placement-select__search

   &__search {
      margin-top: 8px;
      position: relative;

      svg {
         position: absolute;
         top: 50%;
         translate: 0 -50%;
         left: 14px;
      }

      input {
         border-radius: 4px;
         height: 44px;
         padding-left: 38px;
         border: 1px solid #0000000D;
         font-size: 13px;
      }
   }

   &__nothing {
      padding: 14px 0;
      color: #18181880;
      font-size: 13px;
      line-height: 18.2px;

   }
}

.placement-select__search {
   &.mob {
      display: none;

      @media(max-width: 1024px) {
         display: flex;
      }
   }
}

@media(min-width: 1024px) {
   .placement-select__search {
      margin: 0;
      width: 100%;
      height: 100%;

      input {
         height: 48px;
         border: 0;
      }
   }

   .placement-select__content {
      max-height: 170px;
   }

   .v-select__wrapper {
      @media(hover:hover) {
         &:hover {
            svg path {

               stroke: transparent !important;
               fill-opacity: 1;
               fill: #181818;

            }
         }
      }
   }


   .placement-select.open {
      z-index: 100;
   }

   .placement-select__main .v-select__list {
      margin: 0;
   }

   .v-select {
      max-width: 100%;

      &__wrapper {
         padding: 0;
      }

   }
}

@media(max-width: 1024px) {
   .v-select__wrapper {
      padding: 0;
   }

   .placement-select.open {
      .placement-select__content {
         left: 0;
         z-index: 1000;
      }
   }

   .placement-select__content {
      position: fixed;
      top: 0;
      left: 100vw;
      width: 100vw;
      height: calc(100vh - 0px);
      padding: 25px var(--containerPadding);
      background-color: #f1f1f1;
   }

   .v-select__list {
      background-color: #f1f1f1;

   }

   .placement-select__search {
      margin: 0;

      input {
         height: 48px;
         border: 0;
      }
   }

   .v-select {
      max-width: unset;
   }
}
</style>
