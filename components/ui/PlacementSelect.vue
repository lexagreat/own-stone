<template>
   <div class="v-select placement-select" :class="{ open: isOpen }">
      <div class="v-select__backdrop" @click="isOpen = false"></div>
      <div class="v-select__wrapper" @click="isOpen = !isOpen">
         <span class="v-select__input">
            {{ choosedValue }}
         </span>
         <div class="v-select__icon">
            <ArrowDownIcon />
         </div>
      </div>
      <div class="v-select__content placement-select__content scrollbar-none" ref="content">
         <div class="v-select__subheader">
            <button class="circle circle40" @click="isOpen = false">
               <ArrowDownIcon style="rotate: 90deg;" />
            </button>
            <span>{{ title }}</span>
         </div>
         <ul class="placement-select__tabs scrollbar-none">
            <li v-for="(item, index) in data" :key="item.tabName">
               <label>
                  <input type="radio" v-model="tab" :value="index" name="placement-tabs">
                  <span>{{ item.tabName }}</span>
               </label>
            </li>

         </ul>
         <template v-for="(item, index) in data" :key="item">
            <div class="placement-select__main" v-if="tab == index">
               <div class="placement-select__search">
                  <div class="text-input">
                     <SearchIcon />
                     <input :placeholder="'Найти ' + item.tabName" type="text" v-model="data[tab].searchValue" />
                  </div>
               </div>
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
   placementOptions: Array,
   projectsOptions: Array,
   metroOptions: Array,
})
const placementValue = defineModel('placement')
const projectsValue = defineModel('projects')
const metroValue = defineModel('metro')

const isOpen = ref(false)
const tab = ref(0)

const data = ref([
   {
      tabName: "Округ",
      searchValue: ref(""),
      items: []
   },
   {
      tabName: "Метро",
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
const choosedValue = computed(() => {

   let arr = metroValue.value.concat(placementValue.value)
   if (arr.some(item => item.value !== 0)) {
      return arr.filter(item => item.value !== 0).map(item => item.name).join(', ')
   } else {
      return 'Не важно'
   }
   // return projectsValue.value.concat(placementValue.value).concat(metroValue.value).map(item => item.name).join(', ')
})
function selectOption(option) {
   data.value[tab.value].items.forEach(item => {
      if (item.name === option.name) {
         item.selected = !item.selected
      } else {
         if (option.value == 0) {
            item.selected = false
         }
      }
   })
   if (option.value) {
      data.value[tab.value].items[0].selected = false
   }
   setValues()
}
watch(isOpen, (value) => {
   if (document.querySelector('.catalog-filters')) {
      let top = document.querySelector('.catalog-filters').scrollTop
      if (window?.innerWidth <= 1024) {
         content.value.style.top = top + "px"
      }
   }
})

const isSelected = (option) => {
   return placementValue.value.some(item => item.name == option.name) || metroValue.value.some(item => item.name == option.name)
}
watch(() => props.placementOptions, () => {
   setOptions()
}, {
   deep: true
})
// watch(() => props.projectsOptions, () => {
//    setOptions()
// }, {
//    deep: true
// })
watch(() => props.metroOptions, () => {
   setOptions()
}, {
   deep: true
})
const setOptions = () => {
   // data.value[0].items = props?.projectsOptions;
   data.value[0].items = props?.placementOptions;
   data.value[1].items = props?.metroOptions;
}
const setValues = () => {
   // projectsValue.value = data.value[0].items.filter(item => item.selected)
   placementValue.value = data.value[0].items.filter(item => item.selected)
   metroValue.value = data.value[1].items.filter(item => item.selected)
}
onMounted(() => {
   setOptions()
})
</script>
<style lang="scss">
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
</style>
