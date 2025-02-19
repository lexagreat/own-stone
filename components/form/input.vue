<template>
   <div class="text-input" :class="{ phone: isPhone }" ref="input">
      <p v-if="isPhone" @click="isOpen = true">
         <svg :class="{ active: isOpen }" xmlns="http://www.w3.org/2000/svg" width="8" height="6" viewBox="0 0 8 6"
            fill="none">
            <path d="M3.9867 1L7 4.97907L1 5L3.9867 1Z" fill="#181818" />
         </svg>
         <span>{{ selectedCode }}</span>
      </p>
      <input :disabled="disabled" type="text" :id="id" v-model="value" v-maska="'(###) ###-##-##'" v-if="isPhone"
         placeholder="(999) 999-99-99" />
      <input :disabled="disabled" :placeholder="placeholder" type="text" :id="id" v-model="modelValue"
         v-maska="customMask" v-else-if="customMask?.length" />
      <input :disabled="disabled" :placeholder="placeholder" type="text" :id="id" v-model="modelValue" v-else />

      <ul v-if="isPhone" :class="{ open: isOpen }">
         <li v-for="item in PHONE_CODS" :key="item" @click="select(item.code)"
            :class="{ active: item.code == selectedCode }">
            <span>{{ item.code }}</span><span>{{ item.country }}</span>
         </li>
      </ul>
   </div>
</template>
<script setup>
import { vMaska } from "maska/vue"
import { PHONE_CODS } from "~/assets/js/constants";
let props = defineProps({
   id: String,
   placeholder: String,
   customMask: String,
   value: String,
   isPhone: {
      type: Boolean,
      default: false,
   },
   disabled: {
      type: Boolean,
      default: false,
   },
   isEmail: {
      type: Boolean,
      default: false,
   },
});
const modelValue = defineModel()
const value = ref('')
const selectedCode = ref('+7')
const phoneValue = computed(() => {
   if (props.isPhone) {
      return selectedCode.value + value.value
   } else {
      return ''
   }
})
watch(phoneValue, (value) => {
   modelValue.value = value;
})

const isOpen = ref(false)

const select = (code) => {
   selectedCode.value = code
   isOpen.value = false
}
const clickHandler = (e) => {
   if (!e.target.closest('.text-input')) {
      isOpen.value = false
   }
}
onMounted(() => {
   if (props.isPhone) {
      document.addEventListener("click", clickHandler)
   }
})
onBeforeUnmount(() => {
   document.removeEventListener("click", clickHandler)

})
</script>

<style lang="scss" scoped>
.phone {
   position: relative;
   display: flex;

   &>p {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: end;
      padding-left: 20px;
      background-color: white;
      white-space: nowrap;
      font-family: "Arial";
      font-weight: 400;
      font-size: 15px;
      line-height: 21px;
      letter-spacing: 0%;
      color: #181818;
      gap: 8px;

      svg {
         transition: 0.4s;
         rotate: 180deg;

         &.active {
            rotate: 0deg;

         }
      }
   }

   &>ul {
      translate: 0 4px;
      padding: 0 14px;
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      background-color: white;
      height: 168px;
      overflow: auto;
      opacity: 0;
      pointer-events: none;
      transition: 0.4s;

      &.open {
         opacity: 1;
         pointer-events: all;
         z-index: 2;
      }

      li {
         cursor: pointer;
         height: 42px;
         display: flex;
         align-items: center;
         gap: 10px;
         border-bottom: 1px solid var(--black-5, rgba(24, 24, 24, 0.05));
         position: relative;

         &::after {
            content: "";
            display: block;
            width: 14px;
            height: 14px;
            flex: 0 0 14px;
            background: url(@/assets/img/icons/check.svg) center / contain no-repeat;
            transition: 0.3s;
            opacity: 0;
            position: absolute;
            top: 50%;
            translate: 0 -50%;
            right: 0px;
         }

         &.active {
            &::after {
               opacity: 1;
            }
         }

         span:nth-child(1) {
            flex: 0 0 30px;
         }
      }
   }

   input {
      padding-left: 5px;
   }
}
</style>