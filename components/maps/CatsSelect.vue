<template>
   <div class="v-select" @click="toggleOptions">
      <div class="v-select__backdrop"></div>
      <div class="v-select__wrapper" :class="{ placeholder: settings.placeholder }" ref="output">
         <span class="v-select__input">
            <div class="circle">
               <component :is="choosedValue.icon" />
            </div>
            {{ choosedValue.name }}
         </span>
         <div class="v-select__icon">
            <ArrowDownIcon />
         </div>
      </div>
      <ul class="v-select__list">
         <li class="v-select__item" :class="{ active: option.name === choosedValue.name }"
            v-for="(option, index) in settings.options" :key="index" @click="selectOption(option)">
            <div class="circle">
               <component :is="option.icon" />
            </div>
            {{ option.name }}
         </li>
      </ul>
   </div>
</template>
<script setup>
import ArrowDownIcon from "@/assets/img/icons/arrow_down.svg"
const props = defineProps({
   settings: {
      type: Object,
      default() {
         return {};
      },
   },
   placeholder: {
      type: String,
      default: "",
      required: false,
   },
})
const emit = defineEmits(["selectOption"])

const route = useRoute()

const choosedValue = ref({});
const output = ref(null)

function toggleOptions(event) {
   if (!props.settings.options.length) return
   event.target.closest(".v-select").classList.toggle("open");
}
function selectOption(option) {
   output.value.classList.remove("placeholder");
   choosedValue.value = option;
   emit("selectOption", option);
}

watch(() => route.params, () => {
   if (!props.settings.options) {
      return;
   }
   props.settings.options.forEach((item, index) => {
      if (index == 0) {
         selectOption(item);
      }
   });
})
watch(props.settings.options, (value) => {
   value.forEach((item) => {
      if (item.selected) {
         selectOption(item);
      }
   });
})


onMounted(() => {
   if (props.settings.placeholder) {
      choosedValue.value.name = props.settings.placeholder;
   } else {
      if (!props.settings.options?.length) {
         return;
      }
      props.settings.options.forEach((item) => {
         if (item.selected) {
            selectOption(item);
         }
      });
   }
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

      &.active {
         display: none;
      }

      &:last-child {
         padding: 0;
         border: 0;
      }
   }
}
</style>
