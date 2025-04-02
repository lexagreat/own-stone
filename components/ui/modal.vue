<template lang="">
   <div class="modal" :class="{ open: isOpen }" @click="detectWhere" @keydown="handleEscape">
      <slot></slot>
   </div>
</template>
<script>
export default {
   name: "v-popup",
   props: {
      isOpen: {
         type: Boolean,
         default: false,
      },
   },
   data() {
      return {};
   },
   methods: {
      handleEscape(e) {
         if (e.key == 'Escape') {
            this.$emit("closePopup");

         }
      },
      detectWhere(e) {
         if (!e.target.closest(".modal__content")) {
            this.$emit("closePopup");
         }
      },
      bodyLock() {
         const lockPaddingValue =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
         if (lockPaddingValue !== "0px") {
            document.querySelectorAll(".lock-padding").forEach((item) => {
               item.style.paddingRight = lockPaddingValue;
            });
         }
         document.querySelector("body").classList.add("lock");
      },
      bodyUnlock() {
         document.querySelectorAll(".lock-padding").forEach((item) => {
            item.style.paddingRight = "";
         });
         document.querySelector("body").classList.remove("lock");
      },
   },
   watch: {
      isOpen(value) {
         if (value) {
            this.bodyLock();
         } else {
            this.bodyUnlock();
         }
      },
   },
   mounted() {
      // Добавляем обработчик события keydown на window
      window.addEventListener('keydown', this.handleEscape);
   },
   beforeDestroy() {
      // Удаляем обработчик события keydown при уничтожении компонента
      window.removeEventListener('keydown', this.handleEscape);
   }
};
</script>
<style lang="scss">
.modal {
   width: 100%;
   height: 100%;
   position: fixed;
   z-index: 110;
   top: 0;
   left: 0;
   background: rgba(0, 0, 0, 0.10);
   backdrop-filter: blur(15px);
   opacity: 0;
   visibility: hidden;
   -webkit-transition: 0.5s;
   -o-transition: 0.5s;
   transition: 0.5s;
   overflow-y: auto;
   overflow-x: hidden;

   @media(max-width: 1024px) {
      height: 100vh;
   }
}

.modal__content {
   position: absolute;
   // width: 100px;
   // height: 100px;
   top: 50%;
   left: 50%;
   -webkit-transform: translateY(-50%) translateX(-50%) scale(0);
   -ms-transform: translateY(-50%) translateX(-50%) scale(0);
   transform: translateY(-50%) translateX(-50%) scale(0);
   border-radius: 8px;
   background: #F8F8F8;
   padding: 40px;
   opacity: 0;
   -webkit-transition: 0.5s;
   -o-transition: 0.5s;
   transition: 0.5s;

   @media(max-width: 1024px) {
      border-radius: 0;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transform: unset !important;
   }
}

.modal__close {
   cursor: pointer;
}

.modal.open {
   opacity: 1;
   visibility: visible;
}

.modal.open .modal__content {
   -webkit-transform: translateY(-50%) translateX(-50%) scale(1);
   -ms-transform: translateY(-50%) translateX(-50%) scale(1);
   transform: translateY(-50%) translateX(-50%) scale(1);
   opacity: 1;
}
</style>
