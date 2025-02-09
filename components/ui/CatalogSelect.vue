<template>
   <div class="v-select">
      <div class="v-select__backdrop" @click="toggleOptions"></div>
      <div class="v-select__wrapper" @click="toggleOptions">
         <span class="v-select__input">
            {{ output }}
         </span>
         <div class="v-select__icon">
            <ArrowDownIcon />
         </div>
      </div>
      <div class="v-select__content" ref="content">
         <div class="v-select__subheader">
            <button class="circle circle40">
               <ArrowDownIcon style="rotate: 90deg;" />
            </button>
            <span>{{ title }}</span>
         </div>
         <ul class="v-select__list">
            <template v-for="(option, index) in settings.options" :key="index">
               <li class="v-select__item" v-if="String(option?.name)?.length">
                  <label>
                     <input type="checkbox" :value="option.value" :name="title" style="display: none;"
                        :checked="modelValue.some(item => item.value == option.value)" @change="updateValue">
                     {{ option.name }}
                  </label>
               </li>
            </template>
         </ul>
      </div>
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
   title: String
})
const content = ref(null)


function toggleOptions(event) {
   if (document.querySelector('.catalog-filters')) {
      let top = document.querySelector('.catalog-filters').scrollTop
      content.value.style.top = top + "px"
   }
   if (!props.settings.options.length) return
   event.target.closest(".v-select").classList.toggle("open");
}

// watch(() => props.settings.options, (value) => {
//    value.forEach((item) => {
//       if (item.selected) {
//          selectOption(item);
//       }
//    });
// }, { deep: true })
// onMounted(() => {
//    if (props.settings.placeholder) {
//       choosedValue.value = props.settings.placeholder;
//    } else {
//       if (!props.settings.options?.length) {
//          return;
//       }
//       props.settings.options.forEach((item) => {
//          if (item.selected) {
//             selectOption(item);
//          }
//       });
//    }
// })
const output = computed(() => {
   return modelValue.value.map(item => item.name).join(', ')
})


const modelValue = defineModel(); // Автоматически обрабатывает props и emit

function updateValue(event) {
   if (event.target.value == 0) {
      modelValue.value = [props.settings.options[0]]
      return;
   } else {
      let i = modelValue.value.findIndex(item => item.value === 0);
      if (i > -1) {
         modelValue.value.splice(i, 1);
      }
   }
   let obj = props.settings.options.find(item => item.value == event.target.value)
   if (event.target.checked) {
      // Добавляем значение, если чекбокс выбран
      modelValue.value.push(obj);
   } else {
      // Удаляем значение, если чекбокс снят
      const index = modelValue.value.indexOf(obj);
      if (index > -1) {
         modelValue.value.splice(index, 1);
      }
   }
}
</script>
<style lang="scss" scoped>
label {
   width: 100%;
   display: flex;
   justify-content: space-between;
   align-items: center;
   cursor: pointer;

   &::after {
      content: "";
      display: block;
      width: 14px;
      height: 14px;
      flex: 0 0 14px;
      background: url(@/assets/img/icons/check.svg) center / contain no-repeat;
      transition: 0.3s;
      opacity: 0;
   }

   &:has(input:checked) {
      &::after {
         opacity: 1;
      }
   }
}

.v-select__input {
   overflow: hidden;
   white-space: nowrap;
   text-overflow: ellipsis;
   width: 100%;


}
</style>
