<template>
   <div class="text-input phone">
      <p @click="isOpen = !isOpen">
         <svg
            :class="{ active: isOpen }"
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="6"
            viewBox="0 0 8 6"
            fill="none"
         >
            <path d="M3.9867 1L7 4.97907L1 5L3.9867 1Z" fill="#181818" />
         </svg>
         <span style="color: #181818">{{ selectedCode }}</span>
      </p>
      <input
         :disabled="disabled"
         type="text"
         :id="id"
         v-model="value"
         v-maska="'(###) ###-##-##'"
         placeholder="(999) 999-99-99"
      />
      <ul :class="{ open: isOpen }">
         <li
            v-for="item in PHONE_CODS"
            :key="item"
            @click="select(item.code)"
            :class="{ active: item.code == selectedCode }"
         >
            <span>{{ item.code }}</span
            ><span>{{ item.country }}</span>
         </li>
      </ul>
   </div>
</template>
<script setup>
import { vMaska } from "maska/vue";
import { PHONE_CODS } from "~/assets/js/constants";
let props = defineProps({
   placeholder: String,
   disabled: {
      type: Boolean,
      default: false,
   },
   id: String | Number,
});
const modelValue = defineModel();

const value = ref("");
const selectedCode = ref("+7");
const phoneValue = computed(() => {
   return selectedCode.value + " " + value.value;
});
watch(phoneValue, (value) => {
   modelValue.value = value;
});

const isOpen = ref(false);

const select = (code) => {
   selectedCode.value = code;
   isOpen.value = false;
};
const clickHandler = (e) => {
   if (!e.target.closest(".text-input")) {
      isOpen.value = false;
   }
};
onMounted(() => {
   document.addEventListener("click", clickHandler);
});
onBeforeUnmount(() => {
   document.removeEventListener("click", clickHandler);
});
</script>

<style lang="scss" scoped>
.safari-browser {
   .phone > p {
      translate: 0 -1px;
   }
}

.phone {
   position: relative;
   display: flex;

   & > p {
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
      // translate: 0 -1px;

      svg {
         transition: 0.4s;
         rotate: 180deg;

         &.active {
            rotate: 0deg;
         }
      }
   }

   & > ul {
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
            background: url(@/assets/img/icons/check.svg) center / contain
               no-repeat;
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
